if (!cc._RF.push(module, "cd0fbm4LQBEVL5LzWleSsGj", "TabBarItem")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function _C2() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.icon = undefined;
      u.titleLabel = undefined;
      u.tintColor = undefined;
      u.selectedTintColor = undefined;
      u._iconImage = undefined;
      u._isSelected = undefined;
      u._selectedIconImage = undefined;
      u._tag = undefined;
      u._selectAction = undefined;
      return u;
    }
    __extends(_C2, k);
    Object.defineProperty(_C2.prototype, "tag", {
      get: function () {
        return this._tag;
      },
      set: function (u) {
        this._tag = u;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(_C2.prototype, "selectAction", {
      set: function (u) {
        this._selectAction = u;
      },
      enumerable: false,
      configurable: true
    });
    _C2.prototype.init = function (u, c, p, j) {
      if (u) {
        this.titleLabel.string = u;
      }
      if (c) {
        this.icon.spriteFrame = c;
        this._iconImage = c;
      }
      this._selectedIconImage = p;
      this._tag = j;
      this._isSelected = false;
    };
    _C2.prototype.setupTouchAction = function () {
      this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
      this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    };
    _C2.prototype.setTintColor = function (u) {
      if (!this._isSelected) {
        this.icon.node.color = u;
        this.titleLabel.node.color = u;
      }
      this.tintColor = u;
    };
    _C2.prototype.setSelectedTintColor = function (u) {
      if (this._isSelected) {
        this.icon.node.color = u;
        this.titleLabel.node.color = u;
      }
      this.selectedTintColor = u;
    };
    _C2.prototype.setTitleAttributes = function (u) {
      var c = u.getFontSize();
      var p = u.getNormalFontColor();
      var j = u.getFontName();
      var l = u.getLineHeight();
      this.titleLabel.fontSize = c;
      this.titleLabel.font = j;
      this.titleLabel.node.color = p;
      this.titleLabel.lineHeight = l;
    };
    _C2.prototype.setSelect = function () {
      var u = this.selectedTintColor;
      this.icon.node.color = u;
      this.titleLabel.node.color = u;
      this.icon.spriteFrame = this._selectedIconImage;
      this._isSelected = true;
    };
    _C2.prototype.setUnselected = function () {
      var u = this.tintColor;
      this.icon.node.color = u;
      this.titleLabel.node.color = u;
      this.icon.spriteFrame = this._iconImage;
      this._isSelected = false;
    };
    _C2.prototype.animFinish = function () {};
    _C2.prototype._onTouchStart = function () {};
    _C2.prototype._onTouchEnd = function (u) {
      u.stopPropagation();
      if (this._selectAction) {
        this._selectAction();
      }
    };
    __decorate([L(cc.Sprite)], _C2.prototype, "icon", undefined);
    __decorate([L(cc.Label)], _C2.prototype, "titleLabel", undefined);
    __decorate([L(cc.Color)], _C2.prototype, "tintColor", undefined);
    __decorate([L(cc.Color)], _C2.prototype, "selectedTintColor", undefined);
    return __decorate([x], _C2);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}