import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAvailableDevices, setSelectedDevice } from '../../redux/actions';

import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar'
import StationLabel from './StationLabel/StationLabel'
import { normalize } from '../../scripts/utils'
import useMidiOutputs from '../../hooks/useMidiOutputs'


const AudioPanel = ({harmonics, selectedStation}) => {
  const dispatch = useDispatch();
  const availableDevices = useMidiOutputs([])
  const selectedDevice = useSelector(state => state.selectedDevice)

  useEffect(() => {
    if (availableDevices.length) {
      dispatch(setAvailableDevices(availableDevices));
    }
  }, [availableDevices])


  // react if selected output was removed
  useEffect(() => {
    if (availableDevices && availableDevices.length > 0) {
      let ids = availableDevices.map(output => output.id)
      if(ids.indexOf(selectedDevice) === -1) {
        dispatch(setSelectedDevice(''))
      }
    }
  }, [availableDevices])


  let sines = [];
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {
    const amps = harmonics.HarmonicConstituents.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    // const min = Math.min(...amps)
    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)

    sines = filtered.slice(0, 4)
  }

  let output;

  // if (availableOutputs.length && outputDeviceId) {
  //   output = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
  // }


  return (
    <div className="audio-panel">
      <StationLabel selectedStation={selectedStation} />
      <SinewaveContainer sines={ sines } />
      <Toolbar />
    </div>
  )
}

export default AudioPanel

