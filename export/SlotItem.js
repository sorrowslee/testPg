if (!cc._RF.push(module, "cba1dJ8KHJAlrAxCvyls0+u", "SlotItem")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotSymbol");
  var x = cc._decorator.ccclass;
  var L = function (D) {
    function _k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C.positionIndex = 0;
      C.sprite = undefined;
      C.normalSpriteFrame = undefined;
      C.blurSpriteFrame = undefined;
      C.normalScale = undefined;
      C.blurScale = undefined;
      C.getSymbolZOrder = undefined;
      return C;
    }
    __extends(_k, D);
    Object.defineProperty(_k.prototype, "visible", {
      get: function () {
        return this.sprite && this.sprite.node.active;
      },
      set: function (C) {
        if (this.sprite) {
          this.sprite.node.active = C;
        }
      },
      enumerable: false,
      configurable: true
    });
    _k.prototype.init = function (C) {
      this.sprite = C.sprite;
      var u = this.normalScale = C.normalScale === undefined ? 1 : C.normalScale;
      this.blurScale = C.blurScale === undefined ? u : C.blurScale;
      this.getSymbolZOrder = C.getSymbolZOrder;
    };
    _k.prototype.setup = function (C, u, c, p = false) {
      this.symbolIndex = C;
      this.normalSpriteFrame = u;
      this.blurSpriteFrame = c;
      this.zOrder = this.getSymbolZOrder ? this.getSymbolZOrder(C) : 0;
      this.setZIndex();
      this.setBlur(p);
    };
    _k.prototype.setZIndex = function (C = 0) {
      this.node.zIndex = C + this.zOrder * 100;
    };
    _k.prototype.unuse = function () {
      this.normalSpriteFrame = undefined;
      this.blurSpriteFrame = undefined;
      this.visible = true;
      D.prototype.unuse.call(this);
    };
    _k.prototype.setBlur = function (C) {
      var u = this.sprite;
      if (u) {
        u.spriteFrame = C ? this.blurSpriteFrame : this.normalSpriteFrame;
        u.node.scale = C ? this.blurScale : this.normalScale;
      }
    };
    return __decorate([x], _k);
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}