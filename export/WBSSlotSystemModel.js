if (!cc._RF.push(module, "3de34mFRnZOH7/13+CbPeHj", "WBSSlotSystemModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotSystemModel");
  var x = require("FeatureBuyHelper");
  var L = function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C._featureBuy = undefined;
      return C;
    }
    __extends(k, D);
    k.prototype.updateGameInfo = function (C) {
      D.prototype.updateGameInfo.call(this, C);
      this._featureBuy = x.generateFeatureBuyModel(C);
    };
    Object.defineProperty(k.prototype, "featureBuy", {
      get: function () {
        return this._featureBuy;
      },
      enumerable: false,
      configurable: true
    });
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}