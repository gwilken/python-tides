import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDevice } from '../../../redux/actions';


const SelectDevice = () => {
  const availableOutputs = useSelector(state => state.availableDevices)
  const selectedDevice = useSelector(state => state.selectedDevice)

  const dispatch = useDispatch()

  return (
    <div className="custom-select ">
      <label htmlFor="midi-ouput">device</label>
      <select 
        name="midi-output"
        value={ selectedDevice ? availableOutputs[selectedDevice].id : "" }
        onChange={ (e) => dispatch(setSelectedDevice(e.target.value)) }>

        { availableOutputs && availableOutputs.map((output, index) => (
          <option 
            value={ index }
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
