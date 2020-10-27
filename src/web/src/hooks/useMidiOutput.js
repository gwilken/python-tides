
const useMidiOutput = (output) => {
  if (!output) return {};

  const noteOn = (note = 60, velocity = 127, channel = 1) => {
    output.send([0x90 | channel, note, velocity]);
  };

  const noteOff = (note = 60, velocity = 127, channel = 1) => {
    output.send([0x80 | note, note, velocity]);
  };

  const cc = (value, control = 0x03, channel = 1) => {
    output.send([0xb0 | channel, control, value]);
  };
  
  return { noteOn, noteOff, cc };
}

export default useMidiOutput

