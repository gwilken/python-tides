import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import patterns from '../../../constants/beat-patterns';

const SelectBeatPattern = ({id}) => {
  let [value, setValue] = useState(2);
  let dispatch = useDispatch();

  function handleSelection(index) {
    dispatch(setBeatSelections({id, beats: patterns[index].pattern} ));
    setValue(index)
  }

  return (
    <div className="custom-select pattern-select">
      <label htmlFor="beat-select">Pattern</label>
      <select 
        name="beat-select"
        value={ value }
        onChange={ (e) => handleSelection(e.target.value) }>

        { patterns.map((pattern, index) => (
          <option 
            value={ index }
            key={ index }>
                { pattern.label }
          </option>))
        }
      </select>
    </div>
  )
}

export default SelectBeatPattern;
