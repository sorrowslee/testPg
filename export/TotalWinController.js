if (!cc._RF.push(module, "2d856BrsX1JrKn92k3tMGw+", "TotalWinController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SpaceBarInterrupter");
  var x = require("Utils");
  var L = require("GameEventHandler");
  var D = require("WinTemplateConstant");
  var k = cc._decorator;
  var C = k.ccclass;
  var p = k.property;
  var j = function (G) {
    function V() {
      var Q = G !== null && G.apply(this, arguments) || this;
      Q.skipNode = undefined;
      Q.collectButton = undefined;
      Q.winAmountNode = undefined;
      Q.totalWinState = D.WinState.INITIAL;
      Q.winAmount = 0;
      Q.isReplaying = false;
      Q._onCompleteCallback = undefined;
      Q._willCompleteCallback = undefined;
      Q._numberRollController = undefined;
      return Q;
    }
    __extends(V, G);
    // 物件銷毀時的擴充點
    V.prototype.onDestroyed = function () {};
    // 初始化時的自訂邏輯
    V.prototype.onInit = function () {};
    // 設定資料時的自訂邏輯
    V.prototype.onSetup = function () {};
    // 開始播放時的自訂邏輯
    V.prototype.onPlay = function () {};
    // 數字滾動開始時的回呼
    V.prototype.onWinRollStart = function () {};
    // 數字滾動結束後的回呼
    V.prototype.onWinRollComplete = function (Q) {
      Q();
    };
    // 點擊收集按鈕時的回呼
    V.prototype.onCollect = function (Q) {
      Q();
    };
    // 停止顯示時的回呼
    V.prototype.onStop = function () {};
    // 淡出時的回呼
    V.prototype.onDismiss = function () {};
    // 重設狀態時的回呼
    V.prototype.onReset = function () {};
    // 銷毀控制器並清除資源
    V.prototype.destroy = function () {
      this.onDestroyed();
      this._numberRollController.stop(true);
      this._numberRollController = undefined;
      this.winAmount = 0;
      this._willCompleteCallback = undefined;
      this._onCompleteCallback = undefined;
      this.unscheduleAllCallbacks();
      var Q = this.node;
      Q.stopAllActions();
      Q.destroy();
      return G.prototype.destroy.call(this);
    };
    // 初始化控制器並取得數字滾動控制器
    V.prototype.init = function (Q) {
      this.onInit(Q);
      this._numberRollController = this.winAmountNode.getComponent("NumberRollController");
    };
    // 設定初始狀態並隱藏節點
    V.prototype.setup = function (Q) {
      this.node.active = false;
      this.onSetup(Q);
    };
    // 收集按鈕點擊事件
    V.prototype.onCollectButtonClick = function () {
      var Q = this;
      if (this.collectButton.interactable) {
        this._inactiveCollectButton();
        this.unscheduleAllCallbacks();
        this.onCollect(function () {
          Q._stop();
        });
      }
    };
    // 跳過按鈕點擊事件
    V.prototype.onSkipButtonClick = function () {
      this._skipNumberRoll();
    };
    // 設定完成前的回呼
    V.prototype.setWillCompleteCallback = function (Q) {
      this._willCompleteCallback = Q;
    };
    // 開始顯示總贏畫面
    V.prototype.play = function (Q, N, Y, W, q) {
      if (this.totalWinState === D.WinState.INITIAL) {
        L.emitGameEffectStateChangedEvent({
          displayState: "Start",
          effectType: "TotalWin"
        });
        var z = this.node;
        z.active = true;
        z.opacity = 0;
        z.stopAllActions();
        z.runAction(cc.fadeIn(0.3));
        this._inactiveCollectButton();
        this.isReplaying = W;
        this.totalWinState = D.WinState.PLAYING;
        this.winAmount = Q;
        this._onCompleteCallback = Y;
        this.onPlay(q);
        if (N > 0) {
          x.delayCallback(N)(this._startWinRoll.bind(this));
        } else {
          this._startWinRoll();
        }
      }
    };
    // 啟動數字滾動並開啟跳過按鈕
    V.prototype._startWinRoll = function () {
      x.delayCallback(1)(this._activeSkipButton.bind(this));
      this.onWinRollStart();
      this._numberRollController.play(0, this.winAmount, this._winRollComplete.bind(this));
    };
    // 略過數字滾動動畫
    V.prototype._skipNumberRoll = function () {
      this._inactiveSkipButton();
      this._numberRollController.skip();
    };
    // 數字滾動完成後進入等待階段
    V.prototype._winRollComplete = function () {
      var Q = this;
      if (this.totalWinState === D.WinState.PLAYING) {
        this.totalWinState = D.WinState.WAITING;
        this._inactiveSkipButton();
        this.onWinRollComplete(function () {
          L.emitGameEffectStateChangedEvent({
            displayState: "DidUpdate",
            effectType: "TotalWin"
          });
          var Y = Q.isReplaying ? D.REPLAY_WIN_HOLD_DURATION : D.NORMAL_WIN_HOLD_DURATION;
          Q.unscheduleAllCallbacks();
          Q.scheduleOnce(Q.onCollectButtonClick, Y);
          Q._activeCollectButton();
        });
      }
    };
    // 結束顯示並準備淡出
    V.prototype._stop = function () {
      if (this.totalWinState === D.WinState.WAITING) {
        this.totalWinState = D.WinState.DISMISING;
        this._inactiveCollectButton();
        this._inactiveSkipButton();
        this.onStop();
        this.unscheduleAllCallbacks();
        L.emitGameEffectStateChangedEvent({
          displayState: "WillEnd",
          effectType: "TotalWin"
        });
        if (this._willCompleteCallback) {
          var N = this._willCompleteCallback;
          this._willCompleteCallback = undefined;
          N(this._dismiss.bind(this));
        } else {
          this._dismiss();
        }
      }
    };
    // 執行淡出動畫
    V.prototype._dismiss = function () {
      if (this.totalWinState === D.WinState.DISMISING) {
        this.onDismiss();
        var Q = this.node;
        Q.stopAllActions();
        Q.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(this._completeShowTotalWin, this)));
      }
    };
    // 顯示結束後觸發完成回呼
    V.prototype._completeShowTotalWin = function () {
      L.emitGameEffectStateChangedEvent({
        displayState: "End",
        effectType: "TotalWin"
      });
      var N = this._onCompleteCallback;
      this._reset();
      if (N) {
        N();
      }
    };
    // 啟用跳過按鈕並註冊空白鍵事件
    V.prototype._activeSkipButton = function () {
      if (!this.skipNode.active) {
        T.spaceBarInterrupter.subscribeEventInterrupter("totalwin", this.node, this._skipNumberRoll.bind(this));
        this.skipNode.active = true;
      }
    };
    // 停用跳過按鈕並取消事件
    V.prototype._inactiveSkipButton = function () {
      if (this.skipNode.active) {
        T.spaceBarInterrupter.unsubscribeEventInterrupter("totalwin");
        this.skipNode.active = false;
      }
    };
    // 啟用收集按鈕並註冊空白鍵事件
    V.prototype._activeCollectButton = function () {
      this.collectButton.interactable = true;
      T.spaceBarInterrupter.subscribeEventInterrupter("totalwinbtn", this.node, this.onCollectButtonClick.bind(this));
    };
    // 停用收集按鈕並取消事件
    V.prototype._inactiveCollectButton = function () {
      this.collectButton.interactable = false;
      T.spaceBarInterrupter.unsubscribeEventInterrupter("totalwinbtn");
    };
    // 重設控制器狀態
    V.prototype._reset = function () {
      this.onReset();
      this.unscheduleAllCallbacks();
      this._numberRollController.stop(true);
      this.totalWinState = D.WinState.INITIAL;
      this.winAmount = 0;
      this._onCompleteCallback = undefined;
      var Q = this.node;
      Q.stopAllActions();
      Q.active = false;
    };
    __decorate([p(cc.Node)], V.prototype, "skipNode", undefined);
    __decorate([p(cc.Button)], V.prototype, "collectButton", undefined);
    __decorate([p(cc.Node)], V.prototype, "winAmountNode", undefined);
    return __decorate([C], V);
  }(cc.Component);
  exports.default = j;
  cc._RF.pop();
}