import { useSelector } from 'react-redux';
import SinewaveContainer from './SinewaveContainer/SinewaveContainer';
import Toolbar from './Toolbar/Toolbar';
import { normalize } from '../../scripts/utils'


const AudioPanel = () => {
  const harmonics = useSelector(state => state.harmonics);

  let sines = [];
  
  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {    
    let filtered = harmonics['HarmonicConstituents'].filter(entry => entry['amplitude'] > 0)
    const amps = filtered.map(entry => entry.amplitude)
    const max = Math.max(...amps)
    const min = Math.min(...amps)

    sines = filtered.slice(0, 8).map(sine => {
      let normalizedAmp = normalize(sine.amplitude, max, min)
      sine.amplitude = normalizedAmp
      return sine
    })
  }


  return (
    <div className="audio-panel">
      <Toolbar />
      { sines.length && <SinewaveContainer sines={ sines } /> }
    </div>
  )
}

export default AudioPanel

