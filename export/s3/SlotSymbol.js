if (!cc._RF.push(module, "95c9eiMihhJPZX0QzA3D4uZ", "SlotSymbol")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("BVFramework");
  var x = cc._decorator.ccclass;
  var L = function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C.symbolRow = 1;
      C.symbolColumn = 1;
      C._enableEvent = true;
      C._onLoaded = false;
      return C;
    }
    __extends(k, D);
      // 控制符號是否顯示
      Object.defineProperty(k.prototype, "visible", {
      get: function () {
        return this.node.active;
      },
      set: function (C) {
        this.node.active = C;
      },
      enumerable: false,
      configurable: true
    });
      // 元件載入時發送建立事件
      k.prototype.onLoad = function () {
      if (this._enableEvent) {
        T.getGameContext().emit("Game.SymbolCreated", this);
        this._onLoaded = true;
      }
    };
      // 從物件池取出前重置並發送移除事件
      k.prototype.unuse = function () {
      this.symbolRow = 1;
      this.symbolColumn = 1;
      if (this._enableEvent && this._onLoaded) {
        T.getGameContext().emit("Game.SymbolRemoved", this);
      }
    };
      // 回收後再次使用時發送建立事件
      k.prototype.reuse = function () {
      if (this._enableEvent && this._onLoaded) {
        T.getGameContext().emit("Game.SymbolCreated", this);
      }
    };
      // 銷毀時發送移除事件
      k.prototype.onDestroy = function () {
      if (this._enableEvent && this._onLoaded) {
        T.getGameContext().emit("Game.SymbolRemoved", this);
      }
    };
      // 設定是否啟用事件觸發
      k.prototype.enableEvent = function (C) {
      this._enableEvent = C;
    };
    return __decorate([x], k);
  }(cc.Component);
  exports.default = L;
  cc._RF.pop();
}