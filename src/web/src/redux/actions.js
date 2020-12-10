

export const setWindowSize = ({size}) => ({
  type: 'window/set',
  payload: {
    size
  }
})


export const setVisibilityState = ({visibilityState}) => ({
  type: 'visible/set',
  payload: {
    visibilityState
  }
})


export const setCollapsed = ({collapsed}) => ({
  type: 'collapsed/set',
  payload: {
    collapsed
  }
})


export const setStations = data => ({
  type: 'stations/set',
  payload: {
    data
  }
})


export const setHarmonics = data => ({
  type: 'harmonics/set',
  payload: {
    data
  }
})


export const setChannel = ({id, channel}) => ({
  type: 'channel/set',
  payload: {
    id,
    channel
  }
})


export const setMode = ({id, mode}) => ({
  type: 'mode/set',
  payload: {
    id,
    mode
  }
})


export const setCenterNote = ({id, note}) => ({
  type: 'note/set',
  payload: {
    id,
    note
  }
})


export const setRange = ({id, range}) => ({
  type: 'range/set',
  payload: {
    id,
    range
  }
}) 


export const setParameter = ({id, parameter}) => ({
  type: 'parameter/set',
  payload: {
    id,
    parameter
  }
})


// export const setTempo = ({id, tempo}) => ({
//   type: 'tempo/set',
//   payload: {
//     id,
//     tempo
//   }
// })


export const setTempo = ({tempo}) => ({
  type: 'tempo/set',
  payload: {
    tempo
  }
})


export const setSpeed = speed => ({
  type: 'speed/set',
  payload: {
    speed
  }
})


export const setAvailableDevices = devices => ({
  type: 'devices/available',
  payload: {
    devices
  }
})


export const setSelectedDevice = id => ({
  type: 'devices/selected',
  payload: {
    id
  }
})


// export const toggleGlobalRunning = toggle => ({
//   type: 'run/enabled',
//   payload: {
//     toggle
//   }
// }) 


export const setEnabled = ({id, enabled}) => ({
  type: 'enabled/set',
  payload: {
    id,
    enabled
  }
}) 


export const setSelectedStation = data => ({
  type: 'station/set',
  payload: {
    data
  }
})


export const setValue = ({id, value}) => ({
  type: 'value/set',
  payload: {
    id,
    value
  }
}) 


export const setCurrentBeat = ({id, beat}) => ({
  type: 'currentbeat/set',
  payload: {
    id,
    beat
  }
}) 


export const setBeatSelections = ({id, beats}) => ({
  type: 'beatSelections/set',
  payload: {
    id,
    beats
  }
}) 

export const setNoteLength = ({id, length}) => ({
  type: 'noteLength/set',
  payload: {
    id,
    length
  }
}) 


