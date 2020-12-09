import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import SelectBeatPattern from './SelectBeatPattern';


const BeatIndicator = ({id, onMount}) => {
  let [computedHeight, setComputedHeight] = useState();
  let [computedWidth, setComputedWidth] = useState();

  let beatRef = useRef(0);
  let canvasRef = useRef(null);
  let contextRef = useRef();

  let enables = useSelector(state => state.enables);
  let beatSelections = useSelector(state => state.beatSelections[id]);

  let boundingRect;
  let mouse;

  let dispatch = useDispatch();

  useEffect(() => {
    onMount([id, beatRef]);
  }, [onMount, id]);


  let numOfBeats = 16;
  let spacer ;
  let spacerWidths;
  let beatWidth;
  let height;
  let hoveredIndex;
  let requestId;
  let lastBeat;

  let { beat } = beatRef.current;


  function redrawCanvas() {
    let { beat } = beatRef.current;

    for (let i = 0; i < numOfBeats; i++ ) {
      contextRef.current.beginPath();
      
      if (i === beat) {
        contextRef.current.fillStyle = '#86b7f6';
      } 
      
      else if (beatSelections[i]) {
        contextRef.current.fillStyle = 'hotpink';
      }

      else if (i === hoveredIndex) {
        contextRef.current.fillStyle = 'whitesmoke';
      }

      else {
        contextRef.current.fillStyle = '#ececec';
      }
      contextRef.current.fillRect(((beatWidth + spacer) * i), 0, beatWidth, height); 
    }
  }


  useEffect(() => {
    //// INITIAL DRAW SETUP //////
    contextRef.current = canvasRef.current.getContext('2d', { alpha: false });
    setComputedHeight(window.getComputedStyle(canvasRef.current).getPropertyValue('height').slice(0, -2));
    setComputedWidth(window.getComputedStyle(canvasRef.current).getPropertyValue('width').slice(0, -2));
    
    boundingRect = canvasRef.current.getBoundingClientRect();

    const scale = window.devicePixelRatio;
    const width = Math.floor(scale * computedWidth)
    height = scale * computedHeight;

    contextRef.current.fillStyle = 'white';
    contextRef.current.clearRect(0, 0, width, height);

    spacer = 3;
    spacerWidths = (numOfBeats - 1) * spacer;
    beatWidth = (computedWidth - spacerWidths) / numOfBeats;

    redrawCanvas()
  })


  useEffect(() => {
    function loop() {
      requestId = requestAnimationFrame(loop);

      let { beat } = beatRef.current;
      
      if (beat !== lastBeat) {
        redrawCanvas();
      }

      lastBeat = beat;
    }
    
    loop();
  
    return () => {
      cancelAnimationFrame(requestId);
    }
  })



  function toggleSelection(index) {
    let newSelections = beatSelections;
    newSelections[index] = !newSelections[index];
    dispatch(setBeatSelections({id, beats: newSelections }))
  }


  function handleMouseMove(e) {
    if (boundingRect) {
      let {top, left} = boundingRect;
      mouse = {
        x: e.clientX - left,
        y: e.clientY - top
      }
      hoveredIndex = Math.floor(mouse.x / (beatWidth + spacer));
    }

    redrawCanvas();
  }


  function handleMouseDown(e) {
    toggleSelection(hoveredIndex);
    redrawCanvas();
  }


  function handleMouseLeave() {
    mouse = null;
    hoveredIndex = null;
  }


  return (
    <div className={`beat-indicator ${enables[id] ? '' : 'disabled'}`}>
      <canvas 
        ref={canvasRef} 
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseDown={() => handleMouseDown()}
        onMouseLeave={() => handleMouseLeave()}
        width={computedWidth} 
        height={computedHeight} />
     
      <SelectBeatPattern id={id} />
    </div>
  )
}

export default BeatIndicator;

