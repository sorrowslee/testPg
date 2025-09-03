if (!cc._RF.push(module, "72b4e3mj8BEebf5FY/wO+S6", "WBSNormalGameState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GameEventHandler");
  var x = require("TransactionStateMachineHandler");
  var L = require("AppState");
  var D = require("UIStateMachine");
  var k = require("SettingMenuHelper");
  var C = require("GameConstant");
  var j = require("WBSIdleState");
  var G = require("WBSPrizeState");
  var V = require("WBSResultState");
  var Q = require("WBSRespinState");
  var N = require("WBSRequestApiState");
  var Y = require("WBSUIState");
  var W = function (q) {
    function S() {
      var z = q !== null && q.apply(this, arguments) || this;
      z.name = "Nornal Game State";
      z._preloadState = undefined;
      z._isForceExit = false;
      return z;
    }
    __extends(S, q);
    S.prototype.onReady = function () {
      // 初始化 UI 狀態機
      this._setupUIStateMachine();
    };
    S.prototype.onRun = function () {
      // 執行設定後啟動狀態機
      var z = this;
      this._setup(function () {
        z.uiStateMachine.run();
      });
    };
    S.prototype.onExit = function (z) {
      // 退出狀態時決定下一步
      if (this._isForceExit) {
        z();
      } else {
        this._transitionToNextState(z);
      }
    };
    S.prototype.onForceExit = function (z) {
      // 強制離開此狀態
      this._isForceExit = true;
      this.uiStateMachine.exit();
      z();
    };
    S.prototype.onDestroy = function (z) {
      // 銷毀狀態並清理資源
      this._destroyPreloadState();
      this.uiStateMachine = undefined;
      z();
    };
    S.prototype._setup = function (z) {
      // 依據來源狀態調整設定選單
      var A = this.controllerPool.generalControllers.settingMenuFooterController;
      switch (true) {
        case this.dataSource.transactionModel.stateTransitionFrom === C.TransitionState.NORMAL:
          A.returnHolder();
          k.settingMenuHelper.setHidden(false);
      }
      T.emitGameFlowStateChangedEvent({
        displayState: "End",
        flowType: "BonusGame"
      });
      z();
    };
    S.prototype._evaluateUIState = function () {
      // 判斷下一個 UI 狀態
      var z = this;
      var A = this.uiStateMachine.currentUIState;
      var M = this.dataSource.transactionModel.stateTransitionTo === C.TransitionState.RESPIN;
      var E = undefined;
      switch (true) {
        case A instanceof j.default:
        case A instanceof Q.default:
          var F = this._preloadState;
          this._preloadState = undefined;
          E = F || this._runRequestApiState();
          break;
        case A instanceof N.default:
          E = this._runResultState();
          break;
        case A instanceof V.default:
          E = this._runPrizeState();
          break;
        case A instanceof G.default:
          break;
        case A instanceof Y.default:
          if (M) {
            var b = this.dataSource.isRefreshWorld;
            var H = this._runRespinState();
            H.setPreloadStateCallback(function () {
              if (!b) {
                z._preloadState = z._runRequestApiState();
              }
            });
            E = H;
          } else {
            E = this._runIdleState();
          }
          break;
        default:
          E = this._runUIState();
      }
      return E;
    };
    S.prototype._setupUIStateMachine = function () {
      // 建立 UI 狀態機
      this.uiStateMachine = new D.default({
        getNextUIState: this._evaluateUIState.bind(this),
        exitUIStateMachineCallback: this.exit.bind(this)
      });
    };
    S.prototype._transitionToNextState = function (z) {
      // 根據結果決定轉換到 setup 或 idle
      var A = this.dataSource.transactionModel.stateTransitionTo === C.TransitionState.NORMAL ? "setup" : "idle";
      x.transitionCompleteCallback(A)(z);
    };
    S.prototype._runUIState = function () {
      // 建立即時 UI 狀態
      var z = this.dataSource;
      return new Y.default(z, this.controllerPool, undefined);
    };
    S.prototype._runIdleState = function () {
      // 建立待機狀態
      var z = this.dataSource;
      return new j.default(z, this.controllerPool, undefined);
    };
    S.prototype._runRequestApiState = function () {
      // 建立請求 API 的狀態
      var z = this.dataSource;
      return new N.default(z, this.controllerPool, undefined);
    };
    S.prototype._runRespinState = function () {
      // 建立即時重轉狀態
      var z = this.dataSource;
      return new Q.default(z, this.controllerPool, undefined);
    };
    S.prototype._runResultState = function () {
      // 建立結果處理狀態
      var z = this.dataSource;
      return new V.default(z, this.controllerPool, undefined);
    };
    S.prototype._runPrizeState = function () {
      // 建立獎金顯示狀態
      var z = this.dataSource;
      return new G.default(z, this.controllerPool, undefined);
    };
    S.prototype._destroyPreloadState = function () {
      // 銷毀預先載入的狀態
      var z = this._preloadState;
      if (z) {
        z.destroy();
        this._preloadState = undefined;
      }
    };
    return S;
  }(L.default);
  exports.default = W;
  cc._RF.pop();
}