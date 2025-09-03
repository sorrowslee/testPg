if (!cc._RF.push(module, "f967cJUpgBPeZxa4E081RBj", "SlotHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SlotState = undefined;
  var x;
  var L = require("SlotItem");
  var D = require("SlotItemPool");
  var k = require("SlotItemHandler");
  var C = require("SlotDataHandler");
  var j = require("BaseScroller");
  var G = require("DefaultStartScroller");
  var V = require("DefaultStopScroller");
  (function (W) {
    W[W.IDLE = 0] = "IDLE";
    W[W.START = 1] = "START";
    W[W.STOP = 2] = "STOP";
  })(x = exports.SlotState ||= {});
  var Q = {
    spinType: undefined,
    reelData: undefined,
    symbolSize: undefined,
    numberOfColumn: undefined,
    numberOfRow: undefined,
    normalSymbolSpriteFrame: undefined,
    blurSymbolSpriteFrame: undefined,
    slotViews: undefined,
    slotScrollerController: undefined,
    getSymbolSize: undefined,
    getRandomSymbol: undefined,
    runScroller: undefined,
    topBufferRow: 1,
    bottomBufferRow: 1,
    normalSymbolScale: 1,
    blurSymbolScale: 1,
    blurSpeedFactor: 0.9,
    unblurSpeedFactor: 0.9,
    slotItem: L.default,
    startScroller: G.default,
    stopScroller: V.default
  };
  var N = Q;
  var Y = function () {
    // 建構函式，初始化轉輪相關元件
    function W() {
      this._numberOfColumn = undefined;
      this._numberOfRow = undefined;
      this._isSlotViewBlur = undefined;
      this._blurSpeedFactor = undefined;
      this._unblurSpeedFactor = undefined;
      this._bottomExtraScrollRow = undefined;
      this._topExtraScrollRow = undefined;
      this._slotViews = undefined;
      this._scrollerController = undefined;
      this._startScrollers = undefined;
      this._stopScrollers = undefined;
      this._slotDataHandler = undefined;
      this._slotItemPool = undefined;
      this._slotItemHandler = undefined;
      this._onReelStopCallback = undefined;
      this._onSlotStopCallback = undefined;
    }
    var q = {
      // 取得資料處理器
      get: function () {
        return this._slotDataHandler;
      },
      enumerable: false,
      configurable: true
    };
    Object.defineProperty(W.prototype, "slotDataHandler", q);
    Object.defineProperty(W.prototype, "slotItemPool", {
      // 取得符號物件池
      get: function () {
        return this._slotItemPool;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "slotItemHandler", {
      // 取得符號處理器
      get: function () {
        return this._slotItemHandler;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "slotViews", {
      // 取得轉輪視圖陣列
      get: function () {
        return this._slotViews;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "isSlotViewBlur", {
      // 判斷各轉輪是否為模糊狀態
      get: function () {
        return this._isSlotViewBlur;
      },
      enumerable: false,
      configurable: true
    });
    // 初始化 SlotHelper
    W.prototype.init = function (z) {
      N.getScroller = this.getScroller.bind(this);
      N.willChangeSlotState = this.willChangeSlotState.bind(this);
      N.onSlotStateEnd = this.onScrollerEnd.bind(this);
      N.slotViewGetItem = this.slotViewGetItem.bind(this);
      N.slotViewReleaseItem = this.slotViewReleaseItem.bind(this);
      N.onScrollerAccelerate = this.onScrollerAccelerate.bind(this);
      N.onScrollerDecelerate = this.onScrollerDecelerate.bind(this);
      N.onScrollerStop = this.onScrollerStop.bind(this);
      var A = (z = __assign(__assign({}, N), z)).symbolSize;
      var M = this._numberOfColumn = z.numberOfColumn;
      var E = this._numberOfRow = z.numberOfRow;
      var F = this._slotViews = z.slotViews;
      var H = this._scrollerController = z.slotScrollerController;
      var w = !!z.getSymbolSize;
      this._blurSpeedFactor = z.blurSpeedFactor;
      this._unblurSpeedFactor = z.unblurSpeedFactor;
      var U = z.topBufferRow;
      var B = z.bottomBufferRow;
      this._bottomExtraScrollRow = U * (w ? 2 : 1) + this._numberOfRow;
      this._topExtraScrollRow = B * (w ? 2 : 1) + 1;
      var P = this._isSlotViewBlur = [];
      for (var X = 0; X < E; X++) {
        P[X] = false;
      }
      (this._slotItemPool = z.slotItemPool ? z.slotItemPool : new D.default()).init({
        slotItem: z.slotItem,
        normalSpriteFrame: z.normalSymbolSpriteFrame,
        blurSpriteFrame: z.blurSymbolSpriteFrame,
        normalScale: z.normalSymbolScale,
        blurScale: z.blurSymbolScale,
        getSymbolZOrder: z.getSymbolZOrder
      });
      (this._slotItemHandler = z.slotItemHandler ? z.slotItemHandler : new k.default()).init(E);
      (this._slotDataHandler = z.slotDataHandler ? z.slotDataHandler : new C.default()).init({
        slotViews: F,
        reelData: z.reelData,
        largeSymbolDatas: z.largeSymbolDatas,
        spinType: z.spinType,
        numberOfColumn: M,
        numberOfRow: E,
        topBufferRow: U,
        bottomBufferRow: B,
        getSymbolSize: z.getSymbolSize,
        getRandomSymbol: z.getRandomSymbol
      });
      var J = this._startScrollers = [];
      var Z0 = this._stopScrollers = [];
      var Z1 = this.scrollerGetStopDistance.bind(this);
      var Z2 = this.scrollerScroll.bind(this);
      for (X = 0; X < F.length; X++) {
        var Z3 = {
          functionalRow: E,
          symbolSize: A,
          getItem: z.slotViewGetItem,
          releaseItem: z.slotViewReleaseItem,
          sortBottomItemToFront: z.sortBottomItemToFront
        };
        var Z4 = {
          scrollCallback: Z2
        };
        F[X].init(Z3);
        (J[X] = new z.startScroller(__assign(Z4, z.startScrollerConfig))).on(j.SCROLLER_EVENT.ACCELERATE, z.onScrollerAccelerate);
        var Z5 = {
          scrollCallback: Z2,
          getStopDistance: Z1
        };
        var Z6 = Z0[X] = new z.stopScroller(__assign(Z5, z.stopScrollerConfig));
        Z6.on(j.SCROLLER_EVENT.DECELERATE, z.onScrollerDecelerate);
        Z6.on(j.SCROLLER_EVENT.END, z.onScrollerStop);
      }
      var Z7 = {
        getScroller: z.getScroller,
        releaseScroller: z.releaseScroller,
        runScroller: z.runScroller,
        willChangeSlotState: z.willChangeSlotState,
        didChangeSlotState: z.didChangeSlotState,
        onSlotStateEnd: z.onSlotStateEnd
      };
      this._setAllSlotItems();
      H.init(F, Z7);
      H.setSlotState(x.IDLE);
    };
    // 更換指定位置的符號
    W.prototype.changeSymbol = function (S, z) {
      var f = this._slotItemHandler.getSlotItems(S)[0];
      this._slotItemPool.updateSlotItemSymbolIndex(f, z);
    };
    // 設定轉軸停止的回呼
    W.prototype.setOnReelStopCallback = function (S) {
      this._onReelStopCallback = S;
    };
    // 設定所有轉軸停止時的回呼
    W.prototype.setOnSlotStopCallback = function (S) {
      this._onSlotStopCallback = S;
    };
    // 設定旋轉類型
    W.prototype.setSpinType = function (S) {
      this._slotDataHandler.setSpinType(S);
    };
    // 設定轉輪資料
    W.prototype.setReelData = function (S, z) {
      this._slotDataHandler.setReelData(S, z);
    };
    // 更新轉輪資料
    W.prototype.updateReelData = function (S, z) {
      this._slotDataHandler.updateReelData(S, z);
    };
    // 取得指定轉軸停止位置
    W.prototype.getReelStopPosition = function (S) {
      return this._slotDataHandler.getReelDataPosition(S);
    };
    // 取得格式化後的轉輪資料
    W.prototype.getFormattedData = function (S) {
      return this._slotDataHandler.getFormattedData(S);
    };
    // 覆寫指定位置的格式化資料
    W.prototype.overwriteFormattedData = function (S, z, f) {
      this._slotDataHandler.overwriteFormattedData(S, z, f);
    };
    // 重新載入所有轉輪項目
    W.prototype.reloadSlot = function () {
      var S = this._slotDataHandler;
      var z = this._slotViews;
      for (var f = 0, A = this._slotViews.length; f < A; f++) {
        S.setReelDataPosition(f, 0);
        z[f].reloadItems();
      }
      this._setAllSlotItems();
    };
    // 設定可視的功能行數
    W.prototype.setFunctionalRow = function (S) {
      this._slotViews.forEach(function (z) {
        return z.setFunctionalRow(S);
      });
    };
    // 設定轉輪錨點位置
    W.prototype.setSlotAnchor = function (S) {
      this._slotViews.forEach(function (z) {
        return z.setSlotAnchor(S);
      });
    };
    // 設定多個符號的顯示狀態
    W.prototype.setItemsVisible = function (S) {
      var z;
      var f = [];
      for (var A = 1; A < arguments.length; A++) {
        f[A - 1] = arguments[A];
      }
      (z = this._slotItemHandler).getSlotItems.apply(z, __spread(f)).forEach(function (M) {
        return M.visible = S;
      });
    };
    // 設定某列符號的模糊狀態
    W.prototype.setItemsBlur = function (S, z) {
      var f = this._slotViews[z];
      this._isSlotViewBlur[z] = S;
      var A = f.getVisibleItems();
      for (var M = 0, E = A.length; M < E; M++) {
        A[M].setBlur(S);
      }
    };
    // 取得多個符號的顯示狀態
    W.prototype.getItemsVisible = function () {
      var S;
      var z = [];
      for (var f = 0; f < arguments.length; f++) {
        z[f] = arguments[f];
      }
      var A = [];
      (S = this._slotItemHandler).getSlotItems.apply(S, __spread(z)).forEach(function (M) {
        return A.push(M.visible);
      });
      return A;
    };
    // 取得多個符號的世界座標
    W.prototype.getItemsWorldPositionAR = function () {
      var S;
      var z = [];
      for (var f = 0; f < arguments.length; f++) {
        z[f] = arguments[f];
      }
      var A = cc.v2();
      var M = [];
      (S = this._slotItemHandler).getSlotItems.apply(S, __spread(z)).forEach(function (E) {
        return M.push(E.node.convertToWorldSpaceAR(A));
      });
      return M;
    };
    // 取得指定索引的捲動器
    W.prototype.scrollerAtIndex = function (S) {
      return this._scrollerController.scrollerAtIndex(S);
    };
    // 取得捲動器的索引
    W.prototype.indexOfScroller = function (S) {
      return this._scrollerController.indexOfScroller(S);
    };
    // 取得目前轉輪狀態
    W.prototype.getSlotState = function () {
      return this._scrollerController.getSlotState();
    };
    // 開始轉輪捲動
    W.prototype.startScroll = function () {
      var S = this._scrollerController;
      if (S.getSlotState() === x.IDLE) {
        this._slotDataHandler.reset();
        S.setSlotState(x.START);
      }
    };
    // 停止轉輪捲動
    W.prototype.stopScroll = function () {
      var S = this._scrollerController;
      if (S.getSlotState() === x.START) {
        S.setSlotState(x.STOP);
      }
    };
    // 立即停止轉輪
    W.prototype.instantStopScroll = function () {
      var S = this._scrollerController;
      if (S.getSlotState() !== x.IDLE) {
        S.setSlotState(x.STOP);
        S.endCurrentState();
      }
    };
    // 設定指定捲動器的開始參數
    W.prototype.setStartScrollerConfig = function (S, z) {
      this._startScrollers[S].setConfig(z);
    };
    // 設定指定捲動器的停止參數
    W.prototype.setStopScrollerConfig = function (S, z) {
      this._stopScrollers[S].setConfig(z);
    };
    // 更新開始捲動器的運行時設定
    W.prototype.updateStartScrollerRunTimeConfig = function (S, z) {
      this._startScrollers[S].updateRunTimeConfig(z);
    };
    // 更新停止捲動器的運行時設定
    W.prototype.updateStopScrollerRunTimeConfig = function (S, z) {
      this._stopScrollers[S].updateRunTimeConfig(z);
    };
    // 設定所有轉輪上的符號物件
    W.prototype._setAllSlotItems = function () {
      var S = this._slotItemHandler;
      S.reset();
      this._slotViews.forEach(function (z, f) {
        z.getFunctionalItems().forEach(function (A) {
          if (A.symbolIndex !== -1) {
            S.setSlotItem(f, A);
          }
        });
      });
    };
    // 由 SlotView 取得符號物件
    W.prototype.slotViewGetItem = function (S, z) {
      var f = this._slotDataHandler.getItemInfo(S, z);
      var A = this._slotViews.indexOf(S);
      var M = this._slotItemPool.getSlotItem(f.symbolIndex, this._isSlotViewBlur[A]);
      M.positionIndex = f.positionIndex;
      M.symbolColumn = f.symbolColumn;
      M.symbolRow = f.symbolRow;
      return M;
    };
    // 釋放符號物件回物件池
    W.prototype.slotViewReleaseItem = function (S, z) {
      this._slotItemPool.releaseSlotItem(z);
    };
    // 捲動器滾動時調整對應 SlotView 位置
    W.prototype.scrollerScroll = function (S, z) {
      var f = this._scrollerController.indexOfScroller(S);
      this._slotViews[f].changePositionY(z);
    };
    // 計算捲動器到停止位置的距離
    W.prototype.scrollerGetStopDistance = function (S) {
      var z;
      var f = this._scrollerController.indexOfScroller(S);
      var A = this._slotViews[f];
      z = S.getRunTimeConfig().maxSpeed > 0 ? A.getNextBottomIndex(this._bottomExtraScrollRow) : A.getNextTopIndex(this._topExtraScrollRow);
      this._slotDataHandler.setReelDataPosition(f, z);
      return A.getDistanceToIndex(z);
    };
    // 捲動器加速時的處理
    W.prototype.onScrollerAccelerate = function (S) {
      var z = S.speedFactor;
      var f = this._isSlotViewBlur;
      var A = this._scrollerController.indexOfScroller(S.scroller);
      if (z > this._blurSpeedFactor && !f[A]) {
        this.setItemsBlur(true, A);
      }
    };
    // 捲動器減速時的處理
    W.prototype.onScrollerDecelerate = function (S) {
      var z = S.speedFactor;
      var f = this._isSlotViewBlur;
      var A = this._scrollerController.indexOfScroller(S.scroller);
      if (z < this._unblurSpeedFactor && f[A]) {
        this.setItemsBlur(false, A);
      }
    };
    // 單一轉軸停止時的處理
    W.prototype.onScrollerStop = function (S) {
      var z = this._scrollerController.indexOfScroller(S.scroller);
      var f = this._slotViews[z];
      var A = this._slotItemHandler;
      f.resetPositionIndex();
      f.getFunctionalItems().forEach(function (E) {
        if (E.symbolIndex !== -1) {
          A.setSlotItem(z, E);
        }
      });
      var M = this._onReelStopCallback;
      if (M) {
        M(z);
      }
    };
    // 根據狀態取得對應的捲動器
    W.prototype.getScroller = function (S, z, f) {
      if (f === x.START) {
        return this._startScrollers[S];
      } else if (f === x.STOP) {
        return this._stopScrollers[S];
      } else {
        return undefined;
      }
    };
    // 轉輪狀態變更前的處理
    W.prototype.willChangeSlotState = function (S, z) {
      if (S === x.IDLE && z === x.STOP) {
        this._scrollerController.endCurrentState();
      }
    };
    // 捲動器狀態結束時的處理
    W.prototype.onScrollerEnd = function (S) {
      if (S === x.STOP) {
        this._scrollerController.setSlotState(x.IDLE);
        var z = this._onSlotStopCallback;
        if (z) {
          z();
        }
      }
    };
    return W;
  }();
  exports.default = Y;
  cc._RF.pop();
}