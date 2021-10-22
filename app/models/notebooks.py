from .db import db

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    notes = db.relationship("Note", back_populates="notebooks")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'note': [note.to_dict() for note in self.notes],
        }
