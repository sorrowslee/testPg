if (!cc._RF.push(module, "b5c97V/nrtGXLgW0wUdIJa2", "MultiplierShiftHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("MultiplierController");
  var x = require("WBSGameUtils");
  var L = function () {
    function D() {
      this._multiplierContainer = undefined;
      this._getMultiplierItems = undefined;
      this._createMultiplier = undefined;
    }
    // 初始化位移處理器，設置倍數容器與生成方法
    D.prototype.init = function (k) {
      this._multiplierContainer = k.multiplierItemContainer;
      this._getMultiplierItems = k.getMultiplierItems;
      this._createMultiplier = k.createMultiplier;
    };
    // 播放倍數向右移動的動畫
    D.prototype.playShiftRight = function (k, C, j) {
      var G = this._getMultiplierItems();
      var V = 0;
      var Q = 0;
      var N = [];
      var Y = function () {
        if (V === ++Q && j) {
          j();
        }
      };
      var W = function (f) {
        V++;
        var A = C[f];
        var M = f;
        var E = k.includes(A) ? k.indexOf(A) : -1;
        var F = G[M].node;
        var b = T.MULTIPLIER_T[M];
        var H = T.MULTIPLIER_T[E] !== undefined ? T.MULTIPLIER_T[E] : 0;
        x.lerpTo(function (w, U) {
          if (f === 3) {
            T.MULTIPLIER_DESELECTED_SIZE;
          } else if (f === 2) {
            U * 0.4;
            T.MULTIPLIER_SELECTED_SIZE;
          }
          var B = U * U * U;
          w = cc.misc.lerp(b, H, B);
          var P = T.curveTo(w);
          F.setPosition(P.x, P.y, 0);
          if (w === H) {
            Y();
          }
        }, b, H, 0.15);
      };
      for (var q = 0; q < C.length; q++) {
        W(q);
      }
      k.forEach(function (f) {
        if (!C.includes(f) && f !== -1) {
          N.push(f);
        }
      });
      function S(f) {
        V++;
        var A = 5 + f;
        var M = 4 - f;
        var E = z._createMultiplier(N[f], A).node;
        var F = T.curveTo(1);
        var b = T.MULTIPLIER_T[M];
        E.setPosition(F.x, F.y, 0);
        x.lerpTo(function (H, w) {
          var U = w * w * w;
          H = cc.misc.lerp(1, b, U);
          var B = T.curveTo(H);
          E.setPosition(B.x, B.y, 0);
          if (H === b) {
            Y();
          }
        }, 1, b, 0.15);
      }
      var z = this;
      for (q = 0; q < N.length; q++) {
        S(q);
      }
    };
    // 播放倍數向左移動的動畫
    D.prototype.playShiftLeft = function (k, C, j) {
      var G = this._getMultiplierItems();
      var V = 0;
      var Q = 0;
      var N = [];
      var Y = function () {
        if (V === ++Q && j) {
          j();
        }
      };
      var W = function (f) {
        V++;
        var A = C[f];
        var M = f;
        var E = k.includes(A) ? k.indexOf(A) : -1;
        var F = G[M].node;
        var b = T.MULTIPLIER_T[M];
        var H = T.MULTIPLIER_T[E] !== undefined ? T.MULTIPLIER_T[E] : 1;
        x.lerpTo(function (w, U) {
          var B = U * U * U;
          w = cc.misc.lerp(b, H, B);
          var P = T.curveTo(w);
          F.setPosition(P.x, P.y, 0);
          if (w === H) {
            Y();
          }
        }, b, H, 0.075);
      };
      for (var q = 0; q < C.length; q++) {
        W(q);
      }
      k.forEach(function (f) {
        if (!C.includes(f) && f !== -1) {
          N.unshift(f);
        }
      });
      function S(f) {
        V++;
        var A = -1 - f;
        var M = 0 + f;
        var E = z._createMultiplier(N[f], A).node;
        var F = T.curveTo(0);
        var b = T.MULTIPLIER_T[M];
        E.setPosition(F.x, F.y, 0);
        x.lerpTo(function (H, w) {
          var U = w * w * w;
          H = cc.misc.lerp(0, b, U);
          var B = T.curveTo(H);
          E.setPosition(B.x, B.y, 0);
          if (H === b) {
            Y();
          }
        }, 0, b, 0.075);
      }
      var z = this;
      for (q = 0; q < N.length; q++) {
        S(q);
      }
    };
    // 設定被選取倍數的縮放比例
    D.prototype._setSelectedMultiplierNodeScale = function (k) {
      var C = k.multiplierNumber;
      var u = T.SELECTED_MULTIPLIER_SIZE_MAP[C];
      k.node.setScale(u);
    };
    // 設定未選取倍數的縮放比例
    D.prototype._setDeselectedMultiplierNodeScale = function (k) {
      var C = k.multiplierNumber;
      var u = T.DESELECTED_MULTIPLIER_SIZE_MAP[C];
      k.node.setScale(u);
    };
    return D;
  }();
  exports.default = L;
  cc._RF.pop();
}