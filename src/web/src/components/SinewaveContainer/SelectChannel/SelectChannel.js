
const SelectChannel = ({availableChannels, outputChannel, setOutputChannel}) => {
// if (availableOutputs.length > 0 && !outputId) {
//   defaultId = availableOutputs[0].id
// }

// TODO only show non selected channels

return (
  <div className="custom-select ">
    <label htmlFor="channel-output">channel</label>
    <select 
        name="channel-output"
        value={ outputChannel ? outputChannel : "no-channel" }
        onChange={ (e) => setOutputChannel(e.target.value) }>

        { availableChannels.length > 0
          ? availableChannels.map((channel, index) => (
            <option 
            value={index}
            key={index}>
                { index }
            </option>))
          : <option
          value="no-channel">
                No Channels Available
            </option>
        }
      </select>
    </div>
  )
}

  export default SelectChannel;
