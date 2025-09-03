if (!cc._RF.push(module, "d2312uy7dZCAaD3zr1W6wqW", "AppState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.APPStateStatus = undefined;
  var T;
  var x = require("Utils");
  var L = require("GeneralSlotTemplate");
  (function (k) {
    k[k.Ready = 0] = "Ready";
    k[k.Running = 1] = "Running";
    k[k.Exiting = 2] = "Exiting";
    k[k.End = 3] = "End";
  })(T = exports.APPStateStatus ||= {});
  var D = function () {
    // 建構子：設定資料來源、控制器池與離開回呼
    function k(p, j, l) {
      this.name = "App State";
      this.appStateStatus = T.Ready;
      this.setDataSource(p);
      this.setControllerPool(j);
      this.setExitCallback(l);
      this.onReady();
    }
    var C = {
      get: function () {
        return this.appStateStatus === T.Ready;
      },
      enumerable: false,
      configurable: true
    };
    var u = {
      get: function () {
        return this.appStateStatus === T.Running;
      },
      enumerable: false,
      configurable: true
    };
    var c = {
      get: function () {
        return this.appStateStatus === T.Exiting;
      },
      enumerable: false,
      configurable: true
    };
    // 預留事件監聽器，可由子類別實作
    k.prototype.eventListener = function () {};
    Object.defineProperty(k.prototype, "isStateReady", C);
    Object.defineProperty(k.prototype, "isStateRunning", u);
    Object.defineProperty(k.prototype, "isStateExiting", c);
    Object.defineProperty(k.prototype, "isStateEnd", {
      get: function () {
        return this.appStateStatus === T.End;
      },
      enumerable: false,
      configurable: true
    });
    // 設定資料來源
    k.prototype.setDataSource = function (p) {
      this.dataSource = p;
    };
    // 設定控制器池
    k.prototype.setControllerPool = function (p) {
      this.controllerPool = p;
    };
    // 設定結束時的回呼函式
    k.prototype.setExitCallback = function (p) {
      this.finalCallback = p;
    };
    // 將狀態切換為執行中
    k.prototype.run = function () {
      this.appStateStatus = T.Running;
      this.onRun();
    };
    // 請求離開狀態
    k.prototype.exit = function (p) {
      var j = this;
      if (!this.isStateExiting && !this.isStateEnd) {
        this.appStateStatus = T.Exiting;
        this.onExit(function () {
          if (p == null ? undefined : p.before) {
            p.before();
          }
          var l = j.finalCallback;
          j.finalCallback = undefined;
          j.destroy();
          if (L.GSTConfig.disableStateExitDefer) {
            j.appStateStatus = T.End;
            if (l) {
              l();
            }
            if (p == null ? undefined : p.after) {
              p.after();
            }
          } else {
            x.deferCallback(true)(function () {
              x.deferCallback(true)(function () {
                j.appStateStatus = T.End;
                if (l) {
                  l();
                }
                if (p == null ? undefined : p.after) {
                  p.after();
                }
              });
            });
          }
        });
      }
    };
    // 強制離開狀態
    k.prototype.forceExit = function (p) {
      var j = this;
      this.appStateStatus = T.Exiting;
      this.onForceExit(function () {
        if (p == null ? undefined : p.before) {
          p.before();
        }
        var l = j.finalCallback;
        j.finalCallback = undefined;
        j.destroy();
        if (L.GSTConfig.disableStateExitDefer) {
          j.appStateStatus = T.End;
          if (l) {
            l();
          }
          if (p == null ? undefined : p.after) {
            p.after();
          }
        } else {
          x.deferCallback(true)(function () {
            x.deferCallback(true)(function () {
              j.appStateStatus = T.End;
              if (l) {
                l();
              }
              if (p == null ? undefined : p.after) {
                p.after();
              }
            });
          });
        }
      });
    };
    // 銷毀狀態並清理參考
    k.prototype.destroy = function () {
      var p = this;
      this.onDestroy(function () {
        p.dataSource = undefined;
        p.finalCallback = undefined;
        p.controllerPool = undefined;
      });
    };
    // 派發事件給當前監聽器
    k.prototype.dispatchEvent = function (p, j) {
      this.eventListener(p, j);
    };
    return k;
  }();
  exports.default = D;
  cc._RF.pop();
}