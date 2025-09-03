if (!cc._RF.push(module, "3383aiogiFCOKC9u2Q0E3sA", "SlotScrollerController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotScrollerController.spec");
  var x = require("AutomationDecorator");
  var L = cc._decorator.ccclass;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.slotViews = undefined;
      u.isEnded = true;
      u.slotState = undefined;
      u.pendingSlotState = undefined;
      u.scrollers = [];
      u.abortRunScroller = undefined;
      u.bindedRunScrollerAtIndex = undefined;
      return u;
    }
    __extends(C, k);
      // 元件啟用時處理待切換的狀態
      C.prototype.onEnable = function () {
      if (this.pendingSlotState !== undefined) {
        var u = this.pendingSlotState;
        this.pendingSlotState = undefined;
        var c = this.slotState;
        if (c !== u) {
          this.onStateChange(u, c);
        }
      }
    };
      // 元件停用時結束所有滾輪
      C.prototype.onDisable = function () {
      var u;
      var c;
      try {
        for (var p = __values(this.scrollers), j = p.next(); !j.done; j = p.next()) {
          var l = j.value;
          if (!l.isEnded) {
            l.end();
          }
        }
      } catch (V) {
        var G = {
          error: V
        };
        u = G;
      } finally {
        try {
          if (j && !j.done && (c = p.return)) {
            c.call(p);
          }
        } finally {
          if (u) {
            throw u.error;
          }
        }
      }
    };
      // 每幀更新所有滾輪並檢查是否結束
      C.prototype.update = function (j) {
      var G;
      var V;
      var Q;
      var N;
      if (this.isEnded) {
        try {
          for (var Y = __values(this.scrollers), W = Y.next(); !W.done; W = Y.next()) {
            if ((A = W.value) && A.update) {
              A.update(j);
            }
          }
        } catch (F) {
          var q = {
            error: F
          };
          G = q;
        } finally {
          try {
            if (W && !W.done && (V = Y.return)) {
              V.call(Y);
            }
          } finally {
            if (G) {
              throw G.error;
            }
          }
        }
      } else {
        var S = true;
        try {
          for (var z = __values(this.scrollers), f = z.next(); !f.done; f = z.next()) {
            var A;
            if (A = f.value) {
              if (A.update) {
                A.update(j);
              }
              if (!A.isEnded) {
                S = false;
              }
            }
          }
        } catch (b) {
          var M = {
            error: b
          };
          Q = M;
        } finally {
          try {
            if (f && !f.done && (N = z.return)) {
              N.call(z);
            }
          } finally {
            if (Q) {
              throw Q.error;
            }
          }
        }
        if (S) {
          this.isEnded = true;
          this.abortRunScroller = undefined;
          var E = this.callbacks.onSlotStateEnd;
          if (E) {
            E(this.slotState);
          }
        }
      }
    };
      // 初始化滾輪視圖與回呼
      C.prototype.init = function (u, c) {
      this.slotViews = u;
      this.callbacks = c;
      this.bindedRunScrollerAtIndex = this.runScrollerAtIndex.bind(this);
    };
      // 取得指定索引的滾輪
      C.prototype.scrollerAtIndex = function (u) {
      return this.scrollers[u];
    };
      // 查詢滾輪在陣列中的索引
      C.prototype.indexOfScroller = function (u) {
      return this.scrollers.indexOf(u);
    };
      // 取得目前的槽狀態
      C.prototype.getSlotState = function () {
      return this.slotState;
    };
      // 設定新的槽狀態並處理切換
      C.prototype.setSlotState = function (u) {
      if (this.enabledInHierarchy) {
        this.pendingSlotState = undefined;
        var c = this.slotState;
        if (c !== u) {
          this.onStateChange(u, c);
        }
      } else {
        this.pendingSlotState = u;
      }
    };
      // 強制結束目前狀態的滾輪
      C.prototype.endCurrentState = function () {
      var u;
      var c;
      var p = this.abortRunScroller;
      if (p) {
        this.abortRunScroller = undefined;
        p();
      }
      try {
        for (var j = __values(this.scrollers), l = j.next(); !l.done; l = j.next()) {
          var G = l.value;
          if (G) {
            G.end();
          }
        }
      } catch (Q) {
        var V = {
          error: Q
        };
        u = V;
      } finally {
        try {
          if (l && !l.done && (c = j.return)) {
            c.call(j);
          }
        } finally {
          if (u) {
            throw u.error;
          }
        }
      }
    };
      // 狀態切換時重建滾輪並執行回呼
      C.prototype.onStateChange = function (u, p) {
      var j = this.slotViews;
      var G = this.scrollers;
      var V = this.callbacks;
      if (V.willChangeSlotState) {
        V.willChangeSlotState(u, p);
      }
      var Q = this.abortRunScroller;
      if (Q) {
        this.abortRunScroller = undefined;
        Q();
      }
      for (var N = 0, Y = j.length; N < Y; N++) {
        var W = G[N];
        var q = V.getScroller(N, j[N], u, p, W);
        G[N] = q;
        if (W) {
          if (!W.isEnded) {
            W.end();
          }
          if (V.releaseScroller) {
            V.releaseScroller(N, W);
          }
        }
        if (q) {
          q.reset();
          this.isEnded = false;
        }
      }
      this.slotState = u;
      if (V.didChangeSlotState) {
        V.didChangeSlotState(u, p);
      }
      this.abortRunScroller = V.runScroller(u, this.bindedRunScrollerAtIndex);
    };
      // 執行指定索引的滾輪
      C.prototype.runScrollerAtIndex = function (u) {
      var c = this.scrollers[u];
      if (c) {
        c.run();
      }
    };
    __decorate([x.automationDec({
      func: T.onStateChange
    })], C.prototype, "onStateChange", null);
    return __decorate([L], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}