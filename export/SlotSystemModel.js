if (!cc._RF.push(module, "b8e48q3OlREgpqZ/fqigt7Z", "SlotSystemModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SystemModel");
  var x = require("WinThresholdsModel");
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    // 更新遊戲設定與投注資訊
    k.prototype.updateGameInfo = function (C) {
      var u = C.cs;
      var c = C.ml;
      var p = C.mxl;
      var j = C.fbbm;
      var l = C.wt;
      this._betSizeList = u || [];
      this._betLevelList = c || [];
      this._maxLineNumber = p;
      this._featureBuyBetMultiplier = j;
      this._winThresholds = l ? new x.WinThresholdsModel(l) : undefined;
    };
    Object.defineProperty(k.prototype, "betLevelList", {
      get: function () {
        return this._betLevelList;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(k.prototype, "betSizeList", {
      get: function () {
        return this._betSizeList;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(k.prototype, "maxLineNumber", {
      get: function () {
        return this._maxLineNumber;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(k.prototype, "featureBuyBetMultiplier", {
      get: function () {
        return this._featureBuyBetMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(k.prototype, "winThresholds", {
      get: function () {
        return this._winThresholds;
      },
      enumerable: false,
      configurable: true
    });
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}