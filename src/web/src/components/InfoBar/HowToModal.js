import midi00 from './images/mac-midi-00.png';
import midi01 from './images/mac-midi-01.png';
import midi02 from './images/mac-midi-02.png';
import midi03 from './images/mac-midi-03.png';
import midi04 from './images/mac-midi-04.png';

const HowToModal = ({handleClick}) => {
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

        <h2>How Would I Use This?</h2>
        
        <p>On a Mac, to ensure MIDI data can be passed between applications, make sure the IAC driver is enabled.</p>
        
        <h3>Run 'Audio MIDI Setup'</h3>

        <img className="howto-image" src={midi00} />

        {/* <img className="howto-image" src={midi01} /> */}

        <h3>Once opened, click Window in the menu bar and select 'Show MIDI Studio' from the dropdown</h3>

        <img className="howto-image" src={midi02} />

        <h3>Double click the IAC Driver icon, and make sure 'Device is online' is checked</h3>
        
        <img className="howto-image" src={midi03} />

        <h2>Using it with Logic Pro X</h2>

        <h3>In Project Settings, under Recording, enable 'Auto demux by channel...' to make sure you can record each channel separately on it's own track.</h3>
        <img className="howto-image" src={midi04} />

        <p></p>
        
      </div>
    </div>
  )
}

export default HowToModal;
