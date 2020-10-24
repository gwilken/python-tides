import './Waveform.scss'

import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


const normalize = (val, max, min) => { return (val - min) / (max - min); }

const getPixelRatio = context => {
  var backingStore =
  context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio ||
  1;
  
  return (window.devicePixelRatio || 1) / backingStore;
};

const Waveform = ({amp, phase, speed}) => {
  console.log(amp, phase, speed)
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
    
    
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();

      // context.fillStyle = 'blue';
      // context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.lineWidth = 10;
      context.strokeStyle = '#0e85ea';
      
      context.moveTo(0, canvas.height);
      
      for (let x = 0; x < canvas.width; x++) {
        let y = amp * (Math.sin(2 * Math.PI * speed * (x / 10000 + i) + phase));
        let ny = normalize(y, 1, -1)
        context.lineTo(x, ny * (canvas.height - context.lineWidth));
        // context.lineTo(x, ny * canvas.height);
      }
      
      context.stroke()
      
      const maxY = canvas.height;
      
      context.lineTo(canvas.width + context.lineWidth, maxY); // bottom-right
      context.lineTo(-20, maxY); // bottom-left
      
      // context.globalCompositeOperation = "destination-over"; // draw behind

      // context.fillStyle = 'white';
      context.fillStyle = '#badefd';

      context.fill(); // will close the path for us
      context.globalCompositeOperation = "source-over"; // normal behavior

      i += 0.00025;
      requestId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(requestId)
    }

  });

  return (
    <div className="waveform-container">
      <canvas
        ref={ ref }
      />
    </div>
  );
}

export default Waveform

