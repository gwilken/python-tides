// import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChannel } from '../../../../../redux/actions';



const SelectChannel = ({ id }) => {
  const dispatch = useDispatch();

  const selectedChannels = useSelector(state => state.selectedChannels)
  
  function createOptions() {
    return [...new Array(16)].map((val, index) => (
      <option
        // disabled={ (inUseStatus) }
        value={index}
        key={index}>
          {index + 1}
      </option>))
  }

  console.log('selectedChannels[id]', selectedChannels[id] )
 
  return (
    <div className="custom-select ">
      <label htmlFor="channel-output">channel</label>
      <select 
          name="channel-output"
          value={ selectedChannels[id] }
          onChange={ (e) => dispatch(setChannel( {id, channel: e.target.value} )) }>
          {
            createOptions()
          }
        </select>
      </div>
    )
}

  export default SelectChannel;
