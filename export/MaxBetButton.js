if (!cc._RF.push(module, "57d52E5rw9F7Iqp2UOZL/vK", "MaxBetButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("BetModifierButton");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.labelNode = undefined;
      return G;
    }
    __extends(j, p);
    // 切換按下狀態時的按鈕顏色
    j.prototype.changeButtonPressedColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".pressed");
        if (this.isReachLimit) {
          var N = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
          L.setNodeColorWithOpacity(this.iconSprite, N);
          this.labelNode.opacity = 127.5;
        } else {
          L.setNodeColorWithOpacity(this.iconSprite, G ? Q : V);
          this.labelNode.opacity = G ? 127.5 : 255;
        }
      }
    };
    // 切換可互動與禁用時的按鈕顏色
    j.prototype.interactableButtonColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        if (this.isReachLimit) {
          L.setNodeColorWithOpacity(this.iconSprite, Q);
          this.labelNode.opacity = 127.5;
        } else {
          L.setNodeColorWithOpacity(this.iconSprite, G ? V : Q);
          this.labelNode.opacity = G ? 255 : 63.75;
        }
      }
    };
    __decorate([C(cc.Node)], j.prototype, "labelNode", undefined);
    return __decorate([k], j);
  }(T.default);
  exports.default = u;
  cc._RF.pop();
}