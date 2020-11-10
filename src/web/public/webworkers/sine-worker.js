const normalize = (val, max, min) => { return (val - min) / (max - min); }

let data;
let context;
let requestId;

let currentTime;
let currentValue = 0;

let readAheadTime;
let readAheadValue = 0;

console.log('sine-worker start')

// const metronome = new Worker('/webworkers/metronome-worker.js');

// metronome.onmessage = (msg) => {
//   // console.log(msg.data)
//   postMessage(['queue-note', data.number, parseFloat(readAheadValue), readAheadTime - currentTime])
// }



onmessage = function(e) {
  let { action } = e.data

  switch (action) {
    case 'setup':
      console.log('setup')
      data = e.data;
      context = e.data.canvas.getContext('2d');
      render();
    break;

    case 'update':
      console.log('update')
      data = {...e.data};
    break;
  }

    // return () => {
      //   cancelAnimationFrame(requestId)
      // }      
}
    
    
const render = () => {
  console.log('render')
  let then = 0;
  let elapsed;
  let beatAnimationState = false;
  let valueNormalizedLineWidth;
  const scalingFactor = 10000
  // const buffer = 1000; 
  
  
  // where we read current value
  let readPosition = .5
  
  const loop = (now) => {
    currentTime = now;
    readAheadTime = now + 500;

    // let beatsPerSecondInterval = 1000 / (data.tempo / 60);
    // let animationDuration = (1000 / (data.tempo / 60)) - 100;

    // if (now == undefined) {
      // now = prevTimestampRef.current
      // then = now
    // }

    // prevTimestampRef.current = now

    if (data.isEnabled && data.globalRun) {
      // eslint-disable-next-line
      requestId = requestAnimationFrame(loop)
    } 
  
  // else {
  //   cancelAnimationFrame(requestId)
  // }

    // elapsed = now - then;



    // if (elapsed > beatsPerSecondInterval) {
    //   then = now - (elapsed % beatsPerSecondInterval);
    //   beatAnimationState = true;
      

      // handleData([valueRef.current, now])

      // setTimeout(() => {
      //   beatAnimationState = false
      // }, animationDuration)
    // }

    context.rect(0, 0, data.width, data.height);
    context.fillStyle = '#badefd';
    context.fill();

    context.beginPath();
    context.lineWidth = 3 * data.ratio;
    context.strokeStyle = '#0e85ea';
    
    context.moveTo(0, data.height);
    
    // data.ratio of line data.width to canvas data.height, so we can calculate offset
    let lineWidthRatio = context.lineWidth / data.height


    // draw sine wave
    for (let x = 0; x < data.width; x++) {
      let y = data.amp * (Math.sin(2 * Math.PI * data.freq * ((x / scalingFactor) + (now / (scalingFactor / data.globalSpeed))) + parseFloat(data.phase) ));
      // normalized and offset for lineWidth
      let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
      // flip the wave because canvas 0,0 starts at upper left, not lower right
      context.lineTo(x, data.height - (draw_y * data.height));
      // get value at read position and save for later
      if (x == Math.floor(readPosition * data.width)) {
        currentValue = normalize(y, 1, -1).toFixed(4)
        valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)

        let readAheadY = data.amp * (Math.sin(2 * Math.PI * data.freq * ((x / scalingFactor) + (readAheadTime / (scalingFactor / data.globalSpeed))) + parseFloat(data.phase) ));
        readAheadValue =  normalize(readAheadY, 1, -1).toFixed(4)
      }
    }
  
    // fill under area
    context.stroke()
    context.lineTo(data.width + context.lineWidth, data.height); 
    context.lineTo(0, data.height);
    context.fillStyle = 'white';
    context.fill(); 

    // draw read head line
    context.beginPath();
    context.strokeStyle = 'orange';
    context.lineWidth = 2 * data.ratio; 
    context.moveTo((readPosition * data.width), data.height);
    // context.lineTo((readPosition * data.width), data.height - (valueNormalizedLineWidth * data.height));
    context.lineTo((readPosition * data.width), 0);
    context.stroke();

    
    // draw center horizontal axis
    // context.beginPath();
    // context.strokeStyle = 'orange';
    // context.lineWidth = 2 * data.ratio; 
    // context.moveTo(width - 20, data.height / 2);
    // context.lineTo(width, data.height / 2);
    // context.stroke();


    // tick debug
    context.font = "36px Arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.lineWidth = 1.5 * data.ratio; 
    context.strokeStyle = 'white';
    context.fillStyle = 'black';
    context.strokeText(
      now, 
      data.width / 2, 
      data.height / 2);
    context.fillText(
      now, 
      data.width / 2, 
      data.height / 2);

    // context.strokeText(
    //   readAheadValue, 
    //   data.width / 2, 
    //   data.height / 4);
    // context.fillText(
    //   readAheadValue, 
    //   data.width / 2, 
    //   data.height / 4);


    // center data.note
    context.font = "22px Arial";
    context.textBaseline = "middle";
    context.textAlign = "end";
    context.lineWidth = 1.5 * data.ratio; 
    context.strokeStyle = 'white';
    context.fillStyle = 'black';
    context.strokeText(
      data.mode == 'NOTE_ON' ? data.note : 64, 
      data.width - 20, 
      data.height / 2);
    context.fillText(
      data.mode == 'NOTE_ON' ? data.note : 64, 
      data.width - 20, 
      data.height / 2);
  
    // high range data.note
    context.textBaseline = "bottom";
    let highNote;
    if (data.mode == 'NOTE_ON') {
      highNote = parseInt(data.note) + Math.floor(parseInt(data.modeRange) / 2)
    } else if (data.mode == 'CC') {
      highNote = 64 + Math.floor(parseInt(data.modeRange) / 2)
    }
    let clampedHighNote = Math.min(Math.max(highNote, 0), 127);

    context.lineWidth = 1.5 * data.ratio; 
    context.strokeStyle = 'white';
    context.strokeText(clampedHighNote, data.width - 20, 30);
    context.fillText(clampedHighNote, data.width - 20, 30);
    
    // low range data.note
    context.textBaseline = "top";
    let lowNote;
    if (data.mode == 'NOTE_ON') {
      lowNote = parseInt(data.note) - Math.floor(parseInt(data.modeRange) / 2)
    } else if (data.mode == 'CC') {
      lowNote = 63 - Math.floor(parseInt(data.modeRange) / 2)  
    }
    let clampedLowNote = Math.min(Math.max(lowNote, 0), 127);
    context.lineWidth = 1.5 * data.ratio; 
    context.strokeStyle = 'white';
    context.strokeText(clampedLowNote, data.width - 20, data.height - 30);
    context.fillText(clampedLowNote, data.width - 20, data.height - 30);

    // draw tempo/beat indicator
    context.beginPath();
    context.strokeStyle = 'orange';
    context.lineWidth = 2 * data.ratio; 
    context.fillStyle = 'orange';
    context.arc(25, data.height - 25, 12, 0, 2 * Math.PI);
    context.stroke()

    if (beatAnimationState && data.isEnabled && data.globalRun) {
      context.fill();
    }
  }

  loop();
}

