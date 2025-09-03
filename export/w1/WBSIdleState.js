if (!cc._RF.push(module, "67aa1MWLyVGqJ7DSmrzs2GE", "WBSIdleState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("TransactionStateMachineHandler");
  var x = require("Utils");
  var L = require("SpinButtonController");
  var D = require("IdleState");
  var k = require("SettingMenuHelper");
  var C = require("SpaceBarInterrupter");
  var p = require("SlotAnalyticsEnum");
  var j = function (G) {
    function V(Q, N, Y) {
      var W = G.call(this, Q, N, Y) || this;
      W.name = "Idle State";
      var q = N.generalControllers;
      var S = q.slotController;
      var z = q.spinButtonController;
      W.setSlotController(S);
      W.setSpinButtonController(z);
      return W;
    }
    __extends(V, G);
    V.prototype.run = function () {
      var Q = this;
      if (this.dataSource.isReplayDone) {
        G.prototype.run.call(this);
      } else {
        T.goToStateCallback("idle", true)(function () {
          G.prototype.run.call(Q);
        });
      }
    };
    V.prototype.onStateFullyIdle = function () {
      var Q = this.controllerPool.generalControllers;
      var N = Q.symbolPayoutController;
      var Y = Q.featureBuyController;
      var W = this.dataSource.systemModel.featureBuy;
      var q = this.dataSource.playerModel.minimumBetAmount;
      if (W && W.isSupported && k.settingMenuHelper.additionalBetCalculation() <= W.threshold) {
        Y.showFeatureButton();
        Y.enableFeatureBuy();
        if (k.settingMenuHelper.additionalBetCalculation() < q) {
          Y.playButtonHoverEffect();
        }
      } else {
        Y.hideFeatureButton();
        Y.disableFeatureBuy();
      }
      N.setupButtonEvent();
      N.enablePanel();
    };
    V.prototype.onExit = function (Q) {
      var N = this.controllerPool.generalControllers;
      var Y = N.symbolPayoutController;
      var W = N.featureBuyController;
      var q = N.spinButtonController;
      if (q && q.mode === L.SpinButtonMode.AUTOSPIN) {
        W.hideFeatureButton();
      }
      Y.hidePopOutItem();
      Y.clearOnClickCallback();
      Y.disablePanel();
      T.transitionCompleteCallback("action")(Q);
    };
    V.prototype.defineSystemEventConfigParam = function () {
      var Q = this;
      return {
        callback: function () {
          var N = Q.dataSource;
          if (N.isReplayDone) {
            N.isReplayDone = false;
            C.spaceBarInterrupter.resume();
            Q.tryAutoSpin();
          } else {
            x.sequenceCallback(T.transitionCompleteCallback("idle"), T.goToStateCallback("action", true))(Q.tryAutoSpin.bind(Q));
          }
        }
      };
    };
    V.prototype.disableAvailableActions = function () {
      this.controllerPool.generalControllers.featureBuyController.disableFeatureBuy();
    };
    V.prototype.getCostPerSpin = function (Q) {
      var N = this.dataSource.systemModel;
      var Y = N.maxLineNumber;
      var W = N.featureBuy;
      var q = this.dataSource.transactionModel;
      var S = q.betSizeValue;
      var z = q.betLevelValue;
      if ((W && W.betMultiplier !== undefined) === false) {
        throw Error("Invalid feature buy bet multiplier");
      }
      if (Q === p.SpinTrigger.FEATURE_BUY) {
        return x.toDecimalWithExp(S * z * Y * W.betMultiplier, 2);
      } else {
        return G.prototype.getCostPerSpin.call(this, Q);
      }
    };
    V.prototype.spinInvalidBet = function (Q) {
      G.prototype.spinInvalidBet.call(this, Q);
      this.dataSource.isFeatureBuy = false;
    };
    return V;
  }(D.default);
  exports.default = j;
  cc._RF.pop();
}