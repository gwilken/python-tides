import { useEffect, useRef, createRef } from 'react';
import { getPixelRatio, normalize, rotateArrLeft, rotateArrRight } from '../../../../utils/utils';
import noteScheduler from '../../../../scripts/NoteScheduler';
import useMidiOutputs from '../../../../hooks/useMidiOutputs'

import './SineCanvas.scss';


const pixelRatio = window.devicePixelRatio;


const SineCanvas = ({ sines, isEnabled, globalRun, output }) => {  
  const availableOutputs = useMidiOutputs([])

  // const canvasRefs = useRef(sines.map(() => createRef()));
  // const contextRefs = useRef(sines.map(() => createRef()));
  const divRefs = useRef(sines.map(() => createRef()));
  // const workerRefs = useRef(sines.map(() => createRef()));

  let sinesDataArr = sines.map(() => [])
  let sinesCurrentVal = sines.map(() => [])

  // let tempCanvasData;

  let globalSpeed = 1;
  let xPercentage = 0;

  //look ahead in % - actual amount is 3X this value
  let lookAheadAmount = 1;
  let lookAheadPercentage = xPercentage + lookAheadAmount;
  

  useEffect(() => {
    noteScheduler.setOutput(output)
  }, [output])


  useEffect(() => {
    let metronome = new Worker('/webworkers/metronome-worker.js')

    // save calc in array so we dont have to recalc every tick
    sines.forEach((data, index) => {
      const patternCanvas = document.createElement('canvas');
      const patternContext = patternCanvas.getContext('2d');

      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d');

      const {amplitude, phase_local, speed} = data;          
      const height = 75;
      let width;

      let lineWidth = 2
      let lineWidthRatio = lineWidth / height

      let period = (Math.PI * 2) / speed;
  
      for (let x = 0; x < period; x += .005) {
        let y = amplitude * (Math.sin(speed * x + phase_local));
        let drawY = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        
        sinesDataArr[index].push({
          y: parseFloat(y.toFixed(3)),
          drawY
        });
      }
      
      width = sinesDataArr[index].length;

      patternCanvas.width = width;
      patternCanvas.height = height;

      patternContext.beginPath();
      patternContext.moveTo(0, height);
      patternContext.lineWidth = lineWidth;
      patternContext.strokeStyle = '#0e85ea';

      let lastY;

      for (let [pos, obj] of sinesDataArr[index].entries() ){
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        let y = height - (obj.drawY * height)
        patternContext.lineTo(pos, y);
        lastY = y;
      }

      // we do this to avoid a slight visible line between repeats
      patternContext.lineTo(width + (lineWidth * 2), lastY);
      patternContext.lineTo(width + lineWidth, height);
      patternContext.lineTo(0, height)
      patternContext.stroke();
      patternContext.fillStyle = 'white';
      patternContext.fill(); 

      canvas.width = width * 3;
      canvas.height = height

      const pattern = canvasContext.createPattern(patternCanvas,'repeat-x');
      canvasContext.rect(0, 0, width * 3, height);
      canvasContext.fillStyle = pattern;
      canvasContext.fill();

      const image = canvas.toDataURL();

      divRefs.current[index].current.style.backgroundImage = `url(${image})`;
      // console.log(divRefs)
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
      // requestId = requestAnimationFrame(loop);

      let count = (now / (10 * globalSpeed))

      function draw(index) {
   
      }


      // console.log('count', count.toFixed())

      elapsed = now - then;
      then = now

      // if (xPercentage >= 33.33333) {
      //   xPercentage = 0;
      // }
 
      // if (lookAheadPercentage >= 33.33333) {
      //   lookAheadPercentage = 0;
      // }
      
      
      sines.forEach((data, index) => {
        // divRefs.current[index].current.style.transform = 'translateX(-' + count  + 'px)'
        // rotateArrLeft, rotateArrRight

        // console.log(rotateArrLeft(sinesDataArr[index], count.toFixed()));

        // draw(index);

        while (noteScheduler.channels[index].notesInQueue.length && noteScheduler.channels[index].notesInQueue[0].time < now) {
          // currentNote = notesInQueue[0].note;
          noteScheduler.channels[index].notesInQueue.splice(0,1);   // remove note from queue
        }

        if (sinesDataArr[index].length) {
          // let arrIndex = Math.floor((sinesDataArr[index].length * (xPercentage * .01)) * 3)
          
          // let lookAheadIndex = Math.floor((sinesDataArr[index].length * (lookAheadPercentage * .01)) * 3)
          
          // let val = sinesDataArr[index][arrIndex].value
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
    
      xPercentage += globalSpeed;
      lookAheadPercentage += globalSpeed;
    }
    
      loop();
    
  }, [])




  return (
    <div className="canvas-container">
      {
        sines.map((data, index) => (  
          <div className="wrapper">
            <div className="sine-div" ref={ divRefs.current[index] }></div>
            {/* <div className="read-head"></div>
            <div className="lookahead-head" style={{ 'left': 50 + lookAheadAmount * 3 + '%' }}></div> */}
          </div>
        ))
      }
    </div>
  );
}

export default SineCanvas
