if (!cc._RF.push(module, "4ef5cJw0YpAx5UIePlauVio", "RefreshWorldHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RefreshWorldGameState = undefined;
  var T;
  var x = require("RequestHandler");
  var L = require("Utils");
  var D = require("GenericLoadingScreenController");
  (function (u) {
    u[u.STANDARD = 0] = "STANDARD";
    u[u.PROGRESSING = 1] = "PROGRESSING";
  })(T = exports.RefreshWorldGameState ||= {});
  var k = cc._decorator.ccclass;
  var C = function () {
    function u() {
      this.refreshWorldGameState = T.STANDARD;
    }
    // 初始化遊戲所需的控制器與資料來源
    u.prototype.initialize = function (c) {
      this.generalControllers = c.generalController;
      this.bonusControllers = c.bonusController ? c.bonusController : undefined;
      this.extraControllers = c.extraController ? c.extraController : undefined;
      this.dataSource = c.dataSource;
      this.apiClient = c.apiClient;
      this.settingMenuHelper = c.settingMenuHelper;
      this.walletHelper = c.walletHelper;
      this.refreshWorldGameState = c.refreshWorldGameState ? c.refreshWorldGameState : T.STANDARD;
    };
    // 錢包切換後重新整理遊戲狀態並維持閒置
    u.prototype.refreshWorldByChangeWalletIdle = function (c, p) {
      L.sequenceCallback(this.loadBundle.bind(this), this._setUpBetValue.bind(this), this._exitAutoSpinAndDisabledSpinButton.bind(this), this._settingMenuCleanUp.bind(this), this.resetController.bind(this), L.deferCallback(true), L.deferCallback(true), this.executeTransition.bind(this), c, this._getReevaluateBet.bind(this), this._setupWallet.bind(this), this.changeWalletIdleSetUp.bind(this), this.reenableSpinButton.bind(this))(p);
    };
    // 下注選項變更後重新整理遊戲狀態
    u.prototype.refreshWorldByBetOptionIdle = function (c, p) {
      var j = p || function () {};
      L.sequenceCallback(this.loadBundle.bind(this), this._exitAutoSpinAndDisabledSpinButton.bind(this), this._showLoadingPage.bind(this), this._settingMenuCleanUp.bind(this), this._getChangeBetOptionsApiCall.bind(this), this.resetController.bind(this), L.deferCallback(true), L.deferCallback(true), this.executeTransition.bind(this), c, this._setupWallet.bind(this), this.betOptionPreIdleSetUp.bind(this), this._hideLoadingPage.bind(this), this.betOptionIdleSetUp.bind(this), this.reenableSpinButton.bind(this))(j);
    };
    // 顯示載入畫面
    u.prototype._showLoadingPage = function (c) {
      D.showLoadingPage(c);
    };
    // 隱藏載入畫面
    u.prototype._hideLoadingPage = function (c) {
      D.hideLoadingPage(c);
    };
    // 初始化玩家錢包資料
    u.prototype._setupWallet = function (c) {
      var p = this.walletHelper;
      var j = this.dataSource;
      p.setupWallet(j.lastTransactionRawData);
      if (c) {
        c();
      }
    };
    // 設定下注相關數值
    u.prototype._setUpBetValue = function (p) {
      var j = this.dataSource;
      var G = this.settingMenuHelper;
      var V = j.systemModel;
      var Q = V.betSizeList;
      var N = V.betLevelList;
      var Y = V.featureBuy;
      var W = j.transactionModel;
      var q = W.betLevelValue;
      var S = W.betSizeValue;
      var z = j.playerModel.minimumBetAmount;
      G.betSizeList = Q;
      G.betSizeValue = S;
      G.betLevelList = N;
      G.betLevelValue = q;
      G.featureBuyThreshold = Y && Y.threshold;
      G.minimumBetAmount = z;
      G.updateBetValues();
      if (p) {
        p();
      }
    };
    // 呼叫 API 取得新的下注選項資訊
    u.prototype._getChangeBetOptionsApiCall = function (c) {
      var p = this.dataSource.transactionModel;
      var j = {
        cs: p.betSizeValue,
        ml: p.betLevelValue
      };
      this._getNewWorldInfo(c, j);
    };
    // 透過 API 更新遊戲資訊
    u.prototype._getNewWorldInfo = function (c, p) {
      var j = this.apiClient;
      var G = this.dataSource;
      var V = this.settingMenuHelper;
      x.doAPIRequest({
        name: "Update Game Info",
        apiRequest: j.updateGameInfo.bind(j),
        apiRequestParam: p,
        errorTitle: shell.I18n.t("General.ErrorChangeFailed")
      }, function (Q, N) {
        if (N && N.dt) {
          var Y = G.systemModel;
          var W = Y.betSizeList;
          var q = Y.betLevelList;
          var S = G.transactionModel;
          var z = S.betLevelValue;
          var f = S.betSizeValue;
          V.betSizeList = W;
          V.betSizeValue = f;
          V.betLevelList = q;
          V.betLevelValue = z;
          V.updateBetValues();
          if (c) {
            c();
          }
        }
      });
    };
    // 退出自動旋轉並停用旋轉按鈕
    u.prototype._exitAutoSpinAndDisabledSpinButton = function (c) {
      var p = this.generalControllers;
      p.spinButtonController.exitAutoSpinMode();
      p.spinButtonController.disableButton();
      if (c) {
        c();
      }
    };
    // 清理設定選單的暫存資料
    u.prototype._settingMenuCleanUp = function (c) {
      this.settingMenuHelper.setWinAmount(0);
      if (c) {
        c();
      }
    };
    // 重新評估下注設定
    u.prototype._getReevaluateBet = function (c) {
      var p = this.settingMenuHelper;
      if (p.reevaluateBet()) {
        p.updateBetValues();
        this._checkGameStateAndUpdateBetAPI(c);
      } else if (c) {
        c();
      }
    };
    // 依遊戲狀態決定是否更新下注 API
    u.prototype._checkGameStateAndUpdateBetAPI = function (c) {
      switch (this.refreshWorldGameState) {
        case T.STANDARD:
          if (c) {
            c();
          }
          break;
        case T.PROGRESSING:
          this._getChangeBetOptionsApiCall(c);
      }
    };
    // 載入資源包的佔位函式
    u.prototype.loadBundle = function (c) {
      if (c) {
        c();
      }
    };
    // 重新啟用旋轉按鈕
    u.prototype.reenableSpinButton = function (c) {
      var p = this.generalControllers.spinButtonController;
      p.idle();
      p.enableButton();
      if (c) {
        c();
      }
    };
    // 重置控制器的佔位函式
    u.prototype.resetController = function (c) {
      if (c) {
        c();
      }
    };
    // 執行狀態轉換的佔位函式
    u.prototype.executeTransition = function (c) {
      if (c) {
        c();
      }
    };
    // 錢包變更時的預設處理
    u.prototype.changeWalletIdleSetUp = function (c) {
      if (c) {
        c();
      }
    };
    // 下注選項變更前的預設處理
    u.prototype.betOptionPreIdleSetUp = function (c) {
      if (c) {
        c();
      }
    };
    // 下注選項變更後的預設處理
    u.prototype.betOptionIdleSetUp = function (c) {
      if (c) {
        c();
      }
    };
    return __decorate([k], u);
  }();
  exports.default = C;
  cc._RF.pop();
}