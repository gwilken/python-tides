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

  let globalSpeed = 0.005;
  let xPercentage = 0;

  //look ahead in %
  let lookAheadAmount = 1;
  let lookAheadPercentage = xPercentage + lookAheadAmount;

  // sound test
  // create an oscillator
  let audioContext = new AudioContext();
  // let osc = audioContext.createOscillator();
  // let noteLength = 500;
  // osc.connect( audioContext.destination );
  // osc.frequency.value = 440.0;

  // var buffer = audioContext.createBuffer(1, 1, 22050);
  // var node = audioContext.createBufferSource();
  // node.buffer = buffer;
  // node.start(0);


  let nextNoteTime;
  let scheduleAheadTime = 1000;
  let notesInQueue = [];
  let current16thNote = 0;
  // let secondsPerBeat;
  let tempo = 120;
  let noteLength = 250;



  const nextNote = () => {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += 1000 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero

    if (current16thNote == 16) {
        current16thNote = 0;
    }
  }


  const scheduleNote = ( beatNumber, time ) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );

    // create an oscillator
    // var osc = audioContext.createOscillator();
    // osc.connect( audioContext.destination );
    // if (beatNumber % 16 === 0)    // beat 0 == high pitch
    //     osc.frequency.value = 880.0;
    // else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
    //     osc.frequency.value = 440.0;
    // else                        // other 16th notes = low pitch
    //     osc.frequency.value = 220.0;

    // osc.start( time );
    // osc.stop( time + noteLength );
  }




  const scheduler = () => {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (nextNoteTime < window.performance.now() + scheduleAheadTime ) {
      console.log('schedule....')
        scheduleNote( current16thNote, nextNoteTime );
        nextNote();
    }
  }


  useEffect(() => {
    let metroWorker = new Worker('/webworkers/metronome-worker.js')

    metroWorker.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
        // console.log('tick')
      }
    }




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

    // get timeoffset = look ahead percent / percentage of movement per animation frame

    let noteUnplayedPlayed = 1

    nextNoteTime = window.performance.now();

    metroWorker.postMessage('start')

    const draw = (now) => {
      requestId = requestAnimationFrame(draw);


      while (notesInQueue.length && notesInQueue[0].time < now) {
        // currentNote = notesInQueue[0].note;
        notesInQueue.splice(0,1);   // remove note from queue
      }

      console.log(notesInQueue)

      if (xPercentage >= 33.33333) {
        xPercentage = 0;
      }
 
      if (lookAheadPercentage >= 33.33333) {
        lookAheadPercentage = 0;
      }
      


      // console.log('scheduleTimeOffset', scheduleTimeOffset)
 

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
          // requestId = requestAnimationFrame(draw)
        // } 
      
      // else {
      //   cancelAnimationFrame(requestId)
      // }
    
        elapsed = now - then;

        // console.log('elapsed:', elapsed)

        then = now

      // console.log('x * 16ms:', xPercentage * 16.66)

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
          // divRefs.current[1].current.style.transform = 'translateX(-' + xPercentage  + '%)'
          
          if ( sinesDataArr[index].length > 0) {
            let arrIndex = Math.floor((sinesDataArr[index].length * (xPercentage * .01)) * 3)

            let lookAheadIndex = Math.floor((sinesDataArr[index].length * (lookAheadPercentage * .01)) * 3)

            let val = sinesDataArr[index][arrIndex].value
            let lookAheadVal = sinesDataArr[index][lookAheadIndex].value

            // console.log(lookAheadVal)

            if (lookAheadVal == 0.61 && noteUnplayedPlayed) {
              // console.log(lookAheadVal)
              // let scheduleTimeOffset = ((lookAheadAmount * 3) / (globalSpeed * 16.66)) * 100
              let scheduleTimeOffset = ((lookAheadAmount * .3) / (globalSpeed * 16.66))

              // console.log('scheduled...', audioContext.currentTime, audioContext.currentTime + scheduleTimeOffset)
              // osc.start( audioContext.currentTime + scheduleTimeOffset );
              // osc.stop( audioContext.currentTime + scheduleTimeOffset + 1 );

              // noteUnplayedPlayed = 0
            }


            
            // console.log(sinesDataArr[index][lookAheadIndex].value)
            // console.log(arrIndex, lookAheadIndex)
          }
        })
      
        xPercentage += globalSpeed;
        lookAheadPercentage += globalSpeed;
      }
    
      draw();
    
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
              <div className="lookahead-head" style={{ 'left': 50 + lookAheadAmount * 3 + '%' }}></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default SineCanvas
