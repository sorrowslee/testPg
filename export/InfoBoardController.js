if (!cc._RF.push(module, "11be0T+CdBGtrhmlBETkYkM", "InfoBoardController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InfoBoardShowState = exports.InfoboardUIState = undefined;
  var T;
  var x;
  var L = require("Utils");
  var D = require("InfoboardMessageController");
  var k = require("SpaceBarInterrupter");
  var C = require("AudioConstant");
  var j = require("AudioManager");
  var G = require("WBSGameUtils");
  var V = require("GameConstant");
  var Q = cc._decorator;
  var N = Q.ccclass;
  var Y = Q.property;
  (function (q) {
    q[q.BEFORE_FINAL_WIN = 0] = "BEFORE_FINAL_WIN";
    q[q.SMALL_WIN = 1] = "SMALL_WIN";
    q[q.MEDIUM_WIN = 2] = "MEDIUM_WIN";
    q[q.NORMAL_TIPS = 3] = "NORMAL_TIPS";
    q[q.FREE_SPIN_TIPS = 4] = "FREE_SPIN_TIPS";
    q[q.FREE_SPIN_WON_TIPS = 5] = "FREE_SPIN_WON_TIPS";
    q[q.SCATTER_REQUEST_TIP = 6] = "SCATTER_REQUEST_TIP";
  })(T = exports.InfoboardUIState ||= {});
  (function (q) {
    q[q.BEFORE_FINAL_PAY_WIN = 0] = "BEFORE_FINAL_PAY_WIN";
    q[q.LOW_PAY_WIN = 1] = "LOW_PAY_WIN";
    q[q.LOW_PAY_TOTAL_WIN = 2] = "LOW_PAY_TOTAL_WIN";
    q[q.HIGH_PAY_WIN = 3] = "HIGH_PAY_WIN";
    q[q.HIGH_PAY_TOTAL_WIN = 4] = "HIGH_PAY_TOTAL_WIN";
    q[q.INSTANT_HIGH_PAY_TOTAL_WIN = 5] = "INSTANT_HIGH_PAY_TOTAL_WIN";
    q[q.HIGH_PAY_BIG_TOTAL_WIN = 6] = "HIGH_PAY_BIG_TOTAL_WIN";
  })(x = exports.InfoBoardShowState ||= {});
  var W = function (q) {
    function S() {
      var z = q !== null && q.apply(this, arguments) || this;
      z.infoBoardMessageController = undefined;
      z.skipButtonNode = undefined;
      z.infobar = [];
      z.infobarMaskNode = undefined;
      z.infobarMask = [];
      z.swAAnim = undefined;
      z.swB = undefined;
      z.mwAAnim = undefined;
      z.mwDAnim = undefined;
      z.mwFAnim = undefined;
      z.mwGAnim = undefined;
      z.mwB = undefined;
      z.vfxCAnim = undefined;
      z.vfxE = undefined;
      z.winTextNode = undefined;
      z._spinTipsObj = Object.create(null);
      z._infoUIState = undefined;
      z._playState = undefined;
      z._isNormalTips = false;
      z._multipliedCrowdValue = 0;
      z._isUpgrade = false;
      z._disposeShowTips = undefined;
      return z;
    }
    __extends(S, q);
    S.prototype.init = function (z) {
      this._spinTipsObj[T.NORMAL_TIPS] = z.normalSpinTips;
      this._spinTipsObj[T.FREE_SPIN_TIPS] = z.freeSpinTips;
      this._spinTipsObj[T.SCATTER_REQUEST_TIP] = [z.scatterRequestTip];
      this._spinTipsObj[T.FREE_SPIN_WON_TIPS] = [z.freeSpinWonTip];
      this.infoBoardMessageController.winText.spriteFrame = z.winText;
      this.infoBoardMessageController.totalText.spriteFrame = z.totalWinText;
      this.infoBoardMessageController.initNumberDisplayNodeEvent();
      if (V.isRTL) {
        this.winTextNode.getComponent(cc.Layout).horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
      }
    };
    S.prototype.showTips = function (z, A) {
      var M = this;
      if (A === undefined) {
        A = false;
      }
      this._isNormalTips = z === T.NORMAL_TIPS;
      this.infobarMaskNode.active = true;
      if (this._infoUIState !== z) {
        this.resetWinEffect();
        var E = A ? 0 : 0.5;
        function F() {
          M._playFadeOutAction(M.swB);
          M._playFadeOutAction(M.mwB);
          M._isUpgrade = false;
          M._disposeShowTips = undefined;
          M._resetUI();
          M._infoUIState = z;
          M.infoBoardMessageController.setSprites(M._spinTipsObj[M._infoUIState]);
          M.infoBoardMessageController.showInfoboardMessage();
          M.infoBoardMessageController.clear(true);
        }
        if (this._disposeShowTips) {
          this._disposeShowTips();
        }
        this._disposeShowTips = undefined;
        if (E) {
          this._disposeShowTips = L.delayCallback(E)(F);
        } else {
          F();
        }
      }
    };
    S.prototype.showScatterRequestTip = function () {
      if (this._infoUIState !== T.SCATTER_REQUEST_TIP) {
        this.infobarMaskNode.active = true;
        if (this._disposeShowTips) {
          this._disposeShowTips();
        }
        this._disposeShowTips = undefined;
        this._resetUI();
        this._infoUIState = T.SCATTER_REQUEST_TIP;
        this.infoBoardMessageController.setSprites(this._spinTipsObj[this._infoUIState]);
        this.infoBoardMessageController.showInfoboardMessage();
        this.infoBoardMessageController.clear(true);
        this.infoBoardMessageController.spriteMessageNode.runAction(cc.sequence(cc.scaleTo(0.3, 1.1).easing(cc.easeIn(0.2)), cc.scaleTo(0.3, 1).easing(cc.easeIn(0.2)), cc.delayTime(0.24)).repeatForever());
      }
    };
    S.prototype.showFreeSpinWonTip = function () {
      if (this._infoUIState !== T.FREE_SPIN_WON_TIPS) {
        this.infobarMaskNode.active = true;
        if (this._disposeShowTips) {
          this._disposeShowTips();
        }
        this._disposeShowTips = undefined;
        this._resetUI();
        this._infoUIState = T.FREE_SPIN_WON_TIPS;
        this.infoBoardMessageController.setSprites(this._spinTipsObj[this._infoUIState]);
        this.infoBoardMessageController.showInfoboardMessage();
        this.infoBoardMessageController.clear(true);
        this.infoBoardMessageController.spriteMessageNode.runAction(cc.sequence(cc.scaleTo(0.3, 1.1).easing(cc.easeIn(0.2)), cc.scaleTo(0.3, 1).easing(cc.easeIn(0.2)), cc.delayTime(0.24)).repeatForever());
      }
    };
    S.prototype.play = function (z, A) {
      var M = this;
      this.infobarMaskNode.active = false;
      var E = z.showWinText;
      if (E === undefined) {
        E = true;
      }
      this.infoBoardMessageController.winDisplayNode.active = E;
      var F = z.amount;
      var b = z.playState;
      this._playState = b;
      switch (this._playState) {
        case x.BEFORE_FINAL_PAY_WIN:
          if (!z.isMute) {
            j.playAudio(C.GENERAL_AUDIO.prizeSmallwin.key);
          }
          this._showBeforeFinalPayoutWin(F, A);
          this.playSmallWinEffect();
          break;
        case x.LOW_PAY_WIN:
          if (z.multiplierNumber === 1) {
            j.playAudio(C.GENERAL_AUDIO.prizeSmallwin.key);
          } else {
            this._playMultiplierCrowdAudio();
            j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultiplied.key);
          }
          this._showLowPayoutWin(F, false, A);
          this.playSmallWinEffect();
          break;
        case x.LOW_PAY_TOTAL_WIN:
          if (!z.isMute) {
            j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwin.key);
          }
          this._showLowPayoutWin(F, true, A);
          this.playSmallWinEffect();
          break;
        case x.HIGH_PAY_WIN:
          if (!z.isMute) {
            if (z.multiplierNumber === 1) {
              j.playAudio(C.GENERAL_AUDIO.prizeSmallwin.key);
            } else {
              this._playMultiplierCrowdAudio();
              j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultiplied.key);
              j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultipliedCoins.key);
            }
          }
          this._showHighPayoutWin(F, false, false, A);
          this.playMediumWinEffect();
          break;
        case x.HIGH_PAY_TOTAL_WIN:
          if (!z.isMute) {
            j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwin.key);
          }
          this._showHighPayoutWin(F, true, true, function () {
            M._showHighPayoutWin(F, true, false, A);
            M.playMediumWinEffect();
          });
          this.playMediumWinEffect();
          break;
        case x.INSTANT_HIGH_PAY_TOTAL_WIN:
          this._showHighPayoutWin(F, true, false, A);
          this.playMediumWinEffect();
          break;
        case x.HIGH_PAY_BIG_TOTAL_WIN:
          if (!z.isMute) {
            j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwin.key);
          }
          this._showHighPayoutWin(F, true, false, A);
          this.playBigWinEffect();
      }
    };
    S.prototype.playSmallWinEffect = function (z) {
      this.infobar[0].active = true;
      this.infobarMask[0].active = true;
      this._playAnim(this.vfxCAnim);
      this._playAnim(this.swAAnim);
      this.swB.stopAllActions();
      this.swB.opacity = 0;
      this.swB.runAction(cc.sequence(cc.delayTime(0.03), cc.fadeIn(0.3)));
      this.vfxE.stopAllActions();
      this.vfxE.setScale(0);
      this.vfxE.opacity = 255;
      this.vfxE.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.scaleTo(1, 1.43, 1.23)));
      this.vfxE.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(0.8)));
      var A = this.infoBoardMessageController.winDisplayNode;
      A.stopAllActions();
      A.setScale(0);
      A.runAction(cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.1, 0.9), cc.scaleTo(0.05, 1)));
      if (z) {
        z();
      }
    };
    S.prototype.playMediumWinEffect = function (z) {
      if (this._isUpgrade === false) {
        j.playAudio(C.GENERAL_AUDIO.prizeInfobarUpgrade.key);
      }
      this._isUpgrade = true;
      this.infobar[0].active = false;
      this.infobar[1].active = true;
      this.infobar[2].active = false;
      this.infobarMask[0].active = false;
      this.infobarMask[1].active = true;
      this.infobarMask[2].active = false;
      this._playAnim(this.vfxCAnim);
      this._playAnim(this.mwAAnim);
      this._playAnim(this.mwDAnim);
      this._playAnim(this.mwFAnim);
      this._playAnim(this.mwGAnim);
      this._playFadeOutAction(this.swB);
      this.mwB.stopAllActions();
      this.mwB.opacity = 0;
      this.mwB.runAction(cc.sequence(cc.delayTime(0.03), cc.fadeIn(0.3)));
      this.vfxE.stopAllActions();
      this.vfxE.setScale(0);
      this.vfxE.opacity = 255;
      this.vfxE.runAction(cc.sequence(cc.scaleTo(0.3, 1.43), cc.scaleTo(1, 1.63, 1.43)));
      this.vfxE.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(0.8)));
      var A = this.infoBoardMessageController.winDisplayNode;
      A.stopAllActions();
      A.setScale(0);
      A.runAction(cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.1, 0.9), cc.scaleTo(0.05, 1)));
      if (z) {
        z();
      }
    };
    S.prototype.playBigWinEffect = function (z) {
      this.infobar[0].active = false;
      this.infobar[1].active = false;
      this.infobar[2].active = true;
      this.infobarMask[0].active = false;
      this.infobarMask[1].active = false;
      this.infobarMask[2].active = true;
      this._playFadeOutAction(this.swB);
      this._playFadeOutAction(this.mwB);
      if (z) {
        z();
      }
    };
    S.prototype.resetWinEffect = function (z) {
      this.infobar[0].active = true;
      this.infobar[1].active = false;
      this.infobar[2].active = false;
      this.infobarMask[0].active = true;
      this.infobarMask[1].active = false;
      this.infobarMask[2].active = false;
      this.swB.stopAllActions();
      this.swB.opacity = 0;
      this.vfxE.stopAllActions();
      this.vfxE.setScale(0);
      this.vfxE.opacity = 255;
      if (z) {
        z();
      }
    };
    S.prototype.stop = function () {
      this._resetUI();
    };
    S.prototype._playAnim = function (z) {
      z.stop();
      z.setCurrentTime(0);
      z.play();
    };
    S.prototype._playFadeOutAction = function (z) {
      z.stopAllActions();
      if (z.opacity !== 0) {
        z.runAction(cc.fadeOut(0.2));
      }
    };
    S.prototype._showBeforeFinalPayoutWin = function (z, A) {
      if (this._infoUIState !== T.BEFORE_FINAL_WIN) {
        this._resetUI();
      }
      this._infoUIState = T.BEFORE_FINAL_WIN;
      this._playCommonWinEffect();
      this.infoBoardMessageController.setTotalAndWinText(false, false);
      this.infoBoardMessageController.clearDisplayNumber();
      this._showDisplayNumber(z);
      if (A) {
        A();
      }
    };
    S.prototype._showLowPayoutWin = function (z, A, M) {
      if (this._infoUIState !== T.SMALL_WIN) {
        this._resetUI();
      }
      this._infoUIState = T.SMALL_WIN;
      this._playCommonWinEffect();
      this.infoBoardMessageController.setTotalAndWinText(A, !A);
      this.infoBoardMessageController.clearDisplayNumber();
      this._showDisplayNumber(z);
      if (M) {
        M();
      }
    };
    S.prototype._showHighPayoutWin = function (z, A, M, E) {
      var F = this;
      if (this._infoUIState !== T.MEDIUM_WIN) {
        this._resetUI();
      }
      this._infoUIState = T.MEDIUM_WIN;
      this._playCommonWinEffect();
      this.infoBoardMessageController.setTotalAndWinText(A, !A);
      this.infoBoardMessageController.clearDisplayNumber();
      if (!M) {
        this._showDisplayNumber(z);
        if (E) {
          E();
        }
        return;
      }
      this.infoBoardMessageController.showNumberRoll(1.988, 0, z, function () {
        F._disableSkipButton();
        j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwinMedEnd.key);
        if (E) {
          E();
        }
      });
      j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwinMedCoins.key);
      j.playAudio(C.GENERAL_AUDIO.prizeInfobarTotalwinMedMain.key);
      this._enableSkipButton();
    };
    S.prototype._playCommonWinEffect = function () {};
    S.prototype._enableSkipButton = function () {
      this.skipButtonNode.active = true;
      k.spaceBarInterrupter.subscribeEventInterrupter("highPayoutTotalWin", this.node, this.skipButtonClick.bind(this));
    };
    S.prototype._disableSkipButton = function () {
      this.skipButtonNode.active = false;
      k.spaceBarInterrupter.unsubscribeEventInterrupter("highPayoutTotalWin");
    };
    S.prototype.skipButtonClick = function () {
      this._disableSkipButton();
      if (this._playState === x.HIGH_PAY_TOTAL_WIN) {
        j.stopAudio(C.GENERAL_AUDIO.prizeInfobarTotalwinMedMain.key);
      }
      this.infoBoardMessageController.skipNumberRoll();
    };
    S.prototype._resetUI = function () {
      this.infoBoardMessageController.maskNode.stopAllActions();
      this.infoBoardMessageController.maskNode.setScale(1);
      if (this._infoUIState === T.BEFORE_FINAL_WIN || this._infoUIState === T.SMALL_WIN || this._infoUIState === T.MEDIUM_WIN) {
        this.infoBoardMessageController.setTotalAndWinText(false, false);
        this.infoBoardMessageController.clearDisplayNumber();
        this.infoBoardMessageController.clearNumberRoll();
      } else if (this._infoUIState === T.FREE_SPIN_TIPS || this._infoUIState === T.NORMAL_TIPS || this._infoUIState === T.SCATTER_REQUEST_TIP || this._infoUIState === T.FREE_SPIN_WON_TIPS) {
        this.infoBoardMessageController.hideInfoboardMessage();
        this.infoBoardMessageController.unscheduleRandomSpriteTips();
      }
      this._infoUIState = undefined;
    };
    S.prototype._handleUKGCFailCondition = function () {
      this._disableSkipButton();
      if (this._isNormalTips) {
        this.showTips(T.NORMAL_TIPS, true);
      } else {
        this.showTips(T.FREE_SPIN_TIPS, true);
      }
    };
    S.prototype._showDisplayNumber = function (z) {
      if (G.isPassUKGC(z)) {
        this.infoBoardMessageController.showDisplayNumber(z);
      } else {
        this._handleUKGCFailCondition();
      }
    };
    S.prototype._playMultiplierCrowdAudio = function () {
      switch (this._multipliedCrowdValue) {
        case 0:
          this._multipliedCrowdValue = 1;
          j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultipliedCrowd1.key);
          break;
        case 1:
          this._multipliedCrowdValue = 2;
          j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultipliedCrowd2.key);
          break;
        case 2:
          this._multipliedCrowdValue = 0;
          j.playAudio(C.GENERAL_AUDIO.prizeSmallwinMultipliedCrowd3.key);
      }
    };
    __decorate([Y({
      tooltip: false,
      type: D.default
    })], S.prototype, "infoBoardMessageController", undefined);
    __decorate([Y({
      tooltip: false,
      type: cc.Node
    })], S.prototype, "skipButtonNode", undefined);
    __decorate([Y([cc.Node])], S.prototype, "infobar", undefined);
    __decorate([Y(cc.Node)], S.prototype, "infobarMaskNode", undefined);
    __decorate([Y([cc.Node])], S.prototype, "infobarMask", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "swAAnim", undefined);
    __decorate([Y(cc.Node)], S.prototype, "swB", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "mwAAnim", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "mwDAnim", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "mwFAnim", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "mwGAnim", undefined);
    __decorate([Y(cc.Node)], S.prototype, "mwB", undefined);
    __decorate([Y(cc.Animation)], S.prototype, "vfxCAnim", undefined);
    __decorate([Y(cc.Node)], S.prototype, "vfxE", undefined);
    __decorate([Y(cc.Node)], S.prototype, "winTextNode", undefined);
    return __decorate([N], S);
  }(cc.Component);
  exports.default = W;
  cc._RF.pop();
}