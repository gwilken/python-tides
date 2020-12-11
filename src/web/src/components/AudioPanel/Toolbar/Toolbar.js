

import ButtonRun from './ButtonRun'
import SelectSpeed from './SelectSpeed'
import SelectDevice from './SelectDevice'
import SelectTempo from './SelectTempo'

import './Toolbar.scss'

// TODO:
// label, global stop/start, global collapse, global speed, midi reset, resync


const Toolbar = () => {

  return (
    <div className="toolbar">
      <ButtonRun />
      <SelectSpeed />
      <SelectTempo />
      <SelectDevice />
      
      {/* <div onClick={ () => setGlobalRun(!globalRun)}>
        { globalRun ? 'all stop' : 'run' }
      </div> */}
    
    </div>
  )
}


export default Toolbar

