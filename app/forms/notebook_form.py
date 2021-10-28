from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    title = StringField('notebook title', validators=[DataRequired()])
    submit = SubmitField('submit')
