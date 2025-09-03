if (!cc._RF.push(module, "88c0bvJUDVGt4Zbi3DnKpmf", "NumberLabelControllerLite")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = cc.misc.lerp;
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function c() {
      var p = u !== null && u.apply(this, arguments) || this;
      p.label = undefined;
      p.rollDuration = 2;
      p.maxWidth = 0;
      p._isIncrement = false;
      p._time = 0;
      p._startValue = 0;
      p._endValue = 0;
      p._counting = false;
      return p;
    }
    __extends(c, u);
    // 播放數字滾動動畫
    c.prototype.play = function (p, j) {
      if (this._counting) {
        this.unschedule(this._calculateNumber);
        this._counting = false;
      }
      this._startValue = p;
      this._endValue = j;
      this._time = 0;
      this._counting = true;
      this._isIncrement = !(p > j);
      this.schedule(this._calculateNumber, 0);
    };
    // 跳到指定數字並停止滾動
    c.prototype.skip = function (p) {
      if (this._counting) {
        this.unschedule(this._calculateNumber);
        this._counting = false;
      }
      this.label.string = T.formatCurrency(p);
    };
    // 根據時間更新當前數值
    c.prototype._calculateNumber = function (p) {
      this._time += p;
      var j = this._time / this.rollDuration;
      j = j >= 1 ? 1 : 1 - Math.cos(j * Math.PI * 0.5);
      var G = x(this._startValue, this._endValue, j);
      if (this._isIncrement) {
        if (G >= this._endValue) {
          G = this._endValue;
          this.unschedule(this._calculateNumber);
          this._counting = false;
        }
      } else if (G <= this._endValue) {
        G = this._endValue;
        this.unschedule(this._calculateNumber);
        this._counting = false;
      }
      this.label.string = T.formatCurrency(G);
    };
    __decorate([k(cc.Label)], c.prototype, "label", undefined);
    __decorate([k(cc.Integer)], c.prototype, "rollDuration", undefined);
    __decorate([k(cc.Float)], c.prototype, "maxWidth", undefined);
    return __decorate([D], c);
  }(cc.Component);
  exports.default = C;
  cc._RF.pop();
}