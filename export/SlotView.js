if (!cc._RF.push(module, "dd04eu7yQpIx4UwS/QtQOjh", "SlotView")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SlotAnchor = undefined;
  var T;
  var x = cc._decorator.ccclass;
  (function (D) {
    D[D.BOTTOM = -1] = "BOTTOM";
    D[D.MIDDLE = 0] = "MIDDLE";
    D[D.TOP = 1] = "TOP";
  })(T = exports.SlotAnchor ||= {});
  var L = function () {
    function D(k, C = 0) {
      this.functionalRow = 0;
      this.symbolSize = undefined;
      this.viewHeight = 0;
      this.holder = undefined;
      this.offsetX = 0;
      this.sortBottomItemToFront = undefined;
      this.slotAnchor = T.MIDDLE;
      this.topIndex = 0;
      this.bottomIndex = 0;
      this.accumulatedPositionY = 0;
      this.slotItems = [];
      this.isDirty = true;
      this.bottomSlotIndex = undefined;
      this.holder = k;
      this.offsetX = C;
      this.viewHeight = k.height;
      k.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
    }
      // 初始化視圖的符號取得與配置
      D.prototype.init = function (k) {
      this.functionalRow = k.functionalRow;
      this.symbolSize = k.symbolSize;
      this.getItem = k.getItem;
      this.releaseItem = k.releaseItem;
      this.sortBottomItemToFront = k.sortBottomItemToFront;
      this.reloadItemsToIndex(0);
    };
      // 取得在可操作範圍內的符號項目
      D.prototype.getFunctionalItems = function () {
      var k;
      var C;
      var u = this.slotItems;
      for (var p = u.length, j = this.symbolSize.height * 0.5, G = this.functionalRow * j, V = 0; V < p; V++) {
        var Q = (N = u[V]).node.y - N.symbolRow * j;
        if (Q < G) {
          k = G - Q >= j ? V : V + 1;
          break;
        }
      }
      for (V = p - 1; V >= 0; V--) {
        var N;
        var Y = (N = u[V]).node.y + N.symbolRow * j;
        if (Y > -G) {
          C = Y + G > j ? V : V - 1;
          break;
        }
      }
      return u.slice(k, C + 1);
    };
      // 取得目前顯示中的所有符號
      D.prototype.getVisibleItems = function () {
      return this.slotItems;
    };
      // 取得累積的垂直位移
      D.prototype.getAccumulatedPositionY = function () {
      return this.accumulatedPositionY;
    };
      // 根據索引取得符號
      D.prototype.getItemAtIndex = function (k) {
      var C;
      var u;
      if (this.isIndexVisible(k)) {
        try {
          for (var c = __values(this.slotItems), p = c.next(); !p.done; p = c.next()) {
            var j = p.value;
            if (j.positionIndex <= k) {
              return j;
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
      }
    };
      // 計算下一個頂端索引
      D.prototype.getNextTopIndex = function (k) {
      return Math.max(this.topIndex + 1, this.getBottomSlotIndex() + this.functionalRow + k);
    };
      // 計算下一個底部索引
      D.prototype.getNextBottomIndex = function (k) {
      return Math.min(this.bottomIndex - 1, this.getBottomSlotIndex() - k - 1);
    };
      // 計算當前位置到指定索引的距離
      D.prototype.getDistanceToIndex = function (k) {
      var C = this.symbolSize.height;
      var u = this.getBottomSlotIndex();
      var c = this.getItemAtIndex(u);
      var p = (u - c.positionIndex - (c.symbolRow - 1) / 2) * C;
      var j = c.node.y + p;
      return (u - k) * C + ((1 - this.functionalRow) * 0.5 * C - j);
    };
      // 取得指定索引應有的累積位移
      D.prototype.getAccumulatedPositionAtIndex = function (k) {
      return this.symbolSize.height * -k;
    };
      // 取得水平方向偏移量
      D.prototype.getOffsetX = function () {
      return this.offsetX;
    };
      // 判斷索引是否在可視範圍內
      D.prototype.isIndexVisible = function (k) {
      return k >= this.bottomIndex && k <= this.topIndex;
    };
      // 設定可操作的行數並標記需要更新
      D.prototype.setFunctionalRow = function (k) {
      this.functionalRow = k;
      this.isDirty = true;
    };
      // 設定視圖的錨點位置
      D.prototype.setSlotAnchor = function (k) {
      this.slotAnchor = k;
    };
      // 改變所有符號的 Y 位置
      D.prototype.changePositionY = function (k) {
      this.accumulatedPositionY += k;
      var C = this.slotItems;
      for (var u = 0, c = C.length; u < c; u++) {
        C[u].node.y += k;
      }
      this.reviseVisibleItem();
    };
      // 重置符號索引以避免溢位
      D.prototype.resetPositionIndex = function () {
      var k = this.slotItems;
      var C = this.getBottomSlotIndex();
      k.forEach(function (u) {
        return u.positionIndex -= C;
      });
      this.topIndex -= C;
      this.bottomIndex -= C;
      this.accumulatedPositionY += C * this.symbolSize.height;
      this.isDirty = true;
    };
      // 捲動到指定索引位置
      D.prototype.scrollTo = function (k) {
      var C = this.getItemAtIndex(k);
      if (C) {
        var u = this.symbolSize.height;
        var c = (C.symbolRow - this.functionalRow) * 0.5 * u;
        var p = (k - C.positionIndex) * u;
        this.changePositionY(c - C.node.y - p);
      } else {
        this.reloadItemsToIndex(k);
      }
    };
      // 重新載入符號，預設從索引 0
      D.prototype.reloadItems = function (k = true) {
      if (k) {
        this.reloadItemsToIndex(0);
      } else {
        this.reloadItemsToIndex(this.getBottomSlotIndex());
      }
    };
      // 當容器尺寸改變時調整內容
      D.prototype.onSizeChanged = function () {
      var k = this.holder.height;
      if (this.viewHeight !== k) {
        var C = this.viewHeight;
        this.viewHeight = k;
        var u = this.slotAnchor;
        if (u) {
          var c = k - C;
          this.changePositionY(u * c / 2);
        } else {
          this.reviseVisibleItem();
        }
      }
    };
      // 從指定索引重新載入符號
      D.prototype.reloadItemsToIndex = function (k) {
      var C = this;
      var u = this.slotItems;
      var c = this.symbolSize;
      if (u.length) {
        u.forEach(function (G) {
          return C.releaseItem(C, G);
        });
        u.length = 0;
      }
      var p = u[0] = this.getItem(this, k);
      var j = p.positionIndex;
      var l = p.node;
      l.parent = this.holder;
      l.y = ((p.symbolRow - this.functionalRow) / 2 + j) * c.height;
      l.x = (p.symbolColumn - 1) / 2 * c.width + this.offsetX;
      this.bottomIndex = j;
      this.topIndex = j + p.symbolRow - 1;
      this.accumulatedPositionY = -k * c.height;
      this.reviseVisibleItem();
    };
      // 依視圖範圍增減符號項目
      D.prototype.reviseVisibleItem = function () {
      var k = this.slotItems;
      var C = this.symbolSize.height / 2;
      var u = this.viewHeight / 2 - 0.000005;
      var c = k[0];
      var p = k[k.length - 1];
      var j = false;
      if (c.node.y + c.symbolRow * C < u) {
        do {
          this.addItemAtTop();
          c = k[0];
        } while (c.node.y + c.symbolRow * C < u);
      } else if (c.node.y - c.symbolRow * C > u) {
        j = true;
      }
      if (p.node.y - p.symbolRow * C > -u) {
        do {
          this.addItemAtBottom();
          p = k[k.length - 1];
        } while (p.node.y - p.symbolRow * C > -u);
      } else if (p.node.y + p.symbolRow * C < -u) {
        do {
          this.removeItemAtBottom();
          p = k[k.length - 1];
        } while (p.node.y + p.symbolRow * C < -u);
      }
      if (j) {
        do {
          this.removeItemAtTop();
          c = k[0];
        } while (c.node.y - c.symbolRow * C > u);
      }
      this.isDirty = true;
    };
      // 在上方新增符號項目
      D.prototype.addItemAtTop = function () {
      var k = this.symbolSize;
      var C = this.slotItems;
      var u = C[0];
      var c = this.topIndex + 1;
      var p = this.getItem(this, c);
      var j = p.node;
      j.parent = this.holder;
      j.y = u.node.y + (u.symbolRow + p.symbolRow) / 2 * k.height;
      j.x = (p.symbolColumn - 1) / 2 * k.width + this.offsetX;
      C.unshift(p);
      p.positionIndex = c;
      this.topIndex += p.symbolRow;
      if (this.sortBottomItemToFront) {
        p.setZIndex(this.getBottomSlotIndex() - p.positionIndex);
      }
    };
      // 在下方新增符號項目
      D.prototype.addItemAtBottom = function () {
      var k = this.symbolSize;
      var C = this.slotItems;
      var u = C[C.length - 1];
      var c = this.bottomIndex - 1;
      var p = this.getItem(this, c);
      var j = p.node;
      j.parent = this.holder;
      j.y = u.node.y - (u.symbolRow + p.symbolRow) / 2 * k.height;
      j.x = (p.symbolColumn - 1) / 2 * k.width + this.offsetX;
      C.push(p);
      p.positionIndex = this.bottomIndex -= p.symbolRow;
      if (this.sortBottomItemToFront) {
        var G = this.getBottomSlotIndex();
        for (var V = 0, Q = C.length; V < Q; V++) {
          C[V].setZIndex(G - C[V].positionIndex);
        }
      }
    };
      // 移除頂端的符號
      D.prototype.removeItemAtTop = function () {
      var k = this.slotItems.shift();
      k.node.parent = undefined;
      this.topIndex -= k.symbolRow;
      this.releaseItem(this, k);
    };
      // 移除底部的符號
      D.prototype.removeItemAtBottom = function () {
      var k = this.slotItems;
      var C = k.pop();
      C.node.parent = undefined;
      this.bottomIndex += C.symbolRow;
      this.releaseItem(this, C);
      if (this.sortBottomItemToFront) {
        var u = this.getBottomSlotIndex();
        for (var c = 0, p = k.length; c < p; c++) {
          k[c].setZIndex(u - k[c].positionIndex);
        }
      }
    };
      // 計算目前最底部的索引
      D.prototype.getBottomSlotIndex = function () {
      if (!this.isDirty) {
        return this.bottomSlotIndex;
      }
      this.isDirty = false;
      var k = this.slotItems;
      var C = this.symbolSize.height * 0.5;
      var u = (1 - this.functionalRow) * C;
      for (var c = k.length - 1; c >= 0; c--) {
        var p = k[c];
        var j = p.node.y + p.symbolRow * C;
        if (j > u) {
          var l = Math.ceil((j - u) / this.symbolSize.height);
          return this.bottomSlotIndex = p.positionIndex + p.symbolRow - l;
        }
      }
      return -1;
    };
    return __decorate([x], D);
  }();
  exports.default = L;
  cc._RF.pop();
}