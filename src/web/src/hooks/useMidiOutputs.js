import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setFlashMessage, setShowFlashMessage } from '../redux/actions';

const useMidiOutputs = () => {
  const [outputs, setOutputs] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    if ('requestMIDIAccess' in navigator) {
      navigator.requestMIDIAccess()
        .then(midi => {
          const handleStateChange = (e) => {
            setOutputs([...midi.outputs.values()])
          }
          
          midi.addEventListener('statechange', handleStateChange);
          
          setOutputs([...midi.outputs.values()])
        },
      (err) => console.log('Something went wrong', err));
    } else {
      dispatch(setFlashMessage({message: `
        Hey! It looks like your browser doesn't 
        support webMIDI. Try this app in Chrome or Edge 
        on the desktop to be able to output MIDI data to your favorite software or hardware.`}))

      dispatch(setShowFlashMessage(true));
    }
  // eslint-disable-next-line
  }, [])
  
  return outputs
}

export default useMidiOutputs
