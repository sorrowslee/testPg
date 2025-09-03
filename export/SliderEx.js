if (!cc._RF.push(module, "dbb33H+Xs1Dw7xtUJLC1l6D", "SliderEx")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.content = undefined;
      u.contentHeight = 0;
      return u;
    }
    __extends(C, k);
    C.prototype.onEnable = function () {
      this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
      this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
      this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
      if (this.handle && this.handle.isValid) {
        this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
        this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
      }
      this._registerEvent();
    };
    C.prototype.onDisable = function () {
      this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
      this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
      this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
      if (this.handle && this.handle.isValid) {
        this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
        this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
      }
      this._unregisterEvent();
    };
    C.prototype._handleSliderLogic = function (u) {
      this._updateProgress(u);
      this._moveContent();
      this._emitSlideEvent();
    };
    C.prototype._onMouseWheel = function (u) {
      var c = -cc.view._scaleY;
      var p = cc.v2(0, u.getScrollY() * c);
      var j = this.node.convertToWorldSpace(this.handle.node.position).x;
      var l = j + p.y / 10;
      this.progress = cc.misc.clamp01(this.progress + (l - j) / this.node.width);
      this._updateHandlePosition();
      this._moveContent();
      this._emitSlideEvent();
    };
    C.prototype._registerEvent = function () {
      if (this.content) {
        this.content.parent.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
      }
    };
    C.prototype._unregisterEvent = function () {
      if (this.content) {
        this.content.parent.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
      }
    };
    C.prototype._moveContent = function () {
      if (this.content) {
        this.content.y = this.progress * (this.content.height - cc.view.getVisibleSize().height);
      }
    };
    __decorate([L(cc.Node)], C.prototype, "content", undefined);
    return __decorate([x], C);
  }(cc.Slider);
  exports.default = D;
  cc._RF.pop();
}