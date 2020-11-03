import json
from pprint import pp

def simplyfiy_stations():
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

    with open('stations-simple.json', 'w') as w:
      w.write(json.dumps(grouped))


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

      with open(f"./stations/{item['id']}.json", 'w') as w:
        w.write(json.dumps(station))



def geojson_stations(data):
  id = 0
  
  collection = {
    "type": "FeatureCollection",
    "features": []
  }

  for item in data:
    collection["features"].append({
      "type": "Feature",
      "geometry" : {
          "type": "Point",
          "coordinates": item["coordinates"],
          },
      "properties" : {
        "harcon_id": item["harcon_id"],
        "id": item["id"],
        "name": item["name"],
        "state": item["state"]
      },
      "id": id
    })
    id += 1

  with open('stations.geojson', 'w') as f:
    f.write(json.dumps(collection))




# def write_data(filename, data):
#   with open(filename, 'w') as w:
#     w.write(json.dumps(data))



# data = parse_stations()

# pp(len(data))

# split_stations()

# simplyfiy_stations()


with open('stations-simple.json') as f:
  data = json.loads(f.read())

  geojson_stations(data)

# write_data('stations-simple.json', data)
