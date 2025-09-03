if (!cc._RF.push(module, "0ce45lWhypN46eCVKRkmiLJ", "FeatureBuyHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generateFeatureBuyModel = exports.cleanUpFeatureBuyHelper = exports.initFeatureBuyHelper = exports.FeatureBuyModel = undefined;
  var T;
  var x = require("BVFramework");
  var L = require("Utils");
  var D = function () {
    function Q(N) {
      var Y = N.is;
      var W = N.bm;
      var q = N.t;
      this._isSupported = Y;
      this._betMultiplier = W;
      this._threshold = q;
    }
    Object.defineProperty(Q.prototype, "isSupported", {
      get: function () {
        return this._isSupported;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Q.prototype, "betMultiplier", {
      get: function () {
        return this._betMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Q.prototype, "threshold", {
      get: function () {
        return this._threshold;
      },
      enumerable: false,
      configurable: true
    });
    return Q;
  }();
  exports.FeatureBuyModel = D;
  var k = 0;
  var C = undefined;
  var j = {
    featureBuyOnlyTitle: shell.I18n.t("FeatureBuy.FeatureBuyOnly"),
    betForFeatureBuyOnly: shell.I18n.t("FeatureBuy.BetForFeatureBuyOnly")
  };
  exports.initFeatureBuyHelper = function (Q, N) {
    if (!T) {
      C = Q;
      if (N && N.customContent) {
        j = __assign(__assign({}, j), N.customContent);
      }
      var Y = x.getGameContext();
      Y.on("Game.FlowStateChanged", G);
      Y.on("Game.RequestPlay", V, undefined, "Low");
    }
  };
  exports.cleanUpFeatureBuyHelper = function () {
    if (!T) {
      var Q = x.getGameContext();
      Q.off("Game.FlowStateChanged", G);
      Q.off("Game.RequestPlay", V);
    }
  };
  exports.generateFeatureBuyModel = function (Q) {
    var N = Q.gcs && Q.gcs.bf ? Q.gcs.bf : Q.fb;
    if (T === undefined) {
      x.getGameContext().emit("Game.RequestSession", undefined, function (W) {
        var q = W.response.operatorJurisdictionConfig.buyFeature === 0;
        T = q || !N;
      });
    }
    if (!T && N) {
      var Y = new D(N);
      k = Y.threshold;
      return Y;
    }
  };
  cc._RF.pop();
}
function G(Q) {
  var N = x.getGameContext();
  var Y = Q.payload;
  if (Y.flowType === "FeatureBuySelection") {
    if (Y.displayState === "Start") {
      N.emit("Game.BlockUI", true);
    } else if (Y.displayState === "End") {
      N.emit("Game.BlockUI", false);
    }
  }
}
function V(Q) {
  if (Q.response && Q.response.error && Q.response.error.code === 1017 && Q.payload.totalBet <= k) {
    var N = shell.I18n;
    var Y = x.getGameContext();
    var W = C.playerModel.minimumBetAmount;
    Y.emit("Alert.Show", {
      title: j.featureBuyOnlyTitle,
      content: "<ul style=\"text-align:left;color:#98989E;padding-inline-start:13px;font-size:11px;list-style-type:'•  '\"><li style=\"margin-bottom:8px\">" + j.betForFeatureBuyOnly + "</li><li>" + N.t("FeatureBuy.BetSuggestion", {
        amount: L.formatCurrency(W)
      }) + "</li></ul>",
      actions: [{
        label: N.t("FeatureBuy.Acknowledge"),
        handler: 1
      }]
    });
  }
}