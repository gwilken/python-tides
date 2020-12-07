import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import { normalize } from '../../../scripts/utils'
import SelectBeatPattern from './SelectBeatPattern';


const BeatIndicator = ({id, onMount}) => {
  let [currentBeat, setCurrentBeat] = useState({});
  let [computedHeight, setComputedHeight] = useState();
  let [computedWidth, setComputedWidth] = useState();

  let beatRef = useRef(0);

  let canvasRef = useRef(null);
  let enables = useSelector(state => state.enables);
  let beatSelections = useSelector(state => state.beatSelections[id]);

  let boundingRect;
  let mouse;

  let dispatch = useDispatch();

  useEffect(() => {
    // onMount([id, setCurrentBeat]);
    onMount([id, beatRef]);
  }, [onMount, id]);

  // console.log(currentBeat)

  // let currentBeat = useSelector(state => state.currentBeats[id]);
  let numOfBeats = 16;
  let beatMarkers = [];
  let spacer ;
  let spacerWidths;
  let beatWidth;
  let height;
  let hoveredIndex;

  // let height = normalize(currentBeat.value, 127, 30) * 100;

  let { beat } =  beatRef.current;

  let canvasContext;

  useEffect(() => {
    console.log('rerender')
    // let { beat } =  beatRef.current;

    const canvas = canvasRef.current
    canvasContext = canvas.getContext('2d', { alpha: false });
    // canvasContext = canvas.getContext('2d');
    setComputedHeight(window.getComputedStyle(canvas).getPropertyValue('height').slice(0, -2));
    setComputedWidth(window.getComputedStyle(canvas).getPropertyValue('width').slice(0, -2));
    
    boundingRect = canvas.getBoundingClientRect();

    const scale = window.devicePixelRatio;
    height = scale * computedHeight;
    const width = Math.floor(scale * computedWidth)

    canvasContext.fillStyle = 'white';
    canvasContext.clearRect(0, 0, width, height);

    spacer = 3;
    spacerWidths = (numOfBeats - 1) * spacer;
    beatWidth = (computedWidth - spacerWidths) / numOfBeats;

    for (let i = 0; i < numOfBeats; i++ ) {
      canvasContext.beginPath();
      canvasContext.rect(((beatWidth + spacer) * i), 0, beatWidth, height);  
      canvasContext.fillStyle = '#ececec';
      canvasContext.fill(); 
    }
    
  })


  useEffect(() => {
    
    let requestId;
    let lastBeat;

    function loop() {
      requestId = requestAnimationFrame(loop);

      let { beat } = beatRef.current;

      if (beat !== lastBeat) {
        for (let i = 0; i < numOfBeats; i++ ) {
          canvasContext.beginPath();
          canvasContext.rect(((beatWidth + spacer) * i), 0, beatWidth, height);  
  
          if (i === beat) {
            canvasContext.fillStyle = '#86b7f6';
          } else {
            canvasContext.fillStyle = '#ececec';
          }
  
          canvasContext.fill();  
        }
      }

      if (mouse) {
        hoveredIndex = Math.floor(mouse.x / (beatWidth + spacer));
        canvasContext.beginPath();
        canvasContext.rect(((beatWidth + spacer) * hoveredIndex), 0, beatWidth, height);  
        canvasContext.fillStyle = 'whitesmoke';
        canvasContext.fill(); 
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
    }
  }

  // for (let i = 0; i < numOfBeats; i++) {
  //   beatMarkers.push(
  //     <div className={
  //         `beat-marker-container 
  //         ${beatSelections[i] ? 'selected' : ''}
  //         ${enables[id] ? '' : 'disabled'}`
  //       }
  //       onClick={ () => toggleSelection(i) }>

  //       <div className={`beat-marker ${i == currentBeat.beat ? "active" : ''}`}
  //         style={{ 'height': height + '%' }} >
  //         </div>
  //     </div>
  //   )
  // }


  return (
    <div className="beat-indicator">
      <canvas 
        ref={canvasRef} 
        onMouseMove={handleMouseMove}
        onMouseLeave={ () => {mouse = null}}
        width={computedWidth} 
        height={computedHeight} />
     
      {/* <div className="markers-container">
        { beatMarkers }
      </div> */}

      <SelectBeatPattern id={id} />
    </div>
  )
}

export default BeatIndicator;

