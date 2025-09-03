if (!cc._RF.push(module, "83864gT5ThLe76prA/1WJXD", "PayoutEffectBackController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SimpleAnimationController");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.vfxANode = undefined;
      c.psVfxBAnim = undefined;
      c.psVfxCAnim = undefined;
      return c;
    }
    __extends(u, C);
      u.prototype.clear = function () {
        // 清理並隱藏所有背景特效節點
        this.vfxANode.stopAllActions();
        this.vfxANode.active = false;
        var c = this.psVfxBAnim;
        var p = this.psVfxCAnim;
        c.stop();
        c.node.stopAllActions();
        c.node.active = false;
        p.stop();
        p.node.stopAllActions();
        p.node.active = false;
      };
      u.prototype.destroy = function () {
        // 銷毀控制器並清理節點
        this.clear();
        this.node.destroy();
        return C.prototype.destroy.call(this);
      };
      u.prototype.highlightSymbol = function (c = false) {
        // 顯示符號高亮的背景特效
        var p = this.vfxANode;
        var j = this.psVfxBAnim;
        var l = this.psVfxCAnim;
        var G = l.node;
        p.active = true;
        p.stopAllActions();
        G.stopAllActions();
        j.play();
        l.play();
        if (c) {
          p.scale = 1;
          p.opacity = 255;
          G.scale = 1;
          G.opacity = 255;
        } else {
          p.scale = 0;
          p.opacity = 0;
          p.runAction(cc.spawn(cc.fadeIn(0.15), cc.scaleTo(0.225, 1).easing(cc.easeBackOut())));
          G.scale = 0;
          G.opacity = 0;
          G.runAction(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.3, 1).easing(cc.easeBackOut())));
        }
      };
      u.prototype.stopHighlightSymbol = function (c) {
        // 停止符號高亮並淡出特效
        var p = this.vfxANode;
        var j = this.psVfxBAnim;
        var l = this.psVfxCAnim;
        var G = l.node;
        p.stopAllActions();
        p.runAction(cc.fadeOut(0.3));
        j.stop();
        G.stopAllActions();
        G.runAction(cc.sequence(cc.fadeOut(0.45), cc.callFunc(function () {
          l.stop();
          if (c) {
            c();
          }
        })));
      };
    __decorate([D(cc.Node)], u.prototype, "vfxANode", undefined);
    __decorate([D(T.default)], u.prototype, "psVfxBAnim", undefined);
    __decorate([D(T.default)], u.prototype, "psVfxCAnim", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}