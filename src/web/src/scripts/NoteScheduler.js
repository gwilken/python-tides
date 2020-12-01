import store from '../redux/store';

class NoteScheduler {
  constructor() {
    store.subscribe(this.storeUpdated);
    this.state = store.getState();
    this.nextNoteTime = null; 
    this.notesInQueue = [];
    this.current16thNote = 0;
    this.noteLength = 125;
    this.currentVal = 0;
    this.output = null;
    this.scheduleAheadTime = 100;
    this.tempo = this.state.tempo;
    this.enables = this.state.enables;
    this.lastNoteTimeStamp = null;
    this.beatSelections = this.state.beatSelections;
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
    let { beat, time, value, channel } = note; 

    this.notesInQueue.push(note);

    if (
      this.output && 
      this.enables[channel] &&
      this.beatSelections[channel][beat] ) {

      let noteOnMessage = [0x90 | channel, value, 0x7f]; 
      let noteOffMessage = [0x80 | channel, value, 0x40];
      this.output.send( noteOnMessage, time ); 
      this.output.send( noteOffMessage, time + this.noteLength );                                                              
    }
  }


  scheduler(notes) {
    while (this.nextNoteTime < (window.performance.now() + this.scheduleAheadTime)) {
      notes.forEach(note => {
        let [value, channel] = note;

        this.scheduleNote({
          beat: this.current16thNote,
          time: this.nextNoteTime,
          value,
          channel 
        });
      })

      this.nextNote();
    }
  }
}

export default new NoteScheduler();
