if (!cc._RF.push(module, "03755Dj0/VFQbz7rFuRrlJG", "Utils")) {
  var g = System.get("common").Utils;
  var T = function (L, D) {
    var k = {};
    for (var C in D) {
      if (L.hasOwnProperty(C)) {
        k[L[C]] = D[C];
      } else {
        k[C] = D[C];
      }
    }
    return k;
  }({
    u0: "convertToNodeSpace",
    u1: "convertToNodeSpaceAR",
    u2: "getAbsolutePosition",
    u3: "getAbsoluteX",
    u4: "getAbsoluteY",
    u5: "setAbsolutePosition",
    u6: "setAbsoluteX",
    u7: "setAbsoluteY",
    u8: "transferToParent",
    u9: "getSharedScheduler",
    u10: "delayCallback",
    u11: "timeoutCallback",
    u12: "selectorCallback",
    u13: "sequenceCallback",
    u14: "spawnCallback",
    u15: "waterfCallback",
    u16: "condCallback",
    u17: "deferCallback",
    u18: "tickCallback",
    u19: "observeCallback",
    u20: "formatTwoDigit",
    u21: "formatDate",
    u22: "isRTL",
    u23: "getProtocol",
    u24: "getOrigin"
  }, g);
  for (var x in T) {
    if (T.hasOwnProperty(x)) {
      module.exports[x] = T[x];
    }
  }
  module.exports.__esModule = true;
  if (g.sharedScheduler == null) {
    module.exports.sharedScheduler = T.getSharedScheduler();
  }
  cc._RF.pop();
}