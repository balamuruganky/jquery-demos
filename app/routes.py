import os
from flask import render_template, flash, redirect, request
from app import app
from app.forms import FileUploadWithProgressBarForm
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['img', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER      = '/home/bala/test/'

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

########################################################################
############# file_upload_progressbar start ############################
########################################################################
@app.route('/file_upload_progressbar', methods=['GET', 'POST'])
def file_upload_progressbar():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect(request.url)
    return render_template('fileuploadprogressbar.html')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

########################################################################
############# file_upload_progressbar end ##############################
########################################################################