if (!cc._RF.push(module, "8cf0eKqDPpJIqyTM7FI7ivt", "BaseLoadingController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instantiateController = undefined;
  var T = require("AnalyticsHelper");
  var x = require("QuitGameWithEvent");
  var L = require("ErrorHandler");
  var D = require("NoSoundAdapter");
  var k = require("ResourceLoader");
  var C = require("SettingMenuHelper");
  var j = require("RtConfig");
  var G = require("GameAudioAdapter");
  var V = require("SettingMenuAssetConfig");
  exports.instantiateController = q;
  var Q = cc._decorator;
  var N = Q.ccclass;
  var Y = Q.property;
  var W = function (S) {
    function z() {
      var A = S !== null && S.apply(this, arguments) || this;
      A.settingMenuHolder = undefined;
      A.settingMenuFooterHolder = undefined;
      A.resourceLoader = new k.default();
      A.gameLaunched = false;
      A._isSettingMenuLoaded = false;
      return A;
    }
    __extends(z, S);
    // 建立初始資料並設定控制器
    z.prototype.setup = function (A) {
      this.generalControllers = A.generalControllers;
      this.bonusControllers = A.bonusControllers;
      this.generalControllers.settingMenuFooterHolder = this.settingMenuFooterHolder;
      this._initSettingMenuAudioTasks();
    };
    // 初始化設定選單使用的音效系統
    z.prototype._initSettingMenuAudioTasks = function () {
      var A = j.cs_Launch.noAudio === "1" ? D.default : G.default;
      C.settingMenuHelper.initAudio(A);
    };
    // 載入設定選單與傳入資源的 bundle
    z.prototype.loadBundle = function (A, M) {
      var E = this;
      var F = A;
      if (!this._isSettingMenuLoaded) {
        var b = V.getSettingMenuAssetConfig();
        F = F.concat(b);
      }
      var H = {
        bundle: F,
        progressCallback: this.progressCallback.bind(this),
        retryHandling: this._retryHandling.bind(this),
        retryingCallback: this._sendErrorReport.bind(this),
        retryMessage: shell.I18n.t("General.ResourceRetryMessage")
      };
      this.resourceLoader.loadBundle(H).then(function (w) {
        if (!E._isSettingMenuLoaded) {
          E._isSettingMenuLoaded = true;
          E._settingMenuTaskComplete(w);
        }
        M(w);
      });
    };
    // 遇到載入失敗時的重試處理
    z.prototype._retryHandling = function (A, M, E, F) {
      var b = shell.Error;
      var H = shell.ClientError;
      var w = new b(H.Domain, H.GameLoadResourceError);
      var U = F > 0 ? F : undefined;
      T.sendLoadFailReport(U);
      var B = this.gameLaunched ? L.ErrContext.Preload : L.ErrContext.Launch;
      L.showError(w, B, function (P) {
        switch (P) {
          case L.ErrAction.Retry:
            if (A) {
              A();
            }
            break;
          case L.ErrAction.Quit:
            x.quitGameWithEvent("Load resource fail")();
        }
      });
    };
    // 回報載入錯誤資訊
    z.prototype._sendErrorReport = function (A) {
      var M = A > 0 ? A : undefined;
      T.sendLoadFailReport(M);
    };
    // 更新載入進度顯示
    z.prototype.progressCallback = function (A, M) {
      shell.setProgress(A, M);
    };
    // 設定選單資源載入完成後的初始化
    z.prototype._settingMenuTaskComplete = function (A) {
      var M = A.setting_menu;
      var E = A.setting_menu_wallet_panel;
      var F = A.setting_menu_auto_spin_button;
      var b = A.setting_menu_more_menu_button;
      var H = A.setting_menu_setting_button;
      var w = A.setting_menu_rules_button;
      var U = A.setting_menu_payout_button;
      var B = A.setting_menu_history_button;
      var P = A.setting_menu_hide_more_button;
      var X = A.setting_menu_smart_bot_button;
      var y = A.setting_menu_minus_bet_button;
      var v = A.setting_menu_plus_bet_button;
      var J = A.setting_menu_turbo_spin_button;
      var Z0 = A.setting_menu_sprite_atlas;
      var Z1 = A.setting_menu_quit_button;
      this.generalControllers.settingController = q(M.result, "SettingMenuController", this.settingMenuHolder);
      this.generalControllers.settingMenuFooterController = q(E.result, "SettingInfoFooterController");
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.QUIT, Z1.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.SPIN_OPTIONS, F.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.MORE_MENU, b.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.SOUND, H.result, true);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.RULE, w.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.PAYTABLE, U.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.HISTORY, B.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.HIDE_MORE, P.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.SMARTBOT, X.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.MINUS_BET, y.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.PLUS_BET, v.result);
      C.settingMenuHelper.setButtonPrefab(C.ButtonPrefabType.TURBO_SPIN, J.result, true);
      C.settingMenuHelper.settingMenuLocaleIcons = Z0.result;
    };
    __decorate([Y(cc.Node)], z.prototype, "settingMenuHolder", undefined);
    __decorate([Y(cc.Node)], z.prototype, "settingMenuFooterHolder", undefined);
    return __decorate([N], z);
  }(cc.Component);
  exports.default = W;
  cc._RF.pop();
}
function q(S, z, A) {
  // 生成指定 prefab 並回傳其上的控制器元件
  var M = cc.instantiate(S);
  if (A) {
    A.addChild(M);
  }
  return M.getComponent(z);
}