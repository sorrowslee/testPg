function g() {
  // 判斷是否為 iOS 裝置
  return cc.sys.os === cc.sys.OS_IOS;
}
if (!cc._RF.push(module, "b3045XdzRhDNrJLCqWLZ6eT", "UIKitUtils")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNotBrowserMode = exports.deviceHasNotch = exports.isIphoneX = exports.isIphone = undefined;
  exports.isIphone = g;
  exports.isIphoneX = function () {
    // 檢查是否為 iPhone X 螢幕尺寸
    var x = cc.view.getFrameSize();
    return g() && (x.width === 812 && x.height === 375 || x.width === 375 && x.height === 812);
  };
  exports.deviceHasNotch = function () {
    // 判斷裝置是否具有瀏海
    return shell.environment.hasNotch();
  };
  exports.isNotBrowserMode = function () {
    // 判斷是否在非瀏覽器模式
    return window.navigator.standalone || shell.getEnvironment() === "app";
  };
  cc._RF.pop();
}