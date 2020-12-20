from flask import Flask, jsonify, render_template, send_file, send_from_directory

from markupsafe import escape
import json
import os

ENV = os.getenv('FLASK_ENV')
PORT = os.getenv('PORT', default=5000)

app = Flask(__name__)

######### ROUTES BELOW ###########

@app.context_processor
def get_env():
  return dict(env=ENV)

@app.route('/')
def home():
  return send_file('./build/index.html')

@app.route('/<path:filename>')
def static_home(filename):
  return send_from_directory('./build', filename)

@app.route('/stations/<path:filename>')
def get_station(filename):
  return send_from_directory('./public/stations', filename)

@app.route('/harmonics/<path:filename>')
def get_harmonic(filename):
  return send_from_directory('./public/harmonics', filename)

@app.route('/static/css/<path:filename>')
def static_css(filename):
    return send_from_directory('./build/static/css', filename)

@app.route('/static/js/<path:filename>')
def static_js(filename):
    return send_from_directory('./build/static/js', filename)

@app.route('/static/media/<path:filename>')
def static_media(filename):
    return send_from_directory('./build/static/media', filename)

@app.route('/ping')
def pong():
  return 'Pong!'


####### END ROUTES #########


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)


    