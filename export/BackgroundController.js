if (!cc._RF.push(module, "f63afB6nfJFAY4uwEg0e8G6", "BackgroundController")) {
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
      c.slowDropEfxHolder = undefined;
      return c;
    }
    __extends(u, C);
    // 根據遊戲狀態切換背景顯示
    u.prototype.switchUI = function (c) {
      switch (c) {
        case T.TransitionState.FREE_SPIN:
        case T.TransitionState.FREE_SPIN_RESPIN:
          this.normalNode.active = false;
          this.bonusNode.active = true;
          this.slowDropEfxHolder.setPosition(0, -145);
          break;
        case T.TransitionState.NORMAL:
        case T.TransitionState.RESPIN:
        default:
          this.normalNode.active = true;
          this.bonusNode.active = false;
          this.slowDropEfxHolder.setPosition(0, 0);
      }
    };
    // 取得慢速掉落效果的容器節點
    u.prototype.getSlowDropEfxHolder = function () {
      return this.slowDropEfxHolder;
    };
    // 清除慢速掉落效果容器中的所有子節點
    u.prototype.resetSlowDropEfxHolder = function () {
      this.slowDropEfxHolder.removeAllChildren();
    };
    __decorate([D(cc.Node)], u.prototype, "normalNode", undefined);
    __decorate([D(cc.Node)], u.prototype, "bonusNode", undefined);
    __decorate([D(cc.Node)], u.prototype, "slowDropEfxHolder", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}