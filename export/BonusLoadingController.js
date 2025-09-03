if (!cc._RF.push(module, "7eb81xH1fpGGZL0MI1pXgD6", "BonusLoadingController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("NumberDisplayController");
  var L = require("SpaceBarInterrupter");
  var D = require("AudioConstant");
  var k = require("AudioManager");
  var C = require("GameConstant");
  var j = cc._decorator;
  var G = j.ccclass;
  var V = j.property;
  var Q = function (N) {
    function Y() {
      var W = N !== null && N.apply(this, arguments) || this;
      W.freeSpinNumberDisplayController = undefined;
      W.loadingNumberDisplayController = undefined;
      W.startTextSprite = undefined;
      W.freeSpinTextSprite = undefined;
      W.descTextSprite = undefined;
      W.startButton = undefined;
      W.vfx = undefined;
      W.loadingNode = undefined;
      W.hoverShine = undefined;
      W.buttonClickVfx = undefined;
      W.blVfxAAnim = undefined;
      W.blVfxCParticleSystem = undefined;
      W.backgroundNodeA = undefined;
      W.vfxNodeE = undefined;
      W.vfxNodeB = undefined;
      W.vfxNodeD = undefined;
      W.loadingImage = undefined;
      W._displayState = C.DisplayState.HIDE;
      W._onShowedCallback = undefined;
      W._onCompleteCallback = undefined;
      return W;
    }
    __extends(Y, N);
    // 初始化顯示文字與重置狀態
    Y.prototype.init = function (W) {
      this.freeSpinTextSprite.spriteFrame = W.freeSpinTextSF;
      this.startTextSprite.spriteFrame = W.startTextSF;
      this.descTextSprite.spriteFrame = W.descTextSF;
      this._reset();
    };
    // 顯示介面並開始播放入場動畫
    Y.prototype.show = function (W, q) {
      if (this._displayState === C.DisplayState.HIDE) {
        this._displayState = C.DisplayState.ANIMATING;
        this._onShowedCallback = q;
        this.freeSpinNumberDisplayController.clear();
        this.freeSpinNumberDisplayController.displayNumber(W);
        this.updateProgress(0, 1);
        this.node.active = true;
        this.node.opacity = 0;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(this._onShowComplete, this)));
      }
    };
    // 更新讀取進度數字
    Y.prototype.updateProgress = function (W, q) {
      var S = W / q * 100;
      this.loadingNumberDisplayController.clear();
      this.loadingNumberDisplayController.displayNumber(S, false);
    };
    // 資源載入完成後顯示開始按鈕
    Y.prototype.onLoadComplete = function (W, q) {
      this._onCompleteCallback = q;
      var S = W ? C.REPLAY_HOLD_DURATION : C.NORMAL_HOLD_DURATION;
      this._onStartButtonShowed();
      this.unschedule(this.onStartButtonClick);
      this.scheduleOnce(this.onStartButtonClick, S);
    };
    // 點擊開始按鈕後進入下一步
    Y.prototype.onStartButtonClick = function () {
      this._disableMouseHover();
      this._hideMouseOverEffect();
      L.spaceBarInterrupter.unsubscribeEventInterrupter("bonus");
      var W = this.buttonClickVfx;
      W.stopAllActions();
      W.opacity = 0;
      W.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.05), cc.fadeOut(0.1)));
      this.unschedule(this.onStartButtonClick);
      this.startButton.enabled = false;
      k.playAudio(D.GENERAL_AUDIO.uiStart.key);
      this._hide();
    };
    // 隱藏載入畫面
    Y.prototype._hide = function () {
      if (this._displayState === C.DisplayState.SHOWED) {
        this._displayState = C.DisplayState.ANIMATING;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(this._onHideCompleteFunc, this)));
        this.blVfxCParticleSystem.node.runAction(cc.fadeOut(0.3));
      }
    };
    // 隱藏動畫結束後的處理
    Y.prototype._onHideCompleteFunc = function () {
      this._reset();
      var W = this._onCompleteCallback;
      this._onCompleteCallback = undefined;
      if (W) {
        W();
      }
    };
    // 顯示動畫完成後的視覺效果與回呼
    Y.prototype._onShowComplete = function () {
      var W = this;
      this._displayState = C.DisplayState.SHOWED;
      var q = cc.Color.WHITE;
      var S = cc.Color.BLACK;
      var z = this.backgroundNodeA;
      z.stopAllActions();
      z.scale = 1.43;
      z.runAction(cc.scaleTo(10, 1.5));
      var f = this.vfxNodeE;
      f.stopAllActions();
      f.color = S;
      f.angle = 40;
      f.runAction(cc.spawn(cc.rotateTo(10, -55), cc.tintTo(0.15, q)));
      var A = this.vfxNodeB;
      A.stopAllActions();
      A.scale = 0;
      A.color = S;
      A.runAction(cc.spawn(cc.sequence(cc.scaleTo(0.3, 12), cc.scaleTo(10, 21)), cc.tintTo(0.15, q)));
      var M = this.blVfxAAnim;
      M.node.active = true;
      M.play();
      var E = this.blVfxCParticleSystem;
      E.node.active = true;
      E.node.opacity = 0;
      E.node.runAction(cc.fadeIn(0.3));
      E.resetSystem();
      T.delayCallback(0.1)(function () {
        W._playNumberEffect();
      });
      this.loadingNode.active = true;
      var F = this.loadingImage;
      F.stopAllActions();
      F.angle = 0;
      F.runAction(cc.rotateBy(0.15, 5).repeatForever());
      var b = this.freeSpinTextSprite.node;
      b.active = true;
      b.stopAllActions();
      b.scale = 0;
      b.runAction(cc.scaleTo(0.3, 1).easing(cc.easeBackOut()));
      var H = this.freeSpinNumberDisplayController.node;
      H.stopAllActions();
      H.scale = 0;
      H.runAction(cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.3, 1).easing(cc.easeBackOut())));
      var w = this._onShowedCallback;
      this._onShowedCallback = undefined;
      if (w) {
        w();
      }
    };
    // 播放數字周圍的特效
    Y.prototype._playNumberEffect = function () {
      var W = this.vfxNodeD;
      var q = cc.Color.WHITE;
      var S = cc.Color.BLACK;
      W.stopAllActions();
      W.scale = 0;
      W.color = cc.Color.BLACK;
      W.runAction(cc.spawn(cc.sequence(cc.scaleTo(0.5, 8), cc.scaleTo(1, 13)), cc.sequence(cc.tintTo(0.5, q), cc.delayTime(0.1), cc.tintTo(1, S))));
    };
    // 顯示開始按鈕並啟用鍵盤事件
    Y.prototype._onStartButtonShowed = function () {
      var W = this;
      var q = this.loadingNode;
      this.loadingImage.stopAllActions();
      q.active = false;
      var S = this.startButton.node;
      S.active = true;
      S.stopAllActions();
      S.opacity = 0;
      S.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
        W.startButton.enabled = true;
        W._enableMouseHover();
        L.spaceBarInterrupter.subscribeEventInterrupter("bonus", W.node, W.onStartButtonClick.bind(W));
      })));
    };
    // 啟用滑鼠移入事件
    Y.prototype._enableMouseHover = function () {
      this.startButton.node.on("mouseenter", this._playMouseOverEffect, this);
      this.startButton.node.on("mouseleave", this._hideMouseOverEffect, this);
    };
    // 停用滑鼠移入事件
    Y.prototype._disableMouseHover = function () {
      this.startButton.node.off("mouseenter", this._playMouseOverEffect, this);
      this.startButton.node.off("mouseleave", this._hideMouseOverEffect, this);
    };
    // 滑鼠移入時播放閃光效果
    Y.prototype._playMouseOverEffect = function () {
      this.hoverShine.node.active = true;
      this.hoverShine.play();
    };
    // 滑鼠移出時隱藏閃光效果
    Y.prototype._hideMouseOverEffect = function () {
      this.hoverShine.stop();
      this.hoverShine.node.active = false;
    };
    // 重置所有節點與狀態
    Y.prototype._reset = function () {
      this._displayState = C.DisplayState.HIDE;
      this.unschedule(this._hide);
      this.unschedule(this.onStartButtonClick);
      var W = this.startButton.node;
      W.stopAllActions();
      W.opacity = 0;
      W.active = false;
      this.loadingNumberDisplayController.clear();
      var q = this.backgroundNodeA;
      q.stopAllActions();
      q.scale = 1.43;
      var S = this.vfxNodeE;
      S.stopAllActions();
      S.opacity = 0;
      S.angle = 40;
      var z = this.vfxNodeB;
      z.stopAllActions();
      z.scale = 0;
      z.color = cc.Color.BLACK;
      var f = this.vfxNodeD;
      f.stopAllActions();
      f.scale = 0;
      f.color = cc.Color.BLACK;
      var A = this.blVfxAAnim;
      A.stop();
      A.node.active = false;
      var M = this.blVfxCParticleSystem;
      M.node.opacity = 0;
      M.stopSystem();
      M.node.active = false;
      var E = this.loadingNode;
      var F = this.loadingImage;
      E.stopAllActions();
      F.angle = 0;
      E.active = false;
      var b = this.freeSpinTextSprite.node;
      b.stopAllActions();
      b.scale = 0;
      b.active = false;
      this.freeSpinNumberDisplayController.clear();
      var H = this.freeSpinNumberDisplayController.node;
      H.stopAllActions();
      H.scale = 0;
      this.hoverShine.stop();
      this.hoverShine.node.active = false;
      var w = this.buttonClickVfx;
      w.stopAllActions();
      w.opacity = 0;
      this.node.stopAllActions();
      this.node.opacity = 0;
      this.node.active = false;
    };
    __decorate([V({
      tooltip: false,
      type: x.default
    })], Y.prototype, "freeSpinNumberDisplayController", undefined);
    __decorate([V({
      tooltip: false,
      type: x.default
    })], Y.prototype, "loadingNumberDisplayController", undefined);
    __decorate([V({
      tooltip: false,
      type: cc.Sprite
    })], Y.prototype, "startTextSprite", undefined);
    __decorate([V({
      tooltip: false,
      type: cc.Sprite
    })], Y.prototype, "freeSpinTextSprite", undefined);
    __decorate([V({
      tooltip: false,
      type: cc.Sprite
    })], Y.prototype, "descTextSprite", undefined);
    __decorate([V({
      tooltip: false,
      type: cc.Button
    })], Y.prototype, "startButton", undefined);
    __decorate([V(cc.Node)], Y.prototype, "vfx", undefined);
    __decorate([V(cc.Node)], Y.prototype, "loadingNode", undefined);
    __decorate([V(cc.Animation)], Y.prototype, "hoverShine", undefined);
    __decorate([V(cc.Node)], Y.prototype, "buttonClickVfx", undefined);
    __decorate([V(cc.Animation)], Y.prototype, "blVfxAAnim", undefined);
    __decorate([V(cc.ParticleSystem)], Y.prototype, "blVfxCParticleSystem", undefined);
    __decorate([V(cc.Node)], Y.prototype, "backgroundNodeA", undefined);
    __decorate([V(cc.Node)], Y.prototype, "vfxNodeE", undefined);
    __decorate([V(cc.Node)], Y.prototype, "vfxNodeB", undefined);
    __decorate([V(cc.Node)], Y.prototype, "vfxNodeD", undefined);
    __decorate([V(cc.Node)], Y.prototype, "loadingImage", undefined);
    return __decorate([G], Y);
  }(cc.Component);
  exports.default = Q;
  cc._RF.pop();
}