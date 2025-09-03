if (!cc._RF.push(module, "076aehdcx9HQI7+9hg7FlGu", "BetModifierButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("GenericSettingButton");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.isIncreaseBet = false;
      return G;
    }
    __extends(j, p);
    j.prototype.setShowSettingToastCallback = function (G) {
      this._showSettingToast = G;
    };
    Object.defineProperty(j.prototype, "showSettingToast", {
      get: function () {
        if (!this._showSettingToast) {
          throw Error("BetModifierButton :: showSettingToast is undefined. Please set it using setShowSettingToastCallback");
        }
        return this._showSettingToast;
      },
      enumerable: false,
      configurable: true
    });
    j.prototype.setHideSettingToastCallback = function (G) {
      this._hideSettingToast = G;
    };
    Object.defineProperty(j.prototype, "hideSettingToast", {
      get: function () {
        if (!this._hideSettingToast) {
          throw Error("BetModifierButton :: hideSettingToast is undefined. Please set it using setHideSettingToastCallback");
        }
        return this._hideSettingToast;
      },
      enumerable: false,
      configurable: true
    });
    j.prototype.increaseBet = function (G, V, Q) {
      var N = G;
      if (V === undefined) {
        for (var Y = 0; Y < N.length; Y++) {
          if (parseFloat(G[Y]) > parseFloat(Q)) {
            V = Y - 1;
            Q = G[Y - 1];
            break;
          }
        }
      } else if (V >= N.length - 1) {
        this.showSettingToast(shell.I18n.t("SettingMenu.BiggestBet"), 2);
        return {
          selectedBet: V,
          selectedBetAmount: Q
        };
      }
      if (V === undefined) {
        throw Error("BetModifierButton :: increaseBet : selectedBet is undefined and cannot be located from selectedBetAmount ");
      }
      Q = G[++V];
      if (V >= N.length - 1) {
        this.showSettingToast(shell.I18n.t("SettingMenu.BiggestBet"), 2);
      } else {
        this.hideSettingToast();
      }
      return {
        selectedBet: V,
        selectedBetAmount: Q
      };
    };
    j.prototype.decreaseBet = function (G, V, Q) {
      if (V === undefined) {
        for (var N = G.length - 1; N >= 0; N--) {
          if (parseFloat(G[N]) < parseFloat(Q)) {
            V = N + 1;
            Q = G[N + 1];
            break;
          }
        }
      } else if (V <= 0) {
        this.showSettingToast(shell.I18n.t("SettingMenu.SmallestBet"), 2);
        return {
          selectedBet: V,
          selectedBetAmount: Q
        };
      }
      if (V === undefined) {
        throw Error("BetModifierButton :: decreaseBet : selectedBet is undefined and cannot be located from selectedBetAmount ");
      }
      Q = G[--V];
      if (V <= 0) {
        this.showSettingToast(shell.I18n.t("SettingMenu.SmallestBet"), 2);
      } else {
        this.hideSettingToast();
      }
      return {
        selectedBet: V,
        selectedBetAmount: Q
      };
    };
    j.prototype.updateBetModifierColor = function (G, V) {
      if (this.isIncreaseBet) {
        this.isReachLimit = !!V && !!(G >= V);
      } else {
        this.isReachLimit = G <= 0;
      }
      this.interactableButtonColor(this.isInteractable);
    };
    j.prototype.changeButtonPressedColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".pressed");
        if (this.isReachLimit) {
          var N = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
          L.setNodeColorWithOpacity(this.iconSprite, N);
        } else {
          L.setNodeColorWithOpacity(this.iconSprite, G ? Q : V);
        }
      }
    };
    j.prototype.interactableButtonColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        if (this.isReachLimit) {
          L.setNodeColorWithOpacity(this.iconSprite, Q);
        } else {
          L.setNodeColorWithOpacity(this.iconSprite, G ? V : Q);
        }
      }
    };
    j.prototype.maxBet = function (G) {
      var V = G.length - 1;
      var Q = G[V];
      var N = {
        selectedBet: V,
        selectedBetAmount: Q
      };
      this.showSettingToast(shell.I18n.t("SettingMenu.BiggestBet"), 2);
      return N;
    };
    j.prototype.buttonActivate = function (G) {
      if (G) {
        this.node.active = true;
        if (this.node.parent) {
          this.node.parent.active = true;
        }
        L.deferCallback(this)(this.enableTouchInteraction);
      } else {
        this.disableTouchInteraction();
        this.node.active = false;
        if (this.node.parent) {
          this.node.parent.active = false;
        }
      }
    };
    __decorate([C(cc.Boolean)], j.prototype, "isIncreaseBet", undefined);
    return __decorate([k], j);
  }(T.default);
  exports.default = u;
  cc._RF.pop();
}