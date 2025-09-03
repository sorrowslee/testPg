if (!cc._RF.push(module, "047ecNX+XBPIY0Z8sYHPeIe", "PayoutEffectFrontController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("SimpleAnimationController");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function c() {
      var p = u !== null && u.apply(this, arguments) || this;
      p.psVfxDAnim = undefined;
      p.psVfxEAnim = undefined;
      p.bulletHoleAnim = undefined;
      return p;
    }
    __extends(c, u);
    c.prototype.clear = function () {
      var p = this.psVfxDAnim;
      var j = this.psVfxEAnim;
      var G = this.bulletHoleAnim;
      p.stop();
      p.node.stopAllActions();
      p.node.active = false;
      p.node.getComponent(cc.Sprite).spriteFrame = undefined;
      j.stop();
      j.node.stopAllActions();
      j.node.active = false;
      j.node.getComponent(cc.Sprite).spriteFrame = undefined;
      G.stop();
      G.node.stopAllActions();
      G.node.active = false;
      G.node.getComponent(cc.Sprite).spriteFrame = undefined;
    };
    c.prototype.breakSymbol = function (p, j) {
      var G = this;
      var V = this.bulletHoleAnim;
      var Q = V.node;
      var N = Q.getComponent(cc.Sprite);
      function Y() {
        G.clear();
      }
      var W = V.getClips();
      var q = T.randomInt(0, V.getClips().length - 1);
      Q.opacity = 255;
      Q.scale = 1;
      V.stop();
      N.spriteFrame = undefined;
      V.play(W[q].name, function () {
        if (p) {
          p();
        }
        G.psVfxDAnim.play();
        G.psVfxEAnim.play(undefined, Y);
        Q.stopAllActions();
        Q.runAction(cc.fadeOut(0.45));
        if (j) {
          j();
        }
      });
    };
    c.prototype.destroy = function () {
      this.node.destroy();
      return u.prototype.destroy.call(this);
    };
    __decorate([k(x.default)], c.prototype, "psVfxDAnim", undefined);
    __decorate([k(x.default)], c.prototype, "psVfxEAnim", undefined);
    __decorate([k(x.default)], c.prototype, "bulletHoleAnim", undefined);
    return __decorate([D], c);
  }(cc.Component);
  exports.default = C;
  cc._RF.pop();
}