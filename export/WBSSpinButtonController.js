if (!cc._RF.push(module, "ee8e805Cu5Pw6OR5FkTB7EG", "WBSSpinButtonController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = require("AutomationDecorator");
  var L = require("SpinButtonController");
  var D = require("SettingMenuHelper");
  var k = require("AudioConstant");
  var C = require("AudioManager");
  var j = require("SpinButtonViewController.spec");
  var G = cc._decorator;
  var V = G.ccclass;
  var Q = G.property;
  (function (Y) {
    Y[Y.NORMAL = 0] = "NORMAL";
    Y[Y.BLUR = 1] = "BLUR";
    Y[Y.GREY = 2] = "GREY";
    Y[Y.GREY_BLUR = 3] = "GREY_BLUR";
  })(T ||= {});
  var N = function (Y) {
    function W() {
      var q = Y !== null && Y.apply(this, arguments) || this;
      q.spinButton = undefined;
      q.spinAnim = undefined;
      q.spinButtonHolder = undefined;
      q.arrowHolder = undefined;
      q.arrowSprite = undefined;
      q.autoSpinHolder = undefined;
      q.autoSpinNumber = undefined;
      q.arrowSpriteFrameList = [];
      q.hoverNormalSpinHolder = undefined;
      q.hoverAutoSpinHolder = undefined;
      q.hoverAnimation = undefined;
      q.hoverSprite = undefined;
      q._numberDisplayController = undefined;
      return q;
    }
    __extends(W, Y);
    Object.defineProperty(W.prototype, "numberDisplayController", {
      get: function () {
        this._numberDisplayController ||= this.autoSpinNumber.getComponent("NumberDisplayController");
        return this._numberDisplayController;
      },
      enumerable: false,
      configurable: true
    });
    // 判斷點擊位置是否在旋轉按鈕範圍內
    W.prototype._isTouchArea = function (q) {
      if (this.mode === L.SpinButtonMode.AUTOSPIN) {
        return true;
      }
      var S = q.touch ? q.touch.getLocation() : q.getLocation();
      var z = this.node.convertToNodeSpaceAR(S);
      var f = this.node.width / 2;
      return Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)) <= f;
    };
    // 處理旋轉按鈕的點擊事件
    W.prototype._clickSpinButton = function (q) {
      if (this._isTouchArea(q) && this._isInteractable) {
        this.clickSpinButton();
      }
    };
    // 監聽滑鼠移動以觸發懸停效果
    W.prototype._mouseMove = function (q) {
      if (this._isInteractable) {
        if (this._isTouchArea(q)) {
          if (!this.isHovered) {
            Y.prototype.mouseHovered.call(this, q);
          }
        } else if (this.isHovered) {
          Y.prototype.mouseLeave.call(this, q);
        }
      }
    };
    // 訂閱旋轉按鈕的事件監聽
    W.prototype._subscribeSpinButtonEvent = function () {
      this.node.on(cc.Node.EventType.TOUCH_END, this._clickSpinButton, this);
      this.node.on(cc.Node.EventType.MOUSE_MOVE, this._mouseMove, this);
    };
    // 回傳按鈕目前是否為隱藏狀態
    W.prototype.isHidden = function () {
      return !this.node.active;
    };
    // 觸發滑鼠移入時的顯示效果
    W.prototype.mouseHovered = function (q) {
      if (this._isInteractable && this.mode !== L.SpinButtonMode.DISABLED) {
        if (!this.isHovered) {
          Y.prototype.mouseHovered.call(this, q);
        }
      }
    };
    // 處理滑鼠離開按鈕的狀態
    W.prototype.mouseLeave = function (q) {
      if (this.isHovered) {
        Y.prototype.mouseLeave.call(this, q);
      }
    };
    // 停止按鈕相關的所有動畫
    W.prototype.onStopAllAnimations = function () {
      this.arrowHolder.stopAllActions();
      this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY];
    };
    // 初始設定旋轉按鈕與事件
    W.prototype.onInit = function () {
      this.onDisableButton();
      this._subscribeSpinButtonEvent();
      this._initSpinButtonNodes({
        spinButton: this.node
      });
    };
    // 顯示待機旋轉箭頭動畫
    W.prototype.onShowIdleAnimation = function () {
      this.arrowHolder.stopAllActions();
      this.arrowHolder.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
    };
    // 播放旋轉時的箭頭動畫與音效
    W.prototype.onShowSpinAnimation = function (q = true) {
      if (q) {
        this._playSpinButtonFx();
        C.playAudio(k.GENERAL_AUDIO.spinBtn.key);
      }
      this.onHideMouseOverEffect();
      this.arrowHolder.stopAllActions();
      var S = cc.rotateBy(0.25, 360).repeatForever();
      this.arrowHolder.runAction(S);
    };
    // 切換為正常狀態的箭頭圖示
    W.prototype.onReplaceSpinClearSpriteFrame = function () {
      if (this.mode === L.SpinButtonMode.ENABLED) {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.NORMAL];
      } else {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY];
      }
    };
    // 切換為模糊狀態的箭頭圖示
    W.prototype.onReplaceSpinBlurredSpriteFrame = function () {
      if (this.mode === L.SpinButtonMode.ENABLED) {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.BLUR];
      } else {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY_BLUR];
      }
    };
    // 停止旋轉動畫
    W.prototype.onShowStopSpinningAnimation = function () {
      this.arrowHolder.stopAllActions();
    };
    // 啟用按鈕並更新圖示狀態
    W.prototype.onEnableButton = function () {
      this._setSpinButtonInteractive(true);
      if (this.animationState === L.SpinButtonAnimationState.SPINNING) {
        this.onReplaceSpinBlurredSpriteFrame();
      } else {
        this.onReplaceSpinClearSpriteFrame();
      }
      this.onShowIdleAnimation();
    };
    // 停用按鈕並切換圖示
    W.prototype.onDisableButton = function () {
      this._setSpinButtonInteractive(false);
      if (this.animationState === L.SpinButtonAnimationState.SPINNING) {
        this.onReplaceSpinBlurredSpriteFrame();
      } else {
        this.onShowStopSpinningAnimation();
        this.onReplaceSpinClearSpriteFrame();
      }
    };
    // 顯示自動旋轉模式的介面
    W.prototype.showAutoSpinLook = function (q) {
      var S = this;
      this.spinButtonHolder.active = false;
      this.arrowHolder.active = false;
      this.autoSpinHolder.active = true;
      this.autoSpinHolder.opacity = 0;
      this.autoSpinHolder.stopAllActions();
      this.autoSpinHolder.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
        if (S.mode === L.SpinButtonMode.AUTOSPIN) {
          Y.prototype.showAutoSpinLook.call(S, q);
        }
      })));
      this.onUpdateAutoSpinCount(q);
    };
    // 更新自動旋轉剩餘次數顯示
    W.prototype.onUpdateAutoSpinCount = function (q) {
      if (this.mode === L.SpinButtonMode.AUTOSPIN) {
        this.numberDisplayController.clear();
        this.numberDisplayController.displayNumber(q, true);
      }
    };
    // 離開自動旋轉模式時重置介面
    W.prototype.onExitAutoSpinMode = function () {
      this.arrowHolder.active = true;
      this.spinButtonHolder.active = true;
      this.numberDisplayController.clear();
      this._inactiveAutoSpinHolder();
      if (D.settingMenuHelper.stopSpinOptionButtonAnim) {
        D.settingMenuHelper.stopSpinOptionButtonAnim();
      }
    };
    // 重新進入待機動畫狀態
    W.prototype.onResumeIdle = function () {
      this.onReplaceSpinClearSpriteFrame();
      this.arrowHolder.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
    };
    // 恢復旋轉動畫與圖示
    W.prototype.onResumeSpin = function () {
      this.onShowSpinAnimation(false);
      this.onReplaceSpinBlurredSpriteFrame();
    };
    // 恢復停止時的靜止狀態
    W.prototype.onResumeStop = function () {
      this.onShowStopSpinningAnimation();
      this.onReplaceSpinClearSpriteFrame();
    };
    // 播放滑鼠移入的特效動畫
    W.prototype.onPlayMouseOverEffect = function () {
      this.hoverSprite.spriteFrame = undefined;
      this.hoverAnimation.stop();
      this.hoverAnimation.setCurrentTime(0);
      this.hoverAnimation.node.active = true;
      if (this.animationState === L.SpinButtonAnimationState.IDLE || this.mode === L.SpinButtonMode.AUTOSPIN) {
        if (this.mode !== L.SpinButtonMode.AUTOSPIN) {
          this.hoverAnimation.node.parent = this.hoverNormalSpinHolder;
          this.hoverAnimation.playAdditive("anim_normal_spin_hover");
        } else {
          this.hoverAnimation.node.parent = this.hoverAutoSpinHolder;
          this.hoverAnimation.playAdditive("anim_auto_spin_hover");
        }
      }
    };
    // 隱藏滑鼠移入的特效動畫
    W.prototype.onHideMouseOverEffect = function () {
      this.hoverAnimation.stop();
      this.hoverAnimation.setCurrentTime(0);
      this.hoverAnimation.node.active = false;
      this.hoverSprite.spriteFrame = undefined;
    };
    // 淡出自動旋轉顯示區塊
    W.prototype._inactiveAutoSpinHolder = function () {
      var q = this;
      this.autoSpinHolder.stopAllActions();
      this.autoSpinHolder.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        q.autoSpinHolder.active = false;
      })));
    };
    // 播放旋轉按鈕的點擊特效
    W.prototype._playSpinButtonFx = function () {
      this.spinAnim.play();
    };
    // 初始化按鈕相關節點
    W.prototype._initSpinButtonNodes = function () {};
    // 設定按鈕是否可互動
    W.prototype._setSpinButtonInteractive = function (q) {
      this._isInteractable = q;
    };
    __decorate([Q({
      tooltip: false,
      type: cc.Button
    })], W.prototype, "spinButton", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Animation
    })], W.prototype, "spinAnim", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Node
    })], W.prototype, "spinButtonHolder", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Node
    })], W.prototype, "arrowHolder", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Sprite
    })], W.prototype, "arrowSprite", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Node
    })], W.prototype, "autoSpinHolder", undefined);
    __decorate([Q({
      tooltip: false,
      type: cc.Node
    })], W.prototype, "autoSpinNumber", undefined);
    __decorate([Q({
      tooltip: false,
      type: [cc.SpriteFrame]
    })], W.prototype, "arrowSpriteFrameList", undefined);
    __decorate([Q(cc.Node)], W.prototype, "hoverNormalSpinHolder", undefined);
    __decorate([Q(cc.Node)], W.prototype, "hoverAutoSpinHolder", undefined);
    __decorate([Q(cc.Animation)], W.prototype, "hoverAnimation", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "hoverSprite", undefined);
    __decorate([x.automationDec({
      func: j.initSpinButtonNode
    })], W.prototype, "_initSpinButtonNodes", null);
    __decorate([x.automationDec({
      func: j.setSpinButtonInteractivity
    })], W.prototype, "_setSpinButtonInteractive", null);
    return __decorate([V], W);
  }(L.default);
  exports.default = N;
  cc._RF.pop();
}