if (!cc._RF.push(module, "c7066vCL8tMPLui05q7zWWt", "FastSpinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AudioConstant");
  var x = require("AudioManager");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = [-445.8333, -267.5, -89.1666, 89.1666, 267.5, 445.8333];
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.holder = undefined;
      return G;
    }
    __extends(j, p);
    j.prototype.play = function (G, V) {
      this.holder.opacity = 0;
      this.holder.active = true;
      this.holder.stopAllActions();
      this.holder.setPosition(C[G], 0);
      this.holder.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
        if (V) {
          V();
        }
      })));
      x.playAudio(T.GENERAL_AUDIO.fastspinStart.key);
    };
    j.prototype.stop = function (G) {
      var V = this;
      this.holder.stopAllActions();
      this.holder.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        V.holder.active = false;
        if (G) {
          G();
        }
      })));
      x.stopAudio(T.GENERAL_AUDIO.fastspinStart.key);
      x.playAudio(T.GENERAL_AUDIO.fastspinStop.key);
    };
    j.prototype.reset = function () {
      this.holder.stopAllActions();
      this.holder.opacity = 0;
      this.holder.active = false;
    };
    __decorate([k(cc.Node)], j.prototype, "holder", undefined);
    return __decorate([D], j);
  }(cc.Component);
  exports.default = u;
  cc._RF.pop();
}