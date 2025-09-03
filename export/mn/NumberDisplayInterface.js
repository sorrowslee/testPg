if (!cc._RF.push(module, "6e9deOwoQZHDb/Mv4FAbr3R", "NumberDisplayInterface")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var l = C !== null && C.apply(this, arguments) || this;
      l.numberContainer = undefined;
      l.maxContainerSize = 1142;
      l.enableComma = true;
      l.enableDecimal = true;
      l.enableShortenNumber = false;
      return l;
    }
    __extends(u, C);
    u.prototype.numberWithComma = function (l) {
      var G = T.getDefaultCurrencyFormat().groupSeparator;
      return l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, G);
    };
    u.prototype.setResizeAnimation = function (l) {
      this._resizeFunc = l;
    };
    u.prototype.displayNumber = function (l, G = true) {
      throw Error("NumberDisplayInterface: method must be overriden");
    };
    u.prototype.clear = function () {
      throw Error("NumberDisplayInterface: method must be overriden");
    };
    u.prototype.resizeNumberIfNeeded = function () {
      throw Error("NumberDisplayInterface: method must be overriden");
    };
    __decorate([D(cc.Node)], u.prototype, "numberContainer", undefined);
    __decorate([D(cc.Float)], u.prototype, "maxContainerSize", undefined);
    __decorate([D({
      tooltip: false
    })], u.prototype, "enableComma", undefined);
    __decorate([D({
      tooltip: false
    })], u.prototype, "enableDecimal", undefined);
    __decorate([D({
      tooltip: false
    })], u.prototype, "enableShortenNumber", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}