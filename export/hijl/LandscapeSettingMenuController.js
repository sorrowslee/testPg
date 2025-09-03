if (!cc._RF.push(module, "0a93fcJrXdI5b2EdfUH4UAj", "LandscapeSettingMenuController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LandscapeSettingMenuController = undefined;
  var T = require("SettingMenuController");
  var x = require("CanvasResizeBroadcaster");
  var L = require("UIAppearanceHelper");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.landscapeSoundButtonHolder = undefined;
      G.moreMenuLayoutNode = undefined;
      G.moreMenuBGNode = undefined;
      G._moreMenuLayerNodePosition = undefined;
      return G;
    }
    __extends(j, p);
    j.prototype.onLoad = function () {
      this._onMoreSettingLayerSizeChanged();
      this.moreMenuLayoutNode.on("size-changed", this._onMoreSettingLayerSizeChanged.bind(this));
      this._moreMenuLayerNodePosition = this.moreMenuLayerNode.position;
      this.settingTurboSprite.node.color = L.uiAppearanceHelper.v("setting.theme_color");
      this.defaultMenuLayerNode.y = 0;
      this.settingToast.opacity = 0;
      this.featureBuyToast.opacity = 0;
      this.featureBuyToast.active = false;
      this.moreMenuLayerNode.y = -(this.moreMenuLayerNode.height + this._getGapBetweenBottomScreenValue());
      this.reminderBoard.active = false;
      this.reminderBoard.opacity = 1;
      this.settingMenuUIBlock.active = false;
      this.subControllerHolder.height = this._currentUsingHeight = cc.view.getVisibleSize().height;
      this._unsubscribeBroadcaster = x.default.subscribe(this._onSizeChanged.bind(this));
    };
    j.prototype.showMoreMenuLayer = function () {
      var G = this;
      if (!this._isSwitchingLayer) {
        this._isSwitchingLayer = true;
        this._showingDefaultMenu = true;
        this._reloadMenuItems();
        this.moreMenuLayerNode.active = true;
        this.moreMenuLayerNode.stopAllActions();
        this.moreMenuLayerNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, this._moreMenuLayerNodePosition.x, this._moreMenuLayerNodePosition.y).easing(cc.easeQuadraticActionOut()), cc.fadeIn(0.2).easing(cc.easeQuadraticActionOut())), cc.callFunc(function () {
          G._isSwitchingLayer = false;
          if (G.onMenuEndChanged) {
            G.onMenuEndChanged();
          }
        })));
        var V = this.onMenuStartChanged;
        if (V) {
          V(true, true);
        }
      }
    };
    j.prototype.hideMoreMenuLayer = function () {
      var G = this;
      if (!this._isSwitchingLayer) {
        this._isSwitchingLayer = true;
        this._showingDefaultMenu = true;
        this._reloadMenuItems();
        this.moreMenuLayerNode.stopAllActions();
        this.moreMenuLayerNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, this._moreMenuLayerNodePosition.x, -this.moreMenuLayerNode.height).easing(cc.easeQuadraticActionOut()), cc.fadeOut(0.2).easing(cc.easeQuadraticActionOut())), cc.callFunc(function () {
          G._isSwitchingLayer = false;
          G.moreMenuLayerNode.active = false;
          if (G.onMenuEndChanged) {
            G.onMenuEndChanged();
          }
        })));
        if (this.moreMenuLayerNode.active === false) {
          this._isSwitchingLayer = false;
        }
        var V = this.onMenuStartChanged;
        if (V) {
          V(false, true);
        }
      }
    };
    j.prototype._onMoreSettingLayerSizeChanged = function () {
      this.moreMenuBGNode.width = this.moreMenuLayoutNode.width;
      this.moreMenuBGNode.height = this.moreMenuLayoutNode.height;
    };
    __decorate([C(cc.Node)], j.prototype, "landscapeSoundButtonHolder", undefined);
    __decorate([C(cc.Node)], j.prototype, "moreMenuLayoutNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "moreMenuBGNode", undefined);
    return __decorate([k], j);
  }(T.SettingMenuController);
  exports.LandscapeSettingMenuController = u;
  cc._RF.pop();
}