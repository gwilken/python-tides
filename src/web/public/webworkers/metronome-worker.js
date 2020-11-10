console.log('metro start');

let interval = 100;
let intervalId;

intervalId = setInterval(() => {
  postMessage('tick');
}, interval);



// TODO: start / stop

