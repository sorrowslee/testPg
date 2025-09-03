if (!cc._RF.push(module, "501f6RTfh9LVInQJ/Y+n54G", "WinValuesModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WinValuesModel = undefined;
  var T = function () {
    function x(L) {
      if (L) {
        this._rawData = JSON.parse(JSON.stringify(L));
        this._winValuePositions = Object.keys(this._rawData);
      }
    }
    x.prototype.getWinValueByPosition = function (L) {
      return this._rawData[L];
    };
    Object.defineProperty(x.prototype, "winValuePositions", {
      get: function () {
        return this._winValuePositions;
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
  exports.WinValuesModel = T;
  cc._RF.pop();
}