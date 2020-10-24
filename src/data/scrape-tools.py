from urllib.request import urlopen
import json
import gzip
import threading
from pprint import pp
from time import perf_counter as time


def scrape_id(id):
  ''' Get harmonic constituents JSON from url by id and write each to file '''
  harcon_url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/{0}/harcon.json'.format(id)
  with urlopen(harcon_url) as u:
    page = json.loads(u.read().decode('utf-8'))
  
  with open(f'./harmonics/{id}.json', 'w') as f:
    f.write(json.dumps(page))



def scrape_site(site):
  ''' Get a url and return '''
  with urlopen(site) as u:
    # gzip_page = gzip.GzipFile(fileobj=u)
    # page = json.loads(gzip_page.read().decode('utf-8'))
    page = json.loads(u.read().decode('utf-8'))
    # page = u.read().decode('utf-8')
    return page


def write_file(file, data):
  with open(file, 'w') as f:
    f.write(data)




stations_url =  'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'
# site =  'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon'

data = scrape_site(stations_url)

# ids = { station['id'] for station in data['stations'] }

# only the reference_ids have harmonic info, so we dont scrape for all ids
ref_ids_set = { station['reference_id'] for station in data['stations'] }

ref_ids = list(ref_ids_set)



start = time()

workers = []

for id in ref_ids:
  print(f'scraping {id}...')
  t = threading.Thread(target=scrape_id, args=[id])
  t.start()
  workers.append(t)

for w in workers:
    w.join()


end = time()

print('Done in:', end - start)
