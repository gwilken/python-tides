
const SelectModeRange = ({mode, modeRange, setModeRange}) => {
  return (
      <div className="custom-range select-mode-range">
        <label htmlFor="range-mode">range</label>
        <input 
          name="range-mode"
          type="range"
          min="1"
          // max="255"
          max="127"
          value={modeRange}
          step="1"
          onChange={(e) => setModeRange(e.target.value)}
        />
      </div>
    )
  }
  
export default SelectModeRange;
  