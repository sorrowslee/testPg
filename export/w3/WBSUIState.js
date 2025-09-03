if (!cc._RF.push(module, "1bc2eg5KINEwJLVziaqQk74", "WBSUIState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("TransactionStateMachineHandler");
  var x = require("UIState");
  var L = require("AudioConstant");
  var D = require("AudioManager");
  var k = require("GameConstant");
  var C = function (u) {
    function c(p, j, G) {
      var V = u.call(this, p, j, G) || this;
      V.name = "UI State";
      return V;
    }
    __extends(c, u);
    c.prototype.onReady = function () {};
    c.prototype.onRun = function () {
      this._decreaseRemainingFreeSpin();
      this.exit();
    };
    c.prototype.onForceExit = function (p) {
      p();
    };
    c.prototype.onExit = function (p) {
      if (this.dataSource.transactionModel.stateTransitionTo === k.TransitionState.FREE_SPIN) {
        this._runBonusIdleState(p);
      } else {
        p();
      }
    };
    c.prototype.onDestroy = function (p) {
      this.controllerPool.generalControllers.slotController.setOnClickCallback(undefined);
      this._clearAvailableActions();
      p();
    };
    c.prototype._decreaseRemainingFreeSpin = function (p) {
      if (this.dataSource.transactionModel.stateTransitionTo === k.TransitionState.FREE_SPIN && this.controllerPool) {
        D.playAudio(L.GENERAL_AUDIO.fsSpin.key);
        this.controllerPool.bonusControllers.remainingFreeSpinController.decrementFreeSpinCount(p);
      }
    };
    c.prototype._clearAvailableActions = function () {
      this.controllerPool.generalControllers.spinButtonController.clearOnClickCallback();
    };
    c.prototype._runBonusIdleState = function (p) {
      var j = this;
      T.goToStateCallback("action", true, {
        noBet: true
      })(function () {
        if (j.dataSource) {
          var V = j.dataSource.transactionModel.stateTransitionTo;
          if (V === k.TransitionState.FREE_SPIN || V === k.TransitionState.FREE_SPIN_RESPIN) {
            T.transitionCompleteCallback("action")(p);
          }
        }
      });
    };
    return c;
  }(x.default);
  exports.default = C;
  cc._RF.pop();
}