// 重新導出 BVFramework 中的 XHRHelper
if (!cc._RF.push(module, "d29eaTApqFCCLK6u/sH0xO/", "XHRHelper")) {
  // 取得 BVFramework 的 XHRHelper 物件
  var R = System.get("bvframework").XHRHelper;
  // 將 XHRHelper 的所有屬性導出
  for (var K in R) {
    module.exports[K] = R[K];
  }
  // 標記為 ES 模組
  module.exports.__esModule = true;
  cc._RF.pop();
}
