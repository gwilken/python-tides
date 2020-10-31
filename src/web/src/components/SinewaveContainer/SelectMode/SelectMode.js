import {  
  NOTE_OFF,
  NOTE_ON,
  AFTERTOUCH,
  CC,
  PATCH_CHANGE,
  CHANNEL_PRESSURE,
  PITCH_BEND } from '../../../constants/midi-constants'

const modes =[{
    name: 'Note On',
    value: NOTE_ON
  },
  {
    name: 'Control Channel',
    value: CC
  }
]


const SelectMode = ({mode, setMode}) => (
  <div>
    <select
      name="mode-select"
      value={ mode }
      onChange={ (e) => setMode(e.target.value) }>
      
      {
        modes.map(({value, name}) => (
          <option 
            value={ value }
            key={ value }>
              { name }
          </option>)
        )
      }

    </select>
  </div>
)


export default SelectMode
