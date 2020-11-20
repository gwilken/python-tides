
class MidiManager {
  constructor() {
    this.midiAccess = null;
    this.midiInputs = null;
    this.midiOutputs = null;
  }

  async initialize() {
    let midi = await this.requestMIDI()

    if (midi) { 
      this.midiAccess = midi;
      
      this.midiAccess.addEventListener('statechange', (event) => {
        console.log('STATE CHANGE MIDI')
        this.getDevices(event.target);
      } )


      await this.getDevices();
    } else {
      console.log('error trying to initialize midi')
    }
  }

  async requestMIDI() {
    return new Promise(resolve => {
      navigator.requestMIDIAccess()
      .then(midi => {
          resolve(midi)
        },
        (err) => {
          console.log('Something went wrong', err)
          resolve(null)
        });
    })
  }


  getDevices() {
    return new Promise(resolve => {
      console.log('MIDI getDevices')
    
      // Reset.
      this.midiInputs = [];
      this.midiOutputs = [];
      
      // MIDI devices that send you data.
      const inputs = this.midiAccess.inputs.values();
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        this.midiInputs.push(input.value);
      }
      
      // MIDI devices that you send data to.
      const outputs = this.midiAccess.outputs.values();
      for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
        this.midiOutputs.push(output.value);
      }
      
      console.log('MIDI output 0:', this.midiOutputs[0])
    
      resolve()
      // displayDevices();
      // startListening();
    })
  }

  sendNote(pitch, velocity, duration) {
    if (this.midiOutputs) {
      const NOTE_ON = 0x90;
      // const NOTE_OFF = 0x80;
      
      // const device = midiOut[selectOut.selectedIndex];
      // const device = midiOut[0];
      const msgOn = [NOTE_ON, pitch, velocity];
      const msgOff = [NOTE_ON, pitch, velocity];
      
      // First send the note on;
      this.midiOutputs[0].send(msgOn); 
        
      // Then send the note off. You can send this separately if you want 
      // (i.e. when the button is released)
      this.midiOutputs[0].send(msgOff, Date.now() + duration); 
    } else {
      console.log('not initialized yet')
    }
  }


  sendCC(channel, num, value ) {
    if (this.midiOutputs) {
      this.midiOutputs[0].send([`0xB${channel}`, num, value])
    }
  }

};

export default new MidiManager()

// connect();

// Start listening to MIDI messages.
// function startListening() {
//   for (const input of midiIn) {
//     input.addEventListener('midimessage', midiMessageReceived);
//   }
// }