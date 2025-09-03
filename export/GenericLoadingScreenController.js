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
  exports.showLoadingPage = function (N) {
    x.showFullLoadingPage();
    k = N;
    T.delayCallback(0.3)(Q);
  };
  exports.hideLoadingPage = function (N) {
    C = N;
    D = true;
    if (L) {
      G();
    }
  };
  cc._RF.pop();
}
function j() {
  D = false;
  L = false;
  if (C) {
    C();
  }
  C = undefined;
}
function G() {
  x.hideFullLoadingPage();
  T.delayCallback(0.3)(j);
}
function V() {
  L = true;
  if (D) {
    G();
  }
}
function Q() {
  T.delayCallback(1)(V);
  if (k) {
    k();
  }
  k = undefined;
}