if (!cc._RF.push(module, "f693b/Fp2RDlK3XmFtDc9sl", "SlotController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.symbolDrop = exports.symbolBreak = exports.symbolShake = exports.initSlotControllerNode = undefined;
  // 初始化轉輪控制器節點供自動化測試使用
  exports.initSlotControllerNode = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.reelArea, "reel_area");
    }
  };
  // 觸發符號震動事件
  exports.symbolShake = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolShake");
    }
  };
  // 觸發符號破碎事件
  exports.symbolBreak = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolBreak");
    }
  };
  // 觸發符號掉落事件
  exports.symbolDrop = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolDrop");
    }
  };
  cc._RF.pop();
}