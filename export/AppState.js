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
    k.prototype.setDataSource = function (p) {
      this.dataSource = p;
    };
    k.prototype.setControllerPool = function (p) {
      this.controllerPool = p;
    };
    k.prototype.setExitCallback = function (p) {
      this.finalCallback = p;
    };
    k.prototype.run = function () {
      this.appStateStatus = T.Running;
      this.onRun();
    };
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
    k.prototype.destroy = function () {
      var p = this;
      this.onDestroy(function () {
        p.dataSource = undefined;
        p.finalCallback = undefined;
        p.controllerPool = undefined;
      });
    };
    k.prototype.dispatchEvent = function (p, j) {
      this.eventListener(p, j);
    };
    return k;
  }();
  exports.default = D;
  cc._RF.pop();
}