if (!cc._RF.push(module, "a0a6doEXuNKgJy7Sh2yc8T3", "NumberRollCurveController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberCurvedController");
  var x = require("NumberRollBaseController");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function c() {
      var j = u !== null && u.apply(this, arguments) || this;
      j.displayController = undefined;
      return j;
    }
    var p = {
      type: T.default,
      override: true
    };
    __extends(c, u);
    __decorate([k(p)], c.prototype, "displayController", undefined);
    return __decorate([D], c);
  }(x.default);
  exports.default = C;
  cc._RF.pop();
}