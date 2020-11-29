
const initialState = {
  selectedStation: null,
  harmonics: [],
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
  tempos: [...new Array(8)].map(elem => 120)
};


export default function(state = initialState, action) {
  switch (action.type) {
    case 'tempo/set':
      let newTempos = state.tempos;
      newTempos[action.payload.id] = action.payload.tempo;
      return {
        ...state,
        tempos: [...newTempos]
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
  

    default:
      return state;
  }
}
