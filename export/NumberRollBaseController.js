if (!cc._RF.push(module, "b940fHCDN9PkIykJo0EuNqR", "NumberRollBaseController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberDisplayInterface");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.rollDuration = 2;
      c.displayController = undefined;
      c._startValue = 0;
      c._maxValue = 0;
      c._duration = 0;
      c._time = 0;
      return c;
    }
    __extends(u, C);
    // 載入時先停用元件
    u.prototype.onLoad = function () {
      this.enabled = false;
    };
    // 從起始值滾動到目標值
    u.prototype.play = function (c, p, j, l = true) {
      if (!(p < 0) && !(c < 0)) {
        if (c === p) {
          if (l) {
            this.displayController.clear();
          }
          this.displayController.displayNumber(p, true, j);
          return;
        }
        this._onComplete = j;
        this._startValue = c;
        this._maxValue = p;
        this._duration = this.rollDuration;
        this._time = 0;
        if (l) {
          this.displayController.clear();
        }
        this.displayController.displayNumber(c, false);
        this.enabled = true;
      }
    };
    // 直接跳到最終數值
    u.prototype.skip = function () {
      var c = this;
      if (this.enabled) {
        this.stop(false);
        this.displayController.displayNumber(this._maxValue, true, function () {
          var p = c._onComplete;
          c._onComplete = undefined;
          if (p) {
            p();
          }
        });
      }
    };
    // 停止滾動動畫
    u.prototype.stop = function (c) {
      this.enabled = false;
      if (c) {
        this.displayController.clear();
        this._onComplete = undefined;
      }
    };
    // 更新當前數值並檢查是否完成
    u.prototype.update = function (c) {
      var p = this;
      this._time += c;
      var j = this._time / this._duration;
      if (j >= 1) {
        this.stop(false);
        this.displayController.displayNumber(this._maxValue, true, function () {
          var G = p._onComplete;
          p._onComplete = undefined;
          if (G) {
            G();
          }
        });
      } else {
        j = 1 - Math.cos(j * Math.PI * 0.5);
        var l = cc.misc.lerp(this._startValue, this._maxValue, j);
        this.displayController.displayNumber(l, false);
      }
    };
    __decorate([D(cc.Integer)], u.prototype, "rollDuration", undefined);
    __decorate([D({
      override: true,
      type: T.default
    })], u.prototype, "displayController", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}