import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './SineInfoOverlay.scss';


const SineInfoOverlay = ({id, onMount}) => {
  const [note, setNote] = useState();
  const range = useSelector(state => state.ranges[id]);
  const centerNote = useSelector(state => state.notes[id]);
  let value;
  let highRange;
  let lowRange;
  
  if (note) {
    value = note.value
  }

  if (centerNote && range) {
    highRange = centerNote + Math.floor(range / 2);
    lowRange = centerNote - Math.floor(range / 2);
  }

  useEffect(() => {
    onMount([id, setNote]);
  }, [onMount, id]);

  return (
    <div className="sine-info-overlay">
      <div className="high-range">
        { highRange }
      </div>
      <div className="low-range">
        { lowRange }
      </div>
      <div className="value">
        { value }
      </div>
    </div>
  )
}

export default SineInfoOverlay
