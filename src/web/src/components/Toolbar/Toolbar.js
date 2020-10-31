import React from 'react'

import './Toolbar.scss'


const Toolbar = ({outputId, setOutputId, availableOutputs, globalSpeed, setGlobalSpeed, setGlobalAllowRun, globalAllowRun }) => {
  let defaultId = "no-device"

  if (availableOutputs.length > 0 && !outputId) {
    defaultId = availableOutputs[0].id
  }

  return (
    <div className="toolbar">
      <select 
        name="midi-output"
        value={ outputId ? outputId : defaultId }
        onChange={ (e) => setOutputId(e.target.value) }>

        { availableOutputs.length > 0
          ? availableOutputs.map(output => (
            <option 
              value={ output.id }
              key={output.id}>
                { output.name }
            </option>))
          : <option
              value="no-device">
                No Midi Device Available
            </option>
        }
      </select>

      <input 
        type="range"
        min=".0001"
        max=".001"
        step=".00001"
        value={ globalSpeed }
        onChange={ (e) => setGlobalSpeed(e.target.value) } />

      <div
        onClick={ () => setGlobalAllowRun(!globalAllowRun)}>
        
        GLOBAL RUN</div>
    </div>
  )
}


export default Toolbar

