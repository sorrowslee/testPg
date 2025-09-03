if (!cc._RF.push(module, "a9e6d7qkYZPw5K5UPSZUUME", "DefaultStartScroller")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var x = {
    scrollCallback: undefined,
    maxSpeed: -5040,
    accelerateDuration: 0.15,
    accelerateFactor: 1.68,
    accelerateDistance: -378,
    bounceDistance: 60,
    bounceDuration: 0.15,
    bounceFactor: 1.84
  };
  var L = require("BaseScroller");
  var D = x;
  var k = function (C) {
    function u(c) {
      var p = C.call(this, __assign(__assign({}, D), c)) || this;
      p.accumulatedTime = 0;
      p.previousY = 0;
      p.bindedRunUpdate = undefined;
      p.bindedEndUpdate = undefined;
      p.bindedRunUpdate = p.runUpdate.bind(p);
      p.bindedEndUpdate = p.endUpdate.bind(p);
      return p;
    }
    __extends(u, C);
    u.prototype.onReset = function () {
      this.update = undefined;
    };
    u.prototype.onRun = function () {
      this.emitEvent(L.SCROLLER_EVENT.RUN);
      this.accumulatedTime = 0;
      this.previousY = 0;
      this.update = this.bindedRunUpdate;
    };
    u.prototype.onEnd = function () {
      this.update = this.bindedEndUpdate;
      this.emitEvent(L.SCROLLER_EVENT.END);
    };
    u.prototype.runUpdate = function (c) {
      var p = this.runtimeConfig;
      c = this.accumulatedTime += c;
      var j = p.bounceDuration;
      if (c <= j) {
        var l = 1 - Math.pow(1 - c / j, p.bounceFactor);
        var G = p.bounceDistance * l;
        p.scrollCallback(this, G - this.previousY);
        this.previousY = G;
        return;
      }
      c -= j;
      var V = p.accelerateDuration;
      if (c < V) {
        l = Math.pow(c / V, p.accelerateFactor);
        G = p.accelerateDistance * l + p.bounceDistance;
        p.scrollCallback(this, G - this.previousY);
        this.previousY = G;
        this.emitEvent(L.SCROLLER_EVENT.ACCELERATE, l);
        return;
      }
      this.emitEvent(L.SCROLLER_EVENT.ACCELERATE, 1);
      this.end();
    };
    u.prototype.endUpdate = function (c) {
      this.runtimeConfig.scrollCallback(this, c * this.runtimeConfig.maxSpeed);
    };
    return u;
  }(L.default);
  exports.default = k;
  cc._RF.pop();
}