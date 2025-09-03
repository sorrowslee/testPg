if (!cc._RF.push(module, "43fa7kpruFLXK4fYDhrIgSc", "WinThresholdsModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WinThresholdsModel = undefined;
  var T = require("Utils");
  var x = function () {
    // 建構函式，儲存各種獎項門檻
    function L(D) {
      if (D) {
        this._rawData = JSON.parse(JSON.stringify(D));
        this._mediumWin = D.mw;
        this._bigWin = D.bw;
        this._megaWin = D.mgw;
        this._superMegaWin = D.smgw;
      }
    }
    // 依下注與倍數計算各獎項門檻
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
      // 回傳原始門檻資料
      get: function () {
        return this._rawData;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "mediumWin", {
      // 取得中獎倍率門檻
      get: function () {
        return this._mediumWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "bigWin", {
      // 取得大獎倍率門檻
      get: function () {
        return this._bigWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "megaWin", {
      // 取得超級大獎倍率門檻
      get: function () {
        return this._megaWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(L.prototype, "superMegaWin", {
      // 取得超級超級大獎倍率門檻
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