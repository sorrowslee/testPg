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
    N.prototype.onRun = function () {
      this._setAvailableActions();
    };
    N.prototype.onReady = function () {
      this.controllerPool.generalControllers.slotController.setOnEachStopColumnCallback(this._onEachReelStop.bind(this));
    };
    N.prototype.invokeSlotStop = function () {
      var Y = this.slotController;
      var W = this.dataSource.transactionModel.originalReels;
      if (Y.getStopStyle() === L.StopStyle.FAST) {
        Y.fastStop(W);
      } else {
        Y.stopSpin();
      }
    };
    N.prototype.triggerFastStopWhileStopping = function () {
      var Y = this.dataSource.transactionModel.originalReels;
      var W = this.slotController;
      var q = this.spinButtonController;
      this.disableSpinAction();
      q.disableButton();
      W.setOnClickCallback(undefined);
      W.fastStop(Y);
    };
    N.prototype.setSlotData = function () {
      var Y = this.dataSource.transactionModel;
      var W = Y.reels;
      var q = Y.goldSymbol;
      var S = this.controllerPool.generalControllers.symbolPayoutController;
      var z = C.getProcessedReelSymbols(W, q);
      S.setReelData(z);
      this.slotController.setReelData(Y);
    };
    N.prototype.resultDidStartRender = function (Y) {
      if (this.dataSource.transactionModel.isTransactionEnd) {
        T.goToStateCallback("prize", true)(Y);
      } else {
        T.goToStateCallback("idle", true)(Y);
      }
    };
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
    N.prototype.onDestroy = function (Y) {
      this.controllerPool.generalControllers.slotController.setOnEachStopColumnCallback(undefined);
      if (Y) {
        Y();
      }
    };
    N.prototype._onEachReelStop = function () {
      if (this.controllerPool.generalControllers.slotController.getStopStyle() !== L.StopStyle.FAST) {
        G.playAudio(j.GENERAL_AUDIO.spinStop.key);
      }
    };
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