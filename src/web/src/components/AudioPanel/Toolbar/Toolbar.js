
import SelectSpeed from './SelectSpeed'
import SelectDevice from './SelectDevice'

import './Toolbar.scss'

// TODO:
// label, global stop/start, global collapse, global speed, midi reset, resync


const Toolbar = () => {

  return (
    <div className="toolbar">
      <SelectSpeed />
      <SelectDevice />

      {/* <div onClick={ () => setGlobalRun(!globalRun)}>
        { globalRun ? 'all stop' : 'run' }
      </div> */}
    
    </div>
  )
}


export default Toolbar

