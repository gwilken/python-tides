import { useState, useEffect } from 'react';

import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar'
import StationLabel from './StationLabel/StationLabel'
import { normalize } from '../../utils/utils'
import useMidiOutputs from '../../hooks/useMidiOutputs'


const AudioPanel = ({harmonics, selectedStation}) => {
  const [globalSpeed, setGlobalSpeed] = useState(.02)
  const [globalRun, setGlobalRun] = useState(true)
  const [instanceKey, setInstanceKey] = useState(0);

  const availableOutputs = useMidiOutputs([])
  const [outputDeviceId, setOutputDeviceId] = useState()

  // check if selected output was removed
  useEffect(() => {
    if (availableOutputs && availableOutputs.length > 0) {
      let ids = availableOutputs.map(output => output.id)
      if(ids.indexOf(outputDeviceId) === -1) {
        setOutputDeviceId(null)
      }
    }
  }, [availableOutputs])


  let sines = [];
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {
    const amps = harmonics.HarmonicConstituents.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    // const min = Math.min(...amps)
    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)

    sines = filtered.slice(0, 8)
  }

  let output;

  if (availableOutputs.length && outputDeviceId) {
    output = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
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
        availableOutputs={ availableOutputs }
        outputDeviceId={ outputDeviceId }
        setOutputDeviceId={ setOutputDeviceId }
        instanceKey={ instanceKey }
        setInstanceKey={ setInstanceKey }
      />

      <div className="sines-container">
        <SinewaveContainer
          sines={ sines }
          globalRun={ globalRun }
          globalSpeed={ globalSpeed }
          key={ instanceKey }
          output={ output}
        />
      </div>
    </div>
  )
}

export default AudioPanel

