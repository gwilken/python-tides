import { useState, useEffect, useRef } from 'react';

import SelectMode from './SelectMode/SelectMode';
import SelectNote from './SelectNote/SelectNote'
import SelectCC from './SelectCC/SelectCC'
import SelectModeRange from './SelectModeRange/SelectModeRange'
import SelectDeviceId from './SelectDeviceId/SelectDeviceId';
import SelectChannel from './SelectChannel/SelectChannel';
import SelectTempoRange from './SelectTempoRange/SelectTempoRange'

import useMidiOutputs from '../../../../hooks/useMidiOutputs'


const Controls = ({ globalRun, globalSpeed }) => {
  const availableOutputs = useMidiOutputs([])
  const [channels, setChannels] = useState(new Array(16).fill(0))

  const prevEnableRef = useRef(true);

  const [isEnabled, setEnabled] = useState(prevEnableRef.current);
  
  // mapping settings
  const [mode, setMode] = useState('NOTE_ON')
  const [note, setNote] = useState('69')
  const [ccParameter, setCC] = useState(0x03)
  const [modeRange, setModeRange] = useState(127)
  
  // output setting
  const [outputDeviceId, setOutputDeviceId] = useState()
  const [outputChannel, setOutputChannel] = useState(0)
  const [tempo, setTempo] = useState(120)

  // ui settings
  const [collapsed, setCollapsed] = useState(true);


  // check if selected output was removed
  useEffect(() => {
    if (availableOutputs && availableOutputs.length > 0) {
      let ids = availableOutputs.map(output => output.id)
      if(ids.indexOf(outputDeviceId) === -1) {
        setOutputDeviceId(null)
      }
    }
  }, [availableOutputs])


  const handleEnableClick = () => {
    prevEnableRef.current = !prevEnableRef.current
    setEnabled(prevEnableRef.current)
  }


  let SecondarySelect;

  if (mode == 'NOTE_ON') {
    SecondarySelect =
      <SelectNote 
        mode={mode}
        note={note}
        setNote={setNote}
      />;
  } else if (mode == 'CC') {
    SecondarySelect = 
      <SelectCC 
        ccParameter={ccParameter}
        setCC={setCC}
      />;
  }

  return (

      <div className="body-container">

        <div className="controls-container">
          <div className="mode-container">
            <SelectMode 
              mode={mode}
              setMode={setMode}
            />

            { SecondarySelect }

            <SelectModeRange 
              mode={mode}
              modeRange={modeRange}
              setModeRange={setModeRange}
            />
          </div>
          

          <div className="output-container">
            <SelectDeviceId 
              availableOutputs={availableOutputs}
              outputDeviceId={outputDeviceId}
              setOutputDeviceId={setOutputDeviceId}
            />

            <SelectChannel 
              channels={channels}
              setChannels={setChannels}
              outputChannel={outputChannel}
              setOutputChannel={setOutputChannel}
            />

            <SelectTempoRange 
              tempo={tempo}
              setTempo={setTempo}
            />
          </div>
        </div>

        <div className="side-controls-container">
          <div className="button-enable">
            <svg 
              onClick={ handleEnableClick }>
              <circle 
                className= { isEnabled && globalRun ? 'enabled' : ''}
                cx="15"
                cy="15"
                r="15"
              />

              { collapsed &&
                <text x="50%" y="50%" textAnchor="middle" fill="white" dy=".3em">
                  { parseInt(outputChannel) + 1 }
                </text>
              }
            </svg>
          </div>

          <div className="button-collapse"
            onClick={ () => setCollapsed(!collapsed) }>
            <svg viewBox="0 0 30 50">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fill="#000000">
                  <path d="M5.22428571,25.0010732 L29.3556494,3.57190657 C30.1980519,2.75498737 30.1980519,1.42960859 29.3556494,0.612689394 C28.5132468,-0.204229798 27.1457143,-0.204229798 26.3033117,0.612689394 L0.624350649,23.4151515 C0.174220779,23.8506944 -0.0165584416,24.4300505 0.0134415584,24.9989268 C-0.0165584416,25.5699495 0.174220779,26.1471591 0.624350649,26.5827652 L26.3033117,49.3851641 C27.1457143,50.2020833 28.5132468,50.2020833 29.3556494,49.3851641 C30.1980519,48.5683081 30.1980519,47.2428662 29.3556494,46.4260101 L5.22428571,25.0010732 Z" id="Path"></path>
                </g>
              </g>
            </svg>
          </div>

        </div>

      </div>

  );
}

export default Controls;
