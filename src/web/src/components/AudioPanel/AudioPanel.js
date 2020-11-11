import {useState} from 'react';

import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar'
import StationLabel from './StationLabel/StationLabel'
import { normalize } from '../../utils/utils'


const AudioPanel = ({harmonics, selectedStation}) => {
  const [globalSpeed, setGlobalSpeed] = useState(.02)
  const [globalRun, setGlobalRun] = useState(true)
  const [instanceKey, setInstanceKey] = useState(0);

  let sines = [];
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {
    const amps = harmonics.HarmonicConstituents.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    // const min = Math.min(...amps)
    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)

    sines = filtered.slice(0, 1)
  }


  return (
    <div className="audio-panel">
      <StationLabel 
        selectedStation={selectedStation}
      />

      <Toolbar
        globalSpeed={ globalSpeed }
        setGlobalSpeed={ setGlobalSpeed }
        globalRun={ globalRun }
        setGlobalRun={ setGlobalRun }
        instanceKey={ instanceKey }
        setInstanceKey={ setInstanceKey }
      />

      <div className="sines-container">
        <SinewaveContainer
          sines={ sines }
          globalRun={ globalRun }
          globalSpeed={ globalSpeed }
          key={ instanceKey }
        />
      </div>
    </div>
  )
}

export default AudioPanel

