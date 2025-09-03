if (!cc._RF.push(module, "c8a43wFvPdBdqSw7KC9kFgc", "WBSRefreshWorldHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("TransactionStateMachineHandler");
  var x = require("RefreshWorldHandler");
  var L = require("SpaceBarInterrupter");
  var D = require("GameConstant");
  var k = require("BGMHandler");
  var C = require("WBSGameUtils");
  var j = require("SettingMenuHelper");
  var G = cc._decorator.ccclass;
  var V = function (Q) {
    function N() {
      var Y = Q !== null && Q.apply(this, arguments) || this;
      Y._loadingController = undefined;
      Y._appStateMachine = undefined;
      Y._refreshWorldCallback = undefined;
      return Y;
    }
    __extends(N, Q);
    N.prototype.initialize = function (Y) {
      // 初始化控制器與狀態機
      this._loadingController = Y.loadingController;
      this.setAppStateMachine(Y.appStateMachine);
      Q.prototype.initialize.call(this, Y);
    };
    N.prototype.setAppStateMachine = function (Y) {
      // 設定應用狀態機
      this._appStateMachine = Y;
    };
    N.prototype.refreshWorldByChangeWalletIdle = function (Y, W) {
      // 依錢包變更重新整理世界並處理重播
      this._refreshWorldCallback = W;
      var q = this.dataSource;
      var S = q.isGameReplaying;
      var z = q.isReplayStarted;
      L.spaceBarInterrupter.pause();
      if (S && !z) {
        this.dataSource.isReplayStarted = true;
        Q.prototype.refreshWorldByChangeWalletIdle.call(this, Y, this._startReplay.bind(this));
      } else if (z) {
        this.dataSource.isReplayStarted = false;
        Q.prototype.refreshWorldByChangeWalletIdle.call(this, Y, this._exitReplay.bind(this));
      } else {
        Q.prototype.refreshWorldByChangeWalletIdle.call(this, Y, this._onExit.bind(this));
      }
    };
    N.prototype._startReplay = function () {
      // 開始回放流程
      var Y = this.dataSource.transactionModel.stateTransitionTo;
      this.dataSource.isRefreshWorld = true;
      T.cacheTransitionCallback();
      T.clearTransition();
      k.bgmHandler.playBgm(Y);
      this._appStateMachine.exit();
      var W = this._refreshWorldCallback;
      this._refreshWorldCallback = undefined;
      if (W) {
        W();
      }
    };
    N.prototype._exitReplay = function () {
      // 結束回放流程
      this.dataSource.isReplayDone = true;
      k.bgmHandler.playBgm(D.TransitionState.NORMAL);
      k.bgmHandler.setBgmVolume(1);
      var Y = this._refreshWorldCallback;
      this._refreshWorldCallback = undefined;
      if (Y) {
        Y();
      }
      T.retrieveTransitionCallback();
      this._appStateMachine.exit();
    };
    N.prototype._onExit = function () {
      // 一般刷新結束時的處理
      var Y = this._refreshWorldCallback;
      this._refreshWorldCallback = undefined;
      if (Y) {
        Y();
      }
      L.spaceBarInterrupter.resume();
    };
    N.prototype.resetController = function (Y) {
      // 重新設定各種控制器狀態
      var W = this.generalControllers;
      var q = W.slotController;
      var z = W.symbolPayoutController;
      var A = W.slotTintController;
      var M = this.dataSource.transactionModel;
      var E = M.reels;
      var F = M.goldSymbol;
      var b = C.getProcessedReelSymbols(E, F);
      var H = this.generalControllers.featureBuyController;
      var w = this.dataSource.systemModel.featureBuy;
      var U = this.dataSource.playerModel.minimumBetAmount;
      A.disableDarkMode(false);
      A.removeOverlaySlotItem();
      q.reloadData(M);
      z.hidePopOutItem();
      z.clearOnClickCallback();
      z.disablePanel();
      z.setReelData(b);
      z.setupButtonEvent();
      z.enablePanel();
      if (H && w) {
        var B = w.isSupported;
        var P = w.threshold;
        if (B && j.settingMenuHelper.additionalBetCalculation() <= P) {
          var X = this.dataSource.transactionModel.stateTransitionTo;
          if (X === D.TransitionState.NORMAL) {
            H.showFeatureButton();
            H.enableFeatureBuy();
            if (j.settingMenuHelper.additionalBetCalculation() < U) {
              H.playButtonHoverEffect();
            }
          } else if (X === D.TransitionState.RESPIN) {
            H.showFeatureButton();
            H.disableFeatureBuy();
          } else {
            H.hideFeatureButton();
            H.disableFeatureBuy();
            H.hideFeatureBuy();
          }
        } else {
          H.hideFeatureButton();
          H.disableFeatureBuy();
        }
      }
      if (Y) {
        Y();
      }
    };
    N.prototype.executeTransition = function (Y) {
      // 根據下一狀態載入或釋放資源
      switch (this.dataSource.transactionModel.stateTransitionTo) {
        case D.TransitionState.FREE_SPIN_RESPIN:
        case D.TransitionState.FREE_SPIN:
          this._loadingController.loadBonusBundle(Y);
          break;
        default:
          this._loadingController.releaseBonusBundle(Y);
      }
    };
    return __decorate([G], N);
  }(x.default);
  exports.default = V;
  cc._RF.pop();
}