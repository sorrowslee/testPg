if (!cc._RF.push(module, "9c1bbOo47dBVKQhy7Uc4JE2", "ClickEffectController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.flashSpriteNode = undefined;
      u.clickEffectNode = undefined;
      u._clickEffectAnim = undefined;
      return u;
    }
    __extends(C, k);
    // 初始化點擊效果動畫
    C.prototype.onLoad = function () {
      this._clickEffectAnim = this.clickEffectNode.getComponent(cc.Animation);
    };
    // 在指定座標播放點擊動畫效果
    C.prototype.showClickEffect = function (u) {
      var c = this.node.convertToNodeSpaceAR(u);
      this.clickEffectNode.setPosition(c);
      this._clickEffectAnim.play("click_effect");
    };
    // 播放一次閃光效果
    C.prototype.showFlash = function () {
      this.flashSpriteNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, 150), cc.sequence(cc.delayTime(0.05), cc.fadeOut(0.3))), cc.callFunc(this._resetFlash, this)));
    };
    // 重置閃光節點狀態
    C.prototype._resetFlash = function () {
      var u = this.flashSpriteNode;
      u.opacity = 128;
      u.scale = 0;
    };
    __decorate([L(cc.Node)], C.prototype, "flashSpriteNode", undefined);
    __decorate([L(cc.Node)], C.prototype, "clickEffectNode", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}