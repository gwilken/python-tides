const MIDI_NOTES = [
  { "midi": "108", "piano": "88", "name": "C8" },
  { "midi": "107", "piano": "87", "name": "B7" },
  { "midi": "106", "piano": "86", "name": "A#7/Bb7" },
  { "midi": "105", "piano": "85", "name": "A7" },
  { "midi": "104", "piano": "84", "name": "G#7/Ab7" },
  { "midi": "103", "piano": "83", "name": "G7" },
  { "midi": "102", "piano": "82", "name": "F#7/Gb7" },
  { "midi": "101", "piano": "81", "name": "F7" },
  { "midi": "100", "piano": "80", "name": "E7" },
  { "midi": "99", "piano": "79", "name": "D#7/Eb7" },
  { "midi": "98", "piano": "78", "name": "D7" },
  { "midi": "97", "piano": "77", "name": "C#7/Db7" },
  { "midi": "96", "piano": "76", "name": "C7" },
  { "midi": "95", "piano": "75", "name": "B6" },
  { "midi": "94", "piano": "74", "name": "A#6/Bb6" },
  { "midi": "93", "piano": "73", "name": "A6" },
  { "midi": "92", "piano": "72", "name": "G#6/Ab6" },
  { "midi": "91", "piano": "71", "name": "G6" },
  { "midi": "90", "piano": "70", "name": "F#6/Gb6" },
  { "midi": "89", "piano": "69", "name": "F6" },
  { "midi": "88", "piano": "68", "name": "E6" },
  { "midi": "87", "piano": "67", "name": "D#6/Eb6" },
  { "midi": "86", "piano": "66", "name": "D6" },
  { "midi": "85", "piano": "65", "name": "C#6/Db6" },
  { "midi": "84", "piano": "64", "name": "C6" },
  { "midi": "83", "piano": "63", "name": "B5" },
  { "midi": "82", "piano": "62", "name": "A#5/Bb5" },
  { "midi": "81", "piano": "61", "name": "A5" },
  { "midi": "80", "piano": "60", "name": "G#5/Ab5" },
  { "midi": "79", "piano": "59", "name": "G5" },
  { "midi": "78", "piano": "58", "name": "F#5/Gb5" },
  { "midi": "77", "piano": "57", "name": "F5" },
  { "midi": "76", "piano": "56", "name": "E5" },
  { "midi": "75", "piano": "55", "name": "D#5/Eb5" },
  { "midi": "74", "piano": "54", "name": "D5" },
  { "midi": "73", "piano": "53", "name": "C#5/Db5" },
  { "midi": "72", "piano": "52", "name": "C5" },
  { "midi": "71", "piano": "51", "name": "B4" },
  { "midi": "70", "piano": "50", "name": "A#4/Bb4" },
  { "midi": "69", "piano": "49", "name": "A4" },
  { "midi": "68", "piano": "48", "name": "G#4/Ab4" },
  { "midi": "67", "piano": "47", "name": "G4" },
  { "midi": "66", "piano": "46", "name": "F#4/Gb4" },
  { "midi": "65", "piano": "45", "name": "F4" },
  { "midi": "64", "piano": "44", "name": "E4" },
  { "midi": "63", "piano": "43", "name": "D#4/Eb4" },
  { "midi": "62", "piano": "42", "name": "D4" },
  { "midi": "61", "piano": "41", "name": "C#4/Db4" },
  { "midi": "60", "piano": "40", "name": "C4" },
  { "midi": "59", "piano": "39", "name": "B3" },
  { "midi": "58", "piano": "38", "name": "A#3/Bb3" },
  { "midi": "57", "piano": "37", "name": "A3" },
  { "midi": "56", "piano": "36", "name": "G#3/Ab3" },
  { "midi": "55", "piano": "35", "name": "G3" },
  { "midi": "54", "piano": "34", "name": "F#3/Gb3" },
  { "midi": "53", "piano": "33", "name": "F3" },
  { "midi": "52", "piano": "32", "name": "E3" },
  { "midi": "51", "piano": "31", "name": "D#3/Eb3" },
  { "midi": "50", "piano": "30", "name": "D3" },
  { "midi": "49", "piano": "29", "name": "C#3/Db3" },
  { "midi": "48", "piano": "28", "name": "C3" },
  { "midi": "47", "piano": "27", "name": "B2" },
  { "midi": "46", "piano": "26", "name": "A#2/Bb2" },
  { "midi": "45", "piano": "25", "name": "A2" },
  { "midi": "44", "piano": "24", "name": "G#2/Ab2" },
  { "midi": "43", "piano": "23", "name": "G2" },
  { "midi": "42", "piano": "22", "name": "F#2/Gb2" },
  { "midi": "41", "piano": "21", "name": "F2" },
  { "midi": "40", "piano": "20", "name": "E2" },
  { "midi": "39", "piano": "19", "name": "D#2/Eb2" },
  { "midi": "38", "piano": "18", "name": "D2" },
  { "midi": "37", "piano": "17", "name": "C#2/Db2" },
  { "midi": "36", "piano": "16", "name": "C2" },
  { "midi": "35", "piano": "15", "name": "B1" },
  { "midi": "34", "piano": "14", "name": "A#1/Bb1" },
  { "midi": "33", "piano": "13", "name": "A1" },
  { "midi": "32", "piano": "12", "name": "G#1/Ab1" },
  { "midi": "31", "piano": "11", "name": "G1" },
  { "midi": "30", "piano": "10", "name": "F#1/Gb1" },
  { "midi": "29", "piano": "9", "name": "F1" },
  { "midi": "28", "piano": "8", "name": "E1" },
  { "midi": "27", "piano": "7", "name": "D#1/Eb1" },
  { "midi": "26", "piano": "6", "name": "D1" },
  { "midi": "25", "piano": "5", "name": "C#1/Db1" },
  { "midi": "24", "piano": "4", "name": "C1" },
  { "midi": "23", "piano": "3", "name": "B0" },
  { "midi": "22", "piano": "2", "name": "A#0/Bb0" },
  { "midi": "21", "piano": "1", "name": "A0" },
];

export default MIDI_NOTES