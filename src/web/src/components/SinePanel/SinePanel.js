import {useState} from 'react';

// import useMidi from '../../hooks/useMidi'
import useMidiOutputs from '../../hooks/useMidiOutputs'
import SinewaveContainer from '../SinewaveContainer/SinewaveContainer';
// import Toolbar from '../Toolbar/Toolbar'
// import { range } from '../../utils/utils';

import './SinePanel.scss'


const SinePanel = () => {
  const availableOutputs = useMidiOutputs([])
  // const [outputId, setOutputId] = useState()
  // const [globalSpeed, setGlobalSpeed] = useState(.0005)
  const [globalAllowRun, setGlobalAllowRun] = useState(true)
  const [availableChannels, channels] = useState(new Array(128).fill(1))

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
          availableChannels={ availableChannels }
          globalAllowRun={ globalAllowRun }
        />

        <SinewaveContainer
          number="1" 
          name="M2"
          description="Principal lunar semidiurnal constituent"
          amp="1"
          phase="180"
          freq="3"
          availableOutputs={ availableOutputs }
          availableChannels={ availableChannels }
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
          availableChannels={ availableChannels }
          globalAllowRun={ globalAllowRun }
        /> */}

      </div>
    </div>
  )
}

export default SinePanel

