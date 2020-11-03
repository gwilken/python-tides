import {useState} from 'react';

// import useMidi from '../../hooks/useMidi'
import useMidiOutputs from '../../hooks/useMidiOutputs'
import SinewaveContainer from '../SinewaveContainer/SinewaveContainer';
// import Toolbar from '../Toolbar/Toolbar'
// import { range } from '../../utils/utils';
// import MIDI_CHANNELS from '../../constants/midi-channels.js'

import './SinePanel.scss'


const SinePanel = () => {
  const availableOutputs = useMidiOutputs([])
  // const [outputId, setOutputId] = useState()
  // const [globalSpeed, setGlobalSpeed] = useState(.0005)
  const [globalAllowRun, setGlobalAllowRun] = useState(true)
  const [channels, setChannels] = useState(new Array(16).fill(0))

  return (
    <div className="sine-panel">
      {/* <Toolbar
        availableOutputs={ outputs } 
        outputId={ outputId }
        setOutputId={ setOutputId }
        globalSpeed={ globalSpeed }
        setGlobalSpeed={ setGlobalSpeed }
        globalAllowRun={ globalAllowRun }
        setGlobalAllowRun={ setGlobalAllowRun }
      /> */}

      <div className="sines-container">
        <SinewaveContainer
          number="1" 
          name="M2"
          description="Principal lunar semidiurnal constituent"
          amp="1"
          phase="0"
          freq="13"
          availableOutputs={ availableOutputs }
          channels={ channels }
          setChannels={ setChannels }
          globalAllowRun={ globalAllowRun }
        />
   
        <SinewaveContainer
          number="1" 
          name="M2"
          description="Principal lunar semidiurnal constituent"
          amp=".75"
          phase="180"
          freq="13"
          availableOutputs={ availableOutputs }
          channels={ channels }
          setChannels={ setChannels }
          globalAllowRun={ globalAllowRun }
        />

        <SinewaveContainer
          number="1" 
          name="M2"
          description="Principal lunar semidiurnal constituent"
          amp=".25"
          phase="180"
          freq="3"
          availableOutputs={ availableOutputs }
          channels={ channels }
          setChannels={ setChannels }
          globalAllowRun={ globalAllowRun }
        />

        {/* <SinewaveContainer
          number="2" 
          name="S1"
          description="Principal Solar semidiurnal constituent"
          amp=".75"
          phase="0"
          freq="5"
          availableOutputs={ availableOutputs }
          channels={ channels }
          setChannels={ setChannels }
          globalAllowRun={ globalAllowRun }
        /> */}

      </div>
    </div>
  )
}

export default SinePanel

