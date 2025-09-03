if (!cc._RF.push(module, "90167wb5w5JpKAkqWQq6cj8", "AnimParticleSystemPoolHandler")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = cc.Class({
    extends: cc.Component,
    unuse: function () {
      var g = this.node.getComponent(cc.Animation);
      if (g) {
        g.stop();
      }
    }
  });
  exports.default = K;
  module.exports = exports.default;
  cc._RF.pop();
}