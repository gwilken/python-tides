let interval = 10;
let intervalId;

onmessage = function (e) {
  if (e.data == 'start') {
    intervalId = setInterval(() => {
      postMessage(performance.now());
    }, interval);
  }

  if (e.data == 'stop') {
    clearInterval(intervalId)
  }

  if (e.data.interval) {
    interval = e.data.interval
  }
}
