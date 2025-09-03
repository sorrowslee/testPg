if (!cc._RF.push(module, "bc046jX3T9LMaj5wK6TjB7G", "WBSTotalWinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("AutomationDecorator");
  var L = require("NumberDisplayController");
  var D = require("TotalWinController");
  var k = require("AudioConstant");
  var C = require("AudioManager");
  var j = require("TotalWinController.spec");
  var G = require("BGMHandler");
  var V = cc._decorator;
  var Q = V.ccclass;
  var N = V.property;
  var Y = function (W) {
    function q() {
      var S = W !== null && W.apply(this, arguments) || this;
      S.freeSpinNumberDisplayController = undefined;
      S.freeSpinTextSprite = undefined;
      S.winTextSprite = undefined;
      S.collectTextSprite = undefined;
      S.hoverAnim = undefined;
      S.holder = undefined;
      S.twBgA = undefined;
      S.shineNode = undefined;
      S.bulletEffectsNode = undefined;
      S.blVfxVAddParticle = undefined;
      S.coinParticle = undefined;
      S.buttonLightEffect = undefined;
      S._disposeBulletEffect = undefined;
      return S;
    }
    __extends(q, W);
    q.prototype.onInit = function (S) {
      this._initTotalWinNodes({
        collectButtonNode: this.collectButton.node,
        skipButtonNode: this.skipNode
      });
      this.winTextSprite.spriteFrame = S.totalWinSF;
      this.collectTextSprite.spriteFrame = S.collectSF;
      this.freeSpinTextSprite.spriteFrame = S.freeSpinSF;
      this._resetUI();
    };
    q.prototype.onPlay = function (S) {
      var z = S.freeSpinCount;
      this.freeSpinNumberDisplayController.clear();
      this.freeSpinNumberDisplayController.displayNumber(z, false);
      G.bgmHandler.fadeOutBgm(0.435);
      this._showHolder();
      this._showBackground();
      this._playBulletEffect();
      this._playLightParticle();
      this._playCoinParticle();
      this._playShine();
      this._playWinTextEffect();
      this._playWinAmountEffect();
    };
    q.prototype.onWinRollStart = function () {
      if (C.GeneralAudioPool.bgm_totalwin_main) {
        C.GeneralAudioPool.bgm_totalwin_main.play();
      }
    };
    q.prototype.onWinRollComplete = function (S) {
      this.collectButton.node.active = true;
      this._enableMouseHover();
      this._collectButtonShown();
      this._playShine();
      this._playWinTextEffect(true);
      this._playWinAmountEffect(true);
      if (C.GeneralAudioPool.bgm_totalwin_main) {
        C.GeneralAudioPool.bgm_totalwin_main.stop();
      }
      if (C.GeneralAudioPool.bgm_totalwin_end) {
        C.GeneralAudioPool.bgm_totalwin_end.play();
      }
      S();
    };
    q.prototype.onCollect = function (S) {
      this._disableMouseHover();
      this._hideMouseOverEffect();
      this.buttonLightEffect.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.1), cc.fadeOut(0.1)));
      if (C.GeneralAudioPool.bgm_totalwin_main) {
        C.GeneralAudioPool.bgm_totalwin_main.stop();
      }
      if (C.GeneralAudioPool.bgm_totalwin_end) {
        C.GeneralAudioPool.bgm_totalwin_end.stop();
      }
      C.playAudio(k.GENERAL_AUDIO.uiCollect.key);
      S();
    };
    q.prototype.onDismiss = function () {};
    q.prototype.onReset = function () {
      this.collectButton.node.stopAllActions();
      this.collectButton.node.active = false;
      this.freeSpinNumberDisplayController.clear();
      this._resetUI();
    };
    q.prototype._enableMouseHover = function () {
      this.collectButton.node.on("mouseenter", this._playMouseOverEffect, this);
      this.collectButton.node.on("mouseleave", this._hideMouseOverEffect, this);
    };
    q.prototype._disableMouseHover = function () {
      this.collectButton.node.off("mouseenter", this._playMouseOverEffect, this);
      this.collectButton.node.off("mouseleave", this._hideMouseOverEffect, this);
    };
    q.prototype._playMouseOverEffect = function () {
      this.hoverAnim.node.active = true;
      this.hoverAnim.setCurrentTime(0);
      this.hoverAnim.play();
    };
    q.prototype._hideMouseOverEffect = function () {
      this.hoverAnim.stop();
      this.hoverAnim.node.active = false;
    };
    q.prototype._showHolder = function () {
      this.holder.runAction(cc.fadeIn(0.2));
    };
    q.prototype._showBackground = function () {
      this.twBgA.runAction(cc.spawn(cc.fadeIn(0.2), cc.sequence(cc.scaleTo(0.2, 1), cc.scaleTo(24, 1.2))));
    };
    q.prototype._resetBackground = function () {
      this.twBgA.stopAllActions();
      this.twBgA.opacity = 0;
      this.twBgA.setScale(0.8);
    };
    q.prototype._playWinTextEffect = function (S = false) {
      if (S) {
        this.winTextSprite.node.setScale(0.715);
        this.winTextSprite.node.runAction(cc.scaleTo(0.3, 1.43).easing(cc.easeBackOut()));
      } else {
        this.winTextSprite.node.setScale(0);
        this.winTextSprite.node.runAction(cc.scaleTo(0.5, 1.43).easing(cc.easeBackInOut()));
      }
    };
    q.prototype._playWinAmountEffect = function (S = false) {
      if (S) {
        this.winAmountNode.parent.setScale(0.5);
        this.winAmountNode.parent.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
      } else {
        this.winAmountNode.parent.setScale(0);
        this.winAmountNode.parent.runAction(cc.scaleTo(0.5, 1).easing(cc.easeBackInOut()));
      }
    };
    q.prototype._playBulletEffect = function () {
      var S = this;
      var z = [];
      this.bulletEffectsNode.children.forEach(function (A) {
        z.push(function (E) {
          var F = T.randomInt(1, 3);
          A.setScale(F);
          A.opacity = 255;
          var b = A.getComponent(cc.Animation);
          b.setCurrentTime(0);
          b.play();
          E();
        });
        var M = T.randomInt(0, 3) * 0.1;
        z.push(T.delayCallback(M));
      });
      this._disposeBulletEffect = T.sequenceCallback(z)(function () {
        if (S._disposeBulletEffect) {
          S._disposeBulletEffect = undefined;
          S._playBulletEffect();
        }
      });
    };
    q.prototype._resetBulletEffect = function () {
      var S = this._disposeBulletEffect;
      this._disposeBulletEffect = undefined;
      if (S) {
        S();
      }
      this.bulletEffectsNode.children.forEach(function (z) {
        var A = z.getComponent(cc.Animation);
        A.stop();
        A.setCurrentTime(0);
        z.opacity = 0;
      });
    };
    q.prototype._playShine = function () {
      this._resetShine();
      this.shineNode.runAction(cc.spawn(cc.fadeOut(0.7), cc.scaleTo(0.3, 6)));
    };
    q.prototype._resetShine = function () {
      this.shineNode.stopAllActions();
      this.shineNode.setScale(0);
      this.shineNode.opacity = 255;
    };
    q.prototype._playLightParticle = function () {
      var S = this;
      T.delayCallback(0.3)(function () {
        S.blVfxVAddParticle.node.active = true;
        S.blVfxVAddParticle.resetSystem();
      });
    };
    q.prototype._resetLightPartile = function () {
      this.blVfxVAddParticle.stopSystem();
      this.blVfxVAddParticle.node.active = false;
    };
    q.prototype._playCoinParticle = function () {
      this.coinParticle.active = true;
      this.coinParticle.getComponent("AnimParticleSystem").resetSystem();
    };
    q.prototype._resetCoinParticle = function () {
      this.coinParticle.getComponent("AnimParticleSystem").stopSystem();
      this.coinParticle.active = false;
    };
    q.prototype._resetUI = function () {
      this.holder.stopAllActions();
      this.holder.opacity = 0;
      this._resetBackground();
      this._resetBulletEffect();
      this._resetLightPartile();
      this._resetCoinParticle();
      this._resetShine();
      this.buttonLightEffect.stopAllActions();
      this.buttonLightEffect.opacity = 0;
      this.hoverAnim.stop();
      this.hoverAnim.node.active = false;
    };
    q.prototype._initTotalWinNodes = function () {};
    q.prototype._collectButtonShown = function () {};
    __decorate([N({
      tooltip: false,
      type: L.default
    })], q.prototype, "freeSpinNumberDisplayController", undefined);
    __decorate([N({
      tooltip: false,
      type: cc.Sprite
    })], q.prototype, "freeSpinTextSprite", undefined);
    __decorate([N({
      tooltip: false,
      type: cc.Sprite
    })], q.prototype, "winTextSprite", undefined);
    __decorate([N({
      tooltip: false,
      type: cc.Sprite
    })], q.prototype, "collectTextSprite", undefined);
    __decorate([N({
      tooltip: false,
      type: cc.Animation
    })], q.prototype, "hoverAnim", undefined);
    __decorate([N(cc.Node)], q.prototype, "holder", undefined);
    __decorate([N(cc.Node)], q.prototype, "twBgA", undefined);
    __decorate([N(cc.Node)], q.prototype, "shineNode", undefined);
    __decorate([N(cc.Node)], q.prototype, "bulletEffectsNode", undefined);
    __decorate([N(cc.ParticleSystem)], q.prototype, "blVfxVAddParticle", undefined);
    __decorate([N(cc.Node)], q.prototype, "coinParticle", undefined);
    __decorate([N(cc.Node)], q.prototype, "buttonLightEffect", undefined);
    __decorate([x.automationDec({
      func: j.initTotalWinNodes
    })], q.prototype, "_initTotalWinNodes", null);
    __decorate([x.automationDec({
      func: j.collectTotalWinButtonShownEvent
    })], q.prototype, "_collectButtonShown", null);
    return __decorate([Q], q);
  }(D.default);
  exports.default = Y;
  cc._RF.pop();
}