if (!cc._RF.push(module, "d340fnEDFhAdrZNTN9LCKpM", "BonuceBackStopScroller")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("DefaultStopScroller");
  var x = require("BaseScroller");
  var L = function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C._easeCurve = undefined;
      return C;
    }
    __extends(k, D);
    // 開始運行捲動並計算減速與彈跳參數
    k.prototype.onRun = function () {
      this.emitEvent(x.SCROLLER_EVENT.RUN);
      var C = this.runtimeConfig;
      var u = this.endY = C.getStopDistance(this);
      var c = this.decelerateDistance = u;
      var p = this.decelerateDuration = c * 2 / (C.maxSpeed + C.endSpeed);
      this.halfDeceleration = (C.endSpeed - C.maxSpeed) / p / 2;
      this._easeCurve = cc.easeOut(C.bounceFactor);
      this.previousY = 0;
      this.notified = false;
      this.accumulatedTime = 0;
      this.update = this.bindedRunUpdate;
    };
    // 執行每幀更新，處理減速與彈跳效果
    k.prototype.runUpdate = function (C) {
      var u = this.runtimeConfig;
      C = this.accumulatedTime += C;
      var c = this.decelerateDuration;
      if (C < c) {
        var p = u.maxSpeed * C + this.halfDeceleration * C * C;
        u.scrollCallback(this, p - this.previousY);
        this.previousY = p;
        this.emitEvent(x.SCROLLER_EVENT.DECELERATE, 1 - C / c);
        return;
      }
      if (!this.notified) {
        this.notified = true;
        this.emitEvent(x.SCROLLER_EVENT.DECELERATE, 0);
      }
      C -= c;
      var j = u.bounceDuration;
      if (C < j) {
        var l = C / j;
        var G = this._easeCurve.easing((l < 0.5 ? l : 1 - l) * 2);
        p = this.decelerateDistance + u.bounceDistance * G;
        u.scrollCallback(this, p - this.previousY);
        this.previousY = p;
        return;
      }
      this.end();
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}