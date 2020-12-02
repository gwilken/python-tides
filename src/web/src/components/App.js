import './App.scss';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWindowSize } from '../redux/actions';

import Map from './Map/Map';
import AudioPanel from './AudioPanel/AudioPanel';
import { debounce } from './../scripts/utils';

import testData from './test-data';

function App() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState();
  const [harmonics, setHarmonics] = useState(testData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/stations/stations.geojson')
      .then(res => res.json())
      .then(data => {
        setStations(data);
      })
  }, [])


  window.addEventListener('resize', debounce(() => {
    dispatch(setWindowSize({
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }));
  }))


  return (
    <div className="fullscreen-container">

      <AudioPanel 
        harmonics={harmonics}
        selectedStation={selectedStation}
      />  
      
      {/* <Map 
        stations={stations} 
        setHarmonics={setHarmonics}
        setSelectedStation={setSelectedStation}
      /> */}
    
    </div>
  );
}

export default App;
