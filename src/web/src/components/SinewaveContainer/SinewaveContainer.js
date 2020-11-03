
import { useState, useEffect, useRef } from 'react';

import SineCanvas from './SineCanvas/SineCanvas';
import SelectMode from './SelectMode/SelectMode';
import SelectNote from './SelectNote/SelectNote'
import SelectCC from './SelectCC/SelectCC'
import SelectModeRange from './SelectModeRange/SelectModeRange'
import SelectDeviceId from './SelectDeviceId/SelectDeviceId';
import SelectChannel from './SelectChannel/SelectChannel';
import SelectTempoRange from './SelectTempoRange/SelectTempoRange'

import './SinewaveContainer.scss';


const SinewaveContainer = (props) => {
  const prevEnableRef = useRef(true);

  // osc settings
  const [speed, setSpeed] = useState(.0005) 
  const [amp, setAmp] = useState(props.amp)
  const [phase, setPhase] = useState(props.phase)
  const [freq, setFreq] = useState(props.freq)
  const [tempo, setTempo] = useState(120)
  const [isEnabled, setEnabled] = useState(prevEnableRef.current);

  // mapping settings
  const [mode, setMode] = useState('NOTE_ON')
  const [note, setNote] = useState('69')
  const [ccParameter, setCC] = useState(0x03)

  const [modeRange, setModeRange] = useState(Math.floor(127 * parseFloat(amp)))

  // output setting
  const [outputDeviceId, setOutputDeviceId] = useState()
  const [outputChannel, setOutputChannel] = useState(0)

  // global
  const {globalAllowRun, availableOutputs, availableChannels} = props


  // check if selected output was removed
  useEffect(() => {
    let ids = availableOutputs.map(output => output.id)
    if(ids.indexOf(outputDeviceId) === -1) {
      setOutputDeviceId(null)
    }
  }, [availableOutputs])


  const handleData = (data) => {
    const [rawValue, time] = data
    if (outputDeviceId && availableOutputs.length > 0) {
      if (mode == 'NOTE_ON') {
        let midiValue = Math.floor(parseFloat(rawValue) * parseInt(modeRange)) + (parseInt(note) - (Math.floor(parseInt(modeRange) / 2)))
        let clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
        sendNote(clampedMidiValue, time)
      } else if (mode == 'CC') {
        let midiValue = Math.floor(parseFloat(rawValue) * parseInt(modeRange)) + (63 - (Math.floor(parseInt(modeRange) / 2)))
        let clampedMidiValue = Math.min(Math.max(midiValue, 0), 127);
        sendCC(clampedMidiValue)
      }
    }
  }


  const sendNote = (note, time) => {
    const midi = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
    // msg = [command, pitch, velocity]. use bitwise OR to add channel
    const msgOn = [0x90 | outputChannel, note, 127]
    const msgOff = [0x80 | outputChannel, note, 127]

    midi.send(msgOn)
    midi.send(msgOff, time + 250)
  }


  const sendCC = (value) => {
    const midi = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
    midi.send([0xB0 | outputChannel, ccParameter, value ])
  }

  const handleEnableClick = () => {
    prevEnableRef.current = !prevEnableRef.current
    setEnabled(prevEnableRef.current)
  }

  const handleResetNotes = () => {
    const midi = availableOutputs.filter(({id}) => id == outputDeviceId)[0]
    midi.send([0xB0 | outputChannel, 123, 127 ])
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
    <div className="sinewave-container">
      <div className="body-container">
        <SineCanvas 
          speed={speed}
          amp={amp}
          phase={phase} 
          freq={freq}
          tempo={tempo}
          isEnabled={isEnabled}
          globalAllowRun={globalAllowRun}
          mode={mode}
          modeRange={modeRange}
          note={note}
          handleData={ handleData }
        />

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
              availableChannels={availableChannels}
              outputChannel={outputChannel}
              setOutputChannel={setOutputChannel}
            />

            <SelectTempoRange 
              tempo={tempo}
              setTempo={setTempo}
            />
          </div>

          <div className="button-enable">
            <svg 
              onClick={ handleEnableClick }>
              <circle 
                className= { isEnabled ? 'enabled' : ''}
                cx="15"
                cy="15"
                r="15"
              />
            </svg>
            <div
              onClick={() => handleResetNotes()}>
              reset</div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SinewaveContainer

