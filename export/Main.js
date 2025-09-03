if (!cc._RF.push(module, "0ae50wCvn9MBav8tA9gRg+G", "Main")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Q = require("GameInitializationHandler");
  var Y = require("MultiResHandler");
  var W = require("NotifyHelper");
  var q = require("Utils");
  var z = require("GameEventHandler");
  var H = require("AnalyticsHelper");
  var U = require("TransactionStateMachineHandler");
  var X = require("UIAppearanceHelper");
  var J = require("WalletHelper");
  var Z0 = require("RequestHandler");
  var Z1 = require("SettingMenuHelper");
  var Z2 = require("SettingMenuHandlers");
  var Z3 = require("WalletHandlers");
  var Z4 = require("AppStateMachine");
  var Z5 = require("LoadingController");
  var Z6 = require("WBSDataSource");
  var Z7 = require("WBSApiClient");
  var Z8 = require("WBSRefreshWorldHandler");
  var Z9 = require("UISetupHandler");
  var ZZ = require("BGMHandler");
  var ZI = require("GameLayout");
  var Zd = require("AudioManager");
  var ZO = require("GameConstant");
  var ZR = require("SpaceBarInterrupter");
  var ZK = require("WBSNormalGameState");
  var Zg = require("WBSFreeSpinGameState");
  var ZT = require("WBSGameUtils");
  var Zx = require("AudioManager");
  var ZL = require("BVFrameworkEnum");
  var ZD = require("SpinConfigHandler");
  var Zn = require("FeatureBuyHelper");
  var Zk = require("SlotAnalyticsEnum");
  var Zt = cc._decorator;
  var Zi = Zt.ccclass;
  var ZC = Zt.property;
  var Zu = function (Zc) {
    function Zp() {
      var Zj = Zc !== null && Zc.apply(this, arguments) || this;
      Zj.blocker = undefined;
      Zj.generalControllers = Object.create(null);
      Zj.bonusControllers = Object.create(null);
      Zj._refreshWorldHandler = new Z8.default();
      return Zj;
    }
    __extends(Zp, Zc);
    // 遊戲載入時進行初始化流程
    Zp.prototype.onLoad = function () {
      this._setupAppStateMachine();
      Q.initializeGame({
        autoDeductBalance: true,
        socketConfig: {
          enableSessionSocket: true
        },
        dataSource: Z6.wbsDataSource,
        apiClient: Z7.wbsApiClient,
        multiResHandler: Y.default,
        callback: this._gameSetup.bind(this),
        notifyConfig: {
          theme: W.ThemeType.SLOT,
          buttonColor: X.uiAppearanceHelper.v("game.theme_color"),
          buttonTitleColor: X.uiAppearanceHelper.v("game.white_color"),
          titleColor: X.uiAppearanceHelper.v("game.white_color"),
          messageColor: X.uiAppearanceHelper.v("game.white_color")
        },
        refreshWorldCallback: this._refreshWorld.bind(this),
        updateBalanceCallback: this._settingMenuUpdateBalance.bind(this),
        gameTitle: {
          name: shell.I18n.t("WildBountyShowdown.Name"),
          fontFamily: X.uiAppearanceHelper.v("game.theme_font_family")
        },
        gameLayoutInfo: ZI.gameLayout,
        updateAudioPlayRateCallback: Zd.updatePlayRate.bind(Zd),
        gameResultVerifyConfig: true
      });
    };
    // 設定轉輪相關的初始參數
    Zp.prototype._initSpinConfig = function (Zj) {
      var Zl = {
        minimumSpinningTime: 0.2,
        regularSpinningTime: 0.8,
        regularSpinningTimeOffset: -0.9,
        minimumSpinningTimeOffset: -0.9,
        jurisdictionModel: Z6.wbsDataSource.systemModel.operatorJurisdiction
      };
      ZD.initSpinConfig(Zl);
      if (Zj) {
        Zj();
      }
    };
    // 串接多個初始化步驟建立遊戲
    Zp.prototype._gameSetup = function () {
      q.sequenceCallback(this._initSpinConfig.bind(this), this._initWalletHelper.bind(this), this._getInitGameInfo.bind(this), this._initAudioManager.bind(this), this._setupSettingMenu.bind(this), this._initLoader.bind(this), this._initRefreshWorldHandler.bind(this), this._load.bind(this), this._initializeSettingMenu.bind(this), this._setupWallets.bind(this), q.deferCallback(true), this._setupSlotController.bind(this), this._setupControllers.bind(this), q.deferCallback(true), this._initGeneralLocalSlotPositions.bind(this), this._setupUI.bind(this), this._setupFeatureBuy.bind(this), this._setupTransactionStateMachine.bind(this))(this._notifyPreloadComplete.bind(this));
    };
    // 初始化錢包輔助工具
    Zp.prototype._initWalletHelper = function (Zj) {
      var Zl = {
        getGameInfo: this._getGameInfoByWallet.bind(this)
      };
      J.walletHelper.init(Zl);
      if (Zj) {
        Zj();
      }
    };
    // 透過錢包資料取得遊戲資訊
    Zp.prototype._getGameInfoByWallet = function (Zj, Zl) {
      var Ze = Zj ? {
        wk: Zj
      } : undefined;
      this._getGameInfo(function (ZG, Za) {
        if (Zl) {
          Zl(Za);
        }
      }, Ze);
    };
    // 呼叫 API 取得遊戲資料
    Zp.prototype._getGameInfo = function (Zj, Zl) {
      Z0.doAPIRequest({
        name: "Get Game Info",
        apiRequest: Z7.wbsApiClient.getGameInfo.bind(Z7.wbsApiClient),
        apiRequestParam: Zl,
        errorTitle: shell.I18n.t("General.ErrorLaunchFailed"),
        retryMessage: shell.I18n.t("General.LoadingInfoRetry")
      }, this._gameInfoResultReturn(Zj));
    };
    // 取得遊戲資訊後的處理函式
    Zp.prototype._initGameInfoResultReturn = function (Zj) {
      var Zl = Date.now();
      return function (Ze, ZG) {
        J.walletHelper.processInitGameInfo(ZG, function () {
          shell.ga.sendTiming(shell.ga.CATEGORY_QUERY, shell.ga.EVENT_READ_INFO, Date.now() - Zl);
          if (Zj) {
            Zj();
          }
        });
      };
    };
    // 解析遊戲資訊並設定選單資料
    Zp.prototype._gameInfoResultReturn = function (Zj) {
      return function (Zl, Ze) {
        if (Ze && Ze.dt) {
          var ZG = Z6.wbsDataSource.systemModel;
          var Za = ZG.betLevelList;
          var ZV = ZG.betSizeList;
          var ZQ = ZG.maxLineNumber;
          var ZN = ZG.featureBuy;
          var ZY = Z6.wbsDataSource.transactionModel;
          var ZW = ZY.betSizeValue;
          var Zq = ZY.betLevelValue;
          var ZS = Z6.wbsDataSource.playerModel.minimumBetAmount;
          Z1.settingMenuHelper.betSizeList = ZV;
          Z1.settingMenuHelper.betSizeValue = ZW;
          Z1.settingMenuHelper.betLevelList = Za;
          Z1.settingMenuHelper.betLevelValue = Zq;
          Z1.settingMenuHelper.betLineValue = ZQ;
          Z1.settingMenuHelper.minimumBetAmount = ZS;
          Z1.settingMenuHelper.featureBuyThreshold = ZN && ZN.threshold;
          Z1.settingMenuHelper.baseBet = shell.I18n.t("General.BaseBet");
          Zj(Zl, Ze);
        }
      };
    };
    // 請求初始遊戲資訊
    Zp.prototype._getInitGameInfo = function (Zj) {
      var Zl = {
        eatk: Z6.wbsDataSource.systemModel.extraAssetTableKey
      };
      H.sendEvent(shell.ga.CATEGORY_QUERY, shell.ga.EVENT_READ_INFO);
      shell.setProgressVisible(false);
      W.showMessage(shell.I18n.t("General.LoadingInfo"));
      this._getGameInfo(this._initGameInfoResultReturn(Zj), Zl);
    };
    // 初始化音效管理器
    Zp.prototype._initAudioManager = function (Zj) {
      Zd.init();
      if (Zj) {
        Zj();
      }
    };
    // 設定選單並處理 Feature Buy 等邏輯
    Zp.prototype._setupSettingMenu = function (Zj) {
      var Zl = this;
      function Ze() {
        var Za = Zl.generalControllers;
        var ZV = Za.featureBuyController;
        var ZQ = Za.spinButtonController;
        var ZN = Z6.wbsDataSource.systemModel;
        var ZY = Z6.wbsDataSource.playerModel.minimumBetAmount;
        var ZW = ZN.featureBuy;
        if (ZW && ZW.isSupported && !ZQ.isHidden()) {
          if (Z1.settingMenuHelper.additionalBetCalculation() <= ZW.threshold) {
            ZV.showFeatureButton();
            ZV.enableFeatureBuy();
            if (Z1.settingMenuHelper.additionalBetCalculation() < ZY) {
              ZV.playButtonHoverEffect();
            } else {
              ZV.stopButtonHoverEffect();
            }
          } else {
            ZV.hideFeatureButton();
            ZV.disableFeatureBuy();
          }
        }
      }
      var ZG = {
        apiClient: Z7.wbsApiClient,
        dataSource: Z6.wbsDataSource,
        settingMenuHelper: Z1.settingMenuHelper,
        walletHelper: J.walletHelper,
        isProgressiveGame: false,
        toggleEffectMuted: Zd.toggleEffectMuted,
        toggleMusicMuted: Zd.toggleMusicMuted,
        betChangeCallback: Ze,
        reevaluateBetCallback: Ze,
        callback: Zj
      };
      Z2.setupSettingMenu(ZG);
    };
    // 初始化載入控制器
    Zp.prototype._initLoader = function (Zj) {
      var Zl = {
        generalControllers: this.generalControllers,
        bonusControllers: this.bonusControllers
      };
      var Ze = Zl;
      this._loadingController = this.getComponent(Z5.default);
      this._loadingController.setup(Ze);
      if (Zj) {
        Zj();
      }
    };
    // 建立重新整理世界的處理器
    Zp.prototype._initRefreshWorldHandler = function (Zj) {
      this._refreshWorldHandler.initialize({
        generalController: this.generalControllers,
        loadingController: this._loadingController,
        bonusController: this.bonusControllers,
        appStateMachine: this._appStateMachine,
        apiClient: Z7.wbsApiClient,
        dataSource: Z6.wbsDataSource,
        settingMenuHelper: Z1.settingMenuHelper,
        walletHelper: J.walletHelper
      });
      if (Zj) {
        Zj();
      }
    };
    // 載入遊戲資源
    Zp.prototype._load = function (Zj) {
      var Zl = Z6.wbsDataSource.transactionModel;
      var Ze = Zl.stateTransitionTo;
      var ZG = Zl.stateTransitionFrom;
      W.showMessage(shell.I18n.t("General.LoadingResource"));
      if (ZG !== ZO.TransitionState.FREE_SPIN && ZG !== ZO.TransitionState.FREE_SPIN_RESPIN || Ze !== ZO.TransitionState.FREE_SPIN && Ze !== ZO.TransitionState.FREE_SPIN_RESPIN) {
        this._loadingController.loadGeneralBundle(Zj);
      } else {
        this._loadingController.loadAllBundle(Zj);
      }
    };
    Zp.prototype._initializeSettingMenu = function (Zj) {
      var Zl = this.generalControllers;
      var Ze = Zl.settingController;
      var ZG = Zl.settingMenuFooterController;
      var Za = Zl.spinButtonController;
      var ZV = Zl.featureBuyController;
      Z2.initializeSettingMenu({
        dataSource: Z6.wbsDataSource,
        settingMenuHelper: Z1.settingMenuHelper,
        settingController: Ze,
        settingWalletPanelController: ZG,
        spinButtonController: Za,
        settingMenuChangedHandling: function (ZQ) {
          var ZN = Z6.wbsDataSource.systemModel.featureBuy;
          var ZY = Z6.wbsDataSource.playerModel.minimumBetAmount;
          if (ZQ) {
            Za.hide();
            ZV.hideFeatureButton();
            ZV.disableFeatureBuy();
          } else {
            Za.show();
            if (ZN && ZN.isSupported && Z1.settingMenuHelper.additionalBetCalculation() <= ZN.threshold) {
              ZV.showFeatureButton();
              ZV.enableFeatureBuy();
              if (Z1.settingMenuHelper.additionalBetCalculation() < ZY) {
                ZV.playButtonHoverEffect();
              }
            }
          }
        },
        callback: Zj
      });
    };
    // 設定 Feature Buy 功能
    Zp.prototype._setupFeatureBuy = function (Zj) {
      var Zl = Z6.wbsDataSource.systemModel;
      var Ze = Zl.featureBuy;
      var ZG = Zl.maxLineNumber;
      var Za = Z6.wbsDataSource.playerModel.minimumBetAmount;
      var ZV = Z6.wbsDataSource.transactionModel;
      var ZQ = ZV.betSizeValue;
      var ZN = ZV.betLevelValue;
      var ZY = this.generalControllers;
      var ZW = ZY.featureBuyController;
      var Zq = ZY.featureBuyButtonController;
      if (Ze) {
        var ZS = this.generalControllers.spinButtonController;
        var Zz = {
          confirmFeatureBuyCallback: function () {
            Z6.wbsDataSource.isFeatureBuy = true;
            ZS.enableButton();
            ZS.clickSpinButton(Zk.SpinTrigger.FEATURE_BUY);
          },
          cancelBuyCallback: function () {
            ZS.enableButton();
            ZW.enableFeatureBuy();
            if (Z1.settingMenuHelper.additionalBetCalculation() < Za) {
              ZW.playButtonHoverEffect();
            }
          },
          showDialogCallback: function () {
            ZS.disableButton();
            ZW.disableFeatureBuy();
          }
        };
        var Zf = ZQ * ZN * ZG;
        Zq.init(Zf, Ze.threshold);
        ZW.setupButtonConfig(Zz);
        Zn.initFeatureBuyHelper(Z6.wbsDataSource);
      } else {
        ZW.hideFeatureButton();
        ZW.disableFeatureBuy();
      }
      if (Zj) {
        Zj();
      }
    };
    Zp.prototype._setupWallets = function (Zj) {
      var Zl = {
        apiClient: Z7.wbsApiClient,
        dataSource: Z6.wbsDataSource,
        settingWalletPanelController: this.generalControllers.settingMenuFooterController,
        settingMenuHelper: Z1.settingMenuHelper,
        walletHelper: J.walletHelper,
        callback: Zj
      };
      Z3.setupWallets(Zl);
    };
    // 初始化轉輪控制器
    Zp.prototype._setupSlotController = function (Zj) {
      var Zl = this.generalControllers;
      var Ze = Zl.slotController;
      var ZG = Zl.spinButtonController;
      var Za = Z6.wbsDataSource.transactionModel.reels;
      var ZV = {
        reels: Za
      };
      Ze.init(ZV);
      ZG.init();
      if (Zj) {
        Zj();
      }
    };
    Zp.prototype._setupControllers = function (Zj) {
      var Zl = this.generalControllers;
      var Ze = Zl.spinButtonController;
      var ZG = Zl.slotController;
      var Za = Zl.bigWinController;
      var ZV = Zl.slowDropEffectController;
      var ZQ = Zl.backgroundController;
      ZR.spaceBarInterrupter.init({
        spinButtonClickCallback: Ze.clickSpinButton.bind(Ze),
        reelClickCallback: ZG.onSlotRegionClicked.bind(ZG)
      });
      var ZY = {
        getWinThreshold: this._getWinThreshold.bind(this),
        winDuration: {
          bigWinDuration: [4.048, 3.809],
          megaWinDuration: [3.81, 3.809],
          superMegaWinDuration: [3.81, 3.797]
        }
      };
      Za.setup(ZY);
      var ZW = ZQ.getSlowDropEfxHolder();
      var Zq = ZQ.resetSlowDropEfxHolder();
      ZV.init(ZW, Zq);
      if (Zj) {
        Zj();
      }
    };
    Zp.prototype._initGeneralLocalSlotPositions = function (Zj) {
      var Zl = this.generalControllers.slotController;
      var Ze = this.generalControllers.symbolPayoutController;
      for (var ZG = Zl.getAllSlotItemPosition(), Za = [], ZV = 0; ZV < ZG.length; ZV++) {
        var ZQ = ZG[ZV];
        Za[ZV] = this.node.convertToNodeSpaceAR(cc.v2(ZQ.x, ZQ.y));
      }
      var ZN = {
        numberOfColumn: ZO.NUMBER_OF_COLUMN,
        numberOfRow: ZO.NUMBER_OF_ROW,
        payoutData: ZO.PayOutData,
        buttonPosition: Za,
        numberOfButton: Za.length
      };
      var ZY = ZN;
      var ZW = Z6.wbsDataSource.transactionModel;
      var Zq = ZW.reels;
      var ZS = ZW.goldSymbol;
      var Zz = ZT.getProcessedReelSymbols(Zq, ZS);
      Ze.setReelData(Zz);
      Ze.init(ZY);
      if (Zj) {
        Zj();
      }
    };
    Zp.prototype._setupTransactionStateMachine = function (Zj) {
      var Zl = Z6.wbsDataSource.transactionModel.stateTransitionTo === ZO.TransitionState.NORMAL ? "setup" : "idle";
      U.initState(Zl);
      if (Zj) {
        Zj();
      }
    };
    Zp.prototype._notifyPreloadComplete = function () {
      shell.setProgressVisible(false);
      W.showMessage(shell.I18n.t("General.LoadingCompleted"));
      shell.requestGameStart(true, this._startGame.bind(this));
      this._loadingController.gameLaunched = true;
      this._gameEventSubscription();
    };
    // 開始遊戲流程
    Zp.prototype._startGame = function () {
      var Zj = this;
      this._playBGM();
      var Zl = this.generalControllers.slotController;
      var Ze = Z6.wbsDataSource.transactionModel.stateTransitionTo;
      function ZG() {
        Zj.blocker.active = false;
        ZR.spaceBarInterrupter.resume();
        Zj._appStateMachine.run();
      }
      this.blocker.zIndex = ZL.EN_GAME_LAYER_Z_INDEX_HIGH + 59;
      this.blocker.active = true;
      ZR.spaceBarInterrupter.pause();
      if (Ze === ZO.TransitionState.NORMAL) {
        Zl.gameIntroCameraZoomIn(false, ZG);
      } else {
        Zl.cameraZoomIn(true, ZG);
      }
    };
    Zp.prototype._restartGame = function () {
      if (this._appStateMachine && this._appStateMachine.isStateEnd) {
        this._setupAppStateMachine();
        this._appStateMachine.run();
      }
    };
    // 播放背景音樂
    Zp.prototype._playBGM = function () {
      var Zj = this;
      var Zl = Z6.wbsDataSource.transactionModel.stateTransitionTo;
      Zd.toggleAudioGameStarted();
      if (Zl === ZO.TransitionState.NORMAL) {
        if (Zx.GeneralAudioPool.bgm_intro) {
          Zx.GeneralAudioPool.bgm_intro.play();
        }
        q.delayCallback(5)(function () {
          Zj._startMainBgm();
        });
      } else {
        this._startMainBgm();
      }
    };
    Zp.prototype._startMainBgm = function () {
      var Zj = Z6.wbsDataSource.transactionModel;
      var Zl = Zj.stateTransitionFrom;
      var Ze = Zj.stateTransitionTo;
      if (Zl !== ZO.TransitionState.NORMAL && Zl !== ZO.TransitionState.RESPIN || Ze !== ZO.TransitionState.FREE_SPIN) {
        ZZ.bgmHandler.playBgm(Ze);
      } else {
        ZZ.bgmHandler.playBgm(ZO.TransitionState.NORMAL);
      }
    };
    // 建立應用狀態機
    Zp.prototype._setupAppStateMachine = function () {
      var Zj = new Z4.default({
        getNextAppState: this._evaluateAppState.bind(this),
        exitAppStateMachineCallback: this._restartGame.bind(this)
      });
      this._appStateMachine = Zj;
      this._refreshWorldHandler.setAppStateMachine(Zj);
    };
    // 判斷當前狀態並啟動遊戲
    Zp.prototype._evaluateAppState = function () {
      switch (Z6.wbsDataSource.transactionModel.stateTransitionTo) {
        case ZO.TransitionState.NORMAL:
        case ZO.TransitionState.RESPIN:
          return this._getNormalSpinState();
        case ZO.TransitionState.FREE_SPIN:
        case ZO.TransitionState.FREE_SPIN_RESPIN:
          return this._getFreeSpinState();
        default:
          return;
      }
    };
    // 取得一般旋轉狀態
    Zp.prototype._getNormalSpinState = function () {
      var Zj = this.generalControllers;
      var Zl = new ZK.default(Z6.wbsDataSource, {
        generalControllers: Zj
      }, undefined);
      Z6.wbsDataSource.isRefreshWorld = false;
      return Zl;
    };
    // 取得免費旋轉狀態
    Zp.prototype._getFreeSpinState = function () {
      var Zj = {
        generalControllers: this.generalControllers,
        bonusControllers: this.bonusControllers,
        loadingController: this._loadingController
      };
      return new Zg.default(Z6.wbsDataSource, Zj, undefined);
    };
    Zp.prototype._gameEventSubscription = function () {
      z.subscribeGamePauseEvent();
      z.subscribeGameResumeEvent();
      var Zj = this.generalControllers;
      var Zl = Zj.spinButtonController;
      var Ze = Zj.featureBuyButtonController;
      var ZG = Zj.featureBuyController;
      z.setGamePlayUIBlockEventCallback(function (Za) {
        var ZV = Z6.wbsDataSource.playerModel.minimumBetAmount;
        if (Za) {
          Zl.node.pauseSystemEvents(true);
          Ze.node.pauseSystemEvents(true);
          ZG.stopButtonHoverEffect();
        } else {
          Zl.node.resumeSystemEvents(true);
          Ze.node.resumeSystemEvents(true);
          if (Z1.settingMenuHelper.additionalBetCalculation() < ZV) {
            ZG.playButtonHoverEffect();
          }
        }
      });
    };
    // 重新整理世界資料
    Zp.prototype._refreshWorld = function (Zj) {
      this._refreshWorldHandler.refreshWorldByChangeWalletIdle(this._setupUI.bind(this), Zj);
    };
    // 建立遊戲介面
    Zp.prototype._setupUI = function (Zj) {
      var Zl = {
        dataSource: Z6.wbsDataSource,
        generalControllers: this.generalControllers,
        bonusControllers: this.bonusControllers
      };
      Z9.renderUIBaseOnState(Zl, Zj);
    };
    // 更新設定選單中的餘額
    Zp.prototype._settingMenuUpdateBalance = function (Zj) {
      Z1.settingMenuHelper.setBalance(Zj);
    };
    // 取得顯示贏分特效的門檻
    Zp.prototype._getWinThreshold = function () {
      var Zj = Z6.wbsDataSource.systemModel;
      var Zl = Zj.maxLineNumber;
      var Ze = Zj.winThresholds;
      var ZG = Z6.wbsDataSource.transactionModel;
      var Za = ZG.betSizeValue;
      var ZV = ZG.betLevelValue;
      return Ze.getAllThresholds(Za, ZV, Zl);
    };
    __decorate([ZC(cc.Node)], Zp.prototype, "blocker", undefined);
    return __decorate([Zi], Zp);
  }(cc.Component);
  exports.default = Zu;
  cc._RF.pop();
}