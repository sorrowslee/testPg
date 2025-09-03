if (!cc._RF.push(module, "08d5bAN5GxAf5RE9cTgDCu5", "ResultState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotStateMachine");
  var x = require("SlotAnalyticsHelper");
  var L = require("SlotAnalyticsEnum");
  var D = require("AutoSpinHandler");
  var k = require("UIState");
  var C = require("Utils");
  var p = require("SpinConfigHandler");
  var j = function (G) {
    function V(Q, N, Y) {
      var W = G.call(this, Q, N, Y) || this;
      W.name = "Result State";
      W.process = L.SpinStateProcess.REEL_SPINNING;
      W.hasFeature = false;
      return W;
    }
    __extends(V, G);
    V.prototype.setSlotController = function (Q) {
      this.slotController = Q;
    };
    V.prototype.setSpinButtonController = function (Q) {
      this.spinButtonController = Q;
    };
    V.prototype.run = function () {
      G.prototype.run.call(this);
      this.enableSpinAction();
      C.sequenceCallback(this.resultDidStartRender.bind(this), this.renderSlotRegion.bind(this), this.defineFeature.bind(this), this.slotDidCompleteStop.bind(this))(this.exit.bind(this));
    };
    V.prototype.exit = function () {
      this.slotController.setOnClickCallback(undefined);
      this.disableSpinAction();
      G.prototype.exit.call(this);
    };
    V.prototype.destroy = function () {
      G.prototype.destroy.call(this);
      this.spinButtonController = undefined;
      this.slotController = undefined;
    };
    V.prototype.onReady = function () {};
    V.prototype.onRun = function () {};
    V.prototype.onForceExit = function (Q) {
      Q();
    };
    V.prototype.onExit = function (Q) {
      Q();
    };
    V.prototype.onDestroy = function (Q) {
      Q();
    };
    V.prototype.resultDidStartRender = function (Q) {
      if (Q) {
        Q();
      }
    };
    V.prototype.slotDidStartStopping = function (Q) {
      if (Q) {
        Q();
      }
    };
    V.prototype.invokeSlotStop = function () {
      var Q = this.slotController;
      if (Q.getStopStyle() === T.StopStyle.FAST) {
        Q.fastStop();
      } else {
        Q.stopSpin();
      }
    };
    V.prototype.triggerFastStop = function (Q) {
      var N = this.slotController;
      var Y = this.spinButtonController;
      if (N.getStopStyle() !== T.StopStyle.FAST) {
        switch (this.process) {
          case L.SpinStateProcess.REEL_SPINNING:
            x.sendFastStopGA(Q, Y.isAutoSpin());
            this.triggerFastStopWhileSpinning();
            break;
          case L.SpinStateProcess.REEL_STOPPING:
            x.sendFastStopGA(Q, Y.isAutoSpin());
            this.triggerFastStopWhileStopping();
            break;
          case L.SpinStateProcess.REEL_STOPPED:
            this.triggerFastStopWhileStopped();
        }
      }
    };
    V.prototype.triggerFastStopWhileSpinning = function () {
      var Q = this.slotController;
      var N = this.spinButtonController;
      this.disableSpinAction();
      N.disableButton();
      Q.setOnClickCallback(undefined);
      Q.markFastStop();
    };
    V.prototype.triggerFastStopWhileStopping = function () {
      var Q = this.slotController;
      var N = this.spinButtonController;
      this.disableSpinAction();
      N.disableButton();
      Q.setOnClickCallback(undefined);
      Q.fastStop();
    };
    V.prototype.triggerFastStopWhileStopped = function () {};
    V.prototype.setupFeatureProperties = function () {
      this.hasFeature = false;
    };
    V.prototype.setSlotData = function () {
      this.slotController.setReelData(this.dataSource.transactionModel.originalReels);
    };
    V.prototype.renderSlotRegion = function (Q) {
      this.setSlotData();
      C.spawnCallback(this.stopSlot.bind(this), this.slotDidStartStopping.bind(this))(Q);
    };
    V.prototype.stopSlot = function (Q) {
      if (this.process === L.SpinStateProcess.REEL_SPINNING) {
        this.process = L.SpinStateProcess.REEL_STOPPING;
        this.slotController.setStopCompletedCallback(Q);
        this.invokeSlotStop();
      } else if (Q) {
        Q();
      }
    };
    V.prototype.defineFeature = function (Q) {
      this.setupFeatureProperties();
      Q();
    };
    V.prototype.slotDidCompleteStop = function (Q) {
      this.process = L.SpinStateProcess.REEL_STOPPED;
      var N = this.spinButtonController;
      if (!N.isAutoSpin()) {
        this.disableSpinAction();
      }
      N.stopSpin();
      if (this.dataSource.transactionModel.winLines || this.hasFeature) {
        N.disableButton();
      }
      this.renderFeature(Q);
    };
    V.prototype.onClickSpinButton = function (Q) {
      var N = this.spinButtonController;
      var Y = this.slotController.getStopStyle() === T.StopStyle.FAST;
      if (N.isAutoSpin()) {
        if (!p.featureConfig.fastStopFeature || !!Y) {
          N.disableButton();
        }
        D.exitAutoSpin(N);
      } else if (!!p.featureConfig.fastStopFeature || !Y) {
        this.triggerFastStop(Q);
      }
    };
    V.prototype.enableSpinAction = function () {
      if (p.featureConfig.fastStopFeature) {
        this.slotController.setOnClickCallback(this.triggerFastStop.bind(this));
      }
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, L.SpinTrigger.CLICK));
    };
    V.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    return V;
  }(k.default);
  exports.default = j;
  cc._RF.pop();
}