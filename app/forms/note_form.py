from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    notebook_id = IntegerField('notebook id')
    title = StringField('note title', validators=[DataRequired()])
    content = TextAreaField('note content', validators=[DataRequired()])
    submit = SubmitField('submit')
