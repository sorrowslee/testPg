if (!cc._RF.push(module, "4a843d9tZpBC5Aag4RGjJxr", "AdapterEventEmitter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  require("AudioAdapterConstant");
  var x = function () {
    function D() {
      this._eventPool = Object.create(null);
      this._deferCallback = T.deferCallback(this);
    }
    // 設定一次性事件監聽器
    D.prototype.once = function (k, C, u) {
      this.on(k, C, u, true);
    };
    // 觸發指定事件並呼叫所有監聽函式
    D.prototype.emit = function (k, C, j, G = false) {
      var V = this._eventPool;
      var Q = V[k];
      Q ||= V[k] = [];
      var N = 0;
      var Y = function (z) {
        var f = Q[z];
        if (!f.id || f.id === C) {
          N = z;
          W._deferCallback(function () {
            var A = f.fn;
            if (A !== T.emptyFunc) {
              if (f.once) {
                this.off(k, A, f.id);
              }
              A(C, j);
            }
            if (z === N && C !== undefined && G) {
              this.off(C);
            }
          });
        }
      };
      var W = this;
      for (var q = 0, S = Q.length; q < S; q++) {
        Y(q);
      }
    };
    // 監聽指定事件
    D.prototype.on = function (k, C, u, c) {
      var p = this._eventPool;
      var j = p[k];
      j ||= p[k] = [];
      for (var G = 0, V = j.length; G < V; G++) {
        var Q = j[G];
        if (Q.fn === C) {
          if (Q.id === u) {
            return;
          }
          if (!u || !Q.id) {
            return;
          }
        }
      }
      var N = {
        id: u,
        fn: C,
        once: !!c
      };
      j.push(N);
    };
    // 取消事件監聽，可依事件或函式移除
    D.prototype.off = function (k, C, u) {
      if (k !== undefined) {
        switch (typeof k) {
          case "number":
            return this._offByFunction(undefined, k);
          case "function":
            return this._offByFunction(k, C);
          default:
            if (typeof C == "number") {
              u = C;
              C = undefined;
            }
            return this._offByEvent(k, C, u);
        }
      } else {
        for (var c in this._eventPool) {
          this._eventPool[c].length = 0;
        }
      }
    };
    // 依事件名稱移除監聽器
    D.prototype._offByEvent = function (k, C, u) {
      var c = this._eventPool[k];
      if (c) {
        if (C !== undefined || u !== undefined) {
          this._eventPool[k] = c.filter(function (p) {
            return L(p, C, u);
          });
        } else {
          c.length = 0;
        }
      }
    };
    // 依函式內容移除監聽器
    D.prototype._offByFunction = function (k, C) {
      for (var u in this._eventPool) {
        this._eventPool[u] = this._eventPool[u].filter(function (c) {
          return L(c, k, C);
        });
      }
    };
    return D;
  }();
  exports.default = x;
  cc._RF.pop();
}
// 依條件判斷是否移除指定監聽器
function L(D, k, C) {
  return !!C && C !== D.id || !!k && k !== D.fn || (D.fn = T.emptyFunc, false);
}