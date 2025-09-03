if (!cc._RF.push(module, "adab7txcZBOsJ6NClaGwrmO", "WinRollBaseController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = {
    playing: -1,
    stop: -1
  };
  var L = require("NumberDisplayInterface");
  var D = cc.Enum(x);
  var k = cc._decorator;
  var C = k.ccclass;
  var u = k.property;
  var c = function (p) {
    function _j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G._bigWinDuration = 2;
      G._megaWinDuration = 2;
      G._superMegaWinDuration = 2;
      G._hasSetThreshold = false;
      G._hasSetDuration = false;
      G._accumulatedDt = 0;
      G._velocityDt = 0;
      G._maxValue = 0;
      G._speed = 0;
      G._currentState = D.stop;
      G._numberCallbackList = [];
      G._onNumReachedCallback = undefined;
      G._getVelocity = undefined;
      G.defaultVelocityStallDuration = 8;
      G.displayController = undefined;
      return G;
    }
    __extends(_j, p);
    _j.prototype.setNumbersCallback = function (G) {
      this._numberCallbackList = G;
    };
    _j.prototype.setWinThresholds = function (G, V, Q) {
      this._bigWinThreshold = G;
      this._megaWinThreshold = V;
      this._superMegaWinThreshold = Q;
      this._hasSetThreshold = true;
    };
    _j.prototype._defaultGetVelocity = function (G, V, Q) {
      if (Q < this.defaultVelocityStallDuration) {
        return V;
      } else {
        return G + Math.pow(2, Q - this.defaultVelocityStallDuration);
      }
    };
    _j.prototype.setWinDurations = function (G, V) {
      this._bigWinDuration = G;
      this._megaWinDuration = V;
      this._hasSetDuration = true;
    };
    _j.prototype.setVelocityCalculation = function (G) {
      this._getVelocity = G;
    };
    _j.prototype.play = function (G, V) {
      if (this._parametersSanityCheck()) {
        this._currentState = D.playing;
        this._onNumReachedCallback = V;
        this.displayController.clear();
        this._accumulatedDt = 0;
        this._currentCount = 0;
        this._velocityDt = 0;
        this._maxValue = G;
        var Q = this._megaWinThreshold;
        this._initialStageSpeed = this._speed = Q / this._bigWinDuration;
      }
    };
    _j.prototype.skip = function () {
      var G = this;
      if (this._currentState === D.playing) {
        this.stop(false);
        this.displayController.displayNumber(this._maxValue, true, function () {
          G._onNumberReachedAtPoint(G._maxValue);
          G._onNumReachedCallback = null;
        });
      }
    };
    _j.prototype._parametersSanityCheck = function () {
      this._hasSetDuration;
      if (this._numberCallbackList) {
        this._numberCallbackList.length;
      }
      this._getVelocity ||= this._defaultGetVelocity;
      return !!this._hasSetThreshold;
    };
    _j.prototype.stop = function (G = true) {
      if (G) {
        this.displayController.clear();
        this._onNumReachedCallback = null;
      }
      this._accumulatedDt = 0;
      this._currentState = D.stop;
    };
    _j.prototype.update = function (G) {
      if (this._currentState === D.playing) {
        if (this._currentCount >= this._superMegaWinThreshold) {
          this._accumulatedDt += G;
          this._speed = this._getVelocity(this._initialStageSpeed, this._speed, this._accumulatedDt, G);
          this._currentCount = this._currentCount + this._speed * G * (0.9 + Math.random() * 0.2);
        } else {
          this._currentCount = this._currentCount + this._speed * G * (0.9 + Math.random() * 0.2);
        }
        this._updateNumber();
      }
    };
    _j.prototype._onNumberReachedAtPoint = function (G) {
      var V = this._megaWinDuration;
      var Q = this._superMegaWinThreshold;
      var N = this._megaWinThreshold;
      if (G === N) {
        var Y = Q - N;
        this._initialStageSpeed = this._speed = Y / V;
      }
      if (G === Q) {
        this._initialStageSpeed = this._speed = (Q - N) / V;
      }
      if (this._onNumReachedCallback) {
        this._onNumReachedCallback(G);
      }
    };
    _j.prototype._updateNumber = function () {
      var G = this;
      var V = this._currentCount;
      var Q = this._numberCallbackList;
      var N = this._maxValue;
      if (N <= V) {
        this.stop(false);
        this.displayController.displayNumber(N, true, function () {
          G._onNumberReachedAtPoint(N);
          G._onNumReachedCallback = null;
        });
        return;
      }
      if (Q !== undefined && Q.length && Q[0] <= V) {
        var Y = Q.shift();
        this.displayController.displayNumber(V, false, function () {
          G._onNumberReachedAtPoint(Y);
        });
      } else {
        this.displayController.displayNumber(V, false);
      }
    };
    __decorate([u(cc.Float)], _j.prototype, "defaultVelocityStallDuration", undefined);
    __decorate([u({
      type: L.default,
      override: true
    })], _j.prototype, "displayController", undefined);
    return __decorate([C], _j);
  }(cc.Component);
  exports.default = c;
  cc._RF.pop();
}