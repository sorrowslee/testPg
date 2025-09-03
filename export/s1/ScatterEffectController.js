if (!cc._RF.push(module, "d3c178kqjtICrLD0l6vZxle", "ScatterEffectController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function _C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.holderFront = undefined;
      u.holderBack = undefined;
      u.vfxA = undefined;
      u.vfxB1 = undefined;
      u.vfxB2 = undefined;
      u.vfxE = undefined;
      return u;
    }
    __extends(_C, k);
    _C.prototype.show = function (u = false) {
      this._fadeIn(u, this.holderFront);
      this._fadeIn(u, this.holderBack);
    };
    _C.prototype.hide = function (u = false) {
      this._fadeOut(u, this.holderFront);
      this._fadeOut(u, this.holderBack);
    };
    _C.prototype.reset = function () {
      if (this.holderFront.active) {
        this.stopSmoke();
        this.stopGlow();
        this.stopShine();
        this.hide(true);
      }
    };
    _C.prototype.playSmoke = function () {
      this.vfxA.node.active = true;
      this.vfxA.play();
    };
    _C.prototype.stopSmoke = function () {
      this.vfxA.stop();
      this.vfxA.setCurrentTime(0);
      this.vfxA.node.active = false;
    };
    _C.prototype.playShine = function () {
      var u = cc.rotateBy(20, 360).repeatForever();
      var c = cc.rotateBy(20, -360).repeatForever();
      this.vfxB1.active = true;
      this.vfxB2.active = true;
      this.vfxB1.stopAllActions();
      this.vfxB2.stopAllActions();
      this.vfxB1.runAction(u);
      this.vfxB2.runAction(c);
    };
    _C.prototype.stopShine = function () {
      this.vfxB1.stopAllActions();
      this.vfxB2.stopAllActions();
      this.vfxB1.active = false;
      this.vfxB2.active = false;
    };
    _C.prototype.playGlow = function () {
      var u = this;
      this.vfxE.active = true;
      this.vfxE.stopAllActions();
      this.vfxE.opacity = 0;
      this.vfxE.setScale(0.8);
      var c = cc.sequence(cc.spawn(cc.fadeIn(0.1), cc.scaleTo(0.2, 1)), cc.fadeOut(0.5), cc.callFunc(function () {
        u.vfxE.setScale(0.8);
      }), cc.delayTime(0.3));
      this.vfxE.runAction(c.repeatForever());
    };
    _C.prototype.stopGlow = function () {
      this.vfxE.stopAllActions();
      this.vfxE.active = false;
    };
    _C.prototype._fadeIn = function (u = false, c) {
      c.stopAllActions();
      c.opacity = 0;
      c.active = true;
      if (u) {
        c.opacity = 255;
      } else {
        c.runAction(cc.fadeIn(0.2));
      }
    };
    _C.prototype._fadeOut = function (u = false, c) {
      c.stopAllActions();
      if (u) {
        c.opacity = 0;
        c.active = false;
      } else {
        c.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
          c.active = false;
        })));
      }
    };
    __decorate([L(cc.Node)], _C.prototype, "holderFront", undefined);
    __decorate([L(cc.Node)], _C.prototype, "holderBack", undefined);
    __decorate([L(cc.Animation)], _C.prototype, "vfxA", undefined);
    __decorate([L(cc.Node)], _C.prototype, "vfxB1", undefined);
    __decorate([L(cc.Node)], _C.prototype, "vfxB2", undefined);
    __decorate([L(cc.Node)], _C.prototype, "vfxE", undefined);
    return __decorate([x], _C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}