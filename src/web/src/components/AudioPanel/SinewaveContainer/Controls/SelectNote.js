import { useSelector, useDispatch } from 'react-redux';
import { setCenterNote } from '../../../../redux/actions';

import MIDI_NOTES from '../../../../constants/midi-notes'

const SelectNote = ({id}) => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);
  
  return (
    <div className="custom-select  select-note">
      <label htmlFor="select-note">Center</label>
      <select 
          name="select-note"
          value={ notes[id] }
          onChange={ (e) => dispatch(setCenterNote({id, note: e.target.value})) }>
          
          { MIDI_NOTES.map(item => (
            <option 
              value={item['midi']}
              key={item['midi']}>
                {item['midi']} (midi) --- {item['piano']} (piano) --- {item['name']} (english)
            </option>))
          }
        </select>
      </div>
    )
  }
  
export default SelectNote;
  