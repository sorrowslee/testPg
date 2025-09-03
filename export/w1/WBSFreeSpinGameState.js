if (!cc._RF.push(module, "542e1UUE4JBmp28UPjLy4JX", "WBSFreeSpinGameState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = require("Utils");
  var L = require("TransactionStateMachineHandler");
  var D = require("GameEventHandler");
  var k = require("NotifyHelper");
  var C = require("SettingMenuHelper");
  var j = require("AppState");
  var G = require("UIStateMachine");
  var V = require("SlotGameTools");
  var Q = require("GameConstant");
  var N = require("WBSRequestApiState");
  var Y = require("WBSPrizeState");
  var W = require("WBSResultState");
  var q = require("WBSUIState");
  var z = require("WBSRespinState");
  var A = require("InfoBoardController");
  var M = require("BGMHandler");
  var E = require("AudioManager");
  var F = require("AudioConstant");
  var H = function (w) {
    function U(B, P, X) {
      var J = w.call(this, B, P, X) || this;
      J.name = "Free Spin Game State";
      J._preloadState = undefined;
      J._isForceExit = false;
      return J;
    }
    __extends(U, w);
    U.prototype.onReady = function () {
      this._setupUIStateMachine();
    };
    U.prototype.onRun = function () {
      var B = this;
      this._setup(function () {
        B.uiStateMachine.run();
      });
    };
    U.prototype.onExit = function (B) {
      if (this._isForceExit) {
        B();
      } else {
        this._transitionToNextState(B);
      }
    };
    U.prototype.onForceExit = function (B) {
      this._isForceExit = true;
      this.uiStateMachine.exit();
      B();
    };
    U.prototype.onDestroy = function (B) {
      this._destroyPreloadState();
      this.uiStateMachine = undefined;
      B();
    };
    U.prototype._setup = function (B) {
      var P = this.dataSource.transactionModel.stateTransitionFrom;
      var X = this.dataSource.isRefreshWorld;
      D.emitGameFlowStateChangedEvent({
        displayState: "Start",
        flowType: "BonusGame"
      });
      var Z0 = this.controllerPool.generalControllers;
      var Z1 = Z0.spinButtonController;
      var Z2 = Z0.settingMenuFooterHolder;
      var Z3 = Z0.settingMenuFooterController;
      var Z4 = Z0.symbolPayoutController;
      switch (P) {
        case Q.TransitionState.NORMAL:
        case Q.TransitionState.RESPIN:
          if (X) {
            x.sequenceCallback(this._preSetupUI.bind(this), this._setupUI.bind(this), this._setupBackground.bind(this), this._switchMultiplierSkipAnim.bind(this))(B);
          } else {
            x.sequenceCallback(this._playScatterWinEffect.bind(this), x.delayCallback(1.5), this._showBonusLoading.bind(this), this._preSetupUI.bind(this), x.spawnCallback(this._loadBonusAssets.bind(this), this._setupBackground.bind(this)), this._setupUI.bind(this), this._loadComplete.bind(this), this._switchMultiplier.bind(this))(B);
          }
          break;
        case Q.TransitionState.FREE_SPIN:
        case Q.TransitionState.FREE_SPIN_RESPIN:
          C.settingMenuHelper.setHidden(true);
          Z1.hide();
          Z3.changeHolder(Z2);
          Z4.disablePanel();
          Z4.clearOnClickCallback();
          Z4.hidePopOutItem();
          B();
          break;
        default:
          B();
      }
    };
    U.prototype._playScatterWinEffect = function (B) {
      this.controllerPool.generalControllers.slotController.playScatterWinEffect();
      if (B) {
        B();
      }
    };
    U.prototype._preSetupUI = function (B) {
      var P = this.controllerPool.generalControllers;
      var X = P.multiplierController;
      var J = P.infoboardController;
      X.reloadMultiplier(1, false);
      J.showTips(A.InfoboardUIState.FREE_SPIN_TIPS, true);
      if (B) {
        B();
      }
    };
    U.prototype._setupUI = function (B) {
      var P = this.controllerPool.generalControllers;
      var X = P.spinButtonController;
      var J = P.symbolPayoutController;
      var Z0 = P.settingMenuFooterController;
      var Z1 = P.settingMenuFooterHolder;
      var Z2 = P.featureBuyController;
      var Z3 = this.dataSource.playerModel.balance;
      var Z4 = this.dataSource.transactionModel.freeSpin;
      Z0.changeHolder(Z1);
      C.settingMenuHelper.setHidden(true);
      C.settingMenuHelper.setBalance(Z3);
      J.disablePanel();
      J.clearOnClickCallback();
      J.hidePopOutItem();
      X.hide();
      this.controllerPool.bonusControllers.remainingFreeSpinController.show(Z4.step);
      Z2.hideFeatureButton();
      Z2.disableFeatureBuy();
      Z2.hideFeatureBuy();
      if (B) {
        B();
      }
    };
    U.prototype._setupUIStateMachine = function () {
      this.uiStateMachine = new G.default({
        getNextUIState: this._evaluateUIState.bind(this),
        exitUIStateMachineCallback: this.exit.bind(this)
      });
    };
    U.prototype._transitionToNextState = function (B) {
      var P = this.dataSource.transactionModel;
      if (P.stateTransitionTo === Q.TransitionState.NORMAL) {
        var X = P.freeSpin;
        if ((X ? X.accumulatedWin : 0) > 0) {
          x.sequenceCallback(x.delayCallback(1), x.spawnCallback(this._playTotalWin.bind(this), this._resetUI.bind(this)), this._releaseBonusAssets.bind(this), this._playNormalBgm.bind(this), this._showInfoboardTotalWin.bind(this))(B);
        } else {
          x.sequenceCallback(x.spawnCallback(this._playTotalWin.bind(this), this._resetUI.bind(this)), this._releaseBonusAssets.bind(this), this._playNormalBgm.bind(this), this._showInfoboardTotalWin.bind(this))(B);
        }
      } else {
        L.transitionCompleteCallback("idle")(B);
      }
    };
    U.prototype._evaluateUIState = function () {
      var B = this;
      var P = this.uiStateMachine.currentUIState;
      var X = this.dataSource.transactionModel.stateTransitionTo === Q.TransitionState.FREE_SPIN_RESPIN;
      var J = undefined;
      switch (true) {
        case P instanceof q.default && !X:
        case P instanceof z.default:
          var Z0 = this._preloadState;
          this._preloadState = undefined;
          J = Z0 || this._runRequestApiState();
          break;
        case P instanceof N.default:
          J = this._runResultState();
          break;
        case P instanceof W.default:
          J = this._runPrizeState();
          break;
        case P instanceof Y.default:
          break;
        case P instanceof q.default && X:
          var Z1 = this.dataSource.isRefreshWorld;
          var Z2 = this._runRespinState();
          Z2.setPreloadStateCallback(function () {
            if (!Z1) {
              B._preloadState = B._runRequestApiState();
            }
          });
          J = Z2;
          break;
        default:
          J = this._runUIState();
      }
      return J;
    };
    U.prototype._runRequestApiState = function () {
      var B = this.dataSource;
      return new N.default(B, this.controllerPool, undefined);
    };
    U.prototype._runResultState = function () {
      var B = this.dataSource;
      return new W.default(B, this.controllerPool, undefined);
    };
    U.prototype._runPrizeState = function () {
      var B = this.dataSource;
      return new Y.default(B, this.controllerPool, undefined);
    };
    U.prototype._runRespinState = function () {
      var B = this.dataSource;
      return new z.default(B, this.controllerPool, undefined);
    };
    U.prototype._runUIState = function () {
      var B = this.dataSource;
      return new q.default(B, this.controllerPool, undefined);
    };
    U.prototype._showBonusLoading = function (B) {
      var P = this.controllerPool.generalControllers;
      var X = P.bonusLoadingController;
      var J = P.settingMenuFooterController;
      var Z0 = P.settingMenuFooterHolder;
      var Z1 = this.dataSource.transactionModel.freeSpin.totalStep;
      J.changeHolder(Z0);
      X.show(Z1, B);
      E.playAudio(F.GENERAL_AUDIO.fsTrans.key);
      M.bgmHandler.playBgm(Q.TransitionState.FREE_SPIN);
    };
    U.prototype._loadBonusAssets = function (B) {
      this.controllerPool.loadingController.loadBonusBundle(B);
    };
    U.prototype._loadComplete = function (B) {
      var P = this.dataSource.isGameReplaying;
      this.controllerPool.generalControllers.bonusLoadingController.onLoadComplete(P, B);
    };
    U.prototype._releaseBonusAssets = function (B) {
      this.controllerPool.loadingController.releaseBonusBundle(B);
    };
    U.prototype._setupBackground = function (B) {
      var P = this.controllerPool.generalControllers;
      var X = P.slotController;
      var J = P.slotTintController;
      var Z0 = P.backgroundController;
      var Z1 = P.foregroundController;
      var Z2 = P.waysController;
      var Z3 = P.slowDropEffectController;
      var Z4 = P.fastSpinController;
      Z0.switchUI(Q.TransitionState.FREE_SPIN);
      Z1.switchUI(Q.TransitionState.FREE_SPIN);
      Z3.switchUI(Q.TransitionState.FREE_SPIN);
      X.removeOverlaySlotItems();
      J.node.setPosition(0, 50);
      X.node.setPosition(0, 50);
      X.addOverlayScatterAndWild();
      Z4.node.setPosition(0, 50);
      Z4.reset();
      Z2.node.active = true;
      if (B) {
        B();
      }
    };
    U.prototype._resetUI = function (B) {
      var P = this;
      x.delayCallback(0.5)(function () {
        var X = P.dataSource.transactionModel.gameMultiplier;
        var J = P.controllerPool.generalControllers;
        var Z0 = J.backgroundController;
        var Z1 = J.foregroundController;
        var Z2 = J.waysController;
        var Z3 = J.slotController;
        var Z4 = J.slotTintController;
        var Z5 = J.slowDropEffectController;
        var Z6 = J.fastSpinController;
        Z0.switchUI(Q.TransitionState.NORMAL);
        Z1.switchUI(Q.TransitionState.NORMAL);
        Z5.switchUI(Q.TransitionState.NORMAL);
        Z3.removeOverlaySlotItems();
        Z4.node.setPosition(0, 180);
        Z3.node.setPosition(0, 180);
        Z3.addOverlayScatterAndWild();
        Z6.node.setPosition(0, 180);
        Z6.reset();
        Z2.node.active = false;
        C.settingMenuHelper.setHidden(false);
        var Z7 = P.controllerPool.generalControllers;
        var Z8 = Z7.spinButtonController;
        var Z9 = Z7.settingMenuFooterController;
        var ZZ = Z7.multiplierController;
        Z8.show();
        Z9.returnHolder();
        P.controllerPool.bonusControllers.remainingFreeSpinController.hide();
        ZZ.reloadMultiplier(X, false);
        if (B) {
          B();
        }
      });
    };
    U.prototype._playTotalWin = function (B) {
      var P = this.controllerPool.generalControllers.totalWinController;
      var X = this.dataSource.transactionModel.freeSpin;
      var J = X ? X.accumulatedWin : 0;
      function Z0() {
        L.transitionCompleteCallback("setup")(B);
      }
      if (J > 0) {
        var Z1 = this.dataSource.isGameReplaying;
        var Z2 = {
          freeSpinCount: X.totalStep
        };
        P.play(J, 0, Z0, Z1, Z2);
      } else {
        x.sequenceCallback(function (Z3) {
          k.showFullLoadingPage();
          Z3();
        }, x.delayCallback(1), function (Z3) {
          k.hideFullLoadingPage();
          Z3();
        })(Z0);
      }
    };
    U.prototype._playNormalBgm = function (B) {
      M.bgmHandler.playBgm(Q.TransitionState.NORMAL);
      B();
    };
    U.prototype._showInfoboardTotalWin = function (B) {
      var P = this.dataSource.transactionModel;
      var X = P.accumulatedWinAmount;
      var J = P.gameMultiplier;
      var Z0 = this.controllerPool.generalControllers.infoboardController;
      if (X > 0) {
        var Z1 = this._getWinThresholds();
        if (V.isBigWinThreshold(X, Z1)) {
          Z0.play({
            playState: A.InfoBoardShowState.HIGH_PAY_BIG_TOTAL_WIN,
            amount: X,
            multiplierNumber: J
          }, B);
        } else if (V.isMediumWinThreshold(X, Z1)) {
          Z0.play({
            playState: A.InfoBoardShowState.INSTANT_HIGH_PAY_TOTAL_WIN,
            amount: X,
            multiplierNumber: J
          }, B);
        } else {
          Z0.play({
            playState: A.InfoBoardShowState.LOW_PAY_TOTAL_WIN,
            amount: X,
            multiplierNumber: J
          }, B);
        }
      } else {
        Z0.showTips(A.InfoboardUIState.NORMAL_TIPS, true);
        if (B) {
          B();
        }
      }
    };
    U.prototype._switchMultiplier = function (B) {
      this.controllerPool.generalControllers.multiplierController.playTransformToFreeSpinMutliplier(B);
    };
    U.prototype._switchMultiplierSkipAnim = function (B) {
      this.controllerPool.generalControllers.multiplierController.reloadMultiplier(8, true);
      B();
    };
    U.prototype._getWinThresholds = function () {
      var B = this.dataSource.systemModel;
      var P = B.maxLineNumber;
      var X = B.winThresholds;
      var J = this.dataSource.transactionModel;
      var Z0 = J.betSizeValue;
      var Z1 = J.betLevelValue;
      return X.getAllThresholds(Z0, Z1, P);
    };
    U.prototype._destroyPreloadState = function () {
      var B = this._preloadState;
      if (B) {
        B.destroy();
        this._preloadState = undefined;
      }
    };
    return U;
  }(j.default);
  exports.default = H;
  cc._RF.pop();
}