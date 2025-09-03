if (!cc._RF.push(module, "7f6b45PVuNABKgWMXjQR2LN", "ForegroundController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GameConstant");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.normalNode = undefined;
      c.bonusNode = undefined;
      c.bulletEffectAnim = undefined;
      c.topGlowLeft = undefined;
      c.topGlowRight = undefined;
      c.textLeft = undefined;
      c.textRight = undefined;
      c.btmGlow = undefined;
      return c;
    }
    __extends(u, C);
    // 設定左右文字的圖框
    u.prototype.init = function (c) {
      this.textLeft.spriteFrame = c.leftWay;
      this.textRight.spriteFrame = c.rightWay;
    };
    // 根據狀態切換前景 UI
    u.prototype.switchUI = function (c) {
      switch (c) {
        case T.TransitionState.FREE_SPIN:
        case T.TransitionState.FREE_SPIN_RESPIN:
          this.normalNode.active = false;
          this.bonusNode.active = true;
          this.playGlowEffect();
          break;
        case T.TransitionState.NORMAL:
        case T.TransitionState.RESPIN:
        default:
          this.stopGlowEffect();
          this.normalNode.active = true;
          this.bonusNode.active = false;
      }
    };
    // 播放開場子彈動畫
    u.prototype.playGameIntroBullet = function () {
      this.bulletEffectAnim.play();
    };
    // 播放前景發光效果
    u.prototype.playGlowEffect = function () {
      var c = cc.repeatForever(cc.sequence(cc.delayTime(1), cc.fadeTo(1, 255), cc.fadeTo(1, 0)));
      var p = cc.repeatForever(cc.sequence(cc.delayTime(1), cc.fadeTo(1, 255), cc.fadeTo(1, 0)));
      var j = cc.repeatForever(cc.sequence(cc.delayTime(1), cc.fadeTo(1, 255), cc.fadeTo(1, 0)));
      this.topGlowLeft.runAction(c);
      this.topGlowRight.runAction(p);
      this.btmGlow.runAction(j);
    };
    // 停止前景發光效果
    u.prototype.stopGlowEffect = function () {
      this.topGlowLeft.stopAllActions();
      this.topGlowRight.stopAllActions();
      this.btmGlow.stopAllActions();
      this.topGlowLeft.opacity = 0;
      this.topGlowRight.opacity = 0;
      this.btmGlow.opacity = 0;
    };
    __decorate([D(cc.Node)], u.prototype, "normalNode", undefined);
    __decorate([D(cc.Node)], u.prototype, "bonusNode", undefined);
    __decorate([D(cc.Animation)], u.prototype, "bulletEffectAnim", undefined);
    __decorate([D(cc.Node)], u.prototype, "topGlowLeft", undefined);
    __decorate([D(cc.Node)], u.prototype, "topGlowRight", undefined);
    __decorate([D(cc.Sprite)], u.prototype, "textLeft", undefined);
    __decorate([D(cc.Sprite)], u.prototype, "textRight", undefined);
    __decorate([D(cc.Node)], u.prototype, "btmGlow", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}