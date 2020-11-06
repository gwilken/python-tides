import './App.scss';

import { useState, useEffect } from 'react';

import Map from './Map/Map';
import SinePanel from './SinePanel/SinePanel';


function App() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState();
  const [harmonics, setHarmonics] = useState([]);

  useEffect(() => {
    fetch('/stations/stations.geojson')
      .then(res => res.json())
      .then(data => {
        setStations(data);
      })
  }, [])

  return (
    <div className="fullscreen-container">

      <SinePanel 
        harmonics={harmonics}
        selectedStation={selectedStation}
      />  
      
      <Map 
        stations={stations} 
        setHarmonics={setHarmonics}
        setSelectedStation={setSelectedStation}
      />
    
    </div>
  );
}

export default App;
