import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { setRunAllow } from '../../redux/actions';

import InfoModal from './InfoModal';
import HowToModal from './HowToModal';

import './InfoBar.scss';


const InfoBar = () => {
  const [showInfo, toggleShowInfo] = useState(false);
  const [showHowTo, toggleShowHowTo] = useState(false);

  function handleShowClick() {
    toggleShowInfo(!showInfo);
  }

  function handleHowClick() {
    toggleShowHowTo(!showHowTo);
  }

  return (
    <div className="info-bar-container">
      { showInfo && 
        <div>
          <InfoModal handleClick={ handleShowClick } />
        </div>
      }
  
      { showHowTo && 
        <div>
          <HowToModal handleClick={ handleHowClick } />
        </div>
      }

      <div>
        <a target="_blank" rel='noopener noreferrer' href="https://github.com/gwilken/tidal">GitHub</a>
      </div>

      <div className="info-button"
        onClick={ () => handleShowClick() }>
          What is this?
      </div>

      <div className="howto-button"
        onClick={ () => handleHowClick() }>
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
