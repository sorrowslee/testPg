if (!cc._RF.push(module, "96252/qWvdGA7VOxWpX5d7v", "ButtonBackground")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("UIAppearanceHelper");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.background = undefined;
      c.backgroundColorKey = "";
      return c;
    }
    __extends(u, C);
    // 根據設定的顏色鍵套用背景色
    u.prototype.onLoad = function () {
      this.background.color = T.uiAppearanceHelper.v("" + this.backgroundColorKey) ? T.uiAppearanceHelper.v("" + this.backgroundColorKey) : T.uiAppearanceHelper.v("setting.theme_color");
    };
    __decorate([D(cc.Node)], u.prototype, "background", undefined);
    __decorate([D(cc.String)], u.prototype, "backgroundColorKey", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}