if (!cc._RF.push(module, "0b006l9a0tOS5No6bQvo8YJ", "DrawLine")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.horizontal = true;
      u.vertical = false;
      return u;
    }
    __extends(C, k);
    // 初始化繪圖元件並監聽尺寸變化
    C.prototype.onLoad = function () {
      this.graphics = this.node.addComponent(cc.Graphics);
      this._drawLine();
      this.node.on("size-changed", this._drawLine, this);
    };
    // 依節點尺寸繪製水平或垂直線條
    C.prototype._drawLine = function () {
      var u;
      var c;
      this.graphics.clear();
      if (this.horizontal) {
        u = -this.node.width * this.node.anchorX;
        c = this.node.width - this.node.width * this.node.anchorX;
        this.graphics.moveTo(u, this.node.height / 2);
        this.graphics.lineTo(c, this.node.height / 2);
      } else {
        u = this.node.height * this.node.anchorX;
        c = this.node.height * this.node.anchorX - this.node.height;
        this.graphics.moveTo(this.node.width / 2, u);
        this.graphics.lineTo(this.node.width / 2, c);
      }
      this.graphics.stroke();
    };
    // 解除事件監聽並清除線條
    C.prototype.onDestroy = function () {
      this.node.off("size-changed", this._drawLine, this);
      this.graphics.clear();
    };
    __decorate([L(cc.Boolean)], C.prototype, "horizontal", undefined);
    __decorate([L(cc.Boolean)], C.prototype, "vertical", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}