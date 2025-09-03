if (!cc._RF.push(module, "e01efU7BqFHHoZdNAD0tc2j", "WaysController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.waysTextSprite = undefined;
      return u;
    }
    __extends(C, k);
    C.prototype.setWaysText = function (u) {
      this.waysTextSprite.spriteFrame = u;
    };
    C.prototype.destroy = function () {
      this.waysTextSprite.spriteFrame = undefined;
      this.node.destroy();
      return k.prototype.destroy.call(this);
    };
    __decorate([L(cc.Sprite)], C.prototype, "waysTextSprite", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}