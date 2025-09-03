if (!cc._RF.push(module, "f1d53JqS5hGVbtNCz0JAnwN", "SlotStateMachine")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StopStyle = exports.SlotStates = undefined;
  var T;
  var x;
  var L = require("Utils");
  (function (k) {
    k[k.SPINNING = 0] = "SPINNING";
    k[k.STOPPING = 1] = "STOPPING";
    k[k.STOPPED = 2] = "STOPPED";
  })(T = exports.SlotStates ||= {});
  (function (k) {
    k[k.NORMAL = 0] = "NORMAL";
    k[k.FAST = 1] = "FAST";
  })(x = exports.StopStyle ||= {});
  var D = function () {
    function k() {
      this._state = T.STOPPED;
      this._stopStyle = x.NORMAL;
      this._minimumSpinningTimeReached = false;
      this._regularSpinningTimeReached = false;
      this._unscheduleRegularSpinning = undefined;
      this._stopRequestCallback = undefined;
    }
    k.prototype.getState = function () {
      return this._state;
    };
    k.prototype.getStopStyle = function () {
      return this._stopStyle;
    };
    k.prototype.spin = function (C, u) {
      if (this._state === T.STOPPED) {
        this._state = T.SPINNING;
        L.delayCallback(C)(this._minimumSpinTimeOut.bind(this));
        this._unscheduleRegularSpinning = L.delayCallback(u)(this._regularSpinTimeOut.bind(this));
      }
    };
    k.prototype.markFastStop = function () {
      if (this._state === T.SPINNING) {
        this._stopStyle = x.FAST;
      }
    };
    k.prototype.unmarkFastStop = function () {
      if (this._stopStyle === x.FAST && this._state === T.SPINNING) {
        this._stopStyle = x.NORMAL;
      }
    };
    k.prototype.fastStop = function (C) {
      if (this._state === T.SPINNING || this._state === T.STOPPING) {
        this._stopStyle = x.FAST;
        this._state = T.STOPPING;
        this._stopRequestCallback = C;
        if (this._minimumSpinningTimeReached) {
          this._fastStop();
        }
      }
    };
    k.prototype.stop = function (C) {
      if (this._state === T.SPINNING) {
        if (this._stopStyle === x.FAST) {
          return;
        }
        this._state = T.STOPPING;
        this._stopRequestCallback = C;
        if (this._regularSpinningTimeReached) {
          this._stop();
        }
      }
    };
    k.prototype.stopped = function () {
      this._state = T.STOPPED;
      this._reset();
    };
    k.prototype._minimumSpinTimeOut = function () {
      this._minimumSpinningTimeReached = true;
      if (this._state === T.STOPPING && this._stopStyle === x.FAST) {
        this._fastStop();
      }
    };
    k.prototype._regularSpinTimeOut = function () {
      this._regularSpinningTimeReached = true;
      if (this._state === T.STOPPING && this._stopStyle === x.NORMAL) {
        this._stop();
      }
    };
    k.prototype._fastStop = function () {
      var C = this._unscheduleRegularSpinning;
      this._unscheduleRegularSpinning = undefined;
      if (C) {
        C();
      }
      this._stop();
    };
    k.prototype._stop = function () {
      var C = this._stopRequestCallback;
      this._stopRequestCallback = undefined;
      if (C) {
        C();
      }
    };
    k.prototype._reset = function () {
      this._stopStyle = x.NORMAL;
      this._minimumSpinningTimeReached = false;
      this._regularSpinningTimeReached = false;
      this._stopRequestCallback = undefined;
      this._unscheduleRegularSpinning = undefined;
    };
    return k;
  }();
  exports.default = D;
  cc._RF.pop();
}