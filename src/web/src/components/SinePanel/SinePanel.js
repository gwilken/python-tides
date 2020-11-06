import {useState} from 'react';

import useMidiOutputs from '../../hooks/useMidiOutputs'
import SinewaveContainer from '../SinewaveContainer/SinewaveContainer';
import Toolbar from '../Toolbar/Toolbar'
import StationLabel from '../StationLabel/StationLabel'
import { normalize } from '../../utils/utils'

const SinePanel = ({harmonics, selectedStation}) => {
  const availableOutputs = useMidiOutputs([])
  const [globalSpeed, setGlobalSpeed] = useState(.05)
  const [globalRun, setGlobalRun] = useState(true)
  const [channels, setChannels] = useState(new Array(16).fill(0))
  const [instanceKey, setInstanceKey] = useState(0);

  let sines = [];
  
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {
    const amps = harmonics.HarmonicConstituents.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    // const min = Math.min(...amps)
    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)

    sines = filtered.slice(0, 8).map((entry, index) => (
      <SinewaveContainer
        number={entry['number']}
        name={entry['name']}
        description={entry['description']}
        amp={ normalize(entry['amplitude'], max, 0) }
        phase={entry['phase_local']}
        freq={entry['speed']}
        availableOutputs={ availableOutputs }
        channels={ channels }
        setChannels={ setChannels }
        globalRun={ globalRun }
        globalSpeed={ globalSpeed }
        key={ index + instanceKey }
      />
    ))
  }


  return (
    <div className="sine-panel">
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
        { sines }
      </div>
    </div>
  )
}

export default SinePanel

