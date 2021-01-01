import { useEffect, useRef, createRef } from 'react';
import { useSelector } from 'react-redux';
import { normalize } from '../../../scripts/utils';
import noteScheduler from '../../../scripts/NoteScheduler';

import SineInfoOverlay from './SineInfoOverlay';
import BeatIndicator from './BeatIndicator';
import Controls from './Controls/Controls';
import OutputValueDisplay from './OutputValueDisplay';
import SelectChannel from './SelectChannel';
import ButtonEnable from './ButtonEnable';


import './SinewaveContainer.scss';

let globalTime;
let globalTimeWorker = new Worker('./webworkers/globaltime-worker.js');
globalTimeWorker.postMessage('start')

globalTimeWorker.onmessage = function(e) {
  globalTime = e.data;
}

let schedulerWorker = new Worker('./webworkers/scheduler-worker.js');
let lastGlobalTime;


const SinewaveContainer = ({ sines }) => {
  const wrapperRefs = useRef(sines.map(() => createRef()));
  // const hudRefs = useRef(sines.map(() => createRef()));
  // const hudContextRefs = useRef(sines.map(() => createRef()));
  const divRefs = useRef(sines.map(() => createRef()));
  const repeatRefs = useRef(sines.map(() => createRef()));
  const translateXRefs = useRef(sines.map(() => createRef()));
  const sinesDataArr = useRef(sines.map(() => createRef()));
  const computedWidths = useRef(sines.map(() => createRef()));
  const computedHeights = useRef(sines.map(() => createRef()));

  let windowSize = useSelector(state => state.windowSize);
  let globalSpeed = useSelector(state => state.speed);
  let ranges = useSelector(state => state.ranges);
  let notes = useSelector(state => state.notes);
  let enables = useSelector(state => state.enables);
  let run = useSelector(state => state.run)

  let beatRefs = {};
  let setOutputDisplay = {};
  let setSineOverlayValue = {};

  useEffect(() => {
    /////// DRAW SETUP START //////////

    // save calcs in array so we dont recalc every tick to get value
    // we'll use css tranform translateX instead of redrawing every frame for best performance
    sines.forEach((data, index) => {
      const wrapper = wrapperRefs.current[index].current;
      // const hud = hudRefs.current[index].current;
      const computedHeight = parseFloat(window.getComputedStyle(wrapper).getPropertyValue('height').slice(0, -2));
      const computedWidth = parseFloat(window.getComputedStyle(wrapper).getPropertyValue('width').slice(0, -2));

      computedWidths.current[index].current = computedWidth;
      computedHeights.current[index].current = computedHeight;

      // also setup canvas that will overlay range, realtime data
      // hud.width = computedWidth;
      // hud.height = computedHeight;

      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d', { alpha: false });

      const {amplitude, phase_local, speed} = data;          
      const height = computedHeight;

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
      }
      
      let tempWidth = tempDataArr.length;

      // we want width of final div to be at least triple the wrapper div's width
      // and repeat pattern without getting cutting off
      let canvasWidth = (computedWidth * 3) + (tempWidth - ((((computedWidth * 3) / tempWidth) % 1) * tempWidth));
      canvas.width = canvasWidth;

      // save num of repeats. will need for animation later.
      let numOfRepeats = canvasWidth / tempWidth;
      repeatRefs.current[index].current = numOfRepeats;

      canvas.height = height;

      canvasContext.fillStyle = '#badefd';
      canvasContext.rect(0, 0, canvasWidth, height);
      canvasContext.fill(); 

      canvasContext.beginPath();
      canvasContext.moveTo(0, height);
      canvasContext.lineWidth = lineWidth;
      canvasContext.strokeStyle = '#0e85ea';

      let lastY;

      sinesDataArr.current[index].current = [];

      // loop through our draw array repeating to fill canvas width, draw, and populate an arr of all values
      for (let i = 0; i < canvasWidth; i++) {
        let sinesDataIndex = i % tempDataArr.length;
        let tempY = tempDataArr[sinesDataIndex].drawY;
        // flip the sine wave because canvas 0,0 starts at upper left, not lower right
        let flipepdY = height - (tempY * height);
        canvasContext.lineTo(i, flipepdY);
        sinesDataArr.current[index].current.push(tempDataArr[sinesDataIndex].y);
        lastY = flipepdY;
      }

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



    // console.log('computedWidths', computedWidths)

  }, [windowSize, sines])


  useEffect(() => {
    // schedule first note only once;
    noteScheduler.nextNoteTime = window.performance.now();
  }, [])


  ////// ANIMATION START //////////
  useEffect(() => {
    let requestId;

    const loop = () => {
      let elapsed = globalTime - lastGlobalTime;

      requestId = requestAnimationFrame(loop);
      
      if (run) {
        sines.forEach((data, index) => {
          // let hudContext = hudContextRefs.current[index].current;
          let repeat = repeatRefs.current[index].current;
          // (1000 - globalSpeed) because 3000 is max of input range and we want 
          // speed to increase as value does, so we subtract max value to flip it.
          let xOffset = (globalTime / (3000 - globalSpeed)) % (100 / repeat);
          translateXRefs.current[index].current = xOffset;
          divRefs.current[index].current.style.transform = 'translateX(-' + translateXRefs.current[index].current  + '%)';
        })
      }

      while (noteScheduler.notesInQueue.length && noteScheduler.notesInQueue[0].time < globalTime) {
        let currentNote = noteScheduler.notesInQueue.splice(0,1);
        let { index } = currentNote[0];
  
        // this is to avoid the animation racing to catch up to current time 
        // after tab has been throttled due to chrome background timer policy
        if (elapsed < 1000) {
          if (beatRefs[index]) {
            setTimeout(() => {
              beatRefs[index].current = currentNote[0];
            }, 0);
          }

          if (setOutputDisplay[index]) {
            setTimeout(() => {
              setOutputDisplay[index](currentNote[0]);
            }, 0);
          }

          if (setSineOverlayValue[index]) {
            setTimeout(() => {
              setSineOverlayValue[index](currentNote[0]);
            }, 0);
          }
        }
      }

      lastGlobalTime = globalTime;
    }
    
    loop();
  
    return () => {
      cancelAnimationFrame(requestId);
    }
    // eslint-disable-next-line
  }, [globalSpeed, enables, windowSize, setOutputDisplay, sines, notes])


  useEffect(() => {
    schedulerWorker.postMessage('start')
  }, [])


  // return midi value of sinewave[index] based on current time
  function returnMidiValueNow(index) {
    let canvasWidth = computedWidths.current[index].current;
    let clampedMidiValue;
    let repeat = repeatRefs.current[index].current;
    let xOffset = (globalTime / (3000 - globalSpeed)) % (100 / repeat);
    let length = sinesDataArr.current[index].current.length;
    let offsetPercent = xOffset * .01;

    if (length) {
      // gets value at read head. half of wrapper width is middle
      let arrIndex = Math.floor((length * offsetPercent) + (canvasWidth / 2));
      let val = sinesDataArr.current[index].current[arrIndex % length];

      let range = ranges[index];
      let note = notes[index];
      let midiValue = note + Math.floor((val * range) / 2)
      clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
    }

    return clampedMidiValue;
  }


  schedulerWorker.onmessage = function(e) {
    // we only need to calc midi values when we schedule them
    if (run && e.data === 'tick') {
      let midiValues = sines.map((data, index) => {
        return [returnMidiValueNow(index), index]
      })
      noteScheduler.scheduler(globalTime, midiValues);
    }
  }


  // pass this a ref from beatindicator up to avoid
  // using redux dispatch because of performance issues 
  const onBeatIndicatorMount = ([id, beatRef]) => {
    beatRefs[id] = beatRef;
  }

  const onOutputDisplayMount = ([id, setCurrentBeat]) => {
    setOutputDisplay[id] = setCurrentBeat;
  }


  const OnSineOverlayMount = ([id, setCurrentValue]) => {
    setSineOverlayValue[id] = setCurrentValue;
  }

  return (
    <div>
      {
        sines.map((data, index) => (
          <div 
            className="sinewave-container"
            key={'sinecontainer-' + index}>
            <div className="canvas-wrapper" ref={ wrapperRefs.current[index] }>
              <SineInfoOverlay onMount={OnSineOverlayMount} id={index} />
              
              <div 
                className={`sine-div ${enables[index] ? '' : 'disabled'}`} 
                ref={ divRefs.current[index] }></div>
             
              <div className="read-head"></div>
              <div className="label">{data.description} ({data.name})</div>
            </div>
            
            <BeatIndicator onMount={onBeatIndicatorMount} id={index} />

            <Controls id={index} />
            
            <OutputValueDisplay onMount={onOutputDisplayMount} id={index} />

            <div className="output-container">
              <ButtonEnable id={index} />
              <SelectChannel id={index} />
            </div>

          </div>
        ))
      }
    </div>
  );
}

export default SinewaveContainer
