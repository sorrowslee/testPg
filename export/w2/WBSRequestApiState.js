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
    // 建構子，初始化轉輪控制器與按鈕控制器
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
        // 取得下一次旋轉的回傳資料
        return this._data.nextSpinData;
      },
      enumerable: false,
      configurable: true
    };
    __extends(S, q);
    Object.defineProperty(S.prototype, "nextSpinData", z);
    // 觸發 API 請求或等待資料後切換狀態
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
    // 狀態準備完成時註冊 API 事件
    S.prototype.onReady = function () {
      q.prototype.onReady.call(this);
      L.goToStateCallback("result", true)(this._requestApi.bind(this));
    };
    // 此狀態運行時無額外動作
    S.prototype.onRun = function () {};
    // 離開狀態時停止震動效果
    S.prototype.onExit = function (A) {
      this._disableShake();
      q.prototype.onExit.call(this, A);
    };
    // 強制離開時清除觀察者
    S.prototype.onForceExit = function (A) {
      var M = this._dispose;
      if (M) {
        this._dispose = undefined;
        M();
      }
      q.prototype.onForceExit.call(this, A);
    };
    // 銷毀狀態時釋放觀察者
    S.prototype.onDestroy = function (A) {
      var M = this._dispose;
      if (M) {
        this._dispose = undefined;
        M();
      }
      q.prototype.onDestroy.call(this, A);
    };
    // 根據交易狀態啟動轉輪並顯示提示
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
    // 觀察 nextSpinData 是否被清空
    S.prototype._observe = function (A) {
      return T.observeCallback(this._data, "nextSpinData")(function (M) {
        if (!M) {
          A();
        }
      });
    };
    // 顯示訊息板提示文字
    S.prototype._displayInfoboardTips = function (A) {
      var M = this.controllerPool.generalControllers.infoboardController;
      M.resetWinEffect();
      M.showTips(A, V.settingMenuHelper.turboSpinOn);
    };
    // 發送旋轉 API 請求並儲存結果
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
    // 根據 API 回應切換至結果狀態
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
    // 重置倍數顯示
    S.prototype._resetMultiplier = function (A = false) {
      this.controllerPool.generalControllers.multiplierController.playReset(A);
    };
    // 停止所有符號的震動效果
    S.prototype._disableShake = function (A) {
      this.slotController.stopSlotItemsShakeEffect(A);
    };
    return __decorate([Y], S);
  }(D.default);
  exports.default = W;
  cc._RF.pop();
}