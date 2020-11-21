

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


export const setTempo = tempo => ({
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


export const toggleGlobalRunning = toggle => ({
  type: 'run/enabled',
  payload: {
    toggle
  }
}) 


export const toggleRunning = ({id, toggle}) => ({
  type: 'run/enabled',
  payload: {
    id,
    toggle
  }
}) 


export const setSelectedStation = data => ({
  type: 'station/set',
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


