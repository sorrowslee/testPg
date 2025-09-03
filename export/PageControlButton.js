if (!cc._RF.push(module, "49dd983G1VDGoSnw7stgTlI", "PageControlButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Button");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.sprite = undefined;
      c.selectImg = undefined;
      c.normalImg = undefined;
      c.selectTintColor = undefined;
      c.normalTintColor = undefined;
      c.index = 0;
      c._isSelect = false;
      return c;
    }
    __extends(u, C);
    u.prototype.init = function () {
      if (this.selectImg) {
        this.sprite.SpriteFrame = this.normalImg;
      }
      this.normalColor = this.normalTintColor;
      this._isSelect = false;
    };
    u.prototype.setSelect = function () {
      if (!this._isSelect) {
        if (this.selectImg) {
          this.sprite.spriteFrame = this.selectImg;
        }
        this.normalColor = this.selectTintColor;
        this._isSelect = true;
      }
    };
    u.prototype.setUnselect = function () {
      if (this._isSelect) {
        if (this.selectImg) {
          this.sprite.spriteFrame = this.normalImg;
        }
        this.normalColor = this.normalTintColor;
        this._isSelect = false;
      }
    };
    u.prototype.selectDot = function () {
      if ((!this.delegate || !this.delegate.canChangePage || !!this.delegate.canChangePage()) && !this._isSelect) {
        if (this.selectImg) {
          this.sprite.spriteFrame = this.selectImg;
        }
        this.normalColor = this.selectTintColor;
        this._isSelect = true;
        if (this.delegate && this.delegate.didSelectDotAtIndex) {
          this.delegate.didSelectDotAtIndex(this.index);
        }
      }
    };
    __decorate([D(cc.Sprite)], u.prototype, "sprite", undefined);
    __decorate([D(cc.SpriteFrame)], u.prototype, "selectImg", undefined);
    __decorate([D(cc.SpriteFrame)], u.prototype, "normalImg", undefined);
    __decorate([D(cc.Color)], u.prototype, "selectTintColor", undefined);
    __decorate([D(cc.Color)], u.prototype, "normalTintColor", undefined);
    __decorate([D(cc.Integer)], u.prototype, "index", undefined);
    return __decorate([L], u);
  }(T.default);
  exports.default = k;
  cc._RF.pop();
}