if (!cc._RF.push(module, "caad0pqW6xKH6zUM9ZK/HDT", "WBSPopOutItem")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("PopOutItem");
  var L = require("AudioConstant");
  var D = require("AudioManager");
  var k = require("GameConstant");
  var C = require("WBSSlotController");
  var j = cc._decorator;
  var G = j.ccclass;
  var V = j.property;
  var Q = function (N) {
    function Y() {
      var W = N !== null && N.apply(this, arguments) || this;
      W.backgroundSprite = undefined;
      W.payoutContainer = undefined;
      W.descLabel = undefined;
      W.symbolHolder = undefined;
      W.payoutLayouts = [];
      W._isLeftToRight = true;
      W._slotItemOriginalParent = undefined;
      return W;
    }
    __extends(Y, N);
    Y.prototype.showItem = function (W, q, S, z, A, M, E, F, b) {
      // 顯示派彩金額並搬移對應符號
      if (this._slotItemOriginalParent) {
        this.hide();
      }
      D.playAudio(L.GENERAL_AUDIO.uiInfo.key);
      N.prototype.showItem.call(this, W, q, S, z, A, M, E, F, b);
      this._isLeftToRight = S < 12;
      this._setItemDirection(z);
      this._setRTLLanguage();
      var H = C.default.getSlotItemByIndex(S);
      this._slotItemOriginalParent = H.contentHolder.parent;
      T.transferToParent(H.contentHolder, this.symbolHolder);
    };
    Y.prototype.hideItem = function () {
      // 隱藏派彩項目並還原符號位置
      if (this._slotItemOriginalParent) {
        var W = this.symbolHolder.children[0];
        T.transferToParent(W, this._slotItemOriginalParent);
        W.setPosition(0, 0);
        this._slotItemOriginalParent = undefined;
      }
      N.prototype.hideItem.call(this);
    };
    Y.prototype.setPayoutValue = function (W, q) {
      // 設定派彩數值或描述文字
      var S = W % 100;
      var z = q[S];
      var f = Object.keys(z);
      f.reverse();
      if (S !== k.SlotSymbols.Wild && S !== k.SlotSymbols.Scatter) {
        this.payoutContainer.active = true;
        this.descLabel.node.active = false;
        this.payoutContainer.children.forEach(function (A, M) {
          var E = A.children[1].getComponent("NumberDisplayController");
          E.clear();
          E.displayNumber(z[f[M]]);
        });
      } else {
        this.payoutContainer.active = false;
        this.descLabel.node.active = true;
        if (S === k.SlotSymbols.Wild) {
          this.descLabel.string = shell.I18n.t("WildBountyShowdown.WildDesc");
        } else if (S === k.SlotSymbols.Scatter) {
          this.descLabel.string = shell.I18n.t("WildBountyShowdown.ScatterDesc");
        } else {
          this.descLabel.string = "";
        }
      }
    };
    Y.prototype._setItemDirection = function (W) {
      // 根據位置決定彈出方向與對齊
      var q = W % 100;
      this.backgroundSprite.node.x = 0;
      if (this._isLeftToRight) {
        this.node.anchorX = 0;
        this.node.x -= 80;
        this.payoutContainer.setPosition(90, this.payoutContainer.y);
        this.descLabel.node.x = 90;
        this.symbolHolder.setPosition(80, 0);
      } else {
        this.descLabel.node.x = -105;
        if (q === k.SlotSymbols.Wild) {
          this.backgroundSprite.node.x = -20;
          this.descLabel.node.x = -125;
        }
        this.node.anchorX = 1;
        this.node.x += 200;
        this.payoutContainer.setPosition(-90, this.payoutContainer.y);
        this.symbolHolder.setPosition(-80, 0);
      }
    };
    Y.prototype._setRTLLanguage = function () {
      // 針對 RTL 語系調整佈局
      if (k.isRTL) {
        this.payoutLayouts.forEach(function (W) {
          W.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
          W.node.anchorX = 1;
          W.node.x = 60;
        });
      }
    };
    __decorate([V(cc.Sprite)], Y.prototype, "backgroundSprite", undefined);
    __decorate([V(cc.Node)], Y.prototype, "payoutContainer", undefined);
    __decorate([V(cc.Label)], Y.prototype, "descLabel", undefined);
    __decorate([V(cc.Node)], Y.prototype, "symbolHolder", undefined);
    __decorate([V([cc.Layout])], Y.prototype, "payoutLayouts", undefined);
    return __decorate([G], Y);
  }(x.default);
  exports.default = Q;
  cc._RF.pop();
}