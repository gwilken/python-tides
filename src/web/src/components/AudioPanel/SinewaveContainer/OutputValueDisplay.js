import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MIDI_NOTES from './../../../constants/midi-notes';


const OutputValueDisplay = ({id, onMount}) => {
  let [currentBeat, setCurrentBeat] = useState(null);
  let modes = useSelector(state => state.modes)

  useEffect(() => {
    onMount([id, setCurrentBeat]);
  }, [onMount, id]);

  let note;

  if (currentBeat && currentBeat.beatActivated) {
    note = MIDI_NOTES.filter(elem => parseInt(elem.midi) === currentBeat.value)
  }

  return (
    <div className="output-value-container">
      <div className="value-container">
        <span className="value"> { note && note.length && note[0].midi && note[0].midi }</span>
        <span className="label">midi</span>
      </div>

      { modes[id] === 'NOTE_ON' && 
        <div className="value-container">
          <span className="value"> { note && note.length && note[0].name && note[0].name}</span>
          <span className="label">english</span>
        </div>
      }
    </div>
  )
}


export default OutputValueDisplay;