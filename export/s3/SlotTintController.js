if (!cc._RF.push(module, "ed845gXmbVDfa98BSsedOoI", "SlotTintController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.darkSideNodes = [];
      c.darkReelNodes = [];
      c.overlayHolder = undefined;
      c._overlaySlotItems = [];
      return c;
    }
    __extends(u, C);
    u.prototype.enableDarkReel = function (c = [], p = true) {
      this.darkSideNodes.forEach(function (j) {
        j.stopAllActions();
        if (p && j.opacity !== 128) {
          j.runAction(cc.fadeTo(0.2, 128));
        } else {
          j.opacity = 128;
        }
      });
      this.darkReelNodes.forEach(function (j, l) {
        var G = c.includes(l) ? 0 : 128;
        j.stopAllActions();
        if (p && j.opacity !== G) {
          j.runAction(cc.fadeTo(0.2, G));
        } else {
          j.opacity = G;
        }
      });
    };
    u.prototype.enableFullDarkReel = function (c = true) {
      this.enableDarkReel([], c);
    };
    u.prototype.disableDarkMode = function (c, p) {
      var j = this;
      if (c === undefined) {
        c = true;
      }
      function l() {
        j.darkSideNodes.forEach(function (G) {
          G.stopAllActions();
          G.opacity = 0;
        });
        j.darkReelNodes.forEach(function (G) {
          G.stopAllActions();
          G.opacity = 0;
        });
        if (p) {
          p();
        }
      }
      if (c) {
        this.darkSideNodes.forEach(function (G) {
          G.stopAllActions();
          G.runAction(cc.fadeOut(0.2));
        });
        this.darkReelNodes.forEach(function (G) {
          G.stopAllActions();
          G.runAction(cc.fadeOut(0.2));
        });
        T.delayCallback(0.2)(l);
      } else {
        l();
      }
    };
    u.prototype.addOverlaySlotItem = function (c) {
      this._overlaySlotItems.push(c);
      T.transferToParent(c.scaleHolder, this.overlayHolder);
    };
    u.prototype.removeOverlaySlotItem = function () {
      var c = this._overlaySlotItems;
      if (c.length) {
        this._overlaySlotItems = [];
        c.forEach(function (p) {
          T.transferToParent(p.scaleHolder, p.node);
          p.resetHolderPosition();
        });
      }
    };
    __decorate([D({
      tooltip: false,
      type: [cc.Node]
    })], u.prototype, "darkSideNodes", undefined);
    __decorate([D([cc.Node])], u.prototype, "darkReelNodes", undefined);
    __decorate([D(cc.Node)], u.prototype, "overlayHolder", undefined);
    return __decorate([L], u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}