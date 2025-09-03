function g() {
  return cc.sys.os === cc.sys.OS_IOS;
}
if (!cc._RF.push(module, "b3045XdzRhDNrJLCqWLZ6eT", "UIKitUtils")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNotBrowserMode = exports.deviceHasNotch = exports.isIphoneX = exports.isIphone = undefined;
  exports.isIphone = g;
  exports.isIphoneX = function () {
    var x = cc.view.getFrameSize();
    return g() && (x.width === 812 && x.height === 375 || x.width === 375 && x.height === 812);
  };
  exports.deviceHasNotch = function () {
    return shell.environment.hasNotch();
  };
  exports.isNotBrowserMode = function () {
    return window.navigator.standalone || shell.getEnvironment() === "app";
  };
  cc._RF.pop();
}