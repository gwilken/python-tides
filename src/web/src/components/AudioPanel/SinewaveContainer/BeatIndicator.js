// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { normalize } from '../../../scripts/utils'
import SelectTempo from './SelectTempo';


const BeatIndicator = ({id, onMount}) => {
  let [currentBeat, setCurrentBeat] = useState({});
  let enables = useSelector(state => state.enables);

  useEffect(() => {
    onMount([id, setCurrentBeat]);
  }, [onMount, id]);

  // console.log(currentBeat)

  // let currentBeat = useSelector(state => state.currentBeats[id]);
  let numOfBeats = 16;
  let beatMarkers = [];

  let height = normalize(currentBeat.value, 127, 20) * 100;

  for (let i = 0; i < numOfBeats; i++) {
    beatMarkers.push(
      <div className="beat-marker-container">
        <div 
          className={`beat-marker ${i == currentBeat.beat ? "active" : ''}`}
          style={{ 
            'height': height + '%',
            'filter': enables[id] ? '' : 'grayscale(1)'}} >
          </div>
      </div>
    )
  }


  return (
    <div className="beat-indicator">
      <div className="markers-container">
        { beatMarkers }
      </div>

      <SelectTempo id={id} />
    </div>
  )
}

export default BeatIndicator;

