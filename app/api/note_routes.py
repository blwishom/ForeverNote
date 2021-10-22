from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm

note_routes = Blueprint('notes', __name__)


@note_routes.route('/', methods=["GET"])
@login_required
def get_notes():
    user_id = current_user.id
    notes = Note.query.filter(Note.user_id == user_id)
    return {'note': note.to_dict() for note in notes}

@note_routes.route('/<int:note_id>', methods=["GET"])
@login_required
def get_one_note(note_id):
    user_id = current_user.id
    note = Note.query.get(note_id)
    return note.to_dict()


# @note_routes.route('/<int:note_id>')
# @login_required
# def note(id):
#     user_id = current_user.id
#     note = Note.query.filter(Note.user_id == user_id).first()
#     return note.to_dict()


@note_routes.route('/', methods=["POST"])
@login_required
def new_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookie['csrf_token']
    if form.validate_on_submit():
        data = form.data
        note = Note(
            title=data['title'],
            content=data['content']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
