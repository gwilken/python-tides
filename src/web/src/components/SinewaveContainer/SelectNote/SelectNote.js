import MIDI_NOTES from '../../../constants/midi-notes'
// import CC_LIST from '../../../constants/midi-cc-list'

const SelectNote = ({note, setNote}) => {
  return (
    <div className="custom-select  select-note">
      <label htmlFor="select-note">center</label>
      <select 
          name="select-note"
          value={ note }
          onChange={ (e) => setNote(e.target.value) }>
          
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
  