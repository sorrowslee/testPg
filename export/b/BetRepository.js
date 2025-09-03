if (!cc._RF.push(module, "14dfa+lfKlIS5vAzSig9n4q", "BetRepository")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BetRepository = undefined;
  var T = function () {
    function x(L, D) {
      this._betLevelValue = L;
      this._betSizeValue = D;
      this._selectedBetLevelValue = L;
      this._selectedBetSizeValue = D;
    }
    Object.defineProperty(x.prototype, "selectedBetLevelValue", {
      get: function () {
        return this._selectedBetLevelValue;
      },
      set: function (L) {
        this._selectedBetLevelValue = L;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "selectedBetSizeValue", {
      get: function () {
        return this._selectedBetSizeValue;
      },
      set: function (L) {
        this._selectedBetSizeValue = L;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "betLevelValue", {
      get: function () {
        return this._betLevelValue;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "betSizeValue", {
      get: function () {
        return this._betSizeValue;
      },
      enumerable: false,
      configurable: true
    });
    x.prototype.updateRemoteBets = function (L, D) {
      this._betLevelValue = this._selectedBetLevelValue = L;
      this._betSizeValue = this._selectedBetSizeValue = D;
    };
    return x;
  }();
  exports.BetRepository = T;
  cc._RF.pop();
}