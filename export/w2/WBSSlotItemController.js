if (!cc._RF.push(module, "7086fUCRa9IQZnKVRemVnXo", "WBSSlotItemController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotItem");
  var x = require("GameConstant");
  var L = require("SlotImageHandler");
  var D = require("PayoutEffectController");
  var k = require("ScatterEffectController");
  var C = require("Utils");
  var j = require("AudioManager");
  var G = require("AudioConstant");
  var V = cc._decorator;
  var Q = V.ccclass;
  var N = V.property;
  var Y = function (W) {
    function q() {
      var S = W !== null && W.apply(this, arguments) || this;
      S.scaleHolder = undefined;
      S.contentHolder = undefined;
      S.bgContentHolder = undefined;
      S.content = undefined;
      S.frame = undefined;
      S.spine = undefined;
      S.fakeContent = undefined;
      S.fakeSpine = undefined;
      S.fakeContentHolder = undefined;
      S.payoutEffectController = undefined;
      S.scatterEffectController = undefined;
      S.slotViewIndex = 0;
      S.slotItemIndex = 0;
      S._blockType = undefined;
      S._isFastSpinSpine = false;
      S._normalFrameSpriteFrame = undefined;
      S._blurredFrameSpriteFrame = undefined;
      S._normalBgSpriteFrame = undefined;
      S._blurredBgSpriteFrame = undefined;
      return S;
    }
    __extends(q, W);
    Object.defineProperty(q.prototype, "visible", {
      get: function () {
        return this.contentHolder.active;
      },
      set: function (S) {
        this.contentHolder.active = S;
        this.bgContentHolder.active = S;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(q.prototype, "blockType", {
      get: function () {
        return this._blockType;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(q.prototype, "isFastSpinSpine", {
      get: function () {
        return this._isFastSpinSpine;
      },
      enumerable: false,
      configurable: true
    });
    // 初始化符號的基本設定
    q.prototype.init = function (S) {
      this.reset();
      this.content = S.sprite;
      var z = this.normalScale = S.normalScale === undefined ? 1 : S.normalScale;
      this.blurScale = S.blurScale === undefined ? z : S.blurScale;
      this.getSymbolZOrder = S.getSymbolZOrder;
      this.payoutEffectController.clear();
      var A = x.spineSymbolNameMaps[x.SlotSymbols.Wild];
      var M = L.slotImageHandler.spines[A];
      this.fakeSpine.skeletonData = M;
    };
    // 設定符號圖像與外觀
    q.prototype.setup = function (S, z, A, M = false) {
      this.symbolIndex = S % 100;
      this._blockType = Math.floor(S / 100) * 100;
      this.normalSpriteFrame = z;
      this.blurSpriteFrame = A;
      this.zOrder = this.getSymbolZOrder ? this.getSymbolZOrder(S) : 0;
      this.setSpine();
      this.setZIndex();
      this._setupFrame();
      this._setupBackground();
      this.setBlur(M);
      if (this.symbolIndex === x.SlotSymbols.Wild) {
        this.payoutEffectController.showWildVfx(false);
      }
      var E = this.contentHolder;
      E.scale = 1;
      E.opacity = 255;
      var F = this.bgContentHolder;
      F.scale = 1;
      F.opacity = 255;
    };
    // 依符號索引設定 Spine 動畫
    q.prototype.setSpine = function (S) {
      if (S !== undefined) {
        this.symbolIndex = S;
      }
      var z = x.spineSymbolNameMaps[this.symbolIndex];
      var A = L.slotImageHandler.spines[z];
      this.spine.skeletonData = A;
      this.resetSpine();
      this.spine.node.active = false;
    };
    // 切換符號為模糊或清晰
    q.prototype.setBlur = function (S) {
      var z = this.content;
      if (z) {
        z.spriteFrame = S ? this.blurSpriteFrame : this.normalSpriteFrame;
        z.node.scale = S ? this.blurScale : this.normalScale;
      }
      var A = this.frame;
      if (A) {
        A.spriteFrame = S ? this._blurredFrameSpriteFrame : this._normalFrameSpriteFrame;
        A.node.scale = S ? 2 : 1;
      }
    };
    // 設定符號在節點中的層級
    q.prototype.setZIndex = function (S = 0) {
      if (this.node) {
        this.node.zIndex = this._generateZIndex();
      }
    };
    // 播放符號的待機動畫
    q.prototype.playSpineIdle = function (S = false) {
      if (this.symbolIndex === x.SlotSymbols.Wild || this.symbolIndex === x.SlotSymbols.Scatter) {
        this.resetSpine();
        var z = this.spine;
        z.node.active = true;
        this.content.enabled = false;
        z.setAnimation(0, "idle", true);
      }
    };
    // 播放符號出現動畫
    q.prototype.playSpineSpawn = function (S) {
      var z = this;
      if (this.symbolIndex === x.SlotSymbols.Scatter) {
        this.scatterEffectController.playSmoke();
      }
      var A = this.spine;
      A.node.active = true;
      this.content.enabled = false;
      A.setCompleteListener(function () {
        z.resetSpine();
        A.node.active = false;
        z.content.enabled = true;
        z.playSpineIdle();
        if (S) {
          S();
        }
      });
      A.setAnimation(0, "spawn", false);
      this.playScatterIdle();
    };
    // 播放假符號的出現動畫
    q.prototype.playFakeSpineSpawn = function () {
      if (this.symbolIndex === x.SlotSymbols.Scatter) {
        this.scatterEffectController.playSmoke();
      }
      var S = this.fakeSpine;
      S.node.active = true;
      S.setAnimation(0, "spawn", false);
    };
    // 隱藏假符號的出現動畫
    q.prototype.hideFakeSpineSpawn = function (S) {
      var z = this.fakeSpine;
      z.clearTrack(0);
      z.setToSetupPose();
      z.setCompleteListener(undefined);
      z.node.active = false;
      if (S) {
        S();
      }
    };
    // 播放符號離場動畫
    q.prototype.playSpineExit = function (S) {
      var z = this;
      if (this.symbolIndex === x.SlotSymbols.Scatter || this.symbolIndex === x.SlotSymbols.Wild) {
        var A = this.spine;
        A.node.active = true;
        this.content.enabled = false;
        A.setCompleteListener(function () {
          z.resetSpine();
          A.node.active = false;
          z.content.enabled = true;
          if (S) {
            S();
          }
        });
        A.setAnimation(0, "exit", false);
      } else if (S) {
        S();
      }
    };
    // 播放符號得獎動畫
    q.prototype.playSpineWin = function (S) {
      var z = this;
      var A = this.spine;
      A.node.active = true;
      this.content.enabled = false;
      A.setCompleteListener(function () {
        if (z.symbolIndex === x.SlotSymbols.Wild) {
          A.setAnimation(0, "idle", true);
        } else {
          z.resetSpine();
        }
        if (S) {
          S();
        }
      });
      A.setAnimation(0, "win", false);
    };
    // 播放 Scatter 的閃爍待機效果
    q.prototype.playScatterIdle = function (S = false) {
      if (this.symbolIndex === x.SlotSymbols.Scatter) {
        this.scatterEffectController.show(S);
        this.scatterEffectController.playShine();
      }
    };
    // Scatter 得獎後的待機動畫
    q.prototype.playScatterWinIdleSpine = function () {
      this.scatterEffectController.stopGlow();
      var S = this.spine;
      S.node.active = true;
      this.content.enabled = false;
      this.resetSpine();
      S.setAnimation(0, "win_idle", true);
    };
    // Scatter 的心跳動畫
    q.prototype.playScatterHeartBeat = function () {
      var S = this;
      if (this.symbolIndex === x.SlotSymbols.Scatter) {
        var z = 0;
        var A = cc.sequence(cc.callFunc(function () {
          j.stopAudio(G.GENERAL_AUDIO.heartBeat.key);
          j.playAudio(G.GENERAL_AUDIO.heartBeat.key);
        }), cc.scaleTo(0.2, 1.2), cc.scaleTo(0.15, 0.95), cc.scaleTo(0.05, 1, 1), cc.delayTime(0.6), cc.callFunc(function () {
          if (++z == 3) {
            S.scatterEffectController.stopGlow();
          }
        }));
        this.spine.node.runAction(A.repeat(3));
        this.scatterEffectController.playGlow();
      }
    };
    // 快速旋轉時的心跳縮放效果
    q.prototype.playScatterFastSpinBeat = function () {
      if (this.symbolIndex === x.SlotSymbols.Scatter) {
        var S = cc.sequence(cc.scaleTo(0.2, 1.2), cc.scaleTo(0.15, 0.95), cc.scaleTo(0.05, 1, 1), cc.delayTime(0.6));
        this.spine.node.runAction(S.repeatForever());
      }
    };
    // 停止快速旋轉心跳效果
    q.prototype.stopScatterFastSpinBeat = function () {
      this.spine.node.stopAllActions();
    };
    // 播放 Scatter 快速旋轉開始動畫
    q.prototype.playScatterFastSpinStart = function (S) {
      var z = this;
      this._isFastSpinSpine = true;
      var A = this.spine;
      A.node.active = true;
      this.content.enabled = false;
      A.setCompleteListener(function () {
        z.resetSpine();
        A.node.active = false;
        z.content.enabled = true;
        z.playScatterFastSpinIdle();
        if (S) {
          S();
        }
      });
      A.setAnimation(0, "fastspin_start", false);
    };
    // 播放 Scatter 快速旋轉中的待機動畫
    q.prototype.playScatterFastSpinIdle = function () {
      this._isFastSpinSpine = true;
      var S = this.spine;
      S.node.active = true;
      this.content.enabled = false;
      this.resetSpine();
      S.setAnimation(0, "fastspin_idle", true);
    };
    // 播放 Scatter 快速旋轉結束動畫
    q.prototype.playScatterFastSpinExit = function (S, z) {
      var A = this;
      if (S === undefined) {
        S = false;
      }
      this._isFastSpinSpine = false;
      var M = this.spine;
      function E() {
        A.playSpineIdle(true);
        if (z) {
          z();
        }
      }
      if (S) {
        E();
      } else {
        M.node.active = true;
        this.content.enabled = false;
        M.setCompleteListener(E);
        M.setAnimation(0, "fastspin_exit", false);
      }
    };
    // 亮起符號並播放得獎動畫
    q.prototype.playHighLight = function (S) {
      this.payoutEffectController.highlightSymbol();
      var z = this.contentHolder;
      z.stopAllActions();
      z.runAction(cc.scaleTo(0.3, 1.1));
      this.playSpineWin(S);
    };
    // 播放符號破碎前的搖晃動畫
    q.prototype.playPreBreak = function (S) {
      var z = this._blockType === x.BLOCK_TYPE.GOLD;
      this.playSymbolShake();
      this.payoutEffectController.breakSymbol(z, S);
    };
    // 播放符號破碎動畫
    q.prototype.playBreak = function (S) {
      var z = this;
      var A = this._blockType === x.BLOCK_TYPE.GOLD;
      C.sequenceCallback(function (M) {
        z.stopSymbolShake(M);
      }, function (M) {
        var E = z.contentHolder;
        var F = z.bgContentHolder;
        if (A) {
          var b = z.fakeContentHolder;
          b.stopAllActions();
          b.scale = 0;
          b.opacity = 0;
          b.runAction(cc.spawn(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()), cc.fadeIn(0.15)));
          z.playFakeSpineSpawn();
          j.playAudio(G.GENERAL_AUDIO.symWild.key);
        } else {
          z.payoutEffectController.hideWildVfx(true);
        }
        F.stopAllActions();
        F.runAction(cc.fadeOut(0.45));
        E.stopAllActions();
        E.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 1.21), cc.fadeOut(0.45)), cc.callFunc(function () {
          if (A) {
            z._transformToWild();
            z.hideFakeSpineSpawn();
            F.stopAllActions();
            F.scale = 0;
            F.opacity = 0;
            E.stopAllActions();
            E.scale = 1;
            E.opacity = 255;
          }
        })));
        if (M) {
          M();
        }
      })(function () {
        if (S) {
          S();
        }
      });
    };
    // 重設容器位置
    q.prototype.resetHolderPosition = function () {
      this.scaleHolder.setPosition(cc.Vec2.ZERO);
    };
    // 重設符號狀態
    q.prototype.reset = function () {
      this.scatterEffectController.reset();
      this.resetSpine();
      this.content.enabled = true;
      this.spine.node.active = false;
      this._blockType = undefined;
      this.slotViewIndex = 0;
      this.slotItemIndex = 0;
      this._isFastSpinSpine = false;
      this.payoutEffectController.clear();
    };
    // 重設 Spine 動畫狀態
    q.prototype.resetSpine = function () {
      var S = this.spine;
      if (S) {
        S.clearTrack(0);
        S.setToSetupPose();
        S.setCompleteListener(undefined);
      }
    };
    // 播放符號晃動效果
    q.prototype.playSymbolShake = function () {
      var S = (Math.floor(Math.random() * 100) + 30) * 0.001;
      this.contentHolder.runAction(cc.repeatForever(cc.sequence(cc.moveBy(S, cc.v2(-2.5, 0)), cc.moveBy(S, cc.v2(5, 1.5)), cc.moveBy(S, cc.v2(-1, -4)), cc.moveBy(S, cc.v2(-3, 4.5)), cc.moveBy(S, cc.v2(4, -2)), cc.moveBy(S, cc.v2(-4, -1.5)), cc.moveBy(S, cc.v2(-1, 2.5)), cc.moveBy(S, cc.v2(2.5, -1)))));
    };
    // 停止符號晃動效果
    q.prototype.stopSymbolShake = function (S) {
      this.contentHolder.stopAllActions();
      this.contentHolder.setPosition(cc.v2(0, 0));
      if (S) {
        S();
      }
    };
    // 將符號轉換成 Wild
    q.prototype._transformToWild = function () {
      var S = x.SlotSymbols.Wild;
      this.symbolIndex = S;
      this.setSpine();
      this.content.spriteFrame = L.slotImageHandler.symbolImages[S];
      this.zOrder = this.getSymbolZOrder ? this.getSymbolZOrder(S) : 0;
      this.setZIndex();
      this.reset();
      this._setupFrame();
      this._setupBackground();
      this.frame.spriteFrame = undefined;
      this.playSpineIdle();
      this.payoutEffectController.showWildVfx();
    };
    // 依符號類型設定外框圖片
    q.prototype._setupFrame = function () {
      var S = this._blockType;
      var z = undefined;
      var A = undefined;
      if (S === x.BLOCK_TYPE.GOLD) {
        z = L.slotImageHandler.frameImages[S];
        A = L.slotImageHandler.blurredFrameImages[S];
      }
      this._normalFrameSpriteFrame = z;
      this._blurredFrameSpriteFrame = A;
    };
    // 依符號類型設定背景圖片
    q.prototype._setupBackground = function () {
      var S = this.symbolIndex;
      var z = undefined;
      var A = undefined;
      if (S === x.SlotSymbols.Bandit) {
        z = L.slotImageHandler.backgroundImages[S];
        A = L.slotImageHandler.blurredBackgroundImages[S];
      }
      this._normalBgSpriteFrame = z;
      this._blurredBgSpriteFrame = A;
    };
    // 依位置與符號類型計算層級
    q.prototype._generateZIndex = function () {
      if (this.slotViewIndex === undefined) {
        return 0;
      }
      var S = this.zOrder * 10000;
      if (this.symbolIndex === x.SlotSymbols.Wild || this.symbolIndex === x.SlotSymbols.Scatter) {
        S = this.zOrder * 20000;
      }
      return S + -this.slotViewIndex * 1000 + -this.positionIndex;
    };
    __decorate([N(cc.Node)], q.prototype, "scaleHolder", undefined);
    __decorate([N(cc.Node)], q.prototype, "contentHolder", undefined);
    __decorate([N(cc.Node)], q.prototype, "bgContentHolder", undefined);
    __decorate([N(cc.Sprite)], q.prototype, "content", undefined);
    __decorate([N(cc.Sprite)], q.prototype, "frame", undefined);
    __decorate([N(sp.Skeleton)], q.prototype, "spine", undefined);
    __decorate([N(cc.Sprite)], q.prototype, "fakeContent", undefined);
    __decorate([N(sp.Skeleton)], q.prototype, "fakeSpine", undefined);
    __decorate([N(cc.Node)], q.prototype, "fakeContentHolder", undefined);
    __decorate([N(D.default)], q.prototype, "payoutEffectController", undefined);
    __decorate([N(k.default)], q.prototype, "scatterEffectController", undefined);
    return __decorate([Q], q);
  }(T.default);
  exports.default = Y;
  cc._RF.pop();
}