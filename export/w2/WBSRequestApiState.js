if (!cc._RF.push(module, "884a62tCFZCe4sJiY2iRKqr", "WBSRequestApiState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("RequestHandler");
  var L = require("TransactionStateMachineHandler");
  var D = require("RequestApiState");
  var k = require("AutoSpinHandler");
  var C = require("WBSApiClient");
  var j = require("GameConstant");
  var G = require("InfoBoardController");
  var V = require("SettingMenuHelper");
  var Q = require("AudioManager");
  var N = require("AudioConstant");
  var Y = cc._decorator.ccclass;
  var W = function (q) {
    function S(A, M, E) {
      var F = q.call(this, A, M, E) || this;
      var b = {
        nextSpinData: undefined
      };
      F.name = "Request API State";
      F._dispose = undefined;
      F._data = b;
      var H = M.generalControllers;
      var w = H.slotController;
      var U = H.spinButtonController;
      F.setSlotController(w);
      F.setSpinButtonController(U);
      return F;
    }
    var z = {
      get: function () {
        return this._data.nextSpinData;
      },
      enumerable: false,
      configurable: true
    };
    __extends(S, q);
    Object.defineProperty(S.prototype, "nextSpinData", z);
    S.prototype.callApi = function (A) {
      var M = this;
      if (this.nextSpinData) {
        this._changeState(A);
      } else {
        this._dispose = this._observe(function () {
          M._dispose = undefined;
          M._changeState(A);
        });
      }
    };
    S.prototype.onReady = function () {
      q.prototype.onReady.call(this);
      L.goToStateCallback("result", true)(this._requestApi.bind(this));
    };
    S.prototype.onRun = function () {};
    S.prototype.onExit = function (A) {
      this._disableShake();
      q.prototype.onExit.call(this, A);
    };
    S.prototype.onForceExit = function (A) {
      var M = this._dispose;
      if (M) {
        this._dispose = undefined;
        M();
      }
      q.prototype.onForceExit.call(this, A);
    };
    S.prototype.onDestroy = function (A) {
      var M = this._dispose;
      if (M) {
        this._dispose = undefined;
        M();
      }
      q.prototype.onDestroy.call(this, A);
    };
    S.prototype.startSlotController = function () {
      var A = this.controllerPool.generalControllers.featureBuyController;
      var M = this.dataSource.transactionModel.stateTransitionTo;
      var E = this.slotController;
      switch (M) {
        case j.TransitionState.NORMAL:
          q.prototype.startSlotController.call(this);
          if (this.dataSource.isFeatureBuy) {
            Q.playAudio(N.GENERAL_AUDIO.featureBuyStart.key);
          }
          this._displayInfoboardTips(G.InfoboardUIState.NORMAL_TIPS);
          A.disableFeatureBuy();
          this._resetMultiplier(false);
          break;
        case j.TransitionState.FREE_SPIN:
          E.spin(false, M);
          this._displayInfoboardTips(G.InfoboardUIState.FREE_SPIN_TIPS);
          this._resetMultiplier(true);
      }
    };
    S.prototype._observe = function (A) {
      return T.observeCallback(this._data, "nextSpinData")(function (M) {
        if (!M) {
          A();
        }
      });
    };
    S.prototype._displayInfoboardTips = function (A) {
      var M = this.controllerPool.generalControllers.infoboardController;
      M.resetWinEffect();
      M.showTips(A, V.settingMenuHelper.turboSpinOn);
    };
    S.prototype._requestApi = function () {
      var A = this;
      x.doTransactionAPIRequest({
        name: this.name,
        apiRequest: C.wbsApiClient.spin.bind(C.wbsApiClient),
        errorTitle: "",
        fallbackRequest: C.wbsApiClient.getGameInfo.bind(C.wbsApiClient)
      }, this.dataSource, function (M, E) {
        var F = {
          error: M,
          result: E
        };
        A._data.nextSpinData = F;
      });
    };
    S.prototype._changeState = function (A) {
      var M = this.nextSpinData;
      var E = M.error;
      var F = M.result;
      C.wbsApiClient.updateTransactionInfo();
      if (F && F.dt) {
        if (E && k.shouldAutoSpin()) {
          var b = this.spinButtonController;
          k.exitAutoSpin(b);
        }
        L.transitionCompleteCallback("result")(A);
      }
    };
    S.prototype._resetMultiplier = function (A = false) {
      this.controllerPool.generalControllers.multiplierController.playReset(A);
    };
    S.prototype._disableShake = function (A) {
      this.slotController.stopSlotItemsShakeEffect(A);
    };
    return __decorate([Y], S);
  }(D.default);
  exports.default = W;
  cc._RF.pop();
}