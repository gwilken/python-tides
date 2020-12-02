import { useSelector, useDispatch } from 'react-redux';
import { setMode } from '../../../../redux/actions';

import { MODES } from '../../../../constants/midi-modes'

const SelectMode = ({id}) => {
  const dispatch = useDispatch();
  const modes = useSelector(state => state.modes)

  return (
    <div className="custom-select ">
      <label htmlFor="mode-select">Output Mode</label>
      <select
        name="mode-select"
        value={ modes[id] }
        onChange={ (e) => dispatch(setMode({id, mode: e.target.value})) }>
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
}

export default SelectMode
