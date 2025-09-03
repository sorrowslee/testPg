if (!cc._RF.push(module, "43d12n8a1BInJvBu7QtjALE", "SpinButtonController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpinButtonMode = exports.SpinButtonAnimationState = undefined;
  var T;
  var x;
  var L = require("SettingMenuHelper");
  var D = require("ButtonHitTest");
  var k = require("SlotAnalyticsEnum");
  var C = cc._decorator.ccclass;
  (function (p) {
    p[p.IDLE = 1] = "IDLE";
    p[p.SPINNING = 2] = "SPINNING";
    p[p.STOPPED = 3] = "STOPPED";
  })(T = exports.SpinButtonAnimationState ||= {});
  (function (p) {
    p[p.ENABLED = 0] = "ENABLED";
    p[p.DISABLED = 1] = "DISABLED";
    p[p.AUTOSPIN = 2] = "AUTOSPIN";
  })(x = exports.SpinButtonMode ||= {});
  var u = function (p) {
    // 建構函式，初始化按鈕狀態與回呼
    function j() {
      var G = p !== null && p.apply(this, arguments) || this;
      G._mode = x.DISABLED;
      G._resumeState = x.DISABLED;
      G._animationState = T.STOPPED;
      G._isHovered = false;
      G._clickCallback = undefined;
      G._enterAutoSpinCallback = undefined;
      return G;
    }
    __extends(j, p);
    // 顯示自動旋轉外觀
    j.prototype.showAutoSpinLook = function () {
      if (this._enterAutoSpinCallback) {
        this._enterAutoSpinCallback();
      }
    };
    Object.defineProperty(j.prototype, "clickCallback", {
      get: function () {
        return this._clickCallback;
      },
      set: function (G) {
        this._clickCallback = G;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(j.prototype, "mode", {
      get: function () {
        return this._mode;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(j.prototype, "isHovered", {
      get: function () {
        return this._isHovered;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(j.prototype, "animationState", {
      get: function () {
        return this._animationState;
      },
      enumerable: false,
      configurable: true
    });
    // 設定點擊按鈕時的回呼函式
    j.prototype.setOnClickCallback = function (G) {
      this._clickCallback = G;
    };
    // 清除點擊按鈕的回呼函式
    j.prototype.clearOnClickCallback = function () {
      this._clickCallback = undefined;
    };
    // 銷毀控制器並清理資源
    j.prototype.destroy = function () {
      this._clickCallback = undefined;
      this._enterAutoSpinCallback = undefined;
      this._cleanUps();
      this.node.destroy();
      return p.prototype.destroy.call(this);
    };
    // 釋放滑鼠事件與動畫
    j.prototype._cleanUps = function () {
      this.disableMouseHover();
      if (this.onHideMouseOverEffect) {
        this.onHideMouseOverEffect();
      }
      if (this.onStopAllAnimations) {
        this.onStopAllAnimations();
      }
    };
    // 初始化並啟用滑鼠懸停效果
    j.prototype.init = function () {
      this.enableMouseHover();
      if (this.onInit) {
        this.onInit();
      }
    };
    // 顯示待命動畫狀態
    j.prototype.idle = function () {
      this._animationState = T.IDLE;
      if (this._mode !== x.AUTOSPIN) {
        if (this.onReplaceSpinClearSpriteFrame) {
          this.onReplaceSpinClearSpriteFrame();
        }
        if (this.onShowIdleAnimation) {
          this.onShowIdleAnimation();
        }
        if (this._isHovered) {
          this._showMouseOverEffect();
        }
      }
    };
    // 顯示旋轉中的動畫
    j.prototype.spin = function () {
      this._animationState = T.SPINNING;
      if (this._mode !== x.AUTOSPIN) {
        if (this.onReplaceSpinBlurredSpriteFrame) {
          this.onReplaceSpinBlurredSpriteFrame();
        }
        if (this.onShowSpinAnimation) {
          this.onShowSpinAnimation();
        }
      }
    };
    // 顯示停止旋轉的動畫
    j.prototype.stopSpin = function () {
      this._animationState = T.STOPPED;
      if (this._mode !== x.AUTOSPIN) {
        if (this.onReplaceSpinClearSpriteFrame) {
          this.onReplaceSpinClearSpriteFrame();
        }
        if (this.onShowStopSpinningAnimation) {
          this.onShowStopSpinningAnimation();
        }
      }
    };
    // 啟用按鈕互動
    j.prototype.enableButton = function () {
      if (this._mode === x.AUTOSPIN) {
        this._resumeState = x.ENABLED;
      }
      if (this._mode === x.DISABLED) {
        this._mode = x.ENABLED;
        this._resumeState = x.ENABLED;
        if (this.onEnableButton) {
          this.onEnableButton();
        }
      }
    };
    // 停用按鈕互動
    j.prototype.disableButton = function () {
      if (this._mode === x.AUTOSPIN) {
        this._resumeState = x.DISABLED;
      }
      if (this._mode === x.ENABLED) {
        this._mode = x.DISABLED;
        this._resumeState = x.DISABLED;
        if (this.onDisableButton) {
          this.onDisableButton();
        }
      }
    };
    // 顯示按鈕
    j.prototype.show = function () {
      this.node.active = true;
    };
    // 隱藏按鈕
    j.prototype.hide = function () {
      this.node.active = false;
    };
    // 是否處於自動旋轉模式
    j.prototype.isAutoSpin = function () {
      return this._mode === x.AUTOSPIN;
    };
    // 進入自動旋轉模式
    j.prototype.enterAutoSpinMode = function (G, V) {
      if (this._animationState === T.IDLE && G > 0) {
        this._mode = x.AUTOSPIN;
        this._enterAutoSpinCallback = V;
        this.showAutoSpinLook(G);
      }
    };
    // 更新自動旋轉剩餘次數
    j.prototype.updateAutoSpinCount = function (G) {
      if (this._mode === x.AUTOSPIN && this.onUpdateAutoSpinCount) {
        this.onUpdateAutoSpinCount(G);
      }
    };
    // 離開自動旋轉模式
    j.prototype.exitAutoSpinMode = function () {
      if (this._mode === x.AUTOSPIN) {
        this._mode = this._resumeState;
        if (this.isHovered) {
          if (this.onPlayMouseOverEffect) {
            this.onPlayMouseOverEffect();
          }
        } else if (this.onHideMouseOverEffect) {
          this.onHideMouseOverEffect();
        }
        if (this.onExitAutoSpinMode) {
          this.onExitAutoSpinMode();
        }
        switch (this._animationState) {
          case T.IDLE:
            if (this.onResumeIdle) {
              this.onResumeIdle();
            }
            break;
          case T.SPINNING:
            if (this.onResumeSpin) {
              this.onResumeSpin();
            }
            break;
          case T.STOPPED:
            if (this.onResumeStop) {
              this.onResumeStop();
            }
        }
        L.settingMenuHelper.stopSpinOptionButtonAnim();
      }
    };
    // 模擬按下旋轉按鈕
    j.prototype.clickSpinButton = function (G = k.SpinTrigger.CLICK) {
      if (this.node.active === true && this._mode !== x.DISABLED && D.buttonHitTest(this.node)) {
        var V = this._clickCallback;
        if (V) {
          V(G);
        }
      }
    };
    // 啟用滑鼠懸停監聽
    j.prototype.enableMouseHover = function () {
      this.node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseHovered, this);
      this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
    };
    // 停用滑鼠懸停監聽
    j.prototype.disableMouseHover = function () {
      this.node.off(cc.Node.EventType.MOUSE_ENTER, this.mouseHovered, this);
      this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.mouseLeave, this);
    };
    // 滑鼠移入時標記並播放效果
    j.prototype.mouseHovered = function () {
      this._isHovered = true;
      this._showMouseOverEffect();
    };
    // 滑鼠移出時取消效果
    j.prototype.mouseLeave = function () {
      this._isHovered = false;
      if (this.onHideMouseOverEffect) {
        this.onHideMouseOverEffect();
      }
    };
    // 顯示滑鼠懸停特效
    j.prototype._showMouseOverEffect = function () {
      var G = this._mode;
      var V = this._animationState;
      if ((G === x.AUTOSPIN || G !== x.DISABLED && V !== T.STOPPED) && this.onPlayMouseOverEffect) {
        this.onPlayMouseOverEffect();
      }
    };
    return __decorate([C], j);
  }(cc.Component);
  exports.default = u;
  cc._RF.pop();
}