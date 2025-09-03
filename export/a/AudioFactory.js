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
    L.prototype.put = function (D) {
      return this._pool.length < this.maxStackSound && (this._pool.push(D), true);
    };
    L.prototype.get = function () {
      return this._pool.pop();
    };
    L.prototype.size = function () {
      return this._pool.length;
    };
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