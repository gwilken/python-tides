import { useSelector, useDispatch } from 'react-redux';
import { setShowFlashMessage } from '../../redux/actions';

import './FlashMessage.scss';

const FlashMessage = () => {
  const showMessage = useSelector(state => state.showFlashMessage);
  const message = useSelector(state => state.flashMessage);
  const dispatch = useDispatch();

  return (
    <div>
     
      <div className={`flash-message-container ${showMessage ? '' : 'hidden'}`}>
        <div className="message">
          { message }
        </div>
        <div 
          className="close-button"
          onClick={() => dispatch(setShowFlashMessage(false)) }
        >
          got it
        </div>

      </div>
      
    </div>
  )
}

export default FlashMessage;

