if (!cc._RF.push(module, "bf4b5cdVNdI7rQp2MPM3CWN", "AudioFactory")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AudioAdapterConstant");
  var x = function () {
    function L() {
      this.maxStackSound = T.MAX_STACK_SOUND;
      this._pool = [];
    }
    // 將音效實例放回池中
    L.prototype.put = function (D) {
      return this._pool.length < this.maxStackSound && (this._pool.push(D), true);
    };
    // 從池中取出音效實例
    L.prototype.get = function () {
      return this._pool.pop();
    };
    // 取得池中目前的實例數量
    L.prototype.size = function () {
      return this._pool.length;
    };
    // 銷毀池內所有音效並清空
    L.prototype.destroy = function () {
      this._pool.forEach(function (D) {
        D.destroy();
      });
      this._pool = [];
    };
    return L;
  }();
  exports.default = x;
  cc._RF.pop();
}