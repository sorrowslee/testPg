if (!cc._RF.push(module, "b3d0cO57FNIT68ecOLFdA43", "TotalWinController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initTotalWinNodes = exports.skipTotalWinAnimationShownEvent = exports.collectTotalWinButtonShownEvent = undefined;
  // 測試時通知 Total Win 收集按鈕已顯示
  exports.collectTotalWinButtonShownEvent = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("TotalWin", {
        displayState: "CollectButtonShown"
      });
    }
  };
  // 測試時通知可跳過 Total Win 動畫
  exports.skipTotalWinAnimationShownEvent = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("TotalWin", {
        displayState: "SkipNumberRollEnabled"
      });
    }
  };
  // 初始化測試所需的節點設定
  exports.initTotalWinNodes = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.collectButtonNode, "total_win_collect_button");
      x.initNodeConfig(T.skipButtonNode, "total_win_skip_button");
    }
  };
  cc._RF.pop();
}