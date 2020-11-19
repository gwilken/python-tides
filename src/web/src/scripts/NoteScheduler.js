
class NoteScheduler {
  constructor() {
    this.channels = new Array(8).fill(null).map(() => ({
       nextNoteTime: null, 
       notesInQueue: [],
       current16thNote: 0,
       noteLength: 250,
       currentVal: 0
      })
    )
    
    this.scheduleAheadTime = 500;
    this.tempo = 120;
    this.output = null;
  }

  setOutput(outputDevice) {
    this.output = outputDevice
    console.log('output change:', this.output)
  }

  nextNote(channel) {
    let secondsPerBeat = 60.0 / this.tempo;

    this.channels[channel].nextNoteTime += 1000 * secondsPerBeat;
  
    this.channels[channel].current16thNote++;
  
    if ( this.channels[channel].current16thNote == 16) {
      this.channels[channel].current16thNote = 0;
    }
  }

  scheduleNote(note) {
    let { midiValue, timeOffset, channel } = note; 

     this.channels[channel].notesInQueue.push(note);
  
    // let scheduleTimeOffset = ((lookAheadAmount * .3) / (globalSpeed * 16.66)) * 1000
    // let scheduleTimeOffset = 1000
  
    if ( this.output) {
      let modeRange = 24;
      let note = 69;
  
      
      let value = Math.floor(parseFloat(midiValue) * parseInt(modeRange)) + (parseInt(note) - (Math.floor(parseInt(modeRange) / 2)))
      // console.log('value', value)
      let clampedMidiValue = Math.min(Math.max(value, 0), 127);
      // let clampedMidiValue = 69;
  
      console.log(clampedMidiValue)
      var noteOnMessage = [0x90 | channel, clampedMidiValue, 0x7f];    // note on, middle C, full velocity
  
      this.output.send( noteOnMessage, window.performance.now() + timeOffset );  //omitting the timestamp means send immediately.
      this.output.send( [0x80 | channel, clampedMidiValue, 0x40], window.performance.now() + timeOffset + this.channels[channel].noteLength ); // Inlined array creation- note off, middle C,                                                               
    }
  }

  scheduler(midiValue, timeOffset, channel) {
    while ( this.channels[channel].nextNoteTime < window.performance.now() + this.scheduleAheadTime ) {
        this.scheduleNote({
          beat: this.channels[channel].current16thNote,
          time: this.channels[channel].nextNoteTime,
          midiValue,
          timeOffset,
          channel 
        });
        
        this.nextNote(channel);
    }
  }
}

export default new NoteScheduler();

