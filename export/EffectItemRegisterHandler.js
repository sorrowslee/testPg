if (!cc._RF.push(module, "6ebd6TJAR9CwJRpqoGa/c3s", "EffectItemRegisterHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.effectItemRegisterHandler = exports.EffectItemRegisterHandler = undefined;
  var T = require("NodePoolHandler");
  var x = function () {
    function D() {}
    D.prototype.init = function (k) {
      k.forEach(function (C) {
        T.nodePoolHandler.registerReusableItem(C.name, C.itemPrefab, C.handler, C.value);
      });
    };
    return D;
  }();
  exports.EffectItemRegisterHandler = x;
  var L = new x();
  exports.effectItemRegisterHandler = L;
  cc._RF.pop();
}