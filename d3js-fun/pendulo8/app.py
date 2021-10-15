from flask import Flask, request, jsonify, json, abort, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
import os
import json
import re
import subprocess
import traceback

app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET', 'POST'])
def main():
    return "hello world"

@app.route('/test1', methods=['GET', 'POST'])
def r_test1():
    miserables = json.loads(open("miserables.json").read())
    return jsonify(miserables)

@app.route('/test2', methods=['GET', 'POST'])
def r_test2():
    data = {
        "nodes": [
            { "id": 0, "r": 5 },
            { "id": 1, "r": 5 },
        ],
        "links": [
            { "source": 0, "target": 1 },
        ]
    }
    return jsonify(data)

# gunicorn --workers=2 'app:create_app()' --bind=0.0.0.0:<port>
def create_app():
    return app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)