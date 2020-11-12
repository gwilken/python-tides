console.log('metro start');

let interval = 25;
let intervalId;

onmessage = function (e) {
  if (e.data == 'start') {
    intervalId = setInterval(() => {
      postMessage('tick');
    }, interval);
  }

  if (e.data == 'stop') {
    clearInterval(intervalId)
  }

  if (e.data.interval) {
    interval = e.data.interval
  }
}




// TODO: start / stop

