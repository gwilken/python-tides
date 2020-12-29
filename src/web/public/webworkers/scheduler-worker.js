let interval = 30;
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
