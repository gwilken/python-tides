import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNoteLength } from '../../../redux/actions';
import lengths from '../../../constants/note-lengths';

const SelectNoteLength = ({id}) => {
  let [value, setValue] = useState(0.25);
  let dispatch = useDispatch();

  function handleSelection(val) {
    dispatch(setNoteLength({id, length: parseFloat(val)} ));
    setValue(val)
  }

  return (
    <div className="custom-select pattern-select">
      <label htmlFor="note-length-select">Note Length</label>
      <select 
        name="note-length-select"
        value={ value }
        onChange={ (e) => handleSelection(e.target.value) }>

        { lengths.map((length, index) => (
          <option 
            value={ length.value }
            key={ index }>
                { length.label }
          </option>))
        }
      </select>
    </div>
  )
}

export default SelectNoteLength;
