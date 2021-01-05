import {ReactComponent as Sum} from './images/sum.svg';
import {ReactComponent as Wave0} from './images/wave-0.svg';
import {ReactComponent as Wave1} from './images/wave-1.svg';
import {ReactComponent as Wave2} from './images/wave-2.svg';
import {ReactComponent as Wave3} from './images/wave-3.svg';
import {ReactComponent as Wave4} from './images/wave-4.svg';
import {ReactComponent as Wave5} from './images/wave-5.svg';
import {ReactComponent as Wave6} from './images/wave-6.svg';
import {ReactComponent as Wave7} from './images/wave-7.svg';


const InfoModal = ({handleClick}) => {
  return (
    <div className="info-modal-container">
      <div className="info-modal">
        <div 
          className="back-button"
          onClick={() => handleClick() }>  
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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

        <h2>So, What is this?</h2>
        <p>This web app maps tidal harmonics to MIDI values to facilitate the creation of unique and interesting musical compositions.
            It provides a number of simple tools to help shape the output: global tempo control, a simple step sequencer, 
            the ability to center and control the range of values around a particular note. It also allows you to output to individual MIDI channels
            and the ability to send note data or control channel data. You can send data to other software on the host through an internal MIDI bus
            like Logic Pro X and Pro Tools, or output to an external device like a Euro Rack modular system.</p>

        <h2>What are Tidal Harmonics?</h2>
        <p>Tides are created by the gravitational forces of the Moon and Sun, acting upon the waters of the Earth. Those gravitational forces change 
            as the relative positions of the Earth, Sun, and Moon change. Each of these motions or “constituents” can be described mathmatically as a cosine curve.</p>
        
        <div className="animation-container">
          <Sum className="wave-sum" />
          <Wave0 className="wave wave-0" />
          <Wave1 className="wave wave-1" />
          <Wave2 className="wave wave-2" />
          <Wave3 className="wave wave-3" />
          <Wave4 className="wave wave-4" />
          <Wave5 className="wave wave-5" />
          <Wave6 className="wave wave-6" />
          <Wave7 className="wave wave-7" /> 
        </div>
      </div>
    </div>
  )
}

export default InfoModal;
