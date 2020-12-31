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
    <div className="info-modal">
      <div 
        className="back-button"
        onClick={() => handleClick() }
      >  
        Back
      </div>

      <h2>So, What is this?</h2>
      <p>This web app maps tidal harmonics to MIDI values to facilitate the creation of unique and interesting musical compositions.
          It provides a number of simple tools to help shape the output: global tempo control, a simple step sequencer, 
          the ability to center and control the range of values around a particular note. It also allows you to output to individual MIDI channels
          and the ability to send note data or control channel data. You can send data to other software on the host through an internal MIDI bus
          like Logic Pro X and Pro Tools, or output to an external device like a Euro Rack modular system.</p>

      <h2>What are Tidal Harmonics?</h2>
      <p>very brief intro into harmonics blah blah blah...</p>
      
      <div className="animation-container">
        <Sum className="wave-sum" />
        <Wave0 className="wave-0" />
        <Wave1 className="wave-1" />
        <Wave2 className="wave-2" />
        <Wave3 className="wave-3" />
        <Wave4 className="wave-4" />
        <Wave5 className="wave-5" />
        <Wave6 className="wave-6" />
        <Wave7 className="wave-7" /> 
      </div>
    </div>
  )
}

export default InfoModal;
