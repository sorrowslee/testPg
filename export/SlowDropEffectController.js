if (!cc._RF.push(module, "3b81drg5V9HLJ/5QDZf74Yu", "SlowDropEffectController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NodePoolHandler");
  var x = require("GameConstant");
  var L = require("SimpleAnimationController");
  var D = require("SlowDropTopItemController");
  var k = cc._decorator;
  var C = k.ccclass;
  var j = k.property;
  var G = [370, 410, 450, 450, 410, 370];
  var V = function (Q) {
    function N() {
      var Y = Q !== null && Q.apply(this, arguments) || this;
      Y.sdVfxNodeB = undefined;
      Y.sdVfxSpriteB = undefined;
      Y.sdVfxSpriteC = undefined;
      Y.sdVfxCAnimationController = undefined;
      Y.topVfxItem = undefined;
      Y.sdVfxSpriteFramesB = [];
      Y.sdVfxSpriteFramesC = [];
      Y._slowDropEffectHolder = undefined;
      Y._resetSlowDropItemCallback = undefined;
      Y._slowDropTopItemControllerList = [];
      return Y;
    }
    __extends(N, Q);
      // 初始化慢落特效並註冊物件池
      N.prototype.init = function (Y, W) {
      T.nodePoolHandler.registerReusableItem(x.NodePoolName.SlowDropEffectItem, this.topVfxItem, D.default, 6);
      this._slowDropEffectHolder = Y;
      this.sdVfxSpriteC.node.parent = this._slowDropEffectHolder;
      this._resetSlowDropItemCallback = W;
    };
      // 根據遊戲狀態切換特效外觀
      N.prototype.switchUI = function (Y) {
      switch (Y) {
        case x.TransitionState.FREE_SPIN:
        case x.TransitionState.FREE_SPIN_RESPIN:
          this.sdVfxNodeB.setPosition(0, 275);
          this.sdVfxSpriteB.spriteFrame = this.sdVfxSpriteFramesB[1];
          this.sdVfxSpriteC.spriteFrame = this.sdVfxSpriteFramesC[1];
          break;
        case x.TransitionState.NORMAL:
        case x.TransitionState.RESPIN:
        default:
          this.sdVfxNodeB.setPosition(0, 415);
          this.sdVfxSpriteB.spriteFrame = this.sdVfxSpriteFramesB[0];
          this.sdVfxSpriteC.spriteFrame = this.sdVfxSpriteFramesC[0];
      }
    };
      // 顯示慢落特效並播放動畫
      N.prototype.show = function (Y) {
      this._createSlowDropEfx(Y);
      this.sdVfxNodeB.active = true;
      this.sdVfxNodeB.stopAllActions();
      this.sdVfxNodeB.runAction(cc.fadeIn(0.3));
      this.sdVfxCAnimationController.node.active = true;
      this.sdVfxCAnimationController.play("anim_slow_drop_vfx_c_loop");
      this._slowDropTopItemControllerList.forEach(function (W) {
        W.show();
      });
    };
      // 建立頂部掉落物件
      N.prototype._createSlowDropEfx = function (Y) {
      var W = this;
      Y.forEach(function (q) {
        if (!Y.includes("" + q)) {
          var S = T.nodePoolHandler.dequeueReusableItem(x.NodePoolName.SlowDropEffectItem);
          var z = S.getComponent(D.default);
          var f = q * 180 - 450;
          S.setPosition(f, G[q]);
          W._slowDropTopItemControllerList.push(z);
          S.parent = W._slowDropEffectHolder;
        }
      });
    };
      // 隱藏特效並播放收合動畫
      N.prototype.hide = function () {
      this.sdVfxNodeB.stopAllActions();
      this.sdVfxNodeB.runAction(cc.fadeOut(0.5));
      this.sdVfxCAnimationController.play("anim_slow_drop_vfx_c_hide", this._reset.bind(this));
      this._slowDropTopItemControllerList.forEach(function (Y) {
        Y.hide();
      });
    };
      // 重置特效狀態並回收物件
      N.prototype._reset = function () {
      this.sdVfxNodeB.active = false;
      this.sdVfxNodeB.opacity = 0;
      this.sdVfxCAnimationController.node.active = false;
      this.sdVfxCAnimationController.node.opacity = 0;
      this.sdVfxCAnimationController.stop();
      this._slowDropTopItemControllerList.forEach(function (W) {
        W.reset();
        T.nodePoolHandler.enqueueReusableItem(W.node, x.NodePoolName.SlowDropEffectItem);
      });
      var Y = this._resetSlowDropItemCallback;
      if (Y) {
        Y();
      }
      this._slowDropTopItemControllerList = [];
    };
    __decorate([j(cc.Node)], N.prototype, "sdVfxNodeB", undefined);
    __decorate([j(cc.Sprite)], N.prototype, "sdVfxSpriteB", undefined);
    __decorate([j(cc.Sprite)], N.prototype, "sdVfxSpriteC", undefined);
    __decorate([j(L.default)], N.prototype, "sdVfxCAnimationController", undefined);
    __decorate([j(cc.Prefab)], N.prototype, "topVfxItem", undefined);
    __decorate([j([cc.SpriteFrame])], N.prototype, "sdVfxSpriteFramesB", undefined);
    __decorate([j([cc.SpriteFrame])], N.prototype, "sdVfxSpriteFramesC", undefined);
    return __decorate([C], N);
  }(cc.Component);
  exports.default = V;
  cc._RF.pop();
}