if (!cc._RF.push(module, "700eaXyznJAI7xsCZXMgAvg", "SimpleAnimationController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.anim = undefined;
      u._onCompleteCallback = undefined;
      return u;
    }
    __extends(C, k);
    // 銷毀時停止動畫並移除節點
    C.prototype.destroy = function () {
      this.anim.stop();
      this._onCompleteCallback = undefined;
      this.node.destroy();
      return k.prototype.destroy.call(this);
    };
    // 播放指定名稱的動畫
    C.prototype.play = function (u, c) {
      this.node.active = true;
      this._onCompleteCallback = c;
      this.anim.stop();
      this.anim.setCurrentTime(0);
      if (u) {
        this.anim.play(u);
      } else {
        this.anim.play();
      }
    };
    // 停止動畫並隱藏節點
    C.prototype.stop = function () {
      this.anim.stop();
      this.anim.setCurrentTime(0);
      this.node.active = false;
    };
    // 取得所有動畫片段
    C.prototype.getClips = function () {
      return this.anim.getClips();
    };
    // 動畫播放完成後執行回呼
    C.prototype.onAnimationComplete = function () {
      var u = this._onCompleteCallback;
      this._onCompleteCallback = undefined;
      if (u) {
        u();
      }
    };
    __decorate([L(cc.Animation)], C.prototype, "anim", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}