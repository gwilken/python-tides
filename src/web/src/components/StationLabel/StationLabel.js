import './StationLabel.scss';

const StationLabel = ({selectedStation}) => {
  let label;
  
  if (selectedStation) {
    label = (<h1>{selectedStation.name ? selectedStation.name : ''}{selectedStation.state ? ', ' + selectedStation.state : ''}</h1>)
  }

  return (
  <div className="station-label">{ label }</div>
  )
}

export default StationLabel;
