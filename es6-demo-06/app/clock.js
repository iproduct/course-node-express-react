class Clock {

    constructor(element) {
        this._element = element;
        this._element.style.fontWeight = 'bold';
        this._element.innerHTML += "The time is: ";
        this._timeElem = document.createElement('span');
        this._element.appendChild(this._timeElem);
        this._statusElem = document.createElement('span');
        this._element.appendChild(this._statusElem);
    }

    start() {
        if (!this._timerToken) {
            this._timerToken = setInterval(() => this._setTime(new Date().toUTCString()), 500);
            this._setStatus(' - Clock ACTIVE');
        }
    }

    stop() {
        if (this._timerToken) {
            clearInterval(this._timerToken);
            this._timerToken = undefined;
            this._setStatus(' - Clock STOPPED');
        }
    }

    // private methods
    _setStatus(status) {
        this._status = status;
        this._statusElem.innerText = status;
    }

    _setTime(newTime) {
        this._time = newTime;
        this._timeElem.innerText = newTime;
    }

}
