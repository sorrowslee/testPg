if (!cc._RF.push(module, "c9080q97lVM/pqPyA6WOfJi", "SystemFeatureHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.checkSpinValidity = exports.handleSystemEvent = exports.getReevaluateBet = undefined;
  var T = require("SlotAnalyticsEnum");
  var x = require("Utils");
  var L = require("GameEventHandler");
  // 取得重新評估下注的處理函式
  exports.getReevaluateBet = k;
  // 處理系統事件與自動旋轉流程
  exports.handleSystemEvent = function (C) {
    var u = C.autoSpinCount;
    var c = C.exitAutoSpinHandler;
    var p = C.walletHelper;
    var j = C.settingMenuHelper;
    var G = C.betChangedHandler;
    x.sequenceCallback(D(p, u, c), k(j, G))(C.callback);
  };
  // 檢查旋轉是否合法並回傳使用的點數類型
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
  // 若錢包已完成且仍有自動旋轉，則先結束自動旋轉再執行回呼
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
  // 重新評估下注後執行對應回呼
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