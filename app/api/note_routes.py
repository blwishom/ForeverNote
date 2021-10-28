from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm
from app.api.auth_routes import validation_errors_to_error_messages


note_routes = Blueprint('notes', __name__)

# Get all notes
@note_routes.route('/', methods=["GET"])
@login_required
def get_notes():
    user_id = current_user.id
    notes = Note.query.filter(Note.user_id == user_id).all()
    print(notes, '<-----------------------------------------------NOTES')
    return {'notes': [note.to_dict() for note in notes]}

# Get one note
@note_routes.route('/<int:note_id>', methods=["GET"])
@login_required
def get_one_note(note_id):
    user_id = current_user.id
    note = Note.query.get(note_id)
    return note.to_dict()

# Delete note
@note_routes.route('/<int:note_id>', methods=["DELETE"])
@login_required
def delete_one_note(note_id):
    user_id = current_user.id
    note = Note.query.get(note_id)
    db.session.delete(note)
    db.session.commit()
    return {'message': 'Note deleted'}

# Create note
@note_routes.route('/new', methods=["POST"])
@login_required
def new_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        note = Note(
            title=data['title'],
            content=data['content'],
            user_id =data['user_id'],
            notebook_id=data['notebook_id']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit note
@note_routes.route('/<int:note_id>/edit', methods=["PUT"])
@login_required
def edit_note(note_id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    note = Note.query.get(note_id)
    if form.validate_on_submit():
            note.title=data['title'],
            note.content=data['content'],
            db.session.commit()
            return note.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400
