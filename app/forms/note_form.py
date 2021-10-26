from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    notebook_id = IntegerField('Notebook Id')
    title = StringField('Note Title', validators=[DataRequired("Please add a title"), Length(-1, 3000, "Max length is 3000 characters")])
    content = TextAreaField('Note Content', validators=[DataRequired("Please add a note.")])
    submit = SubmitField('Submit')
