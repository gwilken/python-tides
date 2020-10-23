from urllib.request import urlopen
import json
import gzip
import threading
from pprint import pp
from time import perf_counter as time


def scrape_id(id):
  harcon_url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{0}/harcon.json'.format(id)
  with urlopen(harcon_url) as u:
    page = json.loads(u.read().decode('utf-8'))
  
  with open(f'./harmonics/{id}.json', 'w') as f:
    f.write(json.dumps(page))



def scrape_site(site):
  with urlopen(site) as u:
    # gzip_page = gzip.GzipFile(fileobj=u)
    # page = json.loads(gzip_page.read().decode('utf-8'))
    page = json.loads(u.read().decode('utf-8'))
    # page = u.read().decode('utf-8')
    return page


def write_file(file, data):
  with open(file, 'w') as f:
    f.write(data)





id = 1820000
# site =  'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{0}.json'.format(id)
stations_url =  'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

# site =  'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon'

data = scrape_site(stations_url)

# print('num of stations:', len(data['stations']))

ids = { station['id'] for station in data['stations'] }

ref_ids_set = { station['reference_id'] for station in data['stations'] }

ref_ids = list(ref_ids_set)



start = time()

workers = []

for id in ids:
  print(f'scraping {id}...')
  t = threading.Thread(target=scrape_id, args=[id])
  t.start()
  workers.append(t)

for w in workers:
    w.join()


end = time()

print('Done in:', end - start)
