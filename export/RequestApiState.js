if (!cc._RF.push(module, "c7edad6KmVKX7bJ07ILRJKN", "RequestApiState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotAnalyticsEnum");
  var x = require("SlotAnalyticsHelper");
  var L = require("SlotStateMachine");
  var D = require("AutoSpinHandler");
  var k = require("UIState");
  var C = require("SettingMenuHelper");
  var p = require("SpinConfigHandler");
  var j = function (G) {
    function V(Q, N, Y) {
      var W = G.call(this, Q, N, Y) || this;
      W.name = "Request Api State";
      return W;
    }
    __extends(V, G);
    // 設定轉輪控制器
    V.prototype.setSlotController = function (Q) {
      this.slotController = Q;
    };
    // 設定旋轉按鈕控制器
    V.prototype.setSpinButtonController = function (Q) {
      this.spinButtonController = Q;
    };
    // 進入狀態後開始旋轉並呼叫 API
    V.prototype.run = function () {
      G.prototype.run.call(this);
      this.spin();
      this.callApi(this.exit.bind(this));
    };
    // 離開狀態時清理點擊事件
    V.prototype.exit = function () {
      this.slotController.setOnClickCallback(undefined);
      this.disableSpinAction();
      G.prototype.exit.call(this);
    };
    // 銷毀狀態並釋放控制器引用
    V.prototype.destroy = function () {
      G.prototype.destroy.call(this);
      this.spinButtonController = undefined;
      this.slotController = undefined;
    };
    // 佔位：狀態準備完成
    V.prototype.onReady = function () {};
    // 佔位：狀態開始執行
    V.prototype.onRun = function () {};
    // 佔位：狀態正常退出
    V.prototype.onExit = function (Q) {
      Q();
    };
    // 佔位：狀態被強制退出
    V.prototype.onForceExit = function (Q) {
      Q();
    };
    // 佔位：狀態被銷毀
    V.prototype.onDestroy = function (Q) {
      Q();
    };
    // 啟動轉輪與旋轉按鈕
    V.prototype.startSlotController = function () {
      this.spinButtonController.spin();
      this.slotController.spin(C.settingMenuHelper.turboSpinOn);
    };
    // 佔位：快速停止觸發時的處理
    V.prototype.slotFastStopTriggered = function () {};
    // 佔位：送出 API 請求
    V.prototype.callApi = function (Q) {
      Q();
    };
    // 處理旋轉按鈕狀態並開始轉輪
    V.prototype.spin = function () {
      var Q = this.spinButtonController;
      if (Q.isAutoSpin() || p.featureConfig.fastStopFeature && !C.settingMenuHelper.turboSpinOn) {
        this.enableSpinAction();
      } else {
        Q.disableButton();
      }
      this.startSlotController();
    };
    // 觸發快速停止轉輪
    V.prototype.triggerFastStop = function (Q) {
      var N = this.slotController;
      var Y = this.spinButtonController;
      if (N.getStopStyle() !== L.StopStyle.FAST) {
        N.markFastStop();
        N.setOnClickCallback(undefined);
        Y.disableButton();
        this.disableSpinAction();
        x.sendFastStopGA(Q, Y.isAutoSpin());
        this.slotFastStopTriggered();
      }
    };
    // 處理旋轉按鈕點擊
    V.prototype.onClickSpinButton = function (Q) {
      var N = this.spinButtonController;
      var Y = this.slotController.getStopStyle() === L.StopStyle.FAST;
      if (N.isAutoSpin()) {
        if (!p.featureConfig.fastStopFeature || !!Y) {
          N.disableButton();
        }
        D.exitAutoSpin(N);
      } else if (!!p.featureConfig.fastStopFeature || !Y) {
        this.triggerFastStop(Q);
      }
    };
    // 啟用轉輪與按鈕的點擊行為
    V.prototype.enableSpinAction = function () {
      if (p.featureConfig.fastStopFeature) {
        this.slotController.setOnClickCallback(this.triggerFastStop.bind(this));
      }
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, T.SpinTrigger.CLICK));
    };
    // 停用按鈕點擊行為
    V.prototype.disableSpinAction = function () {
      this.spinButtonController.clearOnClickCallback();
    };
    return V;
  }(k.default);
  exports.default = j;
  cc._RF.pop();
}