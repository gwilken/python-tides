import { useSelector, useDispatch } from 'react-redux';
import { setShowFlashMessage } from '../../redux/actions';

import './FlashMessage.scss';

const FlashMessage = () => {
  const showMessage = useSelector(state => state.showFlashMessage);
  const message = useSelector(state => state.flashMessage);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={`flash-message-container ${showMessage ? "" : "hidden"}`}>
        <div className="message">{message}</div>
        <div
          className="close-button"
          onClick={() => dispatch(setShowFlashMessage(false))}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M15 9L9 15"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9 9L15 15"
              stroke="#000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FlashMessage;

