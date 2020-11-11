import { useEffect, useRef, createRef } from 'react';
import { getPixelRatio, normalize } from '../../../../utils/utils';
import noteScheduler from '../../../../utils/NoteScheduler';

import './SineCanvas.scss';

const pixelRatio = window.devicePixelRatio;


const SineCanvas = ({ sines, isEnabled, globalRun }) => {  
  const canvasRefs = useRef(sines.map(() => createRef()));
  const contextRefs = useRef(sines.map(() => createRef()));
  const divRefs = useRef(sines.map(() => createRef()));
  const workerRefs = useRef(sines.map(() => createRef()));

  let sinesDataArr = sines.map(() => [])
  let sinesCurrentVal = sines.map(() => [])

  // let tempCanvasData;

  let xPercentage = 0;

  useEffect(() => {
    contextRefs.current = canvasRefs.current.map(ref => ref.current.getContext('2d'));
    workerRefs.current = canvasRefs.current.map(() => new Worker('/webworkers/sine-worker-test.js'));

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
      const {width, height} = canvasRefs.current[index].current;
      const worker = workerRefs.current[index];
      
      let lineWidth = 5 * pixelRatio

      worker.postMessage([width, height, amplitude, speed, phase_local, lineWidth])

      worker.onmessage = (e) => {
        sinesDataArr[index] = e.data
        console.log(sinesDataArr)

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineWidth = 5 * pixelRatio;
        ctx.strokeStyle = '#0e85ea';

        for (let pos in e.data) {
          ctx.lineTo(pos, e.data[pos].y);
        }

        ctx.lineTo(width + (ctx.lineWidth * 2), height);
        ctx.lineTo(0, height)
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fill(); 

        let tempCanvasData = canvasRefs.current[index].current.toDataURL()

        divRefs.current[index].current.style.backgroundImage = 'url('+ tempCanvasData +')';
      } 
    })

    let then = 0;
    let elapsed;
    let beatAnimationState = false;
    let valueNormalizedLineWidth;
    // const buffer = 1000; 
    let drawArr;
    let requestId;

    // where we read current value
    let readPosition = .5
      

    const lineWidth = 3 * pixelRatio;

    const loop = (now) => {
      requestId = requestAnimationFrame(loop);

      if (xPercentage >= 33.33333) {
        xPercentage = 0;
      }
      
        // currentTime = now;
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
          // console.log(sinesDataArr[index])

          divRefs.current[index].current.style.transform = 'translateX(-' + xPercentage  + '%)'
          
          if ( sinesDataArr[index].length > 0) {

            let arrIndex = Math.floor((sinesDataArr[index].length * (xPercentage * .01)) * 3)

            // let arrIndex = Math.floor( (xPercentage * .0333333) * Math.floor(sinesDataArr[index].length))
            let val = sinesDataArr[index][arrIndex].value
            // console.log(val)
            // console.log(sinesDataArr[index][arrIndex].value)
          }
        })
      
        xPercentage += .01;
      }
    
      loop();
    
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
     
            <div className="wrapper" style= {{ 'width': '500px', 'height': '75px', 'overflow': 'hidden'}} >
              <div className="sine-div" ref={ divRefs.current[index] }></div>
              <div className="read-head"></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default SineCanvas
