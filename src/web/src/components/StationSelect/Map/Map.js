import './Map.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setHarmonics, 
  setSelectedStation, 
  setStations,
  setCollapsed } from '../../../redux/actions';
import mapboxgl from 'mapbox-gl';

let initialCenter = {lng: -79.09460554196545, lat: 28.475889863700047}

const mapStateToProps = state => {
  return { 
    collapsed: state.collapsed,
    stations: state.stations
  }
}

class Map extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch('./stations/stations.geojson')
      .then(res => res.json())
      .then(data => {
        this.props.setStations(data);
      })


    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZ3dpbGtlbiIsImEiOiJjanI1ajR6Z2QwMWk1NDRubXYyYmV6OHVkIn0.D68kEgoBzr8IZn8zz40MOQ',
      attributionControl: false,
      logoPosition: 'top-left', 
      container: this.mapContainer,
      style: 'mapbox://styles/gwilken/cjxwljb4b1kt51cl63y6wzr0w',
      center: initialCenter,
      zoom: 6
    });
 
    this.map.on('mousemove', 'markers', this.handleMarkerHover)

    this.map.on('mouseleave', 'markers', this.handleMarkerHoverLeave)

    this.map.on('click', 'markers', this.handleMarkerClick)

    this.map.on('load', () => {
      this.map.addSource('geojson-markers', {
        'type': 'geojson',
        data: this.props.stations
      })
  
      this.map.addLayer({
        id: 'markers',
        source: 'geojson-markers',
        type: 'circle',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            7,
            5
          ],
          'circle-stroke-width': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            3,
            1
          ],
          'circle-stroke-color': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            'rgba(251, 104, 57, 1)',
            'rgba(50, 98, 234, 1)'
          ],
          'circle-color':[
              'case', ['boolean', ['feature-state', 'hover'], false],
              'rgba(251, 104, 57, .6)',
              'rgba(50, 98, 234, .6)'
            ]
          }
        });

        this.map.addLayer({
          id: "marker-labels",
          type: "symbol",
          source: "geojson-markers",
          layout: { 
            "text-size": 14, 
            "text-field": 
              ["case",
                ["to-boolean", ["get","state"]],
                  ["concat", ["get","name"],", ",["get","state"]],
                ["get","name"]
              ],
            "text-anchor": "left",
            "text-offset": [.75, -1] },
          paint: {
              "text-color": "rgba(0, 0, 0, 1)",
              "text-halo-color": "rgb(255,255,255)",
              "text-halo-width":  [
                'case', ['boolean', ['feature-state', 'hover'], false],
                3,
                1
              ]
            }
        })
    })
  }


  handleMarkerClick = (e) => {
    let features = e.target.queryRenderedFeatures(e.point, {
      layers: ['markers']
    })

    if (features && features.length > 0) {
      this.updateHarmonics(features[0])   
    } 
    
    if (!this.props.collapsed) {
      this.props.setCollapsed({collapsed: true});
    }

    this.map.flyTo({
      center: features[0].geometry.coordinates,
      offset: [-40, 10],
      zoom: 11
    });
  }


  updateHarmonics = (station) => {
    // TODO: loading states, error states
    this.props.setSelectedStation(station)

    let { properties } = station;
    let { harcon_id } = properties;
    let url = `/harmonics/${harcon_id}.json`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.props.setHarmonics(data)
      })
      .catch(e => {
        console.log('error fetching harmonics:', e)
      })
  }


  componentDidUpdate(prevProps) {
    if (this.props.collapsed !== prevProps.collapsed) {
      this.map.resize();
    }
  }


  handleMarkerHover = (e) => {
    if (e.features && e.features.length > 0) {
      this.map.getCanvas().style.cursor = 'pointer'

      if ( this.state.hoveredMarkerId) {
        this.map.setFeatureState(
          { source: 'geojson-markers', id: this.state.hoveredMarkerId },
          { hover: false }
        );
      }

      this.setState({ hoveredMarkerId: e.features[0].id })

      this.map.setFeatureState(
        { source: 'geojson-markers', id: this.state.hoveredMarkerId },
        { hover: true }
      );
    } 
  }


  handleMarkerHoverLeave = (e) => {
    this.map.getCanvas().style.cursor = 'grab'

    this.map.setFeatureState(
      { source: 'geojson-markers', id: this.state.hoveredMarkerId },
      { hover: false }
      );
  }


  render() {
    return (
      <div className="map" ref={el => this.mapContainer = el}></div>
    )
  }
}


export default connect(
  mapStateToProps,
  { setHarmonics, 
    setSelectedStation, 
    setStations,
    setCollapsed }
  )
  (Map)
