if (!cc._RF.push(module, "b8f7436fYdNnryqvtnVtqIL", "TabBar")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.background = undefined;
      u.itemsContainer = undefined;
      u.shadow = undefined;
      u._tabBarItems = [];
      u._selectedTabBarItem = undefined;
      return u;
    }
    __extends(C, k);
    C.prototype.onLoad = function () {
      var u = this.node.width;
      var c = this.node.height;
      this.background.node.setContentSize(u, c);
      this.shadow.node.width = u;
      this.itemsContainer.setContentSize(u, c);
    };
    C.prototype.setItems = function (u, c) {
      var p = u.length;
      if (p && !(p < 1)) {
        for (var j = 0; j < p; j++) {
          var l = u[j];
          l.setupTouchAction();
          l.node.parent = this.itemsContainer;
        }
        var G = u[c];
        G.setSelect();
        this._selectedTabBarItem = G;
        this._tabBarItems = u;
      }
    };
    C.prototype.getItems = function () {
      return this._tabBarItems;
    };
    C.prototype.selectItemAtIndex = function (u) {
      if (!(u >= this._tabBarItems.length)) {
        var c = this._selectedTabBarItem;
        if (c) {
          c.setUnselected();
        }
        var p = this._tabBarItems[u];
        p.setSelect();
        this._selectedTabBarItem = p;
      }
    };
    C.prototype.getSelectedItem = function () {
      return this._selectedTabBarItem;
    };
    C.prototype.setTintColor = function (u) {
      for (var c = this._tabBarItems, p = 0; p < c.length; p++) {
        c[p].setTintColor(u);
      }
    };
    C.prototype.setSelectedTintColor = function (u) {
      for (var c = this._tabBarItems, p = 0; p < c.length; p++) {
        c[p].setSelectedTintColor(u);
      }
    };
    C.prototype.setTitleAttributes = function (u) {
      for (var c = this._tabBarItems, p = 0; p < c.length; p++) {
        c[p].setTitleAttributes(u);
      }
    };
    C.prototype.setBackgroundImage = function (u, c) {
      if (u) {
        this.background.spriteFrame = u;
      } else if (c) {
        this.background.node.color = c;
      }
    };
    __decorate([L(cc.Sprite)], C.prototype, "background", undefined);
    __decorate([L(cc.Node)], C.prototype, "itemsContainer", undefined);
    __decorate([L(cc.Sprite)], C.prototype, "shadow", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}