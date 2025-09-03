if (!cc._RF.push(module, "501f6RTfh9LVInQJ/Y+n54G", "WinValuesModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WinValuesModel = undefined;
  var T = function () {
    // 建構函式，複製獎金數值資料
    function x(L) {
      if (L) {
        this._rawData = JSON.parse(JSON.stringify(L));
        this._winValuePositions = Object.keys(this._rawData);
      }
    }
    // 依位置取得對應的獎金數值
    x.prototype.getWinValueByPosition = function (L) {
      return this._rawData[L];
    };
    Object.defineProperty(x.prototype, "winValuePositions", {
      // 取得所有獎金位置鍵值
      get: function () {
        return this._winValuePositions;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "rawData", {
      // 回傳原始獎金資料的複製
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