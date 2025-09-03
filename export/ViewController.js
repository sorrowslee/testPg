if (!cc._RF.push(module, "ef8ab8zk59N1LEX0M2uhmRU", "ViewController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("UIKitUtils");
  var x = require("UIKit");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function c() {
      var p = u !== null && u.apply(this, arguments) || this;
      p.title = "";
      p.leftItem = undefined;
      p.middleItem = undefined;
      p.rightItem = undefined;
      p._navigator = undefined;
      p._safeAreaInsets = undefined;
      return p;
    }
    __extends(c, u);
    Object.defineProperty(c.prototype, "navigator", {
      get: function () {
        return this._navigator;
      },
      set: function (p) {
        this._navigator = p;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "view", {
      get: function () {
        return this.node;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "safeAreaInsets", {
      get: function () {
        var p;
        var j;
        var G;
        var V;
        this._safeAreaInsets ||= (p = T.deviceHasNotch(), j = T.isIphone(), G = T.isNotBrowserMode(), V = shell.is1959Supported, p && G && V ? x.safeArea.iphone_x : p && V ? {
          top: x.safeArea.normal.top,
          left: x.safeArea.iphone_x.left,
          bottom: x.safeArea.iphone_x.bottom,
          right: x.safeArea.iphone_x.right
        } : j && G ? x.safeArea.iphone : x.safeArea.normal);
        return this._safeAreaInsets;
      },
      enumerable: false,
      configurable: true
    });
    c.prototype.onEnable = function () {};
    c.prototype.onDisable = function () {};
    c.prototype.viewWillAppear = function () {};
    c.prototype.viewDidAppear = function () {};
    c.prototype.viewWillDisappear = function () {};
    c.prototype.viewDidDisappear = function () {};
    c.prototype.viewWillLayoutSubviews = function () {};
    c.prototype.viewDidLayoutSubviews = function () {};
    __decorate([k(cc.String)], c.prototype, "title", undefined);
    return __decorate([D], c);
  }(cc.Component);
  exports.default = C;
  cc._RF.pop();
}