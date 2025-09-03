if (!cc._RF.push(module, "d85610Qhw9DzLM9jdvZsDKB", "NoSoundAdapter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("AudioAdapter");
  var L = {
    load: function (u, c) {
      setTimeout(c, 0);
    },
    unload: function () {}
  };
  var D = 2;
  var k = function (u) {
    function c(p) {
      var j = u.call(this) || this;
      j._muted = false;
      j._volume = 1;
      j._loop = false;
      j._rate = 1;
      j._duration = D;
      j._startTime = 0;
      j._pausedTime = 0;
      j._onAudioEnded = j._onAudioEnded.bind(j);
      j._onFadeEnded = j._onFadeEnded.bind(j);
      j.reset(p);
      return j;
    }
    __extends(c, u);
    c.prototype.reset = function (p) {
      this._startTime = 0;
      this._pausedTime = 0;
      if (p !== undefined) {
        var j = p.loop;
        var G = p.volume;
        var V = p.muted;
        var Q = p.rate;
        var N = p.duration;
        if (typeof j == "boolean") {
          this._loop = j;
        }
        if (typeof G == "number" && G >= 0 && G <= 1) {
          this._volume = G;
        }
        if (typeof V == "boolean") {
          this._muted = V;
        }
        if (typeof Q == "number" && Q > 0) {
          this._rate = Q;
        }
        if (typeof N == "number" && N > 0) {
          this._duration = N;
        }
      }
    };
    c.prototype.destroy = function () {
      this.reset();
      this.removeAll();
    };
    Object.defineProperty(c.prototype, "instantVolume", {
      get: function () {
        return this._volume;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "volume", {
      get: function () {
        return this._volume;
      },
      set: function (p) {
        this._volume = p;
        this._setFadeDispose(undefined);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "loop", {
      get: function () {
        return this._loop;
      },
      set: function (p) {
        if (p !== this._loop) {
          this._loop = p;
          if (p) {
            this._setScheduleDispose(undefined);
          } else {
            this._scheduleEnd();
          }
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "paused", {
      get: function () {
        return this._startTime > 0 && this._pausedTime > 0;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "playing", {
      get: function () {
        return this._startTime > 0 && this._pausedTime === 0;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "stopped", {
      get: function () {
        return this._startTime === 0 && this._pausedTime === 0;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "rate", {
      get: function () {
        return this._rate;
      },
      set: function (p) {
        if (typeof p == "number" && p > 0 && p !== this._rate) {
          this._rate = p;
        }
      },
      enumerable: false,
      configurable: true
    });
    c.prototype.pause = function () {
      if (!this.paused) {
        this._pausedTime = Date.now();
        this._setFadeDispose(undefined);
        this._setScheduleDispose(undefined);
      }
    };
    c.prototype.resume = function () {
      if (this.paused) {
        this._startTime += Date.now() - this._pausedTime;
        this._pausedTime = 0;
        if (!this._loop) {
          this._scheduleEnd();
        }
      }
    };
    Object.defineProperty(c.prototype, "muted", {
      get: function () {
        return this._muted;
      },
      set: function (p) {
        this._muted = p;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "duration", {
      get: function () {
        return this._duration;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "currentTime", {
      get: function () {
        if (this._pausedTime > 0) {
          return (this._pausedTime - this._startTime) / 1000 % this._duration;
        } else {
          return (Date.now() - this._startTime) / 1000 % this._duration;
        }
      },
      enumerable: false,
      configurable: true
    });
    c.prototype.seek = function (p) {
      this._setFadeDispose(undefined);
      if (p >= this._duration && !this._loop) {
        this._setScheduleDispose(undefined);
        this._startTime = 0;
        this._pausedTime = 0;
        this._onFadeEnded();
        this.emit(shell.WebAudioEvent.ENDED);
        return;
      }
      if (this.paused) {
        this.resume();
      }
      this._startTime = Date.now() - p * 1000;
      if (!this._loop) {
        this._scheduleEnd();
      }
      this.emit(shell.WebAudioEvent.SEEK);
    };
    c.prototype.play = function (p, j) {
      this._startTime = Date.now();
      this._duration = typeof j == "number" && j > 0 ? j : this._duration;
      if (!this._loop) {
        this._scheduleEnd();
      }
    };
    c.prototype._onAudioEnded = function () {
      if (this._fadeDispose) {
        this._setFadeDispose(undefined);
        this._onFadeEnded();
      }
      this._startTime = 0;
      this._pausedTime = 0;
      this.emit(shell.WebAudioEvent.ENDED);
    };
    c.prototype.stop = function () {
      this._setFadeDispose(undefined);
      this._setScheduleDispose(undefined);
      this._startTime = 0;
      this._pausedTime = 0;
      this.emit(shell.WebAudioEvent.STOP);
    };
    c.prototype.fade = function (p, j, G) {
      this._volume = j;
      this._setFadeDispose(G);
    };
    c.prototype._onFadeEnded = function () {
      this.emit(shell.WebAudioEvent.FADED);
    };
    c.prototype._scheduleEnd = function () {
      var p = this._duration - this.currentTime;
      if (p >= 0) {
        this._setScheduleDispose(p);
      } else {
        this._setScheduleDispose(undefined);
      }
    };
    c.prototype._setScheduleDispose = function (p) {
      var j = this._scheduleDispose;
      if (j) {
        j();
      }
      this._scheduleDispose = p == null ? undefined : T.delayCallback(p)(this._onAudioEnded);
    };
    c.prototype._setFadeDispose = function (p) {
      var j = this._fadeDispose;
      if (j) {
        j();
      }
      this._fadeDispose = p == null ? undefined : T.delayCallback(p)(this._onFadeEnded);
    };
    return c;
  }(shell.CustomEventTarget);
  var C = function (u) {
    function c(p) {
      var j = this;
      p.loader = L;
      (j = u.call(this, p) || this)._estimatedDuration = p.estimatedDuration || D;
      return j;
    }
    __extends(c, u);
    c.prototype.getDuration = function (p) {
      if (typeof p == "number") {
        return u.prototype.getDuration.call(this, p);
      } else {
        return this._estimatedDuration;
      }
    };
    c.prototype.getAudioFromPool = function () {
      var p = this.factory.get();
      var j = {
        duration: this._estimatedDuration
      };
      var G = {
        duration: this._estimatedDuration
      };
      if (p) {
        p.reset(j);
        return p;
      } else {
        return new k(G);
      }
    };
    return c;
  }(x.default);
  exports.default = C;
  cc._RF.pop();
}