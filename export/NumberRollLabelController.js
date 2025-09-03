if (!cc._RF.push(module, "9b7acp+xyJLMJ5gESfkIJHz", "NumberRollLabelController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberLabelController");
  var x = require("NumberRollBaseController");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function p() {
      var j = u !== null && u.apply(this, arguments) || this;
      j.displayController = undefined;
      return j;
    }
    var c = {
      type: T.default,
      override: true
    };
    __extends(p, u);
    __decorate([k(c)], p.prototype, "displayController", undefined);
    return __decorate([D], p);
  }(x.default);
  exports.default = C;
  cc._RF.pop();
}