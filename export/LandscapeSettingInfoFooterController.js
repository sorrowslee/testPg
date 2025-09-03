if (!cc._RF.push(module, "e550bCO+rxMtaTFsIcS7wfm", "LandscapeSettingInfoFooterController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SettingInfoFooterController");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.borders = [];
      G.descriptionLabel = [];
      G.landscapeSoundButtonHolder = undefined;
      return G;
    }
    __extends(j, p);
    j.prototype.boot = function () {
      p.prototype.boot.call(this);
      var G = x.uiAppearanceHelper.v("setting.secondary_theme_color");
      this.borders.forEach(function (Q) {
        L.setNodeColorWithOpacity(Q, G);
      });
      var V = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.descriptionLabel.forEach(function (Q) {
        L.setNodeColorWithOpacity(Q.node, V);
      });
      this.betOptionsButton.normalColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.betOptionsButton.pressedColor = x.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.betOptionsButton.hoverColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.betOptionsButton.disabledColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.walletButton.normalColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.walletButton.pressedColor = x.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.walletButton.hoverColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.walletButton.disabledColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.winButton.normalColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.winButton.pressedColor = x.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.winButton.hoverColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
      this.winButton.disabledColor = x.uiAppearanceHelper.v("setting.tertiary_theme_color");
    };
    j.prototype.setWalletNavigateIcon = function (G) {
      this._setDescription();
      switch (G) {
        case T.WALLET_FOOTER_TYPE.CASH:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = this.walletFooterTypeSFList[G - 1];
          break;
        case T.WALLET_FOOTER_TYPE.FREE_GAME:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = this.walletFooterTypeSFList[G - 1];
          this.specialIcon.spriteFrame = this.rewardFooterTypeSFList[G - 2];
          this.descriptionLabel[2].string = shell.I18n.t("SettingMenu.FreeGame");
          break;
        case T.WALLET_FOOTER_TYPE.BONUS:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = this.walletFooterTypeSFList[G - 1];
          this.specialIcon.spriteFrame = this.rewardFooterTypeSFList[G - 2];
          this.descriptionLabel[2].string = shell.I18n.t("SettingMenu.RollOver");
          break;
        default:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = undefined;
      }
    };
    j.prototype._setDescription = function () {
      this.descriptionLabel[0].string = shell.I18n.t("WalletHelper.Balance");
      this.descriptionLabel[1].string = shell.I18n.t("SettingMenu.WinPrizeWord");
      this.descriptionLabel[2].string = "";
      this.descriptionLabel[3].string = shell.I18n.t("SettingMenu.Bet");
    };
    __decorate([C([cc.Node])], j.prototype, "borders", undefined);
    __decorate([C([cc.Label])], j.prototype, "descriptionLabel", undefined);
    __decorate([C(cc.Node)], j.prototype, "landscapeSoundButtonHolder", undefined);
    return __decorate([k], j);
  }(T.SettingInfoFooterController);
  exports.default = u;
  cc._RF.pop();
}