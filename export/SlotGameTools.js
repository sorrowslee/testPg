if (!cc._RF.push(module, "344ebiyUy1Dwb5GOgrFgN1h", "SlotGameTools")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.emitSocialBigWinEnd = exports.emitSocialBigWinStart = exports.isSuperMegaWinThreshold = exports.isMegaWinThreshold = exports.isBigWinThreshold = exports.isMediumWinThreshold = exports.getWinThresholds = undefined;
  var T = require("GameEventHandler");
  exports.getWinThresholds = function (x) {
    var L = x.systemModel;
    var D = L.maxLineNumber;
    var k = L.winThresholds;
    var C = x.transactionModel;
    var u = C.betSizeValue;
    var c = C.betLevelValue;
    return k.getAllThresholds(u, c, D);
  };
  exports.isMediumWinThreshold = function (x, L) {
    return !!L.mediumWinThreshold && !!(x >= L.mediumWinThreshold);
  };
  exports.isBigWinThreshold = function (x, L) {
    return !!L.bigWinThreshold && !!(x >= L.bigWinThreshold);
  };
  exports.isMegaWinThreshold = function (x, L) {
    return !!L.megaWinThreshold && !!(x >= L.megaWinThreshold);
  };
  exports.isSuperMegaWinThreshold = function (x, L) {
    return !!L.superMegaWinThreshold && !!(x >= L.superMegaWinThreshold);
  };
  exports.emitSocialBigWinStart = function (x) {
    T.emitGameEffectStateChangedEvent({
      displayState: "Start",
      effectType: "BigWin"
    });
    if (x) {
      x();
    }
  };
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