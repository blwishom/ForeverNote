from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NotebookForm

notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route('/', methods=["GET"])
@login_required
def get_notebooks():
    user_id = current_user.id
    notebooks = Notebook.query.filter(Notebook.user_id == user_id)
    return {'notebook': notebook.to_dict() for notebook in notebooks}

@notebook_routes.route('/<int:notebook_id>', methods=["GET"])
@login_required
def get_one_notebook(notebook_id):
    user_id = current_user.id
    notebook = Notebook.query.get(notebook_id)
    return notebook.to_dict()

@notebook_routes.route('/', methods=["POST"])
@login_required
def new_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookie['csrf_token']
    if form.validate_on_submit():
        data = form.data
        notebook = Notebook(
            title=data['title'],
            content=data['content']
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
