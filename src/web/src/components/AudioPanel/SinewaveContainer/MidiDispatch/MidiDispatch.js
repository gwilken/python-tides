// import noteScheduler from '../../../../scripts/NoteScheduler';

import {useState, useEffect} from 'react';

const MidiDispatch = ({onMount}) => {
  const [value, setValue] = useState({});

  useEffect(() => {
    onMount([value, setValue]);
  }, [onMount, value]);


  // useEffect(() => {
  //   noteScheduler.setOutput(output)
  // }, [output])


  // useEffect(() => {
  //   let metronome = new Worker('/webworkers/metronome-worker.js')
  // })

  // let start = window.performance.now();

  // noteScheduler.channels.forEach((channel, index) => {
  //   noteScheduler.channels[index].nextNoteTime = start;
  // })

  // metronome.postMessage('start')

  return (
    <div>
      <div>
        { value.value }
      </div>
      <div>
        { value.time }
      </div>
    </div>
  )
}

export default MidiDispatch;

