import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableDevices, setSelectedDevice } from '../../redux/actions';

import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar';
// import { normalize } from '../../scripts/utils'
import useMidiOutputs from '../../hooks/useMidiOutputs';
// import { setCollapsed } from '../../redux/actions';


const AudioPanel = () => {
  const dispatch = useDispatch();
  const availableDevices = useMidiOutputs([]);
  const selectedDevice = useSelector(state => state.selectedDevice);
  const harmonics = useSelector(state => state.harmonics);

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

    sines = filtered.slice(0, 1)
  }


  // if (availableOutputs.length && outputDeviceId) {
  //   output = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
  // }

  console.log('sines', sines)

  return (
    <div className="audio-panel">
      { sines.length && <SinewaveContainer sines={ sines } /> }

      <Toolbar />
    
    </div>
  )
}

export default AudioPanel

