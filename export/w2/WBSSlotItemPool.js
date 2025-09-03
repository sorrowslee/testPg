if (!cc._RF.push(module, "b8868DBPEVIw59FVOxfxBZt", "WBSSlotItemPool")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("WBSSlotItemController");
  var x = require("SlotItemPool");
  var L = require("NodePoolHandler");
  var D = require("GameConstant");
  var k = function (C) {
    function u() {
      return C !== null && C.apply(this, arguments) || this;
    }
    __extends(u, C);
    u.prototype.init = function (c) {
      this.slotItemConstructor = c.slotItem;
      this.normalSpriteFrames = c.normalSpriteFrame;
      this.blurSpriteFrames = c.blurSpriteFrame ? c.blurSpriteFrame : c.normalSpriteFrame;
      this.normalScale = c.normalScale === undefined ? 1 : c.normalScale;
      this.blurScale = c.blurScale === undefined ? 1 : c.blurScale;
      this.getSymbolZOrder = c.getSymbolZOrder;
    };
    u.prototype.getSlotItem = function (p, j = false, G = 0, V = 0) {
      var Q = L.nodePoolHandler.dequeueReusableItem(D.NodePoolName.SlotItem).getComponent(T.default);
      var N = Q.content;
      var Y = {
        sprite: N,
        normalScale: this.normalScale,
        blurScale: this.blurScale,
        getSymbolZOrder: this.getSymbolZOrder
      };
      Q.init(Y);
      Q.slotViewIndex = G;
      Q.slotItemIndex = V;
      var W = p % 100;
      Q.setup(p, this.normalSpriteFrames[W], this.blurSpriteFrames[W], j);
      return Q;
    };
    u.prototype.getSlotItemCustom = function (p, j = false, G = 0, V = 0) {
      var Q = L.nodePoolHandler.dequeueReusableItem(D.NodePoolName.SlotItemCustom).getComponent(T.default);
      var N = Q.content;
      var Y = {
        sprite: N,
        normalScale: this.normalScale,
        blurScale: this.blurScale,
        getSymbolZOrder: this.getSymbolZOrder
      };
      Q.init(Y);
      Q.slotViewIndex = G;
      Q.slotItemIndex = V;
      var W = p % 100;
      Q.setup(p, this.normalSpriteFrames[W], this.blurSpriteFrames[W], j);
      return Q;
    };
    u.prototype.releaseSlotItem = function (c) {
      if (c.symbolIndex < 0) {
        c.node.destroy();
      } else {
        L.nodePoolHandler.enqueueReusableItem(c.node, D.NodePoolName.SlotItem);
      }
    };
    u.prototype.releaseSlotItemCustom = function (c) {
      if (c.symbolIndex < 0) {
        c.node.destroy();
      } else {
        L.nodePoolHandler.enqueueReusableItem(c.node, D.NodePoolName.SlotItemCustom);
      }
    };
    return u;
  }(x.default);
  exports.default = k;
  cc._RF.pop();
}