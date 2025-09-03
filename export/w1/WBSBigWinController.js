if (!cc._RF.push(module, "95993uxZSpGnLlF8wzkefdw", "WBSBigWinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AutomationDecorator");
  var x = require("BigWinController");
  var L = require("WinTemplateConstant");
  var D = require("BigWinController.spec");
  var k = require("Utils");
  var C = require("BGMHandler");
  var j = require("AudioManager");
  var G = cc._decorator;
  var V = G.ccclass;
  var Q = G.property;
  var N = function (Y) {
    function W() {
      var q = Y !== null && Y.apply(this, arguments) || this;
      q.winTextSpriteList = [];
      q.vfxHolder = undefined;
      q.boardHolder = undefined;
      q._disposeBulletEffect = undefined;
      q._vfxD = undefined;
      q._bullets = undefined;
      q._vfxC = [];
      q._vfxA = [];
      q._coinParticle = undefined;
      q._vfxB = undefined;
      return q;
    }
    __extends(W, Y);
    W.prototype.onInit = function (q) {
      this._initBigWinNodes({
        skipButtonNode: this.buttonNode
      });
      if (q) {
        if (q.bigWin) {
          this.winTextSpriteList[L.BigWinRollState.BIG_WIN].spriteFrame = q.bigWin;
        }
        if (q.megaWin) {
          this.winTextSpriteList[L.BigWinRollState.MEGA_WIN].spriteFrame = q.megaWin;
        }
        if (q.superMegaWin) {
          this.winTextSpriteList[L.BigWinRollState.SUPER_MEGA_WIN].spriteFrame = q.superMegaWin;
        }
        var S = this.vfxHolder.children;
        this._vfxD = S[0];
        this._bullets = S[1];
        this._vfxC.push(S[2].getComponent(cc.Animation));
        this._vfxC.push(S[3].getComponent(cc.Animation));
        this._vfxA.push(S[5]);
        this._vfxA.push(S[6]);
        this._coinParticle = S[4].getComponent("AnimParticleSystem");
        this._vfxB = S[7].getComponent(cc.ParticleSystem);
      }
    };
    W.prototype.onPlay = function () {
      var q = this.numberRollNode;
      q.parent.stopAllActions();
      q.parent.scale = 0;
      q.parent.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
      C.bgmHandler.fadeBgmTo(0, 0.3);
      if (j.GeneralAudioPool.bgm_bigwin_main) {
        j.GeneralAudioPool.bgm_bigwin_main.play();
      }
    };
    W.prototype.onPlayBigWinEffect = function (q) {
      this._skipButtonActive();
      this._coinParticle.resetSystem();
      this._vfxB.resetSystem();
      this._playShine();
      this._playEffects();
      q();
    };
    W.prototype.onPlayMegaWinEffect = function () {
      this._playShine();
      this._playEffects();
    };
    W.prototype.onPlaySuperMegaWinEffect = function () {
      this._playShine();
      this._playEffects();
    };
    W.prototype.onWinRollComplete = function () {
      this._playShine();
      var q = this.numberRollNode;
      q.parent.stopAllActions();
      q.parent.scale = 1;
      if (j.GeneralAudioPool.bgm_bigwin_main) {
        j.GeneralAudioPool.bgm_bigwin_main.stop();
      }
      if (j.GeneralAudioPool.bgm_bigwin_end) {
        j.GeneralAudioPool.bgm_bigwin_end.play();
      }
    };
    W.prototype.onStop = function () {
      C.bgmHandler.fadeBgmTo(1, 1);
    };
    W.prototype.onDismiss = function () {};
    W.prototype.onReset = function () {
      var q = this.numberRollNode;
      q.parent.stopAllActions();
      q.parent.scale = 0;
      this.boardHolder.children.forEach(function (S) {
        S.stopAllActions();
        S.active = false;
      });
      this.winTextSpriteList.forEach(function (S) {
        S.node.stopAllActions();
        S.node.active = false;
      });
      this._vfxD.stopAllActions();
      this._resetBulletEffect();
      this._vfxC.forEach(function (S) {
        S.stop();
        S.node.active = false;
      });
      this._vfxA.forEach(function (S) {
        S.stopAllActions();
        S.eulerAngles = cc.Vec3.ZERO;
      });
      this._coinParticle.stopSystem();
      this._vfxB.stopSystem();
      if (j.GeneralAudioPool.bgm_bigwin_main) {
        j.GeneralAudioPool.bgm_bigwin_main.stop();
      }
      if (j.GeneralAudioPool.bgm_bigwin_end) {
        j.GeneralAudioPool.bgm_bigwin_end.stop();
      }
    };
    W.prototype._initBigWinNodes = function () {};
    W.prototype._skipButtonActive = function () {};
    W.prototype._playEffects = function () {
      var q = this;
      this.winTextSpriteList.forEach(function (f, A) {
        f.node.active = A === q.winRollState;
        if (A === q.winRollState) {
          var M = f.node;
          M.stopAllActions();
          M.scale = 0;
          M.runAction(cc.sequence(cc.scaleTo(0.15, 3), cc.scaleTo(0.1, 1).easing(cc.easeBackOut())));
        }
      });
      this.boardHolder.children.forEach(function (f, A) {
        f.active = A === q.winRollState;
        if (A === q.winRollState) {
          f.stopAllActions();
          f.opacity = 0;
          f.scale = 2;
          f.runAction(cc.spawn(cc.fadeIn(0.1), cc.scaleTo(0.3, 1)));
        }
      });
      var S = this._vfxA[0];
      S.stopAllActions();
      S.eulerAngles = cc.Vec3.ZERO;
      S.runAction(cc.rotateBy(1, 15).repeatForever());
      var z = this._vfxA[1];
      z.stopAllActions();
      z.eulerAngles = cc.Vec3.ZERO;
      z.runAction(cc.rotateBy(1, -15).repeatForever());
      switch (this.winRollState) {
        case L.BigWinRollState.BIG_WIN:
          S.scale = 4.7619;
          z.scale = 4.7619;
          this._playBulletEffect(false);
          this._playVfxC(false);
          break;
        case L.BigWinRollState.MEGA_WIN:
          S.scale = 6.66;
          z.scale = 6.66;
          this._playBulletEffect(true);
          this._playVfxC(false);
          break;
        case L.BigWinRollState.SUPER_MEGA_WIN:
          S.scale = 9.99;
          z.scale = 9.99;
          this._playBulletEffect(true);
          this._playVfxC(true);
      }
    };
    W.prototype._playShine = function () {
      var q = this._vfxD;
      q.stopAllActions();
      q.opacity = 255;
      q.scale = 0;
      q.runAction(cc.spawn(cc.scaleTo(1, 10).easing(cc.easeOut(3)), cc.sequence(cc.delayTime(0.6), cc.fadeOut(0.4).easing(cc.easeIn(2)))));
    };
    W.prototype._playBulletEffect = function (q) {
      var S = this;
      if (q === undefined) {
        q = true;
      }
      var z = this._bullets;
      if (q) {
        if (!this._disposeBulletEffect) {
          z.active = true;
          var f = [];
          z.children.forEach(function (A) {
            f.push(function (E) {
              var F = k.randomInt(1, 3);
              A.setScale(F);
              A.opacity = 255;
              var b = A.getComponent(cc.Animation);
              b.setCurrentTime(0);
              b.play();
              E();
            });
            var M = k.randomInt(0, 3) * 0.1;
            f.push(k.delayCallback(M));
          });
          this._disposeBulletEffect = k.sequenceCallback(f)(function () {
            if (S._disposeBulletEffect) {
              S._disposeBulletEffect = undefined;
              S._playBulletEffect();
            }
          });
        }
      } else {
        if (z.active === true) {
          z.children.forEach(function (A) {
            A.getComponent(cc.Animation).stop();
          });
        }
        z.active = false;
      }
    };
    W.prototype._resetBulletEffect = function () {
      var q = this._disposeBulletEffect;
      this._disposeBulletEffect = undefined;
      if (q) {
        q();
      }
      var S = this.vfxHolder.children[1];
      S.children.forEach(function (z) {
        var f = z.getComponent(cc.Animation);
        f.stop();
        f.setCurrentTime(0);
        z.opacity = 0;
      });
      S.active = false;
    };
    W.prototype._playVfxC = function (q) {
      var S = this._vfxC[0];
      var z = this._vfxC[1];
      if (q) {
        if (S.node.active === false) {
          S.node.active = true;
          S.stop();
          S.play();
        }
        if (z.node.active === false) {
          z.node.active = true;
          z.stop();
          z.play();
        }
      } else {
        if (S.node.active === true) {
          S.stop();
          S.node.active = false;
        }
        if (z.node.active === true) {
          z.stop();
          z.node.active = false;
        }
      }
    };
    __decorate([Q({
      type: [cc.Sprite],
      tooltip: false
    })], W.prototype, "winTextSpriteList", undefined);
    __decorate([Q(cc.Node)], W.prototype, "vfxHolder", undefined);
    __decorate([Q(cc.Node)], W.prototype, "boardHolder", undefined);
    __decorate([T.automationDec({
      func: D.skipBigWinAnimationActiveEvent
    })], W.prototype, "onWinRollComplete", null);
    __decorate([T.automationDec({
      func: D.initBigWinNodes
    })], W.prototype, "_initBigWinNodes", null);
    __decorate([T.automationDec({
      func: D.skipBigWinButtonActiveEvent
    })], W.prototype, "_skipButtonActive", null);
    return __decorate([V], W);
  }(x.default);
  exports.default = N;
  cc._RF.pop();
}