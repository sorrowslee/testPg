if (!cc._RF.push(module, "c9080q97lVM/pqPyA6WOfJi", "SystemFeatureHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.checkSpinValidity = exports.handleSystemEvent = exports.getReevaluateBet = undefined;
  var T = require("SlotAnalyticsEnum");
  var x = require("Utils");
  var L = require("GameEventHandler");
  exports.getReevaluateBet = k;
  exports.handleSystemEvent = function (C) {
    var u = C.autoSpinCount;
    var c = C.exitAutoSpinHandler;
    var p = C.walletHelper;
    var j = C.settingMenuHelper;
    var G = C.betChangedHandler;
    x.sequenceCallback(D(p, u, c), k(j, G))(C.callback);
  };
  exports.checkSpinValidity = function (C) {
    var u = C.callback;
    var c = C.walletHelper;
    var p = C.getCostPerSpinFunction;
    var j = C.dataSource;
    var l = p();
    var G = {
      totalBet: l
    };
    L.emitRequestPlayEvent(G, function (V) {
      if (V) {
        if (c.isFreeGameMode() && c.hasFreeGame()) {
          u(T.SpinCredits.FREE_GAME);
        } else {
          u(T.SpinCredits.CASH);
        }
      } else if (l > j.playerModel.balance) {
        u(T.SpinCredits.INSUFFICIENT);
      } else {
        u(T.SpinCredits.BET_INVALID);
      }
    });
  };
  cc._RF.pop();
}
function D(C, u, c) {
  return function (p) {
    if (C.isWalletCompleted() && u > 0 && c) {
      c();
    }
    if (p) {
      p();
    }
  };
}
function k(C, u) {
  return function (c) {
    if (C.reevaluateBet()) {
      if (u) {
        u(c);
      } else {
        C.updateBetValues();
        if (c) {
          c();
        }
      }
    } else if (c) {
      c();
    }
  };
}