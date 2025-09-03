if (!cc._RF.push(module, "5beaedmutZIkKPi8z2EJ82d", "PopOutItem")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  T.property;
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    k.prototype.show = function (C, u, c, p, j, G, V, Q, N) {
      this.showItem(C, u, c, p, j, G, V, Q, N);
    };
    k.prototype.hide = function () {
      this.hideItem();
    };
    k.prototype.showItem = function (C, u, c, p, j) {
      this.setPayoutValue(p, u);
      this.node.active = true;
      this.node.setPosition(j);
      if (C) {
        C();
      }
    };
    k.prototype.hideItem = function () {
      this.node.active = false;
    };
    k.prototype.destroy = function () {
      this.node.destroy();
      D.prototype.destroy.call(this);
    };
    k.prototype.setPayoutValue = function (C, u) {
      var c = u[C];
      Object.keys(c).reverse();
    };
    k.prototype.setCancelCallback = function (C) {
      this._cancalCallback = C;
    };
    k.prototype.cancalCallback = function () {
      if (this._cancalCallback) {
        this._cancalCallback();
      }
    };
    return __decorate([x], k);
  }(cc.Component);
  exports.default = L;
  cc._RF.pop();
}