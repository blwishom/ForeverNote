from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Note

note_routes = Blueprint('notes', __name__)


@note_routes.route('/')
@login_required
def get_notes():
    notes = Note.query.all()
    return {'note': [note.to_dict() for note in notes]}


@note_routes.route('/<int:id>')
@login_required
def note(id):
    note = Note.query.get(id)
    return note.to_dict()
