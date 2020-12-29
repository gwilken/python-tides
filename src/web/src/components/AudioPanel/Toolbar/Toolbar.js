

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
      <SelectSpeed />
      <SelectTempo />
      <SelectDevice />
      <ButtonRun />
    </div>
  )
}


export default Toolbar

