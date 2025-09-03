if (!cc._RF.push(module, "99b03/f499C5qBVb5FCdxDf", "AppStateMachine")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = require("AppState");
  (function (D) {
    D[D.Ready = 0] = "Ready";
    D[D.Running = 1] = "Running";
    D[D.Exiting = 2] = "Exiting";
    D[D.End = 3] = "End";
  })(T ||= {});
  var L = function () {
    function D(p) {
      this._previousAppState = undefined;
      this._currentAppState = undefined;
      this._stateMachineStatus = T.Ready;
      this._getNextAppState = p.getNextAppState;
      this._exitAppStateMachineCallback = p.exitAppStateMachineCallback;
    }
    var k = {
      get: function () {
        return this._previousAppState;
      },
      enumerable: false,
      configurable: true
    };
    var C = {
      get: function () {
        return this._currentAppState;
      },
      enumerable: false,
      configurable: true
    };
    var u = {
      get: function () {
        return this._stateMachineStatus === T.Ready;
      },
      enumerable: false,
      configurable: true
    };
    var c = {
      get: function () {
        return this._stateMachineStatus === T.Running;
      },
      enumerable: false,
      configurable: true
    };
    Object.defineProperty(D.prototype, "previousAppState", k);
    Object.defineProperty(D.prototype, "currentAppState", C);
    Object.defineProperty(D.prototype, "isStateReady", u);
    Object.defineProperty(D.prototype, "isStateRunning", c);
    Object.defineProperty(D.prototype, "isStateExiting", {
      get: function () {
        return this._stateMachineStatus === T.Exiting;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "isStateEnd", {
      get: function () {
        return this._stateMachineStatus === T.End;
      },
      enumerable: false,
      configurable: true
    });
    D.prototype.setExitAppStateMachineCallback = function (p) {
      this._exitAppStateMachineCallback = p;
    };
    D.prototype.run = function () {
      if (this.isStateReady) {
        this._stateMachineStatus = T.Running;
        this._evaluateState();
      }
    };
    D.prototype.exit = function (p) {
      if (!this.isStateExiting && !this.isStateEnd) {
        this._stateMachineStatus = T.Exiting;
        var j = this.currentAppState;
        if (j) {
          j.setExitCallback(this._exit.bind(this));
          j.forceExit(p);
        }
      }
    };
    D.prototype.dispatchEvent = function (p, j) {
      if (this.isStateRunning) {
        var l = this.currentAppState;
        if (l && l.dispatchEvent) {
          l.dispatchEvent(p, j);
        }
      }
    };
    D.prototype.destroy = function () {
      this._exitAppStateMachineCallback = undefined;
      this._getNextAppState = undefined;
    };
    D.prototype._evaluateState = function () {
      var p = this;
      if (this.isStateRunning) {
        var j = this._getNextAppState();
        this._previousAppState = this.currentAppState;
        this._currentAppState = undefined;
        switch (true) {
          case j instanceof x.default:
            var G = this._currentAppState = j;
            G.setExitCallback(this._evaluateState.bind(this));
            G.run();
            break;
          case typeof j == "object":
            var V = j;
            var Q = V.nextState;
            var N = V.enterStateTransition;
            var Y = V.exitStateTransition;
            this._currentAppState = Q;
            Q.setExitCallback(function () {
              if (Y) {
                Y(function () {
                  if (p.isStateRunning) {
                    p._evaluateState();
                  }
                });
              } else {
                p._evaluateState();
              }
            });
            if (N) {
              N(function () {
                if (p.isStateRunning) {
                  Q.run();
                }
              });
            } else {
              Q.run();
            }
            break;
          case j === undefined:
            this._stateMachineStatus = T.Exiting;
            this._exit();
        }
      }
    };
    D.prototype._exit = function () {
      if (!this.isStateEnd) {
        this._stateMachineStatus = T.End;
        var p = this._exitAppStateMachineCallback;
        this._exitAppStateMachineCallback = undefined;
        if (p) {
          p();
        }
      }
    };
    return D;
  }();
  exports.default = L;
  cc._RF.pop();
}