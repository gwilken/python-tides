import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import { normalize } from '../../../scripts/utils'
import SelectBeatPattern from './SelectBeatPattern';


const BeatIndicator = ({id, onMount}) => {
  let [currentBeat, setCurrentBeat] = useState({});
  let enables = useSelector(state => state.enables);
  let beatSelections = useSelector(state => state.beatSelections[id]);

  let dispatch = useDispatch();

  useEffect(() => {
    onMount([id, setCurrentBeat]);
  }, [onMount, id]);

  // console.log(currentBeat)

  // let currentBeat = useSelector(state => state.currentBeats[id]);
  let numOfBeats = 16;
  let beatMarkers = [];

  let height = normalize(currentBeat.value, 127, 30) * 100;


  function toggleSelection(index) {
    let newSelections = beatSelections;
    newSelections[index] = !newSelections[index];
    dispatch(setBeatSelections({id, beats: newSelections }))
  }


  for (let i = 0; i < numOfBeats; i++) {
    beatMarkers.push(
      <div className={
          `beat-marker-container 
          ${beatSelections[i] ? 'selected' : ''}
          ${enables[id] ? '' : 'disabled'}`
        }
        onClick={ () => toggleSelection(i) }>

        <div className={`beat-marker ${i == currentBeat.beat ? "active" : ''}`}
          style={{ 'height': height + '%' }} >
          </div>
      </div>
    )
  }


  return (
    <div className="beat-indicator">
      <div className="markers-container">
        { beatMarkers }
      </div>

      <SelectBeatPattern id={id} />
    </div>
  )
}

export default BeatIndicator;

