if (!cc._RF.push(module, "eaed475bBBLf69c2AHexgPy", "SettingTurboSpinButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GenericSettingButton");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = require("TurboButtonEffect");
  var k = cc._decorator;
  var C = k.ccclass;
  var j = k.property;
  function G(Q, N) {
    return Math.floor(Math.random() * (N - Q + 1)) + Q;
  }
  var V = function (Q) {
    function N() {
      var Y = Q !== null && Q.apply(this, arguments) || this;
      Y.sprite = undefined;
      Y.spriteEffect = undefined;
      Y.titleLabel = undefined;
      Y.turboSpinOn = undefined;
      Y.turboSpinOff = undefined;
      Y.turboSpinEffectOn = undefined;
      Y.turboSpinEffectOff = undefined;
      Y.turboSpinEffectAnim = undefined;
      Y.lightingEffectAnim = undefined;
      Y.spriteLightEffectNode = undefined;
      Y.spriteLightShadowEffectNode = undefined;
      Y.turboButtonEffect = undefined;
      Y._isFirstTime = true;
      Y._abortTurboLoop = undefined;
      Y._abortRandomLighting = undefined;
      Y._lightingStyles = [{
        animName: "turbo_lighting_style_1",
        positionOffsetXLeft: 0,
        positionOffsetXRight: G(1, 3),
        positionOffsetYLeft: G(0, 3),
        positionOffsetYRight: G(0, 6),
        scaleX: 1.2,
        scaleY: 1.2,
        rotation: 0
      }, {
        animName: "turbo_lighting_style_2",
        positionOffsetXLeft: G(0, 4),
        positionOffsetXRight: G(0, 10),
        positionOffsetYLeft: G(0, 22),
        positionOffsetYRight: G(0, 8),
        scaleX: 1.4,
        scaleY: 1.2,
        rotation: 0
      }, {
        animName: "turbo_lighting_style_3",
        positionOffsetXLeft: G(0, 11),
        positionOffsetXRight: G(0, 22),
        positionOffsetYLeft: G(0, 5),
        positionOffsetYRight: G(0, 20),
        scaleX: 1.2,
        scaleY: 1.2,
        rotation: G(-10, 10)
      }];
      return Y;
    }
    __extends(N, Q);
    // 初始化並綁定效果更新
    N.prototype.onLoad = function () {
      Q.prototype.onLoad.call(this);
      this.turboButtonEffect.getComponent(D.default).setUpdateTurboMiddleIconCallback(this.changeTurboSprite.bind(this));
    };
    // 設定渦輪模式的圖示
    N.prototype.setTurboSprites = function (Y, W) {
      this.turboSpinOn = Y;
      this.turboSpinOff = W;
    };
    // 播放啟動渦輪的光效
    N.prototype.playTurboLighting = function () {
      this.spriteEffect.spriteFrame = undefined;
      this.turboSpinEffectAnim.once("finished", this._playTurboIdleAnim, this);
      if (this._isFirstTime) {
        this.turboSpinEffectAnim.play("turbo_icon_1st_up");
        this._isFirstTime = undefined;
      } else {
        this.turboSpinEffectAnim.play("turbo_icon_up");
      }
    };
    // 停止所有渦輪光效
    N.prototype.stopTurboLighting = function () {
      var Y = this._abortTurboLoop;
      this._abortTurboLoop = undefined;
      if (Y) {
        Y();
      }
      var W = this._abortRandomLighting;
      this._abortRandomLighting = undefined;
      if (W) {
        W();
      }
      this.turboSpinEffectAnim.stop();
      this.lightingEffectAnim.stop();
      this.spriteLightShadowEffectNode.opacity = 0;
      this.spriteLightEffectNode.getComponent(cc.Sprite).spriteFrame = undefined;
      this.spriteLightEffectNode.x = 0;
      this.spriteLightEffectNode.y = 0;
      this.spriteEffect.node.opacity = 255;
    };
    // 根據狀態切換渦輪圖示
    N.prototype.changeTurboSprite = function () {
      var Y = this.getTurboSpinCallback && this.getTurboSpinCallback();
      this.sprite.spriteFrame = Y ? this.turboSpinOn : this.turboSpinOff;
    };
    // 播放待機的渦輪動畫
    N.prototype._playTurboIdleAnim = function () {
      this._playRandomLighting();
      this._playTurboLoop();
    };
    // 隨機觸發閃電效果
    N.prototype._playRandomLighting = function () {
      var Y = this;
      this._abortRandomLighting = L.delayCallback(1)(function () {
        var W = Y._lightingStyles[G(0, 2)];
        var q = G(0, 1);
        var S = G(0, 1);
        Y.spriteLightEffectNode.x = q ? W.positionOffsetXRight : -W.positionOffsetXLeft;
        Y.spriteLightEffectNode.y = S ? W.positionOffsetYRight : -W.positionOffsetYLeft;
        Y.spriteLightEffectNode.scaleX = W.scaleX;
        Y.spriteLightEffectNode.scaleY = W.scaleY;
        Y.spriteLightEffectNode.angle = -W.rotation;
        Y.lightingEffectAnim.once("finished", Y._playRandomLighting, Y);
        Y.lightingEffectAnim.play(W.animName);
      });
    };
    // 循環播放渦輪動畫
    N.prototype._playTurboLoop = function () {
      var Y = this;
      this._abortTurboLoop = L.delayCallback(3)(function () {
        Y.turboSpinEffectAnim.once("finished", Y._playTurboLoop, Y);
        Y.turboSpinEffectAnim.play("turbo_icon_loop");
      });
    };
    // 調整圖示縮放大小
    N.prototype.setSpriteScaleSize = function (Y) {
      this.sprite.node.setScale(cc.v2(Y, Y));
    };
    // 設定按鈕標題文字
    N.prototype.setTitle = function (Y) {
      this.titleLabel.string = Y;
    };
    // 設定開啟時的按鈕顏色鍵
    N.prototype.setButtonOnColor = function (Y, W) {
      this._buttonOnColorDK = Y;
      this._buttonOnColorCK = W;
    };
    // 設定關閉時的按鈕顏色鍵
    N.prototype.setButtonOffColor = function (Y, W) {
      this._buttonOffColorDK = Y;
      this._buttonOffColorCK = W;
    };
    // 依狀態切換按鈕顏色
    N.prototype.changeButtonColor = function (Y) {
      this.buttonTheme.domainKey = Y ? this._buttonOnColorDK : this._buttonOffColorDK;
      this.buttonTheme.colorKey = Y ? this._buttonOnColorCK : this._buttonOffColorCK;
      Q.prototype.changeButtonColor.call(this, false);
    };
    // 按下按鈕時的縮放效果
    N.prototype.changeButtonPressedColor = function (Y) {
      if (Y) {
        this.node.runAction(cc.scaleTo(0.05, 0.9));
      } else {
        this.node.runAction(cc.sequence(cc.scaleTo(0.05, 1.1), cc.scaleTo(0.05, 1.05), cc.scaleTo(0.05, 1)));
      }
    };
    // 根據互動狀態調整整體顏色
    N.prototype.interactableButtonColor = function (Y) {
      if (this.buttonTheme) {
        var W = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        var S = Y ? W : q;
        this.turboSpinEffectAnim.node.opacity = S.a;
        L.setNodeColorWithOpacity(this.iconSprite, S);
        L.setNodeColorWithOpacity(this.spriteEffect.node, S);
        L.setNodeColorWithOpacity(this.spriteLightEffectNode, S);
        L.setNodeColorWithOpacity(this.spriteLightShadowEffectNode, S);
        L.setNodeColorWithOpacity(this.sprite.node, S);
      }
    };
    // 依主題更新特效顏色
    N.prototype.changeSpriteEffectColor = function () {
      if (this.buttonTheme) {
        var Y = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        L.setNodeColorWithOpacity(this.spriteEffect.node, Y);
        L.setNodeColorWithOpacity(this.spriteLightEffectNode, Y);
        L.setNodeColorWithOpacity(this.iconSprite, Y);
        L.setNodeColorWithOpacity(this.spriteLightShadowEffectNode, Y);
      }
    };
    // 銷毀前停止光效
    N.prototype.destroy = function () {
      this.stopTurboLighting();
      return Q.prototype.destroy.call(this);
    };
    __decorate([j(cc.Sprite)], N.prototype, "sprite", undefined);
    __decorate([j(cc.Sprite)], N.prototype, "spriteEffect", undefined);
    __decorate([j(cc.Label)], N.prototype, "titleLabel", undefined);
    __decorate([j(cc.SpriteFrame)], N.prototype, "turboSpinOn", undefined);
    __decorate([j(cc.SpriteFrame)], N.prototype, "turboSpinOff", undefined);
    __decorate([j(cc.SpriteFrame)], N.prototype, "turboSpinEffectOn", undefined);
    __decorate([j(cc.SpriteFrame)], N.prototype, "turboSpinEffectOff", undefined);
    __decorate([j(cc.Animation)], N.prototype, "turboSpinEffectAnim", undefined);
    __decorate([j(cc.Animation)], N.prototype, "lightingEffectAnim", undefined);
    __decorate([j(cc.Node)], N.prototype, "spriteLightEffectNode", undefined);
    __decorate([j(cc.Node)], N.prototype, "spriteLightShadowEffectNode", undefined);
    __decorate([j(D.default)], N.prototype, "turboButtonEffect", undefined);
    return __decorate([C], N);
  }(T.default);
  exports.default = V;
  cc._RF.pop();
}