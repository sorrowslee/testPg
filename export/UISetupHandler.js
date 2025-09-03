if (!cc._RF.push(module, "71e5eAt2xdH5J3VT6nognao", "UISetupHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.renderUIBaseOnState = exports.BonusGameUI = exports.NormalGameUI = exports.settingMenuInteractable = undefined;
  var T = require("GameConstant");
  var x = require("SettingMenuHelper");
  var L = require("SlotGameTools");
  var D = require("InfoBoardController");
  var k = require("Utils");
  exports.settingMenuInteractable = function (N) {
    // 設定設定選單所有按鈕是否可互動
    x.settingMenuHelper.setAllButtonsInteractable(N);
  };
  var C = function () {
    function N() {}
    N.prototype.setup = function (Y, W) {
      // 初始化一般遊戲界面並依序顯示資訊
      this._generalControllers = Y.generalControllers;
      this._dataSource = Y.dataSource;
      G(this._dataSource);
      k.sequenceCallback(this._setupUI.bind(this), this._showWaysText.bind(this), this._showWinAmount.bind(this), this._showMultiplier.bind(this))(W);
    };
    N.prototype._setupUI = function (Y) {
      // 切換至一般遊戲 UI 並重置控制器
      var W = this._generalControllers;
      var q = W.slotController;
      var S = W.slotTintController;
      var z = W.spinButtonController;
      var f = W.settingMenuFooterController;
      var A = W.backgroundController;
      var M = W.foregroundController;
      var E = W.fastSpinController;
      var F = W.slowDropEffectController;
      var b = this._dataSource.transactionModel;
      A.switchUI(T.TransitionState.NORMAL);
      M.switchUI(T.TransitionState.NORMAL);
      F.switchUI(T.TransitionState.NORMAL);
      x.settingMenuHelper.setHidden(false);
      f.returnHolder();
      if (x.settingMenuHelper.isIdle()) {
        z.show();
      }
      q.removeOverlaySlotItems();
      S.node.setPosition(0, 180);
      q.node.setPosition(0, 180);
      E.node.setPosition(0, 180);
      q.reloadData(b);
      E.reset();
      this._setupFeatureButton();
      this._resumeFeatureButton();
      if (Y) {
        Y();
      }
    };
    N.prototype._showWinAmount = function (Y) {
      // 顯示贏分資訊
      Q(this._generalControllers, this._dataSource, false, Y);
    };
    N.prototype._showMultiplier = function (Y) {
      // 更新倍數顯示
      var W = this._generalControllers.multiplierController;
      var q = this._dataSource.transactionModel.gameMultiplier;
      W.reloadMultiplier(q, false);
      if (Y) {
        Y();
      }
    };
    N.prototype._showWaysText = function (Y) {
      // 隱藏方式提示文字
      this._generalControllers.waysController.node.active = false;
      if (Y) {
        Y();
      }
    };
    N.prototype._setupFeatureButton = function (Y) {
      // 設定 Feature Buy 按鈕狀態
      var W = this._dataSource.systemModel;
      var q = W.operatorJurisdiction.buyFeature;
      var S = this._generalControllers.featureBuyController;
      if (q) {
        var z = W.featureBuy;
        if (z) {
          S.setFeatureBuyButtonState(q);
          S.setFeatureBuyMultiply(z.betMultiplier);
        } else {
          S.setFeatureBuyButtonState(false);
        }
      } else {
        S.hideFeatureBuy();
      }
      if (Y) {
        Y();
      }
    };
    N.prototype._resumeFeatureButton = function (Y) {
      // 恢復 Feature Buy 按鈕可用狀態
      var W = this._dataSource.systemModel;
      var q = this._dataSource.transactionModel.stateTransitionTo;
      var S = W.featureBuy;
      var z = this._generalControllers.featureBuyController;
      if (S) {
        if (S.isSupported === false) {
          z.disableFeatureBuy();
          if (Y) {
            Y();
          }
          return;
        }
        if (q === T.TransitionState.RESPIN || q === T.TransitionState.FREE_SPIN) {
          x.settingMenuHelper.additionalBetCalculation();
          S.threshold;
          z.disableFeatureBuy();
        }
      }
      if (Y) {
        Y();
      }
    };
    return N;
  }();
  exports.NormalGameUI = C;
  var j = function () {
    function _N() {}
    _N.prototype.setup = function (Y, W) {
      // 初始化免費遊戲界面並顯示資訊
      this._generalControllers = Y.generalControllers;
      this._bonusControllers = Y.bonusControllers;
      this._dataSource = Y.dataSource;
      G(this._dataSource);
      k.sequenceCallback(this._setupUI.bind(this), this._showWaysText.bind(this), this._showWinAmount.bind(this), this._showMultiplier.bind(this), this._setupSymbolPopout.bind(this))(W);
    };
    _N.prototype._setupUI = function (Y) {
      // 切換至免費遊戲 UI 並重置控制器
      var W = this._generalControllers;
      var q = W.slotController;
      var S = W.slotTintController;
      var z = W.spinButtonController;
      var f = W.settingMenuFooterController;
      var A = W.settingMenuFooterHolder;
      var M = W.backgroundController;
      var E = W.foregroundController;
      var F = W.fastSpinController;
      var b = W.slowDropEffectController;
      var H = this._dataSource.transactionModel;
      var w = H.freeSpin;
      M.switchUI(T.TransitionState.FREE_SPIN);
      E.switchUI(T.TransitionState.FREE_SPIN);
      b.switchUI(T.TransitionState.FREE_SPIN);
      z.hide();
      f.changeHolder(A);
      q.removeOverlaySlotItems();
      S.node.setPosition(0, 50);
      q.node.setPosition(0, 50);
      F.node.setPosition(0, 50);
      q.reloadData(H);
      F.reset();
      this._bonusControllers.remainingFreeSpinController.show(w.step);
      this._setupFeatureButton();
      if (Y) {
        Y();
      }
    };
    _N.prototype._showWinAmount = function (Y) {
      // 顯示贏分資訊
      Q(this._generalControllers, this._dataSource, true, Y);
    };
    _N.prototype._showMultiplier = function (Y) {
      // 更新倍數顯示
      var W = this._generalControllers.multiplierController;
      var q = this._dataSource.transactionModel.gameMultiplier;
      W.reloadMultiplier(q, true);
      if (Y) {
        Y();
      }
    };
    _N.prototype._setupSymbolPopout = function (Y) {
      // 隱藏符號派彩彈出面板
      var W = this._generalControllers.symbolPayoutController;
      W.hidePopOutItem();
      W.clearOnClickCallback();
      W.disablePanel();
      if (Y) {
        Y();
      }
    };
    _N.prototype._showWaysText = function (Y) {
      // 顯示方式提示文字
      this._generalControllers.waysController.node.active = true;
      if (Y) {
        Y();
      }
    };
    _N.prototype._setupFeatureButton = function (Y) {
      // 設定免費遊戲中 Feature Buy 按鈕
      var W = this._dataSource.systemModel;
      var q = W.operatorJurisdiction.buyFeature;
      var S = this._generalControllers.featureBuyController;
      if (q) {
        var z = W.featureBuy;
        if (z) {
          S.setFeatureBuyButtonState(q);
          S.setFeatureBuyMultiply(z.betMultiplier);
          S.hideFeatureButton();
          S.disableFeatureBuy();
          S.hideFeatureBuy();
        }
      } else {
        S.hideFeatureBuy();
      }
      if (Y) {
        Y();
      }
    };
    return _N;
  }();
  exports.BonusGameUI = j;
  exports.renderUIBaseOnState = function (N, Y) {
    // 根據遊戲狀態渲染對應 UI
    var W = N.dataSource.transactionModel;
    var q = W.stateTransitionFrom;
    var S = W.stateTransitionTo;
    var z = q === T.TransitionState.FREE_SPIN || q === T.TransitionState.FREE_SPIN_RESPIN;
    var f = S === T.TransitionState.FREE_SPIN || S === T.TransitionState.FREE_SPIN_RESPIN;
    switch (true) {
      case z && f:
        new j().setup(N, Y);
        break;
      default:
        new C().setup(N, Y);
    }
  };
  cc._RF.pop();
}
function G(N) {
  // 更新設定選單的餘額與贏分
  var Y = N.playerModel.balance;
  var W = N.transactionModel.accumulatedWinAmount;
  x.settingMenuHelper.setBalance(Y);
  x.settingMenuHelper.setWinAmount(W);
}
function V(N) {
  // 取得所有獎金門檻
  var Y = N.systemModel;
  var W = Y.maxLineNumber;
  var q = Y.winThresholds;
  var S = N.transactionModel;
  var z = S.betSizeValue;
  var f = S.betLevelValue;
  return q.getAllThresholds(z, f, W);
}
function Q(N, Y, W, q) {
  // 根據贏分顯示訊息板效果
  var S = Y.transactionModel;
  var z = S.accumulatedWinAmount;
  var A = S.totalWinAmount;
  var M = S.isTransactionEnd;
  var E = S.gameMultiplier;
  var F = N.infoboardController;
  var b = V(Y);
  var H = M ? z : A;
  F.resetWinEffect();
  if (L.isBigWinThreshold(H, b) && M) {
    F.play({
      playState: D.InfoBoardShowState.HIGH_PAY_BIG_TOTAL_WIN,
      amount: H,
      multiplierNumber: E,
      isMute: true
    }, q);
  } else if (L.isMediumWinThreshold(H, b)) {
    var w = M ? D.InfoBoardShowState.INSTANT_HIGH_PAY_TOTAL_WIN : D.InfoBoardShowState.HIGH_PAY_WIN;
    var U = {
      playState: w,
      amount: H,
      multiplierNumber: E,
      isMute: true
    };
    F.play(U, q);
  } else if (H > 0) {
    w = M ? D.InfoBoardShowState.LOW_PAY_TOTAL_WIN : D.InfoBoardShowState.LOW_PAY_WIN;
    F.play({
      playState: w,
      amount: H,
      multiplierNumber: E,
      isMute: true
    }, q);
  } else {
    var B = W ? D.InfoboardUIState.FREE_SPIN_TIPS : D.InfoboardUIState.NORMAL_TIPS;
    F.showTips(B, true);
    if (q) {
      q();
    }
  }
}