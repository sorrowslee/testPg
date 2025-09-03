if (!cc._RF.push(module, "2d856BrsX1JrKn92k3tMGw+", "TotalWinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SpaceBarInterrupter");
  var x = require("Utils");
  var L = require("GameEventHandler");
  var D = require("WinTemplateConstant");
  var k = cc._decorator;
  var C = k.ccclass;
  var p = k.property;
  var j = function (G) {
    function V() {
      var Q = G !== null && G.apply(this, arguments) || this;
      Q.skipNode = undefined;
      Q.collectButton = undefined;
      Q.winAmountNode = undefined;
      Q.totalWinState = D.WinState.INITIAL;
      Q.winAmount = 0;
      Q.isReplaying = false;
      Q._onCompleteCallback = undefined;
      Q._willCompleteCallback = undefined;
      Q._numberRollController = undefined;
      return Q;
    }
    __extends(V, G);
    V.prototype.onDestroyed = function () {};
    V.prototype.onInit = function () {};
    V.prototype.onSetup = function () {};
    V.prototype.onPlay = function () {};
    V.prototype.onWinRollStart = function () {};
    V.prototype.onWinRollComplete = function (Q) {
      Q();
    };
    V.prototype.onCollect = function (Q) {
      Q();
    };
    V.prototype.onStop = function () {};
    V.prototype.onDismiss = function () {};
    V.prototype.onReset = function () {};
    V.prototype.destroy = function () {
      this.onDestroyed();
      this._numberRollController.stop(true);
      this._numberRollController = undefined;
      this.winAmount = 0;
      this._willCompleteCallback = undefined;
      this._onCompleteCallback = undefined;
      this.unscheduleAllCallbacks();
      var Q = this.node;
      Q.stopAllActions();
      Q.destroy();
      return G.prototype.destroy.call(this);
    };
    V.prototype.init = function (Q) {
      this.onInit(Q);
      this._numberRollController = this.winAmountNode.getComponent("NumberRollController");
    };
    V.prototype.setup = function (Q) {
      this.node.active = false;
      this.onSetup(Q);
    };
    V.prototype.onCollectButtonClick = function () {
      var Q = this;
      if (this.collectButton.interactable) {
        this._inactiveCollectButton();
        this.unscheduleAllCallbacks();
        this.onCollect(function () {
          Q._stop();
        });
      }
    };
    V.prototype.onSkipButtonClick = function () {
      this._skipNumberRoll();
    };
    V.prototype.setWillCompleteCallback = function (Q) {
      this._willCompleteCallback = Q;
    };
    V.prototype.play = function (Q, N, Y, W, q) {
      if (this.totalWinState === D.WinState.INITIAL) {
        L.emitGameEffectStateChangedEvent({
          displayState: "Start",
          effectType: "TotalWin"
        });
        var z = this.node;
        z.active = true;
        z.opacity = 0;
        z.stopAllActions();
        z.runAction(cc.fadeIn(0.3));
        this._inactiveCollectButton();
        this.isReplaying = W;
        this.totalWinState = D.WinState.PLAYING;
        this.winAmount = Q;
        this._onCompleteCallback = Y;
        this.onPlay(q);
        if (N > 0) {
          x.delayCallback(N)(this._startWinRoll.bind(this));
        } else {
          this._startWinRoll();
        }
      }
    };
    V.prototype._startWinRoll = function () {
      x.delayCallback(1)(this._activeSkipButton.bind(this));
      this.onWinRollStart();
      this._numberRollController.play(0, this.winAmount, this._winRollComplete.bind(this));
    };
    V.prototype._skipNumberRoll = function () {
      this._inactiveSkipButton();
      this._numberRollController.skip();
    };
    V.prototype._winRollComplete = function () {
      var Q = this;
      if (this.totalWinState === D.WinState.PLAYING) {
        this.totalWinState = D.WinState.WAITING;
        this._inactiveSkipButton();
        this.onWinRollComplete(function () {
          L.emitGameEffectStateChangedEvent({
            displayState: "DidUpdate",
            effectType: "TotalWin"
          });
          var Y = Q.isReplaying ? D.REPLAY_WIN_HOLD_DURATION : D.NORMAL_WIN_HOLD_DURATION;
          Q.unscheduleAllCallbacks();
          Q.scheduleOnce(Q.onCollectButtonClick, Y);
          Q._activeCollectButton();
        });
      }
    };
    V.prototype._stop = function () {
      if (this.totalWinState === D.WinState.WAITING) {
        this.totalWinState = D.WinState.DISMISING;
        this._inactiveCollectButton();
        this._inactiveSkipButton();
        this.onStop();
        this.unscheduleAllCallbacks();
        L.emitGameEffectStateChangedEvent({
          displayState: "WillEnd",
          effectType: "TotalWin"
        });
        if (this._willCompleteCallback) {
          var N = this._willCompleteCallback;
          this._willCompleteCallback = undefined;
          N(this._dismiss.bind(this));
        } else {
          this._dismiss();
        }
      }
    };
    V.prototype._dismiss = function () {
      if (this.totalWinState === D.WinState.DISMISING) {
        this.onDismiss();
        var Q = this.node;
        Q.stopAllActions();
        Q.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(this._completeShowTotalWin, this)));
      }
    };
    V.prototype._completeShowTotalWin = function () {
      L.emitGameEffectStateChangedEvent({
        displayState: "End",
        effectType: "TotalWin"
      });
      var N = this._onCompleteCallback;
      this._reset();
      if (N) {
        N();
      }
    };
    V.prototype._activeSkipButton = function () {
      if (!this.skipNode.active) {
        T.spaceBarInterrupter.subscribeEventInterrupter("totalwin", this.node, this._skipNumberRoll.bind(this));
        this.skipNode.active = true;
      }
    };
    V.prototype._inactiveSkipButton = function () {
      if (this.skipNode.active) {
        T.spaceBarInterrupter.unsubscribeEventInterrupter("totalwin");
        this.skipNode.active = false;
      }
    };
    V.prototype._activeCollectButton = function () {
      this.collectButton.interactable = true;
      T.spaceBarInterrupter.subscribeEventInterrupter("totalwinbtn", this.node, this.onCollectButtonClick.bind(this));
    };
    V.prototype._inactiveCollectButton = function () {
      this.collectButton.interactable = false;
      T.spaceBarInterrupter.unsubscribeEventInterrupter("totalwinbtn");
    };
    V.prototype._reset = function () {
      this.onReset();
      this.unscheduleAllCallbacks();
      this._numberRollController.stop(true);
      this.totalWinState = D.WinState.INITIAL;
      this.winAmount = 0;
      this._onCompleteCallback = undefined;
      var Q = this.node;
      Q.stopAllActions();
      Q.active = false;
    };
    __decorate([p(cc.Node)], V.prototype, "skipNode", undefined);
    __decorate([p(cc.Button)], V.prototype, "collectButton", undefined);
    __decorate([p(cc.Node)], V.prototype, "winAmountNode", undefined);
    return __decorate([C], V);
  }(cc.Component);
  exports.default = j;
  cc._RF.pop();
}