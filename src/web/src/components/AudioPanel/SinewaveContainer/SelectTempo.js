import { useSelector, useDispatch } from 'react-redux';
import { setTempo } from '../../../redux/actions';

const SelectTempo = ({id}) => {
  const dispatch = useDispatch();
  const tempos = useSelector(state => state.tempos)

  return (
      <div className="custom-range select-tempo-range">
        <label htmlFor="range-mode">Tempo</label>
        <input 
          name="range-tempo"
          type="range"
          min="1"
          max="480"
          value={ tempos[id] }
          step="1"
          onChange={ (e) => dispatch(setTempo({id, tempo: e.target.value})) }
        />
        <div className="tempo-display">
          { tempos[id] }
        </div>
      </div>
    )
  }
  
export default SelectTempo;
  