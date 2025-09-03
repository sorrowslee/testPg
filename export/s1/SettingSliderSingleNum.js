if (!cc._RF.push(module, "449bftyQ69GBqYbHra7PRW2", "SettingSliderSingleNum")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = require("Utils");
  var g = cc.Class({
    extends: cc.Component,
    properties: {
      numberLabel: cc.Label,
      num: 10,
      onColor: cc.Color,
      offColor: cc.Color
    },
    onLoad: function () {
      this.numberLabel.string = this.num;
    },
    setColor: function (T, x) {
      this.onColor = T;
      this.offColor = x;
    },
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