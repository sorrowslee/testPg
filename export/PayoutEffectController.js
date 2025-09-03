if (!cc._RF.push(module, "73aac2A++ZIEKvEvkb2PS7F", "PayoutEffectController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T;
  var x = require("Utils");
  var L = require("NodePoolHandler");
  var D = require("AudioConstant");
  var k = require("AudioManager");
  var C = require("GameConstant");
  var j = require("PayoutEffectBackController");
  var G = require("PayoutEffectFrontController");
  var V = require("SimpleAnimationController");
  var Q = cc._decorator;
  var N = Q.ccclass;
  var Y = Q.property;
  (function (q) {
    q[q.NONE = 0] = "NONE";
    q[q.HIGHLIGHT = 1] = "HIGHLIGHT";
    q[q.BREAK_SYMBOL = 2] = "BREAK_SYMBOL";
    q[q.SHOW_WILD = 3] = "SHOW_WILD";
    q[q.HIDE_WILD = 4] = "HIDE_WILD";
  })(T ||= {});
  var W = function (q) {
    function S() {
      var z = q !== null && q.apply(this, arguments) || this;
      z.backVfxHolder = undefined;
      z.frontVfxHolder = undefined;
      z.wildVfxAnim = undefined;
      z._payoutEffectFrontController = undefined;
      z._payoutEffectBackController = undefined;
      z._currentPayoutEffectState = T.NONE;
      return z;
    }
    __extends(S, q);
    S.prototype.clear = function () {
      this._currentPayoutEffectState = T.NONE;
      this._payoutEffectBackController = undefined;
      this._payoutEffectFrontController = undefined;
      this.hideWildVfx(false);
      this.backVfxHolder.removeAllChildren();
      this.frontVfxHolder.removeAllChildren();
    };
    S.prototype.destroy = function () {
      this.clear();
      this.node.destroy();
      return q.prototype.destroy.call(this);
    };
    S.prototype.highlightSymbol = function (z = false) {
      if (this._currentPayoutEffectState !== T.HIGHLIGHT) {
        this._currentPayoutEffectState = T.HIGHLIGHT;
        if (!this._payoutEffectBackController) {
          this._initBackItem(this.backVfxHolder);
        }
        this._payoutEffectBackController.highlightSymbol(z);
      }
    };
    S.prototype.stopHighlightSymbol = function (z) {
      var A = this;
      if (!this._payoutEffectBackController) {
        this._initBackItem(this.backVfxHolder);
      }
      this._payoutEffectBackController.stopHighlightSymbol(function () {
        A._enqueceBackItem();
        if (z) {
          z();
        }
      });
    };
    S.prototype.breakSymbol = function (z, A) {
      var M = this;
      if (this._currentPayoutEffectState !== T.BREAK_SYMBOL) {
        this._currentPayoutEffectState = T.BREAK_SYMBOL;
        if (!this._payoutEffectFrontController) {
          var E = z ? this.backVfxHolder : this.frontVfxHolder;
          this._initFrontItem(E);
        }
        k.stopAudio(D.GENERAL_AUDIO.symShrink.key);
        k.playAudio(D.GENERAL_AUDIO.symShrink.key);
        if (!z) {
          this.hideWildVfx(true);
        }
        this._payoutEffectFrontController.breakSymbol(function () {
          if (M._payoutEffectBackController) {
            M._payoutEffectBackController.stopHighlightSymbol();
          }
        }, function () {
          M._enqueceFrontItem();
          if (A) {
            A();
          }
        });
      }
    };
    S.prototype.showWildVfx = function (z = true) {
      if (this._currentPayoutEffectState !== T.SHOW_WILD) {
        this._currentPayoutEffectState = T.SHOW_WILD;
        var A = this.wildVfxAnim;
        A.stop();
        A.play();
        var M = A.node;
        M.active = true;
        M.stopAllActions();
        M.opacity = 0;
        if (z) {
          M.runAction(cc.fadeIn(0.3));
        } else {
          M.opacity = 255;
        }
      }
    };
    S.prototype.hideWildVfx = function (z) {
      if (this._currentPayoutEffectState !== T.HIDE_WILD || !z) {
        this._currentPayoutEffectState = T.HIDE_WILD;
        var A = this.wildVfxAnim;
        var M = A.node;
        if (z) {
          M.stopAllActions();
          M.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
            A.stop();
          })));
        } else {
          A.stop();
        }
      }
    };
    S.prototype._initFrontItem = function (z) {
      var A = L.nodePoolHandler.dequeueReusableItem(C.NodePoolName.PayoutEffectFrontItem);
      this._payoutEffectFrontController = A.getComponent(G.default);
      this._payoutEffectFrontController.clear();
      z.addChild(A);
      return A;
    };
    S.prototype._enqueceFrontItem = function () {
      var z = this;
      x.delayCallback(1)(function () {
        if (z._payoutEffectFrontController) {
          if (z._payoutEffectFrontController) {
            z._payoutEffectFrontController.clear();
          }
          L.nodePoolHandler.enqueueReusableItem(z._payoutEffectFrontController.node, C.NodePoolName.PayoutEffectFrontItem);
          z._payoutEffectFrontController = undefined;
        }
      });
    };
    S.prototype._initBackItem = function (z) {
      var A = L.nodePoolHandler.dequeueReusableItem(C.NodePoolName.PayoutEffectBackItem);
      this._payoutEffectBackController = A.getComponent(j.default);
      this._payoutEffectBackController.clear();
      z.addChild(A);
      return A;
    };
    S.prototype._enqueceBackItem = function () {
      var z = this;
      x.delayCallback(1)(function () {
        if (z._payoutEffectBackController) {
          if (z._payoutEffectBackController) {
            z._payoutEffectBackController.clear();
          }
          L.nodePoolHandler.enqueueReusableItem(z._payoutEffectBackController.node, C.NodePoolName.PayoutEffectBackItem);
          z._payoutEffectBackController = undefined;
        }
      });
    };
    __decorate([Y(cc.Node)], S.prototype, "backVfxHolder", undefined);
    __decorate([Y(cc.Node)], S.prototype, "frontVfxHolder", undefined);
    __decorate([Y(V.default)], S.prototype, "wildVfxAnim", undefined);
    return __decorate([N], S);
  }(cc.Component);
  exports.default = W;
  cc._RF.pop();
}