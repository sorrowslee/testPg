if (!cc._RF.push(module, "676cajSckdANomyB/3kyE3c", "SpaceBarInterrupter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.spaceBarInterrupter = undefined;
  var T = require("BVFramework");
  var x = cc._decorator.ccclass;
  var L = new (function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C._interrupterArr = [];
      C._isPaused = false;
      C._isUIBlocked = false;
      C._isUIIdle = false;
      C._isReplaying = false;
      return C;
    }
    __extends(k, D);
    k.prototype.init = function (C) {
      var u = this;
      var c = T.getGameContext();
      c.emit("Game.RequestUIIdleState", undefined, function (p) {
        u._isUIIdle = p.response;
        u.subscribeEventInterrupter("default", undefined, u._isUIIdle ? C.spinButtonClickCallback : C.reelClickCallback);
        u._defaultConfig = C;
        c.on("Game.BlockUI", u._inUIBlockedState, u);
        c.on("Game.InUIIdleState", u._inUIIdleState, u);
        u._bindedSpaceBarEvent = u._handleSpaceBarEvent.bind(u);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, u._bindedSpaceBarEvent);
        c.on("Game.SkipEvent", u._onSpaceBarHit, u);
        c.on("Game.RequestReplay", u._replayStarted, u);
        c.on("Game.ReplayQuit", u._replayEnded, u);
      });
    };
    k.prototype._replayStarted = function () {
      this._isReplaying = true;
    };
    k.prototype._replayEnded = function () {
      this._isReplaying = false;
    };
    k.prototype.subscribeEventInterrupter = function (C, u, c) {
      var p = this._interrupterArr;
      for (var j = 0, l = p.length; j < l; j++) {
        if (p[j].event === C) {
          return;
        }
      }
      var G = {
        event: C,
        node: u,
        callback: c
      };
      p.push(G);
    };
    k.prototype.unsubscribeEventInterrupter = function (C) {
      var u = this._interrupterArr;
      for (var c = 0, p = u.length; c < p; c++) {
        if (u[c].event === C) {
          u.splice(c, 1);
          break;
        }
      }
    };
    k.prototype.pause = function () {
      if (this._defaultConfig) {
        if (!this._isPaused) {
          cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._bindedSpaceBarEvent);
          this._isPaused = true;
        }
      }
    };
    k.prototype.resume = function () {
      if (this._defaultConfig && this._isPaused) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._bindedSpaceBarEvent);
        this._isPaused = false;
      }
    };
    k.prototype.stop = function () {
      var C = T.getGameContext();
      C.off("Game.InUIIdleState", this._inUIIdleState, this);
      C.off("Game.BlockUI", this._inUIBlockedState, this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._bindedSpaceBarEvent);
      C.off("Game.SkipEvent", this._onSpaceBarHit, this);
      C.off("Game.RequestReplay", this._replayStarted, this);
      C.off("Game.ReplayQuit", this._replayEnded, this);
      this._defaultConfig = undefined;
      this._bindedSpaceBarEvent = undefined;
      this._interrupterArr.length = 0;
    };
    k.prototype._handleSpaceBarEvent = function (C) {
      if (C.keyCode === cc.macro.KEY.space) {
        this._onSpaceBarHit();
      }
    };
    k.prototype._onSpaceBarHit = function () {
      var C = this._interrupterArr;
      for (var u = C.length - 1; u >= 0; u--) {
        var c = C[u];
        var p = c.node;
        if (!p) {
          if (j = c.callback) {
            j();
          }
          break;
        }
        if (cc.isValid(p)) {
          if (p.active) {
            var j;
            if (j = c.callback) {
              j();
            }
            break;
          }
        } else {
          C.splice(u, 1);
        }
      }
    };
    k.prototype._inUIIdleState = function (C) {
      this._isUIIdle = C.payload;
      this._setDefaultInterrupter();
    };
    k.prototype._inUIBlockedState = function (C) {
      var u = C.payload;
      this._isUIBlocked = typeof u == "boolean" ? u : u.isBlocked;
      this._setDefaultInterrupter();
    };
    k.prototype._setDefaultInterrupter = function () {
      var C = this._isUIBlocked;
      var u = this._isUIIdle;
      var c = this._isReplaying;
      var p = this._interrupterArr[0];
      if (c) {
        p.callback = this._defaultConfig.spinButtonClickCallback;
      } else if (C) {
        p.callback &&= undefined;
      } else {
        var j = this._defaultConfig;
        var l = j.spinButtonClickCallback;
        var G = j.reelClickCallback;
        p.callback = u ? l : G;
      }
    };
    return __decorate([x("SpaceBarInterrupter")], k);
  }(cc.Object))();
  exports.spaceBarInterrupter = L;
  cc._RF.pop();
}