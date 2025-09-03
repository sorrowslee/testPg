if (!cc._RF.push(module, "6906bRTBGpEebu4wJuj8OyW", "GeneralSlotController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DEFAULT_NORMAL_STOP_SCROLL_INTERVAL = exports.DEFAULT_NORMAL_START_SCROLL_INTERVAL = exports.DEFAULT_FAST_STOP_DELAY = exports.DEFAULT_TURBO_STOP_DELAY = exports.DEFAULT_TURBO_START_SCROLLER_CONFIG = exports.DEFAULT_TURBO_SPEED_FACTOR = exports.DEFAULT_STOP_SCROLLER_CONFIG = exports.DEFAULT_START_SCROLLER_CONFIG = exports.DEFAULT_SCROLL_SPEED = undefined;
  var D = require("SlotHelper");
  var k = require("SlotGenerator");
  var C = require("Utils");
  var j = require("SlotStateMachine");
  var G = require("SpinConfigHandler");
  var V = cc._decorator;
  var Q = V.ccclass;
  var N = V.property;
  var Y = C.getSharedScheduler();
  var W = {
    accelerateDuration: 0.1,
    accelerateFactor: 1.68,
    accelerateDistance: -300,
    bounceDistance: 60,
    bounceDuration: 0.1,
    bounceFactor: 1
  };
  var q = {
    endSpeed: -3550,
    bounceDistance: 15,
    bounceDuration: 0.15,
    bounceFactor: 1.7
  };
  var S = {
    accelerateDuration: 0.24,
    accelerateFactor: 2.5,
    accelerateDistance: -1000,
    bounceDistance: 60,
    bounceDuration: 0.1,
    bounceFactor: 1
  };
  exports.DEFAULT_SCROLL_SPEED = -5000;
  exports.DEFAULT_START_SCROLLER_CONFIG = Object.freeze(W);
  exports.DEFAULT_STOP_SCROLLER_CONFIG = Object.freeze(q);
  exports.DEFAULT_TURBO_SPEED_FACTOR = 1.67;
  exports.DEFAULT_TURBO_START_SCROLLER_CONFIG = Object.freeze(S);
  exports.DEFAULT_TURBO_STOP_DELAY = 0.3;
  exports.DEFAULT_FAST_STOP_DELAY = 0.7;
  exports.DEFAULT_NORMAL_START_SCROLL_INTERVAL = 0.1;
  exports.DEFAULT_NORMAL_STOP_SCROLL_INTERVAL = 0.2;
  var z = function (f) {
    function A() {
      var M = f !== null && f.apply(this, arguments) || this;
      M.slotContainer = undefined;
      M.stateMachine = new j.default();
      M.startScrollingTime = 0;
      M.isTurboMode = false;
      M.isTurboNormalSpin = false;
      M.columnCount = 0;
      M.rowCount = 0;
      M._shakeDisposer = C.emptyFunc;
      return M;
    }
    __extends(A, f);
    Object.defineProperty(A.prototype, "isFastStop", {
      get: function () {
        return this.stateMachine.getStopStyle() === j.StopStyle.FAST;
      },
      enumerable: false,
      configurable: true
    });
    A.prototype.isNormalTransition = function (M) {
      return M === 1;
    };
    A.prototype.readySymbolShake = function () {
      var M = this;
      this._shakeDisposer = C.delayCallback(0.5)(function () {
        M._shakeDisposer = C.emptyFunc;
        M.startSymbolShake();
      });
    };
    A.prototype.startSymbolShake = function () {};
    A.prototype.stopSymbolShake = function () {
      this._shakeDisposer();
    };
    A.prototype.setOnClickCallback = function (M) {
      this._onClickCallback = M;
    };
    A.prototype.setStopCompletedCallback = function (M) {
      this._onSpinStopCallback = M;
    };
    A.prototype.setClickEffectController = function (M) {
      this._clickEffectController = M;
    };
    A.prototype.setSlotItemsVisible = function (M, E) {
      var F;
      (F = this.slotHelper).setItemsVisible.apply(F, __spread([M], E));
    };
    A.prototype.setupSlotHelper = function () {
      var E = this.slotHelper = new D.default();
      var F = this.slotContainer;
      var b = this.columnCount;
      var H = this.rowCount;
      var w = this.dataSource.transactionModel;
      var U = w.stateTransitionTo;
      var B = w.originalReels;
      var P = k.generateSlot({
        containerNode: F,
        numberOfColumn: b,
        maskMargin: {
          up: 0,
          down: 0,
          left: 0,
          right: 0
        }
      });
      E.init({
        spinType: U,
        numberOfColumn: b,
        numberOfRow: H,
        sortBottomItemToFront: true,
        reelData: B,
        symbolSize: cc.size(F.width / b, F.height / H),
        normalSymbolScale: 1,
        blurSymbolScale: 0.5,
        slotViews: P.slotViews,
        slotScrollerController: P.slotScrollerController,
        normalSymbolSpriteFrame: [new cc.SpriteFrame()],
        blurSymbolSpriteFrame: [new cc.SpriteFrame()],
        getSymbolZOrder: this.getSymbolZOrder.bind(this),
        getRandomSymbol: this.getRandomSymbol.bind(this),
        runScroller: this.runScroller.bind(this),
        getSymbolSize: function () {
          return cc.size(1, 1);
        }
      });
      E.setOnReelStopCallback(this.reelStop.bind(this));
      E.setOnSlotStopCallback(this.spinStop.bind(this));
    };
    A.prototype.onInit = function () {};
    A.prototype.init = function (M) {
      this.dataSource = M.dataSource;
      this.columnCount = M.columnCount;
      this.rowCount = M.rowCount;
      this.setupSlotHelper();
      this.onInit({
        reelArea: this.node
      });
    };
    A.prototype.spin = function (M = false) {
      var E = this.dataSource.transactionModel.stateTransitionTo;
      var F = G.featureConfig.minimumSpinningTime;
      var b = G.featureConfig.regularSpinningTime;
      var H = G.featureConfig.minimumTurboSpinningTime;
      var w = G.featureConfig.regularTurboSpinningTime;
      var U = this.isNormalTransition(E) && M;
      this.isTurboMode = M;
      this.isTurboNormalSpin = U;
      if (U) {
        this.stateMachine.spin(H, w);
        this.markFastStop();
      } else {
        this.stateMachine.spin(F, b);
      }
      this.startScroll();
      this.enableTouchEvent();
    };
    A.prototype.stopSpin = function () {
      if (this.getStopStyle() === j.StopStyle.NORMAL) {
        this.stateMachine.stop(this.stopScroll.bind(this));
      }
    };
    A.prototype.getStopStyle = function () {
      return this.stateMachine.getStopStyle();
    };
    A.prototype.startScroll = function () {
      var M = this.dataSource.transactionModel.stateTransitionTo;
      var E = this.slotHelper;
      var F = exports.DEFAULT_SCROLL_SPEED;
      var b = exports.DEFAULT_START_SCROLLER_CONFIG;
      var H = exports.DEFAULT_STOP_SCROLLER_CONFIG;
      if (this.isTurboMode) {
        F *= exports.DEFAULT_TURBO_SPEED_FACTOR;
        b = exports.DEFAULT_TURBO_START_SCROLLER_CONFIG;
      }
      var w = {
        maxSpeed: F
      };
      var U = {
        maxSpeed: F
      };
      for (var B = 0; B < this.columnCount; B++) {
        E.setStartScrollerConfig(B, __assign(w, b));
        E.setStopScrollerConfig(B, __assign(U, H));
      }
      E.setSpinType(M);
      E.startScroll();
      this.startScrollingTime = Date.now();
    };
    A.prototype.stopScroll = function () {
      this.slotHelper.stopScroll();
    };
    A.prototype.instantStopScroll = function () {
      var M = this;
      var E = this.slotHelper;
      function F() {
        E.instantStopScroll();
        M.reloadData();
      }
      if (E.getSlotState() === D.SlotState.START) {
        var b = (Date.now() - this.startScrollingTime) / 1000;
        var H = exports.DEFAULT_FAST_STOP_DELAY - b;
        if (this.isTurboNormalSpin) {
          H = exports.DEFAULT_TURBO_STOP_DELAY - b;
        }
        if (H > 0) {
          C.delayCallback(H)(F);
        } else {
          F();
        }
      } else if (E.getSlotState() === D.SlotState.STOP) {
        F();
      }
    };
    A.prototype.markFastStop = function () {
      this.stateMachine.markFastStop();
    };
    A.prototype.unmarkFastStop = function () {
      this.stateMachine.unmarkFastStop();
    };
    A.prototype.fastStop = function () {
      this.stateMachine.fastStop(this.instantStopScroll.bind(this));
    };
    A.prototype.getSlotItems = function (M) {
      var E;
      if (M) {
        if (typeof M == "number") {
          M = [M];
        }
      } else {
        M = [];
      }
      return (E = this.slotHelper.slotItemHandler).getSlotItems.apply(E, __spread(M));
    };
    A.prototype.getSlotItem = function (M) {
      return this.getSlotItems(M)[0];
    };
    A.prototype.createSlotItem = function (M, E = false) {
      return this.slotHelper.slotItemPool.getSlotItem(M, E);
    };
    A.prototype.releaseSlotItem = function (M) {
      return this.slotHelper.slotItemPool.releaseSlotItem(M);
    };
    A.prototype.setReelData = function (M) {
      this.dataSource = M;
      var E = this.dataSource.transactionModel;
      this.slotHelper.setReelData(E.originalReels);
    };
    A.prototype.reloadData = function () {
      this.slotHelper.reloadSlot();
    };
    A.prototype.runScroller = function (M, E) {
      if (M === D.SlotState.START) {
        return this.onStartScroller(E);
      } else if (M === D.SlotState.STOP) {
        return this.onStopScroller(E);
      } else {
        return C.emptyFunc;
      }
    };
    A.prototype.onStartScroller = function (M) {
      if (this.isTurboNormalSpin) {
        for (var E = 0; E < this.columnCount; E++) {
          M(E);
        }
        return C.emptyFunc;
      }
      return this.scheduleIterator(function (F, b) {
        M(F);
        b();
      }, exports.DEFAULT_NORMAL_START_SCROLL_INTERVAL, this.columnCount);
    };
    A.prototype.onStopScroller = function (M) {
      if (this.isFastStop) {
        this.instantStopScroll();
        return C.emptyFunc;
      }
      var E = this.columnCount;
      return this.scheduleIterator(function (F, b) {
        M(F);
        b();
      }, exports.DEFAULT_NORMAL_STOP_SCROLL_INTERVAL, E);
    };
    A.prototype.onReelStop = function () {};
    A.prototype.onReelStopped = function () {};
    A.prototype.onSpinStopped = function () {};
    A.prototype.reelStop = function (M) {
      var E = this;
      this.onReelStop(M);
      C.deferCallback(this, true)(function () {
        E.onReelStopped(M);
      });
    };
    A.prototype.spinStop = function () {
      this.disableTouchEvent();
      this.stateMachine.stopped();
      var M = this._onSpinStopCallback;
      this._onSpinStopCallback = undefined;
      if (M) {
        M();
      }
      this.onSpinStopped();
    };
    A.prototype.getRandomSymbol = function () {
      return 1;
    };
    A.prototype.getSymbolZOrder = function () {
      return 1;
    };
    A.prototype.onSlotRegionClicked = function (M) {
      if (this._onClickCallback) {
        this.disableTouchEvent();
        if (M) {
          this._clickEffectController.showClickEffect(M.getLocation());
          this._clickEffectController.showFlash();
        }
        var E = this._onClickCallback;
        this._onClickCallback = undefined;
        if (E) {
          E();
        }
      }
    };
    A.prototype.enableTouchEvent = function () {
      this.slotContainer.on(cc.Node.EventType.TOUCH_START, this.onSlotRegionClicked.bind(this));
    };
    A.prototype.disableTouchEvent = function () {
      this.slotContainer.off(cc.Node.EventType.TOUCH_START, this.onSlotRegionClicked.bind(this));
    };
    A.prototype.scheduleIterator = function (M, E, F, b) {
      var H = 0;
      var w = 0;
      function U() {
        if (++w === F && b) {
          b();
        }
      }
      function B() {
        M(H, U);
        H++;
      }
      B();
      if (F >= 2) {
        Y.schedule(B, E, F - 2, undefined);
      }
      return function () {
        if (F >= 2) {
          Y.unschedule(B);
        }
        b = undefined;
      };
    };
    __decorate([N(cc.Node)], A.prototype, "slotContainer", undefined);
    return __decorate([Q], A);
  }(cc.Component);
  exports.default = z;
  cc._RF.pop();
}