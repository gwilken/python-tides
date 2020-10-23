
# import sqlite3
import redis
import json
from pprint import pp
from collections import defaultdict 


def connect_redis():
  r = None
  try:
    r = redis.Redis(host='redis', port=6379)
    print('[ build-db ] - Connected to Redis.')
    return r
  
  except Error as e:
    print(e)

  return r


def add_stations_redis(r, stations):
  ''' Add each station as a geospatial point in Redis '''
  print('[ build-db ] - Geoadd stations to redis...')
  for id, data in stations.items():
    r.geoadd('geo-stations', data['lon'], data['lat'], id)

    for key, value in data.items():
      r.hset(id, key, value)
  return


def add_harmonics_redis(harmonics):
  print('[ build-db ] - Adding station and harmonics hashes to Redis...')
  for group in harmonics:
    id, lat, lon, num, name, amp, phase, speed = group
    key = 'harmonic:{0}:{1}'.format(num, name)
    val = '{0}:{1}:{2}'.format(amp, phase, speed)
    r.hset(id, key, val)
  return


def connect_sql():
  conn = None
  try:
    conn = sqlite3.connect(':memory:')
    # conn = sqlite3.connect('./testAll.db')
    return conn
  except Error as e:
    print(e)
  return conn


def create_sql_table(db):
  try:
    c = db.cursor()
    c.execute('''
      CREATE TABLE IF NOT EXISTS harmonics (
        station_id integer,
        latitude real,
        longitude real,
        constituent_number integer,
        name text,
        amplitude real,
        phase real,
        speed real )
    ''')

  except Error as e:
    print(e)


def insert_sql_values(connection, values):
  cursor = connection.cursor()
  cursor.execute('INSERT INTO harmonics VALUES (?,?,?,?,?,?,?,?)', values)
  connection.commit()
  return cursor.lastrowid


def parse_harmonics():
  ''' Parse harmonics csv data '''
  print('[ build-db ] - Parsing harmonic csv data...')
  with open('./harmonics.csv') as f:
    ''' note: data units: meters, time in GMT, speed degrees/hour '''
    header = []
    data = []
    first_line = f.readline().split(',')
    for label in first_line:
      word, *_ = label.split()
      header.append(word.strip('"'))

    for line in f.readlines():
      station_id, latitude, longitude, constituent_number, name, amplitude, phase, speed = line.split(',')
      data.append([
        int(station_id),
        float(latitude),
        float(longitude),
        int(constituent_number),
        name,
        float(amplitude),
        float(phase),
        float(speed)
      ])
    return data


def parse_stations():
  ''' Parse stations info from geojson '''
  print('[ build-db ] - Parsing station geojson data...')
  with open('./stations.geojson') as f:
    geojson = json.loads(f.read())
    grouped = defaultdict(lambda: defaultdict(dict))
    for line in geojson:
      grouped[line['properties']['ID']] = {
        'name': line['properties']['name'],
        'state': line['properties']['metadata']['location']['state'],
        'lon': line['geometry']['coordinates'][0],
        'lat': line['geometry']['coordinates'][1],
        'date_established': line['properties']['metadata']['date_established']
      }
    return grouped


if __name__ == '__main__':
  r = connect_redis()
  data = parse_harmonics()
  stations = parse_stations()
  add_stations_redis(r, stations)
  add_harmonics_redis(data)
  print('[ build-db ] - Done.')
