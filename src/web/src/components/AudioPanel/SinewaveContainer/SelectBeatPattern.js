import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
import patterns from '../../../constants/beat-patterns';
// import { isEqual } from 'lodash-es';

const SelectBeatPattern = ({id}) => {
  let [value, setValue] = useState(2);
  let beatSelections = useSelector(state => state.beatSelections[id]);
  let dispatch = useDispatch();

  // useEffect(() => {
  //   let patternIndex = patterns.findIndex(elem => {
  //     console.log(isEqual(elem.pattern, beatSelections))
  //     return isEqual(elem.pattern, beatSelections)
  //   })

  // }, [beatSelections])


  // setValue(patternIndex);


  function handleSelection(index) {
      dispatch(setBeatSelections({id, beats: patterns[index].pattern} ));
      setValue(index)

    // let patternIndex = patterns.findIndex(elem => {
    //   console.log(isEqual(elem.pattern, beatSelections))
    //   return isEqual(elem.pattern, beatSelections)
    // })

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
