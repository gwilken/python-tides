import './StationSelect.scss';

import Map from './Map/Map';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '../../redux/actions';
import collapse from './collapse.svg';
import expand from './expand2.svg';

const StationSelect = () => {
  const collapsed = useSelector(state => state.collapsed);
  const selectedStation = useSelector(state => state.selectedStation);
  const dispatch = useDispatch();

  let label;
  let location;

  
  if (selectedStation) {
    let { properties, geometry } = selectedStation;
    let { name = '', state = '' } = properties;
    label = (<h1>{name}{state ? `, ${state}` : ''}</h1>)
    location = (<h2>
      <span>{ geometry.coordinates[1] },</span>
      <span>{ geometry.coordinates[0] }</span>
    </h2>)
  }

  return (
    <div className="station-select">
      <div className="station-label">{ label } { location } </div>
      
      <div className={`map-container ${collapsed ? 'collapsed' : ''}`}>
        <div className="collapse-button" onClick={ () => dispatch(setCollapsed({collapsed: !collapsed}))}>
          <img 
            src={collapsed ? expand : collapse} 
            alt="expand and collapse map" />
        
        </div>

        <Map />

      </div>
    </div>
  )
}

export default StationSelect;
