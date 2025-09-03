if (!cc._RF.push(module, "ff7d0/y5MdPn5g0ygeMX3C8", "WBSSlotDataHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotDataHandler");
  var x = require("GameConstant");
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    k.prototype.setReelData = function (C) {
      for (var j = this.numberOfColumn, G = this.topBufferRow, V = this.bottomBufferRow, Q = this.spinType, N = this.getRandomSymbol, Y = this.backupBufferedSymbol = [], W = 0; W < j; W++) {
        var q = Y[W] = [];
        for (var S = 0; S < V; S++) {
          q[S] = N(W, Q, S, false, true, 1);
        }
        var z = V + x.NUMBER_OF_ROW_LIST[W];
        var f = z + G;
        for (S = z; S < f; S++) {
          q[S] = N(W, Q, S, false, true, 1);
        }
      }
      this.updateReelData(C);
    };
    k.prototype.updateReelData = function (C) {
      for (var u = this.numberOfColumn, p = this.bottomBufferRow, j = this.backupBufferedSymbol, G = this.formattedReelData = [], V = 0; V < u; V++) {
        var Q = x.NUMBER_OF_ROW_LIST[V];
        var N = x.COLUMN_START_INDEX[V];
        var Y = __spread(j[V]);
        Y.splice.apply(Y, __spread([p, Q], C.slice(N, N + Q).reverse()));
        G.push(Y);
      }
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}