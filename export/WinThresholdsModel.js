if (!cc._RF.push(module, "43fa7kpruFLXK4fYDhrIgSc", "WinThresholdsModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WinThresholdsModel = undefined;
  var T = require("Utils");
  var x = function () {
    function L(D) {
      if (D) {
        this._rawData = JSON.parse(JSON.stringify(D));
        this._mediumWin = D.mw;
        this._bigWin = D.bw;
        this._megaWin = D.mgw;
        this._superMegaWin = D.smgw;
      }
    }
    L.prototype.getAllThresholds = function (D, k, C) {
      var u = D * k * C;
      return {
        mediumWinThreshold: T.toDecimalWithExp(u * this._mediumWin, 2),
        bigWinThreshold: T.toDecimalWithExp(u * this._bigWin, 2),
        megaWinThreshold: T.toDecimalWithExp(u * this._megaWin, 2),
        superMegaWinThreshold: T.toDecimalWithExp(u * this._superMegaWin, 2)
      };
    };
    Object.defineProperty(L.prototype, "rawData", {
      get: function () {
        return this._rawData;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "mediumWin", {
      get: function () {
        return this._mediumWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "bigWin", {
      get: function () {
        return this._bigWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "megaWin", {
      get: function () {
        return this._megaWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "superMegaWin", {
      get: function () {
        return this._superMegaWin;
      },
      enumerable: false,
      configurable: true
    });
    return L;
  }();
  exports.WinThresholdsModel = x;
  cc._RF.pop();
}