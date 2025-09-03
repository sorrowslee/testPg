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
    // 取得或快取數字顯示控制器
    Object.defineProperty(N.prototype, "numberDisplayController", {
      get: function () {
        this._numberDisplayController ||= this.numberDisplayNode.getComponent("NumberDisplayController");
        return this._numberDisplayController;
      },
      enumerable: false,
      configurable: true
    });
    // 初始化節點與資源
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
    // 顯示剩餘免費旋轉次數
    N.prototype.show = function (Y) {
      if (this._displayState === D.DisplayState.HIDE) {
        this._displayState = D.DisplayState.SHOWED;
        this.node.active = true;
        this._freeSpinCount = this._previousSpinCount = Y;
        this._setRemainingFreeSpinCount(this._freeSpinCount);
      }
    };
    // 隱藏並重置顯示
    N.prototype.hide = function () {
      if (this._displayState === D.DisplayState.SHOWED) {
        this._displayState = D.DisplayState.HIDE;
        this._reset();
        this.node.active = false;
      }
    };
    // 減少一次免費旋轉並更新顯示
    N.prototype.decrementFreeSpinCount = function (Y) {
      this._freeSpinCount--;
      this._previousSpinCount = this._freeSpinCount;
      this._setRemainingFreeSpinCount(this._freeSpinCount);
      if (Y) {
        Y();
      }
    };
    // 增加免費旋轉次數並播放動畫
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
    // 設定目前的剩餘免費旋轉顯示
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
    // 逐步遞增並播放升級效果
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
    // 播放升級特效
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
    // 根據數字大小調整版面
    N.prototype._updateNumberLayout = function (Y) {
      if (Y < 100) {
        this.numberDisplayNode.setScale(1.43);
      } else {
        this.numberDisplayController.resizeNumberIfNeeded();
      }
      this.numberDisplayLayout.updateLayout();
    };
    // 重置控制器狀態
    N.prototype._reset = function () {
      this._previousSpinCount = 0;
      this._freeSpinCount = 0;
      this._increaseFreeSpinCallback = undefined;
      this.numberDisplayNode.stopAllActions();
      this.numberDisplayNode.setScale(1.43);
    };
    // 銷毀控制器並清理資源
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