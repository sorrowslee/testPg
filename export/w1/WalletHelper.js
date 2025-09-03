if (!cc._RF.push(module, "1ca2eEH71NDaahNBchOvZgw", "WalletHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.walletHelper = undefined;
  var T;
  var x = require("SettingInfoFooterController");
  var L = require("Utils");
  var D = require("BVFramework");
  (function (u) {
    u[u.INACTIVE = 0] = "INACTIVE";
    u[u.ACTIVE = 1] = "ACTIVE";
    u[u.EXPIRED = 2] = "EXPIRED";
    u[u.CONVERTED = 3] = "CONVERTED";
    u[u.COMPLETED = 4] = "COMPLETED";
    u[u.NEW = 5] = "NEW";
    u[u.DISCARDED = 6] = "DISCARDED";
    u[u.LOCKED = 7] = "LOCKED";
  })(T ||= {});
  var k = cc._decorator.ccclass;
  var C = new (function (u) {
    function c() {
      var p = u !== null && u.apply(this, arguments) || this;
      p._hasNewWallet = false;
      p._pendingCheck = false;
      return p;
    }
    __extends(c, u);
    c.prototype.init = function (p) {
      var j = this;
      this._getGameInfo = p.getGameInfo;
      var G = D.getGameContext();
      G.on("Game.TransactionInfoUpdated", function (V) {
        j._lastSpinInfo = V.payload;
        if (j._pendingCheck) {
          var Q = j._lastSpinInfo;
          if (j.isFreeGameMode()) {
            j._setFreeGameCounter(Q.wfg.gc);
          } else if (j.isBonusGameMode()) {
            j._setRollOverBalance(Q.wbn.bra);
          }
          j._pendingCheck = false;
        }
      });
      G.on("Game.HasNewWallet", function () {
        j._settingMenuFooter.activateWalletNotify(true);
      });
    };
    c.prototype.processInitGameInfo = function (p, j) {
      var G = this;
      var V = p.dt.ls.si;
      this._hasNewWallet = p.dt.inwe;
      function Q(N) {
        if (N) {
          switch (N.s) {
            case T.EXPIRED:
            case T.DISCARDED:
            case T.INACTIVE:
              if (!G._getGameInfo) {
                throw Error("Wallethelper :: processInitGameInfo : getGameInfo callback not found!");
              }
              G._getGameInfo("0_C", function () {
                if (j) {
                  j();
                }
              });
              return;
          }
        }
        if (j) {
          j();
        }
      }
      switch (V.wt) {
        case "B":
          Q(V.wbn);
          break;
        case "G":
          Q(V.wfg);
          break;
        default:
          if (j) {
            j();
          }
      }
    };
    c.prototype.setup = function (p) {
      this._settingMenuSetFreeGameModeFunc = p.setFreeGameModeFunc;
      this._settingMenuFooter = p.footerController;
      this._settingMenuFooter.activateWalletNotify(this._hasNewWallet);
    };
    c.prototype.setupWallet = function (p) {
      var j = this._settingMenuFooter;
      var G = this._settingMenuSetFreeGameModeFunc;
      var V = p.wfg;
      var Q = p.wbn;
      if (Q) {
        var N = Q.bra !== Q.ibra;
        if (G) {
          G(false);
        }
        j.showCustomInfoFooter();
        this._setRollOverBalance(Q.bra, N);
        j.setWalletNavigateIcon(x.WALLET_FOOTER_TYPE.BONUS);
      } else if (V) {
        N = V.gc !== V.tg;
        if (G) {
          G(true);
        }
        j.showCustomInfoFooter();
        this._setFreeGameCounter(V.gc, N);
        j.setWalletNavigateIcon(x.WALLET_FOOTER_TYPE.FREE_GAME);
      } else {
        if (G) {
          G(false);
        }
        j.hideCustomInfoFooter();
        j.setWalletNavigateIcon(x.WALLET_FOOTER_TYPE.CASH);
      }
      this._lastSpinInfo = p;
    };
    c.prototype.hasFreeGame = function () {
      return this.isFreeGameMode() && this._lastSpinInfo.wfg.gc > 0;
    };
    c.prototype.spin = function (p) {
      if (this.isFreeGameMode()) {
        var j = this._lastSpinInfo.wfg.gc;
        this._setFreeGameCounter(j - 1);
        this._pendingCheck = true;
      } else if (this.isBonusGameMode()) {
        var G = this._lastSpinInfo.wbn.bra;
        var V = p > G ? 0 : G - p;
        this._setRollOverBalance(V);
        this._pendingCheck = true;
      }
    };
    c.prototype.isFreeGameMode = function () {
      return this._lastSpinInfo && this._lastSpinInfo.wfg;
    };
    c.prototype.isBonusGameMode = function () {
      return this._lastSpinInfo && this._lastSpinInfo.wbn;
    };
    c.prototype.isWalletCompleted = function () {
      var p = this._lastSpinInfo;
      var j = p.wfg;
      var G = p.wbn;
      if (j || G) {
        switch (j ? j.s : G.s) {
          case T.CONVERTED:
          case T.COMPLETED:
            return true;
        }
      }
      return false;
    };
    c.prototype.cleanUp = function () {
      this._settingMenuFooter = undefined;
    };
    c.prototype._setFreeGameCounter = function (p, j = true) {
      this._settingMenuFooter.setCustomMiddleInfoFooter(p, j);
    };
    c.prototype._setRollOverBalance = function (p, j = true) {
      this._settingMenuFooter.setCustomMiddleInfoFooter(L.formatCurrency(p), j);
    };
    return __decorate([k("WalletHelper")], c);
  }(cc.Object))();
  exports.walletHelper = C;
  cc._RF.pop();
}