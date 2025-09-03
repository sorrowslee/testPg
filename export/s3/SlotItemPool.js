if (!cc._RF.push(module, "4cb49tzG5ZEy6QJghScmBDK", "SlotItemPool")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = function () {
    function _x() {
      this.slotItemConstructor = undefined;
      this.slotItemPool = undefined;
      this.normalSpriteFrames = undefined;
      this.blurSpriteFrames = undefined;
      this.normalScale = undefined;
      this.blurScale = undefined;
      this.getSymbolZOrder = undefined;
    }
      // 初始化符號物件池與貼圖資料
      _x.prototype.init = function (L) {
      this.slotItemConstructor = L.slotItem;
      var D = L.normalSpriteFrame;
      this.normalSpriteFrames = D[0] instanceof Array ? D[0] : D;
      var n = L.blurSpriteFrame;
      this.blurSpriteFrames = n ? n[0] instanceof Array ? n[0] : n : this.normalSpriteFrames;
      this.normalScale = L.normalScale === undefined ? 1 : L.normalScale;
      this.blurScale = L.blurScale === undefined ? 1 : L.blurScale;
      this.getSymbolZOrder = L.getSymbolZOrder;
      this.slotItemPool = new cc.NodePool(L.slotItem);
    };
      // 取得或建立一個符號物件
      _x.prototype.getSlotItem = function (L, D = false) {
      if (L < 0) {
        var k = new cc.Node().addComponent(this.slotItemConstructor);
        k.symbolIndex = L;
        return k;
      }
      var C;
      var u = this.slotItemPool;
      (C = u.size() ? u.get().getComponent(this.slotItemConstructor) : this.createNewSlotItem()).setup(L, this.normalSpriteFrames[L], this.blurSpriteFrames[L], D);
      return C;
    };
      // 回收符號物件或銷毀特殊節點
      _x.prototype.releaseSlotItem = function (L) {
      if (L.symbolIndex < 0) {
        L.node.destroy();
      } else {
        this.slotItemPool.put(L.node);
      }
    };
      // 更新符號索引並重新設定貼圖
      _x.prototype.updateSlotItemSymbolIndex = function (L, D) {
      L.setup(D, this.normalSpriteFrames[D], this.blurSpriteFrames[D]);
    };
      // 建立新的符號節點與元件
      _x.prototype.createNewSlotItem = function () {
      var L = new cc.Node("slot_item");
      var D = new cc.Node("sprite");
      D.parent = L;
      var n = D.addComponent(cc.Sprite);
      n.sizeMode = cc.Sprite.SizeMode.RAW;
      n.trim = false;
      var k = L.addComponent(this.slotItemConstructor);
      var C = {
        sprite: n,
        normalScale: this.normalScale,
        blurScale: this.blurScale,
        getSymbolZOrder: this.getSymbolZOrder
      };
      k.init(C);
      return k;
    };
    return _x;
  }();
  exports.default = T;
  cc._RF.pop();
}