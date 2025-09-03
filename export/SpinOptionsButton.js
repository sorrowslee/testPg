if (!cc._RF.push(module, "3ee68qGxY9G3q+WVKsHebfZ", "SpinOptionsButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GenericSettingButton");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.holder = undefined;
      G.autoSpinTurn = undefined;
      G.autoSpinIcon = undefined;
      G.autoSpinIconShadow = undefined;
      G._abortAutoSpinIconAnim = undefined;
      return G;
    }
    __extends(j, p);
    j.prototype.onLoad = function () {
      p.prototype.onLoad.call(this);
      if (this.buttonTheme) {
        var G = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        L.setNodeColorWithOpacity(this.autoSpinTurn, G);
        L.setNodeColorWithOpacity(this.autoSpinIcon, G);
        L.setNodeColorWithOpacity(this.autoSpinIconShadow, G);
      }
    };
    j.prototype.setAutoSpinSprite = function (G) {
      this.iconSprite.getComponent(cc.Sprite).spriteFrame = G;
    };
    j.prototype.playAutoSpinAnim = function () {
      this.stopAutoSpinAnim();
      var G = cc.repeatForever(cc.rotateBy(6, 360));
      this.autoSpinTurn.runAction(G);
      this.autoSpinIconShadow.parent.opacity = 0;
      this._playAutoSpinIconShadowAnim();
    };
    j.prototype.stopAutoSpinAnim = function () {
      var G = this._abortAutoSpinIconAnim;
      this._abortAutoSpinIconAnim = undefined;
      if (G) {
        G();
      }
      this.autoSpinTurn.stopAllActions();
      this.autoSpinIconShadow.parent.stopAllActions();
      this.autoSpinIconShadow.parent.opacity = 0;
      this.autoSpinIconShadow.parent.scale = 1;
    };
    j.prototype.changeButtonPressedColor = function (G) {
      if (G) {
        this.node.runAction(cc.scaleTo(0.05, 0.9));
      } else {
        this.node.runAction(cc.sequence(cc.scaleTo(0.05, 1.1), cc.scaleTo(0.05, 1.05), cc.scaleTo(0.05, 1)));
      }
    };
    j.prototype._playAutoSpinIconShadowAnim = function () {
      var G = this;
      this._abortAutoSpinIconAnim = L.delayCallback(3)(function () {
        G.autoSpinIconShadow.parent.opacity = 180;
        G.autoSpinIconShadow.parent.scale = 1;
        G.autoSpinIconShadow.parent.runAction(cc.sequence(cc.spawn(cc.scaleTo(1.2, 2.2), cc.fadeOut(1.2)), cc.callFunc(function () {
          G._playAutoSpinIconShadowAnim();
        })));
      });
    };
    j.prototype.interactableButtonColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        var N = G ? V : Q;
        this.holder.opacity = N.a;
        L.setNodeColorWithOpacity(this.iconSprite, N);
        L.setNodeColorWithOpacity(this.autoSpinTurn, N);
        L.setNodeColorWithOpacity(this.autoSpinIcon, N);
        L.setNodeColorWithOpacity(this.autoSpinIconShadow, N);
      }
    };
    j.prototype.destroy = function () {
      var G = this._abortAutoSpinIconAnim;
      this._abortAutoSpinIconAnim = undefined;
      if (G) {
        G();
      }
      this.autoSpinTurn.stopAllActions();
      return p.prototype.destroy.call(this);
    };
    __decorate([C(cc.Node)], j.prototype, "holder", undefined);
    __decorate([C(cc.Node)], j.prototype, "autoSpinTurn", undefined);
    __decorate([C(cc.Node)], j.prototype, "autoSpinIcon", undefined);
    __decorate([C(cc.Node)], j.prototype, "autoSpinIconShadow", undefined);
    return __decorate([k], j);
  }(T.default);
  exports.default = u;
  cc._RF.pop();
}