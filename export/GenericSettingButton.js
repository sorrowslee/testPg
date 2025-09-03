if (!cc._RF.push(module, "aeaa7CV0CtEMo2Sab7CGMw1", "GenericSettingButton")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("ButtonTheme");
  var x = require("UIAppearanceHelper");
  var L = require("Utils");
  var D = cc._decorator;
  var k = D.ccclass;
  var C = D.property;
  var u = function (p) {
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G.iconSprite = undefined;
      G.collider = undefined;
      G.buttonTheme = undefined;
      G.circleCollider = undefined;
      G._isInteractable = true;
      G._touchStartPos = cc.v2();
      G._touchPos = cc.v2();
      G._isOutOfBound = false;
      G._touchInteraction = false;
      G._touchInvalid = false;
      G._iconSpriteFrame = undefined;
      G.willHideOnceClick = true;
      return G;
    }
    __extends(j, p);
    // 初始化按鈕外觀與互動
    j.prototype.onLoad = function () {
      var G;
      var V;
      if (shell.environment.getOrientationMode() === "land") {
        if ((G = this.circleCollider) !== null && G !== undefined) {
          G.getComponent(cc.Sprite).spriteFrame = undefined;
        }
        this.circleCollider = undefined;
      }
      this.enableTouchInteraction();
      if ((V = this.circleCollider) !== null && V !== undefined) {
        V.opacity = 0;
      }
      if (this.buttonTheme) {
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        L.setNodeColorWithOpacity(this.iconSprite, Q);
      }
      this._iconSpriteFrame = this.iconSprite.getComponent(cc.Sprite).spriteFrame;
    };
    // 設定按鈕圖示
    j.prototype.setIconSprite = function (G) {
      this.iconSprite.getComponent(cc.Sprite).spriteFrame = G;
    };
    // 銷毀前先關閉觸控互動
    j.prototype.destroy = function () {
      this.disableTouchInteraction();
      return p.prototype.destroy.call(this);
    };
    // 按鈕點擊時的回呼，可由外部覆寫
    j.prototype.onClick = function () {};
    // 啟用或停用按鈕
    j.prototype.buttonActivate = function (G) {
      if (G) {
        this.node.active = true;
        L.deferCallback(this)(this.enableTouchInteraction);
      } else {
        this.disableTouchInteraction();
        this.node.active = false;
      }
    };
    Object.defineProperty(j.prototype, "isInteractable", {
      // 按鈕是否可互動
      get: function () {
        return this._isInteractable;
      },
      set: function (G) {
        this._isInteractable = G;
        this.interactableButtonColor(G);
        if (G) {
          this.enableTouchInteraction();
        } else {
          this.disableTouchInteraction();
          this._touchInvalid = false;
        }
      },
      enumerable: false,
      configurable: true
    });
    // 處理觸控開始事件
    j.prototype._touchStart = function (G) {
      if (this._isInteractable) {
        this._touchInvalid = true;
        this._touchPos = this._touchStartPos = G.touch.getLocation();
        var V = this._checkWithinCircleCollider(G);
        this._isOutOfBound = !V;
        this._changeButtonPressedColor(V);
      } else {
        G.stopPropagation();
      }
    };
    // 處理觸控移動事件
    j.prototype._touchMoved = function (G) {
      var V;
      var Q;
      if (this._touchInvalid) {
        if (this._isInteractable) {
          this._touchPos = G.touch.getLocation();
          if (this.circleCollider) {
            if (!this._isOutOfBound) {
              this._touchPos = G.touch.getLocation();
              V = cc.v2(0, this._touchStartPos.y);
              Q = cc.v2(0, this._touchPos.y);
              if (V.sub(Q).mag() > 60) {
                this._changeButtonPressedColor(false);
                this._isOutOfBound = true;
              }
              G.stopPropagation();
            }
          }
        } else {
          G.stopPropagation();
        }
      }
    };
    // 處理觸控結束事件
    j.prototype._touchEnded = function (G) {
      if (this._touchInvalid) {
        if (this._isInteractable) {
          if (!this._isOutOfBound) {
            G.stopPropagation();
            this._changeButtonPressedColor(false);
            this.onClick();
            if (this.willHideOnceClick) {
              this._mouseLeaveCircleCollider();
            }
          }
        } else {
          G.stopPropagation();
        }
      }
    };
    // 處理觸控取消事件
    j.prototype._touchCancel = function (G) {
      if (this._touchInvalid) {
        if (this._isInteractable) {
          if (!this._isOutOfBound) {
            G.stopPropagation();
            this._changeButtonPressedColor(false);
          }
        } else {
          G.stopPropagation();
        }
      }
    };
    // 將按鈕顏色切換為指定狀態
    j.prototype.changeButtonColor = function (G) {
      this.changeButtonPressedColor(G);
    };
    // 變更按下時的顏色
    j.prototype._changeButtonPressedColor = function (G) {
      if (!this._isOutOfBound) {
        this.changeButtonPressedColor(G);
      }
    };
    // 依按下與否更新按鈕顏色
    j.prototype.changeButtonPressedColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".pressed");
        L.setNodeColorWithOpacity(this.iconSprite, G ? Q : V);
      }
    };
    // 依是否可互動更新按鈕顏色
    j.prototype.interactableButtonColor = function (G) {
      if (this.buttonTheme) {
        var V = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".normal");
        var Q = x.uiAppearanceHelper.v(this.buttonTheme.domainKey + "." + this.buttonTheme.colorKey + ".disabled");
        L.setNodeColorWithOpacity(this.iconSprite, G ? V : Q);
      }
    };
    // 判斷觸控點是否在圓形碰撞器內
    j.prototype._checkWithinCircleCollider = function (G) {
      var V = this.circleCollider;
      if (!V) {
        return true;
      }
      var Q = G.touch ? G.touch.getLocation() : G.getLocation();
      var N = V.convertToNodeSpaceAR(Q);
      var Y = V.width / 2;
      return N.x * N.x + N.y * N.y <= Y * Y;
    };
    // 滑鼠或觸控進入圓形碰撞器時顯示範圍
    j.prototype._touchCircleCollider = function (G) {
      if (this._iconSpriteFrame && this.circleCollider) {
        if (this._checkWithinCircleCollider(G)) {
          this.circleCollider.opacity = 255;
        } else {
          this.circleCollider.opacity = 0;
        }
      }
    };
    // 滑鼠離開碰撞器時重置狀態
    j.prototype._mouseLeaveCircleCollider = function () {
      var G;
      if (this._iconSpriteFrame && this.circleCollider) {
        this._isOutOfBound = false;
        if ((G = this.circleCollider) !== null && G !== undefined) {
          G.opacity = 0;
        }
      }
    };
    // 啟用觸控與滑鼠互動
    j.prototype.enableTouchInteraction = function () {
      if (!this._touchInteraction) {
        this._touchInteraction = true;
        var G = this.circleCollider ? this.circleCollider : this.collider;
        G.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        G.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoved, this);
        G.on(cc.Node.EventType.TOUCH_END, this._touchEnded, this);
        G.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
        if (this.circleCollider) {
          G.on(cc.Node.EventType.MOUSE_ENTER, this._touchCircleCollider, this);
          G.on(cc.Node.EventType.MOUSE_MOVE, this._touchCircleCollider, this);
          G.on(cc.Node.EventType.MOUSE_LEAVE, this._mouseLeaveCircleCollider, this);
        }
      }
    };
    // 關閉觸控與滑鼠互動
    j.prototype.disableTouchInteraction = function () {
      if (this._touchInteraction) {
        this._touchInteraction = false;
        var G = this.circleCollider ? this.circleCollider : this.collider;
        G.off(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        G.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoved, this);
        G.off(cc.Node.EventType.TOUCH_END, this._touchEnded, this);
        G.off(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
        if (this.circleCollider) {
          G.off(cc.Node.EventType.MOUSE_ENTER, this._touchCircleCollider, this);
          G.off(cc.Node.EventType.MOUSE_MOVE, this._touchCircleCollider, this);
          G.off(cc.Node.EventType.MOUSE_LEAVE, this._mouseLeaveCircleCollider, this);
          this.circleCollider.opacity = 0;
        }
      }
    };
    __decorate([C(cc.Node)], j.prototype, "iconSprite", undefined);
    __decorate([C(cc.Node)], j.prototype, "collider", undefined);
    __decorate([C(T)], j.prototype, "buttonTheme", undefined);
    __decorate([C(cc.Node)], j.prototype, "circleCollider", undefined);
    return __decorate([k], j);
  }(cc.Component);
  exports.default = u;
  cc._RF.pop();
}