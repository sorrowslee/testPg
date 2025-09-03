if (!cc._RF.push(module, "06e65rpYzVNHbDR0e2vljl/", "SettingInfoFooterController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SettingInfoFooterController = exports.ICON_FOOTER_TYPE = exports.WALLET_FOOTER_TYPE = undefined;
  var T;
  var x = require("Utils");
  var L = require("UIAppearanceHelper");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  (function (p) {
    p[p.CASH = 1] = "CASH";
    p[p.FREE_GAME = 2] = "FREE_GAME";
    p[p.BONUS = 3] = "BONUS";
    p[p.POINT = 4] = "POINT";
  })(T = exports.WALLET_FOOTER_TYPE ||= {});
  (function (p) {
    p[p.SPIN = 2] = "SPIN";
    p[p.ROLL_OVER = 3] = "ROLL_OVER";
  })(exports.ICON_FOOTER_TYPE ||= {});
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.background = undefined;
      G.balanceNode = undefined;
      G.customLeftFooterTitle = undefined;
      G.balanceValueNode = undefined;
      G.rightSlotNode = undefined;
      G.winValueNode = undefined;
      G.winHolderNode = undefined;
      G.winCashIconNode = undefined;
      G.winButton = undefined;
      G.totalWinNode = undefined;
      G.totalWinValueNode = undefined;
      G.freeGamesNode = undefined;
      G.specialIcon = undefined;
      G.freeSpinValue = undefined;
      G.walletButton = undefined;
      G.walletButtonSensor = undefined;
      G.walletNavigateIcon = undefined;
      G.walletNotificationIcon = undefined;
      G.betAmountLabel = undefined;
      G.betOptionsButton = undefined;
      G.betOptionsIcon = undefined;
      G.walletFooterTypeSFList = [];
      G.rewardFooterTypeSFList = [];
      G.maxBetButtonHolder = undefined;
      G.languageSensitiveLayoutList = [];
      G._isCustomInfoFooter = false;
      G._isSticky = false;
      G.currentBalance = 0;
      G.targetBalance = 0;
      G.winBalance = 0;
      G.walletNotify = false;
      G.lockWalletButton = false;
      G.lockBetOptionsButton = false;
      G._currentWinAmount = 0;
      G._isShowingFreeGamesTitle = false;
      return G;
    }
    __extends(j, p);
    j.prototype.updateBetAmount = function (G, V) {
      var Q = this;
      if (V === undefined) {
        V = 0;
      }
      if (this._previousBetAmount) {
        this.betAmountLabel.string = this._currentBetAmount = this._previousBetAmount;
        this.betAmountLabel.node.stopAllActions();
        var N = V * 0.5 + 1.2;
        this.betAmountLabel.node.runAction(cc.sequence(cc.scaleTo(0.1, N).easing(cc.easeOut(0.2)), cc.callFunc(function () {
          Q.betAmountLabel.string = G;
        }), cc.scaleTo(0.2, 0.9), cc.scaleTo(0.1, 1.05), cc.scaleTo(0.1, 0.95), cc.scaleTo(0.1, 1)));
        this._previousBetAmount = G;
      } else {
        this.betAmountLabel.string = this._currentBetAmount = this._previousBetAmount = G;
      }
    };
    Object.defineProperty(j.prototype, "currentBetAmount", {
      get: function () {
        if (this._currentBetAmount === undefined || this._currentBetAmount.length === 0) {
          throw Error("SettingInfoFooterController :: currentBetAmount : Please set legit bet amount by calling updateBetAmount first!");
        }
        return parseFloat(this._currentBetAmount);
      },
      enumerable: false,
      configurable: true
    });
    j.prototype.setOpenBetOptionsMenuCallback = function (G) {
      this._openBetOptionsMenu = G;
    };
    j.prototype.openBetOptionsMenu = function () {
      if (this._openBetOptionsMenu) {
        this._openBetOptionsMenu();
      }
    };
    j.prototype.setBetOptionsButtonLock = function (G = false) {
      this.lockBetOptionsButton = G;
    };
    j.prototype.interactableBetOptionsButton = function (G) {
      this.betOptionsButton.interactable = G;
      if (G) {
        if (this._defaultLabelColor === undefined) {
          throw Error("SettingInfoFooter :: interactableBetOptionsButton : Please call boot() to setup default label color first!");
        }
        this.betAmountLabel.node.color = this._defaultLabelColor;
      } else {
        this.betAmountLabel.node.color = cc.Color.WHITE;
      }
    };
    j.prototype.setOpenWinMenuCallback = function (G) {
      this._openWinMenu = G;
    };
    j.prototype.openWinMenu = function () {
      if (this._openWinMenu) {
        this._openWinMenu();
      }
    };
    j.prototype.interactableWinButton = function (G) {
      this.winButton.interactable = G;
      if (G) {
        if (this._defaultLabelColor === undefined) {
          throw Error("SettingInfoFooter :: interactableWinButton : Please call boot() to setup default label color first!");
        }
        this.winValueNode.color = this.freeSpinValue.node.color = this._defaultLabelColor;
      } else {
        this.winValueNode.color = this.freeSpinValue.node.color = cc.Color.WHITE;
      }
    };
    j.prototype.setWinIcon = function (G) {
      this.winCashIconNode.spriteFrame = G;
    };
    j.prototype.setWalletNavigateIcon = function (G) {
      switch (G) {
        case T.CASH:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = this.walletFooterTypeSFList[G - 1];
          break;
        case T.FREE_GAME:
        case T.BONUS:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = this.walletFooterTypeSFList[G - 1];
          this.specialIcon.spriteFrame = this.rewardFooterTypeSFList[G - 2];
          break;
        default:
          this.walletNavigateIcon.getComponent(cc.Sprite).spriteFrame = undefined;
      }
    };
    j.prototype.boot = function () {
      this._balanceLabelController = this.balanceValueNode.getComponent("NumberLabelControllerLite");
      this._winLabelController = this.winValueNode.getComponent("NumberLabelControllerLite");
      this._totalWinLabelController = this.totalWinValueNode.getComponent("NumberLabelControllerLite");
      this.betOptionsButton.normalColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.betOptionsButton.pressedColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.betOptionsButton.hoverColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.betOptionsButton.disabledColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.walletButton.normalColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.walletButton.pressedColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.walletButton.hoverColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.walletButton.disabledColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.winButton.normalColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.winButton.pressedColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.pressed");
      this.winButton.hoverColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this.winButton.disabledColor = L.uiAppearanceHelper.v("setting.color_button_transition_a.normal");
      this._defaultLabelColor = this.betAmountLabel.node.color;
      this._balanceLabelController.skip(0);
      this._winLabelController.skip(0);
      this._totalWinLabelController.skip(0);
    };
    j.prototype.changeWalletIconColor = function (G) {
      this.walletNavigateIcon.opacity = G ? L.uiAppearanceHelper.v("setting.color_button_transition_a.pressed").a : L.uiAppearanceHelper.v("setting.color_button_transition_a.normal").a;
    };
    j.prototype.showBackground = function (G, V = 225) {
      this.background.active = G;
      this.background.opacity = V;
    };
    j.prototype.setOpenWalletMenuCallback = function (G) {
      this._openWalletMenu = G;
    };
    j.prototype.setWalletButtonLock = function (G = false) {
      this.lockWalletButton = G;
    };
    j.prototype.interactableWalletButton = function (G) {
      this.walletButton.interactable = G;
      if (G) {
        if (this._defaultLabelColor === undefined) {
          throw Error("SettingInfoFooter :: interactableWalletButton : Please call boot() to setup default label color first!");
        }
        this.balanceValueNode.color = this._defaultLabelColor;
      } else {
        this.balanceValueNode.color = cc.Color.WHITE;
      }
    };
    j.prototype.changeWalletButtonColor = function (G) {
      this.walletNavigateIcon.opacity = G ? L.uiAppearanceHelper.v("setting.color_button_transition_a.pressed").a : L.uiAppearanceHelper.v("setting.color_button_transition_a.normal").a;
    };
    j.prototype.showBalanceNode = function (G) {
      this.balanceNode.active = G;
    };
    j.prototype.showTotalWinNode = function (G) {
      this.totalWinNode.active = G;
    };
    j.prototype.showFreeGamesNode = function (G) {
      this.freeGamesNode.active = G;
    };
    j.prototype.activateWalletNotify = function (G) {
      this.walletNotify = G;
      if (G === true) {
        this.walletNotificationIcon.active = G;
        this.walletNotificationIcon.stopAllActions();
        this.walletNotificationIcon.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
      } else {
        this.walletNotificationIcon.stopAllActions();
        this.walletNotificationIcon.active = G;
      }
    };
    j.prototype.openWalletMenu = function () {
      if (this._openWalletMenu) {
        this._openWalletMenu();
      }
    };
    j.prototype.changeHolder = function (G) {
      this._primeHolder ||= G;
      this.node.removeFromParent(false);
      G.addChild(this.node);
    };
    j.prototype.returnHolder = function () {
      if (!this._primeHolder) {
        throw Error("SettingInfoFooter :: returnHolder : Do not have parent to return");
      }
      this.node.removeFromParent(false);
      this._primeHolder.addChild(this.node);
    };
    j.prototype.showCustomInfoFooter = function () {
      this._isCustomInfoFooter = true;
      this.freeGamesNode.active = true;
      if (this._isCustomInfoFooter) {
        this._activateFlipRightSlot(true);
      }
    };
    j.prototype.hideCustomInfoFooter = function () {
      this._isCustomInfoFooter = false;
      this.freeGamesNode.active = false;
      this.winHolderNode.active = true;
      var G = this._abortDelay;
      this._abortDelay = undefined;
      if (G) {
        G();
      }
      var V = this._abortSequence;
      this._abortSequence = undefined;
      if (V) {
        V();
      }
      this.rightSlotNode.stopAllActions();
      this.rightSlotNode.scale = 1;
    };
    j.prototype.isCustomInfoFooter = function () {
      return this._isCustomInfoFooter;
    };
    j.prototype.updateBalance = function (G, V, Q) {
      if (this._balanceLabelController === undefined) {
        throw Error("SettingInfoFooter :: updateBalance : Please call boot() to setup balance label controller first!");
      }
      G = this.currentBalance ? this.currentBalance : this.currentBalance = x.isNumeric(V) ? V : 0;
      if (x.isNumeric(V)) {
        this.targetBalance = V;
      } else {
        V = this.targetBalance;
      }
      if (V <= G) {
        Q = false;
      }
      if (Q) {
        this._balanceLabelController.play(G, V);
      } else {
        this._balanceLabelController.skip(V);
      }
      this.currentBalance = this.targetBalance;
    };
    Object.defineProperty(j.prototype, "currentWinAmount", {
      get: function () {
        return this._currentWinAmount;
      },
      enumerable: false,
      configurable: true
    });
    j.prototype.updateWinAmount = function (G, V, Q = true) {
      if (this._winLabelController === undefined) {
        throw Error("SettingInfoFooter :: updateWinAmount : Please call boot() to setup win label controller first!");
      }
      var N = this._currentWinAmount;
      if (x.isNumeric(G)) {
        this.winBalance = G;
      } else {
        G = this.winBalance;
      }
      if (G <= N) {
        V = false;
      }
      if (V) {
        this._winLabelController.play(N, G);
      } else {
        this._winLabelController.skip(G);
      }
      if (this._isCustomInfoFooter && !this._isSticky) {
        this._activateFlipRightSlot(false, Q);
      }
      this._currentWinAmount = this.winBalance;
    };
    j.prototype.updateTotalWinAmount = function (G, V) {
      if (this._totalWinLabelController === undefined) {
        throw Error("SettingInfoFooter :: updateTotalWinAmount : Please call boot() to setup total win label controller first!");
      }
      if (x.isNumeric(G)) {
        this.currentBalance = G;
      } else {
        G = this.currentBalance;
      }
      if (V) {
        this._totalWinLabelController.play(0, G);
      } else {
        this._totalWinLabelController.skip(G);
      }
    };
    j.prototype.setCustomMiddleInfoFooter = function (G, V = true) {
      this.freeSpinValue.string = G;
      this._isSticky = !V;
      if (this._isCustomInfoFooter) {
        this._activateFlipRightSlot(true, V);
      }
    };
    j.prototype.updateLayout = function (G) {
      this.languageSensitiveLayoutList.forEach(function (V) {
        return V.horizontalDirection = G ? cc.Layout.HorizontalDirection.RIGHT_TO_LEFT : cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
      });
    };
    j.prototype._activateFlipRightSlot = function (G, V = true) {
      var Q = 0;
      if (G) {
        this.winHolderNode.active = false;
        this.freeGamesNode.active = true;
        Q = 3;
        this._isShowingFreeGamesTitle = true;
      } else {
        this.winHolderNode.active = true;
        this.freeGamesNode.active = false;
        Q = 5;
        this._isShowingFreeGamesTitle = false;
      }
      this._startFlipRightSlot(Q, V);
    };
    j.prototype._startFlipRightSlot = function (G, V = true) {
      var Q = this._abortDelay;
      this._abortDelay = undefined;
      if (Q) {
        Q();
      }
      var N = this._abortSequence;
      this._abortSequence = undefined;
      if (N) {
        N();
      }
      this.rightSlotNode.stopAllActions();
      this.rightSlotNode.scale = 1;
      if (V) {
        this._abortDelay = x.delayCallback(G)(this._runFlipRightSlot.bind(this));
      }
    };
    j.prototype._runFlipRightSlot = function () {
      var G = this;
      this._abortDelay = undefined;
      function V() {
        if (G._isShowingFreeGamesTitle) {
          G.winHolderNode.active = true;
          G.freeGamesNode.active = false;
          G._isShowingFreeGamesTitle = false;
        } else {
          G.winHolderNode.active = false;
          G.freeGamesNode.active = true;
          G._isShowingFreeGamesTitle = true;
        }
      }
      this._abortSequence = x.sequenceCallback(function (Q) {
        G.rightSlotNode.runAction(cc.sequence(cc.scaleTo(0.1, 1, 0), cc.callFunc(V), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
          Q();
        })));
      })(function () {
        var Q;
        Q = G._isShowingFreeGamesTitle ? 3 : 5;
        G._abortSequence = undefined;
        G._startFlipRightSlot(Q);
      });
    };
    __decorate([C(cc.Node)], j.prototype, "background", undefined);
    __decorate([C(cc.Node)], j.prototype, "balanceNode", undefined);
    __decorate([C(cc.Label)], j.prototype, "customLeftFooterTitle", undefined);
    __decorate([C(cc.Node)], j.prototype, "balanceValueNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "rightSlotNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "winValueNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "winHolderNode", undefined);
    __decorate([C(cc.Sprite)], j.prototype, "winCashIconNode", undefined);
    __decorate([C(cc.Button)], j.prototype, "winButton", undefined);
    __decorate([C(cc.Node)], j.prototype, "totalWinNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "totalWinValueNode", undefined);
    __decorate([C(cc.Node)], j.prototype, "freeGamesNode", undefined);
    __decorate([C(cc.Sprite)], j.prototype, "specialIcon", undefined);
    __decorate([C(cc.Label)], j.prototype, "freeSpinValue", undefined);
    __decorate([C(cc.Button)], j.prototype, "walletButton", undefined);
    __decorate([C(cc.Node)], j.prototype, "walletButtonSensor", undefined);
    __decorate([C(cc.Node)], j.prototype, "walletNavigateIcon", undefined);
    __decorate([C(cc.Node)], j.prototype, "walletNotificationIcon", undefined);
    __decorate([C(cc.Label)], j.prototype, "betAmountLabel", undefined);
    __decorate([C(cc.Button)], j.prototype, "betOptionsButton", undefined);
    __decorate([C(cc.Node)], j.prototype, "betOptionsIcon", undefined);
    __decorate([C([cc.SpriteFrame])], j.prototype, "walletFooterTypeSFList", undefined);
    __decorate([C([cc.SpriteFrame])], j.prototype, "rewardFooterTypeSFList", undefined);
    __decorate([C(cc.Node)], j.prototype, "maxBetButtonHolder", undefined);
    __decorate([C([cc.Layout])], j.prototype, "languageSensitiveLayoutList", undefined);
    return __decorate([k], j);
  }(cc.Component);
  exports.SettingInfoFooterController = u;
  cc._RF.pop();
}