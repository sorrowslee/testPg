if (!cc._RF.push(module, "0a573tIV9xKS4qfPLe+tVuo", "Button")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var L = cc.Enum({
    _transitionFinished: "_transitionFinished",
    _fromColor: "_fromColor",
    _toColor: "_toColor",
    _fromScale: "_fromScale",
    _toScale: "_toScale",
    _pressed: "_pressed"
  });
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (c) {
    function p() {
      var j = c !== null && c.apply(this, arguments) || this;
      j.targetCascadeOpacity = false;
      j._touchBeganPosition = undefined;
      return j;
    }
    __extends(p, c);
    // 處理顏色或縮放的過渡動畫
    p.prototype.update = function (j) {
      var l = this.target;
      if (!this[L._transitionFinished] && (this.transition === cc.Button.Transition.COLOR || this.transition === cc.Button.Transition.SCALE)) {
        this.time += j;
        var G;
        var V;
        var Q;
        var N = 1;
        if (this.duration > 0) {
          N = this.time / this.duration;
        }
        if (N >= 1) {
          N = 1;
          this[L._transitionFinished] = true;
        }
        if (this.transition === cc.Button.Transition.COLOR) {
          this[L._fromColor].a = l.opacity;
          var Y = this[L._fromColor].lerp(this[L._toColor], N);
          l.opacity = Y.a;
          Y.a = 255;
          l.color = Y;
        } else if (this.transition === cc.Button.Transition.SCALE) {
          G = this[L._fromScale];
          V = this[L._toScale];
          Q = N;
          l.scale = cc.misc.lerp(G, V, Q);
        }
      }
    };
    // 記錄觸控開始位置
    p.prototype._onTouchBegan = function (j) {
      this._touchBeganPosition = this.node.parent.convertToWorldSpaceAR(j.touch.getLocation());
      c.prototype._onTouchBegan.call(this, j);
    };
    // 觸控移動過遠時取消按下狀態
    p.prototype._onTouchMove = function (j) {
      var l;
      if (this[L._pressed]) {
        l = this.node.parent.convertToWorldSpaceAR(j.touch.getLocation());
        if (this._touchBeganPosition.sub(l).mag() > 50) {
          this[L._pressed] = false;
          this._touchBeganPosition = undefined;
        }
      } else {
        this._touchBeganPosition = undefined;
      }
      c.prototype._onTouchMove.call(this, j);
    };
    __decorate([C(cc.Boolean)], p.prototype, "targetCascadeOpacity", undefined);
    return __decorate([k], p);
  }(cc.Button);
  exports.default = u;
  cc._RF.pop();
}