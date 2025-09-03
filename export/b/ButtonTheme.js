if (!cc._RF.push(module, "2a5d1nUeQZE9KCVbljwPCZP", "ButtonTheme")) {
  exports.__esModule = true;
  exports.default = undefined;
  var L = require("UIAppearanceHelper");
  var D = cc.Enum({
    NONE: 0,
    COLOR: 1,
    SPRITE: 2,
    SCALE: 3
  });
  var k = cc.Class({
    extends: cc.Component,
    ctor: function () {},
    editor: false,
    properties: {
      transition: {
        default: D.NONE,
        tooltip: false,
        type: D,
        animatable: false,
        notify: function () {
          this._updateButtonTransitionSelection();
        }
      },
      domainKey: {
        tooltip: false,
        default: ""
      },
      colorKey: {
        tooltip: false,
        default: "",
        notify: function () {
          this._updateButtonColorTransition();
        }
      }
    },
    // 載入時取得按鈕並套用外觀設定
    onLoad: function () {
      this._button = this.node.getComponent(cc.Button);
      this._updateButtonTransitionSelection();
      this._updateButtonColorTransition();
    },
    // 更新按鈕過場效果類型
    _updateButtonTransitionSelection: function () {
      var C = this._button;
      if (C) {
        C.transition = this.transition;
      }
    },
    // 根據外觀設定更新按鈕顏色
    _updateButtonColorTransition: function () {
      var C = this._button;
      if (C && this.transition == D.COLOR) {
        this.domainKey;
        this.colorKey;
        var u = L.uiAppearanceHelper.v(this.domainKey + "." + this.colorKey + ".normal");
        var c = L.uiAppearanceHelper.v(this.domainKey + "." + this.colorKey + ".pressed");
        var p = L.uiAppearanceHelper.v(this.domainKey + "." + this.colorKey + ".hover");
        var j = L.uiAppearanceHelper.v(this.domainKey + "." + this.colorKey + ".disabled");
        if (u) {
          C.node.opacity = u.getA();
          C.normalColor = u;
          C.pressedColor = c;
          C.hoverColor = p;
          C.disabledColor = j;
        }
      }
    }
  });
  exports.default = k;
  module.exports = exports.default;
  cc._RF.pop();
}