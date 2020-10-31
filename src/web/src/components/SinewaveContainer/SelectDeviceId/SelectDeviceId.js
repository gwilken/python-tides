
const SelectDeviceId = ({outputDeviceId, setOutputDeviceId, availableOutputs}) => {
  return (
    <select 
      name="midi-output"
      value={ outputDeviceId ? outputDeviceId.id : "" }
      onChange={ (e) => setOutputDeviceId(e.target.value)}>

      {
        availableOutputs.map(output => (
          <option 
            value={ output.id }
            key={ output.id }>
              { output.name }
          </option>)
        )
      }
        <option
          value="">
            Not Selected
        </option>
    </select>
  )
}

export default SelectDeviceId;
