import {useState} from 'react';

import useMidiOutputs from '../../hooks/useMidiOutputs'
import SinewaveContainer from '../SinewaveContainer/SinewaveContainer';
import Toolbar from '../Toolbar/Toolbar'
import StationLabel from '../StationLabel/StationLabel'


const SinePanel = ({harmonics}) => {
  const availableOutputs = useMidiOutputs([])
  const [globalSpeed, setGlobalSpeed] = useState(.25)
  const [globalRun, setGlobalRun] = useState(true)
  const [channels, setChannels] = useState(new Array(16).fill(0))
  const [instanceKey, setInstanceKey] = useState(0);


  return (
    <div className="sine-panel">
      <Toolbar
        globalSpeed={ globalSpeed }
        setGlobalSpeed={ setGlobalSpeed }
        globalRun={ globalRun }
        setGlobalRun={ setGlobalRun }
        instanceKey={ instanceKey }
        setInstanceKey={ setInstanceKey }
      />

      <StationLabel />

      <div className="sines-container">

        { harmonics && harmonics['HarmonicConstituents'] && 
            harmonics['HarmonicConstituents'].slice(0, 8).map((entry, index) => (
              <SinewaveContainer
                number={entry['number']}
                name={entry['name']}
                description={entry['description']}
                amp={entry['amplitude']}
                phase={entry['phase_local']}
                freq={entry['speed']}
                availableOutputs={ availableOutputs }
                channels={ channels }
                setChannels={ setChannels }
                globalRun={ globalRun }
                globalSpeed={ globalSpeed }
                key={ index + instanceKey }
              />
            ))

        }

{/*    
        <SinewaveContainer
          number="2" 
          name="M2"
          description="Principal lunar semidiurnal constituent"
          amp="1"
          phase="1"
          freq="13"
          availableOutputs={ availableOutputs }
          channels={ channels }
          setChannels={ setChannels }
          globalRun={ globalRun }
          globalSpeed={ globalSpeed }
          key={ '2' + instanceKey }
        /> */}
   
      </div>
    </div>
  )
}

export default SinePanel

