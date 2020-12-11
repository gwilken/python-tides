import { useSelector, useDispatch } from 'react-redux'
import { setRunAllow } from '../../../redux/actions';


const ButtonRun = () => {
  let run = useSelector(state => state.run)
  const dispatch = useDispatch();

  return (
    <div className="button-run">
      <button
        onClick={ () => {dispatch(setRunAllow({allowRun: !run}))}}>
          { run ? 'stop' : 'run' }
      </button>
    </div>
  )
}
  
export default ButtonRun;
  