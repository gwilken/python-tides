import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setAvailableDevices } from '../../redux/actions';

import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar'
import StationLabel from './StationLabel/StationLabel'
import { normalize } from '../../scripts/utils'
import useMidiOutputs from '../../hooks/useMidiOutputs'


const AudioPanel = ({harmonics, selectedStation}) => {
  const dispatch = useDispatch();
  const availableDevices = useMidiOutputs([])

  // const [globalSpeed, setGlobalSpeed] = useState(.02)
  // const [globalRun, setGlobalRun] = useState(true)
  // const [instanceKey, setInstanceKey] = useState(0);

  useEffect(() => {
    console.log('availableDevices', availableDevices)
    if (availableDevices.length) {
      dispatch(setAvailableDevices(availableDevices));
    }
  }, [availableDevices])


  // const [outputDeviceId, setOutputDeviceId] = useState()

  // check if selected output was removed
  // useEffect(() => {
  //   if (availableOutputs && availableOutputs.length > 0) {
  //     let ids = availableOutputs.map(output => output.id)
  //     if(ids.indexOf(outputDeviceId) === -1) {
  //       setOutputDeviceId(null)
  //     }
  //   }
  // }, [availableOutputs])


  let sines = [];
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {
    const amps = harmonics.HarmonicConstituents.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    // const min = Math.min(...amps)
    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)

    sines = filtered.slice(0, 2)
  }

  let output;

  // if (availableOutputs.length && outputDeviceId) {
  //   output = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
  // }


  return (
    <div className="audio-panel">
      <StationLabel selectedStation={selectedStation} />

      <SinewaveContainer
        sines={ sines }
        // globalRun={ globalRun }
        // globalSpeed={ globalSpeed }
        // key={ instanceKey }
        // output={ output}
      />

      <Toolbar />
    </div>
  )
}

export default AudioPanel

