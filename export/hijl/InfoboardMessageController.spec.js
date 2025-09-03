if (!cc._RF.push(module, "9a894aU+wtPzI8aYY1BbeiI", "InfoboardMessageController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setWinAmount = exports.setTotalAndWinText = undefined;
  // 測試用：觸發顯示總得獎或單次得獎事件
  exports.setTotalAndWinText = function (T, x) {
    if (T || x) {
      var L = System.get("automation") && System.get("automation").GameData;
      if (L) {
        L.emit(T ? "ShowTotalWin" : "ShowWin");
      }
    }
  };
  // 測試用：觸發顯示得獎金額事件
  exports.setWinAmount = function (T, x) {
    if (T && T > 0) {
      var L = System.get("automation") && System.get("automation").GameData;
      if (L) {
        L.emit(x ? "ShowTotalWin" : "ShowWin");
      }
    }
  };
  cc._RF.pop();
}