if (!cc._RF.push(module, "f693b/Fp2RDlK3XmFtDc9sl", "SlotController.spec")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.symbolDrop = exports.symbolBreak = exports.symbolShake = exports.initSlotControllerNode = undefined;
  exports.initSlotControllerNode = function (T) {
    var x = System.get("automation") && System.get("automation").GameConfigs;
    if (x) {
      x.initNodeConfig(T.reelArea, "reel_area");
    }
  };
  exports.symbolShake = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolShake");
    }
  };
  exports.symbolBreak = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolBreak");
    }
  };
  exports.symbolDrop = function () {
    var T = System.get("automation") && System.get("automation").GameData;
    if (T) {
      T.emit("SymbolDrop");
    }
  };
  cc._RF.pop();
}