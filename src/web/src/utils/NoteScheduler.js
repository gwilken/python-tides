
class NoteScheduler {
  constructor() {
    this.queue = [];
    // this.currentTask;
  }

  enqueueTask(task) {
    this.queue.push(task);
    
    // console.log('queue:', this.queue.length)

    this.next();
  }

  next() {
    if (this.queue.length == 0) {
      console.log('queue empty.');
      return
    }

    let now = window.performance.now();
    // let task = this.queue.shift();

    for (let index in this.queue) {
      let [cb, targetTime] = this.queue[index];

      if (targetTime - now < 100 && targetTime - now > 0) {
        console.log(targetTime)
      }
    }

    // try {
    //   task();
    //   this.next();
    // }

    // catch (err) {
    //   console.log('error:', err)
    // }
  }
}

const noteScheduler = new NoteScheduler();


export default noteScheduler;






// queue a task for a specific time
// remove once fired










