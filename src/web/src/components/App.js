import './App.scss';

import { useDispatch } from 'react-redux';
import { setWindowSize } from '../redux/actions';
import { setVisibilityState } from '../redux/actions';

import StationSelect from './StationSelect/StationSelect';

import AudioPanel from './AudioPanel/AudioPanel';
import { debounce } from './../scripts/utils';

// import testData from './test-data';

function App() {
  const dispatch = useDispatch();

  window.addEventListener('resize', debounce(() => {
    dispatch(setWindowSize({
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }));
  }))

  document.addEventListener('visibilitychange', () => {
    dispatch(setVisibilityState({visibilityState: document.visibilityState}))
  })

  return (
    <div className="fullscreen-container">
      <StationSelect />
      <AudioPanel />  
    </div>
  );
}

export default App;
