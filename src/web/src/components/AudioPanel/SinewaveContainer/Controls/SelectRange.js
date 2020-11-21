import { useSelector, useDispatch } from 'react-redux';
import { setRange } from '../../../../redux/actions';

const SelectRange = ({id}) => {
  const dispatch = useDispatch();
  const ranges = useSelector(state => state.ranges)

  return (
      <div className="custom-range select-mode-range">
        <label htmlFor="range-mode">Spread</label>
        <input 
          name="range-mode"
          type="range"
          min="1"
          max="127"
          value={ ranges[id] }
          step="1"
          onChange={ (e) => dispatch(setRange({id, range: e.target.value})) }
        />
      </div>
    )
  }
  
export default SelectRange;
  