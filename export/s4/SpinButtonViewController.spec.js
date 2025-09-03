if (!cc._RF.push(module, "a1c10YNRzpMdp+eGGlvRpJW", "SpinButtonViewController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initSpinButtonNode = exports.setSpinButtonInteractivity = undefined;
  // 設定旋轉按鈕是否可互動（自動化測試用）
  exports.setSpinButtonInteractivity = function (T) {
    var x = System.get("automation") && System.get("automation").GameData;
    if (x) {
      x.emit("SpinButtonInteractivity", T);
    }
  };
  // 初始化旋轉按鈕節點的自動化測試設定
  exports.initSpinButtonNode = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.spinButton, "spin_button");
    }
  };
  cc._RF.pop();
}