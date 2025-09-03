if (!cc._RF.push(module, "344ebiyUy1Dwb5GOgrFgN1h", "SlotGameTools")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.emitSocialBigWinEnd = exports.emitSocialBigWinStart = exports.isSuperMegaWinThreshold = exports.isMegaWinThreshold = exports.isBigWinThreshold = exports.isMediumWinThreshold = exports.getWinThresholds = undefined;
  var T = require("GameEventHandler");
  // 取得各種獲獎門檻
  exports.getWinThresholds = function (x) {
    var L = x.systemModel;
    var D = L.maxLineNumber;
    var k = L.winThresholds;
    var C = x.transactionModel;
    var u = C.betSizeValue;
    var c = C.betLevelValue;
    return k.getAllThresholds(u, c, D);
  };
  // 判斷是否達到中獎門檻
  exports.isMediumWinThreshold = function (x, L) {
    return !!L.mediumWinThreshold && !!(x >= L.mediumWinThreshold);
  };
  // 判斷是否達到大獎門檻
  exports.isBigWinThreshold = function (x, L) {
    return !!L.bigWinThreshold && !!(x >= L.bigWinThreshold);
  };
  // 判斷是否達到超級大獎門檻
  exports.isMegaWinThreshold = function (x, L) {
    return !!L.megaWinThreshold && !!(x >= L.megaWinThreshold);
  };
  // 判斷是否達到極巨獎門檻
  exports.isSuperMegaWinThreshold = function (x, L) {
    return !!L.superMegaWinThreshold && !!(x >= L.superMegaWinThreshold);
  };
  // 發送社群大獎開始事件
  exports.emitSocialBigWinStart = function (x) {
    T.emitGameEffectStateChangedEvent({
      displayState: "Start",
      effectType: "BigWin"
    });
    if (x) {
      x();
    }
  };
  // 發送社群大獎結束事件
  exports.emitSocialBigWinEnd = function (x) {
    T.emitGameEffectStateChangedEvent({
      displayState: "End",
      effectType: "BigWin"
    });
    if (x) {
      x();
    }
  };
  cc._RF.pop();
}