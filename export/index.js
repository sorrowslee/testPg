if (!cc._RF.push(module, "607a1pUyWBLsphZz1avN+BH", "AutomationDecorator")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.automationDec = undefined;
  // 裝飾器：在自動化系統存在時執行額外函式
  exports.automationDec = function (T) {
    return function (x, L, D) {
      if (!D) {
        return D;
      }
      var k = D.value;
      D.value = function () {
        var C = [];
        for (var u = 0; u < arguments.length; u++) {
          C[u] = arguments[u];
        }
        var c = System.get("automation");
        if (c) {
          T.func.apply(T, __spread(C));
        }
        var p = k.apply(this, C);
        return p;
      };
      return D;
    };
  };
  cc._RF.pop();
}