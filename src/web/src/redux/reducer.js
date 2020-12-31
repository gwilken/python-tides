
const initialState = {
  windowSize: {width: window.innerWidth, height: window.innerHeight},
  visibilityState: 'visible',
  collapsed: true,
  stations: [],
  harmonics: {
    "units": "feet",
    "HarmonicConstituents": [
      {
        "number": 1,
        "name": "M2",
        "description": "Principal lunar semidiurnal constituent",
        "amplitude": 1,
        "phase_GMT": 145.5,
        "phase_local": 273.6,
        "speed": 28.984104
      },
      {
        "number": 2,
        "name": "S2",
        "description": "Principal solar semidiurnal constituent",
        "amplitude": 0.38672438672438675,
        "phase_GMT": 141.1,
        "phase_local": 261.1,
        "speed": 30
      },
      {
        "number": 3,
        "name": "N2",
        "description": "Larger lunar elliptic semidiurnal constituent",
        "amplitude": 0.22438672438672438,
        "phase_GMT": 123.7,
        "phase_local": 256.1,
        "speed": 28.43973
      },
      {
        "number": 4,
        "name": "K1",
        "description": "Lunar diurnal constituent",
        "amplitude": 0.6632996632996633,
        "phase_GMT": 207.7,
        "phase_local": 87.3,
        "speed": 15.041069
      },
      {
        "number": 5,
        "name": "M4",
        "description": "Shallow water overtides of principal lunar constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 57.96821
      },
      {
        "number": 6,
        "name": "O1",
        "description": "Lunar diurnal constituent",
        "amplitude": 0.41678691678691676,
        "phase_GMT": 192.3,
        "phase_local": 80.7,
        "speed": 13.943035
      },
      {
        "number": 7,
        "name": "M6",
        "description": "Shallow water overtides of principal lunar constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 86.95232
      },
      {
        "number": 8,
        "name": "MK3",
        "description": "Shallow water terdiurnal",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 44.025173
      },
      {
        "number": 9,
        "name": "S4",
        "description": "Shallow water overtides of principal solar constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 60
      },
      {
        "number": 10,
        "name": "MN4",
        "description": "Shallow water quarter diurnal constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 57.423832
      },
      {
        "number": 11,
        "name": "NU2",
        "description": "Larger lunar evectional constituent",
        "amplitude": 0.03198653198653199,
        "phase_GMT": 130.2,
        "phase_local": 262,
        "speed": 28.512583
      },
      {
        "number": 12,
        "name": "S6",
        "description": "Shallow water overtides of principal solar constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 90
      },
      {
        "number": 13,
        "name": "MU2",
        "description": "Variational constituent",
        "amplitude": 0.019961519961519958,
        "phase_GMT": 88.1,
        "phase_local": 224.3,
        "speed": 27.968208
      },
      {
        "number": 14,
        "name": "2N2",
        "description": "Lunar elliptical semidiurnal second-order constituent",
        "amplitude": 0.01394901394901395,
        "phase_GMT": 95.1,
        "phase_local": 231.9,
        "speed": 27.895355
      },
      {
        "number": 15,
        "name": "OO1",
        "description": "Lunar diurnal",
        "amplitude": 0.04,
        "phase_GMT": 236.9,
        "phase_local": 107.7,
        "speed": 16.139101
      },
      {
        "number": 16,
        "name": "LAM2",
        "description": "Smaller lunar evectional constituent",
        "amplitude": 0.01,
        "phase_GMT": 166.4,
        "phase_local": 290.7,
        "speed": 29.455626
      },
      {
        "number": 17,
        "name": "S1",
        "description": "Solar diurnal constituent",
        "amplitude": 0.01,
        "phase_GMT": 314.1,
        "phase_local": 194.1,
        "speed": 15
      },
      {
        "number": 18,
        "name": "M1",
        "description": "Smaller lunar elliptic diurnal constituent",
        "amplitude": 0.04,
        "phase_GMT": 222.6,
        "phase_local": 106.6,
        "speed": 14.496694
      },
      {
        "number": 19,
        "name": "J1",
        "description": "Smaller lunar elliptic diurnal constituent",
        "amplitude": 0.07,
        "phase_GMT": 219.1,
        "phase_local": 94.4,
        "speed": 15.5854435
      },
      {
        "number": 20,
        "name": "MM",
        "description": "Lunar monthly constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 0.5443747
      },
      {
        "number": 21,
        "name": "SSA",
        "description": "Solar semiannual constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 0.0821373
      },
      {
        "number": 22,
        "name": "SA",
        "description": "Solar annual constituent",
        "amplitude": 0.22,
        "phase_GMT": 184.4,
        "phase_local": 184,
        "speed": 0.0410686
      },
      {
        "number": 23,
        "name": "MSF",
        "description": "Lunisolar synodic fortnightly constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 1.0158958
      },
      {
        "number": 24,
        "name": "MF",
        "description": "Lunisolar fortnightly constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 1.0980331
      },
      {
        "number": 25,
        "name": "RHO",
        "description": "Larger lunar evectional diurnal constituent",
        "amplitude": 0.03,
        "phase_GMT": 182.1,
        "phase_local": 74.3,
        "speed": 13.471515
      },
      {
        "number": 26,
        "name": "Q1",
        "description": "Larger lunar elliptic diurnal constituent",
        "amplitude": 0.13,
        "phase_GMT": 185,
        "phase_local": 77.8,
        "speed": 13.398661
      },
      {
        "number": 27,
        "name": "T2",
        "description": "Larger solar elliptic constituent",
        "amplitude": 0.04,
        "phase_GMT": 129.7,
        "phase_local": 250,
        "speed": 29.958933
      },
      {
        "number": 28,
        "name": "R2",
        "description": "Smaller solar elliptic constituent",
        "amplitude": 0.01,
        "phase_GMT": 167.5,
        "phase_local": 287.1,
        "speed": 30.041067
      },
      {
        "number": 29,
        "name": "2Q1",
        "description": "Larger elliptic diurnal",
        "amplitude": 0.01,
        "phase_GMT": 186.1,
        "phase_local": 83.2,
        "speed": 12.854286
      },
      {
        "number": 30,
        "name": "P1",
        "description": "Solar diurnal constituent",
        "amplitude": 0.35,
        "phase_GMT": 204.6,
        "phase_local": 84.9,
        "speed": 14.958931
      },
      {
        "number": 31,
        "name": "2SM2",
        "description": "Shallow water semidiurnal constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 31.015896
      },
      {
        "number": 32,
        "name": "M3",
        "description": "Lunar terdiurnal constituent",
        "amplitude": 0.01,
        "phase_GMT": 350.1,
        "phase_local": 2.2,
        "speed": 43.47616
      },
      {
        "number": 33,
        "name": "L2",
        "description": "Smaller lunar elliptic semidiurnal constituent",
        "amplitude": 0.03,
        "phase_GMT": 134.2,
        "phase_local": 257.9,
        "speed": 29.528479
      },
      {
        "number": 34,
        "name": "2MK3",
        "description": "Shallow water terdiurnal constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 42.92714
      },
      {
        "number": 35,
        "name": "K2",
        "description": "Lunisolar semidiurnal constituent",
        "amplitude": 0.2,
        "phase_GMT": 135.5,
        "phase_local": 254.8,
        "speed": 30.082138
      },
      {
        "number": 36,
        "name": "M8",
        "description": "Shallow water eighth diurnal constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 115.93642
      },
      {
        "number": 37,
        "name": "MS4",
        "description": "Shallow water quarter diurnal constituent",
        "amplitude": 0,
        "phase_GMT": 0,
        "phase_local": 0,
        "speed": 58.984104
      }
    ],
    "self": "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9410660/harcon.json"
  },
  selectedStation: {
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.50299835205078,
        33.43169203891274
      ]
    },
    "type": "Feature",
    "properties": {
      "harcon_id": "9410660",
      "id": "9410092",
      "name": "Catalina Harbor, Santa Catalina Island",
      "state": "CA"
    },
    "id": 1750,
    "layer": {
      "id": "markers",
      "type": "circle",
      "source": "geojson-markers",
      "filter": [
        "!",
        [
          "has",
          "point_count"
        ]
      ],
      "paint": {
        "circle-radius": 7,
        "circle-stroke-width": 3,
        "circle-stroke-color": {
          "r": 0.984313725490196,
          "g": 0.40784313725490196,
          "b": 0.2235294117647059,
          "a": 1
        },
        "circle-color": {
          "r": 0.5905882352941176,
          "g": 0.24470588235294116,
          "b": 0.13411764705882354,
          "a": 0.6
        }
      },
      "layout": {}
    },
    "source": "geojson-markers",
    "state": {
      "hover": true
    }
  },
  tempo: 120,
  speed: 900,
  availableDevices: [],
  selectedDevice: '',
  run: true,
  globalTime: 0,
  channels: [...new Array(8)].map((val, index) => index),
  modes: [...new Array(8)].map(elem => 'NOTE_ON'),
  parameters: [...new Array(8)].map(elem => 0x03),
  ranges: [...new Array(8)].map(elem => 24),
  notes: [105, 93, 81, 69, 57, 45, 33, 21],
  values: [...new Array(8)].map(elem => 0),
  currentBeats: [...new Array(8)].map(elem => 0),
  enables: [true, true, true, false, false, false, false, false],
  beatSelections: [...new Array(8)].map(elem => [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true]),
  noteLengths: [...new Array(8)].map(elem => 0.25),
  flashMessage: '',
  showFlashMessage: false
};


const reducer = (state = initialState, action) => {
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

    case 'noteLength/set':
      let newNoteLengths = state.noteLengths;
      newNoteLengths[action.payload.id] = action.payload.length;
      return {
        ...state,
        noteLengths: [...newNoteLengths]
      }

    case 'run/set':
      return {
        ...state,
        run: action.payload.allowRun
      }

    case 'flashMessage/setMessage':
      return {
        ...state,
        flashMessage: action.payload.message
      }

    case 'flashMessage/setShow':
      return {
        ...state,
        showFlashMessage: action.payload
      }
  
    default:
      return state;
  }
}


export default reducer;

