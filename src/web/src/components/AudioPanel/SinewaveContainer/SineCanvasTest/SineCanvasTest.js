import { useEffect, useRef, createRef } from 'react';
import { getPixelRatio, normalize } from '../../../../utils/utils';
import noteScheduler from '../../../../utils/NoteScheduler';

import './SineCanvas.scss';

const SineCanvas = ({ sines, isEnabled, globalRun }) => {  
  const canvasRefs = useRef(sines.map(() => createRef()));
  const contextRefs = useRef(sines.map(() => createRef()));
  const workerRefs = useRef(sines.map(() => createRef()));
  const drawRef = useRef(sines.map(() => createRef()));

  console.log('sines data', sines)
  console.log('canvasRefs', canvasRefs)
  console.log('contextRefs', contextRefs)
  console.log('workerRefs', workerRefs)
  console.log('drawRef', drawRef)

  
  const valueRef = useRef();
  const canvasRef = useRef();
  const canvasRef2 = useRef();

  const prevTimestampRef = useRef(0);
  // const offscreenRef = useRef();
  const webWorkerRef = useRef();
  const webWorkerRef2 = useRef();

  let width;
  let height;

  let width2;
  let height2;

  let contexts = []
  let canvases = []

  let context;
  let context2;
  let requestId;

  let currentTime;
  let currentValue = 0;

  let readAheadTime;
  let readAheadValue = 0;

  const pixelRatio = window.devicePixelRatio;

  // var audioCtx = new AudioContext();

  const scalingFactor = 10000

  const globalSpeed = 0.25;
  
  useEffect(() => {
    contextRefs.current = canvasRefs.current.map(ref => ref.current.getContext('2d'));
    workerRefs.current = canvasRefs.current.map(() => new Worker('/webworkers/sine-worker-test.js'));
    drawRef.current = canvasRefs.current.map(() => [])

    canvasRefs.current.map(({current}) => {
      let computedWidth = getComputedStyle(current).getPropertyValue('width').slice(0, -2);
      let computedHeight = getComputedStyle(current).getPropertyValue('height').slice(0, -2);
      current.width = computedWidth * pixelRatio;
      current.height = computedHeight * pixelRatio;
      current.style.width = `${computedWidth}px`;
      current.style.height = `${computedHeight}px`;
    })




      console.log('render')
      let then = 0;
      let elapsed;
      let beatAnimationState = false;
      let valueNormalizedLineWidth;
      // const buffer = 1000; 
      let drawArr;
      
      // where we read current value
      let readPosition = .5
      

      const lineWidth = 3 * pixelRatio;

      const loop = (now) => {
        requestId = requestAnimationFrame(loop)

        currentTime = now;
        // readAheadTime = now + 500;
    
        // let beatsPerSecondInterval = 1000 / (tempo / 60);
        // let animationDuration = (1000 / (tempo / 60)) - 100;
    
        // if (now == undefined) {
          // now = prevTimestampRef.current
          // then = now
        // }
    
        // prevTimestampRef.current = now
    
        // if (isEnabled && globalRun) {
          // eslint-disable-next-line
          // requestId = requestAnimationFrame(loop)
        // } 
      
      // else {
      //   cancelAnimationFrame(requestId)
      // }
    
        // elapsed = now - then;
    
    
    
        // if (elapsed > beatsPerSecondInterval) {
        //   then = now - (elapsed % beatsPerSecondInterval);
        //   beatAnimationState = true;
          
    
          // handleData([valueRef.current, now])
    
          // setTimeout(() => {
          //   beatAnimationState = false
          // }, animationDuration)
        // }
    
        
        sines.forEach((data, index) => {
          const ctx = contextRefs.current[index];
          const {amplitude, phase_local, speed} = data;          
          const {width, height} = canvasRefs.current[index].current;
          const worker = workerRefs.current[index];
          
          worker.postMessage([width, height, amplitude, speed, phase_local, lineWidth, now])
          
          worker.onmessage = (e) => {
            drawRef.current[index] = e.data
          }
          
          // const lineWidthRatio = lineWidth / height;

          ctx.rect(0, 0, width, height);
          ctx.fillStyle = '#badefd';
          ctx.fill();
    
          ctx.beginPath();
          ctx.moveTo(0, height);

          ctx.lineWidth = 4 * pixelRatio;
          ctx.strokeStyle = '#0e85ea';
        
          // ctx.moveTo(drawRef.current[index][0].x || 0, drawRef.current[index][0].y || 0);

          // ctx.stroke()
          // ctx.lineTo(width + ctx.lineWidth, height); 
          // ctx.lineTo(0, height);
          // ctx.fillStyle = 'white';
          // ctx.fill(); 

          // draw sine wave
          for (let pos in drawRef.current[index]) {
            ctx.lineTo(pos, drawRef.current[index][pos]);
          }

          ctx.lineTo(width, height);
          ctx.lineTo(0, height)

          ctx.stroke();
          

          // fill white under area
          // ctx.stroke()
          // ctx.lineTo(width + ctx.lineWidth, height); 
          // ctx.lineTo(0, height);
          ctx.fillStyle = 'white';
          ctx.fill(); 

          // draw playhead
          ctx.beginPath();
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 2 * pixelRatio; 
          ctx.moveTo((readPosition * width), height);
          // ctx.lineTo((readPosition * width), height - (valueNormalizedLineWidth * height));
          ctx.lineTo((readPosition * width), 0);
          ctx.stroke();

        })
        
        



          // 
        //   let arr = [];

        //   for (let x = 0; x < width; x++) {
        //     let y = amplitude * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + (now / (scalingFactor / globalSpeed))) + parseFloat(phase_local) ));
        //     // normalized and offset for lineWidth
        //     let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        //     // flip the wave because canvas 0,0 starts at upper left, not lower right
            
        //     arr.push({
        //       x: x, 
        //       y: (height - (draw_y * height))
        //     });
            
              // get value at read position and save for later
            // if (x == Math.floor(readPosition * width)) {
            //   currentValue = normalize(y, 1, -1).toFixed(4)
            //   valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)

            //   let readAheadY = amplitude * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + (readAheadTime / (scalingFactor / globalSpeed))) + parseFloat(phase_local) ));
            //   readAheadValue =  normalize(readAheadY, 1, -1).toFixed(4)
            // }
          // }
          // console.log(data)
          // webWorkerRef.current.postMessage([index, width, height, amplitude, speed, phase_local, context.lineWidth, now])
        // })
        
        // webWorkerRef.current.onmessage = (e) => {
          // let [index, arr] = e.data
       
          // if (arr) {
          //    contexts[index].rect(0, 0, canvases[index].width, canvases[index].height);
          //    contexts[index].fillStyle = '#badefd';
          //    contexts[index].fill();
        
          //    contexts[index].beginPath();
          //    contexts[index].lineWidth = 3 * ratio;
          //    contexts[index].strokeStyle = '#0e85ea';
            
          //    contexts[index].moveTo(0, canvases[index].height);

          //   for (let entry of arr) {
          //     contexts[index].lineTo(entry.x, entry.y);
          //   }

          //   // fill under area
          //   contexts[index].stroke()
          //   contexts[index].lineTo(canvases[index].width + contexts[index].lineWidth, canvases[index].height); 
          //   contexts[index].lineTo(0, canvases[index].height);
          //   contexts[index].fillStyle = 'white';
          //   contexts[index].fill(); 
        
          //   // draw read head line
          //   contexts[index].beginPath();
          //   contexts[index].strokeStyle = 'orange';
          //   contexts[index].lineWidth = 2 * ratio; 
          //   contexts[index].moveTo((readPosition * canvases[index].width), canvases[index].height);
          //   // contexts[index].lineTo((readPosition * width), height - (valueNormalizedLineWidth * height));
          //   contexts[index].lineTo((readPosition * canvases[index].width), 0);
          //   contexts[index].stroke();

          // }
          
          
        
        
          // }

        
        
        // console.log(drawArr)

        // draw sine wave
        // for (let x = 0; x < width; x++) {
        //   let y = amp * (Math.sin(2 * Math.PI * freq * ((x / scalingFactor) + (now / (scalingFactor / globalSpeed))) + parseFloat(phase) ));
        //   // normalized and offset for lineWidth
        //   let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        //   // flip the wave because canvas 0,0 starts at upper left, not lower right
        //   context.lineTo(x, height - (draw_y * height));
        //   // get value at read position and save for later
        //   if (x == Math.floor(readPosition * width)) {
        //     currentValue = normalize(y, 1, -1).toFixed(4)
        //     valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
    
        //     let readAheadY = amp * (Math.sin(2 * Math.PI * freq * ((x / scalingFactor) + (readAheadTime / (scalingFactor / globalSpeed))) + parseFloat(phase) ));
        //     readAheadValue =  normalize(readAheadY, 1, -1).toFixed(4)
        //   }
        // }
      

    
        
        // draw center horizontal axis
        // context.beginPath();
        // context.strokeStyle = 'orange';
        // context.lineWidth = 2 * ratio; 
        // context.moveTo(width - 20, height / 2);
        // context.lineTo(width, height / 2);
        // context.stroke();
    
    
        // tick debug
        // context.font = "36px Arial";
        // context.textBaseline = "middle";
        // context.textAlign = "center";
        // context.lineWidth = 1.5 * ratio; 
        // context.strokeStyle = 'white';
        // context.fillStyle = 'black';
        // context.strokeText(
        //   now, 
        //   width / 2, 
        //   height / 2);
        // context.fillText(
        //   now, 
        //   width / 2, 
        //   height / 2);
    
        // context.strokeText(
        //   readAheadValue, 
        //   width / 2, 
        //   height / 4);
        // context.fillText(
        //   readAheadValue, 
        //   width / 2, 
        //   height / 4);
    
    
        // center note
        // context.font = "22px Arial";
        // context.textBaseline = "middle";
        // context.textAlign = "end";
        // context.lineWidth = 1.5 * ratio; 
        // context.strokeStyle = 'white';
        // context.fillStyle = 'black';
        // context.strokeText(
        //   mode == 'NOTE_ON' ? note : 64, 
        //   width - 20, 
        //   height / 2);
        // context.fillText(
        //   mode == 'NOTE_ON' ? note : 64, 
        //   width - 20, 
        //   height / 2);
      
        // high range note
        // context.textBaseline = "bottom";
        // let highNote;
        // if (mode == 'NOTE_ON') {
        //   highNote = parseInt(note) + Math.floor(parseInt(modeRange) / 2)
        // } else if (mode == 'CC') {
        //   highNote = 64 + Math.floor(parseInt(modeRange) / 2)
        // }
        // let clampedHighNote = Math.min(Math.max(highNote, 0), 127);
    
        // context.lineWidth = 1.5 * ratio; 
        // context.strokeStyle = 'white';
        // context.strokeText(clampedHighNote, width - 20, 30);
        // context.fillText(clampedHighNote, width - 20, 30);
        
        // low range note
        // context.textBaseline = "top";
        // let lowNote;
        // if (mode == 'NOTE_ON') {
        //   lowNote = parseInt(note) - Math.floor(parseInt(modeRange) / 2)
        // } else if (mode == 'CC') {
        //   lowNote = 63 - Math.floor(parseInt(modeRange) / 2)  
        // }
        // let clampedLowNote = Math.min(Math.max(lowNote, 0), 127);
        // context.lineWidth = 1.5 * ratio; 
        // context.strokeStyle = 'white';
        // context.strokeText(clampedLowNote, width - 20, height - 30);
        // context.fillText(clampedLowNote, width - 20, height - 30);
    
        // draw tempo/beat indicator
        // context.beginPath();
        // context.strokeStyle = 'orange';
        // context.lineWidth = 2 * ratio; 
        // context.fillStyle = 'orange';
        // context.arc(25, height - 25, 12, 0, 2 * Math.PI);
        // context.stroke()
    
        // if (beatAnimationState && isEnabled && globalRun) {
        //   context.fill();
        // }

      }
    
      loop();
    
  }, [])




  return (
    <div className="canvas-container">
      {
        sines.map((data, index) => (
          <canvas
            key={index} 
            className="sines-canvas" 
            ref={ canvasRefs.current[index] } />
        
        ))
       
      }
    </div>
  );
}

export default SineCanvas
