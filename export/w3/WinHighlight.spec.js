if (!cc._RF.push(module, "533c8G1+IJDRZ3wLKm0hm2E", "WinHighlight.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.showWinHighlight = undefined;
  exports.showWinHighlight = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("WinHighlightShown");
    }
  };
  cc._RF.pop();
}