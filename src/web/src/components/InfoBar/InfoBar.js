import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { setRunAllow } from '../../redux/actions';

import InfoModal from './InfoModal';
import HowToModal from './HowToModal';

import './InfoBar.scss';


const InfoBar = () => {
  const [showInfo, toggleShowInfo] = useState(false);
  // let run = useSelector(state => state.run)
  // const dispatch = useDispatch();

  function handleClick() {
    // if (run && !showInfo) {
    //   dispatch( setRunAllow({allowRun: false}) );
    // }
    
    // if (!run && showInfo) {
    //   dispatch( setRunAllow({allowRun: true}) );
    // }
    
    toggleShowInfo(!showInfo);
  }

  return (
    <div className="info-bar-container">
      { showInfo && 
        <div>
          {/* <InfoModal handleClick={handleClick} /> */}
          <HowToModal handleClick={handleClick} />
        </div>
      }

      <div>
        <a target="_blank" rel='noopener noreferrer' href="https://github.com/gwilken/tidal">GitHub</a>
      </div>

      <div className="info-button"
        onClick={ () => handleClick() }>
          What is this?
      </div>

      <div className="howto-button"
        onClick={ () => handleClick() }>
        How would I use this?
      </div>

      <div>
        <a target="_blank" rel='noopener noreferrer' href='https://tidesandcurrents.noaa.gov/about_harmonic_constituents.html'>
          What are Harmonic Constituents? (NOAA)
        </a>
      </div>
    </div>
  )
}

export default InfoBar;
