import { useState, useEffect, useRef, createRef } from 'react';
import { normalize } from '../../../utils/utils';
import noteScheduler from '../../../scripts/NoteScheduler';

// import MidiDispatch from './MidiDispatch/MidiDispatch';


import Controls from './Controls/Controls';

import './SinewaveContainer.scss';


const SinewaveContainer = ({ sines, globalRun, output }) => {  
  const [channels, setChannels] = useState(new Array(16).fill(0))

  const prevEnableRef = useRef(true);

  const [isEnabled, setEnabled] = useState(prevEnableRef.current);
  
  // mapping settings
  const [mode, setMode] = useState('NOTE_ON')
  const [note, setNote] = useState('69')
  const [ccParameter, setCC] = useState(0x03)
  const [modeRange, setModeRange] = useState(127)
  
  // output setting
  // const [outputDeviceId, setOutputDeviceId] = useState()
  const [outputChannel, setOutputChannel] = useState(0)

  // ui settings
  const [collapsed, setCollapsed] = useState(true);

  // refs
  const divRefs = useRef(sines.map(() => createRef()));
  // keep track of number pattern repeats in canvas. used for animation
  const repeatRefs = useRef(sines.map(() => createRef()));
  const translateXRefs = useRef(sines.map(() => createRef()));


  let sinesDataArr = sines.map(() => [])
  let sinesCurrentVal = sines.map(() => [])

  let globalSpeed = 500;
  let xPercentage = 0;

  //look ahead in % - actual amount is 3X this value
  let lookAheadAmount = 1;
  let lookAheadPercentage = xPercentage + lookAheadAmount;
  


  useEffect(() => {
    noteScheduler.setOutput(output)
  }, [output])


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

      // loop through our draw array repeating to fill canvas width, draw, and populate an arr of all values
      for (let i = 0; i < canvasWidth; i++) {
        let sinesDataIndex = i % tempDataArr.length;
        let tempY = tempDataArr[sinesDataIndex].drawY;
        // flip the sine wave because canvas 0,0 starts at upper left, not lower right
        let flipepdY = height - (tempY * height);
        canvasContext.lineTo(i, flipepdY);
        sinesDataArr[index].push(tempDataArr[sinesDataIndex].y);
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


    ////// ANIMATION START //////////

    
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
      then = now
      
      sines.forEach((data, index) => {
        let repeat = repeatRefs.current[index].current;
        let xOffset = (now / globalSpeed) % (100 / repeat);

        translateXRefs.current[index].current = xOffset;

        divRefs.current[index].current.style.transform = 'translateX(-' + translateXRefs.current[index].current  + '%)'

        while (noteScheduler.channels[index].notesInQueue.length && noteScheduler.channels[index].notesInQueue[0].time < now) {
          // currentNote = notesInQueue[0].note;
          noteScheduler.channels[index].notesInQueue.splice(0,1);   // remove note from queue
        }

        let length = sinesDataArr[index].length;
        let offsetPercent = xOffset * .01;

        if (length) {
          // gets value at read head. 250 = half of wrapper width
          let arrIndex = Math.floor((length * offsetPercent) + 250)
          
          // wrap around in case we over shoot arr length
          let val = sinesDataArr[index][arrIndex % length];

          if (setValue) {
            setValue({
              value: val,
              time: now
            })
          }
  
          let lookAheadIndex = Math.floor((length * offsetPercent) + 275)
          let lookAheadVal = sinesDataArr[index][lookAheadIndex % length];

          // 25 = 375px read ahead minus 250px head position
          let scheduleTimeOffset = (globalSpeed / elapsed) * 25;

          // let midiValue = Math.floor(parseFloat(lookAheadVal) * parseInt(modeRange)) + (parseInt(note) - (Math.floor(parseInt(modeRange) / 2)))
          // let midiValue = Math.floor(parseFloat(lookAheadVal) * 24) + (63)
          // let clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
          // let currentLookAheadValue = clampedMidiValue
          let currentChannel = index;
          
          // metronome.onmessage = (e) => {
            // if (e.data === 'tick') {
              // console.log('tick', index)
              noteScheduler.scheduler(lookAheadVal, scheduleTimeOffset, currentChannel);
            // }
          // }
      
        }
      })
    }
    
    loop();
    
  }, [])


  let value = null;
  let setValue = null;
  
  const onChildMount = (dataFromChild) => {
    value = dataFromChild[0];
    setValue = dataFromChild[1];
  };

  return (
    <div>
      {
        sines.map((data, index) => (
          <div className="sinewave-container">  
            <div className="canvas-wrapper">
              <div className="sine-div" ref={ divRefs.current[index] }></div>
              <div className="read-head"></div>
              <div className="lookahead-head"></div>
            </div>
            
            <Controls 
              channels={channels}
              setChannels={setChannels}
              isEnabled={isEnabled}
              setEnabled={setEnabled}
              mode={mode}
              setMode={setMode}
              note={note}
              setNote={setNote}
              ccParameter={ccParameter}
              setCC={setCC}
              modeRange={modeRange}
              setModeRange={setModeRange}
              outputChannel={outputChannel}
              setOutputChannel={setOutputChannel}
              collapsed={collapsed}
              setCollaped={setCollapsed}
            />

          </div>
        ))
      }
      {/* <MidiDispatch onMount={onChildMount} /> */}
    </div>
  );
}

export default SinewaveContainer
