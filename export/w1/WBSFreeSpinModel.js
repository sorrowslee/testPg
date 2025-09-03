if (!cc._RF.push(module, "08a7d4KfrBBvpHCYQNoE6SK", "WBSFreeSpinModel")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = function () {
    function x(L) {
      // 初始化免費旋轉相關數據
      var D = L.aw;
      var k = L.s;
      var C = L.ts;
      var u = L.as;
      this._accumulatedWin = D;
      this._step = k;
      this._totalStep = C;
      this._additionalStep = u;
    }
    Object.defineProperty(x.prototype, "accumulatedWin", {
      // 取得累積贏分
      get: function () {
        return this._accumulatedWin;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "step", {
      // 取得目前已進行的免費旋轉數
      get: function () {
        return this._step;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "totalStep", {
      // 取得免費旋轉總次數
      get: function () {
        return this._totalStep;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(x.prototype, "additionalStep", {
      // 取得額外新增的旋轉次數
      get: function () {
        return this._additionalStep;
      },
      enumerable: false,
      configurable: true
    });
    return x;
  }();
  exports.default = T;
  cc._RF.pop();
}