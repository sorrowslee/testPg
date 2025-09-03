if (!cc._RF.push(module, "6a62eVFmd1Ng5ghvfVXBlUq", "AutoSpinHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.exitAutoSpin = exports.decrementAutoSpinCount = exports.resetAutoSpinCount = exports.startAutoSpin = exports.getAutoSpinCount = exports.shouldAutoSpin = undefined;
  var T = require("GameEventHandler");
  var x = -1;
  exports.shouldAutoSpin = function () {
    return x > 0;
  };
  exports.getAutoSpinCount = function () {
    return x;
  };
  exports.startAutoSpin = function (D, k, C) {
    x = D;
    k.enterAutoSpinMode(D, C);
    T.emitAutoplayStarted(function () {
      L(k);
    });
  };
  exports.resetAutoSpinCount = function () {
    x = -1;
  };
  exports.decrementAutoSpinCount = function (D) {
    x -= 1;
    D.updateAutoSpinCount(x);
  };
  exports.exitAutoSpin = function (D) {
    L(D);
    T.emitAutoplayStopped();
  };
  cc._RF.pop();
}
function L(D) {
  x = -1;
  D.exitAutoSpinMode();
}