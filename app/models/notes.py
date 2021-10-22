from .db import db

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id"), nullable=False)

    # notebooks = db.relationship("Notebook", back_populates="note")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'notebook_id': self.notebook_id,
            'title': self.title,
            'content': self.content
        }
