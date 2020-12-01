import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBeatSelections } from '../../../redux/actions';
// import { isEqual } from 'lodash-es';

const SelectBeatPattern = ({id}) => {
  let [value, setValue] = useState();
  let beatSelections = useSelector(state => state.beatSelections[id]);
  let dispatch = useDispatch();

  const patterns = [
    {
      label: 'every 4th',
      pattern: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
    },
    {
      label: 'every 16th',
      pattern: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  ]


  // useEffect(() => {
  //   let patternIndex = patterns.findIndex(elem => {
  //     console.log(isEqual(elem.pattern, beatSelections))
  //     return isEqual(elem.pattern, beatSelections)
  //   })

  // }, [beatSelections])


  // setValue(patternIndex);


  function handleSelection(index) {
    if (index == 'user') {
      setValue('user')
    } else {
      dispatch(setBeatSelections({id, beats: patterns[index].pattern} ));
      setValue(index);
    }

    // let patternIndex = patterns.findIndex(elem => {
    //   console.log(isEqual(elem.pattern, beatSelections))
    //   return isEqual(elem.pattern, beatSelections)
    // })

  }


  return (
    <div className="custom-select pattern-select">
      <label htmlFor="beat-select">pattern</label>
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

        <option
          value="user">
            user defined
        </option>
      </select>
    </div>
  )
}

export default SelectBeatPattern;
