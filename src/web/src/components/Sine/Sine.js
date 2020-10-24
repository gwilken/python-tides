import './Sine.scss'

import React from 'react';
import Waveform from './Waveform/Waveform'

const normalize = (val, max, min) => { return (val - min) / (max - min); }

const Sine = () => (
  <div className="sine">
    <Waveform amp=".95" phase="205" speed="10" />
    <Waveform amp=".5" phase="205" speed="40" />
    <Waveform amp=".2" phase="205" speed="250" />
  </div>
)

export default Sine

