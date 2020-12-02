
const getPixelRatio = context => {
  var backingStore =
  context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1;
  
  return (window.devicePixelRatio || 1) / backingStore;
};


const normalize = (val, max, min) => { return (val - min) / (max - min); }

const range = (start, stop, step) => {
  if (typeof stop == 'undefined') {
      // one param defined
      stop = start;
      start = 0;
  }

  if (typeof step == 'undefined') {
      step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
  }

  return result;
};


const rotateArrLeft = (arr, num) => {
  return arr.slice(num).concat(arr.slice(0, num))
}


const rotateArrRight = (arr, num) => {
  return arr.slice(-1 * num).concat(arr.slice(0, -1 * num))
}


const debounce = (callback) => {
  let timer;

  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(callback, 250, event);
  };
}


export { getPixelRatio, normalize, range, rotateArrLeft, rotateArrRight, debounce }

