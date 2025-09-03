if (!cc._RF.push(module, "c55eeQvpvBJQ70BFU5konXG", "HitPassThrough")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  (function (C) {
    C._hitTest = "_hitTest";
  })(T ||= {});
  var k = function (C) {
    // 初始化穿透點與範圍
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.passPoint = cc.v2(0, 0);
      c.passSize = cc.size(0, 0);
      return c;
    }
    __extends(u, C);
    // 啟用時覆寫原本的碰撞測試，使指定區域可穿透
    u.prototype.onEnable = function () {
      var c = this;
      this._superHitTest = this.node[T._hitTest];
      this.node[T._hitTest] = function (j, G) {
        if (!c._superHitTest.call(this, j, G)) {
          return false;
        }
        var V = c.passPoint.x + this.x - c.passSize.width / 2;
        var Q = c.passPoint.y + this.y - c.passSize.height / 2;
        for (var N = this.getParent(); N !== null; N = N.parent) {
          V += N.x;
          Q += N.y;
        }
        var Y = c.passSize.width;
        var W = c.passSize.height;
        var q = j.x - V;
        var S = V + Y - j.x;
        var z = Q + W - j.y;
        var f = j.y - Q;
        return !(q >= 0) || !(S >= 0) || !(z >= 0) || !(f >= 0);
      };
    };
    // 停用時恢復原本的碰撞測試
    u.prototype.onDisable = function () {
      this.node[T._hitTest] = this._superHitTest;
      this._superHitTest = undefined;
    };
    __decorate([D(cc.Vec2)], u.prototype, "passPoint", undefined);
    __decorate([D(cc.Size)], u.prototype, "passSize", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}