import { useSelector, useDispatch } from 'react-redux'
import { setTempo } from '../../../redux/actions';


const SelectTempoRange = () => {
  let tempo = useSelector(state => state.tempo)
  const dispatch = useDispatch();

  return (
    <div className="custom-range">
      <label htmlFor="range-tempo">tempo</label>
      <input 
        name="range-tempo"
        type="range"
        min="1"
        max="720"
        value={tempo}
        step="10"
        onChange={ (e) => dispatch(setTempo({tempo: e.target.value})) }
      />
    </div>
  )
}
  
export default SelectTempoRange;
  