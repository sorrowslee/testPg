if (!cc._RF.push(module, "7368flklilIqbTH/SUVuGX/", "WBSSlotScrollerController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotScrollerController");
  var x = cc._decorator.ccclass;
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    // 組件被停用時確保所有滾動器停止
    k.prototype.onDisable = function () {
      var C;
      var u;
      try {
        for (var c = __values(this.scrollers), p = c.next(); !p.done; p = c.next()) {
          var j = p.value;
          if ((!j || !j.isEnded) && j !== undefined) {
            j.end();
          }
        }
      } catch (G) {
        var l = {
          error: G
        };
        C = l;
      } finally {
        try {
          if (p && !p.done && (u = c.return)) {
            u.call(c);
          }
        } finally {
          if (C) {
            throw C.error;
          }
        }
      }
    };
    return __decorate([x], k);
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}