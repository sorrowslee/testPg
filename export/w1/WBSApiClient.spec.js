if (!cc._RF.push(module, "9958eyjxAdE+bayPUee8vxY", "WBSApiClient.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.onRequestSent = exports.onRequestReceived = undefined;
  exports.onRequestReceived = function (T, x) {
    // 測試用途：發送請求完成事件與結果
    var L = System.get("automation") && System.get("automation").GameData;
    var D = {
      error: T,
      result: x
    };
    if (L) {
      L.emit("RequestReceived", D);
    }
  };
  exports.onRequestSent = function () {
    // 測試用途：發送請求送出事件
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("RequestSent");
    }
  };
  cc._RF.pop();
}