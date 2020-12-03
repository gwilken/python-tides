console.log('scheduler worker loaded');

let interval = 30;
let intervalId;

onmessage = function (e) {
  console.log('scheduler worker start')
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
