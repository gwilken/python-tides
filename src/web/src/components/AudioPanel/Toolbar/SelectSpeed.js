import { useSelector, useDispatch } from 'react-redux'
import { setSpeed } from '../../../redux/actions';


const SelectSpeed = () => {
  let speed = useSelector(state => state.speed)
  const dispatch = useDispatch();

  return (
    <div className="global-speed custom-range">
      <label htmlFor="global-speed">Speed</label>
      <input 
        name="global-speed"
        type="range"
        min="1"
        max="990"
        step="1"
        value={ speed }
        onChange={ (e) => dispatch(setSpeed(e.target.value)) } />
    </div>
  )
}
  
export default SelectSpeed;
  