
const SelectTempoRange = ({tempo, setTempo}) => {
  return (
    <div className="custom-range">
      <label htmlFor="range-tempo">tempo</label>
      <input 
        name="range-tempo"
        type="range"
        min="1"
        max="720"
        value={tempo}
        step="1"
        onChange={(e) => setTempo(e.target.value)}
      />
    </div>
  )
}
  
export default SelectTempoRange;
  