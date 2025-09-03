if (!cc._RF.push(module, "ae16e5Ei4VNGopxdeQ1ARYp", "WBSResultState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("TransactionStateMachineHandler");
  var x = require("SlotAnalyticsEnum");
  var L = require("SlotStateMachine");
  var D = require("ResultState");
  var k = require("GameConstant");
  var C = require("WBSGameUtils");
  var j = require("AudioConstant");
  var G = require("AudioManager");
  var V = function (Q) {
    function N(Y, W, q) {
      var S = Q.call(this, Y, W, q) || this;
      S.name = "Result State";
      var z = W.generalControllers;
      var f = z.slotController;
      var A = z.spinButtonController;
      S.setSlotController(f);
      S.setSpinButtonController(A);
      return S;
    }
    __extends(N, Q);
    // 狀態開始時設定可用操作
    N.prototype.onRun = function () {
      this._setAvailableActions();
    };
    // 狀態就緒時監聽滾輪停止
    N.prototype.onReady = function () {
      this.controllerPool.generalControllers.slotController.setOnEachStopColumnCallback(this._onEachReelStop.bind(this));
    };
    // 依停止方式停止轉輪
    N.prototype.invokeSlotStop = function () {
      var Y = this.slotController;
      var W = this.dataSource.transactionModel.originalReels;
      if (Y.getStopStyle() === L.StopStyle.FAST) {
        Y.fastStop(W);
      } else {
        Y.stopSpin();
      }
    };
    // 轉輪尚未停止時觸發快速停止
    N.prototype.triggerFastStopWhileStopping = function () {
      var Y = this.dataSource.transactionModel.originalReels;
      var W = this.slotController;
      var q = this.spinButtonController;
      this.disableSpinAction();
      q.disableButton();
      W.setOnClickCallback(undefined);
      W.fastStop(Y);
    };
    // 設定派彩面板與轉輪資料
    N.prototype.setSlotData = function () {
      var Y = this.dataSource.transactionModel;
      var W = Y.reels;
      var q = Y.goldSymbol;
      var S = this.controllerPool.generalControllers.symbolPayoutController;
      var z = C.getProcessedReelSymbols(W, q);
      S.setReelData(z);
      this.slotController.setReelData(Y);
    };
    // 結果開始呈現時切換到下個狀態
    N.prototype.resultDidStartRender = function (Y) {
      if (this.dataSource.transactionModel.isTransactionEnd) {
        T.goToStateCallback("prize", true)(Y);
      } else {
        T.goToStateCallback("idle", true)(Y);
      }
    };
    // 根據狀態播放額外效果
    N.prototype.renderFeature = function (Y) {
      switch (this.dataSource.transactionModel.stateTransitionFrom) {
        case k.TransitionState.RESPIN:
        case k.TransitionState.FREE_SPIN_RESPIN:
          this._playDropNewSymbols(Y);
          break;
        case k.TransitionState.NORMAL:
        case k.TransitionState.FREE_SPIN:
        default:
          if (Y) {
            Y();
          }
      }
    };
    // 銷毀時移除回呼
    N.prototype.onDestroy = function (Y) {
      this.controllerPool.generalControllers.slotController.setOnEachStopColumnCallback(undefined);
      if (Y) {
        Y();
      }
    };
    // 每列停止時播放音效
    N.prototype._onEachReelStop = function () {
      if (this.controllerPool.generalControllers.slotController.getStopStyle() !== L.StopStyle.FAST) {
        G.playAudio(j.GENERAL_AUDIO.spinStop.key);
      }
    };
    // 設定當前流程狀態
    N.prototype._setAvailableActions = function () {
      switch (this.dataSource.transactionModel.stateTransitionFrom) {
        case k.TransitionState.RESPIN:
        case k.TransitionState.FREE_SPIN_RESPIN:
          this.process = x.SpinStateProcess.REEL_STOPPED;
          break;
        case k.TransitionState.NORMAL:
        case k.TransitionState.FREE_SPIN:
        default:
          this.process = x.SpinStateProcess.REEL_SPINNING;
      }
    };
    // 播放新符號掉落並更新資料
    N.prototype._playDropNewSymbols = function (Y) {
      var W = this.slotController;
      var q = this.dataSource.transactionModel;
      this._shiftMultiplier();
      W.playShiftNewSlotEffect(function () {
        W.reloadData(q);
        if (Y) {
          Y();
        }
      });
    };
    // 移動並更新倍數顯示
    N.prototype._shiftMultiplier = function (Y) {
      var W = this.controllerPool.generalControllers.multiplierController;
      var q = this.dataSource.transactionModel;
      var S = q.gameMultiplier;
      var z = q.stateTransitionFrom;
      var f = z === k.TransitionState.FREE_SPIN || z === k.TransitionState.FREE_SPIN_RESPIN;
      W.playShiftRight(S, f, Y);
    };
    return N;
  }(D.default);
  exports.default = V;
  cc._RF.pop();
}