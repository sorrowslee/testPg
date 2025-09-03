if (!cc._RF.push(module, "a071dzZWHNLxLKLeUJE1kCj", "MultiplierItemController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("NumberDisplayController");
  var L = require("MultiplierController");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var p = function (G) {
    function V() {
      var N = G !== null && G.apply(this, arguments) || this;
      N.content = undefined;
      N.multiplierNumberDisplayController = undefined;
      N.vfxAnim = undefined;
      N.multiplierNormalSpriteFrames = [];
      N.multiplierRedSpriteFrames = [];
      N.shine = undefined;
      N.multiplierNumber = undefined;
      N._numberFacingPoint = undefined;
      N._isSelected = false;
      return N;
    }
    var Q = {
      get: function () {
        return this._isSelected;
      },
      enumerable: false,
      configurable: true
    };
    __extends(V, G);
    Object.defineProperty(V.prototype, "isSelected", Q);
    V.prototype.init = function (N) {
      this._numberFacingPoint = N;
      this.reset();
      this.enableListener();
    };
    V.prototype.selected = function () {
      this._isSelected = true;
      var N = this.multiplierNumber;
      var Y = L.SELECTED_MULTIPLIER_SIZE_MAP[N];
      this.content.setScale(Y);
      this.content.stopAllActions();
      this.content.opacity = 255;
      if (N > 1) {
        this.showShine();
      }
    };
    V.prototype.deselected = function () {
      this._isSelected = false;
      var N = this.multiplierNumber;
      var Y = L.DESELECTED_MULTIPLIER_SIZE_MAP[N];
      this.content.setScale(Y);
      this.content.stopAllActions();
      this.content.opacity = 128;
      if (N >= 512) {
        var W = cc.sequence(cc.fadeTo(1.5, 178.5), cc.fadeTo(2, 128));
        this.content.runAction(W.repeatForever());
      }
      if (N > 1) {
        this.hideShine();
      } else {
        this.hideShine(true);
      }
    };
    V.prototype.showShine = function () {
      this.hideShine(true);
      var N = cc.sequence(cc.scaleTo(0.2, 0.7), cc.scaleTo(1, 0.5));
      this.shine.active = true;
      this.shine.runAction(N.repeatForever());
    };
    V.prototype.hideShine = function (N) {
      var Y = this;
      if (N === undefined) {
        N = false;
      }
      this.shine.stopAllActions();
      if (N) {
        this.shine.setScale(0);
        this.shine.active = false;
      } else {
        this.shine.runAction(cc.sequence(cc.scaleTo(0.3, 0), cc.callFunc(function () {
          Y.shine.active = false;
        })));
      }
    };
    V.prototype.show = function (N, Y) {
      var W = this;
      this.multiplierNumber = N;
      this.node.active = true;
      if (N !== -1) {
        if (N === 1024) {
          this.multiplierNumberDisplayController.numberSprite[0] = this.multiplierRedSpriteFrames[0];
          this.multiplierNumberDisplayController.numberSprite[1] = this.multiplierRedSpriteFrames[1];
          this.multiplierNumberDisplayController.numberSprite[2] = this.multiplierRedSpriteFrames[2];
          this.multiplierNumberDisplayController.numberSprite[4] = this.multiplierRedSpriteFrames[3];
          this.multiplierNumberDisplayController.numberSprite[12] = this.multiplierRedSpriteFrames[4];
        } else {
          this.multiplierNumberDisplayController.numberSprite[0] = this.multiplierNormalSpriteFrames[0];
          this.multiplierNumberDisplayController.numberSprite[1] = this.multiplierNormalSpriteFrames[1];
          this.multiplierNumberDisplayController.numberSprite[2] = this.multiplierNormalSpriteFrames[2];
          this.multiplierNumberDisplayController.numberSprite[4] = this.multiplierNormalSpriteFrames[3];
          this.multiplierNumberDisplayController.numberSprite[12] = this.multiplierNormalSpriteFrames[4];
        }
        this.multiplierNumberDisplayController.displayNumber(N);
      } else {
        this.multiplierNumberDisplayController.clear();
      }
      T.deferCallback(true)(function () {
        W.resetFacingAngle();
      });
      if (Y) {
        Y();
      }
    };
    V.prototype.playBreak = function (N, Y) {
      var W = this;
      var q = this.multiplierNumberDisplayController.node;
      q.stopAllActions();
      q.opacity = 255;
      q.runAction(cc.sequence(cc.delayTime(N), cc.spawn(cc.fadeOut(0.2), cc.scaleTo(0.3, 3), cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
        W.vfxAnim.node.active = true;
        W.vfxAnim.stop();
        W.vfxAnim.play();
      }))), cc.callFunc(function () {
        if (Y) {
          Y();
        }
      })));
    };
    V.prototype.unuse = function () {
      this.reset();
    };
    V.prototype.enableListener = function () {
      this.node.on(cc.Node.EventType.POSITION_CHANGED, this.resetFacingAngle, this);
    };
    V.prototype.disableListener = function () {
      this.node.off(cc.Node.EventType.POSITION_CHANGED, this.resetFacingAngle, this);
    };
    V.prototype.reset = function () {
      this._isSelected = false;
      this.hideShine(true);
      this.disableListener();
      var N = this.multiplierNumberDisplayController.node;
      N.stopAllActions();
      N.opacity = 255;
      this.vfxAnim.stop();
      this.vfxAnim.node.active = false;
    };
    V.prototype.resetFacingAngle = function () {
      if (this._numberFacingPoint) {
        var N = j(this.node, this._numberFacingPoint);
        this.node.angle = N;
      }
    };
    V.prototype.onDestroy = function () {
      this.disableListener();
    };
    __decorate([C(cc.Node)], V.prototype, "content", undefined);
    __decorate([C(x.default)], V.prototype, "multiplierNumberDisplayController", undefined);
    __decorate([C(cc.Animation)], V.prototype, "vfxAnim", undefined);
    __decorate([C([cc.SpriteFrame])], V.prototype, "multiplierNormalSpriteFrames", undefined);
    __decorate([C([cc.SpriteFrame])], V.prototype, "multiplierRedSpriteFrames", undefined);
    __decorate([C(cc.Node)], V.prototype, "shine", undefined);
    return __decorate([k], V);
  }(cc.Component);
  exports.default = p;
  cc._RF.pop();
}
function j(G, V) {
  var Q = T.convertToNodeSpaceAR(G, G.getPosition(), V);
  var N = V.getPosition().sub(Q);
  var Y = Math.atan2(N.x, N.y);
  return -cc.misc.radiansToDegrees(Y);
}