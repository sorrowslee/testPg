if (!cc._RF.push(module, "35d29M3VudMFqjm4gRoo2G6", "SettingMenuHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BackButtonType = exports.settingMenuHelper = exports.SettingMenuType = exports.ButtonPrefabType = exports.SubControllers = undefined;
  var x;
  var L;
  var D;
  var k = require("Utils");
  var C = require("SettingMenuButtonHelper");
  var j = require("NotifyHelper");
  var G = require("Preference");
  var V = require("BVFramework");
  var Q = require("GameEventHandler");
  var N = System.get("wallet");
  var Y = System.get("slot-menu");
  var W = System.get("game-history");
  var q = System.get("paytable-rules");
  var z = cc._decorator.ccclass;
  var A = G.getPreference("setting_menu");
  A.defineItem("soundOn", true);
  (function (w) {
    w[w.SPIN_OPTIONS = 0] = "SPIN_OPTIONS";
    w[w.BET_OPTIONS = 1] = "BET_OPTIONS";
    w[w.SOUND = 2] = "SOUND";
    w[w.HISTORY = 3] = "HISTORY";
    w[w.PAYTABLE = 4] = "PAYTABLE";
    w[w.RULE = 5] = "RULE";
    w[w.WALLET = 6] = "WALLET";
  })(exports.SubControllers ||= {});
  (function (w) {
    w[w.SPIN_OPTIONS = 2] = "SPIN_OPTIONS";
    w[w.BET_OPTIONS = 3] = "BET_OPTIONS";
    w[w.MORE_MENU = 4] = "MORE_MENU";
    w[w.SOUND = 5] = "SOUND";
    w[w.PAYTABLE = 6] = "PAYTABLE";
    w[w.RULE = 7] = "RULE";
    w[w.HISTORY = 8] = "HISTORY";
    w[w.HIDE_MORE = 9] = "HIDE_MORE";
    w[w.MINUS_BET = 10] = "MINUS_BET";
    w[w.PLUS_BET = 11] = "PLUS_BET";
    w[w.WALLET = 12] = "WALLET";
    w[w.WIN = 13] = "WIN";
    w[w.TURBO_SPIN = 14] = "TURBO_SPIN";
    w[w.QUIT = 15] = "QUIT";
    w[w.MAX_BET = 16] = "MAX_BET";
  })(x = exports.ButtonPrefabType ||= {});
  (function (w) {
    w[w.HIDDEN = 0] = "HIDDEN";
    w[w.NORMAL_BACK_FUNC = 1] = "NORMAL_BACK_FUNC";
  })(L ||= {});
  exports.BackButtonType = L;
  (function (w) {
    w[w.LEGACY = 0] = "LEGACY";
    w[w.NEW = 1] = "NEW";
  })(D = exports.SettingMenuType ||= {});
  var M = new (function (w) {
    function U() {
      var B = w.call(this) || this;
      B.soundOn = A.soundOn;
      B.turboSpinOn = false;
      B.isFreeGameMode = false;
      B._isHidden = false;
      B._audioConfigure = true;
      B._backButtonType = L.HIDDEN;
      B._emptyButtonHolderOccupied = 0;
      B._path = "";
      B._betLineValue = 0;
      B._betSizeList = [];
      B._betLevelList = [];
      B._betSizeValue = 0;
      B._betLevelValue = 0;
      B._baseBet = "";
      B._soundEffectUrls = {
        sliderEffect: "audio/slider_effect",
        listItemClick: "audio/list_item_click",
        menuIconPress: "audio/menu_icon_press",
        walletCountingAbove: "audio/wallet_counting_above"
      };
      B._soundEffectLoaded = {
        sliderEffect: false,
        listItemClick: false,
        menuIconPress: false,
        walletCountingAbove: false
      };
      B._autoSpinStartBalance = 0;
      B.balanceAmountLessThan = 0;
      B.autoSpinCount = 0;
      B.balanceAmountMoreThan = 0;
      B.singleWinAmount = 0;
      B._showChangeBetReminder = false;
      B._showForfeitProgressReminder = false;
      B._isShowBlackTintBg = false;
      B._settingMenuButtonHelper = new C.default();
      B._gameContext = V.getGameContext();
      B._isActionStateComplete = false;
      B._subscribePluginEvents();
      B._subscribeTransactionStateEvents();
      B._gameContext.on("Game.Initialized", B._setOperatorConfig.bind(B));
      return B;
    }
    __extends(U, w);
    Object.defineProperty(U.prototype, "path", {
      get: function () {
        return this._path;
      },
      set: function (B) {
        this._path = B;
      },
      enumerable: false,
      configurable: true
    });
    // 設定外部的 SettingMenuController
    U.prototype.setSettingMenuController = function (B) {
      this._settingMenuController = B;
    };
    Object.defineProperty(U.prototype, "settingMenuController", {
      get: function () {
        if (!this._settingMenuController) {
          throw Error("SettingMenuHelper :: settingMenuController : Cannot find settingMenuController. Please setup using setSettingMenuController first!");
        }
        return this._settingMenuController;
      },
      enumerable: false,
      configurable: true
    });
    // 初始化音效設定
    U.prototype.initAudio = function (B) {
      this._initAudio(B);
    };
    // 載入音效資源
    U.prototype.loadAudio = function (B) {
      this._loadAudio(B);
    };
    // 設定按鈕預製體與是否能被禁用
    U.prototype.setButtonPrefab = function (B, P, X = false) {
      this._settingMenuButtonHelper.setButtonPrefab(B, P, X);
    };
    Object.defineProperty(U.prototype, "autoSpinButtonLocaleIcon", {
      get: function () {
        if (!this._autoSpinButtonLocaleIcon) {
          throw Error("SettingMenuHelper :: autoSpinButtonLocaleIcon : Cannot find autoSpinButtonLocaleIcon. Please setup using settingMenuLocaleIcons setter first!");
        }
        return this._autoSpinButtonLocaleIcon;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "historyButtonLocaleIcon", {
      get: function () {
        if (!this._historyButtonIcon) {
          throw Error("SettingMenuHelper :: historyButtonLocaleIcon : Cannot find historyButtonLocaleIcon. Please setup using settingMenuLocaleIcons setter first!");
        }
        return this._historyButtonIcon;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "settingInfoFooterLocaleWinIcon", {
      get: function () {
        if (!this._settingInfoFooterWinIcon) {
          throw Error("SettingMenuHelper :: settingInfoFooterLocaleWinIcon : Cannot find settingInfoFooterLocaleWinIcon. Please setup using settingMenuLocaleIcons setter first!");
        }
        return this._settingInfoFooterWinIcon;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "turboOnButtonLocaleIcon", {
      get: function () {
        if (!this._turboOnButtonLocaleIcon) {
          throw Error("SettingMenuHelper :: turboOnButtonLocaleIcon : Cannot find turboOnButtonLocaleIcon. Please setup using settingMenuLocaleIcons setter first!");
        }
        return this._turboOnButtonLocaleIcon;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "turboOffButtonLocaleIcon", {
      get: function () {
        if (!this._turboOffButtonLocaleIcon) {
          throw Error("SettingMenuHelper :: turboOffButtonLocaleIcon : Cannot find turboOffButtonLocaleIcon. Please setup using settingMenuLocaleIcons setter first!");
        }
        return this._turboOffButtonLocaleIcon;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "settingMenuLocaleIcons", {
      set: function (B) {
        this._autoSpinButtonLocaleIcon = B.getSpriteFrame("txt_auto");
        this._historyButtonIcon = B.getSpriteFrame("ic_hist");
        if (this._historyButton) {
          this._historyButton.setIconSprite(this._historyButtonIcon);
        }
        this._settingInfoFooterWinIcon = B.getSpriteFrame("ic_win");
        if (this._settingInfoFooter) {
          this._settingInfoFooter.setWinIcon(this._settingInfoFooterWinIcon);
        }
        this._turboOnButtonLocaleIcon = B.getSpriteFrame("txt_turbo_on");
        this._turboOffButtonLocaleIcon = B.getSpriteFrame("txt_turbo_off");
      },
      enumerable: false,
      configurable: true
    });
    U.prototype._setupTurboSpinButton = function () {
      var B = this;
      var P = this.settingMenuController;
      var X = this._settingMenuButtonHelper.setupSettingMenuButtonInList(x.TURBO_SPIN, function () {
        if (!P.isSwitchingMenuLayer()) {
          B.setTurboSpinButtonState(!B.turboSpinOn);
          B.playMenuIconPressSound();
          if (F()) {
            P.hideMoreMenuLayer();
          }
        }
      });
      X.setTurboSprites(this.turboOnButtonLocaleIcon, this.turboOffButtonLocaleIcon);
      X.getTurboSpinCallback = function () {
        return this.turboSpinOn;
      }.bind(this);
      X.setButtonOnColor("setting", "color_button_transition_a");
      X.setButtonOffColor("setting", "white_button_transition_a");
      X.sprite.spriteFrame = X.turboSpinOn;
      X.spriteEffect.spriteFrame = X.turboSpinEffectOn;
      X.changeButtonColor(true);
      X.changeSpriteEffectColor();
      var J = this;
      this._triggerTurboSpinCallback = function () {
        this.stopTurboLighting();
        if (J.turboSpinOn) {
          this.playTurboLighting();
        } else {
          this.sprite.spriteFrame = this.turboSpinOff;
          this.spriteEffect.spriteFrame = X.turboSpinEffectOff;
        }
        this.changeButtonColor(true);
        P.showSettingTurboToast(J.turboSpinOn ? shell.I18n.t("SettingMenu.TurboSpinEnable") : shell.I18n.t("SettingMenu.TurboSpinDisable"), J.turboSpinOn, 2);
        J.sendEventToGoogleAnalytic(J.turboSpinOn);
      }.bind(X);
      this._triggerTurboSpinOnWatch = k.observeCallback(this, "turboSpinOn")(this._triggerTurboSpinCallback);
      P.addMenuItem(X.node);
      this._gameContext.on("Game.OnTurboSpin", function () {
        B.setTurboSpinButtonState(true);
      });
      this._gameContext.on("Game.OffTurboSpin", function () {
        B.setTurboSpinButtonState(false);
      });
    };
    U.prototype.setTurboSpinButtonState = function (B) {
      this.turboSpinOn = B;
      this._gameContext.emit("Game.TurboSpinStateChanged", this.turboSpinOn);
    };
    U.prototype.sendEventToGoogleAnalytic = function (B) {
      var P = {
        name: "Turbo Spin",
        index: B
      };
      if (cc.sys.isBrowser) {
        shell.ga.sendEvent(shell.ga.CATEGORY_GENERAL, shell.ga.EVENT_CHANGE_SETTING, P);
      }
    };
    U.prototype.setupSettingMenuButtons = function () {
      var B = this;
      var P = this.settingMenuController;
      var X = this._settingMenuButtonHelper;
      var J = this;
      this._internalMuteIconCallback = function () {
        if (F()) {
          P.muteIcon.active = false;
        } else if (P.isIdle()) {
          P.muteIcon.active = !B.soundOn;
        }
      };
      this._internalMuteIconCallback();
      this._internalMuteIconWatch = k.observeCallback(this, "soundOn")(this._internalMuteIconCallback);
      var Z0;
      function Z1(Z2) {
        var Z3 = X.setupSettingMenuButtonInList(x.SOUND, function () {
          B._onClickSoundControlButton();
          if (F()) {
            P.hideMoreMenuLayer();
          }
        });
        Z3.setTitle(shell.I18n.t("SettingMenu.SettingSoundWord"));
        var Z4 = P.addMenuItem(Z3.node);
        B._internalSoundControlCallback = function () {
          this.sprite.spriteFrame = J.soundOn ? this.soundOn : this.soundOff;
          if (this.largeSprite) {
            this.largeSprite.spriteFrame = J.soundOn ? this.largeSoundOnIcon : this.largeSoundOffIcon;
          }
        }.bind(Z3);
        B._landscapeSoundButtonNode = Z3.node;
        B._landscapePrimeHolder = Z4;
        if (!B._audioConfigure) {
          B.soundEnable = B._audioConfigure;
          B.setLockAccess(x.SOUND, true);
        }
        B._internalSoundControlCallback();
        B._internalSoundOnWatch = k.observeCallback(B, "soundOn")(B._internalSoundControlCallback);
        if (Z2) {
          Z3.customSetup();
        }
      }
      if (this._turboSpinEnable) {
        this._setupTurboSpinButton();
        if (F()) {
          (function () {
            var Z2 = X.setupIndependentSettingMenuButton(x.SOUND, function () {
              B._onClickSoundControlButton();
              P.hideMoreMenuLayer();
            });
            if (!Z2) {
              throw Error("SettingMenuHelper :: setupSettingMenuButtons : fail to setupIndependentSettingMenuButton when creating landscape sound button");
            }
            Z2.setTitle(shell.I18n.t("SettingMenu.SettingSoundWord"));
            P.landscapeSoundButtonHolder.addChild(Z2.node);
            B._internalSoundControlCallback = function () {
              this.sprite.spriteFrame = J.soundOn ? this.soundOn : this.soundOff;
              if (this.largeSprite) {
                this.largeSprite.spriteFrame = J.soundOn ? this.largeSoundOnIcon : this.largeSoundOffIcon;
              }
            }.bind(Z2);
            B._landscapeSoundButtonNode = Z2.node;
            B._landscapePrimeHolder = P.landscapeSoundButtonHolder;
            if (!B._audioConfigure) {
              B.soundEnable = B._audioConfigure;
              B.setLockAccess(x.SOUND, true);
            }
            B._internalSoundControlCallback();
            B._internalSoundOnWatch = k.observeCallback(B, "soundOn")(B._internalSoundControlCallback);
            Z2.customSetup();
          })();
        }
      } else {
        Z1(true);
      }
      (Z0 = this._minusBetButton = X.setupSettingMenuButtonInList(x.MINUS_BET, this.decreaseBet.bind(this))).setShowSettingToastCallback(P.showSettingToast.bind(P));
      Z0.setHideSettingToastCallback(P.hideSettingToast.bind(P));
      P.addMenuItem(Z0.node);
      (Z0 = this._plusBetButton = X.setupSettingMenuButtonInList(x.PLUS_BET, this.increaseBet.bind(this))).setShowSettingToastCallback(P.showSettingToast.bind(P));
      Z0.setHideSettingToastCallback(P.hideSettingToast.bind(P));
      P.addMenuItem(Z0.node);
      if (this._autoPlayConfig) {
        (Z0 = this._spinOptionButton = X.setupSettingMenuButtonInList(x.SPIN_OPTIONS, this._onClickAutoSpinMenuButton.bind(this))).setAutoSpinSprite(this.autoSpinButtonLocaleIcon);
        P.addMenuItem(Z0.node);
      }
      Z0 = X.setupSettingMenuButtonInList(x.MORE_MENU, this.showMoreMenuLayer.bind(this), this._autoPlayConfig ? "white_button_transition_a" : "color_button_transition_a");
      P.addMenuItem(Z0.node);
      if (!this._autoPlayConfig) {
        Z0.customSetup();
        P.addEmptyItem();
        this._emptyButtonHolderOccupied += 1;
      }
      if (this._backButtonType === L.NORMAL_BACK_FUNC) {
        Z0 = X.setupSettingMenuButtonInList(x.QUIT, this.onClickQuitButton.bind(this));
        P.addMenuItem(Z0.node);
      }
      if (this._turboSpinEnable && !F()) {
        Z1(false);
      }
      Z0 = X.setupSettingMenuButtonInList(x.PAYTABLE, this._onClickPayoutMenuButton.bind(this));
      P.addMenuItem(Z0.node);
      Z0 = X.setupSettingMenuButtonInList(x.RULE, this._onClickRulesMenuButton.bind(this));
      P.addMenuItem(Z0.node);
      (Z0 = this._historyButton = X.setupSettingMenuButtonInList(x.HISTORY, this._onClickHistoryMenuButton.bind(this))).setIconSprite(this.historyButtonLocaleIcon);
      P.addMenuItem(Z0.node);
      Z0 = X.setupSettingMenuButtonInList(x.HIDE_MORE, this._onClickHideMoreMenuButton.bind(this));
      P.addMenuItem(Z0.node);
      if (Z0 = this._maxBetButton = this._settingMenuButtonHelper.setupIndependentSettingMenuButton(x.MAX_BET, this.maxBet.bind(this))) {
        this.settingInfoFooter.maxBetButtonHolder.addChild(Z0.node);
        Z0.setShowSettingToastCallback(P.showSettingToast.bind(P));
        Z0.setHideSettingToastCallback(P.hideSettingToast.bind(P));
      }
      this._hideAvailableButtonHolder();
      P.updateLayout(H());
    };
    U.prototype._hideAvailableButtonHolder = function () {
      var B = this.settingMenuController.buttonsHolder();
      var P = this._settingMenuButtonHelper.totalButtonsOccupied();
      for (var X = B.length - P - this._emptyButtonHolderOccupied, J = B.length - 1; J >= 0 && !(X <= 0); J--) {
        B[J].active = false;
        X--;
      }
    };
    U.prototype.setFeatureBuyToastNodePosition = function (B, P, X) {
      this.settingMenuController.setFeatureBuyToastNodePosition(B, P, X);
    };
    Object.defineProperty(U.prototype, "menuChangedCallBack", {
      set: function (B) {
        this._menuChangedCallBack = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "backButtonType", {
      get: function () {
        return this._backButtonType;
      },
      set: function (B) {
        this._backButtonType = B;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.setOnClickReturnButtonCallback = function (B) {
      this._onClickReturnButtonCallback = B;
    };
    U.prototype.setIsControllerPresenting = function (B) {
      this.settingMenuController.setIsControllerPresenting(B);
    };
    U.prototype._onClickAutoSpinMenuButton = function () {
      this.playMenuIconPressSound();
      if (!this.settingMenuController.isPanelTouchMoving()) {
        this.openAutoSpinMenu();
      }
    };
    U.prototype._onClickBetMenuButton = function () {
      this.playMenuIconPressSound();
      if (!this.settingMenuController.isPanelTouchMoving()) {
        this.openBetMenu();
      }
    };
    U.prototype._onClickSoundControlButton = function () {
      this.playMenuIconPressSound();
      this.toggleSound();
    };
    U.prototype._onClickHistoryMenuButton = function (B = false) {
      this.playMenuIconPressSound();
      if (!this.settingMenuController.isPanelTouchMoving()) {
        this.openHistoryMenu(B);
      }
    };
    U.prototype._onClickPayoutMenuButton = function () {
      this.playMenuIconPressSound();
      if (!this.settingMenuController.isPanelTouchMoving()) {
        this.openPayoutMenu();
      }
    };
    U.prototype._onClickRulesMenuButton = function () {
      this.playMenuIconPressSound();
      if (!this.settingMenuController.isPanelTouchMoving()) {
        this.openRulesMenu();
      }
    };
    U.prototype._onClickWalletMenuButton = function () {
      this.playMenuIconPressSound();
      this.openWalletMenu();
    };
    U.prototype._onClickHideMoreMenuButton = function () {
      this.playMenuIconPressSound();
      this.hideMoreMenuLayer();
    };
    U.prototype.openAutoSpinMenu = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        this._cancelBetReminderBoard();
        if (F()) {
          B.hideMoreMenuLayer();
        }
        B.setIsControllerPresenting(true);
        this._gameContext.emit("SlotMenu.ShowSpinOptions", undefined);
      }
    };
    U.prototype.openBetMenu = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        this._cancelBetReminderBoard();
        this.hideMoreMenuLayer();
        B.setIsControllerPresenting(true);
        this._toggleBetOptionsEvent(true);
        this._gameContext.emit("SlotMenu.ShowBetOptions", undefined);
      }
    };
    U.prototype.toggleSound = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        this.soundEnable = !this.soundEnable;
        var P = this.soundEnable === true ? "OnGameSound" : "OffGameSound";
        this._emitAnalyticsEvent(P);
        this.playMenuIconPressSound();
      }
    };
    U.prototype.openHistoryMenu = function (B = false) {
      var P = this.settingMenuController;
      if (!P.isControllerPresenting() && !P.isSwitchingMenuLayer()) {
        if (B) {
          this.hideMoreMenuLayer();
        }
        P.setIsControllerPresenting(true);
        this._gameContext.emit("History.ShowGame");
        this._cancelBetReminderBoard();
      }
    };
    U.prototype.openPayoutMenu = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        if (F()) {
          B.hideMoreMenuLayer();
        }
        B.setIsControllerPresenting(true);
        this._gameContext.emit("Paytable.Show");
      }
    };
    U.prototype.openRulesMenu = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        if (F()) {
          B.hideMoreMenuLayer();
        }
        B.setIsControllerPresenting(true);
        this._gameContext.emit("GameRules.Show");
      }
    };
    U.prototype.openWalletMenu = function () {
      var B = this.settingMenuController;
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        if (N) {
          this.activateWalletNotify(false);
          this._emitWalletEvent(N.WalletEventEnum.EN_WALLET_LIST_ANIM);
        }
      }
    };
    U.prototype.showMoreMenuLayer = function () {
      var B = this.settingMenuController;
      this.playMenuIconPressSound();
      if (shell.environment.getOrientationMode() === "port") {
        B.muteIcon.active = false;
      }
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        this._cancelBetReminderBoard();
        B.showMoreMenuLayer(this._isShowBlackTintBg);
        var P = this._menuChangedCallBack;
        if (P) {
          P(true, true);
        }
      }
    };
    U.prototype.hideMoreMenuLayer = function () {
      var B = this.settingMenuController;
      if (F()) {
        B.muteIcon.active = false;
      } else if (this.soundOn) {
        B.muteIcon.active = false;
      } else {
        B.muteIcon.active = true;
      }
      if (!B.isControllerPresenting() && !B.isSwitchingMenuLayer()) {
        this.settingInfoFooter.changeHolder(B.getSettingInfoFooterFrontHolder());
        B.hideMoreMenuLayer();
        var P = this._menuChangedCallBack;
        if (P) {
          P(false, true);
        }
      }
    };
    U.prototype.onClickQuitButton = function () {
      var B = this;
      var P = this.settingMenuController;
      if (!P.isSwitchingMenuLayer() && !P.isControllerPresenting()) {
        var X = {
          title_message: shell.I18n.t("SettingMenuHelper.QuitGameTitle"),
          content_message: shell.I18n.t("SettingMenuHelper.QuitGameMessage"),
          actions: [{
            title: shell.I18n.t("SettingMenuHelper.Cancel"),
            handler: function () {
              P.setIsControllerPresenting(false);
            }
          }, {
            title: shell.I18n.t("SettingMenuHelper.Quit"),
            handler: function () {
              P.setIsControllerPresenting(false);
              if (B._onClickReturnButtonCallback) {
                B._onClickReturnButtonCallback();
              }
            },
            auto_dismiss: false
          }]
        };
        P.setIsControllerPresenting(true);
        j.showDialog(X);
        this.playMenuIconPressSound();
      }
    };
    U.prototype.isBalanceHitTargetInAutoSpinMode = function (B, P) {
      var X = false;
      var J = this.singleWinAmount;
      var Z0 = this.balanceAmountMoreThan;
      var Z1 = this.balanceAmountLessThan;
      var Z2 = this._autoSpinStartBalance;
      if (J && B > J) {
        X = true;
      }
      if (Z0 && P >= Z2 + Z0) {
        X = true;
      }
      if (Z1 && P <= Z2 - Z1) {
        X = true;
      }
      return X;
    };
    U.prototype.stopSpinOptionButtonAnim = function () {
      if (this._spinOptionButton) {
        this._spinOptionButton.stopAutoSpinAnim();
      }
    };
    U.prototype.playSpinOptionButtonAnim = function () {
      if (this._spinOptionButton) {
        this._spinOptionButton.playAutoSpinAnim();
      }
    };
    Object.defineProperty(U.prototype, "autoSpinCallback", {
      set: function (B) {
        var P = this;
        this._autoSpinCallback = function (X) {
          var J = X.payload;
          P.autoSpinCount = J.autoSpinCount;
          P.singleWinAmount = J.singleWinAmount;
          P.balanceAmountMoreThan = J.balanceAmountMoreThan;
          P.balanceAmountLessThan = J.balanceAmountLessThan;
          P._autoSpinStartBalance = J.autoSpinStartBalance;
          if (P.autoSpinCount > 0) {
            P.playSpinOptionButtonAnim();
          }
          if (B) {
            B();
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "turboSpinCallback", {
      set: function (B) {
        if (this._turboSpinCallback) {
          if (this._turboSpinWatch) {
            this._turboSpinWatch();
          }
          this._turboSpinCallback = undefined;
        }
        this._turboSpinCallback = function () {
          if (B) {
            B();
          }
        };
        this._turboSpinWatch = k.observeCallback(this, "turboSpinOn")(this._turboSpinCallback);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "additionalBetCalculationCallback", {
      set: function (B) {
        this._gameContext.emit("SlotMenu.UpdateAdditionalBetCalculation", B);
        this._additionalBetCalculationCallback = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "audioConfigure", {
      get: function () {
        return this._audioConfigure;
      },
      set: function (B) {
        this._audioConfigure = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "showChangeBetReminder", {
      set: function (B) {
        this._showChangeBetReminder = B;
        this._gameContext.emit("SlotMenu.SetShowChangeBetReminder", B);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "showForfeitProgressReminder", {
      set: function (B) {
        this._showForfeitProgressReminder = B;
        this._gameContext.emit("SlotMenu.SetShowForfeitProgressReminder", B);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "manualUpdateBetFactorCallBack", {
      set: function (B) {
        var P = this;
        this._manualUpdateBetFactorCallback = function (X, J) {
          P.checkSelectedValue(k.toDecimalWithExp(X * J * P.betLineValue, 2));
          B(X, J);
        };
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "finishBetPickCallback", {
      set: function (B) {
        this._finishBetPickCallback = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "cancelBetPanelCallback", {
      set: function (B) {
        this._cancelBetPanelCallback = B;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.updateBetLabelCallback = function (B) {
      this._updateBetLabelCallback = B;
    };
    U.prototype.updateBetValues = function (B = 0) {
      if (!this._additionalBetCalculationCallback) {
        this._additionalBetCalculationCallback = function (J, Z0, Z1) {
          return J * Z0 * Z1;
        };
        this._gameContext.emit("SlotMenu.UpdateAdditionalBetCalculation", this._additionalBetCalculationCallback);
      }
      this._selectedBetAmount = k.toFixed(this.betLineValue * this.betLevelValue * this.betSizeValue, 2);
      var P = this._additionalBetCalculationCallback(this.betLineValue, this.betLevelValue, this.betSizeValue);
      var X = k.formatCurrency(P);
      if (this._updateBetLabelCallback) {
        this._updateBetLabelCallback(X, B);
      }
      this._emitTransactionInfoChangedEvent({
        totalBet: k.toDecimalWithExp(P, 2)
      });
    };
    U.prototype._isBetSizeValid = function () {
      var B = this.betSizeList;
      var P = this.betSizeValue;
      return !!B && !!cc.js.isNumber(P) && B.indexOf(P) !== -1;
    };
    U.prototype._isBetlevelValid = function () {
      var B = this.betLevelList;
      var P = this.betLevelValue;
      return !!B && !!cc.js.isNumber(P) && B.indexOf(P) !== -1;
    };
    U.prototype._isBetAmountInvalidWithMinimumBetAmount = function () {
      var B = k.toDecimalWithExp(this.betLineValue * this.betLevelValue * this.betSizeValue, 2);
      return this._minimumBetAmount && B < this._minimumBetAmount && (!this._featureBuyThreshold || B > this._featureBuyThreshold) && B.toFixed(2) !== this._validMinimumBetAmount;
    };
    U.prototype.reevaluateBet = function () {
      return (!this._isBetSizeValid() || !this._isBetlevelValid() || !!this._isBetAmountInvalidWithMinimumBetAmount()) && !(this._resetInValidBetSizeAndBetLevel(), this.checkSelectedValue(k.toDecimalWithExp(this.betSizeValue * this.betLevelValue * this.betLineValue, 2)), this._reevaluateBetCallback && this._reevaluateBetCallback(this.betSizeValue, this.betLevelValue), 0);
    };
    U.prototype.showInvalidBetDialog = function () {
      var B = this;
      var P = {
        title_message: undefined,
        content_message: shell.I18n.t("SettingMenuHelper.ReevaluateBet"),
        actions: [{
          title: shell.I18n.t("SettingMenuHelper.Select"),
          handler: function () {
            B.openBetMenu();
          }
        }]
      };
      j.showDialog(P);
    };
    Object.defineProperty(U.prototype, "betModifierUpdateCallback", {
      get: function () {
        return this._betModifierUpdateCallback;
      },
      set: function (B) {
        this._betModifierUpdateCallback = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "reevaluateBetCallback", {
      set: function (B) {
        this._reevaluateBetCallback = B;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype._cancelBetReminderBoard = function () {
      var B = this.settingMenuController;
      if (B.isSettingBetReminderBoardShowed()) {
        this._selectedBetAmount = this._prevSelectedBetAmount;
        this.betSizeValue = this._prevBetSizeValue;
        this.betLevelValue = this._prevBetLevelValue;
        this._selectedBet = this._prevSelectedBet;
        this.updateBetValues();
        this.checkSelectedValue(this._prevSelectedBetAmount);
        B.hideBetReminderBoard();
        if (this._cancelBetReminderBoardCallback) {
          this._cancelBetReminderBoardCallback();
        }
      }
    };
    U.prototype.setBetReminderCancelAndConfirmCallback = function (B, P) {
      var X = this;
      var J = this.settingMenuController;
      this._cancelBetReminderBoardCallback = B;
      J.setBetReminderCancelAndConfirmCallback(this._cancelBetReminderBoard.bind(this), function () {
        if (X._prevBetSizeValue !== X.betSizeValue || X._prevBetLevelValue !== X.betLevelValue) {
          J.hideBetReminderBoard();
          if (P) {
            P(X.betSizeValue, X.betLevelValue);
          }
          X._gameContext.emit("SlotMenu.ChangeBet", X._selectedBetAmount);
        } else {
          X._cancelBetReminderBoard();
        }
      });
    };
    U.prototype.setBetReminderTriggerCallback = function (B) {
      this._betReminderTriggerCallback = B;
    };
    U.prototype.preCalculateCombination = function () {
      var B = this.betSizeList || [];
      var P = this.betLevelList || [];
      var X = this.betLineValue || 0;
      if (B.length !== 0 && P.length !== 0 && X !== 0) {
        var J;
        var Z0 = this._minimumBetAmount;
        var Z1 = this._featureBuyThreshold;
        var Z2 = [];
        this._validMinimumBetAmount = undefined;
        if (Z0) {
          if (Z1) {
            J = [];
          }
          Z7 = 0;
          for (var Z3 = B.length; Z7 < Z3; Z7++) {
            for (var Z4 = 0, Z5 = P.length; Z4 < Z5; Z4++) {
              var Z6 = k.toDecimalWithExp(B[Z7] * P[Z4] * X, 2);
              if (Z6 >= Z0) {
                if (this._validMinimumBetAmount === undefined) {
                  this._validMinimumBetAmount = k.toFixed(Z6, 2);
                }
                Z2[Z7] = P.slice(Z4);
                break;
              }
              if (Z1 && (Z1 < Z0 && Z6 <= Z1 || Z1 >= Z0 && Z6 < Z0)) {
                J[Z7] ||= [];
                J[Z7].push(P[Z4]);
              }
              if (Z4 === Z5 - 1) {
                Z2[Z7] = [];
              }
            }
          }
          if (this._validMinimumBetAmount === undefined) {
            this._validMinimumBetAmount = k.toFixed(B[0] * P[0] * X, 2);
            this._betCombinationDict = Object.create(null);
            this._betCombinationDict[this._validMinimumBetAmount] = {
              betSize: B[0],
              betLevel: P[0]
            };
            return;
          }
        } else {
          for (var Z7 = 0; Z7 < B.length; Z7++) {
            Z2[Z7] = P;
          }
          this._validMinimumBetAmount = k.toFixed(B[0] * P[0] * X, 2);
        }
        function Z8(ZO, ZR) {
          if (ZO < 2) {
            return ZR.slice();
          }
          var ZK = ZR.length;
          if (ZK < (ZO > 2 ? 4 : 6)) {
            return ZR.slice();
          }
          var Zg = ZR[ZR.length - 1];
          var ZT = [Zg];
          if (ZO === 2) {
            ZT.unshift(Zg - (Math.round(ZK / 5) || 1));
          }
          ZT.unshift(Zg - (Math.floor(ZK / 2) || 1));
          if (ZO === 2) {
            ZT.unshift(ZT[0] - (Math.floor(ZK / 5) || 1));
          }
          var Zx = ZR[0];
          ZT.unshift(Zx + (Math.floor(ZK / 10) || 1));
          ZT.unshift(Zx);
          return ZT;
        }
        var Z9 = Object.create(null);
        Z7 = 0;
        Z3 = B.length;
        for (; Z7 < Z3; Z7++) {
          var ZZ = Z8(Z7, Z2[Z7]);
          if (J && J[Z7]) {
            ZZ = ZZ.concat(J[Z7]);
          }
          if (ZZ.length !== 0) {
            Z4 = 0;
            Z5 = P.length;
            for (; Z4 < Z5; Z4++) {
              if (ZZ.includes(P[Z4])) {
                var ZI = k.toFixed(B[Z7] * P[Z4] * X, 2);
                var Zd = {
                  betSize: B[Z7],
                  betLevel: P[Z4]
                };
                Z9[ZI] ||= Zd;
              }
            }
          }
        }
        this._betCombinationDict = Z9;
      }
    };
    U.prototype._resetInValidBetSizeAndBetLevel = function () {
      var B = this._betCombinationDict[this._validMinimumBetAmount];
      this.betSizeValue = B.betSize;
      this.betLevelValue = B.betLevel;
    };
    U.prototype.checkSelectedValue = function (B) {
      var P;
      var X;
      var J = +B;
      if (this._minimumBetAmount && J < this._minimumBetAmount && (!this._featureBuyThreshold || J > this._featureBuyThreshold)) {
        J = this._minimumBetAmount;
      }
      B = k.toFixed(J, 2);
      if (!this._betCombinationDict) {
        throw Error("SettingMenuHelper :: checkSelectedValue : bet combination did not generate due to size or level empty");
      }
      var Z0 = Object.keys(this._betCombinationDict).sort(function (Z2, Z3) {
        var Z4 = parseFloat(Z2);
        var Z5 = parseFloat(Z3);
        if (Z4 < Z5) {
          return -1;
        } else if (Z4 > Z5) {
          return 1;
        } else {
          return 0;
        }
      });
      var Z1 = Z0.indexOf(B);
      if (Z1 === -1) {
        this._selectedBetAmount = B;
        this._selectedBet = undefined;
        this._minusBetButton.updateBetModifierColor(1);
        this._plusBetButton.updateBetModifierColor(1, Z0.length - 1);
        if ((P = this._maxBetButton) !== null && P !== undefined) {
          P.updateBetModifierColor(1, Z0.length - 1);
        }
      } else {
        this._selectedBet = Z1;
        this._minusBetButton.updateBetModifierColor(Z1);
        this._plusBetButton.updateBetModifierColor(Z1, Z0.length - 1);
        if ((X = this._maxBetButton) !== null && X !== undefined) {
          X.updateBetModifierColor(Z1, Z0.length - 1);
        }
      }
    };
    U.prototype._handleBetReminder = function (B) {
      var P;
      var X = this;
      var J = this.settingMenuController;
      if (this._showChangeBetReminder || this._showForfeitProgressReminder) {
        if (!J.isSettingBetReminderBoardShowed()) {
          this._prevSelectedBetAmount = this._selectedBetAmount;
          this._prevBetSizeValue = this.betSizeValue;
          this._prevBetLevelValue = this.betLevelValue;
          this._prevSelectedBet = this._selectedBet;
          if (B.selectedBet !== this._prevSelectedBet) {
            if ((P = this._gameContext) !== null && P !== undefined) {
              P.emit("SlotMenu.GetShowChangeBetReminder", undefined, function (Z0) {
                var Z1;
                var Z2 = "";
                if (Z0.response) {
                  Z2 = shell.I18n.t("BetOptions.BetChangeProgressRemind");
                  J.setBetChangeReminderLabel(Z2);
                } else if ((Z1 = X._gameContext) !== null && Z1 !== undefined) {
                  Z1.emit("SlotMenu.GetShowForfeitProgressReminder", undefined, function (Z3) {
                    if (Z3.response) {
                      Z2 = shell.I18n.t("BetOptions.BetChangeForfeitProgressRemind");
                      J.setBetChangeReminderLabel(Z2);
                    }
                  });
                }
                J.showBetReminderBoard(k.formatCurrency(parseFloat(X._prevSelectedBetAmount)));
              });
            }
            if (this._betReminderTriggerCallback) {
              this._betReminderTriggerCallback();
            }
          }
        }
      } else {
        this._emitBetChangeEvent(parseFloat(B.selectedBetAmount));
      }
    };
    U.prototype._replaceCssTagNameToColor = function (B, P) {
      var X = RegExp("<" + B + " style=['\"]color:\\s*([^'\"]+)['\"]>", "gi");
      return P.replace(X, "<color=$1>").replace("</" + B + ">", "</color>");
    };
    U.prototype._handleFeatureBuyToast = function (B) {
      if (this._minimumBetAmount && this._featureBuyThreshold) {
        if (B < this._minimumBetAmount && B <= this._featureBuyThreshold) {
          var P = this._replaceCssTagNameToColor("span", shell.I18n.t("FeatureBuy.BetForFeatureBuyOnly"));
          var X = this._replaceCssTagNameToColor("span", shell.I18n.t("FeatureBuy.BetSuggestion", {
            amount: k.formatCurrency(this._minimumBetAmount)
          }));
          this.settingMenuController.showFeatureBuyToast(P + "\n" + X, 2);
        } else {
          this.settingMenuController.hideFeatureBuyToast();
        }
      }
    };
    U.prototype.increaseBet = function () {
      var B;
      var P = this.settingMenuController;
      if (!P.isSwitchingMenuLayer()) {
        if (!this._betCombinationDict) {
          throw Error("SettingMenuHelper :: increaseBet : bet combination did not generate");
        }
        var X = Object.keys(this._betCombinationDict).sort(function (Z1, Z2) {
          var Z3 = parseFloat(Z1);
          var Z4 = parseFloat(Z2);
          if (Z3 < Z4) {
            return -1;
          } else if (Z3 > Z4) {
            return 1;
          } else {
            return 0;
          }
        });
        var J = this._plusBetButton.increaseBet(X, this._selectedBet, this._selectedBetAmount);
        this._handleBetReminder(J);
        this._handleFeatureBuyToast(+J.selectedBetAmount);
        this._minusBetButton.updateBetModifierColor(J.selectedBet);
        this._plusBetButton.updateBetModifierColor(J.selectedBet, X.length - 1);
        if ((B = this._maxBetButton) !== null && B !== undefined) {
          B.updateBetModifierColor(J.selectedBet, X.length - 1);
        }
        var Z0 = this._selectedBet = J.selectedBet;
        this._selectedBetAmount = J.selectedBetAmount;
        this.betSizeValue = this._betCombinationDict[X[Z0]].betSize;
        this.betLevelValue = this._betCombinationDict[X[Z0]].betLevel;
        this.updateBetValues(E(Z0, this._betCombinationDict));
        if (!this._showChangeBetReminder && !this._showForfeitProgressReminder) {
          if (this._betModifierUpdateCallback) {
            this._betModifierUpdateCallback(this.betSizeValue, this.betLevelValue);
          }
        }
        if (F()) {
          P.hideMoreMenuLayer();
        }
      }
    };
    U.prototype.decreaseBet = function () {
      var B;
      var P = this.settingMenuController;
      if (!P.isSwitchingMenuLayer()) {
        if (!this._betCombinationDict) {
          throw Error("SettingMenuHelper :: decreaseBet : bet combination did not generate");
        }
        var X = Object.keys(this._betCombinationDict).sort(function (Z1, Z2) {
          var Z3 = parseFloat(Z1);
          var Z4 = parseFloat(Z2);
          if (Z3 < Z4) {
            return -1;
          } else if (Z3 > Z4) {
            return 1;
          } else {
            return 0;
          }
        });
        var J = this._minusBetButton.decreaseBet(X, this._selectedBet, this._selectedBetAmount);
        this._handleBetReminder(J);
        this._handleFeatureBuyToast(+J.selectedBetAmount);
        this._minusBetButton.updateBetModifierColor(J.selectedBet);
        this._plusBetButton.updateBetModifierColor(J.selectedBet, X.length - 1);
        if ((B = this._maxBetButton) !== null && B !== undefined) {
          B.updateBetModifierColor(J.selectedBet, X.length - 1);
        }
        var Z0 = this._selectedBet = J.selectedBet;
        this._selectedBetAmount = J.selectedBetAmount;
        this.betSizeValue = this._betCombinationDict[X[Z0]].betSize;
        this.betLevelValue = this._betCombinationDict[X[Z0]].betLevel;
        this.updateBetValues(E(Z0, this._betCombinationDict));
        if (!this._showChangeBetReminder && !this._showForfeitProgressReminder) {
          if (this._betModifierUpdateCallback) {
            this._betModifierUpdateCallback(this.betSizeValue, this.betLevelValue);
          }
        }
        if (F()) {
          P.hideMoreMenuLayer();
        }
      }
    };
    U.prototype.maxBet = function () {
      var B = this.settingMenuController;
      if (!B.isSwitchingMenuLayer()) {
        if (!this._betCombinationDict) {
          throw Error("SettingMenuHelper :: maxBet : bet combination did not generate");
        }
        if (!this._maxBetButton) {
          throw Error("SettingMenuHelper :: maxBet : max bet button cannot be found");
        }
        var P = Object.keys(this._betCombinationDict).sort(function (Z0, Z1) {
          var Z2 = parseFloat(Z0);
          var Z3 = parseFloat(Z1);
          if (Z2 < Z3) {
            return -1;
          } else if (Z2 > Z3) {
            return 1;
          } else {
            return 0;
          }
        });
        var X = this._maxBetButton.maxBet(P);
        this._handleBetReminder(X);
        this._minusBetButton.updateBetModifierColor(X.selectedBet);
        this._plusBetButton.updateBetModifierColor(X.selectedBet, P.length - 1);
        this._maxBetButton.updateBetModifierColor(X.selectedBet, P.length - 1);
        var J = this._selectedBet = X.selectedBet;
        this._selectedBetAmount = X.selectedBetAmount;
        this.betSizeValue = this._betCombinationDict[P[J]].betSize;
        this.betLevelValue = this._betCombinationDict[P[J]].betLevel;
        this.updateBetValues(E(J, this._betCombinationDict));
        if (!this._showChangeBetReminder && !this._showForfeitProgressReminder) {
          if (this._betModifierUpdateCallback) {
            this._betModifierUpdateCallback(this.betSizeValue, this.betLevelValue);
          }
        }
        if (F()) {
          B.hideMoreMenuLayer();
        }
      }
    };
    Object.defineProperty(U.prototype, "changeSoundVolume", {
      set: function (B) {
        var P = this;
        if (this._changeSoundVolumeCallback) {
          if (this._soundOnWatch) {
            this._soundOnWatch();
          }
          this._changeSoundVolumeCallback = undefined;
        }
        this._changeSoundVolumeCallback = function () {
          P._emitAudioStateChangeEvent(P.soundOn);
          if (B) {
            B(P.soundOn);
          }
        };
        this._soundOnWatch = k.observeCallback(this, "soundOn")(this._changeSoundVolumeCallback);
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.setBalance = function (B, P) {
      var X = this;
      if (P === undefined) {
        P = true;
      }
      var J = this._shouldBalanceIncreaseSfxPlay(B);
      this._requestTransactionInfo(function (Z0) {
        if (J) {
          X.playWalletCountingAboveSfx();
        }
        var Z1 = k.toDecimalWithExp(Z0 && Z0.balance || B, 2);
        X.settingInfoFooter.updateBalance(undefined, Z1, P);
        X._emitTransactionInfoChangedEvent({
          balance: Z1
        });
      });
    };
    U.prototype.setWinAmount = function (B, P = true, X = true) {
      this.settingInfoFooter.updateWinAmount(B, P, X);
      this._gameContext.emit("SlotMenu.UpdateWinAmount", B);
      this._emitTransactionInfoChangedEvent({
        totalWin: k.toDecimalWithExp(B, 2)
      });
    };
    U.prototype.setAllButtonsInteractable = function (B, P = true) {
      this._settingMenuButtonHelper.setAllButtonsInteractable(B);
      if (B) {
        this.checkSelectedValue(k.toDecimalWithExp(this.betSizeValue * this.betLevelValue * this.betLineValue, 2));
      }
    };
    U.prototype.setLockAccess = function (B, P) {
      this._settingMenuButtonHelper.setLockAccess(B, P);
    };
    U.prototype.isButtonLocked = function (B) {
      return this._settingMenuButtonHelper.isButtonLocked(B);
    };
    U.prototype.setButtonInteractableFlag = function (B, P = false) {
      this._settingMenuButtonHelper.setButtonInteractableFlag(B, P);
    };
    U.prototype.setButtonInteractable = function (B) {
      this._settingMenuButtonHelper.setButtonInteractable(B);
    };
    U.prototype.setLockAccessAutoSpinPanel = function (B) {
      this.setLockAccess(x.SPIN_OPTIONS, B);
    };
    U.prototype.setLockAccessBetPanel = function (B) {
      this.setLockAccess(x.BET_OPTIONS, B);
    };
    U.prototype.setLockMoreMenuButton = function (B) {
      this.setLockAccess(x.MORE_MENU, B);
    };
    U.prototype.setHidden = function (B) {
      this._isHidden = B;
      this.settingMenuController.setHidden(B);
    };
    U.prototype.isIdle = function () {
      return this.settingMenuController.isIdle();
    };
    Object.defineProperty(U.prototype, "isShowBlackTintBg", {
      set: function (B) {
        this._isShowBlackTintBg = B;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.activateWalletNotify = function (B) {
      this.settingInfoFooter.activateWalletNotify(B);
    };
    U.prototype.addSettingInfoFooter = function (B) {
      this._settingInfoFooter = B;
      this._settingMenuButtonHelper.setupOtherButtonInList(x.WALLET, B.interactableWalletButton.bind(B));
      B.updateLayout(H());
      B.setWinIcon(this.settingInfoFooterLocaleWinIcon);
      B.setOpenWalletMenuCallback(this._onClickWalletMenuButton.bind(this));
      B.showBackground(false);
      B.changeHolder(this.settingMenuController.getSettingInfoFooterFrontHolder());
      this._settingMenuButtonHelper.setupOtherButtonInList(x.BET_OPTIONS, B.interactableBetOptionsButton.bind(B));
      B.setOpenBetOptionsMenuCallback(this._onClickBetMenuButton.bind(this));
      this.updateBetLabelCallback(B.updateBetAmount.bind(B));
      this._settingMenuButtonHelper.setupOtherButtonInList(x.WIN, B.interactableWinButton.bind(B));
      B.setOpenWinMenuCallback(this._onClickHistoryMenuButton.bind(this, true));
      B.boot();
    };
    U.prototype.getSettingInfoFooter = function () {
      return this.settingInfoFooter;
    };
    Object.defineProperty(U.prototype, "settingInfoFooter", {
      get: function () {
        if (!this._settingInfoFooter) {
          throw Error("SettingMenuHelper :: settingInfoFooter : Cannot find settingInfoFooter. Please setup setting info footer first! (addSettingInfoFooter)");
        }
        return this._settingInfoFooter;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.showSettingInfoFooterBackground = function (B) {
      this.settingInfoFooter.showBackground(B);
    };
    U.prototype.setFreeGameMode = function (B) {
      var P;
      var X;
      this.isFreeGameMode = B;
      if (B) {
        this.setLockAccess(x.BET_OPTIONS, true);
        this._plusBetButton.buttonActivate(false);
        this._minusBetButton.buttonActivate(false);
        if ((P = this._maxBetButton) !== null && P !== undefined) {
          P.buttonActivate(false);
        }
      } else {
        this.setLockAccess(x.BET_OPTIONS, false);
        this._plusBetButton.buttonActivate(true);
        this._minusBetButton.buttonActivate(true);
        if ((X = this._maxBetButton) !== null && X !== undefined) {
          X.buttonActivate(true);
        }
        this.checkSelectedValue(k.toDecimalWithExp(this.betSizeValue * this.betLevelValue * this.betLineValue, 2));
      }
    };
    U.prototype.getCurrentBalance = function () {
      return this.settingInfoFooter.currentBalance;
    };
    U.prototype.additionalBetCalculation = function () {
      if (!this._additionalBetCalculationCallback) {
        throw Error("SettingMenuHelper :: additionalBetCalculation : Please set calculation callback via additionalBetCalculationCallback setter first!");
      }
      return this._additionalBetCalculationCallback(this.betLineValue, this.betLevelValue, this.betSizeValue);
    };
    Object.defineProperty(U.prototype, "betLineValue", {
      get: function () {
        return this._betLineValue;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetBetLineValue", B);
        this._betLineValue = B;
        this.preCalculateCombination();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "betSizeList", {
      get: function () {
        return this._betSizeList;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetBetSizeList", B);
        this._betSizeList = B;
        this.preCalculateCombination();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "betSizeValue", {
      get: function () {
        return this._betSizeValue;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetBetSizeValue", B);
        this._betSizeValue = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "minimumBetAmount", {
      get: function () {
        return this._minimumBetAmount;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetMinimumBetAmount", B);
        this._minimumBetAmount = B;
        this.preCalculateCombination();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "featureBuyThreshold", {
      get: function () {
        return this._featureBuyThreshold;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetFeatureBuyThreshold", B);
        this._featureBuyThreshold = B;
        this.preCalculateCombination();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "betLevelList", {
      get: function () {
        return this._betLevelList;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetBetLevelList", B);
        this._betLevelList = B;
        this.preCalculateCombination();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "betLevelValue", {
      get: function () {
        return this._betLevelValue;
      },
      set: function (B) {
        this._gameContext.emit("SlotMenu.SetBetLevelValue", B);
        this._betLevelValue = B;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "baseBet", {
      get: function () {
        return this._baseBet;
      },
      set: function (B) {
        this._baseBet = B;
        this._gameContext.emit("SlotMenu.SetBaseBet", B);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(U.prototype, "soundEnable", {
      get: function () {
        return A.soundOn;
      },
      set: function (B) {
        this.soundOn = B;
        A.soundOn = B;
      },
      enumerable: false,
      configurable: true
    });
    U.prototype.playWalletCountingAboveSfx = function () {
      var B = this.walletCountingAbove;
      if (B) {
        B.play();
      }
    };
    U.prototype.playMenuIconPressSound = function () {
      var B = this.menuIconPress;
      if (B) {
        B.play();
      }
    };
    U.prototype.playListItemClickSound = function () {
      var B = this.listItemClick;
      if (B) {
        B.play();
      }
    };
    U.prototype.playSliderEffectSound = function () {
      var B = this.sliderEffect;
      if (B) {
        B.play();
      }
    };
    U.prototype._initAudio = function (B) {
      for (var P in this._soundEffectUrls) {
        this[P] = new B({
          preload: false,
          src: k.getCocosMajor() >= 4 ? "/lib/setting_menu/" + this._soundEffectUrls[P] : cc.url.raw("/resources/lib/setting_menu/" + this._soundEffectUrls[P] + ".mp3")
        });
      }
    };
    U.prototype._loadAudio = function (B) {
      var P = this;
      if (this._unsubscribeLoadAudio) {
        var X = this._unsubscribeLoadAudio;
        this._unsubscribeLoadAudio = undefined;
        if (X) {
          X();
        }
      }
      this._unsubscribeLoadAudio = k.sequenceCallback(function (J) {
        P._loadSpecificAudio("menuIconPress", function (Z0) {
          if (Z0) {
            B(Z0);
          } else {
            J();
          }
        });
      }, function (J) {
        P._loadSpecificAudio("listItemClick", function (Z0) {
          if (Z0) {
            B(Z0);
          } else {
            J();
          }
        });
      }, function (J) {
        P._loadSpecificAudio("sliderEffect", function (Z0) {
          if (Z0) {
            B(Z0);
          } else {
            J();
          }
        });
      }, function (J) {
        P._loadSpecificAudio("walletCountingAbove", function (Z0) {
          if (Z0) {
            B(Z0);
          } else {
            J();
          }
        });
      })(B);
    };
    U.prototype._loadSpecificAudio = function (B, P) {
      var X = this;
      if (this._soundEffectLoaded[B]) {
        if (P) {
          P();
        }
      } else {
        var J = this[B];
        function Z0() {
          J.off("loaderror", Z1);
          X._soundEffectLoaded[B] = true;
          if (P) {
            P();
          }
        }
        function Z1(Z2, Z3) {
          J.off("load", Z0);
          if (P) {
            P(Z3);
          }
        }
        J.once("load", Z0);
        J.once("loaderror", Z1);
        J.load();
      }
    };
    U.prototype.reset = function () {
      if (this._triggerTurboSpinOnWatch) {
        this._triggerTurboSpinOnWatch();
      }
      if (this._turboSpinWatch) {
        this._turboSpinWatch();
      }
      if (this._internalSoundOnWatch) {
        this._internalSoundOnWatch();
      }
      if (this._soundOnWatch) {
        this._soundOnWatch();
      }
      if (this._internalMuteIconWatch) {
        this._internalMuteIconWatch();
      }
      this._updateBetLabelCallback = undefined;
      this._autoSpinCallback = undefined;
      this._turboSpinCallback = undefined;
      this._changeSoundVolumeCallback = undefined;
      this._menuChangedCallBack = undefined;
      this._internalSoundControlCallback = undefined;
      this._triggerTurboSpinCallback = undefined;
      this._settingMenuButtonHelper = new C.default();
      this._unsubscribeLoadAudio = undefined;
      this._soundEffectLoaded = {
        sliderEffect: false,
        listItemClick: false,
        menuIconPress: false
      };
    };
    U.prototype._emitWalletEvent = function (B) {
      this._gameContext.emit("Wallet.ShowWalletList", B);
    };
    U.prototype._emitTransactionInfoChangedEvent = function (B) {
      this._gameContext.emit("Game.TransactionInfoChanged", B);
    };
    U.prototype._emitAudioStateChangeEvent = function (B) {
      var P = B ? "On" : "Off";
      this._gameContext.emit("Game.AudioStateChanged", P);
    };
    U.prototype._subscribePluginEvents = function () {
      var B = this;
      Q.setGamePlayUIBlockEventCallback("settingmenu", function (P) {
        B.settingMenuController.setMenuUIBlock(P);
      });
      if (N) {
        this._gameContext.on("Wallet.Hidden", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
        this._gameContext.on("Wallet.Shown", function () {
          B._cancelBetReminderBoard();
          B.hideMoreMenuLayer();
          B.settingMenuController.setIsControllerPresenting(true);
          B.activateWalletNotify(false);
        });
        this._gameContext.on("SlotMenu.StartAutoSpin", function (P) {
          if (B._autoSpinCallback) {
            B._autoSpinCallback(P);
          }
        }, this);
      }
      if (Y) {
        this._gameContext.on("SlotMenu.HiddenBetOptions", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
        this._gameContext.on("SlotMenu.HiddenSpinOptions", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
        this._gameContext.on("Game.ShowOptions", this.openBetMenu, this);
        this._gameContext.on("Game.HideOptions", this._closeBetOptions, this);
        this._gameContext.on("SlotMenu.ManualUpdateBetFactorCallback", function (P) {
          var X = P.payload;
          var J = X.betSize;
          var Z0 = X.betLevel;
          if (B._manualUpdateBetFactorCallback) {
            B._manualUpdateBetFactorCallback(J, Z0);
          }
        }, this);
        this._gameContext.on("SlotMenu.CancelBetPanelCallback", function () {
          if (B._cancelBetPanelCallback) {
            B._cancelBetPanelCallback();
          }
        }, this);
        this._gameContext.on("SlotMenu.FinishBetPickCallback", function (P) {
          var X = P.payload;
          var J = X.betSize;
          var Z0 = X.betLevel;
          if (B._finishBetPickCallback) {
            B._finishBetPickCallback(J, Z0);
          }
        }, this);
      }
      if (q) {
        this._gameContext.on("Paytable.Hide", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
        this._gameContext.on("GameRules.Hide", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
      }
      if (W) {
        this._gameContext.on("History.Close", function () {
          B.settingMenuController.setIsControllerPresenting(false);
        });
      }
      this._gameContext.on("Game.OnAudio", function () {
        B.soundEnable = true;
      });
      this._gameContext.on("Game.OffAudio", function () {
        B.soundEnable = false;
      });
      this._gameContext.on("Game.RequestAudioState", function (P) {
        if (B.soundEnable === true) {
          P.response = "On";
        } else {
          P.response = "Off";
        }
      });
      this._gameContext.on("SettingMenuHelper.GetSettingMenuType", function (P) {
        P.response = D.NEW;
      });
      this._gameContext.on("Game.GetSettingMenuType", function (P) {
        P.response = D.NEW;
      });
      this._gameContext.on("Game.ReplayInitiated", function () {
        var P = B.settingMenuController;
        if (F()) {
          P.muteIcon.active = false;
        } else if (B.soundOn) {
          P.muteIcon.active = false;
        } else {
          P.muteIcon.active = true;
        }
        if (!P.isControllerPresenting() && !P.isSwitchingMenuLayer()) {
          P.hideMoreMenuLayer();
          var X = B._menuChangedCallBack;
          if (X) {
            X(B._isHidden, true);
          }
        }
      });
    };
    U.prototype._subscribeTransactionStateEvents = function () {
      var B = this;
      this._gameContext.on("Game.TransactionStateComplete", function (P) {
        if (B._hideNonProfitEffect) {
          var X = P.payload.to;
          if (X === "setup" && B._isActionStateComplete) {
            B._isActionStateComplete = false;
          }
          if (X === "action" && !B._isActionStateComplete) {
            B._isActionStateComplete = true;
          }
        }
      });
      this._gameContext.on("Game.TransactionInfoUpdated", function (P) {
        if (B._hideNonProfitEffect) {
          B._betAmount = P.payload.tbb;
        }
      });
    };
    U.prototype._setOperatorConfig = function () {
      var B = this;
      this._gameContext.emit("Game.RequestSession", undefined, function (P) {
        var X = P.response;
        if (!X || !X.gameId) {
          throw Error("SettingMenuHelper:: Game.RequestSession return invalid data");
        }
        B._turboSpinEnable = X.operatorJurisdictionConfig.turboSpinEnable;
        B._autoPlayConfig = X.operatorJurisdictionConfig.autoPlayConfig;
        B._hideNonProfitEffect = X.operatorJurisdictionConfig.hideNonProfitEffect;
        B._backButtonType = X.operatorJurisdictionConfig.backButton;
      });
      this._gameContext.off("Game.Initialized", this._setOperatorConfig.bind(this));
    };
    U.prototype._toggleBetOptionsEvent = function (B) {
      if (B) {
        this._gameContext.on("Game.HideOptions", this._closeBetOptions, this);
      } else {
        this._gameContext.off("Game.HideOptions", this._closeBetOptions, this);
      }
    };
    U.prototype._closeBetOptions = function () {
      this._toggleBetOptionsEvent(false);
      this._gameContext.emit("SlotMenu.HideBetOptions");
    };
    U.prototype._requestTransactionInfo = function (B) {
      if (B) {
        this._gameContext.emit("Game.RequestTransactionInfo", undefined, function (P) {
          B(P.response);
        });
      }
    };
    U.prototype._emitAnalyticsEvent = function (B) {
      var P = {
        actionName: B
      };
      this._gameContext.emit("Analytics.Event", P);
    };
    U.prototype._emitBetChangeEvent = function (B) {
      var P = this;
      if (this._abortChangeBetEvent) {
        this._abortChangeBetEvent();
      } else {
        this._currentSelectedBet = parseFloat(this._selectedBetAmount);
      }
      this._abortChangeBetEvent = k.delayCallback(0.6)(function () {
        if (B !== P._currentSelectedBet) {
          P._gameContext.emit("SlotMenu.ChangeBet", B);
        }
        P._abortChangeBetEvent = undefined;
        P._currentSelectedBet = undefined;
      });
    };
    U.prototype.changeSoundButtonHolder = function () {
      if (F()) {
        var B = this.settingInfoFooter;
        if (B.landscapeSoundButtonHolder && this._landscapeSoundButtonNode) {
          this._landscapeSoundButtonNode.parent = B.landscapeSoundButtonHolder;
          if (!this._turboSpinEnable) {
            this._landscapeSoundButtonNode.getComponent("GenericSettingButton").sprite.node.active = true;
            this._landscapeSoundButtonNode.getComponent("GenericSettingButton").largeSprite.node.active = false;
          }
        }
      }
    };
    U.prototype.returnSoundButtonHolder = function () {
      if (F() && this._landscapePrimeHolder && this._landscapeSoundButtonNode) {
        this._landscapeSoundButtonNode.parent = this._landscapePrimeHolder;
        if (!this._turboSpinEnable) {
          this._landscapeSoundButtonNode.getComponent("GenericSettingButton").largeSprite.node.active = true;
          this._landscapeSoundButtonNode.getComponent("GenericSettingButton").sprite.node.active = false;
        }
      }
    };
    U.prototype.getSettingMenuButtonNode = function (B) {
      return this._settingMenuButtonHelper.getButtonNode(B);
    };
    U.prototype._shouldBalanceIncreaseSfxPlay = function (B) {
      var P = this.settingInfoFooter;
      if (this._isActionStateComplete && this._hideNonProfitEffect) {
        var X = P.currentBalance;
        var J = +k.toFixed(B - P.currentBalance, 2);
        if (this._betAmount && B > X && J > this._betAmount) {
          return true;
        }
      }
      return false;
    };
    return __decorate([z("SettingMenuHelper")], U);
  }(cc.Object))();
  exports.settingMenuHelper = M;
  cc._RF.pop();
}
function E(w, U) {
  return (w + 1) / Object.keys(U).length;
}
function F() {
  return shell.environment.getOrientationMode() === "land";
}
function H() {
  return shell.isRTLLanguage && shell.isRTLLanguage();
}