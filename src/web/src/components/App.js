import './App.scss';

// import { useState } from 'react';

// import Map from './Map/Map'
import SinePanel from './SinePanel/SinePanel'

// import midi from '../utils/midi-manager'


// midi.initialize()


function App() {

  return (
    <div className="fullscreen-container">
      <header className="header">
      </header>

      <SinePanel />  
      
      {/* <Map /> */}
    
    </div>
  );
}

export default App;
