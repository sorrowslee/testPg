if (!cc._RF.push(module, "e3bbdJAS9hF9YTk/ZsIn/Fq", "WBSSlotTransactionModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotTransactionModel");
  var x = require("GameConstant");
  var L = require("WBSFreeSpinModel");
  var D = function (k) {
    function u() {
      var c = k !== null && k.apply(this, arguments) || this;
      c._reelNextSymbol = [[]];
      c._positionToBeRemove = [];
      c._nextGoldSymbol = [[]];
      c._winningGoldSymbol = [];
      c._previousScatterCount = undefined;
      return c;
    }
    var C = {
      get: function () {
        return this._previousScatterCount;
      },
      enumerable: false,
      configurable: true
    };
    __extends(u, k);
    Object.defineProperty(u.prototype, "previousScatterCount", C);
    Object.defineProperty(u.prototype, "freeSpin", {
      get: function () {
        return this._freeSpin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "reelNextSymbol", {
      get: function () {
        return this._reelNextSymbol;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "positionToBeRemove", {
      get: function () {
        return this._positionToBeRemove;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "symbolNumberWinWays", {
      get: function () {
        return this._symbolNumberWinWays;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "gameMultiplier", {
      get: function () {
        return this._gameMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "nextGameMultiplier", {
      get: function () {
        return this._nextGameMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "scatterCount", {
      get: function () {
        return this._scatterCount;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "originalTotalWin", {
      get: function () {
        return this._originalTotalWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "singleSpinAccumulatedWin", {
      get: function () {
        return this._singleSpinAccumulatedWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "winPositionList", {
      get: function () {
        return this._winPositionList;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "goldSymbol", {
      get: function () {
        return this._goldSymbol;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "goldSymbolBefore", {
      get: function () {
        return this._goldSymbolBefore;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "nextGoldSymbols", {
      get: function () {
        return this._nextGoldSymbol;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "winningGoldSymbol", {
      get: function () {
        return this._winningGoldSymbol;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "totalWinBeforeMultiplier", {
      get: function () {
        return this._totalWinBeforeMultiplier;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "featureBuy", {
      get: function () {
        return this._featureBuy;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "isTransactionEnd", {
      get: function () {
        var c = this.stateTransitionTo;
        return c === x.TransitionState.NORMAL || c === x.TransitionState.FREE_SPIN;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(u.prototype, "isMaximumWin", {
      get: function () {
        return this._isMaximumWin;
      },
      enumerable: false,
      configurable: true
    });
    u.prototype.updateSlotGameTransactionInfo = function (j) {
      var G = j.rns;
      var V = j.prbr;
      var Q = j.fs;
      var N = j.twbm;
      var Y = j.snww;
      var W = j.gm;
      var q = j.otw;
      var z = j.ssaw;
      var A = j.sc;
      var M = j.wpl;
      var E = j.gs;
      var F = j.wgs;
      var b = j.gsb;
      var H = j.ngm;
      var w = j.ngs;
      var U = j.fb;
      var B = j.imw;
      this._previousScatterCount = G ? this._scatterCount : A;
      this._freeSpin = Q ? new L.default(Q) : undefined;
      this._totalWinBeforeMultiplier = N;
      this._symbolNumberWinWays = Y;
      this._reelNextSymbol = G;
      this._positionToBeRemove = V;
      this._gameMultiplier = W;
      this._originalTotalWin = q;
      this._scatterCount = A;
      this._singleSpinAccumulatedWin = z;
      this._scatterCount = A;
      this._winPositionList = M;
      this._goldSymbol = E;
      this._goldSymbolBefore = b;
      this._winningGoldSymbol = F || [];
      this._nextGameMultiplier = H;
      this._nextGoldSymbol = w;
      this._featureBuy = U;
      this._isMaximumWin = B;
    };
    return u;
  }(T.default);
  exports.default = D;
  cc._RF.pop();
}