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
        // 取得導航控制器
        return this._navigator;
      },
      set: function (p) {
        // 設定導航控制器
        this._navigator = p;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "view", {
      get: function () {
        // 回傳當前節點作為視圖
        return this.node;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(c.prototype, "safeAreaInsets", {
      get: function () {
        // 取得裝置安全區域設定
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
    c.prototype.onEnable = function () {
      // 組件啟用時執行
    };
    c.prototype.onDisable = function () {
      // 組件停用時執行
    };
    c.prototype.viewWillAppear = function () {
      // 視圖即將顯示時
    };
    c.prototype.viewDidAppear = function () {
      // 視圖顯示後
    };
    c.prototype.viewWillDisappear = function () {
      // 視圖即將隱藏時
    };
    c.prototype.viewDidDisappear = function () {
      // 視圖隱藏後
    };
    c.prototype.viewWillLayoutSubviews = function () {
      // 子視圖佈局前
    };
    c.prototype.viewDidLayoutSubviews = function () {
      // 子視圖佈局後
    };
    __decorate([k(cc.String)], c.prototype, "title", undefined);
    return __decorate([D], c);
  }(cc.Component);
  exports.default = C;
  cc._RF.pop();
}