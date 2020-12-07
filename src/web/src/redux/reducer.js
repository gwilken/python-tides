
const initialState = {
  windowSize: {width: window.innerWidth, height: window.innerHeight},
  visibilityState: 'visible',
  collapsed: false,
  stations: [],
  harmonics: [],
  selectedStation: null,
  tempo: 120,
  speed: 650,
  availableDevices: [],
  selectedDevice: null,
  channels: [...new Array(8)].map((val, index) => index),
  modes: [...new Array(8)].map(elem => 'NOTE_ON'),
  parameters: [...new Array(8)].map(elem => 0x03),
  ranges: [...new Array(8)].map(elem => 24),
  notes: [...new Array(8)].map(elem => 69),
  values: [...new Array(8)].map(elem => 0),
  currentBeats: [...new Array(8)].map(elem => 0),
  enables: [...new Array(8)].map(elem => true),
  beatSelections: [...new Array(8)].map(elem => [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true])
};


export default function(state = initialState, action) {
  switch (action.type) {
    case 'window/set':
      return {
        ...state,
        windowSize: action.payload.size
      }

    case 'visible/set':
      return {
        ...state,
        visibilityState: action.payload.visibilityState
      }

    case 'collapsed/set':
      return {
        ...state,
        collapsed: action.payload.collapsed
      }

    case 'stations/set':
      return {
        ...state,
        stations: action.payload.data
      }

    case 'station/set':
      return {
        ...state,
        selectedStation: action.payload.data
      }

    case 'harmonics/set':
      return {
        ...state,
        harmonics: action.payload.data
      }

    case 'tempo/set':
      return {
        ...state,
        tempo: action.payload.tempo
      }

    case 'speed/set':
      return {
        ...state,
        speed: action.payload.speed
      }

    case 'devices/available':
      return {
        ...state,
        availableDevices: [...action.payload.devices]
      }

    case 'devices/selected':
      return {
        ...state,
        selectedDevice: action.payload.id
      }

    case 'channel/set':
      let newChannels = state.channels;
      newChannels[action.payload.id] = action.payload.channel;
      return {
        ...state,
        channels: [...newChannels]
      }
 
    case 'mode/set':
      let newModes = state.modes;
      newModes[action.payload.id] = action.payload.mode;
      return {
        ...state,
        modes: [...newModes]
      }
 
    case 'note/set':
      let newNotes = state.notes;
      newNotes[action.payload.id] = action.payload.note;
      return {
        ...state,
        notes: [...newNotes]
      }

    case 'range/set':
      let newRange = state.ranges;
      newRange[action.payload.id] = action.payload.range;
      return {
        ...state,
        ranges: [...newRange]
      }

    case 'parameter/set':
      let newParametes = state.parameters;
      newParametes[action.payload.id] = action.payload.parameter;
      return {
        ...state,
        parameters: [...newParametes]
      }
  
    case 'value/set':
      let newValues = state.values;
      newValues[action.payload.id] = action.payload.value;
      return {
        ...state,
        values: [...newValues]
      }
      
    case 'currentbeat/set':
      let newBeats = state.currentBeats;
      newBeats[action.payload.id] = action.payload.beat;
      return {
        ...state,
        currentBeats: [...newBeats]
      }
  
    case 'enabled/set':
      let newEnables = state.enables;
      newEnables[action.payload.id] = action.payload.enabled;
      return {
        ...state,
        enables: [...newEnables]
      }

    case 'beatSelections/set':
      let newBeatSelections = state.beatSelections;
      newBeatSelections[action.payload.id] = action.payload.beats;
      return {
        ...state,
        beatSelections: [...newBeatSelections]
      }
  

    default:
      return state;
  }
}
