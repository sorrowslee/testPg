if (!cc._RF.push(module, "9928eUmiH5DjJzRecinmoRP", "IdleState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AutoSpinHandler");
  var x = require("SlotGameConstants");
  var L = require("SlotAnalyticsEnum");
  var D = require("SystemFeatureHandler");
  var k = require("AnalyticsHelper");
  var C = require("GameEventHandler");
  var j = require("UIState");
  var G = require("SpinButtonController");
  var V = require("SlotDependencyManager");
  var Q = require("SettingMenuHelper");
  var N = require("Utils");
  var Y = function (W) {
    function q(S, z, A) {
      var M = W.call(this, S, z, A) || this;
      M.name = "Idle State";
      M.autoSpinDelay = x.DEFAULT_AUTO_SPIN_DELAY_TIME;
      M._defaultCheckSystemEventConfig = {
        autoSpinCount: T.getAutoSpinCount(),
        walletHelper: V.walletHelper,
        settingMenuHelper: Q.settingMenuHelper,
        exitAutoSpinHandler: M.exitAutoSpin.bind(M),
        callback: M.tryAutoSpin.bind(M)
      };
      return M;
    }
    __extends(q, W);
    // 設定轉輪控制器引用
    q.prototype.setSlotController = function (S) {
      this.slotController = S;
    };
    // 設定旋轉按鈕控制器
    q.prototype.setSpinButtonController = function (S) {
      this.spinButtonController = S;
    };
    // 設定自動旋轉的延遲時間
    q.prototype.setAutoSpinDelay = function (S) {
      this.autoSpinDelay = S;
    };
    // 進入狀態時檢查系統事件
    q.prototype.run = function () {
      W.prototype.run.call(this);
      var S = this._defaultCheckSystemEventConfig;
      var z = this.defineSystemEventConfigParam();
      D.handleSystemEvent(__assign(__assign({}, S), z));
    };
    // 離開狀態時處理自動旋轉與分析事件
    q.prototype.exit = function (S) {
      this.disposeAutoSpin();
      if (!this.dataSource.isGameReplaying) {
        var z = Q.settingMenuHelper.turboSpinOn ? "Turbo" : "Normal";
        var A = S === L.SpinTrigger.AUTOSPIN ? "Auto" : "Manual";
        var M = {
          actionName: "" + z + A + "Spin"
        };
        k.sendAnalyticsEvent(M);
      }
      this.disableAvailableActions();
      this.disableSpinAction();
      this.disableSettingMenu();
      this.removeGamePauseEvent();
      this.removeGameResumeEvent();
      W.prototype.exit.call(this);
    };
    // 銷毀狀態並清除控制器引用
    q.prototype.destroy = function () {
      W.prototype.destroy.call(this);
      this.spinButtonController = undefined;
      this.slotController = undefined;
    };
    // 狀態準備時的回呼
    q.prototype.onReady = function () {};
    // 狀態開始運行時的回呼
    q.prototype.onRun = function () {};
    // 被強制離開狀態時的處理
    q.prototype.onForceExit = function (S) {
      S();
    };
    // 正常離開狀態時的處理
    q.prototype.onExit = function (S) {
      S();
    };
    // 狀態銷毀前的回呼
    q.prototype.onDestroy = function (S) {
      S();
    };
    // 狀態完全閒置時的處理
    q.prototype.onStateFullyIdle = function () {};
    // 啟用玩家可操作的功能
    q.prototype.enableAvailableActions = function () {};
    // 停用玩家可操作的功能
    q.prototype.disableAvailableActions = function () {};
    // 旋轉開始前的準備動作
    q.prototype.preStartSpinAction = function (S) {
      S();
    };
    // 自訂系統事件檢查參數
    q.prototype.defineSystemEventConfigParam = function () {
      return {};
    };
    // 計算一次旋轉所需花費
    q.prototype.getCostPerSpin = function (S) {
      if (S === L.SpinTrigger.FEATURE_BUY) {
        throw Error("overwrite getCostPerSpin function for support feature buy spin");
      }
      var z = this.dataSource.systemModel.maxLineNumber;
      var A = this.dataSource.transactionModel;
      var M = A.betSizeValue;
      var E = A.betLevelValue;
      return N.toDecimalWithExp(M * E * z, 2);
    };
    // 處理旋轉按鈕點擊事件
    q.prototype.onClickSpinButton = function (S) {
      if (this.spinButtonController.isAutoSpin()) {
        this.exitAutoSpin();
        this.idle();
      } else {
        this.validateSpin(S);
      }
    };
    // 啟用旋轉按鈕
    q.prototype.enableSpinAction = function () {
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this));
    };
    // 停用旋轉按鈕
    q.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    // 使用免費積分進行旋轉
    q.prototype.spinFreeCredit = function (S) {
      var z = this.spinButtonController;
      Q.settingMenuHelper.setWinAmount(0);
      V.walletHelper.spin();
      if (z.isAutoSpin()) {
        T.decrementAutoSpinCount(z);
      }
      this.exit(S);
    };
    // 使用現金積分進行旋轉
    q.prototype.spinCashCredit = function (S) {
      var z = this.spinButtonController;
      this.decreaseBalance(S);
      if (z.isAutoSpin()) {
        T.decrementAutoSpinCount(z);
      }
      this.exit(S);
    };
    // 使用紅利積分進行旋轉
    q.prototype.spinBonusCredit = function (S) {
      this.spinCashCredit(S);
    };
    // 下注無效時的處理
    q.prototype.spinInvalidBet = function () {
      this.exitAutoSpin();
      this.idle();
    };
    // 餘額不足時的處理
    q.prototype.spinInsufficientCredit = function (S) {
      this.spinInvalidBet(S);
    };
    // 嘗試進行自動旋轉
    q.prototype.tryAutoSpin = function () {
      var S = this;
      var z = this.spinButtonController;
      this.setupGamePauseEvent();
      if (z.isAutoSpin()) {
        var A = this.dataSource;
        var M = A.playerModel.balance;
        var E = A.transactionModel.accumulatedWinAmount;
        var F = Q.settingMenuHelper.isBalanceHitTargetInAutoSpinMode(E, M);
        if (!T.shouldAutoSpin() || F) {
          this.exitAutoSpin();
          this.idle();
        } else {
          this.setupGameResumeEvent(function () {
            S.enableSpinAction();
            var b = C.isGameStatePaused() ? 1 : 0;
            S.delayAndStartAutoSpin(b);
          });
        }
      } else {
        this.idle();
      }
    };
    // 取消排程的自動旋轉
    q.prototype.disposeAutoSpin = function () {
      var S = this._unscheduleAutoSpin;
      this._unscheduleAutoSpin = undefined;
      if (S) {
        S();
      }
    };
    // 停用設定選單功能
    q.prototype.disableSettingMenu = function () {
      Q.settingMenuHelper.autoSpinCallback = undefined;
      Q.settingMenuHelper.setAllButtonsInteractable(false);
    };
    // 退出自動旋轉模式並恢復相關功能
    q.prototype.exitAutoSpin = function () {
      this.disposeAutoSpin();
      var S = this.spinButtonController;
      T.exitAutoSpin(S);
      S.idle();
      this.enableAvailableActions();
      this.enableSettingMenu();
      this.setupGameResumeEvent(this.enableSpinAction.bind(this));
    };
    // 移除遊戲暫停事件
    q.prototype.removeGamePauseEvent = function () {
      C.removeGamePauseEventCallback(this.name);
    };
    // 移除遊戲恢復事件
    q.prototype.removeGameResumeEvent = function () {
      C.removeGameResumeEventCallback(this.name);
    };
    // 發送遊戲暫停通知
    q.prototype.emitGameNotifyPause = function () {
      this.disposeAutoSpin();
      C.emitGameNotifyPauseEvent();
    };
    // 設定遊戲暫停事件
    q.prototype.setupGamePauseEvent = function () {
      C.setGamePauseEventCallback(this.name, this.emitGameNotifyPause.bind(this));
    };
    // 設定遊戲恢復事件
    q.prototype.setupGameResumeEvent = function (S) {
      C.setGameResumeEventCallback(this.name, S);
    };
    // 回到閒置狀態並啟用相關功能
    q.prototype.idle = function () {
      var S = this.spinButtonController;
      S.enableButton();
      S.idle();
      this.onStateFullyIdle();
      this.enableSettingMenu();
      this.enableAvailableActions();
      this.setupGameResumeEvent(this.enableSpinAction.bind(this));
    };
    // 驗證是否可以旋轉
    q.prototype.validateSpin = function (S) {
      var z = this;
      var A = this.spinButtonController;
      if (!A || A.mode !== G.SpinButtonMode.DISABLED) {
        this.preStartSpinAction(function () {
          D.checkSpinValidity({
            getCostPerSpinFunction: z.getCostPerSpin.bind(z, S),
            dataSource: z.dataSource,
            walletHelper: V.walletHelper,
            callback: function (M) {
              switch (M) {
                case L.SpinCredits.FREE_GAME:
                  z.spinFreeCredit(S);
                  break;
                case L.SpinCredits.CASH:
                  z.spinCashCredit(S);
                  break;
                case L.SpinCredits.BONUS:
                  z.spinBonusCredit(S);
                  break;
                case L.SpinCredits.BET_INVALID:
                  z.spinInvalidBet(S);
                  break;
                case L.SpinCredits.INSUFFICIENT:
                  z.spinInsufficientCredit(S);
              }
            }
          });
        });
      }
    };
    // 啟用設定選單的互動
    q.prototype.enableSettingMenu = function () {
      Q.settingMenuHelper.autoSpinCallback = this.startAutoSpin.bind(this);
      Q.settingMenuHelper.setAllButtonsInteractable(true);
    };
    // 開始自動旋轉流程
    q.prototype.startAutoSpin = function () {
      var S = this;
      var z = Q.settingMenuHelper.autoSpinCount;
      var A = Q.settingMenuHelper.singleWinAmount;
      var M = Q.settingMenuHelper.balanceAmountMoreThan;
      var E = Q.settingMenuHelper.balanceAmountLessThan;
      var F = {
        count: z,
        single_win: A,
        increment: M,
        decrement: E
      };
      k.sendEvent(shell.ga.CATEGORY_GAME, shell.ga.EVENT_SLOT_AUTO_SPIN, F);
      this.disableSettingMenu();
      this.disableAvailableActions();
      T.startAutoSpin(z, this.spinButtonController, function () {
        S.setupGameResumeEvent(S.delayAndStartAutoSpin.bind(S, S.autoSpinDelay));
      });
    };
    // 延遲後啟動自動旋轉
    q.prototype.delayAndStartAutoSpin = function (S) {
      var z = this;
      var A = this.dataSource.transactionModel.accumulatedWinAmount;
      this.disposeAutoSpin();
      var M = A > 0 ? 0 : this.autoSpinDelay;
      if (M = S || M) {
        this._unscheduleAutoSpin = N.delayCallback(M)(function () {
          z._unscheduleAutoSpin = undefined;
          z.validateSpin(L.SpinTrigger.AUTOSPIN);
        });
      } else {
        this.validateSpin(L.SpinTrigger.AUTOSPIN);
      }
    };
    // 扣除旋轉所需的餘額
    q.prototype.decreaseBalance = function (S) {
      if (S === undefined) {
        throw Error("trigger cannot be undefined");
      }
      var z = this.getCostPerSpin(S);
      Q.settingMenuHelper.setWinAmount(0);
      V.walletHelper.spin(z);
    };
    return q;
  }(j.default);
  exports.default = Y;
  cc._RF.pop();
}