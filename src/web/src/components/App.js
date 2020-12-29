import './App.scss';

import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { setWindowSize } from '../redux/actions';
import { setVisibilityState } from '../redux/actions';

import InfoBar from './InfoBar/InfoBar';

import { debounce } from './../scripts/utils';


function App() {
  const StationSelect = lazy(() => import(/* webpackChunkName: "station-select" */ './StationSelect/StationSelect'));
  const AudioPanel = lazy(() => import(/* webpackChunkName: "audio-panel-select" */ './AudioPanel/AudioPanel'));

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
      <Suspense fallback={<div>loading...</div>}>
        <StationSelect />
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <AudioPanel />  
      </Suspense>

      <InfoBar />
    </div>
  );
}

console.log(`
888    d8b      888          888                                                
888    Y8P      888          888                                                
888             888          888                                                
888888 888  .d88888  8888b.  888                                                
888    888 d88" 888     "88b 888                                                
888    888 888  888 .d888888 888                                                
Y88b.  888 Y88b 888 888  888 888                                                
 "Y888 888  "Y88888 "Y888888 888  

888                                                       d8b                   
888                                                       Y8P                   
888                                                                             
88888b.   8888b.  888d888 88888b.d88b.   .d88b.  88888b.  888  .d88b.  .d8888b  
888 "88b     "88b 888P"   888 "888 "88b d88""88b 888 "88b 888 d8P  Y8b 88K      
888  888 .d888888 888     888  888  888 888  888 888  888 888 88888888 "Y8888b. 
888  888 888  888 888     888  888  888 Y88..88P 888  888 888 Y8b.          X88 
888  888 "Y888888 888     888  888  888  "Y88P"  888  888 888  "Y8888   88888P' 

gwilken.com/tidal
`)

export default App;
