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
    q.prototype.setSlotController = function (S) {
      this.slotController = S;
    };
    q.prototype.setSpinButtonController = function (S) {
      this.spinButtonController = S;
    };
    q.prototype.setAutoSpinDelay = function (S) {
      this.autoSpinDelay = S;
    };
    q.prototype.run = function () {
      W.prototype.run.call(this);
      var S = this._defaultCheckSystemEventConfig;
      var z = this.defineSystemEventConfigParam();
      D.handleSystemEvent(__assign(__assign({}, S), z));
    };
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
    q.prototype.destroy = function () {
      W.prototype.destroy.call(this);
      this.spinButtonController = undefined;
      this.slotController = undefined;
    };
    q.prototype.onReady = function () {};
    q.prototype.onRun = function () {};
    q.prototype.onForceExit = function (S) {
      S();
    };
    q.prototype.onExit = function (S) {
      S();
    };
    q.prototype.onDestroy = function (S) {
      S();
    };
    q.prototype.onStateFullyIdle = function () {};
    q.prototype.enableAvailableActions = function () {};
    q.prototype.disableAvailableActions = function () {};
    q.prototype.preStartSpinAction = function (S) {
      S();
    };
    q.prototype.defineSystemEventConfigParam = function () {
      return {};
    };
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
    q.prototype.onClickSpinButton = function (S) {
      if (this.spinButtonController.isAutoSpin()) {
        this.exitAutoSpin();
        this.idle();
      } else {
        this.validateSpin(S);
      }
    };
    q.prototype.enableSpinAction = function () {
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this));
    };
    q.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    q.prototype.spinFreeCredit = function (S) {
      var z = this.spinButtonController;
      Q.settingMenuHelper.setWinAmount(0);
      V.walletHelper.spin();
      if (z.isAutoSpin()) {
        T.decrementAutoSpinCount(z);
      }
      this.exit(S);
    };
    q.prototype.spinCashCredit = function (S) {
      var z = this.spinButtonController;
      this.decreaseBalance(S);
      if (z.isAutoSpin()) {
        T.decrementAutoSpinCount(z);
      }
      this.exit(S);
    };
    q.prototype.spinBonusCredit = function (S) {
      this.spinCashCredit(S);
    };
    q.prototype.spinInvalidBet = function () {
      this.exitAutoSpin();
      this.idle();
    };
    q.prototype.spinInsufficientCredit = function (S) {
      this.spinInvalidBet(S);
    };
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
    q.prototype.disposeAutoSpin = function () {
      var S = this._unscheduleAutoSpin;
      this._unscheduleAutoSpin = undefined;
      if (S) {
        S();
      }
    };
    q.prototype.disableSettingMenu = function () {
      Q.settingMenuHelper.autoSpinCallback = undefined;
      Q.settingMenuHelper.setAllButtonsInteractable(false);
    };
    q.prototype.exitAutoSpin = function () {
      this.disposeAutoSpin();
      var S = this.spinButtonController;
      T.exitAutoSpin(S);
      S.idle();
      this.enableAvailableActions();
      this.enableSettingMenu();
      this.setupGameResumeEvent(this.enableSpinAction.bind(this));
    };
    q.prototype.removeGamePauseEvent = function () {
      C.removeGamePauseEventCallback(this.name);
    };
    q.prototype.removeGameResumeEvent = function () {
      C.removeGameResumeEventCallback(this.name);
    };
    q.prototype.emitGameNotifyPause = function () {
      this.disposeAutoSpin();
      C.emitGameNotifyPauseEvent();
    };
    q.prototype.setupGamePauseEvent = function () {
      C.setGamePauseEventCallback(this.name, this.emitGameNotifyPause.bind(this));
    };
    q.prototype.setupGameResumeEvent = function (S) {
      C.setGameResumeEventCallback(this.name, S);
    };
    q.prototype.idle = function () {
      var S = this.spinButtonController;
      S.enableButton();
      S.idle();
      this.onStateFullyIdle();
      this.enableSettingMenu();
      this.enableAvailableActions();
      this.setupGameResumeEvent(this.enableSpinAction.bind(this));
    };
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
    q.prototype.enableSettingMenu = function () {
      Q.settingMenuHelper.autoSpinCallback = this.startAutoSpin.bind(this);
      Q.settingMenuHelper.setAllButtonsInteractable(true);
    };
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