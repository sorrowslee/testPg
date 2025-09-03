if (!cc._RF.push(module, "05b6c8yPn1LZIH3AnSTBq8U", "LabelTheme")) {
  exports.__esModule = true;
  exports.default = undefined;
  var C;
  var j = function (E) {
    if (E && E.__esModule) {
      return E;
    }
    if (E === null || typeof E != "object" && typeof E != "function") {
      return {
        default: E
      };
    }
    var F = M(undefined);
    if (F && F.has(E)) {
      return F.get(E);
    }
    var h = {};
    var b = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var H in E) {
      if (H !== "default" && Object.prototype.hasOwnProperty.call(E, H)) {
        var w = b ? Object.getOwnPropertyDescriptor(E, H) : null;
        if (w && (w.get || w.set)) {
          Object.defineProperty(h, H, w);
        } else {
          h[H] = E[H];
        }
      }
    }
    h.default = E;
    if (F) {
      F.set(E, h);
    }
    return h;
  }(require("ResRC"));
  var G = require("ResourceQualifierHelper");
  var V = require("Utils");
  var Q = require("UIAppearanceHelper");
  var N = cc.Enum({
    _updateRichText: "_updateRichText",
    _isBold: "_isBold",
    _isItalic: "_isItalic"
  });
  var Y = (0, V.getCocosMajor)();
  C = typeof Y == "number" && Y >= 4 ? function (E) {
    return E.markForRender(true);
  } : function (E) {
    return E.markForUpdateRenderData(true);
  };
  var A = cc.Class({
    extends: cc.Component,
    ctor: function () {},
    editor: false,
    properties: {
      followThemeColor: false,
      followFont: false,
      domainKey: {
        tooltip: false,
        default: ""
      },
      colorKey: {
        tooltip: false,
        default: "",
        notify: function () {
          this._updateColor();
        }
      },
      fontFamilyKey: {
        tooltip: false,
        default: "theme_font"
      },
      fontKey: {
        tooltip: false,
        default: ""
      },
      fontWeightKey: {
        tooltip: false,
        default: ""
      },
      fontStyleKey: {
        tooltip: false,
        default: ""
      }
    },
    onLoad: function () {
      this._label = this.node.getComponent(cc.Label);
      this._label ||= this.node.getComponent(cc.RichText);
      this._updateColor();
      this._updateFont();
    },
    _updateColor: function () {
      if (this.followThemeColor) {
        var E = this.node;
        this.domainKey;
        this.colorKey;
        if (E && this.colorKey != "") {
          var F = Q.uiAppearanceHelper.v(this.domainKey + "." + this.colorKey);
          E.color = new cc.Color(F.r, F.g, F.b);
          E.opacity = F.getA();
        }
      }
    },
    _updateFont: function () {
      var E = this;
      if (this.followFont) {
        var F = this._label;
        if (F) {
          F.offsetY = (0, Q.getOffsetY)();
          if (this.fontFamilyKey && this.domainKey) {
            var h = Q.uiAppearanceHelper.v(this.domainKey + "." + this.fontFamilyKey);
            this._updateLabelFontFamily(h);
          }
          if (this.fontWeightKey) {
            var b = this.fontWeightKey;
            this._updateLabelWeight(b);
          }
          if (this.fontStyleKey) {
            var H = this.fontStyleKey;
            this._updateLabelStyle(H);
          }
          if (!this.fontFamilyKey && this.fontKey && this.domainKey) {
            var w = Q.uiAppearanceHelper.v(this.domainKey + "." + this.fontKey);
            if (typeof w == "object") {
              this._updateLabelFont(w);
              return;
            }
            if (w) {
              var U = (0, G.getResourceURL)(w);
              if (U) {
                j.load(U, cc.Font, function (B, P) {
                  if (!B) {
                    E._updateLabelFont(P);
                  }
                });
              }
              return;
            }
          }
        }
      }
    },
    _updateLabelFont: function (E) {
      var F = this._label;
      if (cc.isValid(this.node)) {
        F.font = E;
        if (F instanceof cc.Label) {
          C(F);
        } else if (F instanceof cc.RichText) {
          F[N._updateRichText]();
        }
      }
    },
    _updateLabelFontFamily: function (E) {
      var F = this._label;
      if (cc.isValid(this.node)) {
        F.fontFamily = E;
        if (F instanceof cc.Label) {
          C(F);
        } else if (F instanceof cc.RichText) {
          F[N._updateRichText]();
        }
      }
    },
    _updateLabelWeight: function (E) {
      var F = this._label;
      if (cc.isValid(this.node)) {
        F[N._isBold] = E;
        if (F instanceof cc.Label) {
          C(F);
        } else {
          cc.RichText;
        }
      }
    },
    _updateLabelStyle: function (E) {
      var F = this._label;
      if (cc.isValid(this.node)) {
        F[N._isItalic] = E;
        if (F instanceof cc.Label) {
          C(F);
        } else {
          cc.RichText;
        }
      }
    }
  });
  exports.default = A;
  module.exports = exports.default;
  cc._RF.pop();
}
function M(E) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var F = new WeakMap();
  var h = new WeakMap();
  return (M = function (b) {
    if (b) {
      return h;
    } else {
      return F;
    }
  })(E);
}