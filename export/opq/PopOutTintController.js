if (!cc._RF.push(module, "58b31+llD1BAb9tUvY4+l2s", "PopOutTintController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = {
    positionX: 0,
    positionY: 0,
    width: 1080,
    height: 2340,
    color: cc.Color.BLACK,
    opacityFadeTo: 150,
    defaultOpacity: 0,
    fadeInDuration: 0.2,
    fadeOutDuration: 0.2
  };
  var L = x;
  var D = cc._decorator.ccclass;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c._fadeTo = 0;
      c._fadeInDuration = 0.2;
      c._fadeOutDuration = 0.2;
      return c;
    }
    __extends(u, C);
      u.prototype.unuse = function () {
        // 釋放物件時重置透明度
        this.node.opacity = 0;
      };
      u.prototype.reuse = function () {
        // 重新使用時重置透明度
        this.node.opacity = 0;
      };
      u.prototype.setup = function (c) {
        // 設定遮罩位置、尺寸與顏色
        var p = __assign(__assign({}, L), c);
        this.node.setPosition(p.positionX, p.positionY);
        this.node.setContentSize(p.width, p.height);
        this.node.color = p.color;
        this.node.opacity = this._defaultOpacity = p.defaultOpacity;
        this._fadeTo = p.opacityFadeTo;
        this._fadeInDuration = p.fadeInDuration;
        this._fadeOutDuration = p.fadeOutDuration;
      };
      u.prototype.show = function (c) {
        // 淡入顯示遮罩
        var p = this;
        if (this._isShow) {
          if (c) {
            c();
          }
        } else {
          this.node.stopAllActions();
          this.node.runAction(cc.sequence(cc.fadeTo(this._fadeInDuration, this._fadeTo), cc.callFunc(function () {
            p._isShow = true;
            if (c) {
              c();
            }
          })));
        }
      };
      u.prototype.hide = function (c) {
        // 淡出隱藏遮罩
        this._isShow = false;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.fadeTo(this._fadeOutDuration, this._defaultOpacity), cc.callFunc(function () {
          if (c) {
            c();
          }
        })));
      };
      u.prototype.destroy = function () {
        // 銷毀節點
        this.node.destroy();
        C.prototype.destroy.call(this);
      };
    return __decorate([D], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}