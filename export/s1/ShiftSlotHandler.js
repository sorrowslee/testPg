if (!cc._RF.push(module, "ba321VG3GRG4IniSaffUCkG", "ShiftSlotHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("GameConstant");
  var L = require("AudioManager");
  var D = require("AudioConstant");
  var k = function () {
    function C(u) {
      this._slotHandler = u;
    }
    Object.defineProperty(C.prototype, "slowDropDelay", {
      set: function (u) {
        this._slowDropDelay = u;
      },
      enumerable: false,
      configurable: true
    });
    // 初始化轉輪掉落相關參數
    C.prototype.init = function (u) {
      this._slotItemHolder = u.slotItemHolder;
      this._slotViews = u.slotViews;
      this._slotItemPool = u.slotItemPool;
      this._numberOfRow = u.numberOfRow;
      this._symbolHeight = u.symbolSize.height;
      this._symbolSpawnSpacing = u.symbolSpawnSpacing;
      this._columnDropInterval = u.columnDropInterval;
      this._originalSlowDropDelay = u.slowDropDelay;
      this._slowDropDelay = this._originalSlowDropDelay;
      this._columnSlowDropInterval = u.columnSlowDropInterval;
      this._acceleration = u.acceleration;
      this._accelerationFactor = u.accelerationFactor;
      this._bounceDistance = u.bounceDistance;
      this._bounceDistanceFactor = u.bounceDistanceFactor;
      this._bounceDuraion = u.bounceDuraion;
      this._bounceFactor = u.bounceFactor;
      this._newSlotItemList = [];
      this._shouldPlayCollapseAudio = true;
    };
    // 重置慢速掉落延遲
    C.prototype.reset = function () {
      this._slowDropDelay = this._originalSlowDropDelay;
    };
    // 播放舊符號掉落動畫
    C.prototype.playDropOldItemsEffect = function (j, G) {
      var V = this._slotViews;
      var Q = this._symbolHeight;
      var N = this._slotHandler.isTurboMode();
      var Y = [];
      var W = [[], [], [], [], [], []];
      var q = 1;
      var z = 0;
      var A = 0;
      var M = function () {
        if (++z === q && G) {
          G();
        }
      };
      for (var E = 0; E < j.length; E++) {
        var F = j[E];
        W[x.SLOT_ITEM_COLUMN_MAP[F]].push(F);
      }
      for (var H = W.length - 1; H >= 0; H--) {
        if (W[H].length) {
          Y[H] = A;
          if (!N) {
            A += this._columnDropInterval;
          }
        }
      }
      H = 0;
      for (var w = W.length; H < w; H++) {
        if (W[H].length) {
          var U = V[H].getFunctionalItems();
          var B = Y[H];
          var P = 0;
          for (var X = U.length - 1; X >= 0; X--) {
            var J = U[X];
            if (J.visible) {
              if (P) {
                var Z0 = -Q * P;
                var Z1 = this._playCollapseSound.bind(this, false, 99, false);
                q++;
                J.node.stopAllActions();
                J.node.runAction(this._getDropAction(B, Z0, Z1, M));
              }
            } else {
              P += J.symbolRow;
            }
          }
        }
      }
      M();
    };
    // 播放新符號掉落動畫
    C.prototype.playDropNewItemsEffect = function (j) {
      var G = j.newData;
      var V = j.isSlowDrop;
      var Q = j.isHeartBeat;
      var N = j.callback;
      var Y = j.slowDropFadeOutCallback;
      var W = this._slotViews;
      var q = this._slotHandler.isTurboMode();
      var z = Q ? 2 : 0;
      var A = [];
      var M = 1;
      var E = 0;
      var F = 0;
      var H = function () {
        if (++E === M) {
          if (N) {
            N();
          }
        } else if (E === M - 1 && Y) {
          Y();
        }
      };
      for (var w = G.length - 1; w >= 0; w--) {
        if (G[w].length) {
          A[w] = F;
          if (!q) {
            F += this._columnDropInterval;
          }
        }
      }
      var U = F + this._slowDropDelay + z;
      w = 0;
      for (var B = G.length; w < B; w++) {
        var P = G[w];
        if (P.length) {
          var X = W[w].getFunctionalItems();
          var J = 0;
          for (var Z0 = X.length - 1; Z0 >= 0; Z0--) {
            var Z1 = X[Z0];
            if (!Z1.visible) {
              J += Z1.symbolRow;
            }
          }
          if (V) {
            A[w] = U;
            U += this._columnSlowDropInterval;
          }
          M += J;
          this._newItemsDrop(w, P, J, A[w], V, H);
        }
      }
      H();
    };
    // 從物件池取得新的符號
    C.prototype._getSlotItem = function (u) {
      var c = this._slotItemPool.getSlotItemCustom(u, false);
      this._newSlotItemList.push(c);
      return c;
    };
    // 釋放所有新取得的符號
    C.prototype.releaseAllSlotItem = function () {
      var u = this._slotItemPool;
      this._newSlotItemList.forEach(function (c) {
        return u.releaseSlotItemCustom(c);
      });
      this._newSlotItemList = [];
    };
    // 取得符號掉落的動作序列
    C.prototype._getDropAction = function (u, p, j, G) {
      var V = this;
      var Q = this._slotHandler.isTurboMode() ? this._acceleration * 5 : this._acceleration;
      var N = Math.sqrt(-p * 2 / Q);
      var Y = this._bounceDistance - p * this._bounceDistanceFactor;
      var W = (this._bounceDuraion + N * this._bounceDistanceFactor) * 0.5;
      if (u) {
        return cc.sequence(cc.delayTime(u), cc.moveBy(N, cc.v2(0, p)).easing(cc.easeIn(this._accelerationFactor)), cc.callFunc(function () {
          if (V._shouldPlayCollapseAudio) {
            j();
            V._shouldPlayCollapseAudio = false;
            T.delayCallback(0.05)(V._enableCollapseAudio.bind(V));
          }
        }), cc.moveBy(W, cc.v2(0, Y)).easing(cc.easeOut(this._bounceFactor)), cc.moveBy(W, cc.v2(0, -Y)).easing(cc.easeIn(this._bounceFactor)), cc.callFunc(G));
      } else {
        return cc.sequence(cc.moveBy(N, cc.v2(0, p)).easing(cc.easeIn(this._accelerationFactor)), cc.callFunc(function () {
          if (V._shouldPlayCollapseAudio) {
            j();
            V._shouldPlayCollapseAudio = false;
            T.delayCallback(0.05)(V._enableCollapseAudio.bind(V));
          }
        }), cc.moveBy(W, cc.v2(0, Y)).easing(cc.easeOut(this._bounceFactor)), cc.moveBy(W, cc.v2(0, -Y)).easing(cc.easeIn(this._bounceFactor)), cc.callFunc(G));
      }
    };
    // 將新符號加入並執行掉落
    C.prototype._newItemsDrop = function (j, G, V, Q, N, Y) {
      var W = this._slotViews;
      var q = this._symbolHeight;
      var z = this._symbolSpawnSpacing;
      var A = N ? q : q + z;
      var M = W[j];
      var E = x.SLOT_ITEM_ROW_TOP_POS[j];
      var F = q;
      var H = cc.v3(0, E + z + F);
      for (var w = 0, U = G.length; w < U; w++) {
        var B = U - 1 - w;
        var P = this._getSlotItem(G[B]);
        var X = P.node;
        M.slotViewNode.addChild(X);
        X.position = H.add(cc.v3(0, w * A));
        P.node.stopAllActions();
        X.zIndex = this._generateZIndex({
          columnNewDataCount: w,
          slotItemNode: X,
          slotItem: P,
          slotView: M
        });
        if (P.symbolIndex === x.SlotSymbols.Scatter) {
          P.playSpineIdle();
          P.playScatterIdle();
        }
        var J = -q * V - z * (w + 1) + q - F;
        var Z0 = this._playCollapseSound.bind(this, true, 99, false);
        if (N) {
          J = -q * V - z + q - F;
          Z0 = this._playCollapseSound.bind(this, true, w, true);
        }
        X.runAction(this._getDropAction(Q, J, Z0, Y));
      }
    };
    // 依符號類型生成層級
    C.prototype._generateZIndex = function (u) {
      var c = u.slotItemNode;
      var p = u.slotItem;
      var j = u.slotView;
      var l = u.columnNewDataCount;
      var G = c.zIndex;
      switch (p.symbolIndex) {
        case x.SlotSymbols.Wild:
          G *= 900;
          break;
        case x.SlotSymbols.Scatter:
          G *= 950;
      }
      return G + -j.slotViewIndex * 980 + -p.positionIndex + l;
    };
    // 允許再次播放崩落音效
    C.prototype._enableCollapseAudio = function () {
      this._shouldPlayCollapseAudio = true;
    };
    // 播放符號崩落音效
    C.prototype._playCollapseSound = function (u, c, p) {
      if (p) {
        if (c === 0) {
          L.playAudio(D.GENERAL_AUDIO.heartBeatSlowdrop.key);
        } else if (!u) {
          L.playAudio(D.GENERAL_AUDIO.symCollapse.key);
        }
      } else {
        L.playAudio(D.GENERAL_AUDIO.symCollapse.key);
      }
    };
    return C;
  }();
  exports.default = k;
  cc._RF.pop();
}