if (!cc._RF.push(module, "47f2aqFJBBCiYjiG/SqB5jv", "SoundButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GenericSettingButton");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    // 建構函式，初始化圖像與文字參考
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.sprite = undefined;
      c.soundOn = undefined;
      c.soundOff = undefined;
      c.title = undefined;
      return c;
    }
    __extends(u, C);
    // 設定按鈕上顯示的標題文字
    u.prototype.setTitle = function (c) {
      this.title.string = c;
    };
    // 自訂初始化，調整按鈕圖示與碰撞器位置
    u.prototype.customSetup = function () {
      var c;
      this.sprite.node.y = 0;
      this.title.node.active = false;
      if ((c = this.circleCollider) !== null && c !== undefined) {
        c.y = 0;
      }
    };
    __decorate([D(cc.Sprite)], u.prototype, "sprite", undefined);
    __decorate([D(cc.SpriteFrame)], u.prototype, "soundOn", undefined);
    __decorate([D(cc.SpriteFrame)], u.prototype, "soundOff", undefined);
    __decorate([D(cc.Label)], u.prototype, "title", undefined);
    return __decorate([L], u);
  }(T.default);
  exports.default = k;
  cc._RF.pop();
}