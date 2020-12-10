import { useSelector } from 'react-redux';

import SelectMode from './SelectMode';
import SelectRange from './SelectRange';
import SelectNote from './SelectNote';
import SelectCC from './SelectCC';
// import SelectChannel from './SelectChannel';
// import ButtonEnable from './ButtonEnable';

import './Controls.scss';

const Controls = ({id}) => {
  // const prevEnableRef = useRef(true);

  const modes = useSelector(state => state.modes)


  // const handleEnableClick = () => {
  //   prevEnableRef.current = !prevEnableRef.current
  //   props.setEnabled(prevEnableRef.current)
  // }

  let SecondarySelect;

  if (modes[id] === 'NOTE_ON') {
    SecondarySelect = <SelectNote id={id} />;
  } else if (modes[id] === 'CC') {
    SecondarySelect = <SelectCC id={id} />;
  }

  return (
    <div className="controls-container">
      <div className="mode-container">
        <SelectMode id={id} />
        { SecondarySelect }
        <SelectRange id={id}/>
      </div>
    </div>
  );
}

export default Controls;
