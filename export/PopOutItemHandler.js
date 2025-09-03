if (!cc._RF.push(module, "ed9375KsD1NcYjBhMUREze+", "PopOutItemHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator.ccclass;
  var x = function () {
    function L() {
      this._onClickCallback = undefined;
      this._popoutItemShowCallback = undefined;
      this._popoutItemHideCallback = undefined;
      this._node = undefined;
      this._controller = undefined;
    }
    L.prototype.init = function (D, k) {
      var C = cc.instantiate(D);
      k.addChild(C);
      this._node = C;
      this._controller = C.getComponent("PopOutItem");
      this._popoutItemShowCallback = this._controller.show.bind(this._controller);
      this._popoutItemHideCallback = this._controller.hide.bind(this._controller);
      C.active = false;
    };
    L.prototype.getPopoutItem = function () {
      return this._node;
    };
    L.prototype.setCancelCallback = function (D) {
      this._onClickCallback = D;
    };
    L.prototype._click = function () {
      var D = this._onClickCallback;
      if (D) {
        D();
      }
    };
    L.prototype.destroy = function () {
      this.node.destroy();
      _super.prototype.destroy.call(this);
    };
    L.prototype.setPopoutItemShowCallback = function (D) {
      this._popoutItemShowCallback = D;
    };
    L.prototype.runPopoutItemShowCallback = function (D, k, C, u, c, p, j, G, V) {
      this._node.active = true;
      this._node.on(cc.Node.EventType.TOUCH_END, this._click, this);
      this._controller.setCancelCallback(this._click.bind(this));
      if (this._popoutItemShowCallback) {
        this._popoutItemShowCallback(D, k, C, u, c, p, j, G, V);
      }
    };
    L.prototype.setPopoutItemHideCallback = function (D) {
      this._popoutItemHideCallback = D;
    };
    L.prototype.runPopoutItemHideCallback = function () {
      var D = this;
      if (this._popoutItemHideCallback) {
        this._popoutItemHideCallback(function () {
          D._node.off(cc.Node.EventType.TOUCH_END, D._click, D);
          D._node.active = false;
        });
      }
    };
    return __decorate([T], L);
  }();
  exports.default = x;
  cc._RF.pop();
}