if (!cc._RF.push(module, "c7edad6KmVKX7bJ07ILRJKN", "RequestApiState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotAnalyticsEnum");
  var x = require("SlotAnalyticsHelper");
  var L = require("SlotStateMachine");
  var D = require("AutoSpinHandler");
  var k = require("UIState");
  var C = require("SettingMenuHelper");
  var p = require("SpinConfigHandler");
  var j = function (G) {
    function V(Q, N, Y) {
      var W = G.call(this, Q, N, Y) || this;
      W.name = "Request Api State";
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
      this.spin();
      this.callApi(this.exit.bind(this));
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
    V.prototype.onExit = function (Q) {
      Q();
    };
    V.prototype.onForceExit = function (Q) {
      Q();
    };
    V.prototype.onDestroy = function (Q) {
      Q();
    };
    V.prototype.startSlotController = function () {
      this.spinButtonController.spin();
      this.slotController.spin(C.settingMenuHelper.turboSpinOn);
    };
    V.prototype.slotFastStopTriggered = function () {};
    V.prototype.callApi = function (Q) {
      Q();
    };
    V.prototype.spin = function () {
      var Q = this.spinButtonController;
      if (Q.isAutoSpin() || p.featureConfig.fastStopFeature && !C.settingMenuHelper.turboSpinOn) {
        this.enableSpinAction();
      } else {
        Q.disableButton();
      }
      this.startSlotController();
    };
    V.prototype.triggerFastStop = function (Q) {
      var N = this.slotController;
      var Y = this.spinButtonController;
      if (N.getStopStyle() !== L.StopStyle.FAST) {
        N.markFastStop();
        N.setOnClickCallback(undefined);
        Y.disableButton();
        this.disableSpinAction();
        x.sendFastStopGA(Q, Y.isAutoSpin());
        this.slotFastStopTriggered();
      }
    };
    V.prototype.onClickSpinButton = function (Q) {
      var N = this.spinButtonController;
      var Y = this.slotController.getStopStyle() === L.StopStyle.FAST;
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
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, T.SpinTrigger.CLICK));
    };
    V.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    return V;
  }(k.default);
  exports.default = j;
  cc._RF.pop();
}