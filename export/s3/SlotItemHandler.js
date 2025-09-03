if (!cc._RF.push(module, "cbfb0c2igtO8oHCc6bYN0xe", "SlotItemHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = function () {
    function x() {
      this.numberOfRow = undefined;
      this.functionalSlotItems = undefined;
    }
    x.prototype.init = function (L) {
      this.numberOfRow = L;
      this.functionalSlotItems = [];
    };
    x.prototype.reset = function () {
      this.functionalSlotItems.length = 0;
    };
    x.prototype.setSlotItem = function (L, D, k = 0) {
      var C = this.numberOfRow;
      var u = C - 1 - (D.positionIndex - k);
      if (D.symbolRow === 1 && D.symbolColumn === 1) {
        this.functionalSlotItems[L * this.numberOfRow + u] = D;
      } else {
        var p = Math.min(C - 1, u);
        var j = Math.max(0, u - D.symbolRow + 1);
        for (var G = L + D.symbolColumn - 1, V = L; V <= G; V++) {
          for (var Q = j; Q <= p; Q++) {
            this.functionalSlotItems[V * C + Q] = D;
          }
        }
      }
    };
    x.prototype.getSlotItems = function () {
      var L = [];
      for (var D = 0; D < arguments.length; D++) {
        L[D] = arguments[D];
      }
      var n = this.functionalSlotItems;
      if (L.length) {
        var k = [];
        L.forEach(function (C) {
          k.push(n[C]);
        });
        return k;
      }
      return __spread(n);
    };
    return x;
  }();
  exports.default = T;
  cc._RF.pop();
}