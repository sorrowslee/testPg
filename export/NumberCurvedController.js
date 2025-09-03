if (!cc._RF.push(module, "22ff3ETL9NJ6LV0gfCqckfH", "NumberCurvedController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberDisplayController");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.curveness = 0.1;
      return c;
    }
    __extends(u, C);
    u.prototype.dequeueNumberContainer = function (c) {
      var p = this.numberContainer.children[c];
      if (!p) {
        (p = new cc.Node("container")).width = this.nodeNumberWidth;
        this.numberContainer.addChild(p);
        var j = new cc.Node("numberSprite");
        j.addComponent(cc.Sprite);
        p.addChild(j);
      }
      return p;
    };
    u.prototype.displayNumber = function (p, j = true, G) {
      C.prototype.displayNumber.call(this, p, j, G);
      this._layout.updateLayout();
      var V = 0;
      this.numberContainer.children.forEach(function (z) {
        V += z.width;
      });
      for (var Q = 0; Q < this.numberContainer.children.length; Q++) {
        var N = this.dequeueNumberContainer(Q);
        var Y = V / 2;
        var W = (100 / Math.abs(this.curveness) + Y) / this.numberContainer.scale;
        var q = undefined;
        var S = undefined;
        if (this.curveness > 0) {
          q = Math.sqrt(Math.pow(W, 2) - Math.pow(N.x, 2));
          S = Math.atan2(Math.abs(q), N.x) * 180 / Math.PI;
          N.angle = -(90 - S);
        } else if (this.curveness < 0) {
          q = Math.sqrt(Math.pow(W, 2) + Math.pow(N.x, 2));
          S = Math.atan2(Math.abs(q), N.x) * 180 / Math.PI;
          N.angle = 90 - S;
        } else {
          N.angle = 0;
        }
        N.y = q - W;
      }
    };
    __decorate([D({
      min: -10,
      max: 10,
      slide: true,
      tooltip: false,
      type: cc.Float
    })], u.prototype, "curveness", undefined);
    return __decorate([L], u);
  }(T.default);
  exports.default = k;
  cc._RF.pop();
}