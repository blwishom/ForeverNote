from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField('Note Title', validators=[DataRequired("Please add a title"), Length(-1, 3000, "Max length is 3000 characters")])
    content = TextAreaField('Note Content', validators=[DataRequired("Please add a note.")])
    submit = SubmitField('Submit')
