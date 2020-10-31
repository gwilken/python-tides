
// import React from 'react';
// import { useEffect, useState, useRef } from 'react';
import { useState, useEffect, useRef } from 'react';

import SineCanvas from './SineCanvas/SineCanvas';
import SelectMode from './SelectMode/SelectMode';
import SelectDeviceId from './SelectDeviceId/SelectDeviceId';
import SelectChannel from './SelectChannel/SelectChannel';

import {  
  NOTE_OFF,
  NOTE_ON,
  CC } from '../../constants/midi-constants'

import './SinewaveContainer.scss';
// import { normalize } from './../../utils/utils';


const SinewaveContainer = (props) => {
  // const valueRef = useRef();
  // const tickRef = useRef(0);
  // const canvasRef = useRef();
  const prevEnableRef = useRef(true);

  // osc settings
  const [speed, setSpeed] = useState(.0005) 
  const [amp, setAmp] = useState(props.amp)
  const [phase, setPhase] = useState(props.phase)
  const [freq, setFreq] = useState(props.freq)
  const [tempo, setTempo] = useState(120)
  const [isEnabled, setEnabled] = useState(prevEnableRef.current);

  // mapping settings
  const [mode, setMode] = useState(0x90)
  const [outputRange, setOutputRange] = useState([0, 127])

  // output setting
  const [outputDeviceId, setOutputDeviceId] = useState()
  const [outputChannel, setOutputChannel] = useState(0)

  // global
  const {globalAllowRun, availableOutputs, availableChannels} = props

  // console.log('availableChannels', availableChannels)

  // const [message, setMessage] = useState()


  // check if selected output was removed
  useEffect(() => {
    let ids = availableOutputs.map(output => output.id)
    if(ids.indexOf(outputDeviceId) === -1) {
      console.log('removed.')
      setOutputDeviceId(null)
    }
    
  }, [availableOutputs])


  const handleData = (data) => {
    const [rawValue, midiValue, time] = data
    // console.log('time:', time)
    // console.log('availableOutputs, outputDeviceId',availableOutputs, outputDeviceId)
    // console.log('mode, outputChannel, command', parseInt(mode), parseInt(outputChannel), parseInt(mode) | parseInt(outputChannel))

    if (outputDeviceId && availableOutputs.length > 0) {
      const midi = availableOutputs.filter(({id}) => id == outputDeviceId)[0]

      // console.log('midi value', midiValue)
        // const ccAndChannel = MIDIConstants.cc | getChannel(channel);
      

      midi.send([CC | outputChannel, 0x03, midiValue ])

      // command, pitch, velocity
      // const msgOn = [NOTE_ON, 60, 127]
      // const msgOff = [NOTE_OFF, 60, 127]
      // midi.send(msgOn)

      // midi.send(msgOff, Date.now() + 100)
      // midi.send(msgOff, time + 100)
    }

    // const msg = [mode, ]
    // const device = midiOut[selectOut.selectedIndex];
    // const msgOn = [NOTE_ON, pitch, velocity];
    // const msgOff = [NOTE_ON, pitch, velocity];
    
    // device.send(msgOn); 
 
    // device.send(msgOff, Date.now() + duration); 

  }


  const handleEnableClick = () => {
    prevEnableRef.current = !prevEnableRef.current
    setEnabled(prevEnableRef.current)
  }


  // const handleEnableSineMidi = () => {
  //   prevEnableSineMidi.current = !prevEnableSineMidi.current
  //   setSineMidiOutput(prevEnableSineMidi.current)    
  // }

  // const handleEnableSquareMidi = () => {
  //   prevEnableSquareMidi.current = !prevEnableSquareMidi.current
  //   setSquareMidiOutput(prevEnableSquareMidi.current)    
  // }

  let x = ['one', 'two']


  return (
    <div className="sinewave-container">

      <svg 
        className="output-indicator"
        onClick={ handleEnableClick }>
        <circle 
          className= { isEnabled ? 'enabled' : ''}
          cx="20"
          cy="20"
          r="20"
        />
      </svg>

      <div className="body-container">
        <SineCanvas 
          speed={speed}
          amp={amp}
          phase={phase} 
          freq={freq}
          tempo={tempo}
          isEnabled={isEnabled}
          globalAllowRun={globalAllowRun}
          handleData={ handleData }
        />

        <SelectMode 
          mode={mode}
          setMode={setMode}
        />

        <input type="range"
          min="1"
          max="720"
          value={tempo}
          step="1"
          onChange={(e) => setTempo(e.target.value)}
        />

        <div className="output-panel">
          <SelectDeviceId 
            availableOutputs={availableOutputs}
            outputDeviceId={outputDeviceId}
            setOutputDeviceId={setOutputDeviceId}
          />

          <SelectChannel 
            availableChannels={availableChannels}
            outputChannel={outputChannel}
            setOutputChannel={setOutputChannel}
          />
        </div>

        {/* <Selection
          name="ouput-device"
          value="0" 
          options={ props.availableOutputs }
          handleChange={ (e) => console.log(e) }
        /> */}

        {/* <MemoizedSineCanvas 
          speed={speed}
          amp={amp}
          phase={phase} 
          freq={freq}
          isEnabled={isEnabled}
          globalAllowRun={globalAllowRun}
          handleData={handleData}
        /> */}

        {/* <OutputPanel
          valueMode={valueMode} 
          setValueMode={setValueMode}
          outputRange={outputRange} 
          setOutputRange={setOutputRange}
        /> */}

      </div>

    </div>
  );
}

export default SinewaveContainer

