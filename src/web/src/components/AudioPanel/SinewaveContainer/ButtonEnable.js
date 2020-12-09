import { useSelector, useDispatch } from 'react-redux';
import { setEnabled } from '../../../redux/actions';

const ButtonEnable = ({id}) => {
  const dispatch = useDispatch();
  const enables = useSelector(state => state.enables);

  return (
    <div className="button-enable">
      <svg 
        onClick={ () => dispatch(setEnabled({ id, enabled: !enables[id]}))}>
        <circle 
          className= { enables && enables[id] ? 'enabled' : ''}
          cx="15"
          cy="15"
          r="15"
        />
      </svg>
    </div> 
  )
}
  
export default ButtonEnable;
  