from flask import Flask, jsonify, render_template, send_file, send_from_directory

from markupsafe import escape
import redis
import json

app = Flask(__name__)

def connect_redis():
  r = None
  try:
    r = redis.Redis(host='127.0.0.1', port=6379, decode_responses=True)
    print('[ build-db ] - Connected to Redis.')
    return r
  
  except Error as e:
    print(e)

  return r


r = connect_redis()



######### ROUTES BELOW ###########


@app.route('/')
@app.route('/<name>')
def home(name=None):
  return render_template('skeleton.template', name=name)


@app.route('/station/<id>')
def get_id(id):
  # data = r.hgetall(id)
  # json_data = jsonify(str(data))
  # print(json_data)
  # data_json = json.dumps(data)
  return send_file(f'/harmonics/{id}.json')


@app.route('/ping')
def pong():
  return 'Pong!'


@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory('/static', filename)


####### END ROUTES #########


if __name__ == "__main__":
    app.run(host='0.0.0.0')


    