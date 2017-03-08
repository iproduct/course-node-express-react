export class Clock {
  constructor(domElementContainer, chronometer = true, active = true) {
    this._container = domElementContainer;
    this._active = active;
    this._chronometer = chronometer;

    this._timeElem = document.createElement('span');
    this._timeElem.className = 'time';
    this._container.appendChild(this._timeElem);

    this._statusElem = document.createElement('span');
    this._statusElem.className = 'status';
    this._container.appendChild(this._statusElem);

    this._now = new Date();

    if (this._active)
      this.start();
    else
      this.stop();
  }

  start() {
    if (this._chronometer) {
      this._startTime = Date.now();
    }
    this._time = Date.now();
    this._active = true;
    this._interval = setInterval(() => {
      this._time = Date.now();
      this._render();
    }, 1000);
    this._render();
  }

  stop() {
    this._active = false;
    clearInterval(this._interval);
    this._render();
  }

  _render() {
    function zeroPadding(n) {
      if (n < 10)
        return '0' + n;
      return n;
    }

    if (this._chronometer) {
      var seconds =Math.floor((this._time - this._startTime + 1) / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
    } else {
      this._now.setTime(this._time);
      var seconds = this._now.getSeconds();
      var minutes = this._now.getMinutes();
      var hours = this._now.getHours();
    }
    this._timeElem.innerText = `${ zeroPadding(hours)} : ${zeroPadding(minutes)}  : ${zeroPadding(seconds)}`;
    this._statusElem.innerText = this._active ? ', active' : ', stopped';
  }

}