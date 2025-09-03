if (!cc._RF.push(module, "aa2360L0o1DHbvfzQuldvyg", "TimedWinRollLabelController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberLabelController");
  var x = require("TimedWinRollBaseController");
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