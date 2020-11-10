
import './Toolbar.scss'

// TODO:
// label, global stop/start, global collapse, global speed, midi reset, resync


const Toolbar = ({ 
  globalSpeed, 
  setGlobalSpeed, 
  setGlobalRun, 
  globalRun,
  globalCollapse, 
  setGlobalCollapse, 
  instanceKey, 
  setInstanceKey }) => {

  
  return (
    <div className="toolbar">
  
      <div onClick={ () => setInstanceKey(instanceKey + 1)}>reset</div>

      <div className="global-range custom-range">
        <label htmlFor="global-speed">global speed</label>
        <input 
          name="global-speed"
          type="range"
          min=".1"
          max="1"
          step=".01"
          value={ globalSpeed }
          onChange={ (e) => setGlobalSpeed(e.target.value) } />
      </div>

    
      
      <div onClick={ () => setGlobalRun(!globalRun)}>
        { globalRun ? 'all stop' : 'run' }
      </div>
    

    </div>
  )
}


export default Toolbar

