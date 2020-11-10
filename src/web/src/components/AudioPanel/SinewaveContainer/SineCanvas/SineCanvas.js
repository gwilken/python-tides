import { useEffect, useRef } from 'react';
// import { getPixelRatio, normalize } from '../../../utils/utils';
import noteScheduler from '../../../utils/NoteScheduler';

const SineCanvas = ({
  number,
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
  const offscreenRef = useRef();
  const webWorkerRef = useRef();

  const widthRef = useRef();
  const heightRef = useRef();

  const ratio = window.devicePixelRatio;

  var audioCtx = new AudioContext();

 
  useEffect(() => {
    console.log('useEffect 1')

    webWorkerRef.current = new Worker('/webworkers/sine-worker.js');

    let canvas = canvasRef.current;
    
    let computedWidth = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let computedHeight = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    
    canvas.width = computedWidth * ratio;
    canvas.height = computedHeight * ratio;
    canvas.style.width = `${computedWidth}px`;
    canvas.style.height = `${computedHeight}px`;

    widthRef.current = canvas.width;
    heightRef.current = canvas.height;

    offscreenRef.current = canvasRef.current.transferControlToOffscreen()

    if (webWorkerRef.current) {
      webWorkerRef.current.postMessage({
        action: 'setup',
        canvas: offscreenRef.current,
        number,
        ratio,
        amp, 
        phase, 
        freq, 
        tempo, 
        mode,
        isEnabled, 
        globalRun, 
        globalSpeed,
        modeRange, 
        note,
        width: widthRef.current,
        height: heightRef.current
      }, [offscreenRef.current]);
    }
  }, [])

 
  useEffect(() => {
    // console.log('useEffect 2', audioCtx.currentTime)

    if (webWorkerRef.current) {
      webWorkerRef.current.postMessage({
        action: 'update',
        number,
        ratio,
        amp, 
        phase, 
        freq, 
        tempo, 
        mode,
        isEnabled, 
        globalRun, 
        globalSpeed,
        modeRange, 
        note,
        width: widthRef.current,
        height: heightRef.current
      });

      webWorkerRef.current.onmessage = (e) => {
          console.log('timestamp', e.data)
          // console.log('now', Date.now())

        // noteScheduler.enqueueTask( [() => { console.log('time:', e.data) }, window.performance.now() + 1000] )

      }
    }
  })


  return (
    <canvas ref={ canvasRef } />
  );
}

export default SineCanvas
