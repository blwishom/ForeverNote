from .db import db

class Notebook(db.model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey("notes.id"), nullable=False)

    note = db.relationship("Note", back_populates="notebooks")
