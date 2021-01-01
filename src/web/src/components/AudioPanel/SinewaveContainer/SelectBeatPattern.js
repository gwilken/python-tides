import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import patterns from '../../../constants/beat-patterns';

const SelectBeatPattern = ({id}) => {
  let [value, setValue] = useState();
  let dispatch = useDispatch();

  function handleSelection(index) {
    let pattern = [...patterns[index].pattern];
    dispatch(setBeatSelections({id, beats: pattern} ));
    setValue(index)
  }

  return (
    <div className="custom-select pattern-select">
      {/* <label htmlFor="beat-select">Pattern</label> */}
      <select 
        className="beat-select"
        value={ value }
        onChange={ (e) => handleSelection(e.target.value) }>

        <option selected="true" disabled="disabled">pattern</option>

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
