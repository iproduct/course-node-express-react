'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = exports.Clock = function () {
  function Clock(domElementContainer) {
    var chronometer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var active = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, Clock);

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

    if (this._active) this.start();else this.stop();
  }

  _createClass(Clock, [{
    key: 'start',
    value: function start() {
      var _this = this;

      if (this._chronometer) {
        this._startTime = Date.now();
      }
      this._time = Date.now();
      this._active = true;
      this._interval = setInterval(function () {
        _this._time = Date.now();
        _this._render();
      }, 1000);
      this._render();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._active = false;
      clearInterval(this._interval);
      this._render();
    }
  }, {
    key: '_render',
    value: function _render() {
      function zeroPadding(n) {
        if (n < 10) return '0' + n;
        return n;
      }

      if (this._chronometer) {
        var seconds = Math.floor((this._time - this._startTime + 1) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
      } else {
        this._now.setTime(this._time);
        var seconds = this._now.getSeconds();
        var minutes = this._now.getMinutes();
        var hours = this._now.getHours();
      }
      this._timeElem.innerText = zeroPadding(hours) + ' : ' + zeroPadding(minutes) + '  : ' + zeroPadding(seconds);
      this._statusElem.innerText = this._active ? ', active' : ', stopped';
    }
  }]);

  return Clock;
}();
