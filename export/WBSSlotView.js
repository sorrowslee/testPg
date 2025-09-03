if (!cc._RF.push(module, "f475ch2f0lJopnD47jNyBtL", "WBSSlotView")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotView");
  var x = require("GameConstant");
  var L = function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C.slotViewIndex = 0;
      return C;
    }
    __extends(k, D);
    k.prototype.init = function (C) {
      var u = new cc.Node("slot_view");
      var c = x.SLOT_WIDTH;
      var p = x.SLOT_HEIGHT * x.NUMBER_OF_ROW_LIST[this.slotViewIndex];
      u.parent = this.holder;
      u.setPosition(cc.v2(this.offsetX, 0));
      u.setContentSize(c, p);
      this._slotViewNode = u;
      this.viewHeight = u.height;
      this.functionalRow = x.NUMBER_OF_ROW_LIST[this.slotViewIndex];
      this.symbolSize = C.symbolSize;
      this.getItem = C.getItem;
      this.releaseItem = C.releaseItem;
      this.sortBottomItemToFront = C.sortBottomItemToFront;
      this.reloadItemsToIndex(0);
    };
    Object.defineProperty(k.prototype, "slotViewNode", {
      get: function () {
        return this._slotViewNode;
      },
      enumerable: false,
      configurable: true
    });
    k.prototype.reloadItemsToIndex = function (C) {
      var u = this;
      var c = this.slotItems;
      var p = this.symbolSize;
      if (c.length) {
        c.forEach(function (V) {
          return u.releaseItem(u, V);
        });
        c.length = 0;
      }
      var j = c[0] = this.getItem(this, C);
      var l = j.positionIndex;
      var G = j.node;
      G.parent = this._slotViewNode;
      G.y = ((j.symbolRow - this.functionalRow) / 2 + l) * p.height;
      this.bottomIndex = l;
      this.topIndex = l + j.symbolRow - 1;
      this.accumulatedPositionY = -C * p.height;
      this.reviseVisibleItem();
    };
    k.prototype.addItemAtTop = function () {
      var C = this.symbolSize;
      var u = this.slotItems;
      var c = u[0];
      var p = this.topIndex + 1;
      var j = this.getItem(this, p);
      var l = j.node;
      l.parent = this._slotViewNode;
      l.y = c.node.y + (c.symbolRow + j.symbolRow) / 2 * C.height;
      u.unshift(j);
      j.positionIndex = p;
      this.topIndex += j.symbolRow;
      if (this.sortBottomItemToFront) {
        j.setZIndex(this.getBottomSlotIndex() - j.positionIndex);
      }
    };
    k.prototype.addItemAtBottom = function () {
      var C = this.symbolSize;
      var u = this.slotItems;
      var c = u[u.length - 1];
      var p = this.bottomIndex - 1;
      var j = this.getItem(this, p);
      var G = j.node;
      G.parent = this._slotViewNode;
      G.y = c.node.y - (c.symbolRow + j.symbolRow) / 2 * C.height;
      u.push(j);
      j.positionIndex = this.bottomIndex -= j.symbolRow;
      if (this.sortBottomItemToFront) {
        var V = this.getBottomSlotIndex();
        for (var Q = 0, N = u.length; Q < N; Q++) {
          u[Q].setZIndex(V - u[Q].positionIndex);
        }
      }
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}