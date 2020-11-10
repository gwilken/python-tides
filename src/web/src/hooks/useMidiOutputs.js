
import { useState, useEffect } from 'react';


const useMidiOutputs = () => {
  const [outputs, setOutputs] = useState([])

  useEffect(() => {
    navigator.requestMIDIAccess()
      .then(midi => {

        const handleStateChange = (e) => {
          setOutputs([...midi.outputs.values()])
        }
        
        midi.addEventListener('statechange', handleStateChange);
        
        console.log([...midi.outputs.values()])
        setOutputs([...midi.outputs.values()])
      },
        (err) => console.log('Something went wrong', err));
  }, [])
  
  return outputs
}

export default useMidiOutputs
