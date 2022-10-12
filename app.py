from flask import Flask, render_template, request, url_for, flash, redirect, jsonify
from werkzeug.utils import secure_filename
from ml_model import getPrediction
from flask_cors import CORS
import os


UPLOAD_FOLDER = 'static/images'

app = Flask(__name__, static_folder="static")
CORS(app)

app.secret_key = "secret key"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/api/detect', methods=['POST'])
def upload_file():

    if request.method == 'POST':
        file = request.files['image']
        file_name = secure_filename(file.filename)
        print (file_name)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'],file_name))
        prediction = getPrediction(file_name)
        print(prediction)
        return jsonify(prediction)

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)

        # f.save('./uploaded.file')
