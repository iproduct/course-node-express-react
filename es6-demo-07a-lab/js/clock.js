class Clock {
  constructor(domElementContainer, active) {
    this._container = domElementContainer;
    this._timeElement = document.createElement('span');
    this._timeElement.className = 'time';
    this._container.appendChild(this._timeElement);
    this._statusElement = document.createElement('span');
    this._statusElement.className = 'status';
    this._container.appendChild(this._statusElement);
    this._active = active || true;
    this._time = 0;
    this._render();
  }

  start() {
    this._active = true;
    this._render();
  }

  stop() {
    this._active = false;
    this._render();
  }

  _setTime(newTime) {
    this._time = newTime;
    this._render();
  }

  _render() {
    this._timeElement.innerHTML = this._time;
    this._statusElement.innerHTML = this._active ? ': active' : ': stopped';
  }

}


// Homework: Add setInterval, clearInterval behaviors to the clock
// to work as chronometer. start() should zero the counter