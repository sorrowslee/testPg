if (!cc._RF.push(module, "8057dBhRYNMxL+23kANKBOd", "WBSSlotController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = require("Utils");
  var L = require("NodePoolHandler");
  var D = require("SlotStateMachine");
  var k = require("GameConstant");
  var C = require("SlotHandler");
  var j = require("WBSDataSource");
  var G = require("WBSSlotItemController");
  var V = require("WBSGameUtils");
  var Q = require("AutomationDecorator");
  var N = require("SlotController.spec");
  var Y = require("InfoBoardController");
  var W = require("AudioManager");
  var q = require("AudioConstant");
  var z = require("SpinConfigHandler");
  var A = cc._decorator;
  var M = A.ccclass;
  var E = A.property;
  var F = function (b) {
    function H() {
      var U = b !== null && b.apply(this, arguments) || this;
      U.slotItemPrefab = undefined;
      U._stateMachine = new D.default();
      U._shakingInProgress = false;
      U._isFastSpinInProgress = false;
      U._disposeCameraZoom = undefined;
      return U;
    }
    var w;
    __extends(H, b);
    w = H;
    H.getSlotItemByIndex = function (U) {
      return w.slotHandler.getSlotItemByIndices([U])[0];
    };
    H.prototype.setOnClickCallback = function (U) {
      this._onClickCallback = U;
    };
    H.prototype.setStopCompletedCallback = function (U) {
      this._didStopSpinCompleteCallback = U;
    };
    H.prototype.setOnEachStopColumnCallback = function (U) {
      this._onEachStopColumnCallback = U;
    };
    H.prototype.setScatterEffectStartCallback = function (U) {
      this._scatterEffectStartCallback = U;
    };
    H.prototype.setScatterEffectStopCallback = function (U) {
      this._scatterEffectStopCallback = U;
    };
    H.prototype.setupControllers = function (U) {
      this._infoboardController = U.infoboardController;
      this._clickEffectController = U.clickEffectController;
      this._slotTintController = U.slotTintController;
      this._multiplierController = U.multiplierController;
      this._fastSpinController = U.fastSpinController;
      this._featureBuyButtonController = U.featureBuyButtonController;
      this._slowDropEffectController = U.slowDropEffectController;
      this._foregroundController = U.foregroundController;
    };
    H.prototype._initSlotItemCustom = function () {
      var U = [];
      L.nodePoolHandler.registerReusableItem(k.NodePoolName.SlotItemCustom, this.slotItemPrefab, "WBSSlotItemController", 30);
      for (var B = 0; B < 24; B++) {
        (P = L.nodePoolHandler.dequeueReusableItem(k.NodePoolName.SlotItemCustom)).getComponent(G.default).enableEvent(false);
        U.push(P);
      }
      for (B = 0; B < U.length; B++) {
        var P = U[B];
        L.nodePoolHandler.enqueueReusableItem(P, k.NodePoolName.SlotItemCustom);
      }
    };
    H.prototype.init = function (U) {
      this._initNodes({
        reelArea: this.node
      });
      var B = U.reels;
      L.nodePoolHandler.registerReusableItem(k.NodePoolName.SlotItem, this.slotItemPrefab, "WBSSlotItemController", 30);
      this._initSlotItemCustom();
      w.slotHandler.setOnBeforeReloadCallback(this._onBeforeReload.bind(this));
      w.slotHandler.setOnAfterReloadCallback(this._onAfterReload.bind(this));
      w.slotHandler.setOnReelStopCallback(this._onReelStopCallback.bind(this));
      w.slotHandler.setOnSpinStopCallback(this._onSpinStopCallback.bind(this));
      w.slotHandler.setOnScatterEffectStartCallback(this._onScatterEffectStartCallback.bind(this));
      w.slotHandler.setOnScatterEffectStopCallback(this._onScatterEffectStopCallback.bind(this));
      w.slotHandler.init({
        reels: B,
        containerNode: this.node
      });
    };
    H.prototype.spin = function (U, B) {
      this.removeOverlaySlotItems();
      this._stateMachine.spin(0.3, z.featureConfig.regularSpinningTime);
      var P = U;
      if (P) {
        this.markFastStop();
      } else {
        w.slotHandler.setFastStop(false);
      }
      w.slotHandler.spin(B, P);
      W.playAudio(q.GENERAL_AUDIO.spinActiveLoop.key, true);
      this._enableTouchEvent();
      this.exitSlotItemSpine();
    };
    H.prototype.gameIntroCameraZoomIn = function (U, B) {
      var P = this;
      if (U === undefined) {
        U = false;
      }
      var X = this._disposeCameraZoom;
      if (X) {
        X();
      }
      this._disposeCameraZoom = undefined;
      this._foregroundController.playGameIntroBullet();
      if (U) {
        cc.Camera.cameras[0].zoomRatio = 1;
        if (B) {
          B();
        }
      } else {
        cc.Camera.cameras[0].zoomRatio = 0.81;
        x.delayCallback(0.2)(function () {
          P._disposeCameraZoom = V.lerpTo(function (J, Z0) {
            var Z1 = Z0 * Z0 * Z0 * Z0;
            var Z2 = cc.misc.lerp(0.81, 1, Z1);
            cc.Camera.cameras[0].zoomRatio = Z2;
            if (Z0 === 1) {
              P._disposeCameraZoom = undefined;
              if (B) {
                B();
              }
            }
          }, 0.81, 1, 1);
        });
        x.delayCallback(1)(function () {
          P._multiplierController.playGameIntroZoomIn(false, function () {
            P._multiplierController.playGameIntroShinningEffect();
          });
          P._featureBuyButtonController.zoomIn(U);
        });
      }
    };
    H.prototype.cameraZoomIn = function (U, B) {
      var P = this;
      if (U === undefined) {
        U = false;
      }
      var X = this._disposeCameraZoom;
      if (X) {
        X();
      }
      this._disposeCameraZoom = undefined;
      this._multiplierController.zoomIn(U);
      this._featureBuyButtonController.zoomIn(U);
      if (U) {
        cc.Camera.cameras[0].zoomRatio = 1;
        if (B) {
          B();
        }
      } else {
        cc.Camera.cameras[0].zoomRatio = 0.87;
        this._disposeCameraZoom = V.lerpTo(function (J, Z0) {
          var Z1 = Z0 * (2 - Z0);
          var Z2 = cc.misc.lerp(0.87, 1, Z1);
          cc.Camera.cameras[0].zoomRatio = Z2;
          if (Z0 === 1) {
            P._disposeCameraZoom = undefined;
            if (B) {
              B();
            }
          }
        }, 0.87, 1, 1);
      }
    };
    H.prototype.cameraZoomOut = function (U, B) {
      var P = this;
      if (U === undefined) {
        U = false;
      }
      var X = this._disposeCameraZoom;
      if (X) {
        X();
      }
      this._disposeCameraZoom = undefined;
      this._multiplierController.zoomOut(U);
      this._featureBuyButtonController.zoomOut(U);
      if (U) {
        cc.Camera.cameras[0].zoomRatio = 0.87;
        if (B) {
          B();
        }
      } else {
        cc.Camera.cameras[0].zoomRatio = 1;
        this._disposeCameraZoom = V.lerpTo(function (J, Z0) {
          var Z1 = Z0 * (2 - Z0);
          var Z2 = cc.misc.lerp(1, 0.87, Z1);
          cc.Camera.cameras[0].zoomRatio = Z2;
          if (Z0 === 1) {
            P._disposeCameraZoom = undefined;
            if (B) {
              B();
            }
          }
        }, 1, 0.87, 4);
      }
    };
    H.prototype.playShiftOldSlotEffect = function (U) {
      this.removeOverlaySlotItems();
      w.slotHandler.playShiftOldSlotEffect(U);
    };
    H.prototype.playShiftNewSlotEffect = function (U) {
      var B = this;
      var P = j.wbsDataSource.transactionModel;
      var X = P.stateTransitionTo;
      var J = P.reelNextSymbol;
      var Z0 = P.nextGoldSymbols;
      var Z1 = P.previousScatterCount;
      var Z2 = V.getPositionRemoveColumnList(J);
      if (this.isHeartBeat()) {
        x.sequenceCallback(x.delayCallback(0.8), function (Z3) {
          B._playScatterHeartbeatEffect();
          B._infoboardController.showScatterRequestTip();
          B.addOverlayScatter();
          B.enableDarkReel([]);
          B._playSlowDrop(Z2);
          Z3();
        }, x.delayCallback(2))(function () {
          B.removeOverlaySlotItems();
          B.disableDarkMode();
        });
      } else if (Z1 > k.FAST_SCROLL_MIN_REQUIRE_SCATTER) {
        this._infoboardController.showFreeSpinWonTip();
      }
      w.slotHandler.playShiftNewSlotEffect(J, Z0, function () {
        if (B.isHeartBeat()) {
          B._stopSlowDrop();
        }
      }, function () {
        B.addOverlayScatterAndWild();
        switch (X) {
          case k.TransitionState.RESPIN:
          case k.TransitionState.FREE_SPIN_RESPIN:
            if (U) {
              U();
            }
            break;
          case k.TransitionState.NORMAL:
          case k.TransitionState.FREE_SPIN:
          default:
            x.delayCallback(0.3)(function () {
              if (U) {
                U();
              }
            });
        }
      });
    };
    H.prototype._playSlowDrop = function (U) {
      this._slowDropEffectController.show(U);
    };
    H.prototype._stopSlowDrop = function () {
      this._slowDropEffectController.hide();
    };
    H.prototype.stopSpin = function () {
      if (this.getStopStyle() === D.StopStyle.NORMAL) {
        this._stateMachine.stop(w.slotHandler.stopSpin.bind(w.slotHandler));
      }
    };
    H.prototype.getStopStyle = function () {
      return this._stateMachine.getStopStyle();
    };
    H.prototype.fastStop = function () {
      this._showTips(true);
      this._fastSpinController.reset();
      this._playScatterFastSpinExitEffect(true);
      w.slotHandler.setFastStop();
      this._stateMachine.fastStop(w.slotHandler.instantStopScroll.bind(w.slotHandler));
    };
    H.prototype.markFastStop = function () {
      w.slotHandler.setFastStop();
      this._stateMachine.markFastStop();
    };
    H.prototype.unmarkFastStop = function () {
      w.slotHandler.setFastStop(false);
      this._stateMachine.unmarkFastStop();
    };
    H.prototype.setReelData = function (U) {
      w.slotHandler.setReelData(U);
    };
    H.prototype.reloadData = function (U) {
      w.slotHandler.reloadData(U);
    };
    H.prototype._onBeforeReload = function () {
      this.removeOverlaySlotItems();
    };
    H.prototype._onAfterReload = function () {
      this._playSymbolIdleEffect(true);
      this.addOverlayScatterAndWild();
    };
    H.prototype.getSlotHandler = function () {
      return w.slotHandler;
    };
    H.prototype._onReelStopCallback = function (U) {
      var B = this;
      var P = this.getSlotItems(k.SLOT_ITEM_MAP[U]);
      function X(Z2) {
        if (U === k.NUMBER_OF_COLUMN - 1) {
          B._disableFastSpin();
        } else {
          B._enableFastSpin(U);
        }
        Z2();
      }
      function J(Z2) {
        P.forEach(function (Z3) {
          if (Z3.symbolIndex === k.SlotSymbols.Scatter) {
            W.stopAudio(q.GENERAL_AUDIO.symScatter.key);
            W.playAudio(q.GENERAL_AUDIO.symScatter.key);
            B._slotTintController.addOverlaySlotItem(Z3);
          }
        });
        Z2();
      }
      function Z0(Z2) {
        B._playSymbolSpawnEffect(P, Z2);
      }
      function Z1(Z2) {
        var Z3 = j.wbsDataSource.transactionModel.scatterCount;
        var Z4 = 1;
        var Z5 = 0;
        if (Z3 === k.FAST_SCROLL_MIN_REQUIRE_SCATTER + 1) {
          var Z6 = [];
          var Z7 = 0;
          for (var Z8 = 0; Z8 <= U; Z8++) {
            Z6 = Z6.concat(k.SLOT_ITEM_MAP[Z8]);
          }
          var Z9 = B.getSlotItems(Z6);
          Z9.forEach(function (ZZ) {
            if (ZZ.symbolIndex === k.SlotSymbols.Scatter) {
              Z7 += 1;
            }
          });
          if (Z7 === k.FAST_SCROLL_MIN_REQUIRE_SCATTER + 1) {
            Z9.forEach(function (ZZ) {
              if (ZZ.symbolIndex === k.SlotSymbols.Scatter) {
                Z4++;
              }
            });
          }
        }
        if (Z4 === ++Z5 && Z2) {
          Z2();
        }
      }
      x.deferCallback(this, true)(function () {
        x.spawnCallback(X, J, Z0, Z1)(x.emptyFunc);
      });
      if (this._onEachStopColumnCallback) {
        this._onEachStopColumnCallback(U);
      }
    };
    H.prototype._onSpinStopCallback = function () {
      this.addOverlayScatterAndWild();
      this._stateMachine.stopped();
      W.stopAudio(q.GENERAL_AUDIO.spinActiveLoop.key);
      var U = this._didStopSpinCompleteCallback;
      this._didStopSpinCompleteCallback = undefined;
      if (U) {
        U();
      }
    };
    H.prototype._onScatterEffectStartCallback = function (U) {
      x.deferCallback(this, true)(this._playScatterFastSpinStartEffect.bind(this, U));
      if (this._scatterEffectStartCallback) {
        this._scatterEffectStartCallback(U);
      }
    };
    H.prototype._onScatterEffectStopCallback = function (U, B) {
      if (U === k.NUMBER_OF_COLUMN - 1) {
        this._playScatterFastSpinExitEffect();
      }
      if (this._scatterEffectStopCallback) {
        this._scatterEffectStopCallback(U, B);
      } else if (B) {
        B();
      }
    };
    H.prototype._enableTouchEvent = function () {
      this.node.on(cc.Node.EventType.TOUCH_START, this.onSlotRegionClicked, this);
    };
    H.prototype._disableTouchEvent = function () {
      this.node.off(cc.Node.EventType.TOUCH_START, this.onSlotRegionClicked, this);
    };
    H.prototype.onSlotRegionClicked = function (U) {
      if (this._onClickCallback) {
        this._disableTouchEvent();
        if (U) {
          this._clickEffectController.showClickEffect(U.getLocation());
          this._clickEffectController.showFlash();
        }
        var B = this._onClickCallback;
        this._onClickCallback = undefined;
        if (B) {
          B();
        }
      }
    };
    H.prototype.getSlotItems = function (U) {
      return w.slotHandler.getSlotItemByIndices(U);
    };
    H.prototype.setSlotItemsVisible = function (U, B) {
      var P;
      if (B.length !== 0) {
        (P = w.slotHandler).setSlotItemsVisible.apply(P, __spread([U], B));
      }
    };
    H.prototype.getAllSlotItemPosition = function () {
      return w.slotHandler.getSlotItemsWorldPosition();
    };
    H.prototype.enableDarkReel = function (U = [], B = true) {
      this._slotTintController.enableDarkReel(U, B);
    };
    H.prototype.disableDarkMode = function (U = true) {
      this._slotTintController.disableDarkMode(U);
    };
    H.prototype.addOverlayScatter = function () {
      this.removeOverlaySlotItems();
      for (var U = this.getSlotItems(), B = 0; B < U.length; B++) {
        var P = U[B];
        if (P.symbolIndex === k.SlotSymbols.Scatter) {
          this._slotTintController.addOverlaySlotItem(P);
        }
      }
    };
    H.prototype.addOverlayScatterAndWild = function () {
      this.removeOverlaySlotItems();
      for (var U = this.getSlotItems(), B = 0; B < U.length; B++) {
        var P = U[B];
        var X = P.symbolIndex;
        if (X === k.SlotSymbols.Scatter || X === k.SlotSymbols.Wild) {
          this._slotTintController.addOverlaySlotItem(P);
        }
      }
    };
    H.prototype.removeOverlaySlotItems = function () {
      this._slotTintController.removeOverlaySlotItem();
    };
    H.prototype.playSlotItemsShakeEffect = function () {
      var U = this;
      this._shakeItemDisposer = x.delayCallback(0.5)(function () {
        U._shakeItemDisposer = undefined;
        U._shakingInProgress = true;
        U.getSlotItems().forEach(function (B) {
          B.playSymbolShake();
        });
      });
    };
    H.prototype.stopSlotItemsShakeEffect = function (U) {
      var B = this;
      if (this._shakeItemDisposer) {
        var P = this._shakeItemDisposer;
        this._shakeItemDisposer = undefined;
        this._shakingInProgress = false;
        if (P) {
          P();
        }
        if (U) {
          U();
        }
      } else if (this._shakingInProgress) {
        var X = this.getSlotItems();
        X.forEach(function (J, Z0) {
          J.stopSymbolShake();
          if (Z0 === X.length - 1) {
            B._shakingInProgress = false;
            if (U) {
              U();
            }
          }
        });
      } else if (U) {
        U();
      }
    };
    H.prototype.exitSlotItemSpine = function () {
      this.getSlotItems().forEach(function (U) {
        U.playSpineExit();
      });
    };
    H.prototype.isSlowDrop = function () {
      return w.slotHandler.isSlowDrop();
    };
    H.prototype.isHeartBeat = function () {
      return w.slotHandler.isHeartBeat();
    };
    H.prototype.removeSymbols = function (U) {
      var B = j.wbsDataSource.transactionModel;
      var P = B.winPositionList;
      var X = B.winningGoldSymbol;
      for (var J = V.differentArray(P, X), Z0 = 0; Z0 < J.length; Z0++) {
        var Z1 = J[Z0];
        this.setSlotItemsVisible(false, __spread(Z1));
      }
      if (U) {
        U();
      }
    };
    H.prototype.isFastStop = function () {
      return w.slotHandler.getFastStop();
    };
    H.prototype._enableFastSpin = function (U) {
      var B = U + 1 > k.NUMBER_OF_COLUMN - 1 ? undefined : U + 1;
      var P = this.isFastStop();
      if (!this.isFastStop()) {
        if (B && w.slotHandler.isFastSpinScroller(B)) {
          this.enableDarkReel([B]);
          this._fastSpinController.play(B);
          if (!this._isFastSpinInProgress) {
            this._isFastSpinInProgress = true;
            this.cameraZoomOut(P);
          }
        }
      }
    };
    H.prototype._disableFastSpin = function () {
      if (w.slotHandler.isFastSpinScroller(k.NUMBER_OF_COLUMN - 1)) {
        var U = j.wbsDataSource.transactionModel;
        var B = U.stateTransitionFrom;
        var P = U.scatterCount;
        if (B !== k.TransitionState.FREE_SPIN || !(P > k.FAST_SCROLL_MIN_REQUIRE_SCATTER)) {
          this.disableDarkMode(false);
        }
        this._fastSpinController.stop();
        var X = this.isFastStop();
        if (this._isFastSpinInProgress) {
          this._isFastSpinInProgress = false;
          W.playAudio(q.GENERAL_AUDIO.fastspinExit.key);
          this.cameraZoomIn(X);
        }
      }
    };
    H.prototype._playSymbolSpawnEffect = function (U = [], B) {
      var P = U.length;
      var X = 0;
      function J() {
        if (++X === P && B) {
          B();
        }
      }
      if (P) {
        for (var Z0 = 0; Z0 < P; Z0++) {
          U[Z0].playSpineSpawn(J);
        }
      } else if (B) {
        B();
      }
    };
    H.prototype._playSymbolIdleEffect = function (U = false) {
      var B = this.getSlotItems();
      var P = B.length;
      if (P) {
        for (var X = 0; X < P; X++) {
          var J = B[X];
          J.playSpineIdle(U);
          J.playScatterIdle(U);
        }
      }
    };
    H.prototype._playScatterHeartbeatEffect = function () {
      W.playAudio(q.GENERAL_AUDIO.heartBeatNoise.key);
      var U = this.getSlotItems();
      var B = U.length;
      if (B) {
        for (var P = 0; P < B; P++) {
          U[P].playScatterHeartBeat();
        }
      }
    };
    H.prototype.playScatterWinEffect = function () {
      W.playAudio(q.GENERAL_AUDIO.scatterWinHighlight.key);
      this.getSlotItems().forEach(function (U) {
        if (U.symbolIndex === k.SlotSymbols.Scatter) {
          U.playSpineWin(function () {
            U.playScatterWinIdleSpine();
          });
        }
      });
      this._infoboardController.showFreeSpinWonTip();
    };
    H.prototype._showTips = function (U = false) {
      var B = this._infoboardController;
      var P = j.wbsDataSource.transactionModel.stateTransitionFrom;
      if (P === k.TransitionState.NORMAL || P === k.TransitionState.RESPIN) {
        B.showTips(Y.InfoboardUIState.NORMAL_TIPS, U);
      } else {
        B.showTips(Y.InfoboardUIState.FREE_SPIN_TIPS);
      }
    };
    H.prototype._playScatterFastSpinStartEffect = function (U, B) {
      var P = [];
      for (var X = 0; X < U; X++) {
        P = P.concat(k.SLOT_ITEM_MAP[X]);
      }
      var J = 0;
      this.getSlotItems(P).forEach(function (Z0) {
        if (Z0.symbolIndex === k.SlotSymbols.Scatter) {
          J++;
          if (!Z0.isFastSpinSpine) {
            Z0.playScatterFastSpinStart(function () {
              Z0.playScatterFastSpinIdle();
              if (B) {
                B();
              }
            });
          }
        }
      });
      if (J === k.FAST_SCROLL_MIN_REQUIRE_SCATTER) {
        this._infoboardController.showScatterRequestTip();
      } else if (J > k.FAST_SCROLL_MIN_REQUIRE_SCATTER) {
        this._infoboardController.showFreeSpinWonTip();
      } else {
        this._showTips(true);
      }
    };
    H.prototype._playScatterFastSpinExitEffect = function (U = false, B) {
      if (!j.wbsDataSource.transactionModel.winLines) {
        this._showTips(true);
      }
      this.getSlotItems().forEach(function (P) {
        if (P.symbolIndex === k.SlotSymbols.Scatter && P.isFastSpinSpine) {
          P.playScatterFastSpinExit(U, B);
        }
      });
    };
    H.prototype._initNodes = function () {};
    H.slotHandler = new C.default();
    __decorate([E(cc.Prefab)], H.prototype, "slotItemPrefab", undefined);
    __decorate([Q.automationDec({
      func: N.symbolDrop
    })], H.prototype, "playShiftNewSlotEffect", null);
    __decorate([Q.automationDec({
      func: N.symbolShake
    })], H.prototype, "playSlotItemsShakeEffect", null);
    __decorate([Q.automationDec({
      func: N.initSlotControllerNode
    })], H.prototype, "_initNodes", null);
    return w = __decorate([M], H);
  }(cc.Component);
  exports.default = F;
  cc._RF.pop();
}