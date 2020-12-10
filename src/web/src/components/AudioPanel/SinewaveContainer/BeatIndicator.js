import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import SelectBeatPattern from './SelectBeatPattern';
import SelectNoteLength from './SelectNoteLength';


const BeatIndicator = ({id, onMount}) => {
  let [computedHeight, setComputedHeight] = useState();
  let [computedWidth, setComputedWidth] = useState();

  let beatRef = useRef(0);
  let canvasRef = useRef(null);
  let contextRef = useRef();
  let boundingRect = useRef();
  let height = useRef();
  let beatWidth = useRef();

  let enables = useSelector(state => state.enables);
  let beatSelections = useSelector(state => state.beatSelections[id]);

  let mouse;

  let dispatch = useDispatch();

  useEffect(() => {
    onMount([id, beatRef]);
  }, [onMount, id]);


  let hoveredIndex;

  // let { beat } = beatRef.current;


  function redrawCanvas() {
    let { beat } = beatRef.current;

    for (let i = 0; i < 16; i++ ) {
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
      contextRef.current.fillRect(((beatWidth.current + 3) * i), 0, beatWidth.current, height.current); 
    }
  }


  useEffect(() => {
    let requestId;
    let lastBeat;

    //// INITIAL DRAW SETUP //////
    contextRef.current = canvasRef.current.getContext('2d', { alpha: false });
    setComputedHeight(window.getComputedStyle(canvasRef.current).getPropertyValue('height').slice(0, -2));
    setComputedWidth(window.getComputedStyle(canvasRef.current).getPropertyValue('width').slice(0, -2));
    
    boundingRect.current = canvasRef.current.getBoundingClientRect();

    const scale = window.devicePixelRatio;
    const width = Math.floor(scale * computedWidth)
    height.current = scale * computedHeight;

    contextRef.current.fillStyle = 'white';
    contextRef.current.clearRect(0, 0, width, height.current);

    let spacerWidths = (16 - 1) * 3;
    beatWidth.current = (computedWidth - spacerWidths) / 16;

    redrawCanvas();

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
    // eslint-disable-next-line
  }, [computedWidth, computedHeight, beatSelections])



  function toggleSelection(index) {
    let newSelections = beatSelections;
    newSelections[index] = !newSelections[index];
    dispatch(setBeatSelections({id, beats: newSelections }))
  }


  function handleMouseMove(e) {
    if (boundingRect.current) {
      let {top, left} = boundingRect.current;
      mouse = {
        x: e.clientX - left,
        y: e.clientY - top
      }
      hoveredIndex = Math.floor(mouse.x / (beatWidth.current + 3));
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
     
      <div className="selects-container">
        <SelectNoteLength id={id} />
        <SelectBeatPattern id={id} />
      </div>
    </div>
  )
}

export default BeatIndicator;

