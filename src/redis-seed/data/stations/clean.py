import json
from pprint import pp

def parse_stations():
  ''' simplyfiy stations.json '''
  with open('stations-full.json') as f:
    data = json.loads(f.read())
    grouped = []
    # grouped = defaultdict(lambda: defaultdict(dict))

    for item in data['stations']:
      grouped.append({
        "reference_id": item['reference_id'],
        "id": item['id'],
        "name": item['name'],
        "lat": item['lat'],
        "lng": item['lng'],
        "state": item['state']
      })
    return grouped


def split_stations():
  ''' simplyfiy stations.json '''
  with open('stations-full.json') as f:
    data = json.loads(f.read())

    for item in data['stations']:
      station = {
        "reference_id": item['reference_id'],
        "id": item['id'],
        "name": item['name'],
        "lat": item['lat'],
        "lng": item['lng'],
        "state": item['state']
      }

      with open(f"{item['id']}.json", 'w') as w:
        w.write(json.dumps(station))


def write_data(filename, data):
  with open(filename, 'w') as w:
    w.write(json.dumps(data))

data = parse_stations()

pp(len(data))

split_stations()

# write_data('stations-simple.json', data)
