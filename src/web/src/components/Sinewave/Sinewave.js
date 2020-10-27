import './Sinewave.scss'

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { getPixelRatio, normalize } from './../../utils/utils'
import { ReactComponent as SineButton } from './sine.svg'
import { ReactComponent as SquareButton } from './square.svg'
import ChannelSelect from './ChannelSelect/ChannelSelect'
import useMidi from '../../hooks/useMidi'
import useMidiOutput from '../../hooks/useMidiOutput'


const Sinewave = ({ number, name, description, amp, phase, speed }) => {
  let { inputs, outputs} = useMidi()
  let midiOutput = outputs[0]

  console.log('output', midiOutput)

  let { noteOn, noteOff, cc } = useMidiOutput(midiOutput)

  let countRef = useRef(0);
  let canvasRef = useRef();
  let prevEnableRef = useRef(true);
  let prevEnableSineMidi = useRef(false);
  let prevEnableSquareMidi = useRef(false);

  let [ isEnabled, setEnabled ] = useState(prevEnableRef.current);
  let [ isSineMidiOutput, setSineMidiOutput ] = useState(prevEnableSineMidi.current);
  let [ isSquareMidiOutput, setSquareMidiOutput ] = useState(prevEnableSquareMidi.current);

  let requestId;

  let midiValue;

  useEffect(() => {
    let canvas = canvasRef.current;
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

    let isTriggered;
    
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();

      // context.fillStyle = 'blue';
      // context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.lineWidth = 3 * ratio;
      context.strokeStyle = '#0e85ea';
      
      context.moveTo(0, canvas.height);
      
      // ratio of line width to canvas height, so we can calculate offset
      let lineWidthRatio = context.lineWidth / canvas.height

      let scalingFactor = 10000

      let readPosition = .5

      for (let x = 0; x < canvas.width; x++) {
        let y = amp * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + countRef.current) + (phase * 10)));
        // normalized and offset for lineWidth
        let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
        // flip the wave because canvas 0,0 starts at upper left, not lower right
        context.lineTo(x, canvas.height - (draw_y * canvas.height));
      }
      

      let t = amp * (Math.sin(2 * Math.PI * speed * (( (readPosition * canvas.width) / scalingFactor) + countRef.current ) + (phase * 10)));
      let readValue = normalize(t, 1, -1).toFixed(4)
      let drawValue = normalize(t * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)

      if (isTriggered !== Math.round(readValue)) {
        isTriggered = Math.round(readValue)
      }
      
      
    
      // setCurrentRawValue(midVal)
      if (isSineMidiOutput) {
        midiValue = Math.floor(readValue * 127)
        // midi.sendCC(0, 3, midiValue);
        if (midiOutput) {
          cc(midiValue)
        }
      }
      
    
      if (isSquareMidiOutput) {
        // midiValue = Math.floor(readValue * 127)
        // midi.sendCC(0, 3, midiValue);
      }
      

      // console.log('MIDI velo:', Math.floor(readValue * 127))

      // console.log(Math.round(midVal))

      // if (midVal == minValue ) {
      //   console.log('BINGO:', speed)
      // }


      // area painting
      context.stroke()
      context.lineTo(canvas.width + context.lineWidth, canvas.height); // bottom-right
      context.lineTo(0, canvas.height); // bottom-left
      // context.globalCompositeOperation = "destination-over"; // draw behind
      context.fillStyle = 'white';
      // context.fillStyle = '#badefd';
      context.fill(); 
      // context.globalCompositeOperation = "source-over"; // normal behavior

      
      // read head line
      context.beginPath();
      context.strokeStyle = 'lightgrey';
      context.lineWidth = 2 * ratio; 
      context.moveTo((readPosition * canvas.width), canvas.height);
      context.lineTo((readPosition * canvas.width), canvas.height - (drawValue * canvas.height));
      context.stroke();


      // read head value
      // context.fillStyle = 'black';
      // context.font = "30px Arial";
      // context.fillText(readValue, canvas.width - 200, 25);
     
     
      // midi value
      // context.fillStyle = 'black';
      // context.font = "30px Arial";
      // context.fillText(midiValue, canvas.width - 200, 25);




      // context.fillStyle = isTriggered ? 'red' : 'grey';
      // context.font = "30px Arial";
      // context.fillText(isTriggered ? 'on' : 'off', canvas.width - 200, 60);




      // beat circle marker
      // context.beginPath();
      // context.lineWidth = 4 * ratio; 
      // context.fillStyle = isTriggered ? 'red' : 'grey';
      // context.arc(
      //   canvas.width - 20, 
      //   20, 
      //   7, 
      //   0, 
      //   2 * Math.PI);
      // context.fill();

      // midi on label
      // context.fillStyle = isSineMidiOutput ? 'red' : 'grey';
      // context.font = "30px Arial";
      // context.fillText(isSineMidiOutput ? 'MIDI on' : 'MIDI off', canvas.width - 200, 100);


      countRef.current += .0005;

      if (isEnabled) {
        // eslint-disable-next-line
        requestId = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(requestId)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(requestId)
    }
  });


  const handleEnableClick = () => {
    prevEnableRef.current = !prevEnableRef.current
    setEnabled(prevEnableRef.current)
  }


  const handleEnableSineMidi = () => {
    prevEnableSineMidi.current = !prevEnableSineMidi.current
    setSineMidiOutput(prevEnableSineMidi.current)    
  }

  const handleEnableSquareMidi = () => {
    prevEnableSquareMidi.current = !prevEnableSquareMidi.current
    setSquareMidiOutput(prevEnableSquareMidi.current)    
  }


  return (
    <div className="sinewave-container">
      <div className="title-container">
        { description } ({ name })
      </div>
      <svg 
        className="button-enable"
        onClick={ handleEnableClick }>
        <circle 
          className= { isEnabled ? 'enabled' : ''}
          cx="20"
          cy="20"
          r="20"
        />
      </svg>

      <div className="body-container">
        <canvas ref={ canvasRef } />
        <div className="controls-container">
          <div className="control-container">          
            <SineButton
              className={ `button ${ isSineMidiOutput ? 'enabled' : '' }`} 
              onClick={ handleEnableSineMidi }
            />            
            <div className="channel-select">ch. 1</div>
          </div>
          <div className="control-container">          
            <SquareButton 
                className={ `button ${ isSquareMidiOutput ? 'enabled' : '' }`} 
                onClick={ handleEnableSquareMidi }
              />
            {/* <div className="channel-select">ch. 7</div> */}
            
            <ChannelSelect />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sinewave

