if (!cc._RF.push(module, "b8e16tOyU5GT4m5ZQseMAOn", "PrizeState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AutoSpinHandler");
  var x = require("SlotAnalyticsEnum");
  var L = require("UIState");
  var D = require("SlotGameTools");
  var k = require("SettingMenuHelper");
  var C = require("Utils");
  require("TweaksData");
  var u = function (p) {
    function j(G, V, Q) {
      var N = p.call(this, G, V, Q) || this;
      N.name = "Prize State";
      return N;
    }
    __extends(j, p);
    j.prototype.setSlotController = function (G) {
      this.slotController = G;
    };
    j.prototype.setSpinButtonController = function (G) {
      this.spinButtonController = G;
    };
    j.prototype.run = function () {
      p.prototype.run.call(this);
      if (this.spinButtonController.isAutoSpin()) {
        this.enableSpinAction();
      }
      this.renderPrize();
    };
    j.prototype.exit = function () {
      this.disableSpinAction();
      p.prototype.exit.call(this);
    };
    j.prototype.destroy = function () {
      p.prototype.destroy.call(this);
      this.spinButtonController = undefined;
      this.slotController = undefined;
    };
    j.prototype.onReady = function () {};
    j.prototype.onRun = function () {};
    j.prototype.onForceExit = function (G) {
      G();
    };
    j.prototype.onExit = function (G) {
      G();
    };
    j.prototype.onDestroy = function (G) {
      G();
    };
    j.prototype.runBigPrizeState = function (G, V) {
      if (V) {
        V();
      }
    };
    j.prototype.runMediumPrizeState = function (G, V) {
      if (V) {
        V();
      }
    };
    j.prototype.runNoWinPrizeState = function (G) {
      var V = this.dataSource.playerModel.balance;
      k.settingMenuHelper.setBalance(V);
      if (G) {
        G();
      }
    };
    j.prototype.renderPrize = function () {
      C.spawnCallback(this.renderLines.bind(this), this.playPrize.bind(this))(this.exit.bind(this));
    };
    j.prototype.renderLines = function (G) {
      if (this.dataSource.transactionModel.winLines) {
        this.playAllLines(G);
      } else if (G) {
        G();
      }
    };
    j.prototype.playAllLines = function (G) {
      G();
    };
    j.prototype.playPrize = function (G) {
      var V = this;
      var Q = this.getWinThresholds();
      var N = this.dataSource.transactionModel.totalWinAmount;
      if (D.isBigWinThreshold(N, Q)) {
        C.sequenceCallback(D.emitSocialBigWinStart, function (Y) {
          V.runBigPrizeState(N, Y);
        }, D.emitSocialBigWinEnd)(G);
      } else if (D.isMediumWinThreshold(N, Q)) {
        this.runMediumPrizeState(N, G);
      } else if (N > 0) {
        this.runSmallPrizeState(N, G);
      } else {
        this.runNoWinPrizeState(G);
      }
    };
    j.prototype.getWinThresholds = function () {
      return D.getWinThresholds(this.dataSource);
    };
    j.prototype.onClickSpinButton = function () {
      var G = this.spinButtonController;
      T.exitAutoSpin(G);
      G.disableButton();
      this.disableSpinAction();
    };
    j.prototype.enableSpinAction = function () {
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, x.SpinTrigger.CLICK));
    };
    j.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    return j;
  }(L.default);
  exports.default = u;
  cc._RF.pop();
}