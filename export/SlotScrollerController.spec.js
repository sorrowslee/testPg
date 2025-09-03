if (!cc._RF.push(module, "e08af4I5BlAUaisYXf6Oz5Q", "SlotScrollerController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.onStateChange = undefined;
    // 自動化測試用的狀態變更事件
    exports.onStateChange = function (T) {
    var x = System.get("automation") && System.get("automation").GameData;
    if (T > 0 && x) {
      x.emit("ScrollEvent", T === 1 ? "start" : "stop");
    }
  };
  cc._RF.pop();
}