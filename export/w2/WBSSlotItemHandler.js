if (!cc._RF.push(module, "3168eVYZ8VEEpk3F9fRKIUL", "WBSSlotItemHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotItemHandler");
  var x = require("GameConstant");
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    // 將符號依大小填入功能性陣列
    k.prototype.setSlotItem = function (C, j, G = 0) {
      var V = x.NUMBER_OF_ROW_LIST[C];
      var Q = V - 1 - (j.positionIndex - G);
      if (j.symbolRow === 1 && j.symbolColumn === 1) {
        var N = x.COLUMN_START_INDEX[C] + Q;
        this.functionalSlotItems[N] = j;
      } else {
        var Y = Math.min(V - 1, Q);
        var W = Math.max(0, Q - j.symbolRow + 1);
        for (var q = C + j.symbolColumn - 1, S = C; S <= q; S++) {
          for (var z = W; z <= Y; z++) {
            this.functionalSlotItems[S * V + z] = j;
          }
        }
      }
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}