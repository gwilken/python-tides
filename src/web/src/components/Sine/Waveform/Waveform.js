import './Waveform.scss'

import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { getPixelRatio, normalize } from '../../../utils/utils'


const Waveform = ({ amp, phase, speed, setCurrentRawValue }) => {
  let ref = useRef()
  
  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let requestId;
    let i = 0;
    
    let isTriggered;
    
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();

      // context.fillStyle = 'blue';
      // context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.lineWidth = 2 * ratio;
      context.strokeStyle = '#0e85ea';
      
      context.moveTo(0, canvas.height);
      
      // ratio of line width to canvas height, so we can calculate offset
      let lineWidthRatio = context.lineWidth / canvas.height

      let scalingFactor = 10000

      let readPosition = .5

      for (let x = 0; x < canvas.width; x++) {
        let y = amp * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + i ) + (phase * 10)));
        // normalized and offset for lineWidth
        let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        context.lineTo(x, canvas.height - (draw_y * canvas.height));
      }
      

      let t = amp * (Math.sin(2 * Math.PI * speed * (( (readPosition * canvas.width) / scalingFactor) + i ) + (phase * 10)));
      let readValue = normalize(t, 1, -1).toFixed(4)


      // console.log('t', normalize(t, 1.0, -1.0).toFixed(4))

      // output(midVal)
      console.log(readValue)

      if (isTriggered != Math.round(readValue)) {
        isTriggered = Math.round(readValue)
        console.log(isTriggered)
      }

      // setCurrentRawValue(midVal)

      // console.log(Math.floor(midVal * 127))

      // console.log(Math.round(midVal))

      // if (midVal == minValue ) {
      //   console.log('BINGO:', speed)
      // }


    
      context.stroke()
      
      const maxY = canvas.height;
      
      context.lineTo(canvas.width + context.lineWidth, maxY); // bottom-right
      context.lineTo(0, maxY); // bottom-left
      
      context.globalCompositeOperation = "destination-over"; // draw behind

      context.fillStyle = 'white';
      // context.fillStyle = '#badefd';

      context.fill(); // will close the path for us

      context.globalCompositeOperation = "source-over"; // normal behavior

      context.beginPath();

      context.strokeStyle = 'orange';

      context.lineWidth = 2 * ratio; 
      context.moveTo((readPosition * canvas.width), 0);
      context.lineTo((readPosition * canvas.width), canvas.height);
      context.stroke();

      // i += 0.00025;
      
      i += .0005;

      requestId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(requestId)
    }

  });

  return (
    <div className="waveform-container">
      <canvas ref={ ref } />
    </div>
  );
}

export default Waveform

