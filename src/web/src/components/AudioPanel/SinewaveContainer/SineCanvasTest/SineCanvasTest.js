import { useEffect, useRef, createRef } from 'react';
import { getPixelRatio, normalize } from '../../../../utils/utils';
import noteScheduler from '../../../../scripts/NoteScheduler';
import useMidiOutputs from '../../../../hooks/useMidiOutputs'

import './SineCanvas.scss';


const pixelRatio = window.devicePixelRatio;


const SineCanvas = ({ sines, isEnabled, globalRun, output }) => {  
  const availableOutputs = useMidiOutputs([])

  const canvasRefs = useRef(sines.map(() => createRef()));
  const contextRefs = useRef(sines.map(() => createRef()));
  const divRefs = useRef(sines.map(() => createRef()));
  const workerRefs = useRef(sines.map(() => createRef()));

  let sinesDataArr = sines.map(() => [])
  let sinesCurrentVal = sines.map(() => [])

  // let tempCanvasData;

  let globalSpeed = 5;
  let xPercentage = 0;

  //look ahead in % - actual amount is 3X this value
  let lookAheadAmount = 1;
  let lookAheadPercentage = xPercentage + lookAheadAmount;
  

  useEffect(() => {
    noteScheduler.setOutput(output)
  }, [output])


  useEffect(() => {
    let metronome = new Worker('/webworkers/metronome-worker.js')

    contextRefs.current = canvasRefs.current.map(ref => ref.current.getContext('2d'));

    canvasRefs.current.map(({current}) => {
      let computedWidth = getComputedStyle(current).getPropertyValue('width').slice(0, -2);
      let computedHeight = getComputedStyle(current).getPropertyValue('height').slice(0, -2);
      current.width = computedWidth * pixelRatio;
      current.height = computedHeight * pixelRatio;
      current.style.width = `${computedWidth}px`;
      current.style.height = `${computedHeight}px`;
    })

    sines.forEach((data, index) => {
      const ctx = contextRefs.current[index];
      const {amplitude, phase_local, speed} = data;          
      const canvas = canvasRefs.current[index].current;
      const {height} = canvas

      let lineWidth = 5 * pixelRatio
      let lineWidthRatio = lineWidth / height

      // save calc in array so we dont have to recalc every tick
      let period = (Math.PI * 2) / speed;
  
      for (let x = 0; x < period; x += .005) {
        let y = amplitude * (Math.sin(speed * x + phase_local));
        let drawY = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        
        sinesDataArr[index].push({
          y: parseFloat(y.toFixed(3)),
          drawY
        });
      }
      
      canvas.width = sinesDataArr[index].length;
      canvas.style.width = `${sinesDataArr[index].length}px`;
  
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineWidth = 5 * pixelRatio;
      ctx.strokeStyle = '#0e85ea';

      for (let pos in sinesDataArr[index]) {
        let y = sinesDataArr[index][pos].drawY;
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        ctx.lineTo(pos, height - (y * height));
      }

      ctx.lineTo(canvas.width + (ctx.lineWidth * 2), height);
      ctx.lineTo(0, height)
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fill(); 

      let tempCanvasData = canvasRefs.current[index].current.toDataURL()

      divRefs.current[index].current.style.backgroundImage = 'url('+ tempCanvasData +')';
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

    const draw = (now) => {
      // requestId = requestAnimationFrame(draw);

      let count = (now / (1 * globalSpeed))

      console.log(count)

      elapsed = now - then;
      then = now

      // if (xPercentage >= 33.33333) {
      //   xPercentage = 0;
      // }
 
      // if (lookAheadPercentage >= 33.33333) {
      //   lookAheadPercentage = 0;
      // }
      
      
      sines.forEach((data, index) => {
        divRefs.current[index].current.style.transform = 'translateX(-' + count  + 'px)'
        
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
    
      draw();
    
  }, [])




  return (
    <div className="canvas-container">
      {
        sines.map((data, index) => (
          <div>
          <canvas
            key={index} 
            className="sines-canvas" 
            ref={ canvasRefs.current[index] } />
     
            <div className="wrapper">
              <div className="sine-div" ref={ divRefs.current[index] }></div>
              <div className="read-head"></div>
              <div className="lookahead-head" style={{ 'left': 50 + lookAheadAmount * 3 + '%' }}></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default SineCanvas
