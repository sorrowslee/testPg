if (!cc._RF.push(module, "ea5caTag+xJsrT667bFPlnC", "MoreMenuButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GenericSettingButton");
  var x = cc._decorator;
  var L = x.ccclass;
  x.property;
  var D = function (k) {
    function C() {
      return k !== null && k.apply(this, arguments) || this;
    }
    __extends(C, k);
    // 初始設定額外的碰撞範圍位置
    C.prototype.customSetup = function () {
      this.circleCollider.x = -10;
    };
    return __decorate([L], C);
  }(T.default);
  exports.default = D;
  cc._RF.pop();
}