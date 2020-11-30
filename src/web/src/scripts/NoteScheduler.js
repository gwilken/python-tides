import store from '../redux/store';

class NoteScheduler {
  constructor() {
    store.subscribe(this.storeUpdated);

    this.state = store.getState();
    
    this.channels = new Array(8).fill(null).map(() => ({
        nextNoteTime: null, 
        notesInQueue: [],
        current16thNote: 0,
        noteLength: 250,
        currentVal: 0
      })
    )
    this.output = null;

    this.scheduleAheadTime = 200;
    this.tempos = this.state.tempos;
    this.enables = this.state.enables;
  }


  storeUpdated = () => {
    let state = store.getState();
    let availableDevices = state.availableDevices;
    let selectedDevice = state.selectedDevice;
    let prevTempos = this.tempos;
    let newTempos = state.tempos;

    if (availableDevices && selectedDevice) {
      this.output = availableDevices.filter(device => device.id === selectedDevice)[0];
    } else {
      this.output = null
    }

    if (prevTempos !== newTempos) {
      this.tempos = newTempos;
    }

    if (this.enables !== state.enables) {
      this.enables = state.enables;
    }
  }


  nextNote(channel) {
    let secondsPerBeat = 60.0 / this.tempos[channel];
    this.channels[channel].nextNoteTime += 1000 * secondsPerBeat;
    this.channels[channel].current16thNote++;
  
    if ( this.channels[channel].current16thNote == 16) {
      this.channels[channel].current16thNote = 0;
    }
  }

  scheduleNote(note) {
    let { value, timeOffset, channel } = note; 
    this.channels[channel].notesInQueue.push(note);
  
    if (this.output && this.enables[channel]) {
      let noteOnMessage = [0x90 | channel, value, 0x7f]; 
      let noteOffMessage = [0x80 | channel, value, 0x40];
      this.output.send( noteOnMessage, window.performance.now() + timeOffset ); 
      this.output.send( noteOffMessage, window.performance.now() + timeOffset + this.channels[channel].noteLength );                                                              
    }
  }

  scheduler(value, timeOffset, channel) {
    while (this.channels[channel].nextNoteTime < (window.performance.now() + this.scheduleAheadTime)) {
      
      console.log('sched.', this.channels[channel].notesInQueue)
      
        this.scheduleNote({
          beat: this.channels[channel].current16thNote,
          time: this.channels[channel].nextNoteTime,
          value,
          timeOffset,
          channel 
        });
        
        this.nextNote(channel);
    }
  }
}

export default new NoteScheduler();
