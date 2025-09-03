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
    W.prototype._isTouchArea = function (q) {
      if (this.mode === L.SpinButtonMode.AUTOSPIN) {
        return true;
      }
      var S = q.touch ? q.touch.getLocation() : q.getLocation();
      var z = this.node.convertToNodeSpaceAR(S);
      var f = this.node.width / 2;
      return Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)) <= f;
    };
    W.prototype._clickSpinButton = function (q) {
      if (this._isTouchArea(q) && this._isInteractable) {
        this.clickSpinButton();
      }
    };
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
    W.prototype._subscribeSpinButtonEvent = function () {
      this.node.on(cc.Node.EventType.TOUCH_END, this._clickSpinButton, this);
      this.node.on(cc.Node.EventType.MOUSE_MOVE, this._mouseMove, this);
    };
    W.prototype.isHidden = function () {
      return !this.node.active;
    };
    W.prototype.mouseHovered = function (q) {
      if (this._isInteractable && this.mode !== L.SpinButtonMode.DISABLED) {
        if (!this.isHovered) {
          Y.prototype.mouseHovered.call(this, q);
        }
      }
    };
    W.prototype.mouseLeave = function (q) {
      if (this.isHovered) {
        Y.prototype.mouseLeave.call(this, q);
      }
    };
    W.prototype.onStopAllAnimations = function () {
      this.arrowHolder.stopAllActions();
      this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY];
    };
    W.prototype.onInit = function () {
      this.onDisableButton();
      this._subscribeSpinButtonEvent();
      this._initSpinButtonNodes({
        spinButton: this.node
      });
    };
    W.prototype.onShowIdleAnimation = function () {
      this.arrowHolder.stopAllActions();
      this.arrowHolder.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
    };
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
    W.prototype.onReplaceSpinClearSpriteFrame = function () {
      if (this.mode === L.SpinButtonMode.ENABLED) {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.NORMAL];
      } else {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY];
      }
    };
    W.prototype.onReplaceSpinBlurredSpriteFrame = function () {
      if (this.mode === L.SpinButtonMode.ENABLED) {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.BLUR];
      } else {
        this.arrowSprite.spriteFrame = this.arrowSpriteFrameList[T.GREY_BLUR];
      }
    };
    W.prototype.onShowStopSpinningAnimation = function () {
      this.arrowHolder.stopAllActions();
    };
    W.prototype.onEnableButton = function () {
      this._setSpinButtonInteractive(true);
      if (this.animationState === L.SpinButtonAnimationState.SPINNING) {
        this.onReplaceSpinBlurredSpriteFrame();
      } else {
        this.onReplaceSpinClearSpriteFrame();
      }
      this.onShowIdleAnimation();
    };
    W.prototype.onDisableButton = function () {
      this._setSpinButtonInteractive(false);
      if (this.animationState === L.SpinButtonAnimationState.SPINNING) {
        this.onReplaceSpinBlurredSpriteFrame();
      } else {
        this.onShowStopSpinningAnimation();
        this.onReplaceSpinClearSpriteFrame();
      }
    };
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
    W.prototype.onUpdateAutoSpinCount = function (q) {
      if (this.mode === L.SpinButtonMode.AUTOSPIN) {
        this.numberDisplayController.clear();
        this.numberDisplayController.displayNumber(q, true);
      }
    };
    W.prototype.onExitAutoSpinMode = function () {
      this.arrowHolder.active = true;
      this.spinButtonHolder.active = true;
      this.numberDisplayController.clear();
      this._inactiveAutoSpinHolder();
      if (D.settingMenuHelper.stopSpinOptionButtonAnim) {
        D.settingMenuHelper.stopSpinOptionButtonAnim();
      }
    };
    W.prototype.onResumeIdle = function () {
      this.onReplaceSpinClearSpriteFrame();
      this.arrowHolder.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
    };
    W.prototype.onResumeSpin = function () {
      this.onShowSpinAnimation(false);
      this.onReplaceSpinBlurredSpriteFrame();
    };
    W.prototype.onResumeStop = function () {
      this.onShowStopSpinningAnimation();
      this.onReplaceSpinClearSpriteFrame();
    };
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
    W.prototype.onHideMouseOverEffect = function () {
      this.hoverAnimation.stop();
      this.hoverAnimation.setCurrentTime(0);
      this.hoverAnimation.node.active = false;
      this.hoverSprite.spriteFrame = undefined;
    };
    W.prototype._inactiveAutoSpinHolder = function () {
      var q = this;
      this.autoSpinHolder.stopAllActions();
      this.autoSpinHolder.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        q.autoSpinHolder.active = false;
      })));
    };
    W.prototype._playSpinButtonFx = function () {
      this.spinAnim.play();
    };
    W.prototype._initSpinButtonNodes = function () {};
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