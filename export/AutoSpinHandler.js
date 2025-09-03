if (!cc._RF.push(module, "6a62eVFmd1Ng5ghvfVXBlUq", "AutoSpinHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.exitAutoSpin = exports.decrementAutoSpinCount = exports.resetAutoSpinCount = exports.startAutoSpin = exports.getAutoSpinCount = exports.shouldAutoSpin = undefined;
  var T = require("GameEventHandler");
  var x = -1;
  // 判斷是否需要自動旋轉
  exports.shouldAutoSpin = function () {
    return x > 0;
  };
  // 取得剩餘自動旋轉次數
  exports.getAutoSpinCount = function () {
    return x;
  };
  // 開始自動旋轉並進入自動模式
  exports.startAutoSpin = function (D, k, C) {
    x = D;
    k.enterAutoSpinMode(D, C);
    T.emitAutoplayStarted(function () {
      L(k);
    });
  };
  // 重設自動旋轉計數
  exports.resetAutoSpinCount = function () {
    x = -1;
  };
  // 自動旋轉結束時遞減計數
  exports.decrementAutoSpinCount = function (D) {
    x -= 1;
    D.updateAutoSpinCount(x);
  };
  // 結束自動旋轉模式
  exports.exitAutoSpin = function (D) {
    L(D);
    T.emitAutoplayStopped();
  };
  cc._RF.pop();
}
// 離開自動旋轉模式並重設計數
function L(D) {
  x = -1;
  D.exitAutoSpinMode();
}