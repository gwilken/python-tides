import { useEffect, useRef } from 'react';
import { getPixelRatio, normalize } from '../../../utils/utils';
import './Sinewave.scss';


const SineCanvas = ({speed, amp, phase, freq, tempo, isEnabled, globalAllowRun, handleData }) => {  
  const valueRef = useRef();
  const tickRef = useRef(0);
  const canvasRef = useRef();
  
  const duration = 100;

  let requestId;
  
  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');

    let ratio = getPixelRatio(context);
    let computedWidth = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let computedHeight = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);

    canvas.width = computedWidth * ratio;
    canvas.height = computedHeight * ratio;
    canvas.style.width = `${computedWidth}px`;
    canvas.style.height = `${computedHeight}px`;

    let now;
    let then = Date.now();
    // let startTime = then;
    let elapsed;
    let beatsPerSecondInterval = 1000 / (tempo / 60);
    let beatAnimationState;

    let scalingFactor = 10000
    let readPosition = .5
    let valueNormalizedLineWidth;

    const render = () => {
      if (isEnabled && globalAllowRun) {
        // eslint-disable-next-line
        requestId = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(requestId)
      }

      now = Date.now();
      elapsed = now - then;

      if (elapsed > beatsPerSecondInterval) {
        then = now - (elapsed % beatsPerSecondInterval);
        beatAnimationState = true;
        
        let rawValue = parseFloat(valueRef.current)
        let midiValue = Math.floor(rawValue * (127 * amp))

        handleData([rawValue, midiValue,now])

        setTimeout(() => {
          beatAnimationState = false
        }, duration)
      }

      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#badefd';
      context.fill();
     
      context.beginPath();
      context.lineWidth = 3 * ratio;
      context.strokeStyle = '#0e85ea';
      
      context.moveTo(0, canvas.height);
      
      // ratio of line width to canvas height, so we can calculate offset
      let lineWidthRatio = context.lineWidth / canvas.height

      // draw sine wave
      for (let x = 0; x < canvas.width; x++) {
        let y = amp * (Math.sin(2 * Math.PI * freq * ((x / scalingFactor) + tickRef.current) + (phase * 10)));
        // normalized and offset for lineWidth
        let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        context.lineTo(x, canvas.height - (draw_y * canvas.height));
        // get value at read position and save for later
        if (x == Math.floor(readPosition * canvas.width)) {
          valueRef.current = normalize(y, 1, -1).toFixed(4)
          valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        }
      }
      
      // fill under area
      context.stroke()
      context.lineTo(canvas.width + context.lineWidth, canvas.height); 
      context.lineTo(0, canvas.height);
      context.fillStyle = 'white';
      context.fill(); 
    
      // draw read head line
      context.beginPath();
      context.strokeStyle = 'orange';
      context.lineWidth = 2 * ratio; 
      context.moveTo((readPosition * canvas.width), canvas.height);
      context.lineTo((readPosition * canvas.width), canvas.height - (valueNormalizedLineWidth * canvas.height));
      context.stroke();
  


      // draw tempo/beat indicator
      context.beginPath();
      context.strokeStyle = 'orange';
      context.lineWidth = 3 * ratio; 
      context.fillStyle = 'orange';
      context.arc(canvas.width - 35, canvas.height - 35, 15, 0, 2 * Math.PI);
      context.stroke()

      if (beatAnimationState) {
        context.fill();
      }

      tickRef.current += parseFloat(speed);
    }

    render()

    return () => {
      cancelAnimationFrame(requestId)
    }
  });


  return (
    <canvas ref={ canvasRef } />
  );
}

export default SineCanvas
