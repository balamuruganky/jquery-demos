from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class FileUploadWithProgressBarForm(FlaskForm):
    filename = StringField('File Name', validators=[DataRequired()])
    submit = SubmitField('Browse')
