import json
from pprint import pp

def parse_stations():
  ''' simplyfiy stations.json '''
  with open('stations-full.json') as f:
    data = json.loads(f.read())
    grouped = []

    for item in data['stations']:
      grouped.append({
        "id": item['id'],
        "harcon_id": item['reference_id'],
        "name": item['name'],
        "coordinates": [item['lng'], item['lat']], 
        "state": item['state']
      })
    return grouped


def split_stations():
  ''' simplyfiy stations.json '''
  with open('stations-full.json') as f:
    data = json.loads(f.read())

    for item in data['stations']:
      station = {
        "id": item['id'],
        "harcon_id": item['reference_id'],
        "name": item['name'],
        "coordinates": [item['lng'], item['lat']], 
        "state": item['state']
      }

      with open(f"{item['id']}.json", 'w') as w:
        w.write(json.dumps(station))


def write_data(filename, data):
  with open(filename, 'w') as w:
    w.write(json.dumps(data))



data = parse_stations()

pp(len(data))

# split_stations()

write_data('stations-simple.json', data)
