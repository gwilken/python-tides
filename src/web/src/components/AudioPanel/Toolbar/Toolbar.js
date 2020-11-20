
import SelectSpeed from './SelectSpeed/SelectSpeed'
import SelectTempoRange from './SelectTempoRange/SelectTempoRange'
import SelectDevice from './SelectDevice/SelectDevice'

import './Toolbar.scss'

// TODO:
// label, global stop/start, global collapse, global speed, midi reset, resync


const Toolbar = () => {

  return (
    <div className="toolbar">
      <SelectSpeed />
      <SelectTempoRange />
      <SelectDevice />

      {/* <div onClick={ () => setGlobalRun(!globalRun)}>
        { globalRun ? 'all stop' : 'run' }
      </div> */}
    
    </div>
  )
}


export default Toolbar

