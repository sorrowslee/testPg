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
        // 對外接口，顯示彈出項目
        this.showItem(C, u, c, p, j, G, V, Q, N);
      };
      k.prototype.hide = function () {
        // 對外接口，隱藏彈出項目
        this.hideItem();
      };
      k.prototype.showItem = function (C, u, c, p, j) {
        // 顯示項目並設定派彩數值與位置
        this.setPayoutValue(p, u);
        this.node.active = true;
        this.node.setPosition(j);
        if (C) {
          C();
        }
      };
      k.prototype.hideItem = function () {
        // 隱藏項目
        this.node.active = false;
      };
      k.prototype.destroy = function () {
        // 銷毀節點
        this.node.destroy();
        D.prototype.destroy.call(this);
      };
      k.prototype.setPayoutValue = function (C, u) {
        // 設定顯示的派彩金額
        var c = u[C];
        Object.keys(c).reverse();
      };
      k.prototype.setCancelCallback = function (C) {
        // 設定點擊取消時的回呼
        this._cancalCallback = C;
      };
      k.prototype.cancalCallback = function () {
        // 觸發取消的回呼
        if (this._cancalCallback) {
          this._cancalCallback();
        }
      };
    return __decorate([x], k);
  }(cc.Component);
  exports.default = L;
  cc._RF.pop();
}