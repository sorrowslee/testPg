if (!cc._RF.push(module, "68d31au7EhCrrUj7l+wvSHd", "BigWinController")) {
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
      Q.tintNode = undefined;
      Q.numberRollNode = undefined;
      Q.buttonNode = undefined;
      Q.bigWinState = D.WinState.INITIAL;
      Q.winRollState = D.BigWinRollState.BIG_WIN;
      Q.finalWinAmount = 0;
      Q.isReplaying = false;
      Q.isSkip = false;
      Q.delayActiveSkipButton = 0.1;
      Q._tintOpacity = 150;
      Q._onCompleteCallback = undefined;
      Q._winRollController = undefined;
      return Q;
    }
    __extends(V, G);
    V.prototype.onDestroyed = function () {};
    V.prototype.onInit = function () {};
    V.prototype.onSetup = function () {};
    V.prototype.onPlay = function () {};
    V.prototype.onPlayBigWinEffect = function (Q) {
      Q();
    };
    V.prototype.onPlayPreMegaWinEffect = function () {};
    V.prototype.onPlayMegaWinEffect = function () {};
    V.prototype.onPlayPreSuperMegaWinEffect = function () {};
    V.prototype.onPlaySuperMegaWinEffect = function () {};
    V.prototype.onWinRollComplete = function () {};
    V.prototype.onSkip = function () {};
    V.prototype.onStop = function () {};
    V.prototype.onDismiss = function () {};
    V.prototype.onReset = function () {};
    V.prototype.destroy = function () {
      this.onDestroyed();
      this._winRollController.stop(true);
      this._winRollController = undefined;
      this.tintNode.stopAllActions();
      this.unscheduleAllCallbacks();
      this.node.stopAllActions();
      this.node.destroy();
      return G.prototype.destroy.call(this);
    };
    V.prototype.onButtonClick = function () {
      if (this.bigWinState === D.WinState.PLAYING) {
        this._skip();
      } else if (this.bigWinState === D.WinState.WAITING) {
        this._stop();
      }
    };
    V.prototype.init = function (Q) {
      this.onInit(Q);
      this._tintOpacity = this.tintNode.opacity;
      this._winRollController = this.numberRollNode.getComponent("TimedWinRollController");
    };
    V.prototype.setup = function (Q) {
      this.node.active = false;
      this.getWinThresholdCallback = Q.getWinThreshold;
      this.winDuration = Q.winDuration;
      this.onSetup(Q);
    };
    V.prototype.play = function (Q, N, Y, W, q) {
      if (this.bigWinState === D.WinState.INITIAL) {
        this.onPlay(q);
        this.isReplaying = W;
        this.bigWinState = D.WinState.PLAYING;
        this.winRollState = D.BigWinRollState.BIG_WIN;
        this.finalWinAmount = Q;
        this._onCompleteCallback = Y;
        this.isSkip = false;
        this.winThreshold = this.getWinThresholdCallback();
        this.tintNode.stopAllActions();
        this.tintNode.runAction(cc.fadeTo(0.1, this._tintOpacity));
        if (N > 0) {
          x.delayCallback(N)(this._startPlayEffect.bind(this));
        } else {
          this._startPlayEffect();
        }
      }
    };
    V.prototype._startWinRoll = function () {
      var Q = this._winRollController;
      var N = this.winThreshold;
      var Y = this.winDuration;
      Q.setNumbersCallback([N.megaWinThreshold * 0.95, N.megaWinThreshold, N.superMegaWinThreshold * 0.97, N.superMegaWinThreshold]);
      Q.init({
        bigWinThreshold: N.bigWinThreshold,
        megaWinThreshold: N.megaWinThreshold,
        superMegaWinThreshold: N.superMegaWinThreshold,
        bigWinDuration: Y.bigWinDuration,
        megaWinDuration: Y.megaWinDuration,
        superMegaWinDuration: Y.superMegaWinDuration,
        totalWin: this.finalWinAmount
      });
      Q.play(this._onValueReached.bind(this));
    };
    V.prototype._onValueReached = function (Q) {
      var N = this.winThreshold;
      if (Q >= N.megaWinThreshold * 0.95 && Q < N.megaWinThreshold && this.winRollState !== D.BigWinRollState.MEGA_WIN) {
        this.onPlayPreMegaWinEffect();
      } else if (Q >= N.megaWinThreshold && Q < N.superMegaWinThreshold && this.winRollState !== D.BigWinRollState.MEGA_WIN) {
        this.winRollState = D.BigWinRollState.MEGA_WIN;
        this.onPlayMegaWinEffect();
      } else if (Q >= N.superMegaWinThreshold * 0.97 && Q < N.superMegaWinThreshold && this.winRollState !== D.BigWinRollState.SUPER_MEGA_WIN) {
        this.onPlayPreSuperMegaWinEffect();
      } else if (Q >= N.superMegaWinThreshold && this.winRollState !== D.BigWinRollState.SUPER_MEGA_WIN) {
        this.winRollState = D.BigWinRollState.SUPER_MEGA_WIN;
        this.onPlaySuperMegaWinEffect();
      }
      if (Q >= this.finalWinAmount) {
        this._winRollComplete();
      }
    };
    V.prototype._winRollComplete = function () {
      if (this.bigWinState === D.WinState.PLAYING) {
        this.bigWinState = D.WinState.WAITING;
        this.onWinRollComplete();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this._activeStopButton, 1);
        var Q = this.isReplaying ? D.REPLAY_WIN_HOLD_DURATION : D.NORMAL_WIN_HOLD_DURATION;
        this.scheduleOnce(this._stop, Q);
        L.emitGameEffectStateChangedEvent({
          displayState: "DidUpdate",
          effectType: "BigWin"
        });
      }
    };
    V.prototype._startPlayEffect = function () {
      var Q = this.node;
      Q.active = true;
      Q.opacity = 0;
      Q.stopAllActions();
      Q.runAction(cc.fadeIn(0.1));
      this._playBigWinEffect();
    };
    V.prototype._playBigWinEffect = function () {
      var Q = this;
      this.onPlayBigWinEffect(function () {
        Q._startWinRoll();
        x.delayCallback(Q.delayActiveSkipButton)(Q._activeStopButton.bind(Q));
      });
    };
    V.prototype._skip = function () {
      this._inactiveStopButton();
      this.isSkip = true;
      this.onSkip();
      this.unscheduleAllCallbacks();
      this._winRollController.skip();
    };
    V.prototype._stop = function () {
      if (this.bigWinState === D.WinState.WAITING) {
        this._inactiveStopButton();
        this.bigWinState = D.WinState.DISMISING;
        this.onStop();
        L.emitGameEffectStateChangedEvent({
          displayState: "WillEnd",
          effectType: "BigWin"
        });
        x.delayCallback(0.5)(this._dismiss.bind(this));
      }
    };
    V.prototype._dismiss = function () {
      if (this.bigWinState === D.WinState.DISMISING) {
        this.onDismiss();
        var Q = this.node;
        Q.stopAllActions();
        Q.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(this._completeShowBigWin, this)));
      }
    };
    V.prototype._activeStopButton = function () {
      if (!this.buttonNode.active) {
        T.spaceBarInterrupter.subscribeEventInterrupter("bigwin", this.node, this.onButtonClick.bind(this));
        this.buttonNode.active = true;
      }
    };
    V.prototype._inactiveStopButton = function () {
      if (this.buttonNode.active) {
        T.spaceBarInterrupter.unsubscribeEventInterrupter("bigwin");
        this.buttonNode.active = false;
      }
    };
    V.prototype._completeShowBigWin = function () {
      var Q = this._onCompleteCallback;
      this._reset();
      if (Q) {
        Q();
      }
    };
    V.prototype._reset = function () {
      this.onReset();
      this.bigWinState = D.WinState.INITIAL;
      this.winRollState = D.BigWinRollState.BIG_WIN;
      this.isSkip = false;
      this._winRollController.stop(true);
      this.finalWinAmount = 0;
      this._onCompleteCallback = undefined;
      this.tintNode.stopAllActions();
      this.unscheduleAllCallbacks();
      this.node.stopAllActions();
      this.node.active = false;
    };
    __decorate([p(cc.Node)], V.prototype, "tintNode", undefined);
    __decorate([p(cc.Node)], V.prototype, "numberRollNode", undefined);
    __decorate([p(cc.Node)], V.prototype, "buttonNode", undefined);
    return __decorate([C], V);
  }(cc.Component);
  exports.default = j;
  cc._RF.pop();
}