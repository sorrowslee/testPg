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
    // 目前選擇的下注等級值
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
    // 目前選擇的下注大小值
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
    // 伺服器回傳的下注等級值
    Object.defineProperty(x.prototype, "betLevelValue", {
      get: function () {
        return this._betLevelValue;
      },
      enumerable: false,
      configurable: true
    });
    // 伺服器回傳的下注大小值
    Object.defineProperty(x.prototype, "betSizeValue", {
      get: function () {
        return this._betSizeValue;
      },
      enumerable: false,
      configurable: true
    });
    // 更新伺服器同步的下注資料
    x.prototype.updateRemoteBets = function (L, D) {
      this._betLevelValue = this._selectedBetLevelValue = L;
      this._betSizeValue = this._selectedBetSizeValue = D;
    };
    return x;
  }();
  exports.BetRepository = T;
  cc._RF.pop();
}