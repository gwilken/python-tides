console.log('sine-worker start')

const normalize = (val, max, min) => { return (val - min) / (max - min); }

let arr = [];

onmessage = function(e) {
  let [width, height, amplitude, speed, phase_local, lineWidth] = e.data;

  // save calc in array so we dont have to recalc every tick
  if (arr.length === 0) {
    // scale the sinewave so it fits in the container at exact repeat of period
    let period = (Math.PI * 2) / speed;
    let scalingFactor = period / (width / 3);

    console.log(' amplitude, speed, phase_local',  amplitude, speed, phase_local)

    console.log('period', period)

    let lineWidthRatio = lineWidth / height;

    for (let x = 0; x < period; x += .01) {
      // let y = amplitude * Math.sin(speed * (x * scalingFactor) + phase_local);
      let y = amplitude * (Math.sin(speed * x + phase_local));
      // let y = amplitude * (Math.sin(2 * Math.PI * speed * x + phase_local));


      // normalized and offset for lineWidth
      // let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0)
      // flip the wave because canvas 0,0 starts at upper left, not lower right
      arr.push(
        // y: height - (draw_y * height).toFixed(0),
        // y: y.toFixed(3),
        // value: parseFloat(y.toFixed(2))
        parseFloat(y.toFixed(3))
      );
    }

    // console.log(arr.length * period)
  } 

  postMessage(arr)

  // after post message, rotate array 1 place left and save
  // let rotated = arr.slice(1).concat(arr.slice(0,1))
  // arr = rotated  

}
    
    




 //  for (let x = 0; x < width; x++) {
  //   // let y = amplitude * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + (now / (scalingFactor / globalSpeed))) + parseFloat(phase_local) ));
  //   let y = amplitude * Math.sin(2 * Math.PI * speed * (x / scalingFactor) + parseFloat(phase_local) + count);
    
  //   // normalized and offset for lineWidth
  //   let draw_y = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
  //   // flip the wave because canvas 0,0 starts at upper left, not lower right
    
  //   arr.push( parseInt((height - (draw_y * height)).toFixed(0)) );
    
  //     // get value at read position and save for later
  //   // if (x == Math.floor(readPosition * width)) {
  //   //   currentValue = normalize(y, 1, -1).toFixed(4)
  //   //   valueNormalizedLineWidth = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)

  //   //   let readAheadY = amplitude * (Math.sin(2 * Math.PI * speed * ((x / scalingFactor) + (readAheadTime / (scalingFactor / globalSpeed))) + parseFloat(phase_local) ));
  //   //   readAheadValue =  normalize(readAheadY, 1, -1).toFixed(4)
  //   // }
  // }