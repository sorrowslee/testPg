if (!cc._RF.push(module, "948ffXQc5hNbqpouW3VdkkX", "LandscapeSoundButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SoundButton");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.largeSprite = undefined;
      G.largeSoundOnIcon = undefined;
      G.largeSoundOffIcon = undefined;
      return G;
    }
    __extends(j, p);
    j.prototype.onLoad = function () {
      this.enableTouchInteraction();
      if (this.buttonTheme) {
        var G = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        L.setNodeColorWithOpacity(this.largeSprite.node, G);
      }
    };
    j.prototype.changeButtonPressedColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".pressed");
        L.setNodeColorWithOpacity(this.largeSprite.node, G ? Q : V);
      }
    };
    j.prototype.interactableButtonColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        L.setNodeColorWithOpacity(this.largeSprite.node, G ? V : Q);
      }
    };
    __decorate([C(cc.Sprite)], j.prototype, "largeSprite", undefined);
    __decorate([C(cc.SpriteFrame)], j.prototype, "largeSoundOnIcon", undefined);
    __decorate([C(cc.SpriteFrame)], j.prototype, "largeSoundOffIcon", undefined);
    return __decorate([k], j);
  }(T.default);
  exports.default = u;
  cc._RF.pop();
}