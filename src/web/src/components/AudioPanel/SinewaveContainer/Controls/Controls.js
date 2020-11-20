import { useRef } from 'react';

import SelectMode from './SelectMode/SelectMode';
import SelectModeRange from './SelectModeRange/SelectModeRange'
import SelectNote from './SelectNote/SelectNote'
import SelectCC from './SelectCC/SelectCC'
import SelectChannel from './SelectChannel/SelectChannel';

import './Controls.scss';

const Controls = (props) => {
  const prevEnableRef = useRef(true);

  const handleEnableClick = () => {
    prevEnableRef.current = !prevEnableRef.current
    props.setEnabled(prevEnableRef.current)
  }

  let SecondarySelect;

  if (props.mode == 'NOTE_ON') {
    SecondarySelect =
      <SelectNote 
        mode={props.mode}
        note={props.note}
        setNote={props.setNote}
      />;
  } else if (props.mode == 'CC') {
    SecondarySelect = 
      <SelectCC 
        ccParameter={props.ccParameter}
        setCC={props.setCC}
      />;
  }

  return (

      <div className="body-container">

        <div className="controls-container">
          <div className="mode-container">
            <SelectMode 
              mode={props.mode}
              setMode={props.setMode}
            />

            { SecondarySelect }

            <SelectModeRange 
              mode={props.mode}
              modeRange={props.modeRange}
              setModeRange={props.setModeRange}
            />
          </div>
          

          <div className="output-container">

            <SelectChannel id={props.id} />


          </div>
        </div>

        <div className="side-controls-container">
          <div className="button-enable">
            <svg 
              onClick={ handleEnableClick }>
              <circle 
                className= { props.isEnabled && props.globalRun ? 'enabled' : ''}
                cx="15"
                cy="15"
                r="15"
              />

              { props.collapsed &&
                <text x="50%" y="50%" textAnchor="middle" fill="white" dy=".3em">
                  { parseInt(props.outputChannel) + 1 }
                </text>
              }
            </svg>
          </div>

          <div className="button-collapse"
            onClick={ () => props.setCollapsed(!props.collapsed) }>
            <svg viewBox="0 0 30 50">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g fill="#000000">
                  <path d="M5.22428571,25.0010732 L29.3556494,3.57190657 C30.1980519,2.75498737 30.1980519,1.42960859 29.3556494,0.612689394 C28.5132468,-0.204229798 27.1457143,-0.204229798 26.3033117,0.612689394 L0.624350649,23.4151515 C0.174220779,23.8506944 -0.0165584416,24.4300505 0.0134415584,24.9989268 C-0.0165584416,25.5699495 0.174220779,26.1471591 0.624350649,26.5827652 L26.3033117,49.3851641 C27.1457143,50.2020833 28.5132468,50.2020833 29.3556494,49.3851641 C30.1980519,48.5683081 30.1980519,47.2428662 29.3556494,46.4260101 L5.22428571,25.0010732 Z" id="Path"></path>
                </g>
              </g>
            </svg>
          </div>

        </div>

      </div>

  );
}

export default Controls;
