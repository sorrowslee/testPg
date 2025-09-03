if (!cc._RF.push(module, "a1c10YNRzpMdp+eGGlvRpJW", "SpinButtonViewController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initSpinButtonNode = exports.setSpinButtonInteractivity = undefined;
  exports.setSpinButtonInteractivity = function (T) {
    var x = System.get("automation") && System.get("automation").GameData;
    if (x) {
      x.emit("SpinButtonInteractivity", T);
    }
  };
  exports.initSpinButtonNode = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.spinButton, "spin_button");
    }
  };
  cc._RF.pop();
}