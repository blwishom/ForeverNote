from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms import NotebookForm
from app.api.auth_routes import validation_errors_to_error_messages
from wtforms.validators import DataRequired

notebook_routes = Blueprint('notebooks', __name__)


# Get all notebooks
@notebook_routes.route('/', methods=["GET"])
@login_required
def get_notebooks():
    user_id = current_user.id
    notebooks = Notebook.query.filter(Notebook.user_id == user_id)
    return {'notebook': [notebook.to_dict() for notebook in notebooks]}

# Get one notebook
@notebook_routes.route('/<int:notebook_id>', methods=["GET"])
@login_required
def get_one_notebook(notebook_id):
    user_id = current_user.id
    notebook = Notebook.query.get(notebook_id)
    return notebook.to_dict()

# Delete notebook
@notebook_routes.route('/<int:notebook_id>', methods=["DELETE"])
@login_required
def delete_one_notebook(notebook_id):
    user_id = current_user.id
    notebook = Notebook.query.get(notebook_id)
    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Notebook deleted'}

# Create notebook
@notebook_routes.route('/new', methods=["POST"])
@login_required
def new_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        notebook = Notebook(
            title=data['title'],
            user_id=data['user_id']
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400

#Edit notebook
@notebook_routes.route('/<int:notebook_id>/edit', methods=["PUT"])
@login_required
def edit_notebook(notebook_id):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    notebook = Notebook.query.get(notebook_id)
    print(notebook, '<====NoteBook')
    if form.validate_on_submit():
            user_id = current_user.id
            notebook.title=data['title'],
            db.session.commit()
            return notebook.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400
