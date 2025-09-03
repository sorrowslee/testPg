if (!cc._RF.push(module, "4207exmwGdBM6LA1UwuVtdQ", "FreeSpinWonController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AudioConstant");
  var x = require("AudioManager");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function c() {
      var p = u !== null && u.apply(this, arguments) || this;
      p.freeSpinWonNumberNode = undefined;
      p.freeSpinWonSprite = undefined;
      p.efxAnimation = undefined;
      p._freeSpinWonNumberDisplayController = undefined;
      p._completeCallback = undefined;
      return p;
    }
    __extends(c, u);
    // 初始化顯示所需的圖框
    c.prototype.init = function (p) {
      this.node.active = false;
      this.freeSpinWonSprite.spriteFrame = p;
    };
    Object.defineProperty(c.prototype, "freeSpinWonNumberDisplayController", {
      // 取得數字顯示控制器
      get: function () {
        this._freeSpinWonNumberDisplayController ||= this.freeSpinWonNumberNode.getComponent("NumberDisplayController");
        return this._freeSpinWonNumberDisplayController;
      },
      enumerable: false,
      configurable: true
    });
    // 播放免費遊戲獲得的顯示動畫
    c.prototype.play = function (p, j) {
      this.node.active = true;
      this.freeSpinWonNumberDisplayController.clear();
      this.freeSpinWonNumberDisplayController.displayNumber(p);
      this._completeCallback = j;
      this.efxAnimation.play();
      x.playAudio(T.GENERAL_AUDIO.fsWonTitle.key);
    };
    // 動畫播放完成後回呼
    c.prototype.onAnimationComplete = function () {
      this._reset();
      var p = this._completeCallback;
      this._completeCallback = undefined;
      if (p) {
        p();
      }
    };
    // 重置節點狀態
    c.prototype._reset = function () {
      this.node.active = false;
      this.efxAnimation.stop();
    };
    __decorate([k(cc.Node)], c.prototype, "freeSpinWonNumberNode", undefined);
    __decorate([k(cc.Sprite)], c.prototype, "freeSpinWonSprite", undefined);
    __decorate([k(cc.Animation)], c.prototype, "efxAnimation", undefined);
    return __decorate([D], c);
  }(cc.Component);
  exports.default = C;
  cc._RF.pop();
}