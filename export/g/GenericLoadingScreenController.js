if (!cc._RF.push(module, "cb530nJjNxEeb1kcmn96QZc", "GenericLoadingScreenController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hideLoadingPage = exports.showLoadingPage = undefined;
  var T = require("Utils");
  var x = require("NotifyHelper");
  var L = false;
  var D = false;
  var k = undefined;
  var C = undefined;
  // 顯示全畫面載入頁並在短暫延遲後執行回呼
  exports.showLoadingPage = function (N) {
    x.showFullLoadingPage();
    k = N;
    T.delayCallback(0.3)(Q);
  };
  // 隱藏載入頁，若尚未顯示完成則暫存回呼
  exports.hideLoadingPage = function (N) {
    C = N;
    D = true;
    if (L) {
      G();
    }
  };
  cc._RF.pop();
}
// 完成隱藏載入頁後的收尾處理
function j() {
  D = false;
  L = false;
  if (C) {
    C();
  }
  C = undefined;
}
// 關閉載入頁並延遲執行收尾
function G() {
  x.hideFullLoadingPage();
  T.delayCallback(0.3)(j);
}
// 標記載入頁已顯示，若已要求隱藏則立即處理
function V() {
  L = true;
  if (D) {
    G();
  }
}
// 延遲一段時間後確認載入頁顯示完成
function Q() {
  T.delayCallback(1)(V);
  if (k) {
    k();
  }
  k = undefined;
}