import { useSelector, useDispatch } from 'react-redux';
import { setChannel } from '../../../../redux/actions';


const SelectChannel = ({ id }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels)
  
  function createOptions() {
    return [...new Array(16)].map((val, index) => (
      <option
        // disabled={ (inUseStatus) }
        value={index}
        key={index}>
          {index + 1}
      </option>))
  }

 
  return (
    <div className="custom-select channel-select">
      <label htmlFor="channel-output">channel</label>
      <select 
        name="channel-output"
        value={ channels[id] }
        onChange={ (e) => dispatch(setChannel( {id, channel: parseInt(e.target.value)} )) }>
        {
          createOptions()
        }
      </select>
    </div>
  )
}

export default SelectChannel;
