if (!cc._RF.push(module, "89028I5vilAgJwUYY+0IKoT", "SettingSliderNum")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = require("Utils");
  var g = cc.Class({
    extends: cc.Component,
    properties: {
      numberLabel: cc.Label,
      numSprites: [cc.Sprite],
      pixelSprites: [cc.SpriteFrame],
      num: 10,
      shortLine: cc.Node,
      onColor: cc.Color,
      offColor: cc.Color,
      isMin: false
    },
    // 設定顯示數字的顏色
    setColor: function (T, x) {
      this.onColor = T;
      this.offColor = x;
    },
    // 切換是否顯示數值與其內容
    setDisplayValue: function (T, x) {
      this.numberLabel.string = x;
      this.numberLabel.node.active = T;
    },
    // 初始化時處理最小值樣式
    onLoad: function () {
      if (this.isMin) {
        this.shortLine.active = false;
      }
    },
    // 切換數字高亮或暗色
    setLight: function (T) {
      if (T) {
        (0, K.setNodeColorWithOpacity)(this.numberLabel.node, this.onColor);
      } else {
        (0, K.setNodeColorWithOpacity)(this.numberLabel.node, this.offColor);
      }
    }
  });
  exports.default = g;
  module.exports = exports.default;
  cc._RF.pop();
}