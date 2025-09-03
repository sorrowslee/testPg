if (!cc._RF.push(module, "03843beszVH+q8sj7OeNsLR", "BigWinController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initBigWinNodes = exports.skipBigWinAnimationActiveEvent = exports.skipBigWinButtonActiveEvent = undefined;
  exports.skipBigWinButtonActiveEvent = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("BigWin", {
        displayState: "SkipNumberRollEnabled"
      });
    }
  };
  exports.skipBigWinAnimationActiveEvent = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("BigWin", {
        displayState: "SkipAnimationEnabled"
      });
    }
  };
  exports.initBigWinNodes = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.skipButtonNode, "big_win_skip_button");
    }
  };
  cc._RF.pop();
}