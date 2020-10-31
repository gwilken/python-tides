
import { useState, useEffect } from 'react';


const useMidi = () => {
  console.log('useMidi called.')

  const [connections, setConnections] = useState({
    inputs: [], 
    outputs: []
  })

  useEffect(() => {
    navigator.requestMIDIAccess()
      .then(midi => {
        let inputs;
        let outputs;

        const handleStateChange = () => {  
          console.log('state change')
          inputs = [...midi.inputs.values()]
          outputs = [...midi.outputs.values()]

          setConnections({
            inputs,
            outputs
          })
        }

        midi.addEventListener('statechange', (e) => handleStateChange);

        handleStateChange()
      },
        (err) => console.log('Something went wrong', err));
  }, [])
  
  return { 
    inputs: connections.inputs, 
    outputs: connections.outputs
  }
}

export default useMidi
