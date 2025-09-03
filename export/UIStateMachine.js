if (!cc._RF.push(module, "c32dchyVoJJ6YgRw+Shog7m", "UIStateMachine")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = require("UIState");
  (function (D) {
    D[D.Ready = 0] = "Ready";
    D[D.Running = 1] = "Running";
    D[D.Exiting = 2] = "Exiting";
    D[D.End = 3] = "End";
  })(T ||= {});
  var L = function () {
    function D(k) {
      // 建立狀態機並設定取得下一狀態與退出回呼
      this._previousUIState = undefined;
      this._currentUIState = undefined;
      this._stateMachineStatus = T.Ready;
      this._getNextUIState = k.getNextUIState;
      this._exitUIStateMachineCallback = k.exitUIStateMachineCallback;
    }
    Object.defineProperty(D.prototype, "previousUIState", {
      get: function () {
        return this._previousUIState;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "currentUIState", {
      get: function () {
        return this._currentUIState;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "isStateReady", {
      get: function () {
        return this._stateMachineStatus === T.Ready;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(D.prototype, "isStateRunning", {
      get: function () {
        return this._stateMachineStatus === T.Running;
      },
      enumerable: false,
      configurable: true
    });
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
    D.prototype.setExitUIStateMachineCallback = function (k) {
      // 設定狀態機結束時的回呼
      this._exitUIStateMachineCallback = k;
    };
    D.prototype.run = function () {
      // 開始執行狀態機並評估狀態
      if (this.isStateReady) {
        this._stateMachineStatus = T.Running;
        this._evaluateState();
      }
    };
    D.prototype.exit = function (k) {
      // 退出狀態機並強制當前狀態結束
      if (!this.isStateExiting && !this.isStateEnd) {
        this._stateMachineStatus = T.Exiting;
        var C = this.currentUIState;
        if (C) {
          C.setExitCallback(this._exit.bind(this));
          C.forceExit(k);
        }
      }
    };
    D.prototype.dispatchEvent = function (k, C) {
      // 將事件傳給目前狀態
      if (this.isStateRunning) {
        var u = this.currentUIState;
        if (u && u.dispatchEvent) {
          u.dispatchEvent(k, C);
        }
      }
    };
    D.prototype.destroy = function () {
      // 清除狀態機回呼
      this._exitUIStateMachineCallback = undefined;
      this._getNextUIState = undefined;
    };
    D.prototype._evaluateState = function () {
      // 取得下一個 UI 狀態並處理轉換
      var k = this;
      if (this.isStateRunning) {
        var C = this._getNextUIState();
        this._previousUIState = this.currentUIState;
        this._currentUIState = undefined;
        switch (true) {
          case C instanceof x.default:
            var u = this._currentUIState = C;
            u.setExitCallback(this._evaluateState.bind(this));
            u.run();
            break;
          case typeof C == "object":
            var c = C;
            var p = c.nextState;
            var j = c.enterStateTransition;
            var G = c.exitStateTransition;
            this._currentUIState = p;
            p.setExitCallback(function () {
              if (G) {
                G(function () {
                  if (k.isStateRunning) {
                    k._evaluateState();
                  }
                });
              } else {
                k._evaluateState();
              }
            });
            if (j) {
              j(function () {
                if (k.isStateRunning) {
                  p.run();
                }
              });
            } else {
              p.run();
            }
            break;
          case C === undefined:
            this._stateMachineStatus = T.Exiting;
            this._exit();
        }
      }
    };
    D.prototype._exit = function () {
      // 完成狀態機離開流程
      if (!this.isStateEnd) {
        this._stateMachineStatus = T.End;
        var k = this._exitUIStateMachineCallback;
        this._exitUIStateMachineCallback = undefined;
        if (k) {
          k();
        }
      }
    };
    return D;
  }();
  exports.default = L;
  cc._RF.pop();
}