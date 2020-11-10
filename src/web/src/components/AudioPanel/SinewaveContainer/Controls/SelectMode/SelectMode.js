import { MODES } from '../../../../../constants/midi-modes'

const SelectMode = ({mode, setMode}) => (
  <div className="custom-select ">
    <label htmlFor="mode-select">mode</label>
    <select
      name="mode-select"
      value={ mode }
      onChange={ (e) => setMode(e.target.value) }>
      {
        MODES.map(({id, displayName}) => (
          <option 
            value={ id }
            key={ id }>
              { displayName }
          </option>)
        )
      }
    </select>
  </div>
)

export default SelectMode
