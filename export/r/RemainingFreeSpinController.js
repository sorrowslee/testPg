if (!cc._RF.push(module, "a2463gehDRMQaO5G/PwztxI", "RemainingFreeSpinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NodePoolHandler");
  var x = require("AudioConstant");
  var L = require("AudioManager");
  var D = require("GameConstant");
  var k = require("SimpleAnimationController");
  var C = cc._decorator;
  var j = C.ccclass;
  var G = C.property;
  var V = function (Q) {
    function N() {
      var Y = Q !== null && Q.apply(this, arguments) || this;
      Y.numberDisplayNode = undefined;
      Y.remainingSprite = undefined;
      Y.lastFreeSpinSprite = undefined;
      Y.numberDisplayLayout = undefined;
      Y.numberDisplayContainer = undefined;
      Y.effectHolder = undefined;
      Y.upgradeItem = undefined;
      Y._displayState = D.DisplayState.HIDE;
      Y._freeSpinCount = 0;
      Y._previousSpinCount = 0;
      Y._increaseFreeSpinCallback = undefined;
      Y._numberDisplayController = undefined;
      return Y;
    }
    __extends(N, Q);
    Object.defineProperty(N.prototype, "numberDisplayController", {
      get: function () {
        this._numberDisplayController ||= this.numberDisplayNode.getComponent("NumberDisplayController");
        return this._numberDisplayController;
      },
      enumerable: false,
      configurable: true
    });
    N.prototype.init = function (Y) {
      this.node.active = false;
      this.remainingSprite.spriteFrame = Y.remainingFreeSpinSF;
      this.lastFreeSpinSprite.spriteFrame = Y.lastSpinRemainingSF;
      T.nodePoolHandler.replaceReusableItem(D.NodePoolName.RamainingFreeSpinUpgradeItem, this.upgradeItem, k.default, 5);
      if (D.isRTL) {
        this.numberDisplayLayout.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
        this.numberDisplayNode.x = this.numberDisplayNode.x - 20;
      }
    };
    N.prototype.show = function (Y) {
      if (this._displayState === D.DisplayState.HIDE) {
        this._displayState = D.DisplayState.SHOWED;
        this.node.active = true;
        this._freeSpinCount = this._previousSpinCount = Y;
        this._setRemainingFreeSpinCount(this._freeSpinCount);
      }
    };
    N.prototype.hide = function () {
      if (this._displayState === D.DisplayState.SHOWED) {
        this._displayState = D.DisplayState.HIDE;
        this._reset();
        this.node.active = false;
      }
    };
    N.prototype.decrementFreeSpinCount = function (Y) {
      this._freeSpinCount--;
      this._previousSpinCount = this._freeSpinCount;
      this._setRemainingFreeSpinCount(this._freeSpinCount);
      if (Y) {
        Y();
      }
    };
    N.prototype.increaseFreeSpinCount = function (Y, W) {
      if (this._freeSpinCount !== Y) {
        this._previousSpinCount = this._freeSpinCount;
        this._freeSpinCount = Y;
        this._increaseFreeSpinCallback = W;
        this._addFreeSpinCount();
      } else if (W) {
        W();
      }
    };
    N.prototype._setRemainingFreeSpinCount = function (Y) {
      if (Y === 0) {
        this.lastFreeSpinSprite.node.active = true;
        this.numberDisplayLayout.node.active = false;
      } else if (Y > 0) {
        this.lastFreeSpinSprite.node.active = false;
        this.numberDisplayLayout.node.active = true;
        this.numberDisplayController.clear();
        this.numberDisplayController.displayNumber(Y);
        this._updateNumberLayout(Y);
      }
    };
    N.prototype._addFreeSpinCount = function () {
      if (this._freeSpinCount === this._previousSpinCount) {
        var Y = this._increaseFreeSpinCallback;
        this._increaseFreeSpinCallback = undefined;
        if (Y) {
          Y();
        }
        return;
      }
      L.stopAudio(x.GENERAL_AUDIO.fsWonRemainingIncrease.key);
      L.playAudio(x.GENERAL_AUDIO.fsWonRemainingIncrease.key);
      this._previousSpinCount++;
      this._setRemainingFreeSpinCount(this._previousSpinCount);
      this._playUpgradeVfx();
      this.effectHolder.position = this.numberDisplayContainer.position;
      var W = cc.v2(0, 0);
      var q = cc.v2(0, 40);
      this.numberDisplayNode.stopAllActions();
      this.numberDisplayNode.runAction(cc.sequence(cc.moveTo(0.05, q).easing(cc.easeIn(2)), cc.moveTo(0.1, W).easing(cc.easeBackOut()), cc.callFunc(this._addFreeSpinCount, this)));
    };
    N.prototype._playUpgradeVfx = function () {
      var Y = this;
      var W = T.nodePoolHandler.dequeueReusableItem(D.NodePoolName.RamainingFreeSpinUpgradeItem);
      var q = W.getComponent(k.default);
      this.effectHolder.addChild(W);
      W.setPosition(cc.v2(0, 0));
      q.play(undefined, function () {
        q.stop();
        Y.effectHolder.removeChild(W);
        T.nodePoolHandler.enqueueReusableItem(W, D.NodePoolName.RamainingFreeSpinUpgradeItem);
      });
    };
    N.prototype._updateNumberLayout = function (Y) {
      if (Y < 100) {
        this.numberDisplayNode.setScale(1.43);
      } else {
        this.numberDisplayController.resizeNumberIfNeeded();
      }
      this.numberDisplayLayout.updateLayout();
    };
    N.prototype._reset = function () {
      this._previousSpinCount = 0;
      this._freeSpinCount = 0;
      this._increaseFreeSpinCallback = undefined;
      this.numberDisplayNode.stopAllActions();
      this.numberDisplayNode.setScale(1.43);
    };
    N.prototype.destroy = function () {
      this._reset();
      this.node.destroy();
      return Q.prototype.destroy.call(this);
    };
    __decorate([G(cc.Node)], N.prototype, "numberDisplayNode", undefined);
    __decorate([G(cc.Sprite)], N.prototype, "remainingSprite", undefined);
    __decorate([G(cc.Sprite)], N.prototype, "lastFreeSpinSprite", undefined);
    __decorate([G(cc.Layout)], N.prototype, "numberDisplayLayout", undefined);
    __decorate([G(cc.Node)], N.prototype, "numberDisplayContainer", undefined);
    __decorate([G(cc.Node)], N.prototype, "effectHolder", undefined);
    __decorate([G(cc.Prefab)], N.prototype, "upgradeItem", undefined);
    return __decorate([j], N);
  }(cc.Component);
  exports.default = V;
  cc._RF.pop();
}