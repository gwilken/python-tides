import store from '../redux/store';
import { MODES } from '../constants/midi-modes'

class NoteScheduler {
  constructor() {
    store.subscribe(this.storeUpdated);
    this.state = store.getState();
    this.nextNoteTime = 0; 
    this.notesInQueue = [];
    this.current16thNote = 0;
    this.noteLength = 1000 / (this.state.tempo / 60);
    this.currentVal = 0;
    this.output = null;
    this.scheduleAheadTime = 150;
    this.tempo = this.state.tempo;
    this.enables = this.state.enables;
    this.lastNoteTimeStamp = null;
    this.beatSelections = this.state.beatSelections;
    this.channels = this.state.channels;
    this.modes = this.state.modes;
    this.parameters = this.state.parameters;
  }


  storeUpdated = () => {
    let state = store.getState();
    let availableDevices = state.availableDevices;
    let selectedDevice = state.selectedDevice;

    if (availableDevices && selectedDevice) {
      this.output = availableDevices.filter(device => device.id === selectedDevice)[0];
    } else {
      this.output = null
    }

    if (this.tempo !== state.tempo) {
      this.tempo = state.tempo;
    }

    if (this.enables !== state.enables) {
      this.enables = state.enables;
    }
    
    if (this.beatSelections !== state.beatSelections) {
      this.beatSelections = state.beatSelections;
    }

    if (this.channels !== state.channels) {
      this.channels = state.channels;
    }

    if (this.modes !== state.modes) {
      this.modes = state.modes;
    }

    if (this.parameters !== state.parameters) {
      this.parameters = state.parameters;
    }
  }


  nextNote() {
    let secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += 1000 * secondsPerBeat;
    this.current16thNote++;
    if (this.current16thNote == 16) {
      this.current16thNote = 0;
    }
  }

  scheduleNote(note) {
    let { beat, time, value, index } = note; 
    let channel = this.channels[index];

    this.notesInQueue.push(note);

    if (
      this.output && 
      this.enables[index] &&
      this.beatSelections[index][beat] ) {
    
      if (this.modes[index] === 'NOTE_ON') {
        let onMessage = [0x90 | channel, value, 0x7f]; 
        this.output.send( onMessage, time ); 
        let offMessage = [0x80 | channel, value, 0x40];
        this.output.send( offMessage, time + this.noteLength );                                                              
      } else if (this.modes[index] === 'CC') {
        this.output.send( [0xB0 | channel, this.parameters[index], value], time); 
      }


    }
  }


  scheduler(currentTime, notes) {
    while (this.nextNoteTime < (currentTime + this.scheduleAheadTime)) {
      // console.log('scheduling...', notes)
      notes.forEach(note => {
        let [value, index] = note;

        this.scheduleNote({
          beat: this.current16thNote,
          time: this.nextNoteTime,
          value,
          index 
        });
      })

      this.nextNote();
    }
  }
}

export default new NoteScheduler();
