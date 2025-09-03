if (!cc._RF.push(module, "24d8a0AiVJMa4yCegaay2ry", "BaseListViewCell")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.label = undefined;
      u.sprite = undefined;
      u.selectedBackgroundColor = undefined;
      u.normalBackgroundColor = undefined;
      u.endPos = undefined;
      return u;
    }
    __extends(C, k);
    // 元件載入時設定觸控事件
    C.prototype.onLoad = function () {
      this.setupTouchAction();
    };
    // 註冊各種觸控與滑鼠事件
    C.prototype.setupTouchAction = function () {
      this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
      this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
      this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseEnter, this);
      this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseLeave, this);
    };
    // 移除所有觸控與滑鼠事件
    C.prototype.removeTouchAction = function () {
      this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
      this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
      this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseEnter, this);
      this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseLeave, this);
    };
    // 滑鼠移入時觸發的回呼
    C.prototype._onMouseEnter = function (u) {
      if (this.mouseEnterAction) {
        this.mouseEnterAction(u);
      }
    };
    // 滑鼠移出時觸發的回呼
    C.prototype._onMouseLeave = function (u) {
      if (this.mouseLeaveAction) {
        this.mouseLeaveAction(u);
      }
    };
    // 觸控開始時改變背景顏色並記錄起始位置
    C.prototype._onTouchStart = function (u) {
      var c = u.touch;
      var p = cc.v2(c.getLocation().x, c.getLocation().y);
      this.startPos = p;
      this.node.color = this.selectedBackgroundColor;
      if (this.touchStartAction) {
        this.touchStartAction(u);
      }
    };
    // 觸控移動時恢復背景顏色
    C.prototype._onTouchMoved = function (u) {
      this.node.color = this.normalBackgroundColor;
      if (this.touchMoveAction) {
        this.touchMoveAction(u);
      }
    };
    // 觸控結束時恢復背景顏色並觸發回呼
    C.prototype._onTouchEnd = function (u) {
      var c = u.touch;
      var p = cc.v2(c.getLocation().x, c.getLocation().y);
      this.endPos = p;
      this.node.color = this.normalBackgroundColor;
      u.stopPropagationImmediate();
      if (this.touchEndAction) {
        this.touchEndAction(u);
      }
    };
    // 觸控取消時恢復背景顏色並觸發回呼
    C.prototype._onTouchCancel = function (u) {
      var c = u.touch;
      var p = cc.v2(c.getLocation().x, c.getLocation().y);
      this.endPos = p;
      this.node.color = this.normalBackgroundColor;
      u.stopPropagationImmediate();
      if (this.touchCancelAction) {
        this.touchCancelAction(u);
      }
    };
    // 銷毀前移除事件監聽
   C.prototype.destroy = function () {
      this.removeTouchAction();
      k.prototype.destroy.call(this);
    };
    __decorate([L(cc.Label)], C.prototype, "label", undefined);
    __decorate([L(cc.Sprite)], C.prototype, "sprite", undefined);
    __decorate([L(cc.Color)], C.prototype, "selectedBackgroundColor", undefined);
    __decorate([L(cc.Color)], C.prototype, "normalBackgroundColor", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}