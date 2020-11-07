import { useEffect, useRef } from 'react';
// import { getPixelRatio, normalize } from '../../../utils/utils';


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
  const offscreenRef = useRef();
  const webWorkerRef = useRef();

  const widthRef = useRef();
  const heightRef = useRef();

  const ratio = window.devicePixelRatio;

 
  useEffect(() => {
    console.log('useEffect 1')

    webWorkerRef.current = new Worker('./webworkers/sine-worker.js');

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
    console.log('useEffect 2')

    if (webWorkerRef.current) {
      webWorkerRef.current.postMessage({
        action: 'update',
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
        console.log('msg:', e.data)
      }
    }
  })


  return (
    <canvas ref={ canvasRef } />
  );
}

export default SineCanvas
