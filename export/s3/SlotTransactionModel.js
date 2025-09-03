if (!cc._RF.push(module, "d5629sKgMRK16ZrOMxnkzm9", "SlotTransactionModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("WinValuesModel");
  var x = require("WinLinesModel");
  var L = require("BetRepository");
  var D = function (k) {
    function C() {
      return k !== null && k.apply(this, arguments) || this;
    }
    var u = {
      get: function () {
        return this._winLines;
      },
      enumerable: false,
      configurable: true
    };
    var c = {
      get: function () {
        return this._winValues;
      },
      enumerable: false,
      configurable: true
    };
    __extends(C, k);
    Object.defineProperty(C.prototype, "winLines", u);
    Object.defineProperty(C.prototype, "winValues", c);
    Object.defineProperty(C.prototype, "betLevelValue", {
      get: function () {
        return this._betRepository.selectedBetLevelValue;
      },
      set: function (p) {
        this._betRepository.selectedBetLevelValue = p;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(C.prototype, "betSizeValue", {
      get: function () {
        return this._betRepository.selectedBetSizeValue;
      },
      set: function (p) {
        this._betRepository.selectedBetSizeValue = p;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(C.prototype, "reels", {
      get: function () {
        return this._reels;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(C.prototype, "originalReels", {
      get: function () {
        return this._originalReels;
      },
      enumerable: false,
      configurable: true
    });
      // 更新交易資訊並建立贏分、下注資料
      C.prototype.updateTransactionInfo = function (p) {
      var j = p.wp;
      var G = p.lw;
      var V = p.ml;
      var Q = p.cs;
      var N = p.orl;
      var Y = p.rl;
      this._winLines = j ? new x.WinLinesModel(j) : undefined;
      this._winValues = G ? new T.WinValuesModel(G) : undefined;
      this._betRepository ||= new L.BetRepository(V, Q);
      this._betRepository.updateRemoteBets(V, Q);
      this._reels = Y;
      this._originalReels = N;
      this.updateSlotGameTransactionInfo(p);
    };
    return C;
  }(require("TransactionModel").default);
  exports.default = D;
  cc._RF.pop();
}