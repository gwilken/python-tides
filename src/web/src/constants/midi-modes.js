const NOTE_OFF = 0x80;
const NOTE_ON = 0x90;
const AFTERTOUCH = 0xA0;
const CC = 0xB0;
const PATCH_CHANGE = 0xC0;
const CHANNEL_PRESSURE = 0xD0;
const PITCH_BEND = 0xE0;

const MODES = [
  {
    id: 'NOTE_ON',
    displayName: 'Notes',
    value:  NOTE_ON
  },
  {
    id: 'CC',
    displayName: 'Control Channel',
    value: CC
  },
  // {
  //   id: 'AFTERTOUCH',
  //   displayName: 'After Touch',
  //   value: AFTERTOUCH
  // },
  // {
  //   id: 'PRESSURE',
  //   displayName: 'Channel Pressue',
  //   value: CHANNEL_PRESSURE
  // },
  // {
  //   id: 'PITCH_BEND',
  //   displayName: 'Pitch Bend',
  //   value: PITCH_BEND
  // }
]

export {
  NOTE_OFF,
  NOTE_ON,
  AFTERTOUCH,
  CC,
  PATCH_CHANGE,
  CHANNEL_PRESSURE,
  PITCH_BEND,
  MODES
}

