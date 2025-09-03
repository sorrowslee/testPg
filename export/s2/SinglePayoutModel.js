if (!cc._RF.push(module, "029b1Bdw8RM4ZEeOX8HEoFh", "SinglePayoutModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = function () {
    // 建構函式，初始化轉輪資料陣列
    function x() {
      this._reel = [];
    }
    // reelData 的存取子，用於讀寫轉輪資料
    Object.defineProperty(x.prototype, "reelData", {
      get: function () {
        return this._reel;
      },
      set: function (L) {
        this._reel = L;
      },
      enumerable: false,
      configurable: true
    });
    // payoutData 的存取子，記錄派彩相關資料
    Object.defineProperty(x.prototype, "payoutData", {
      get: function () {
        return this._payoutData;
      },
      set: function (L) {
        this._payoutData = L;
      },
      enumerable: false,
      configurable: true
    });
    // extendSymbolData 的存取子，紀錄延展符號資訊
    Object.defineProperty(x.prototype, "extendSymbolData", {
      get: function () {
        return this._extendSymbolData;
      },
      set: function (L) {
        this._extendSymbolData = L;
      },
      enumerable: false,
      configurable: true
    });
    // extendBlockData 的存取子，紀錄延展區塊資訊
    Object.defineProperty(x.prototype, "extendBlockData", {
      get: function () {
        return this._extendBlockData;
      },
      set: function (L) {
        this._extendBlockData = L;
      },
      enumerable: false,
      configurable: true
    });
    // positionArray 的存取子，儲存位置陣列
    Object.defineProperty(x.prototype, "positionArray", {
      get: function () {
        return this._positionArray;
      },
      set: function (L) {
        this._positionArray = L;
      },
      enumerable: false,
      configurable: true
    });
    // additionalData 的存取子，保存額外資料
    Object.defineProperty(x.prototype, "additionalData", {
      get: function () {
        return this._additionalData;
      },
      set: function (L) {
        this._additionalData = L;
      },
      enumerable: false,
      configurable: true
    });
    return x;
  }();
  exports.default = T;
  cc._RF.pop();
}