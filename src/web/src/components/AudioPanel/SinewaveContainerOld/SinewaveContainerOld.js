
// import { useState, useEffect, useRef } from 'react';

// import SineCanvas from './SineCanvas/SineCanvas';
import SineCanvas from './SineCanvas/SineCanvas';
import Controls from './Controls/Controls';

import './SinewaveContainer.scss';


const SinewaveContainer = (props) => {
  return (
    <div>
      <SineCanvas {...props} />
      <Controls props={props} />
    </div>
  );
}

export default SinewaveContainer

