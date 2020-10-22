
# import sqlite3
import redis
import json
from pprint import pp
from collections import defaultdict 


def connect_redis():
  r = None
  try:
    r = redis.Redis(host='localhost', port=6379)
    return r
  
  except Error as e:
    print(e)

  return r


def add_stations_redis(r, stations):
  for id, data in stations.items():
    r.geoadd('geo-stations', data['lon'], data['lat'], id)

    for key, value in data.items():
      r.hset(id, key, value)
  return


def add_harmonics_redis(harmonics):
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
  with open('./harmonics.csv') as f:
    ''' note: data units: meters, time in GMT, speed degrees/hour '''
    header = []
    data = []
    first_line = f.readline().split(',')
    for label in first_line:
      word, *_ = label.split()
      header.append(word.strip('"'))
    
    # print(header)

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



r = connect_redis()

data = parse_harmonics()

stations = parse_stations()

add_stations_redis(r, stations)

add_harmonics_redis(data)

# pp(data)

# print(len(data))
# print(data[-1:])

# id, lat, lon, *_ = data[-1:][0]

# add_station_redis(r, id, lat, lon)


# c = connect_sql()

# create_sql_table(c)





# for line in x:
#   pp(line)

# pp( x['1820000'])

# y = [ k for k in x['1820000'] for  ]

# y = []
# for k, v in x['1820000'].items():
#   y.append(k)
#   y.append(v)

# data = [(k, v) for k, v in stations['1820000'].items()]

# flat_data = [a for tup in data for a in tup]

# print (flat_data)



# r.hset('1820000', *flat_data)

# pp(x)

