if (!cc._RF.push(module, "4267crib8ZEZLPPtFcOTt7i", "UIState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UIStateStatus = undefined;
  var T;
  var x = require("Utils");
  var L = require("GeneralSlotTemplate");
  (function (k) {
    k[k.Ready = 0] = "Ready";
    k[k.Running = 1] = "Running";
    k[k.Exiting = 2] = "Exiting";
    k[k.End = 3] = "End";
  })(T = exports.UIStateStatus ||= {});
  var D = function () {
    function k(j, l, G) {
      this.name = "UI State";
      this.uiStateStatus = T.Ready;
      this.setDataSource(j);
      this.setControllerPool(l);
      this.setExitCallback(G);
      this.onReady();
    }
    var C = {
      get: function () {
        return this.uiStateStatus === T.Ready;
      },
      enumerable: false,
      configurable: true
    };
    var u = {
      get: function () {
        return this.uiStateStatus === T.Running;
      },
      enumerable: false,
      configurable: true
    };
    var c = {
      get: function () {
        return this.uiStateStatus === T.Exiting;
      },
      enumerable: false,
      configurable: true
    };
    var p = {
      get: function () {
        return this.uiStateStatus === T.End;
      },
      enumerable: false,
      configurable: true
    };
    k.prototype.eventListener = function () {};
    Object.defineProperty(k.prototype, "isStateReady", C);
    Object.defineProperty(k.prototype, "isStateRunning", u);
    Object.defineProperty(k.prototype, "isStateExiting", c);
    Object.defineProperty(k.prototype, "isStateEnd", p);
    k.prototype.setDataSource = function (j) {
      this.dataSource = j;
    };
    k.prototype.setControllerPool = function (j) {
      this.controllerPool = j;
    };
    k.prototype.setExitCallback = function (j) {
      this.finalCallback = j;
    };
    k.prototype.run = function () {
      this.uiStateStatus = T.Running;
      this.onRun();
    };
    k.prototype.exit = function (j) {
      var l = this;
      if (!this.isStateExiting && !this.isStateEnd) {
        this.uiStateStatus = T.Exiting;
        this.onExit(function () {
          if (j == null ? undefined : j.before) {
            j.before();
          }
          var G = l.finalCallback;
          l.finalCallback = undefined;
          l.destroy();
          if (L.GSTConfig.disableStateExitDefer) {
            l.uiStateStatus = T.End;
            if (G) {
              G();
            }
            if (j == null ? undefined : j.after) {
              j.after();
            }
          } else {
            x.deferCallback(true)(function () {
              x.deferCallback(true)(function () {
                l.uiStateStatus = T.End;
                if (G) {
                  G();
                }
                if (j == null ? undefined : j.after) {
                  j.after();
                }
              });
            });
          }
        });
      }
    };
    k.prototype.forceExit = function (j) {
      var l = this;
      this.uiStateStatus = T.Exiting;
      this.onForceExit(function () {
        if (j == null ? undefined : j.before) {
          j.before();
        }
        var G = l.finalCallback;
        l.finalCallback = undefined;
        l.destroy();
        if (L.GSTConfig.disableStateExitDefer) {
          l.uiStateStatus = T.End;
          if (G) {
            G();
          }
          if (j == null ? undefined : j.after) {
            j.after();
          }
        } else {
          x.deferCallback(true)(function () {
            x.deferCallback(true)(function () {
              l.uiStateStatus = T.End;
              if (G) {
                G();
              }
              if (j == null ? undefined : j.after) {
                j.after();
              }
            });
          });
        }
      });
    };
    k.prototype.destroy = function () {
      var j = this;
      this.onDestroy(function () {
        j.dataSource = undefined;
        j.finalCallback = undefined;
        j.controllerPool = undefined;
      });
    };
    k.prototype.dispatchEvent = function (j, l) {
      this.eventListener(j, l);
    };
    return k;
  }();
  exports.default = D;
  cc._RF.pop();
}