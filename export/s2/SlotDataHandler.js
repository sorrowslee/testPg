if (!cc._RF.push(module, "c92e6Vflr1IcZlyJUaCowMg", "SlotDataHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = function () {
    function x() {
      this.slotViews = undefined;
      this.spinType = undefined;
      this.topBufferRow = undefined;
      this.bottomBufferRow = undefined;
      this.numberOfRow = undefined;
      this.numberOfColumn = undefined;
      this.getSymbolSize = undefined;
      this.getRandomSymbol = undefined;
      this.isStopping = undefined;
      this.formattedReelData = undefined;
      this.backupBufferedSymbol = undefined;
      this.bufferedEmptyItemInfo = undefined;
      this.formattedDataPositions = undefined;
    }
    x.prototype.init = function (L) {
      this.slotViews = L.slotViews;
      this.topBufferRow = L.topBufferRow ? L.topBufferRow : 0;
      this.bottomBufferRow = L.bottomBufferRow ? L.bottomBufferRow : 0;
      this.numberOfRow = L.numberOfRow;
      this.numberOfColumn = L.numberOfColumn;
      this.getSymbolSize = L.getSymbolSize;
      this.getRandomSymbol = L.getRandomSymbol;
      this.formattedDataPositions = [];
      this.bufferedEmptyItemInfo = [];
      for (var D = 0; D < L.numberOfColumn; D++) {
        this.formattedDataPositions[D] = -this.bottomBufferRow;
      }
      this.setSpinType(L.spinType);
      this.setReelData(L.reelData, L.largeSymbolDatas);
    };
    x.prototype.reset = function () {
      this.isStopping = false;
      this.bufferedEmptyItemInfo.length = 0;
      for (var L = 0; L < this.formattedDataPositions.length; L++) {
        this.formattedDataPositions[L] = -this.bottomBufferRow;
      }
    };
    x.prototype.setSpinType = function (L) {
      this.spinType = L;
    };
    x.prototype.setReelDataPosition = function (L, D) {
      this.isStopping = true;
      this.formattedDataPositions[L] = D - this.bottomBufferRow;
    };
    x.prototype.getReelDataPosition = function (L) {
      return this.formattedDataPositions[L] + this.bottomBufferRow;
    };
    x.prototype.getItemInfo = function (L, D) {
      var k = this.slotViews.indexOf(L);
      var C = this.bufferedEmptyItemInfo[k];
      if (C) {
        this.bufferedEmptyItemInfo[k] = undefined;
        return C;
      }
      var u = D;
      for (var c = this.getSymbol(k, u); c === undefined;) {
        u--;
        c = this.getSymbol(k, u);
      }
      if (c < 0) {
        return this.createEmptyItemInfo(-c, u);
      }
      var p = this.getSymbolSize;
      var j = p ? p(c) : cc.size(1, 1);
      var l = {
        positionIndex: u,
        symbolColumn: j.width,
        symbolRow: j.height,
        symbolIndex: c
      };
      return l;
    };
    x.prototype.setReelData = function (L, D) {
      for (var k = this.numberOfColumn, C = this.numberOfRow, j = this.topBufferRow, G = this.bottomBufferRow, V = this.spinType, Q = this.getRandomSymbol, N = G + C, Y = N + j, W = this.backupBufferedSymbol = [], q = 0; q < k; q++) {
        var S = W[q] = [];
        for (var z = 0; z < G; z++) {
          S[z] = Q(q, V, z, false, true, 1);
        }
        for (z = N; z < Y; z++) {
          S[z] = Q(q, V, z, false, true, 1);
        }
      }
      this.updateReelData(L, D);
    };
    x.prototype.updateReelData = function (L, D) {
      for (var k = this.numberOfColumn, C = this.numberOfRow, p = this.bottomBufferRow, j = this.backupBufferedSymbol, G = this.getSymbolSize, V = this.formattedReelData = [], Q = 0; Q < k; Q++) {
        var N = Q * C;
        var Y = __spread(j[Q]);
        Y.splice.apply(Y, __spread([p, C], L.slice(N, N + C).reverse()));
        V.push(Y);
      }
      if (G && D) {
        D.forEach(function (W) {
          W.sort(function (w, U) {
            return w - U;
          });
          var q;
          var S;
          var z = L[W[0]];
          var A = G(z);
          var M = Math.floor(W[0] / C);
          var E = W[0] % C;
          for (var F = 1; F < W.length; F++) {
            if (Math.floor(W[F] / C) !== M) {
              q = W[F - 1] % C;
              break;
            }
          }
          S = E === 0 ? C - q - 1 + p : C - E + p - A.height;
          F = 0;
          for (; F < A.width; F++) {
            var b = V[F + M];
            b[S] = F ? -A.height : z;
            for (var H = 1; H < A.height; H++) {
              b[H + S] = undefined;
            }
          }
        });
      }
    };
    x.prototype.getFormattedData = function (L) {
      return __spread(this.formattedReelData[L]);
    };
    x.prototype.overwriteFormattedData = function (L, D, n) {
      this.formattedReelData[L][D] = n;
    };
    x.prototype.getSymbol = function (L, D) {
      var k = this.formattedDataPositions[L];
      if (k !== undefined) {
        var C = this.formattedReelData[L];
        if (D >= k && D <= k + C.length - 1) {
          return C[D - k];
        }
      }
      var u = this.getSymbolSize;
      var c = 1;
      if (u) {
        for (var p = L + 1; p < this.numberOfColumn && !this.slotViews[p].isIndexVisible(D); p++) {
          c++;
        }
      }
      var j = this.getRandomSymbol(L, this.spinType, D, this.isStopping, false, c);
      if (u) {
        var G = u(j);
        for (p = 1; p < G.width; p++) {
          this.bufferedEmptyItemInfo[L + p] = this.createEmptyItemInfo(G.height, D);
        }
      }
      return j;
    };
    x.prototype.createEmptyItemInfo = function (L, D) {
      var n = {
        positionIndex: D,
        symbolColumn: 1,
        symbolRow: L,
        symbolIndex: -1
      };
      return n;
    };
    return x;
  }();
  exports.default = T;
  cc._RF.pop();
}