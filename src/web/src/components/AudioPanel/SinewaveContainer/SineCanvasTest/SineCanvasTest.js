import { useEffect, useRef, createRef } from 'react';
import { getPixelRatio, normalize, rotateArrLeft, rotateArrRight } from '../../../../utils/utils';
import noteScheduler from '../../../../scripts/NoteScheduler';
import useMidiOutputs from '../../../../hooks/useMidiOutputs'

import './SineCanvas.scss';


const pixelRatio = window.devicePixelRatio;


const SineCanvas = ({ sines, isEnabled, globalRun, output }) => {  
  const availableOutputs = useMidiOutputs([])

  const divRefs = useRef(sines.map(() => createRef()));

  // keep track of number pattern repeats in canvas. used for animation
  const repeatRefs = useRef(sines.map(() => createRef()));
  const translateXRefs = useRef(sines.map(() => createRef()));


  let sinesDataArr = sines.map(() => [])
  let sinesCurrentVal = sines.map(() => [])

  // let tempCanvasData;

  let globalSpeed = 5;
  let xPercentage = 0;

  //look ahead in % - actual amount is 3X this value
  let lookAheadAmount = 1;
  let lookAheadPercentage = xPercentage + lookAheadAmount;
  

  let start = window.performance.now();

  useEffect(() => {
    noteScheduler.setOutput(output)
  }, [output])


  useEffect(() => {
    let metronome = new Worker('/webworkers/metronome-worker.js')

    /////// DRAW SETUP START //////////

    // save calc in array so we dont recalc every tick to get value
    // we'll use css tranform translateX instead of redrawing every frame for performance
    sines.forEach((data, index) => {
      const patternCanvas = document.createElement('canvas');
      const patternContext = patternCanvas.getContext('2d');

      const canvas = document.createElement('canvas');
      // const canvasContext = canvas.getContext('2d', { alpha: false });
      const canvasContext = canvas.getContext('2d');

      const {amplitude, phase_local, speed} = data;          
      const height = 75;
      let width;

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
        // sinesDataArr[index].push({
        //   y: parseFloat(y.toFixed(4)),
        //   drawY
        // });
      }
      

      // width = sinesDataArr[index].length;
      let tempWidth = tempDataArr.length;

      // we want width of final div to be at least 1500px (triple the wrapper div's 500px)
      // and repeat pattern with out cutting off
      let canvasWidth = 1500 + (tempWidth - (((1500 / tempWidth) % 1) * tempWidth));
      canvas.width = canvasWidth

      // save num of repeats. will need for animation later.
      let numOfRepeats = canvasWidth / tempWidth;
      repeatRefs.current[index].current = numOfRepeats

      console.log('numOfRepeats', numOfRepeats)

      canvas.height = height

      canvasContext.beginPath();
      canvasContext.moveTo(0, height);
      canvasContext.lineWidth = lineWidth;
      canvasContext.strokeStyle = '#0e85ea';

      let lastY;

      // loop through our draw array to repeat pattern
      for (let i = 0; i < canvasWidth; i++) {
        let sinesDataIndex = i % tempDataArr.length;
        let tempY = tempDataArr[sinesDataIndex].drawY;
        // flip the sine wave because canvas 0,0 starts at upper left, not lower right
        let flipepdY = height - (tempY * height);
        canvasContext.lineTo(i, flipepdY);

        sinesDataArr[index].push(tempDataArr[sinesDataIndex].y);

        lastY = flipepdY;
      }

      console.log('sinesDataArr[index]', sinesDataArr[index]);

      
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

    metronome.postMessage('start')

    const loop = (now) => {
      requestId = requestAnimationFrame(loop);

      if (now === undefined) {
        now = window.performance.now();
      }

      elapsed = now - then;
      then = now
      
      sines.forEach((data, index) => {
        let repeat = repeatRefs.current[index].current;
        let xOffset = (now / (100 * globalSpeed)) % (100 / repeat);
        // let xOffset = 0;

        // console.log('xOffset', xOffset)

        // console.log((xOffset * repeat) * .01)

        translateXRefs.current[index].current = xOffset;

        divRefs.current[index].current.style.transform = 'translateX(-' + translateXRefs.current[index].current  + '%)'

        while (noteScheduler.channels[index].notesInQueue.length && noteScheduler.channels[index].notesInQueue[0].time < now) {
          // currentNote = notesInQueue[0].note;
          noteScheduler.channels[index].notesInQueue.splice(0,1);   // remove note from queue
        }

        let length = sinesDataArr[index].length;
        let offsetPercent = xOffset * .01;

        // console.log('offsetPercent', offsetPercent)

        if (length) {
          // gets us value at read head. 250 = half of wrapper width
          let arrIndex = Math.floor((length * offsetPercent) + 250)
  
          // so we wrap around in case we over shoot length
          console.log('val: ', sinesDataArr[index][arrIndex % length])


          // console.log('1/6', sinesDataArr[index][Math.floor(length * .1666667)])
          // let arrIndex = Math.floor( (length * (xOffset * .01)) * repeat )
          
          // 1/6th
          // let readPosition = .1666666

          // let percentOfRepeat = ((xOffset * repeat) * .01) * readPosition

          // let arrIndex = Math.floor(length * percentOfRepeat);

          // let lookAheadIndex = Math.floor((length * (lookAheadPercentage * .01)) * 3)
          
          // if ( sinesDataArr[index][arrIndex]) {
            // let val = sinesDataArr[index][arrIndex];
            // console.log(arrIndex, val);
          // }

          // let lookAheadVal = sinesDataArr[index][lookAheadIndex].value
          // let scheduleTimeOffset = ((lookAheadAmount * .3) / (globalSpeed * 16.66)) * 1000
          
          // let midiValue = Math.floor(parseFloat(lookAheadVal) * parseInt(modeRange)) + (parseInt(note) - (Math.floor(parseInt(modeRange) / 2)))
          // let midiValue = Math.floor(parseFloat(lookAheadVal) * 24) + (63)
          // let clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
          // let currentLookAheadValue = clampedMidiValue
          // let currentChannel = index;
          
          metronome.onmessage = (e) => {
            if (e.data === 'tick') {
              // console.log('tick')
              // noteScheduler.scheduler(currentLookAheadValue, scheduleTimeOffset, currentChannel);
            }
          }
      
        }
      })
    }
    
    loop();
    
  }, [])


  return (
    <div className="canvas-container">
      {
        sines.map((data, index) => (  
          <div className="wrapper">
            <div className="sine-div" ref={ divRefs.current[index] }></div>
            <div className="read-head"></div>
            {/* <div className="lookahead-head" style={{ 'left': 50 + lookAheadAmount * 3 + '%' }}></div> */}
          </div>
        ))
      }
    </div>
  );
}

export default SineCanvas
