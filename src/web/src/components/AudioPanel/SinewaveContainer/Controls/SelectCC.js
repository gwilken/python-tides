import { useSelector, useDispatch } from 'react-redux';
import { setParameter } from '../../../../redux/actions';

import CC_LIST from '../../../../constants/midi-cc-list';

const SelectCC = ({id}) => {
  const dispatch = useDispatch();
  const parameters = useSelector(state => state.parameters);
  
  return (
    <div className="custom-select select-mode-parameter">
      <label htmlFor="select-mode-parameter">Parameter</label>
      <select 
          name="select-mode-parameter"
          value={ parameters[id] }
          onChange={ (e) => dispatch(setParameter({id, parameter: e.target.value})) }>

          { CC_LIST.map(item => (
            <option 
              value={item['value']}
              key={item['value']}>
                {item['value']} - {item['name']}
            </option>)) 
          }
        </select>
      </div>
    )
  }
  
export default SelectCC;
  