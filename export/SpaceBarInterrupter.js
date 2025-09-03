if (!cc._RF.push(module, "676cajSckdANomyB/3kyE3c", "SpaceBarInterrupter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.spaceBarInterrupter = undefined;
  var T = require("BVFramework");
  var x = cc._decorator.ccclass;
  var L = new (function (D) {
    // 建構函式，初始化狀態與攔截器列表
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
    // 初始化並綁定空白鍵事件與相關遊戲事件
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
    // 重播開始時設定旗標
    k.prototype._replayStarted = function () {
      this._isReplaying = true;
    };
    // 重播結束時清除旗標
    k.prototype._replayEnded = function () {
      this._isReplaying = false;
    };
    // 新增空白鍵攔截事件
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
    // 移除指定的攔截事件
    k.prototype.unsubscribeEventInterrupter = function (C) {
      var u = this._interrupterArr;
      for (var c = 0, p = u.length; c < p; c++) {
        if (u[c].event === C) {
          u.splice(c, 1);
          break;
        }
      }
    };
    // 暫停監聽空白鍵
    k.prototype.pause = function () {
      if (this._defaultConfig) {
        if (!this._isPaused) {
          cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._bindedSpaceBarEvent);
          this._isPaused = true;
        }
      }
    };
    // 恢復監聽空白鍵
    k.prototype.resume = function () {
      if (this._defaultConfig && this._isPaused) {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._bindedSpaceBarEvent);
        this._isPaused = false;
      }
    };
    // 停止並清除所有監聽與設定
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
    // 監聽鍵盤事件，捕捉空白鍵
    k.prototype._handleSpaceBarEvent = function (C) {
      if (C.keyCode === cc.macro.KEY.space) {
        this._onSpaceBarHit();
      }
    };
    // 空白鍵被觸發時依序執行攔截器回呼
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
    // UI 進入閒置狀態時更新旗標
    k.prototype._inUIIdleState = function (C) {
      this._isUIIdle = C.payload;
      this._setDefaultInterrupter();
    };
    // UI 被阻擋時更新旗標
    k.prototype._inUIBlockedState = function (C) {
      var u = C.payload;
      this._isUIBlocked = typeof u == "boolean" ? u : u.isBlocked;
      this._setDefaultInterrupter();
    };
    // 根據狀態決定預設的攔截回呼
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