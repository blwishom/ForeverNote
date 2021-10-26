from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    title = StringField('Note Title', validators=[DataRequired("Please add a title"), Length(-1, 3000, "Max length is 3000 characters")])
    submit = SubmitField('Submit')
