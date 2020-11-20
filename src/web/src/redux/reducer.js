
const initialState = {
  selectedStation: null,
  harmonics: [],
  tempo: 120,
  speed: 500,
  availableDevices: [],
  selectedDevice: null,
  // channels: new Array(16).fill(0),
  selectedChannels: [...new Array(8)].map((val, index) => index),
};


export default function(state = initialState, action) {
  switch (action.type) {
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
      let newChannels = state.selectedChannels;
      newChannels[action.payload.id] = action.payload.channel;
      return {
        ...state,
        selectedChannels: [...newChannels]
      }
  
    default:
      return state;
  }
}
