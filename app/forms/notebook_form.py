from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    title = StringField('notebook title', validators=[DataRequired("Please enter a title between 1 and 25 characters."), Length(min=1, max=25, message="Title must be between 5 and 25 characters.")])
    submit = SubmitField('submit')
