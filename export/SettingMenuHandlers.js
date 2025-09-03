if (!cc._RF.push(module, "e4a87/dIGtMT5oq5NQEGbT5", "SettingMenuHandlers")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleSettingMenuMusicChange = exports.handleSettingMenuFlipped = exports.additionalBetCalculation = exports.updateDataSourceBetValue = exports.getBetChangeCallback = exports.updateBetChangesCallback = exports.initializeSettingMenu = exports.setupSettingMenu = undefined;
  var L = require("LaunchConfig");
  var D = require("AnalyticsHelper");
  var k = require("QuitGameWithEvent");
  var C = require("Utils");
  var j = {
    settingMenuLibPath: "lib/setting_menu/"
  };
  // 初始化設定選單相關依賴
  exports.setupSettingMenu = function (q) {
    var S = Object.assign({}, j, q.settingMenuDependenciesPath);
    var z = q.settingMenuHelper;
    var f = q.dataSource;
    var A = q.callback;
    z.path = S.settingMenuLibPath;
    z.showChangeBetReminder = q.isProgressiveGame;
    z.showForfeitProgressReminder = q.showForfeitProgressReminder;
    z.manualUpdateBetFactorCallBack = V(f, z, q.betChangeCallback);
    z.betModifierUpdateCallback = G(f, z, q.betChangeCallback);
    z.reevaluateBetCallback = Q(f, q.reevaluateBetCallback);
    z.additionalBetCalculationCallback = q.additionalBetCalculation ? q.additionalBetCalculation : N;
    z.changeSoundVolume = W(q.toggleEffectMuted, q.toggleMusicMuted);
    var M = L.cs_Launch.noAudio !== "1";
    z.audioConfigure = M;
    if (A) {
      A();
    }
  };
  // 建立設定選單並載入初始資料
  exports.initializeSettingMenu = function (q) {
    var S = q.settingMenuHelper;
    var z = q.dataSource;
    var f = q.callback;
    S.setSettingMenuController(q.settingController);
    S.addSettingInfoFooter(q.settingWalletPanelController);
    S.setOnClickReturnButtonCallback(function () {
      k.quitGameWithEvent("Setting Quit")();
    });
    S.setupSettingMenuButtons();
    S.menuChangedCallBack = q.settingMenuChangedHandling ? q.settingMenuChangedHandling : Y(q.spinButtonController);
    var A = z.playerModel.balance;
    S.setBalance(A);
    S.updateBetValues();
    S.setAllButtonsInteractable(false);
    if (f) {
      f();
    }
  };
  exports.updateBetChangesCallback = G;
  exports.getBetChangeCallback = V;
  exports.updateDataSourceBetValue = Q;
  exports.additionalBetCalculation = N;
  exports.handleSettingMenuFlipped = Y;
  exports.handleSettingMenuMusicChange = W;
  cc._RF.pop();
}
function G(q, S, z) {
  // 更新下注數值並發送事件
  return function (f, A) {
    var M = q.systemModel.maxLineNumber;
    S.betSizeValue = f;
    S.betLevelValue = A;
    Q(q)(f, A);
    D.sendEvent(shell.ga.CATEGORY_GAME, shell.ga.EVENT_SLOT_CHANGE_BET, {
      amount: f * A * M
    });
    if (z) {
      z();
    }
  };
}
function V(q, S, z) {
  // 建立觸發下注變更的回呼
  return function (f, A) {
    G(q, S)(f, A);
    S.updateBetValues();
    if (z) {
      z();
    }
  };
}
function Q(q, S) {
  // 將下注值寫回資料來源
  return function (z, f) {
    q.transactionModel.betSizeValue = z;
    q.transactionModel.betLevelValue = f;
    if (S) {
      S();
    }
  };
}
function N(q, S, z) {
  // 計算額外的下注總額
  return C.toDecimalWithExp(q * S * z, 2);
}
function Y(q) {
  // 處理設定選單切換時顯示或隱藏旋轉按鈕
  return function (S) {
    if (S) {
      q.hide();
    } else {
      q.show();
    }
  };
}
function W(q, S) {
  // 切換音效與音樂的靜音狀態
  return function (z) {
    q(!z);
    S(!z);
  };
}