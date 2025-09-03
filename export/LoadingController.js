if (!cc._RF.push(module, "34a3aP50jNA1ItVjcX3dhLy", "LoadingController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = require("BVFrameworkEnum");
  var L = require("SlotImageHandler");
  var D = require("Utils");
  var k = require("BaseLoadingController");
  var C = require("AudioAssetConfig");
  var j = require("GeneralAssetConfig");
  var G = require("LateAssetConfig");
  var V = require("BonusAssetConfig");
  var Q = require("NodePoolHandler");
  var N = require("GameConstant");
  var Y = require("FreeSpinWonController");
  var W = require("EffectItemRegisterHandler");
  var q = require("PayoutEffectFrontController");
  var z = require("PayoutEffectBackController");
  var A = cc._decorator;
  var M = A.ccclass;
  var E = A.property;
  var F = function (b) {
    function H() {
      var w = b !== null && b.apply(this, arguments) || this;
      w.backgroundHolder = undefined;
      w.foregroundHolder = undefined;
      w.clickEffectHolder = undefined;
      w.slotControllerHolder = undefined;
      w.slotTintHolder = undefined;
      w.fastSpinHolder = undefined;
      w.spinButtonHolder = undefined;
      w.bigWinHolder = undefined;
      w.totalWinHolder = undefined;
      w.bonusLoadingHolder = undefined;
      w.infoboardHolder = undefined;
      w.remainingFreeSpinHolder = undefined;
      w.freeSpinWonHolder = undefined;
      w.symbolPopOutButtonHolder = undefined;
      w.symbolPopOutDisplayHolder = undefined;
      w.symbolPopOutTintHolder = undefined;
      w.multiplierHolder = undefined;
      w.waysHolder = undefined;
      w.slowDropHolder = undefined;
      w.feature_buy_button_holder = undefined;
      w.feature_buy_dialog_holder = undefined;
      w.payoutEffectBackItem = undefined;
      w.payoutEffectFrontItem = undefined;
      w._completedCallback = undefined;
      w._isShowBonusLoading = false;
      w._isLateAssetsLoaded = false;
      w._hasBonusLoaded = false;
      w._bonusLoadingTexture = undefined;
      return w;
    }
    __extends(H, b);
    H.prototype.hasBonusLoaded = function () {
      return this._hasBonusLoaded;
    };
    H.prototype.setup = function (w) {
      b.prototype.setup.call(this, w);
      this._setupHolderZIndex();
    };
    H.prototype.progressCallback = function (w, U) {
      if (this._isShowBonusLoading) {
        this.generalControllers.bonusLoadingController.updateProgress(w, U);
      } else {
        b.prototype.progressCallback.call(this, w, U);
      }
    };
    H.prototype._setupHolderZIndex = function () {
      this.spinButtonHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 50;
      this.settingMenuHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 51;
      this.feature_buy_dialog_holder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 52;
      this.bonusLoadingHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 53;
      this.settingMenuFooterHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 54;
      this.bigWinHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 55;
      this.totalWinHolder.zIndex = x.EN_GAME_LAYER_Z_INDEX_HIGH + 56;
    };
    H.prototype.loadAllBundle = function (w) {
      shell.setProgressVisible(true);
      this._completedCallback = w;
      this._isShowBonusLoading = false;
      var U = C.getAudioAssetConfig();
      var B = [].concat(j.generalAssetConfig, U, V.bonusAssetConfig);
      if (!this._isLateAssetsLoaded) {
        this._isLateAssetsLoaded = true;
        B = B.concat(G.lateAssetConfig);
      }
      this.loadBundle(B, this._onAllTaskCompleteCallback.bind(this));
    };
    H.prototype.loadBonusBundle = function (w) {
      this._completedCallback = w;
      this._isShowBonusLoading = true;
      var U = [].concat(V.bonusAssetConfig);
      if (!this._isLateAssetsLoaded) {
        this._isLateAssetsLoaded = true;
        U = U.concat(G.lateAssetConfig);
      }
      var B = this._bonusTaskComplete.bind(this);
      this.loadBundle(U, B);
    };
    H.prototype.loadGeneralBundle = function (w) {
      var U = this;
      shell.setProgressVisible(true);
      this._completedCallback = w;
      this._isShowBonusLoading = false;
      var B = C.getAudioAssetConfig();
      var P = [].concat(j.generalAssetConfig, B);
      if (P.length) {
        this.loadBundle(P, function (X) {
          U._normalTaskComplete(X);
          if (w) {
            w();
          }
        });
      } else if (w) {
        w();
      }
    };
    H.prototype._onAllTaskCompleteCallback = function (w) {
      this._normalTaskComplete(w);
      this._bonusTaskComplete(w);
      var U = this._completedCallback;
      this._completedCallback = undefined;
      if (U) {
        U();
      }
    };
    H.prototype._normalTaskComplete = function (X) {
      var J = X.click_effect;
      var Z0 = X.spin_button_controller;
      var Z1 = X.slot_controller;
      var Z2 = X.slot_tint_controller;
      var Z3 = X.background_controller;
      var Z4 = X.fast_spin_controller;
      var Z5 = X.foreground_controller;
      var Z6 = X.infoboard_controller;
      var Z7 = X.bonus_loading_controller;
      var Z8 = X.big_win_controller;
      var Z9 = X.multiplier_controller;
      var ZZ = X.symbol_payout_controller;
      var ZI = X.ways_controller;
      var Zd = X.slow_drop_effect_controller;
      var ZO = X.feature_buy_button_controller;
      var ZR = X.feature_buy_controller;
      var ZK = X.big_win_texture;
      var Zg = X.bonus_loading_texture;
      var ZT = X.info_message_texture;
      var Zx = X.feature_buy_text;
      var ZL = X.main_text;
      this._setupSymbolImage(X);
      this._setUpGameEffectItem();
      var ZD = k.instantiateController(J.result, "ClickEffectController", this.clickEffectHolder);
      this.generalControllers.clickEffectController = ZD;
      var Zn = k.instantiateController(Z0.result, "WBSSpinButtonController", this.spinButtonHolder);
      this.generalControllers.spinButtonController = Zn;
      var Zk = k.instantiateController(Z2.result, "SlotTintController", this.slotTintHolder);
      this.generalControllers.slotTintController = Zk;
      var Zt = k.instantiateController(Z3.result, "BackgroundController", this.backgroundHolder);
      this.generalControllers.backgroundController = Zt;
      var Zi = k.instantiateController(Z4.result, "FastSpinController", this.fastSpinHolder);
      this.generalControllers.fastSpinController = Zi;
      var ZC = k.instantiateController(Z5.result, "ForegroundController", this.foregroundHolder);
      var Zu = ZL.result;
      var Zc = {
        leftWay: Zu.getSpriteFrame("ways_left"),
        rightWay: Zu.getSpriteFrame("ways_right")
      };
      ZC.init(Zc);
      this.generalControllers.foregroundController = ZC;
      var Zp = k.instantiateController(Z8.result, "WBSBigWinController", this.bigWinHolder);
      var Zj = ZK.result;
      Zp.init({
        bigWin: Zj.getSpriteFrame("bw"),
        megaWin: Zj.getSpriteFrame("mw"),
        superMegaWin: Zj.getSpriteFrame("smw")
      });
      this.generalControllers.bigWinController = Zp;
      var Zl = k.instantiateController(Z6.result, "InfoBoardController", this.infoboardHolder);
      var Ze = ZT.result;
      var ZG = {
        normalSpinTips: [Ze.getSpriteFrame("info_1"), Ze.getSpriteFrame("info_2"), Ze.getSpriteFrame("info_3"), Ze.getSpriteFrame("info_4")],
        freeSpinTips: [Ze.getSpriteFrame("info_5")],
        freeSpinWonTip: Ze.getSpriteFrame("info_fs"),
        scatterRequestTip: Ze.getSpriteFrame("info_scatter"),
        winText: Ze.getSpriteFrame("info_win"),
        totalWinText: Ze.getSpriteFrame("info_tw")
      };
      Zl.init(ZG);
      this.generalControllers.infoboardController = Zl;
      var Za = k.instantiateController(ZO.result, "FeatureBuyButtonController", this.feature_buy_button_holder);
      var ZV = Zx.result;
      Za.setSpriteFrame(ZV.getSpriteFrame("fb_main"));
      this.generalControllers.featureBuyButtonController = Za;
      var ZQ = k.instantiateController(ZR.result, "FeatureBuyController", this.feature_buy_dialog_holder);
      var ZN = {
        featureBuyButtonController: Za,
        featureBuyText: Zx.result
      };
      ZQ.init(ZN);
      this.generalControllers.featureBuyController = ZQ;
      var ZY = k.instantiateController(Z7.result, "BonusLoadingController", this.bonusLoadingHolder);
      var ZW = Zg.result;
      this._bonusLoadingTexture = ZW;
      ZY.init({
        freeSpinTextSF: ZW.getSpriteFrame("fs"),
        startTextSF: ZW.getSpriteFrame("btn_start"),
        descTextSF: ZW.getSpriteFrame("bns_desc")
      });
      this.generalControllers.bonusLoadingController = ZY;
      var Zq = k.instantiateController(Z9.result, "MultiplierController", this.multiplierHolder);
      Zq.init(Zl.node);
      this.generalControllers.multiplierController = Zq;
      var ZS = k.instantiateController(ZZ.result, "SymbolPayoutController", this.symbolPopOutButtonHolder);
      ZS.setPopOutDisplayHolder(this.symbolPopOutDisplayHolder);
      ZS.setPopOutTintHolder(this.symbolPopOutTintHolder);
      this.generalControllers.symbolPayoutController = ZS;
      var Zz = k.instantiateController(ZI.result, "WaysController", this.waysHolder);
      Zz.setWaysText(Ze.getSpriteFrame("info_ways"));
      this.generalControllers.waysController = Zz;
      var Zf = k.instantiateController(Zd.result, "SlowDropEffectController", this.slowDropHolder);
      this.generalControllers.slowDropEffectController = Zf;
      var ZA = k.instantiateController(Z1.result, "WBSSlotController", this.slotControllerHolder);
      ZA.setupControllers(this.generalControllers);
      this.generalControllers.slotController = ZA;
    };
    H.prototype._bonusTaskComplete = function (w) {
      var U = w.free_spin_won_controller;
      var B = w.remaining_free_spin_controller;
      var P = w.remaining_free_spin_texture;
      var X = w.total_win_controller;
      var J = w.total_win_texture;
      if (B) {
        var Z0 = k.instantiateController(B.result, "RemainingFreeSpinController", this.remainingFreeSpinHolder);
        var Z1 = P.result;
        Z0.init({
          remainingFreeSpinSF: Z1.getSpriteFrame("rfs"),
          lastSpinRemainingSF: Z1.getSpriteFrame("lfs")
        });
        this.bonusControllers.remainingFreeSpinController = Z0;
        var Z2 = k.instantiateController(U.result, Y.default, this.remainingFreeSpinHolder);
        Z2.init(this._bonusLoadingTexture.getSpriteFrame("fs"));
        this.bonusControllers.freeSpinWonController = Z2;
        this._hasBonusLoaded = true;
      }
      var Z3 = J.result;
      var Z4 = k.instantiateController(X.result, "WBSTotalWinController", this.totalWinHolder);
      Z4.init({
        totalWinSF: Z3.getSpriteFrame("tw"),
        collectSF: Z3.getSpriteFrame("btn_collect"),
        freeSpinSF: Z3.getSpriteFrame("tw_fs")
      });
      Z4.setup();
      this.generalControllers.totalWinController = Z4;
      var Z5 = this._completedCallback;
      this._completedCallback = undefined;
      if (Z5) {
        Z5();
      }
    };
    H.prototype.releaseBonusBundle = function (w) {
      var U = this;
      if (this._hasBonusLoaded) {
        var B = [].concat(V.bonusAssetConfig);
        var P = this.bonusControllers;
        D.sequenceCallback(function (X) {
          P.remainingFreeSpinController.destroy();
          P.remainingFreeSpinController = undefined;
          P.freeSpinWonController.destroy();
          P.freeSpinWonController = undefined;
          U._hasBonusLoaded = false;
          X();
        }, function (X) {
          U.resourceLoader.releaseBundle(B, "Bonus");
          Q.nodePoolHandler.unregisterReusableItem(N.NodePoolName.RamainingFreeSpinUpgradeItem);
          X();
        })(w);
      } else if (w) {
        w();
      }
    };
    H.prototype._setupSymbolImage = function (w) {
      var U = w.symbol;
      var B = w.feature_symbol;
      var P = {};
      for (var X in w) {
        if (Object.prototype.hasOwnProperty.call(w, X)) {
          var J = w[X];
          if (J.config.type === sp.SkeletonData) {
            P[X] = J.result;
          }
        }
      }
      var Z0 = U.result;
      var Z1 = B.result;
      var Z2 = {
        symbolAtlas: Z0,
        featureSymbolAtlas: Z1,
        spines: P
      };
      L.slotImageHandler.setup(Z2);
    };
    H.prototype._setUpGameEffectItem = function () {
      var w = {
        name: N.NodePoolName.PayoutEffectFrontItem,
        itemPrefab: this.payoutEffectFrontItem,
        handler: q.default,
        value: 30
      };
      var U = {
        name: N.NodePoolName.PayoutEffectBackItem,
        itemPrefab: this.payoutEffectBackItem,
        handler: z.default,
        value: 30
      };
      W.effectItemRegisterHandler.init([w, U]);
    };
    __decorate([E(cc.Node)], H.prototype, "backgroundHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "foregroundHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "clickEffectHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "slotControllerHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "slotTintHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "fastSpinHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "spinButtonHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "bigWinHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "totalWinHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "bonusLoadingHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "infoboardHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "remainingFreeSpinHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "freeSpinWonHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "symbolPopOutButtonHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "symbolPopOutDisplayHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "symbolPopOutTintHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "multiplierHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "waysHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "slowDropHolder", undefined);
    __decorate([E(cc.Node)], H.prototype, "feature_buy_button_holder", undefined);
    __decorate([E(cc.Node)], H.prototype, "feature_buy_dialog_holder", undefined);
    __decorate([E(cc.Prefab)], H.prototype, "payoutEffectBackItem", undefined);
    __decorate([E(cc.Prefab)], H.prototype, "payoutEffectFrontItem", undefined);
    return __decorate([M], H);
  }(k.default);
  exports.default = F;
  cc._RF.pop();
}