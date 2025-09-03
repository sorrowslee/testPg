if (!cc._RF.push(module, "080a20w+h1E6aNSIb84n3TU", "DefaultStopScroller")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = {
    scrollCallback: undefined,
    getStopDistance: undefined,
    maxSpeed: -5040,
    endSpeed: -4680,
    bounceDistance: -60,
    bounceDuration: 0.15,
    bounceFactor: 1.84
  };
  var L = require("BaseScroller");
  var D = x;
  var k = function (C) {
    function u(c) {
      var p = C.call(this, __assign(__assign({}, D), c)) || this;
      p.changeSpeedDuration = 0;
      p.changeSpeedTimer = 0;
      p.previousMaxSpeed = 0;
      p.accumulatedTime = 0;
      p.previousY = 0;
      p.endY = 0;
      p.decelerateDistance = 0;
      p.decelerateDuration = 0;
      p.halfDeceleration = 0;
      p.notified = false;
      p.bindedIdleUpdate = undefined;
      p.bindedRunUpdate = undefined;
      p.bindedIdleUpdate = p.idleUpdate.bind(p);
      p.bindedRunUpdate = p.runUpdate.bind(p);
      return p;
    }
    __extends(u, C);
    // 重置停止滾動器的狀態
    u.prototype.onReset = function () {
      this.endY = 0;
      this.previousY = 0;
      this.changeSpeedDuration = 0;
      this.notified = false;
      this.update = this.bindedIdleUpdate;
    };
    // 開始計算減速與回彈流程
    u.prototype.onRun = function () {
      this.emitEvent(L.SCROLLER_EVENT.RUN);
      var c = this.runtimeConfig;
      var p = this.endY = c.getStopDistance(this);
      var j = this.decelerateDistance = p + c.bounceDistance;
      var l = this.decelerateDuration = j * 2 / (c.maxSpeed + c.endSpeed);
      this.halfDeceleration = (c.endSpeed - c.maxSpeed) / l / 2;
      this.previousY = 0;
      this.notified = false;
      this.accumulatedTime = 0;
      this.update = this.bindedRunUpdate;
    };
    // 結束滾動並補齊最後位移
    u.prototype.onEnd = function () {
      if (!this.notified) {
        this.notified = true;
        this.emitEvent(L.SCROLLER_EVENT.DECELERATE, 0);
      }
      var c = this.endY;
      if (c === 0) {
        c = this.runtimeConfig.getStopDistance(this);
      }
      var p = c - this.previousY;
      if (p) {
        this.runtimeConfig.scrollCallback(this, p);
      }
      this.update = undefined;
      this.emitEvent(L.SCROLLER_EVENT.END);
    };
    // 停止狀態下持續以最大速度滾動，可調整速度
    u.prototype.idleUpdate = function (c) {
      var p = this.changeSpeedDuration;
      if (p) {
        var j = this.changeSpeedTimer += c;
        if (!(j >= p)) {
          var l = this.previousMaxSpeed;
          var G = l + (this.runtimeConfig.maxSpeed - l) * j / p;
          this.runtimeConfig.scrollCallback(this, c * G);
          return;
        }
        this.changeSpeedDuration = 0;
      }
      this.runtimeConfig.scrollCallback(this, c * this.runtimeConfig.maxSpeed);
    };
    // 執行減速與彈跳位移計算
    u.prototype.runUpdate = function (c) {
      var p = this.runtimeConfig;
      c = this.accumulatedTime += c;
      var j = this.decelerateDuration;
      if (c < j) {
        var l = p.maxSpeed * c + this.halfDeceleration * c * c;
        p.scrollCallback(this, l - this.previousY);
        this.previousY = l;
        this.emitEvent(L.SCROLLER_EVENT.DECELERATE, 1 - c / j);
        return;
      }
      if (!this.notified) {
        this.notified = true;
        this.emitEvent(L.SCROLLER_EVENT.DECELERATE, 0);
      }
      c -= j;
      var G = p.bounceDuration;
      if (c < G) {
        var V = 1 - Math.pow(1 - c / G, p.bounceFactor);
        l = this.decelerateDistance - p.bounceDistance * V;
        p.scrollCallback(this, l - this.previousY);
        this.previousY = l;
        return;
      }
      this.end();
    };
    // 取得減速所需的時間
    u.prototype.getDecelerateDuration = function () {
      return this.decelerateDuration;
    };
    // 動態調整待機時的滾動速度
    u.prototype.changeIdleSpeed = function (c, p) {
      var j = this.runtimeConfig;
      this.previousMaxSpeed = j.maxSpeed;
      j.maxSpeed = p;
      this.changeSpeedDuration = c;
      this.changeSpeedTimer = 0;
    };
    return u;
  }(L.default);
  exports.default = k;
  cc._RF.pop();
}