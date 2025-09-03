// 從 common 模組取得 XHR 物件並導出為 XHRFactory
if (!cc._RF.push(module, "f3dd4hmiBJHSqrMVzx2qXWg", "XHRFactory")) {
  // 取得 common 模組中的 XHR 工具
  var R = System.get("common").XHR;
  // 將取得的 XHR 工具導出為 XHRFactory
  module.exports.XHRFactory = R;
  // 標記為 ES 模組
  module.exports.__esModule = true;
  cc._RF.pop();
}
