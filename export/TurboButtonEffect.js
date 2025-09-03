if (!cc._RF.push(module, "5e837vEECVAj4O05haO7Gt+", "TurboButtonEffect")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator.ccclass;
  var x = function (L) {
    function D() {
      var k = L !== null && L.apply(this, arguments) || this;
      k._turboMiddleIcon = undefined;
      return k;
    }
    __extends(D, L);
    D.prototype.setUpdateTurboMiddleIconCallback = function (k) {
      this._turboMiddleIcon = k;
    };
    D.prototype.changeTurboSprite = function () {
      if (this._turboMiddleIcon) {
        this._turboMiddleIcon();
      }
    };
    return __decorate([T], D);
  }(cc.Component);
  exports.default = x;
  cc._RF.pop();
}