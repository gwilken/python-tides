import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAvailableDevices, setSelectedDevice } from '../../../redux/actions';
import useMidiOutputs from '../../../hooks/useMidiOutputs';


const SelectDevice = () => {
  // const availableDevices = useSelector(state => state.availableDevices)
  const selectedDevice = useSelector(state => state.selectedDevice)
  const availableDevices = useMidiOutputs([]);

  const dispatch = useDispatch();


  useEffect(() => {
    if (availableDevices.length) {
      dispatch(setAvailableDevices(availableDevices));
    }
  }, [availableDevices, dispatch])


  // react if selected output was removed
  useEffect(() => {
    if (availableDevices && availableDevices.length > 0) {
      let ids = availableDevices.map(output => output.id)
      if(ids.indexOf(selectedDevice) === -1) {
        dispatch(setSelectedDevice(''))
      }
    }
  }, [availableDevices, selectedDevice, dispatch])


  return (
    <div className="custom-select ">
      <label htmlFor="midi-output">Midi Output Device</label>
      <select 
        name="midi-output"
        value={ selectedDevice }
        onChange={ (e) => dispatch(setSelectedDevice(e.target.value)) }>

        { availableDevices && availableDevices.map((output, index) => (
          <option 
            value={ output.id }
            key={ output.id }>
                { output.name }
          </option>))
        }

        <option
          value="">
            Not Selected
        </option>
      </select>
    </div>
  )
}

export default SelectDevice;
