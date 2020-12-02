import { useSelector } from 'react-redux';

import SelectMode from './SelectMode';
import SelectRange from './SelectRange';
import SelectNote from './SelectNote';
import SelectCC from './SelectCC';
import SelectChannel from './SelectChannel';
import ButtonEnable from './ButtonEnable';

import './Controls.scss';

const Controls = ({id}) => {
  // const prevEnableRef = useRef(true);

  const modes = useSelector(state => state.modes)


  // const handleEnableClick = () => {
  //   prevEnableRef.current = !prevEnableRef.current
  //   props.setEnabled(prevEnableRef.current)
  // }

  let SecondarySelect;

  if (modes[id] == 'NOTE_ON') {
    SecondarySelect = <SelectNote id={id} />;
  } else if (modes[id] == 'CC') {
    SecondarySelect = <SelectCC id={id} />;
  }

  return (
      <div className="controls-container">
        <div className="mode-container">
          <SelectMode id={id} />
          { SecondarySelect }
          <SelectRange id={id}/>
        </div>
        <div className="output-container">
          <ButtonEnable id={id} />
          <SelectChannel id={id} />
        </div>
      </div>

   

      //   {/* <div className="button-collapse"
      //     onClick={ () => props.setCollapsed(!props.collapsed) }>
      //     <svg viewBox="0 0 30 50">
      //       <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      //         <g fill="#000000">
      //           <path d="M5.22428571,25.0010732 L29.3556494,3.57190657 C30.1980519,2.75498737 30.1980519,1.42960859 29.3556494,0.612689394 C28.5132468,-0.204229798 27.1457143,-0.204229798 26.3033117,0.612689394 L0.624350649,23.4151515 C0.174220779,23.8506944 -0.0165584416,24.4300505 0.0134415584,24.9989268 C-0.0165584416,25.5699495 0.174220779,26.1471591 0.624350649,26.5827652 L26.3033117,49.3851641 C27.1457143,50.2020833 28.5132468,50.2020833 29.3556494,49.3851641 C30.1980519,48.5683081 30.1980519,47.2428662 29.3556494,46.4260101 L5.22428571,25.0010732 Z" id="Path"></path>
      //         </g>
      //       </g>
      //     </svg>
      //   </div>

      // </div>
  );
}

export default Controls;
