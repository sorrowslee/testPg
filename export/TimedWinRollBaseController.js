if (!cc._RF.push(module, "12aa3hO3pdL6oUvYmprts/7", "TimedWinRollBaseController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var L = require("NumberDisplayInterface");
  var D = {
    big: 0,
    mega: 1,
    superMega: 2,
    overflow: 3
  };
  var k = cc._decorator;
  var C = k.ccclass;
  var u = k.property;
  var p = function (G) {
    function V() {
      var Q = G !== null && G.apply(this, arguments) || this;
      Q.displayController = undefined;
      Q._accumulatedDt = 0;
      Q._previousThresholdTime = 0;
      Q._maxValue = -1;
      Q._numberReachIndex = 0;
      Q._numberCallbackList = [];
      Q._onNumReachedCallback = undefined;
      Q._onTimeReachedCallback = undefined;
      Q._lerp = undefined;
      Q._timeCallbackList = [];
      Q._isRolling = false;
      Q._winType = -1;
      Q._winStep = -1;
      Q._rollTime = [];
      Q._rollTo = [];
      Q._winThreshold = [];
      Q._winDuration = [];
      Q._totalWinDuration = [];
      return Q;
    }
    __extends(V, G);
    V.prototype.update = function () {};
    V.prototype.setNumbersCallback = function (Q) {
      this._numberCallbackList = Q;
    };
    V.prototype.setTimeCallback = function (Q, N) {
      this._timeCallbackList = Q;
      this._onTimeReachedCallback = N;
    };
    V.prototype.init = function (Q) {
      this._winThreshold = [Q.bigWinThreshold, Q.megaWinThreshold, Q.superMegaWinThreshold];
      this._winDuration = [Q.bigWinDuration, Q.megaWinDuration, Q.superMegaWinDuration];
      this._maxValue = Q.totalWin;
      this._totalWinDuration = [];
      for (var N = 0; N < 3; N++) {
        this._totalWinDuration[N] = this._winDuration[N].reduce(function (Y, W) {
          return Y + W;
        });
      }
      this._calculatePlayTime();
    };
    V.prototype.getWinType = function () {
      var Q = {
        winStyle: this._winType,
        winStep: this._winStep
      };
      return Q;
    };
    V.prototype.play = function (Q) {
      if (this._parametersSanityCheck()) {
        this._accumulatedDt = 0;
        this._numberReachIndex = 0;
        this._previousThresholdTime = 0;
        this._onNumReachedCallback = Q;
        this.displayController.clear();
        this.update = this._doRollNumber;
        this._isRolling = true;
      }
    };
    V.prototype.skip = function () {
      var Q = this;
      if (this._isRolling) {
        this.stop(false);
        this.displayController.displayNumber(this._maxValue, true, function () {
          if (Q._onNumReachedCallback) {
            Q._onNumReachedCallback(Q._maxValue);
          }
        });
      }
    };
    V.prototype.stop = function (Q = true) {
      if (Q) {
        this.displayController.clear();
        this._onNumReachedCallback = undefined;
        this._onTimeReachedCallback = undefined;
      }
      this._accumulatedDt = 0;
      this._isRolling = false;
      this.update = function () {};
    };
    V.prototype._parametersSanityCheck = function () {
      if (this._numberCallbackList) {
        this._numberCallbackList.length;
      }
      return !!this._winDuration && !!this._winThreshold && !(this._maxValue < 0);
    };
    V.prototype._calculatePlayTime = function () {
      var Q = this._maxValue;
      var N = this._winThreshold;
      var Y = this._totalWinDuration;
      var W = D;
      var q = N[W.superMega] + (N[W.superMega] - N[W.mega]) * Y[W.superMega] / Y[W.mega];
      var S = [];
      var z = [];
      if (Q < N[W.mega]) {
        this._winType = W.big;
        z[W.big] = Q;
        S[W.big] = this._calibrateWinTime(Q, 0, N[W.mega], W.big, 0);
      } else if (Q < N[W.superMega]) {
        this._winType = W.mega;
        z[W.big] = N[W.mega];
        S[W.big] = Y[W.big];
        z[W.mega] = Q;
        S[W.mega] = this._calibrateWinTime(Q, N[W.mega], N[W.superMega], W.mega, N[W.mega] / Y[W.big]);
      } else if (Q < q) {
        this._winType = W.superMega;
        z[W.big] = N[W.mega];
        S[W.big] = Y[W.big];
        z[W.mega] = N[W.superMega];
        S[W.mega] = Y[W.mega];
        z[W.superMega] = Q;
        S[W.superMega] = this._calibrateWinTime(Q, N[W.superMega], q, W.superMega, (N[W.superMega] - N[W.mega]) / Y[W.mega]);
      } else {
        this._winType = W.overflow;
        this._winStep = 0;
        z[W.big] = N[W.mega];
        z[W.mega] = N[W.superMega];
        z[W.superMega] = Q;
        S = Y;
      }
      this._rollTime = S;
      this._rollTo = z;
      this._lerp = j(0, this._rollTo[0]);
    };
    V.prototype._calibrateWinTime = function (Q, N, Y, W, q) {
      var S = this._totalWinDuration[W];
      for (var z = this._winDuration[W], f = (Q - N) / (Y - N), A = 0, M = 0; M < z.length; M++) {
        var E = A + z[M];
        if (f < E / S) {
          if (q) {
            if ((Q - N) / E >= q) {
              this._winStep = M + 1;
              return E;
            } else {
              this._winStep = M;
              return A;
            }
          } else if (A && f < (E + A) / 2 / S) {
            this._winStep = M;
            return A;
          } else {
            this._winStep = M + 1;
            return E;
          }
        }
        A = E;
      }
      return A;
    };
    V.prototype._doRollNumber = function (Q) {
      var N;
      var Y;
      var W;
      var q;
      var S;
      var z = (this._accumulatedDt += Q) - this._previousThresholdTime;
      var f = this._rollTime[0];
      if (z < f) {
        z += Q * (Math.random() * 0.2 - 0.1);
        N = this._lerp.evaluate(z / f);
      } else {
        var A = undefined;
        var M = undefined;
        do {
          A = this._rollTime.shift();
          f = this._rollTime[0];
          M = this._rollTo.shift();
          this._previousThresholdTime += A;
          z -= A;
        } while (f !== undefined && z >= f);
        if (f === undefined) {
          this._lerp = undefined;
          this._isRolling = false;
          this.update = function () {};
          N = this._maxValue;
        } else {
          if (this._winType === D.overflow && this._rollTime.length === 1) {
            var E = this._lerp.getDistance() / A;
            this._lerp = (Y = M, W = this._rollTo[0], S = W - Y - (q = E * f), {
              evaluate: function (F) {
                return Y + q * F + S * Math.pow(2, (F - 1) * 20);
              }
            });
          } else {
            this._lerp = j(M, this._rollTo[0]);
          }
          z += Q * (Math.random() * 0.2 - 0.1);
          N = this._lerp.evaluate(z / f);
        }
      }
      this._updateNumber(N);
      if (this._onTimeReachedCallback) {
        this._checkTimeReach(this._accumulatedDt);
      }
    };
    V.prototype._updateNumber = function (Q) {
      var N = this._numberCallbackList;
      var Y = this._maxValue;
      var W = Q;
      var q = false;
      var S = [];
      var z = this._onNumReachedCallback;
      if (N !== undefined) {
        while (N.length && N[0] <= Q) {
          var f = N.shift();
          S.push(f);
        }
      }
      if (Y <= Q) {
        this.stop(false);
        W = Y;
        q = true;
        S.push(Y);
        this._onNumReachedCallback = undefined;
      }
      this.displayController.displayNumber(W, q, function () {
        S.forEach(function (A) {
          if (z) {
            z(A);
          }
        });
      });
    };
    V.prototype._checkTimeReach = function (Q) {
      var N = this._timeCallbackList;
      if (N !== undefined && N.length && N[0] <= Q) {
        var Y = N.shift();
        this._onTimeReachedCallback(Y);
      }
    };
    __decorate([u({
      type: L.default,
      override: true
    })], V.prototype, "displayController", undefined);
    return __decorate([C], V);
  }(cc.Component);
  exports.default = p;
  cc._RF.pop();
}
function j(G, V) {
  var Q = V - G;
  var N = {
    evaluate: function (Y) {
      return G + Q * Y;
    },
    getDistance: function () {
      return Q;
    }
  };
  return N;
}