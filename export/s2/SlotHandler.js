if (!cc._RF.push(module, "1cd993EvjFMRYt4APU9sav3", "SlotHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var G = {
    accelerateDuration: 0.1,
    accelerateFactor: 1.68,
    accelerateDistance: -300,
    bounceDistance: 60,
    bounceDuration: 0.1,
    bounceFactor: 1
  };
  var V = {
    accelerateDuration: 0.24,
    accelerateFactor: 2.5,
    accelerateDistance: -1000,
    bounceDistance: 60,
    bounceDuration: 0.1,
    bounceFactor: 1
  };
  var Q = {
    endSpeed: -3550,
    bounceDistance: 15,
    bounceDuration: 0.05,
    bounceFactor: 1.7
  };
  var N = {
    endSpeed: -500,
    bounceDistance: -30,
    bounceDuration: 0.2,
    bounceFactor: 2
  };
  var Y = require("Utils");
  var W = require("SlotGenerator");
  var q = require("SlotHelper");
  var z = require("WBSSlotHelper");
  var M = require("WBSSlotItemController");
  var E = require("WBSSlotView");
  var F = require("WBSSlotItemPool");
  var H = require("WBSGameUtils");
  var w = require("GameConstant");
  var U = require("BonuceBackStopScroller");
  var P = require("WBSSlotItemHandler");
  var X = require("WBSSlotDataHandler");
  var J = require("SettingMenuHelper");
  var Z0 = require("WBSDataSource");
  var Z1 = require("ShiftSlotHandler");
  var Z2 = require("SlotImageHandler");
  var Z3 = require("AudioManager");
  var Z4 = require("AudioConstant");
  var Z5 = Object.freeze(G);
  var Z6 = Object.freeze(V);
  var Z7 = Object.freeze(Q);
  var Z8 = Object.freeze(N);
  var Z9 = function () {
    function ZZ() {
      this._shiftSlotHandler = undefined;
      this._slotHelper = undefined;
      this._onBeforeReloadCallback = undefined;
      this._onAfterReloadCallback = undefined;
      this._onSpinStopCallback = undefined;
      this._onReelStartCallback = undefined;
      this._onReelStopCallback = undefined;
      this._onScatterEffectStartCallback = undefined;
      this._onScatterEffectStopCallback = undefined;
      this._runFastSpinEffect = undefined;
      this._startScrollingTime = undefined;
      this._isFastStop = false;
      this._isTurboSpin = false;
      this._canFastStop = true;
      this._isFastSpinStarted = false;
      this._fastSpinReelIndex = undefined;
      this._randomScatterAppearCount = 0;
      this._reels = [];
      this._fastSpinDisposer = [];
    }
    Object.defineProperty(ZZ.prototype, "slotHelper", {
      get: function () {
        return this._slotHelper;
      },
      enumerable: false,
      configurable: true
    });
    ZZ.prototype.setOnSpinStopCallback = function (ZI) {
      this._onSpinStopCallback = ZI;
    };
    ZZ.prototype.setOnReelStartCallback = function (ZI) {
      this._onReelStartCallback = ZI;
    };
    ZZ.prototype.setOnReelStopCallback = function (ZI) {
      this._onReelStopCallback = ZI;
    };
    ZZ.prototype.setOnScatterEffectStartCallback = function (ZI) {
      this._onScatterEffectStartCallback = ZI;
    };
    ZZ.prototype.setOnScatterEffectStopCallback = function (ZI) {
      this._onScatterEffectStopCallback = ZI;
    };
    ZZ.prototype.setOnBeforeReloadCallback = function (ZI) {
      this._onBeforeReloadCallback = ZI;
    };
    ZZ.prototype.setOnAfterReloadCallback = function (ZI) {
      this._onAfterReloadCallback = ZI;
    };
    ZZ.prototype.init = function (ZI) {
      var Zd = {
        maxSpeed: -5000
      };
      var ZO = {
        maxSpeed: -5000
      };
      var ZR = ZI.containerNode;
      var ZK = W.generateSlot({
        slotView: E.default,
        containerNode: ZR,
        numberOfColumn: w.NUMBER_OF_COLUMN,
        dontGenerateMask: true
      });
      var Zg = Z0.wbsDataSource.transactionModel.goldSymbolBefore;
      var ZT = cc.size(ZR.width / w.NUMBER_OF_COLUMN, ZR.height / w.NUMBER_OF_ROW);
      var Zx = __assign(__assign({}, Z5), Zd);
      var ZL = __assign(__assign({}, Z7), ZO);
      var ZD = this._slotHelper = new z.default();
      ZD.init({
        numberOfColumn: w.NUMBER_OF_COLUMN,
        numberOfRow: w.NUMBER_OF_ROW,
        topBufferRow: 1,
        bottomBufferRow: 1,
        slotItem: M.default,
        slotItemHandler: new P.default(),
        slotDataHandler: new X.default(),
        slotItemPool: new F.default(),
        spinType: ZI.spinType,
        sortBottomItemToFront: true,
        startScrollerConfig: Zx,
        stopScrollerConfig: ZL,
        reelData: H.getProcessedReelSymbols(ZI.reels, Zg),
        symbolSize: ZT,
        normalSymbolScale: 1,
        blurSymbolScale: 2,
        slotViews: ZK.slotViews,
        slotScrollerController: ZK.slotScrollerController,
        normalSymbolSpriteFrame: Z2.slotImageHandler.symbolImages,
        blurSymbolSpriteFrame: Z2.slotImageHandler.blurredSymbolImages,
        getRandomSymbol: this._getRandomSymbol.bind(this),
        runScroller: this._runScroller.bind(this),
        getSymbolZOrder: this._getSymbolZOrder.bind(this),
        stopScroller: U.default
      });
      ZD.setOnReelStopCallback(this._onReelStopped.bind(this));
      ZD.setOnSlotStopCallback(this._onSpinStopped.bind(this));
      this._shiftSlotHandler = new Z1.default(this);
      this._shiftSlotHandler.init({
        isHorizontal: false,
        slotItemHolder: ZK.slotScrollerController.node,
        slotViews: ZK.slotViews,
        slotItemPool: ZD.slotItemPool,
        numberOfRow: w.NUMBER_OF_ROW,
        symbolSize: ZT,
        symbolSpawnSpacing: ZT.height,
        columnDropInterval: 0.1,
        slowDropDelay: 0.5,
        columnSlowDropInterval: 0.5,
        acceleration: 10000,
        accelerationFactor: 2.5,
        bounceDistance: 30,
        bounceDistanceFactor: 0,
        bounceDuraion: 0.15,
        bounceFactor: 1.7
      });
    };
    ZZ.prototype._onReelStopped = function (ZI) {
      var Zd = this;
      if (this._onReelStopCallback) {
        this._onReelStopCallback(ZI);
      }
      if (!this._isFastStop && this.isFastSpin()) {
        var ZO = ZI;
        function ZR(ZK) {
          var Zg = ZK + 1;
          if (Zg < w.NUMBER_OF_COLUMN && Zd.isFastSpinScroller(Zg)) {
            if (Zd._runFastSpinEffect) {
              Zd._runFastSpinEffect(Zg);
            }
            Zd._isFastSpinStarted = true;
            Zd._fastSpinReelIndex = Zg;
          }
        }
        if (this.isFastSpinScroller(ZO)) {
          if (this._onScatterEffectStopCallback) {
            this._onScatterEffectStopCallback(ZO, function () {
              ZR(ZO);
            });
          }
        } else {
          ZR(ZO);
        }
      }
    };
    ZZ.prototype._onSpinStopped = function () {
      if (this._onSpinStopCallback) {
        this._onSpinStopCallback();
      }
      this._isFastSpinStarted = false;
      this._fastSpinReelIndex = undefined;
      if (this._fastSpinDisposer.length) {
        this._fastSpinDisposer.forEach(function (ZI) {
          if (ZI) {
            ZI();
          }
        });
        this._fastSpinDisposer = [];
      }
    };
    ZZ.prototype.isHeartBeat = function () {
      return Z0.wbsDataSource.transactionModel.previousScatterCount === w.FAST_SCROLL_MIN_REQUIRE_SCATTER;
    };
    ZZ.prototype.isSlowDrop = function () {
      return Z0.wbsDataSource.transactionModel.previousScatterCount >= w.FAST_SCROLL_MIN_REQUIRE_SCATTER;
    };
    ZZ.prototype.playShiftOldSlotEffect = function (ZI) {
      var Zd = Z0.wbsDataSource.transactionModel.positionToBeRemove;
      this._shiftSlotHandler.playDropOldItemsEffect(Zd, ZI);
    };
    ZZ.prototype.playShiftNewSlotEffect = function (ZI, Zd, ZO, ZR) {
      var ZK = this._generateRespinReels(ZI, Zd);
      var Zg = this.isSlowDrop();
      var ZT = this.isHeartBeat();
      var Zx = {
        newData: ZK,
        isSlowDrop: Zg,
        isHeartBeat: ZT,
        slowDropFadeOutCallback: ZO,
        callback: ZR
      };
      this._shiftSlotHandler.reset();
      this._shiftSlotHandler.playDropNewItemsEffect(Zx);
    };
    ZZ.prototype.reloadData = function (ZI) {
      if (this._onBeforeReloadCallback) {
        this._onBeforeReloadCallback();
      }
      this._setReelData(ZI);
      this._slotHelper.reloadSlot();
      this._shiftSlotHandler.releaseAllSlotItem();
      if (this._onAfterReloadCallback) {
        this._onAfterReloadCallback();
      }
    };
    ZZ.prototype.spin = function (ZI, Zd = false) {
      this._startScrollingTime = Date.now();
      this._canFastStop = true;
      this._isTurboSpin = Zd;
      var ZO = -5000;
      var ZR = Z5;
      if (Zd) {
        ZO *= 1.67;
        ZR = Z6;
      }
      var ZK = {
        maxSpeed: ZO
      };
      var Zg = {
        maxSpeed: ZO
      };
      for (var ZT = 0; ZT < w.NUMBER_OF_COLUMN; ZT++) {
        this._slotHelper.setStartScrollerConfig(ZT, __assign(ZK, ZR));
        this._slotHelper.setStopScrollerConfig(ZT, Zg);
      }
      this._slotHelper.setSpinType(ZI);
      this._slotHelper.startScroll();
    };
    ZZ.prototype.stopSpin = function () {
      this._slotHelper.stopScroll();
    };
    ZZ.prototype.instantStopScroll = function () {
      var ZI = this;
      if (this._canFastStop) {
        this._canFastStop = false;
        var Zd = this._slotHelper;
        function ZO() {
          Z3.stopAudio(Z4.GENERAL_AUDIO.spinStopQuick.key);
          Z3.playAudio(Z4.GENERAL_AUDIO.spinStopQuick.key);
          Zd.instantStopScroll();
          ZI.reloadData(Z0.wbsDataSource.transactionModel);
        }
        if (Zd.getSlotState() === q.SlotState.START) {
          var ZR = (Date.now() - this._startScrollingTime) / 1000;
          var ZK = 0;
          ZK = (ZK = this._isTurboSpin ? 0 - ZR : 0.7 - ZR) > 0 ? ZK : 0;
          Y.delayCallback(ZK)(ZO);
        } else {
          ZO();
        }
      }
    };
    ZZ.prototype.setReelData = function (ZI) {
      this._setReelData(ZI);
    };
    ZZ.prototype.setFastStop = function (ZI = true) {
      this._isFastStop = ZI;
    };
    ZZ.prototype.getFastStop = function () {
      return this._isFastStop;
    };
    ZZ.prototype.changeSymbol = function (ZI, Zd) {
      this._slotHelper.changeSymbol(ZI, Zd);
    };
    ZZ.prototype.getSlotItemsWorldPosition = function () {
      var ZI;
      var Zd = [];
      for (var ZO = 0; ZO < arguments.length; ZO++) {
        Zd[ZO] = arguments[ZO];
      }
      return (ZI = this._slotHelper).getItemsWorldPositionAR.apply(ZI, __spread(Zd));
    };
    ZZ.prototype.getFormattedData = function (ZI) {
      return this._slotHelper.getFormattedData(ZI);
    };
    ZZ.prototype.setSlotItemsVisible = function (ZI) {
      var Zd;
      var ZO = [];
      for (var ZR = 1; ZR < arguments.length; ZR++) {
        ZO[ZR - 1] = arguments[ZR];
      }
      return (Zd = this._slotHelper).setItemsVisible.apply(Zd, __spread([ZI], ZO));
    };
    ZZ.prototype.getSlotItemByIndices = function (ZI) {
      var Zd;
      ZI ||= [];
      return (Zd = this._slotHelper.slotItemHandler).getSlotItems.apply(Zd, __spread(ZI));
    };
    ZZ.prototype.isFastSpin = function () {
      return this._reels.filter(function (ZI) {
        return ZI === w.SlotSymbols.Scatter;
      }).length >= 2;
    };
    ZZ.prototype.isFastSpinScroller = function (ZI) {
      var Zd = this._reels;
      var ZO = 0;
      for (var ZR = 0, ZK = 0; ZK !== ZI;) {
        ZR += w.NUMBER_OF_ROW_LIST[ZK];
        ZK++;
      }
      if (ZR) {
        for (var Zg = 0; Zg < ZR; Zg++) {
          if (Zd[Zg] === w.SlotSymbols.Scatter) {
            ZO++;
          }
        }
      }
      return ZO >= w.FAST_SCROLL_MIN_REQUIRE_SCATTER;
    };
    ZZ.prototype.isFastSpinStarted = function () {
      return this._isFastSpinStarted;
    };
    ZZ.prototype.getFastSpinReelIndex = function () {
      return this._fastSpinReelIndex;
    };
    ZZ.prototype._getRandomSymbol = function (ZI) {
      var Zd = Y.randomInt(1, 9);
      this._randomScatterAppearCount++;
      if (Zd === w.SlotSymbols.Scatter) {
        if (this._randomScatterAppearCount <= 5) {
          Zd = Y.randomInt(2, 9);
        } else {
          this._randomScatterAppearCount = 0;
        }
      } else if (ZI === 2 || ZI === 3) {
        if (Math.random() < 0.1) {
          Zd += w.BLOCK_TYPE.GOLD;
        }
      }
      return Zd;
    };
    ZZ.prototype._getSymbolZOrder = function () {
      return 1;
    };
    ZZ.prototype._runScroller = function (ZI, Zd) {
      if (ZI === q.SlotState.START) {
        return this._runStartScroller(Zd);
      } else if (ZI === q.SlotState.STOP) {
        return this._runStopScroller(Zd);
      } else {
        return undefined;
      }
    };
    ZZ.prototype._runStartScroller = function (ZI) {
      var Zd = this._onReelStartCallback;
      if (this._isTurboSpin) {
        for (var ZO = 0; ZO < w.NUMBER_OF_COLUMN; ZO++) {
          ZI(ZO);
          if (Zd) {
            Zd(ZO);
          }
        }
        return function () {};
      }
      var ZR = 0;
      var ZK = H.scheduleIterator(function (Zg, ZT) {
        ZI(Zg);
        if (Zd) {
          Zd(Zg);
        }
        ZR++;
        ZT();
      }, 0.1, w.NUMBER_OF_COLUMN);
      return function () {
        ZK();
        for (var Zg = ZR; Zg < w.NUMBER_OF_COLUMN; Zg++) {
          if (Zd) {
            Zd(Zg);
          }
        }
      };
    };
    ZZ.prototype._runStopScroller = function (ZI) {
      var Zd = this;
      if (this._isFastStop) {
        this._runFastSpinEffect = undefined;
        if (this._canFastStop) {
          this.instantStopScroll();
        }
        return Y.emptyFunc;
      }
      this._runFastSpinEffect = function (ZK) {
        var Zg = Zd._slotHelper.scrollerAtIndex(ZK);
        if (Zg && Zg.changeIdleSpeed && Zg.updateRunTimeConfig) {
          Zg.changeIdleSpeed(1.5, -1000);
          Zg.updateRunTimeConfig(Z8);
          if (Zd._onScatterEffectStartCallback) {
            Zd._onScatterEffectStartCallback(ZK);
          }
          var ZT = Y.delayCallback(1.5)(function () {
            ZI(ZK);
          });
          Zd._fastSpinDisposer.push(ZT);
        }
      };
      var ZO = w.NUMBER_OF_COLUMN;
      if (this.isFastSpin()) {
        for (var ZR = 0; ZR < w.NUMBER_OF_COLUMN; ZR++) {
          if (ZR >= 2 && this.isFastSpinScroller(ZR)) {
            ZO = ZR;
            break;
          }
        }
      }
      return H.scheduleIterator(function (ZK, Zg) {
        ZI(ZK);
        Zg();
      }, 0.2, ZO);
    };
    ZZ.prototype.isTurboMode = function () {
      return J.settingMenuHelper.turboSpinOn && !this.isFreeSpin();
    };
    ZZ.prototype.isFreeSpin = function () {
      var ZI = Z0.wbsDataSource.transactionModel.stateTransitionFrom;
      var Zd = ZI === w.TransitionState.FREE_SPIN;
      var ZO = ZI === w.TransitionState.FREE_SPIN_RESPIN;
      return Zd || ZO;
    };
    ZZ.prototype._generateRespinReels = function (ZI, Zd) {
      var ZO = [[], [], [], [], [], []];
      for (var ZR = 0; ZR < ZI.length; ZR++) {
        var ZK = ZI[ZR];
        for (var Zg = 0; Zg < ZI.length; Zg++) {
          switch (Zd[ZR][Zg]) {
            case 0:
              ZO[ZR].push(ZK[Zg] + w.BLOCK_TYPE.NORMAL);
              break;
            case 1:
              ZO[ZR].push(ZK[Zg] + w.BLOCK_TYPE.GOLD);
          }
        }
      }
      return ZO;
    };
    ZZ.prototype._setReelData = function (ZI) {
      var Zd = ZI.originalReels;
      var ZO = ZI.goldSymbolBefore;
      this._reels = Zd;
      var ZR = H.getProcessedReelSymbols(Zd, ZO);
      this._slotHelper.setReelData(ZR);
    };
    return ZZ;
  }();
  exports.default = Z9;
  cc._RF.pop();
}