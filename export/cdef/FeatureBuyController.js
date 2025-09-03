if (!cc._RF.push(module, "f4066bmbddDQY5MrDK5Qie2", "FeatureBuyController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = require("AudioManager");
  var L = require("AudioConstant");
  var D = require("SettingMenuHelper");
  var k = require("NumberDisplayController");
  var C = require("GameEventHandler");
  var j = require("Utils");
  var G = cc._decorator;
  var V = G.ccclass;
  var Q = G.property;
  (function (Y) {
    Y[Y.SHOW = 1] = "SHOW";
    Y[Y.HIDE = 2] = "HIDE";
  })(T ||= {});
  var N = function (Y) {
    function W() {
      var q = Y !== null && Y.apply(this, arguments) || this;
      q.dialogHolder = undefined;
      q.numberDisplayController = undefined;
      q.titleSprite = undefined;
      q.descriptionSprite = undefined;
      q.costSprite = undefined;
      q.startBtnSprite = undefined;
      q.cancelBtnSprite = undefined;
      q.startBtnNode = undefined;
      q.cancelBtnNode = undefined;
      q.startBtnHoverNode = undefined;
      q.cancelBtnHoverNode = undefined;
      q._featureBuyState = T.HIDE;
      q._featureBuyButtonEnableState = false;
      q._currentBetMultiply = 0;
      q._featureBuySpinCallback = undefined;
      q._featureBuyCancelCallback = undefined;
      q._featureDialogShowCallback = undefined;
      q._featureBuyButtonController = undefined;
      return q;
    }
    __extends(W, Y);
    // 設定相關按鈕的回呼
    W.prototype.setupButtonConfig = function (q) {
      this._featureDialogShowCallback = q.showDialogCallback;
      this._featureBuySpinCallback = q.confirmFeatureBuyCallback;
      this._featureBuyCancelCallback = q.cancelBuyCallback;
    };
    // 重置按鈕回呼設定
    W.prototype.resetButtonConfig = function () {
      this._featureBuySpinCallback = undefined;
      this._featureBuyCancelCallback = undefined;
      this._featureDialogShowCallback = undefined;
    };
    // 初始化各項節點與文字
    W.prototype.init = function (q) {
      var S = q.featureBuyButtonController;
      var z = q.featureBuyText;
      this._featureBuyButtonController = S;
      this._featureBuyButtonController.setButtonOnClick(this.showFeatureBuyDialog.bind(this));
      this.titleSprite.spriteFrame = z.getSpriteFrame("fb_title");
      this.descriptionSprite.spriteFrame = z.getSpriteFrame("fb_desc");
      this.costSprite.spriteFrame = z.getSpriteFrame("fb_cost");
      this.startBtnSprite.spriteFrame = z.getSpriteFrame("fb_start");
      this.cancelBtnSprite.spriteFrame = z.getSpriteFrame("fb_cancel");
    };
    // 設定是否允許購買
    W.prototype.setFeatureBuyButtonState = function (q) {
      this._featureBuyButtonEnableState = q;
    };
    // 設定購買倍數
    W.prototype.setFeatureBuyMultiply = function (q) {
      this._currentBetMultiply = q;
    };
    // 顯示 Feature Buy 按鈕
    W.prototype.showFeatureBuy = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this._featureBuyButtonController.show();
      }
    };
    // 隱藏 Feature Buy 按鈕
    W.prototype.hideFeatureBuy = function () {
      this._featureBuyButtonController.hide();
    };
    // 顯示整個 Feature Buy 功能
    W.prototype.showFeatureButton = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this.node.active = true;
        this._featureBuyButtonController.showButton();
        this.showFeatureBuy();
      }
    };
    // 隱藏整個 Feature Buy 功能
    W.prototype.hideFeatureButton = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this.node.active = false;
        this._featureBuyButtonController.hideButton();
      }
    };
    // 播放按鈕懸停效果
    W.prototype.playButtonHoverEffect = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this._featureBuyButtonController.playHoverEffect();
      }
    };
    // 停止按鈕懸停效果
    W.prototype.stopButtonHoverEffect = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this._featureBuyButtonController.stopHoverEffect();
      }
    };
    // 啟用 Feature Buy 功能
    W.prototype.enableFeatureBuy = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this._featureBuyButtonController.setButtonEnable();
        this._featureBuyButtonController.setButtonEnableOpacity();
        this._featureBuyButtonController.registerHoverEvent();
      }
    };
    // 停用 Feature Buy 功能
    W.prototype.disableFeatureBuy = function () {
      if (this._featureBuyButtonEnableState !== false) {
        this._featureBuyButtonController.setButtonDisable();
        this._featureBuyButtonController.setButtonDisableOpacity();
        this._featureBuyButtonController.unregisterHoverEvent();
      }
    };
    // 顯示購買對話框
    W.prototype.showFeatureBuyDialog = function () {
      if (this._featureBuyState !== T.SHOW) {
        x.playAudio(L.GENERAL_AUDIO.featureBuyBtn.key);
        this._featureBuyState = T.SHOW;
        this.dialogHolder.active = true;
        this._registerHoverListenner();
        this.dialogHolder.runAction(cc.fadeIn(0.3));
        var q = D.settingMenuHelper.additionalBetCalculation() * this._currentBetMultiply;
        this.numberDisplayController.clear();
        this.numberDisplayController.displayNumber(q, true);
        D.settingMenuHelper.setAllButtonsInteractable(false);
        C.emitGameFlowStateChangedEvent({
          displayState: "Start",
          flowType: "FeatureBuySelection"
        });
        this._featureBuyButtonController.playClickEffect();
        var z = this._featureDialogShowCallback;
        if (z) {
          z();
        }
      }
    };
    // 點擊確認購買
    W.prototype.onFeatureBuyClick = function () {
      if (this._featureBuyState !== T.HIDE) {
        this._featureBuyState = T.HIDE;
        var q = this._featureBuySpinCallback;
        this._dismissDialog(q);
      }
    };
    // 點擊取消購買
    W.prototype.onFeatureCancelClick = function () {
      if (this._featureBuyState !== T.HIDE) {
        this._featureBuyState = T.HIDE;
        x.playAudio(L.GENERAL_AUDIO.featureBuyCancel.key);
        var q = this._featureBuyCancelCallback;
        this._dismissDialog(q);
        D.settingMenuHelper.setAllButtonsInteractable(true);
      }
    };
    // 關閉對話框並執行回呼
    W.prototype._dismissDialog = function (q) {
      var S = this;
      j.sequenceCallback(function (z) {
        S.dialogHolder.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
          if (z) {
            z();
          }
        })));
      }, function (z) {
        S.dialogHolder.active = false;
        S._unregisterHorverListenner();
        if (z) {
          z();
        }
      })(function () {
        C.emitGameFlowStateChangedEvent({
          displayState: "End",
          flowType: "FeatureBuySelection"
        });
        if (q) {
          q();
        }
      });
    };
    // 開始按鈕的懸停效果
    W.prototype._playStartBtnHoverEffect = function () {
      this.startBtnNode.stopAllActions();
      this.startBtnNode.runAction(cc.sequence(cc.scaleTo(0.3, 1.15).easing(cc.easeIn(2)), cc.scaleTo(0.15, 1.1).easing(cc.easeOut(2))));
      var q = cc.Color.WHITE;
      var S = cc.Color.BLACK;
      this.startBtnHoverNode.stopAllActions();
      this.startBtnHoverNode.runAction(cc.repeatForever(cc.sequence(cc.tintTo(0.3, q.getR(), q.getG(), q.getB()), cc.delayTime(0.5), cc.tintTo(0.3, S.getR(), S.getG(), S.getB()), cc.delayTime(0.5))));
    };
    // 停止開始按鈕的懸停效果
    W.prototype._stopStartBtnHoverEffect = function () {
      this.startBtnNode.stopAllActions();
      this.startBtnNode.runAction(cc.scaleTo(0.3, 1));
      var q = cc.Color.BLACK;
      this.startBtnHoverNode.stopAllActions();
      this.startBtnHoverNode.runAction(cc.tintTo(0.3, q.getR(), q.getG(), q.getB()));
    };
    // 取消按鈕的懸停效果
    W.prototype._playCancelBtnHoverEffect = function () {
      this.cancelBtnNode.stopAllActions();
      this.cancelBtnNode.runAction(cc.sequence(cc.scaleTo(0.3, 1.1).easing(cc.easeIn(2)), cc.scaleTo(0.15, 1.05).easing(cc.easeOut(2))));
      var q = cc.Color.WHITE;
      var S = cc.Color.BLACK;
      this.cancelBtnHoverNode.stopAllActions();
      this.cancelBtnHoverNode.runAction(cc.repeatForever(cc.sequence(cc.tintTo(0.3, q.getR(), q.getG(), q.getB()), cc.delayTime(0.5), cc.tintTo(0.3, S.getR(), S.getG(), S.getB()), cc.delayTime(0.5))));
    };
    // 停止取消按鈕的懸停效果
    W.prototype._stopCancelBtnHoverEffect = function () {
      this.cancelBtnNode.stopAllActions();
      this.cancelBtnNode.runAction(cc.scaleTo(0.3, 1));
      var q = cc.Color.BLACK;
      this.cancelBtnHoverNode.stopAllActions();
      this.cancelBtnHoverNode.runAction(cc.tintTo(0.3, q.getR(), q.getG(), q.getB()));
    };
    // 重置兩個按鈕的懸停效果
    W.prototype._resetStartAndCancelHover = function () {
      this.startBtnHoverNode.stopAllActions();
      this.cancelBtnHoverNode.stopAllActions();
      this.startBtnHoverNode.color = cc.Color.BLACK;
      this.cancelBtnHoverNode.color = cc.Color.BLACK;
    };
    // 註冊對話框內按鈕的懸停事件
    W.prototype._registerHoverListenner = function () {
      this.startBtnNode.on(cc.Node.EventType.MOUSE_ENTER, this._playStartBtnHoverEffect, this);
      this.startBtnNode.on(cc.Node.EventType.MOUSE_LEAVE, this._stopStartBtnHoverEffect, this);
      this.cancelBtnNode.on(cc.Node.EventType.MOUSE_ENTER, this._playCancelBtnHoverEffect, this);
      this.cancelBtnNode.on(cc.Node.EventType.MOUSE_LEAVE, this._stopCancelBtnHoverEffect, this);
    };
    // 解除對話框內按鈕的懸停事件
    W.prototype._unregisterHorverListenner = function () {
      this.startBtnNode.off(cc.Node.EventType.MOUSE_ENTER, this._playStartBtnHoverEffect, this);
      this.startBtnNode.off(cc.Node.EventType.MOUSE_LEAVE, this._stopStartBtnHoverEffect, this);
      this.cancelBtnNode.off(cc.Node.EventType.MOUSE_ENTER, this._playCancelBtnHoverEffect, this);
      this.cancelBtnNode.off(cc.Node.EventType.MOUSE_LEAVE, this._stopCancelBtnHoverEffect, this);
      this._resetStartAndCancelHover();
    };
    __decorate([Q(cc.Node)], W.prototype, "dialogHolder", undefined);
    __decorate([Q(k.default)], W.prototype, "numberDisplayController", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "titleSprite", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "descriptionSprite", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "costSprite", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "startBtnSprite", undefined);
    __decorate([Q(cc.Sprite)], W.prototype, "cancelBtnSprite", undefined);
    __decorate([Q(cc.Node)], W.prototype, "startBtnNode", undefined);
    __decorate([Q(cc.Node)], W.prototype, "cancelBtnNode", undefined);
    __decorate([Q(cc.Node)], W.prototype, "startBtnHoverNode", undefined);
    __decorate([Q(cc.Node)], W.prototype, "cancelBtnHoverNode", undefined);
    return __decorate([V], W);
  }(cc.Component);
  exports.default = N;
  cc._RF.pop();
}