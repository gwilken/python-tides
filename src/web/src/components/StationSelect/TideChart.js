import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { normalize } from '../../scripts/utils';


const TideChart = () => {
  const harmonics = useSelector(state => state.harmonics);
  const canvasRef = useRef();

  let sines = [];

  if (harmonics && harmonics['HarmonicConstituents'] && harmonics['HarmonicConstituents'].length > 0) {    
    sines = harmonics['HarmonicConstituents'].map(sine => {
      return {
        amplitude: sine.amplitude, 
        phase_local: sine.phase_local, 
        speed: sine.speed
      }
    })
  }

  console.log(sines)

  useEffect(() => {
    const canvas = canvasRef.current;
    const height = window.getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    const width = window.getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    const canvasContext = canvas.getContext('2d', { alpha: false });
    canvas.width = width;
    canvas.height = height;
    
    let lineWidth = 4
    let lineWidthRatio = lineWidth / height
    
    let tempDataArr = [];
    
    canvasContext.fillStyle = '#badefd';
    canvasContext.rect(0, 0, width, height);
    canvasContext.fill(); 
    
    canvasContext.beginPath();
    canvasContext.moveTo(0, height);
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = '#0e85ea';
    
    if (sines.length) {
      
      // sines.forEach((data, index) => {
        // const {amplitude, phase_local, speed} = data;          
        // const {amplitude, phase_local, speed} = sines[0];          

        for (let x = 0; x < width; x += .0025) {

          const reducer = (acc, curr) => acc * curr;

          let tempYs = sines.map(sine => {
            const { amplitude, phase_local, speed } = sine;
            return (Math.sin(speed * x + phase_local))
          });

          let y = tempYs.reduce(reducer);
          
          // let drawY = normalize(y * (1 - lineWidthRatio), 1.0, -1.0).toFixed(4)
          let drawY = normalize(y, 1.0, -1.0).toFixed(4)
          console.log(drawY)
          
          tempDataArr.push({
            y: parseFloat(y.toFixed(4)),
            drawY
          });
        }
      // })
        


      let lastY;

      for (let i = 0; i < width; i++) {
        let tempY = tempDataArr[i].drawY;
        let flippedY = height - (tempY * height);

        console.log(tempY,flippedY )

        canvasContext.lineTo(i, flippedY);
        // sinesDataArr.current[index].current.push(tempDataArr[sinesDataIndex].y);
        lastY = flippedY;
      }

      // we do this with lastY to avoid a slight visible line between repeats
      canvasContext.lineTo(width + (lineWidth * 2), lastY);
      canvasContext.lineTo(width + lineWidth * 2, height);
      canvasContext.lineTo(0, height)
      canvasContext.stroke();
      canvasContext.fillStyle = 'white';
      canvasContext.fill(); 
    }
  })


  return (
    <div className="tide-chart">
      <canvas ref={ canvasRef  } />
      TideChart
    </div>
  )
}

export default TideChart;

