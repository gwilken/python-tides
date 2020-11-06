import { useEffect, useRef } from 'react';
import { getPixelRatio, normalize } from '../../../utils/utils';


const SineCanvas = ({
  amp, 
  phase, 
  freq, 
  tempo, 
  isEnabled, 
  globalRun, 
  globalSpeed,
  mode, 
  modeRange, 
  note, 
  handleData }) => {  
  

  const valueRef = useRef();
  const canvasRef = useRef();
  const prevTimestampRef = useRef(0);

  let requestId;
  

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('2d');

    let ratio = getPixelRatio(context);
    let computedWidth = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let computedHeight = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    // let marginRight = 30 * ratio;
    let marginRight = 0;

    canvas.width = computedWidth * ratio;
    canvas.height = computedHeight * ratio;
    canvas.style.width = `${computedWidth}px`;
    canvas.style.height = `${computedHeight}px`;

    let then = 0;
    let elapsed;
    let beatsPerSecondInterval = 1000 / (tempo / 60);
    let beatAnimationState = false;
    let animationDuration = (1000 / (tempo / 60)) - 100;

    let scalingFactor = 10000
    let readPosition = .99

    const render = (now) => {
      if (now == undefined) {
        now = prevTimestampRef.current
        then = now
      }

      prevTimestampRef.current = now

      if (isEnabled && globalRun) {
        // eslint-disable-next-line
        requestId = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(requestId)
      }
    
      elapsed = now - then;

      if (elapsed > beatsPerSecondInterval) {
        then = now - (elapsed % beatsPerSecondInterval);
        beatAnimationState = true;
        
        handleData([valueRef.current, now])

        setTimeout(() => {
          beatAnimationState = false
        }, animationDuration)
      }

      context.rect(0, 0, canvas.width - marginRight, canvas.height);
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
        let y = amp * (Math.sin(2 * Math.PI * freq * ((x / scalingFactor) + (now / (scalingFactor / globalSpeed))) + parseFloat(phase) ));
        // normalized and offset for lineWidth
        let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        context.lineTo(x - marginRight, canvas.height - (draw_y * canvas.height));
        // get value at read position and save for later
        if (x == Math.floor(readPosition * canvas.width)) {
          valueRef.current = normalize(y, 1, -1).toFixed(4)
          // valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        }
      }
      
      // fill under area
      context.stroke()
      context.lineTo(canvas.width - marginRight + context.lineWidth, canvas.height); 
      context.lineTo(0, canvas.height);
      context.fillStyle = 'white';
      context.fill(); 
    
      // draw read head line
      // context.beginPath();
      // context.strokeStyle = 'orange';
      // context.lineWidth = 2 * ratio; 
      // context.moveTo((readPosition * canvas.width - marginRight), canvas.height);
      // context.lineTo((readPosition * canvas.width - marginRight), canvas.height - (valueNormalizedLineWidth * canvas.height));
      // context.stroke();
      
      // draw center horizontal axis
      // context.beginPath();
      // context.strokeStyle = 'orange';
      // context.lineWidth = 2 * ratio; 
      // context.moveTo(canvas.width - marginRight - 20, canvas.height / 2);
      // context.lineTo(canvas.width - marginRight, canvas.height / 2);
      // context.stroke();
      
      // clear margin area
      // context.rect(canvas.width - marginRight, 0, marginRight, canvas.height);
      // context.fillStyle = 'white';
      // context.fill();


      // tick debug
      // context.font = "36px Arial";
      // context.textBaseline = "middle";
      // context.textAlign = "center";
      // context.lineWidth = 1.5 * ratio; 
      // context.strokeStyle = 'white';
      // context.fillStyle = 'black';
      // context.strokeText(
      //   localTickRef.current, 
      //   canvas.width / 2, 
      //   canvas.height / 2);
      // context.fillText(
      //   localTickRef.current, 
      //   canvas.width / 2, 
      //   canvas.height / 2);
  
      // context.strokeText(
      //   now, 
      //   canvas.width / 2, 
      //   canvas.height / 4);
      // context.fillText(
      //   now, 
      //   canvas.width / 2, 
      //   canvas.height / 4);


      // center note
      context.font = "22px Arial";
      context.textBaseline = "middle";
      context.textAlign = "end";
      context.lineWidth = 1.5 * ratio; 
      context.strokeStyle = 'white';
      context.fillStyle = 'black';
      context.strokeText(
        mode == 'NOTE_ON' ? note : 64, 
        canvas.width - 20, 
        canvas.height / 2);
      context.fillText(
        mode == 'NOTE_ON' ? note : 64, 
        canvas.width - 20, 
        canvas.height / 2);
      
      // high range note
      context.textBaseline = "bottom";
      let highNote;
      if (mode == 'NOTE_ON') {
        highNote = parseInt(note) + Math.floor(parseInt(modeRange) / 2)
      } else if (mode == 'CC') {
        highNote = 64 + Math.floor(parseInt(modeRange) / 2)
      }
      let clampedHighNote = Math.min(Math.max(highNote, 0), 127);

      context.lineWidth = 1.5 * ratio; 
      context.strokeStyle = 'white';
      context.strokeText(clampedHighNote, canvas.width - 20, 30);
      context.fillText(clampedHighNote, canvas.width - 20, 30);
      
      // low range note
      context.textBaseline = "top";
      let lowNote;
      if (mode == 'NOTE_ON') {
        lowNote = parseInt(note) - Math.floor(parseInt(modeRange) / 2)
      } else if (mode == 'CC') {
        lowNote = 63 - Math.floor(parseInt(modeRange) / 2)  
      }
      let clampedLowNote = Math.min(Math.max(lowNote, 0), 127);
      context.lineWidth = 1.5 * ratio; 
      context.strokeStyle = 'white';
      context.strokeText(clampedLowNote, canvas.width - 20, canvas.height - 30);
      context.fillText(clampedLowNote, canvas.width - 20, canvas.height - 30);

      // draw tempo/beat indicator
      context.beginPath();
      context.strokeStyle = 'orange';
      context.lineWidth = 2 * ratio; 
      context.fillStyle = 'orange';
      context.arc(25, canvas.height - 25, 12, 0, 2 * Math.PI);
      context.stroke()

      if (beatAnimationState && isEnabled && globalRun) {
        context.fill();
      }
    }

    render();

    return () => {
      cancelAnimationFrame(requestId)
    }
  });


  return (
    <canvas ref={ canvasRef } />
  );
}

export default SineCanvas
