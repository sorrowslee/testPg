if (!cc._RF.push(module, "f4549VlHlxOL4w7V7h4rhZg", "UIAppearanceHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.uiAppearanceHelper = exports.getOffsetY = undefined;
  var A = require("BACKUP_DATA");
  var M = function () {
    function m() {}
    m.prototype.interpret = function (v) {
      // 將陣列的第一個元素回傳
      return v[0];
    };
    return m;
  }();
  var E = function () {
    function m() {}
    m.prototype.interpret = function (v) {
      // 將陣列轉成 cc.Color 物件
      return new cc.Color(v[0], v[1], v[2], v[3]);
    };
    return m;
  }();
  var F = cc._decorator.ccclass;
  var b = function (m) {
    function v() {
      var J = m.call(this) || this;
      J._uiAppearance = undefined;
      var Z0 = J._uiAppearance = shell.uiAppearance;
      if (Z0) {
        Z0.registerInterpreter("font", new M());
        Z0.registerInterpreter("value", new M());
        Z0.registerInterpreter("path", new M());
        Z0.registerInterpreter("color", new E());
        Z0.registerInterpreter("classname", new M());
      }
      return J;
    }
    __extends(v, m);
    v.prototype.v = function (J) {
      // 取得 UI 外觀設定，若無則從備份資料尋找
      var Z0 = this._uiAppearance && this._uiAppearance.v(J);
      if (Z0 === null) {
        Z0 = y(J);
      }
      return Z0;
    };
    v.prototype.unregisterInterpreter = function (J) {
      // 取消註冊指定的解析器
      return this._uiAppearance && this._uiAppearance.unregisterInterpreter(J);
    };
    return __decorate([F("UIAppearanceHelper")], v);
  }(cc.Object);
  var H = Object.freeze({
    windows: {
      native: 4,
      non_native: 3
    },
    macos: {
      native: 4,
      non_native: 5
    },
    ios: {
      native: 2,
      non_native: 2
    },
    android: {
      native: 5,
      non_native: 4
    }
  });
  var w = Object.freeze({
    windows: {
      native: 0,
      non_native: 5
    },
    macos: {
      native: 2,
      non_native: 3
    },
    ios: {
      native: 0,
      non_native: 3
    },
    android: {
      native: 4,
      non_native: 4
    }
  });
  var U = shell.I18n.currentLocale;
  var B = shell.getBrowserBaseType().toLowerCase();
  var P = U === "zh" || U === "ko" || U === "ja" ? w : H;
  // 依據作業系統與瀏覽器回傳文字垂直位移
  exports.getOffsetY = function () {
    switch (cc.sys.os) {
      case cc.sys.OS_WINDOWS:
        if (B === "ie" || B === "edge") {
          return P.windows.native;
        } else {
          return P.windows.non_native;
        }
      case cc.sys.OS_ANDROID:
        if (B === "chrome") {
          return P.android.native;
        } else {
          return P.android.non_native;
        }
      case cc.sys.OS_OSX:
        if (B === "safari") {
          return P.macos.native;
        } else {
          return P.macos.non_native;
        }
      case cc.sys.OS_IOS:
        if (B === "mobile safari") {
          return P.ios.native;
        } else {
          return P.ios.non_native;
        }
      default:
        return P.macos.non_native;
    }
  };
  var X = new b();
  exports.uiAppearanceHelper = X;
  cc._RF.pop();
}
function y(m) {
  // 從備援資料依路徑取得值
  var v;
  var J = m.split(".");
  for (var Z0 = 0, Z1 = J.length; Z0 < Z1; Z0++) {
    var Z2 = J[Z0];
    if ((v = v && v[Z2] || A.default[Z2]) === undefined) {
      return null;
    }
  }
  return v;
}