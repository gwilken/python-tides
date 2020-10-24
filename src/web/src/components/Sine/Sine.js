import './Sine.scss'

import React, { useState } from 'react';
import Waveform from './Waveform/Waveform'

// const normalize = (val, max, min) => { return (val - min) / (max - min); }



const Sine = () => {
  const [speed, setSpeed] = useState('2')
  const [currentRawValue, setCurrentRawValue] = useState()

  const handleChange = (e) => {
    console.log(e)
    setSpeed(e.target.value)
  } 

  const handleOutput = (e) => {
    console.log('output:', e)
  }

  return (
    <div className="sine">
      {/* <Waveform amp=".5" phase="0" speed={speed} trigger={ handleTrigger} /> */}
      {/* <Waveform amp="1" phase="180" speed="4" trigger={ handleTrigger} /> */}
      
      <Waveform 
        amp="1"
        phase="10"
        speed="10"
        // setCurrentRawValue={ setCurrentRawValue }
        output={ handleOutput} 
      />


      {/* <Waveform amp=".25" phase="240" speed="10" trigger={ handleTrigger} /> */}
      <input 
        type="range"
        min="0"
        max="360"
        step="1"
        value={ speed }
        onChange={ (e) => handleChange(e) } />
    </div>
  )
}

export default Sine

