import { useEffect, useRef, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setCurrentBeat } from '../../../redux/actions';

import { normalize } from '../../../scripts/utils';
import noteScheduler from '../../../scripts/NoteScheduler';

// import MidiDispatch from './MidiDispatch/MidiDispatch';
import BeatIndicator from './BeatIndicator';

import Controls from './Controls/Controls';

import './SinewaveContainer.scss';


const SinewaveContainer = ({ sines, globalRun, output }) => {  
  const prevEnableRef = useRef(true);
  const divRefs = useRef(sines.map(() => createRef()));
  // keep track of number pattern repeats in canvas. used for animation
  const repeatRefs = useRef(sines.map(() => createRef()));
  const translateXRefs = useRef(sines.map(() => createRef()));

  let sinesDataArr = useRef(sines.map(() => createRef()));

  let sinesCurrentVal = sines.map(() => [])


  let speed = useSelector(state => state.speed);
  let ranges = useSelector(state => state.ranges);
  let notes = useSelector(state => state.notes);

  const dispatch = useDispatch();

  let xPercentage = 0;


  // useEffect(() => {
  //   noteScheduler.setOutput(output)
  // }, [output])


  useEffect(() => {
    // let metronome = new Worker('/webworkers/metronome-worker.js')

    /////// DRAW SETUP START //////////

    // save calc in array so we dont recalc every tick to get value
    // we'll use css tranform translateX instead of redrawing every frame for performance
    sines.forEach((data, index) => {
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d', { alpha: false });

      const {amplitude, phase_local, speed} = data;          
      const height = 75;

      let lineWidth = 4
      let lineWidthRatio = lineWidth / height

      let period = (Math.PI * 2) / speed;
  
      let tempDataArr = [];

      for (let x = 0; x < period; x += .0025) {
        let y = amplitude * (Math.sin(speed * x + phase_local));
        let drawY = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        
        tempDataArr.push({
          y: parseFloat(y.toFixed(4)),
          drawY
        });
      }
      
      let tempWidth = tempDataArr.length;

      // we want width of final div to be at least 1500px (triple the wrapper div's 500px)
      // and repeat pattern without getting cutting off
      let canvasWidth = 1500 + (tempWidth - (((1500 / tempWidth) % 1) * tempWidth));
      canvas.width = canvasWidth

      // save num of repeats. will need for animation later.
      let numOfRepeats = canvasWidth / tempWidth;
      repeatRefs.current[index].current = numOfRepeats

      canvas.height = height

      canvasContext.fillStyle = '#badefd';
      canvasContext.rect(0, 0, canvasWidth, height);
      canvasContext.fill(); 

      canvasContext.beginPath();
      canvasContext.moveTo(0, height);
      canvasContext.lineWidth = lineWidth;
      canvasContext.strokeStyle = '#0e85ea';

      let lastY;

      sinesDataArr.current[index].current = [];

      // loop through our draw array repeating to fill canvas width, draw, and populate an arr of all values
      for (let i = 0; i < canvasWidth; i++) {
        let sinesDataIndex = i % tempDataArr.length;
        let tempY = tempDataArr[sinesDataIndex].drawY;
        // flip the sine wave because canvas 0,0 starts at upper left, not lower right
        let flipepdY = height - (tempY * height);
        canvasContext.lineTo(i, flipepdY);
        sinesDataArr.current[index].current.push(tempDataArr[sinesDataIndex].y);
        lastY = flipepdY;
      }

      // we do this with lastY to avoid a slight visible line between repeats
      canvasContext.lineTo(canvasWidth + (lineWidth * 2), lastY);
      canvasContext.lineTo(canvasWidth + lineWidth * 2, height);
      canvasContext.lineTo(0, height)
      canvasContext.stroke();
      canvasContext.fillStyle = 'white';
      canvasContext.fill(); 

      const image = canvas.toDataURL();

      divRefs.current[index].current.style.backgroundImage = `url(${image})`;
      divRefs.current[index].current.style.width = `${canvasWidth}px`;
    })
  }, [])


  ////// ANIMATION START //////////

  useEffect(() => {
    let then = 0;
    let elapsed;
    let requestId;

    let start = window.performance.now();

    noteScheduler.channels.forEach((channel, index) => {
      noteScheduler.channels[index].nextNoteTime = start;
    })


    const loop = (now) => {
      requestId = requestAnimationFrame(loop);

      if (now === undefined) {
        now = window.performance.now();
      }

      elapsed = now - then;
      
      sines.forEach((data, index) => {
        let repeat = repeatRefs.current[index].current;

        let xOffset = (now / speed) % (100 / repeat);

        translateXRefs.current[index].current = xOffset;

        divRefs.current[index].current.style.transform = 'translateX(-' + translateXRefs.current[index].current  + '%)'

        while (noteScheduler.channels[index].notesInQueue.length && noteScheduler.channels[index].notesInQueue[0].time < now) {
          // currentNote = notesInQueue[0].note;
          let currentNote = noteScheduler.channels[index].notesInQueue.splice(0,1);   // remove note from queue
          dispatch(setCurrentBeat({id: index, beat: currentNote[0] }))
          // console.log(currentNote[0].beat)
        }

        let length = sinesDataArr.current[index].current.length;

        let offsetPercent = xOffset * .01;

        if (length) {
          // gets value at read head. 250 = half of wrapper width
          let arrIndex = Math.floor((length * offsetPercent) + 250)
          
          // wrap around in case we over shoot arr length
          let val = sinesDataArr.current[index].current[arrIndex % length];
          
          sinesCurrentVal[index] = val;
  
          let lookAheadIndex = Math.floor((length * offsetPercent) + 275)
          let lookAheadVal = sinesDataArr.current[index].current[lookAheadIndex % length];

          let range = ranges[index];
          let note = notes[index];
      
          let midiValue = note + Math.floor((lookAheadVal * range) / 2)

          
          // let midiValue = Math.floor(parseFloat(lookAheadVal) * parseInt(range)) + (parseInt(note) - (Math.floor(parseInt(range) / 2)))
          // let lowRange = note - Math.floor(range / 2);
          // let highRange = lowRange + note;
          
          // let midiValue = parseInt(note) - Math.floor(parseInt(range) / 2) + Math.floor(parseFloat(lookAheadVal * note));
          
          
          // console.log('value', value)
          let clampedMidiValue = Math.min(Math.max(midiValue, 21), 127);
          // let clampedMidiValue = 69;

          // 25 = 375px read ahead minus 250px head position
          let scheduleTimeOffset = (speed / 16.6666) * 25;

          // let midiValue = Math.floor(parseFloat(lookAheadVal) * parseInt(range)) + (parseInt(note) - (Math.floor(parseInt(range) / 2)))
          // let midiValue = Math.floor(parseFloat(lookAheadVal) * 24) + (63)
          // let clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
          // let currentLookAheadValue = clampedMidiValue
          // let currentChannel = index;
          
          // metronome.onmessage = (e) => {
            // if (e.data === 'tick') {
              // console.log('tick', index)
              // noteScheduler.scheduler(lookAheadVal, scheduleTimeOffset, currentChannel);
            // }
          // }
          
          // every 50ms schedule future notes
          if (elapsed > 50) {
            noteScheduler.scheduler(clampedMidiValue, scheduleTimeOffset, index);
            then = now
          }

        }
      })
    }
    
    loop();
    
    return () => cancelAnimationFrame(requestId);
  }, [speed, ranges, notes])


  let value = null;
  let setValue = null;

  return (
    <div className="sines-container">
      {
        sines.map((data, index) => (
          <div className="sinewave-container">  
            <div className="canvas-wrapper">
              <div className="sine-div" ref={ divRefs.current[index] }></div>
              <div className="read-head"></div>
              <div className="label">{data.description}</div>
              {/* <div className="lookahead-head"></div> */}
            </div>
            
            <BeatIndicator id={index} />

            <Controls id={index} />

          </div>
        ))
      }
    </div>
  );
}

export default SinewaveContainer
