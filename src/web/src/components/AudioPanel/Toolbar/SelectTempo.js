import { useSelector, useDispatch } from 'react-redux'
import { setTempo } from '../../../redux/actions';


const SelectTempoRange = () => {
  let tempo = useSelector(state => state.tempo)
  const dispatch = useDispatch();

  return (
    <div className="custom-range tempo-range">
      <label htmlFor="range-tempo">Tempo</label>
      <input 
        name="range-tempo"
        type="range"
        min="1"
        max="480"
        value={tempo}
        step="1"
        onChange={ (e) => dispatch(setTempo({tempo: e.target.value})) }
        list="steplist"
      />
      <datalist id="steplist">
        <option>60</option>
        <option>120</option>
        <option>240</option>
      </datalist>
      <div className="range-label">
        { tempo } BPM
      </div>
    </div>
  )
}
  
export default SelectTempoRange;
  