// import { useEffect, useRef } from 'react';

const SelectChannel = ({channels, setChannels, outputChannel, setOutputChannel}) => {
// check if channels is selected elsewhere and disable
// let prevSelection = useRef();

function createOptions() {
  return channels.map((inUseStatus, index) => (
    <option
      disabled={ (inUseStatus) }
      value={index}
      key={index}>
        {index + 1}
    </option>))
}

// useEffect(() => {
//   console.log('channels select rerender')
//   createOptions()
// }, [channels])


function handleSelect(index) {
  // let newChannels = channels;
  // newChannels[index] = true;
  // newChannels[prevSelection.current] = false
  // prevSelection.current = index
  // setChannels([...newChannels]);
  setOutputChannel(index);
}

return (
  <div className="custom-select ">
    <label htmlFor="channel-output">channel</label>
    <select 
        name="channel-output"
        value={ outputChannel }
        onChange={ (e) => handleSelect(e.target.value) }>
        {
          createOptions()
        }
      </select>
    </div>
  )
}

  export default SelectChannel;
