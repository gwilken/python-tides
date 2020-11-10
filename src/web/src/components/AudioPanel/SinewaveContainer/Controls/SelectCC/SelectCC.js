import CC_LIST from '../../../../../constants/midi-cc-list'

const SelectCC = ({ccParameter, setCC}) => {
  return (
    <div className="custom-select select-mode-parameter">
      <label htmlFor="select-mode-parameter">parameter</label>
      <select 
          name="select-mode-parameter"
          value={ ccParameter }
          onChange={ (e) => setCC(e.target.value) }>
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
  