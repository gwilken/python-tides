const beatArr = [
  {
    label: 'every beat',
    pattern: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  },
  {
    label: 'every 2nd',
    pattern: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
  },
  {
    label: 'every 4th',
    pattern: [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true]
  },
  {
    label: 'every 8th',
    pattern: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true]
  },
  {
    label: 'every 16th',
    pattern: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true]
  }
]

export default beatArr;
