// 重新導出 BVFramework 的 ErrorHandler
if (!cc._RF.push(module, "933099S7qNPvb+XKiLo98KQ", "ErrorHandler")) {
  var R = System.get("bvframework").ErrorHandler;
  for (var K in R) {
    module.exports[K] = R[K];
  }
  module.exports.__esModule = true;
  cc._RF.pop();
}
