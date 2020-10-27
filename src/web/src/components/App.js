import './App.scss';

import { useState } from 'react';

// import Map from './Map/Map'
import Sinewave from './Sinewave/Sinewave';
// import useMidi from '../hooks/useMidi'

// import midi from '../utils/midi-manager'


// midi.initialize()


function App() {
  let [ value, setValue ] = useState()
  // let midi = useMidi()

  // console.log('midi', midi)

  return (
    <div className="App fullscreen-container">
      <header className="App-header">
      </header>
      {/* <Map /> */}
      
      {/* TODO: have to normalize all amplitudes before passing to Sine comp. */}
   

      <div className="sines-container">

          <Sinewave
            number="1" 
            name="M2"
            description="Principal lunar semidiurnal constituent"
            amp="1"
            phase="0"
            speed="13"
          />

        {/* <Sinewave 
          amp="1"
          phase="180"
          speed="1" />

        <Sinewave 
          amp=".75"
          phase="10"
          speed="50" /> */}

        </div>
    </div>
  );
}

export default App;
