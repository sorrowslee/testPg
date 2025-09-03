// 重新導出 BVFramework 中的 XHRHandler
if (!cc._RF.push(module, "77926JsF5hDL5NbzKF89qZh", "XHRHandler")) {
  // 取得 BVFramework 的 XHRHandler 物件
  var R = System.get("bvframework").XHRHandler;
  // 將 XHRHandler 的所有屬性導出
  for (var K in R) {
    module.exports[K] = R[K];
  }
  // 標記為 ES 模組
  module.exports.__esModule = true;
  cc._RF.pop();
}
