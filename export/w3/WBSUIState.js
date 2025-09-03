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
    // 建立 UI 狀態並設定名稱
    function c(p, j, G) {
      var V = u.call(this, p, j, G) || this;
      V.name = "UI State";
      return V;
    }
    __extends(c, u);
    // 狀態就緒時呼叫，目前無額外操作
    c.prototype.onReady = function () {};
    // 執行狀態邏輯並減少免費旋轉次數
    c.prototype.onRun = function () {
      this._decreaseRemainingFreeSpin();
      this.exit();
    };
    // 強制結束狀態並執行回呼
    c.prototype.onForceExit = function (p) {
      p();
    };
    // 離開狀態時依轉換目標決定流程
    c.prototype.onExit = function (p) {
      if (this.dataSource.transactionModel.stateTransitionTo === k.TransitionState.FREE_SPIN) {
        this._runBonusIdleState(p);
      } else {
        p();
      }
    };
    // 銷毀狀態時清除回呼並重置
    c.prototype.onDestroy = function (p) {
      this.controllerPool.generalControllers.slotController.setOnClickCallback(undefined);
      this._clearAvailableActions();
      p();
    };
    // 免費旋轉時減少剩餘次數並播放音效
    c.prototype._decreaseRemainingFreeSpin = function (p) {
      if (this.dataSource.transactionModel.stateTransitionTo === k.TransitionState.FREE_SPIN && this.controllerPool) {
        D.playAudio(L.GENERAL_AUDIO.fsSpin.key);
        this.controllerPool.bonusControllers.remainingFreeSpinController.decrementFreeSpinCount(p);
      }
    };
    // 清除旋轉按鈕的點擊回呼
    c.prototype._clearAvailableActions = function () {
      this.controllerPool.generalControllers.spinButtonController.clearOnClickCallback();
    };
    // 轉入免費遊戲待機狀態的流程
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