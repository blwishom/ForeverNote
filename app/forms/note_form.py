from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    notebook_id = IntegerField('notebook id')
    title = StringField('note title', validators=[DataRequired("Please enter a title between 1 and 25 characters."), Length(min=1, max=25, message="Title must be between 5 and 25 characters.")])
    content = TextAreaField('note content', validators=[DataRequired("Please write a note between 5 and 255 characters."), Length(min=5, max=25, message="Content must be between 5 and 255 characters.")])
    submit = SubmitField('submit')
