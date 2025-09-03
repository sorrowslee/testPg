if (!cc._RF.push(module, "8c0ecQgQvxM3oNottpd7IZl", "GameAudioAdapter")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AudioAdapter");
  var x = require("AudioManager");
  var L = function (D) {
    // 建立音效資源並設定是否為音樂
    function k(C, u) {
      var c = D.call(this, C) || this;
      c._gameAudioManagerType = undefined;
      c._isMusic = undefined;
      c._isMusic = u;
      return c;
    }
    __extends(k, D);
    // 載入後註冊音效到遊戲音效管理器
    k.prototype.load = function () {
      var C = this;
      D.prototype.load.call(this);
      function u() {
        C.off("loaderror", c);
        C._gameAudioManagerType = x.registerAudio(C, C._isMusic);
      }
      function c() {
        C.off("load", u);
      }
      this.once("load", u);
      this.once("loaderror", c);
    };
    // 卸載時從遊戲音效管理器移除
    k.prototype.unload = function () {
      x.unregisterAudio(this, this._gameAudioManagerType);
      D.prototype.unload.call(this);
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}