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
        max="480"
        value={tempo}
        step="1"
        onChange={ (e) => dispatch(setTempo(e.target.value)) }
      />
    </div>
  )
}
  
export default SelectTempoRange;
  