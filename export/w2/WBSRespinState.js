if (!cc._RF.push(module, "00a34dTvhRLNYoHGKRmiubo", "WBSRespinState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("TransactionStateMachineHandler");
  var L = require("UIState");
  var D = require("GameConstant");
  var k = require("AutomationDecorator");
  var C = require("SlotController.spec");
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.name = "Respin State";
      G._preloadStateCallback = undefined;
      G._disposeRunCallback = undefined;
      G._disposeCollapseCallback = undefined;
      return G;
    }
    __extends(j, p);
    // 設定預載入下一狀態的回呼
    j.prototype.setPreloadStateCallback = function (G) {
      this._preloadStateCallback = G;
    };
    // 執行 Respin 狀態流程
    j.prototype.onRun = function () {
      this._disposeRunCallback = T.sequenceCallback(this._setupUI.bind(this), this._playCollapse.bind(this))(this.exit.bind(this));
    };
    // 此狀態準備階段無額外處理
    j.prototype.onReady = function () {};
    // 強制離開時清理資源
    j.prototype.onForceExit = function (G) {
      this._disposeRun();
      this._disposeCollapse();
      G();
    };
    // 正常離開時清理資源
    j.prototype.onExit = function (G) {
      this._disposeRun();
      this._disposeCollapse();
      G();
    };
    // 銷毀時清理資源
    j.prototype.onDestroy = function (G) {
      this._disposeRun();
      this._disposeCollapse();
      G();
    };
    // 預先載入下一個狀態
    j.prototype._preloadNextState = function (G) {
      if (this._preloadStateCallback) {
        this._preloadStateCallback();
      }
      if (G) {
        G();
      }
    };
    // 切換到下一個遊戲狀態
    j.prototype._changeState = function (G) {
      var V = this;
      x.goToStateCallback("action", true, {
        noBet: true
      })(function () {
        if (V.dataSource) {
          var N = V.dataSource.transactionModel.stateTransitionTo;
          if (N === D.TransitionState.RESPIN || N === D.TransitionState.FREE_SPIN_RESPIN) {
            x.transitionCompleteCallback("action")(function () {
              if (G) {
                G();
              }
            });
          }
        }
      });
    };
    // 重設派彩面板與提示
    j.prototype._setupUI = function (G) {
      var V = this.controllerPool.generalControllers.symbolPayoutController;
      V.disablePanel();
      V.clearOnClickCallback();
      V.hidePopOutItem();
      if (G) {
        G();
      }
    };
    // 播放符號崩塌與掉落流程
    j.prototype._playCollapse = function (G) {
      this._disposeCollapseCallback = T.sequenceCallback(this._symbolBreak.bind(this), T.spawnCallback(this._disableDimBackground.bind(this), T.sequenceCallback(T.delayCallback(0.3), this._playDropOldSymbols.bind(this)), T.sequenceCallback(this._changeState.bind(this), this._preloadNextState.bind(this))))(G);
    };
    // 播放得獎符號破碎動畫
    j.prototype._symbolBreak = function (G) {
      var V = this.controllerPool.generalControllers.slotController;
      var Q = this.dataSource.transactionModel.winPositionList;
      var N = [];
      V.getSlotItems(Q).forEach(function (Y) {
        N.push(function (W) {
          Y.playBreak(W);
        });
      });
      T.spawnCallback(N)(function () {
        if (G) {
          G();
        }
      });
    };
    // 關閉暗色背景
    j.prototype._disableDimBackground = function (G) {
      this.controllerPool.generalControllers.slotTintController.disableDarkMode();
      if (G) {
        G();
      }
    };
    // 舊符號掉落並啟動震動
    j.prototype._playDropOldSymbols = function (G) {
      var V = this.controllerPool.generalControllers.slotController;
      V.removeSymbols();
      V.playShiftOldSlotEffect();
      this._enableShake();
      G();
    };
    // 播放符號震動效果
    j.prototype._enableShake = function (G) {
      this.controllerPool.generalControllers.slotController.playSlotItemsShakeEffect();
      if (G) {
        G();
      }
    };
    // 清除運行流程的回呼
    j.prototype._disposeRun = function () {
      var G = this._disposeRunCallback;
      if (G) {
        G();
      }
      this._disposeRunCallback = undefined;
    };
    // 清除崩塌流程的回呼
    j.prototype._disposeCollapse = function () {
      var G = this._disposeCollapseCallback;
      if (G) {
        G();
      }
      this._disposeCollapseCallback = undefined;
    };
    __decorate([k.automationDec({
      func: C.symbolBreak
    })], j.prototype, "_symbolBreak", null);
    return j;
  }(L.default);
  exports.default = u;
  cc._RF.pop();
}