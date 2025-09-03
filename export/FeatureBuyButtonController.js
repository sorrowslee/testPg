if (!cc._RF.push(module, "04700XZnupJZ5r+nkk7toBA", "FeatureBuyButtonController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x;
  var L;
  var D = require("WBSGameUtils");
  var k = require("AudioConstant");
  var C = require("AudioManager");
  var j = cc._decorator;
  var G = j.ccclass;
  var V = j.property;
  (function (N) {
    N[N.IDLE = 0] = "IDLE";
    N[N.DISABLE = 1] = "DISABLE";
    N[N.ENABLE = 2] = "ENABLE";
  })(T ||= {});
  (function (N) {
    N[N.ON = 0] = "ON";
    N[N.OFF = 1] = "OFF";
  })(x ||= {});
  (function (N) {
    N[N.ON = 0] = "ON";
    N[N.OFF = 1] = "OFF";
  })(L ||= {});
  var Q = function (N) {
    function Y() {
      var W = N !== null && N.apply(this, arguments) || this;
      W.button = undefined;
      W.text = undefined;
      W.hoverNode = undefined;
      W.holder = undefined;
      W._featureBuyButtonCallback = undefined;
      W._curentState = undefined;
      W._curentHoverState = x.OFF;
      W._curentForceHoverState = L.OFF;
      W._disposeZoom = undefined;
      return W;
    }
    __extends(Y, N);
    // 將按鈕平移至顯示位置
    Y.prototype.zoomIn = function (W, q) {
      var S = this;
      if (W === undefined) {
        W = false;
      }
      var z = this.node.x;
      var f = this._disposeZoom;
      if (f) {
        f();
      }
      this._disposeZoom = undefined;
      if (W) {
        this.node.setPosition(375, this.node.y);
        if (q) {
          q();
        }
      } else {
        this._disposeZoom = D.lerpTo(function (A, M) {
          var E = M * (2 - M);
          var F = cc.misc.lerp(z, 375, E);
          S.node.setPosition(F, S.node.y);
          if (M === 1) {
            S._disposeZoom = undefined;
            if (q) {
              q();
            }
          }
        }, z, 375, 1);
      }
    };
    // 將按鈕平移至隱藏位置
    Y.prototype.zoomOut = function (W, q) {
      var S = this;
      if (W === undefined) {
        W = false;
      }
      var z = this.node.x;
      var f = this._disposeZoom;
      if (f) {
        f();
      }
      this._disposeZoom = undefined;
      if (W) {
        this.node.setPosition(455, this.node.y);
        if (q) {
          q();
        }
      } else {
        this._disposeZoom = D.lerpTo(function (A, M) {
          var E = M * (2 - M);
          var F = cc.misc.lerp(z, 455, E);
          S.node.setPosition(F, S.node.y);
          if (M === 1) {
            S._disposeZoom = undefined;
            if (q) {
              q();
            }
          }
        }, z, 455, 4);
      }
    };
    // 依條件決定是否顯示按鈕
    Y.prototype.init = function (W, q) {
      this.button.node.active = W <= q;
    };
    // 設定按鈕文字的圖框
    Y.prototype.setSpriteFrame = function (W) {
      this.text.spriteFrame = W;
    };
    // 註冊按鈕點擊回呼
    Y.prototype.setButtonOnClick = function (W) {
      this._featureBuyButtonCallback = W;
    };
    // 點擊按鈕時觸發回呼
    Y.prototype.buttonOnClick = function () {
      if (T.DISABLE !== this._curentState) {
        var W = this._featureBuyButtonCallback;
        if (W) {
          W();
        }
      }
    };
    // 顯示按鈕並播放移動動畫
    Y.prototype.showButton = function () {
      if (this._curentState !== T.ENABLE) {
        this._curentState = T.ENABLE;
        this.button.node.active = true;
        this.holder.stopAllActions();
        if (this.holder.position.x !== 0) {
          this.holder.runAction(cc.moveTo(0.3, 0, 0).easing(cc.easeIn(3)));
        }
      }
    };
    // 隱藏按鈕並移動到側邊
    Y.prototype.hideButton = function () {
      var W = this;
      if (this._curentState !== T.DISABLE) {
        this._curentState = T.DISABLE;
        this._reset();
        this.holder.stopAllActions();
        if (this.holder.position.x !== 340) {
          var q = cc.sequence(cc.moveTo(0.3, 340, 0).easing(cc.easeIn(3)), cc.callFunc(function () {
            W.button.node.active = false;
          }));
          this.holder.runAction(q);
        }
        if (L.ON === this._curentForceHoverState) {
          this.stopHoverEffect();
        }
      }
    };
    // 啟用按鈕互動
    Y.prototype.setButtonEnable = function () {
      this.button.enabled = true;
    };
    // 停用按鈕互動
    Y.prototype.setButtonDisable = function () {
      this.button.enabled = false;
      if (L.ON === this._curentForceHoverState) {
        this.stopHoverEffect();
      }
    };
    // 註冊滑鼠懸停事件
    Y.prototype.registerHoverEvent = function () {
      if (x.ON !== this._curentHoverState) {
        this._curentHoverState = x.ON;
        this._registerHoverListenner();
      }
    };
    // 取消滑鼠懸停事件
    Y.prototype.unregisterHoverEvent = function () {
      if (x.OFF !== this._curentHoverState) {
        this._curentHoverState = x.OFF;
        this._unregisterHorverListenner();
      }
    };
    // 顯示整個功能按鈕區塊
    Y.prototype.show = function () {
      this._curentState = T.ENABLE;
      this.node.active = true;
    };
    // 隱藏整個功能按鈕區塊
    Y.prototype.hide = function () {
      this._curentState = T.DISABLE;
      this.node.active = false;
    };
    // 強制播放懸停效果
    Y.prototype.playHoverEffect = function () {
      if (L.ON !== this._curentForceHoverState && this._curentState !== T.DISABLE) {
        this._curentForceHoverState = L.ON;
        this._playHoverEffect();
      }
    };
    // 停止懸停效果
    Y.prototype.stopHoverEffect = function () {
      this._curentForceHoverState = L.OFF;
      this._stopHoverEffect();
    };
    // 設定按鈕停用時的透明度
    Y.prototype.setButtonDisableOpacity = function () {
      this.button.node.opacity = 127.5;
    };
    // 設定按鈕啟用時的透明度
    Y.prototype.setButtonEnableOpacity = function () {
      this.button.node.opacity = 255;
    };
    // 監聽滑鼠懸停事件
    Y.prototype._registerHoverListenner = function () {
      var W = this.button.node;
      W.on(cc.Node.EventType.MOUSE_ENTER, this._playMouseHoverEffect, this);
      W.on(cc.Node.EventType.MOUSE_LEAVE, this._stopMouseHoverEffect, this);
    };
    // 取消滑鼠懸停事件監聽
    Y.prototype._unregisterHorverListenner = function () {
      var W = this.button.node;
      W.off(cc.Node.EventType.MOUSE_ENTER, this._playMouseHoverEffect, this);
      W.off(cc.Node.EventType.MOUSE_LEAVE, this._stopMouseHoverEffect, this);
      this._reset();
    };
    // 播放懸停動畫與音效
    Y.prototype._playHoverEffect = function () {
      var W = this.text.node;
      W.stopAllActions();
      W.runAction(cc.sequence(cc.scaleTo(0.3, 1.15).easing(cc.easeIn(2)), cc.scaleTo(0.15, 1.1).easing(cc.easeOut(2))));
      var q = cc.Color.WHITE;
      var S = cc.Color.BLACK;
      this.hoverNode.stopAllActions();
      this.hoverNode.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
        C.playAudio(k.GENERAL_AUDIO.featureBuyHover.key);
      }), cc.tintTo(0.3, q.getR(), q.getG(), q.getB()), cc.delayTime(0.5), cc.tintTo(0.3, S.getR(), S.getG(), S.getB()), cc.delayTime(0.5))));
    };
    // 停止懸停動畫並還原
    Y.prototype._stopHoverEffect = function () {
      var W = this.text.node;
      W.stopAllActions();
      W.runAction(cc.scaleTo(0.3, 1));
      var q = cc.Color.BLACK;
      this.hoverNode.stopAllActions();
      this.hoverNode.runAction(cc.tintTo(0.3, q.getR(), q.getG(), q.getB()));
    };
    // 滑鼠移入時的懸停效果
    Y.prototype._playMouseHoverEffect = function () {
      if (L.ON !== this._curentForceHoverState) {
        this._playHoverEffect();
      }
    };
    // 滑鼠移出時停止懸停效果
    Y.prototype._stopMouseHoverEffect = function () {
      if (L.ON !== this._curentForceHoverState) {
        this._stopHoverEffect();
      }
    };
    // 按下按鈕時的縮放效果
    Y.prototype.playClickEffect = function () {
      this.button.node.runAction(cc.sequence(cc.scaleTo(0.1, 0.95).easing(cc.easeSineOut()), cc.scaleTo(0.1, 1).easing(cc.easeSineOut())));
    };
    // 重置按鈕與懸停狀態
    Y.prototype._reset = function () {
      var W = this.text.node;
      W.stopAllActions();
      W.scale = 1;
      var q = this.button.node;
      q.stopAllActions();
      q.scale = 1;
      this.hoverNode.stopAllActions();
      this.hoverNode.color = cc.Color.BLACK;
    };
    // 物件銷毀時移除事件監聽
    Y.prototype.onDestroy = function () {
      this._unregisterHorverListenner();
    };
    __decorate([V(cc.Button)], Y.prototype, "button", undefined);
    __decorate([V(cc.Sprite)], Y.prototype, "text", undefined);
    __decorate([V(cc.Node)], Y.prototype, "hoverNode", undefined);
    __decorate([V(cc.Node)], Y.prototype, "holder", undefined);
    return __decorate([G], Y);
  }(cc.Component);
  exports.default = Q;
  cc._RF.pop();
}