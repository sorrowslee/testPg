if (!cc._RF.push(module, "c28b1182V1L76OZ4d+S0I1B", "SlowDropTopItemController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.animation = undefined;
      u.vfxHolder = undefined;
      return u;
    }
    __extends(C, k);
      // 顯示頂部特效並播放動畫
      C.prototype.show = function () {
      this.animation.node.stopAllActions();
      this.vfxHolder.stopAllActions();
      this.vfxHolder.runAction(cc.fadeIn(0.3));
      this.animation.node.runAction(cc.fadeIn(0.3));
      this.animation.play();
    };
      // 隱藏特效並淡出
      C.prototype.hide = function () {
      var u = this;
      this.animation.node.stopAllActions();
      this.animation.node.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        u.animation.stop();
        u.reset();
      })));
      this.vfxHolder.stopAllActions();
      this.vfxHolder.runAction(cc.fadeOut(0.3));
    };
      // 重置狀態為未顯示
      C.prototype.reset = function () {
      this.vfxHolder.stopAllActions();
      this.vfxHolder.opacity = 0;
      this.animation.node.stopAllActions();
      this.animation.node.opacity = 0;
      this.animation.stop();
    };
    __decorate([L(cc.Animation)], C.prototype, "animation", undefined);
    __decorate([L(cc.Node)], C.prototype, "vfxHolder", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}