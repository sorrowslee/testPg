if (!cc._RF.push(module, "24a5eWztK9Pkb2VKy4b0JAV", "WinLinesModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WinLinesModel = undefined;
  var T = function () {
    function x(L) {
      if (L) {
        this._rawData = JSON.parse(JSON.stringify(L));
        this._winLinePositions = Object.keys(this._rawData);
      }
    }
    x.prototype.getWinLinesByPosition = function (L) {
      return this._rawData[L];
    };
    Object.defineProperty(x.prototype, "winPositions", {
      get: function () {
        return this._winLinePositions;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "rawData", {
      get: function () {
        return JSON.parse(JSON.stringify(this._rawData));
      },
      enumerable: false,
      configurable: true
    });
    return x;
  }();
  exports.WinLinesModel = T;
  cc._RF.pop();
}