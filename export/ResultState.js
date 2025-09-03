if (!cc._RF.push(module, "08d5bAN5GxAf5RE9cTgDCu5", "ResultState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotStateMachine");
  var x = require("SlotAnalyticsHelper");
  var L = require("SlotAnalyticsEnum");
  var D = require("AutoSpinHandler");
  var k = require("UIState");
  var C = require("Utils");
  var p = require("SpinConfigHandler");
  var j = function (G) {
    function V(Q, N, Y) {
      var W = G.call(this, Q, N, Y) || this;
      W.name = "Result State";
      W.process = L.SpinStateProcess.REEL_SPINNING;
      W.hasFeature = false;
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
      // 執行結果狀態流程
      V.prototype.run = function () {
      G.prototype.run.call(this);
      this.enableSpinAction();
      C.sequenceCallback(this.resultDidStartRender.bind(this), this.renderSlotRegion.bind(this), this.defineFeature.bind(this), this.slotDidCompleteStop.bind(this))(this.exit.bind(this));
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
      // 佔位：狀態被強制退出
      V.prototype.onForceExit = function (Q) {
        Q();
      };
      // 佔位：狀態正常退出
      V.prototype.onExit = function (Q) {
        Q();
      };
      // 佔位：狀態被銷毀
      V.prototype.onDestroy = function (Q) {
        Q();
      };
      // 結果開始渲染時的回呼
      V.prototype.resultDidStartRender = function (Q) {
      if (Q) {
        Q();
      }
    };
      // 轉輪開始停止時的回呼
      V.prototype.slotDidStartStopping = function (Q) {
      if (Q) {
        Q();
      }
    };
      // 依停輪方式停止轉輪
      V.prototype.invokeSlotStop = function () {
      var Q = this.slotController;
      if (Q.getStopStyle() === T.StopStyle.FAST) {
        Q.fastStop();
      } else {
        Q.stopSpin();
      }
    };
      // 依目前流程觸發快速停止
      V.prototype.triggerFastStop = function (Q) {
      var N = this.slotController;
      var Y = this.spinButtonController;
      if (N.getStopStyle() !== T.StopStyle.FAST) {
        switch (this.process) {
          case L.SpinStateProcess.REEL_SPINNING:
            x.sendFastStopGA(Q, Y.isAutoSpin());
            this.triggerFastStopWhileSpinning();
            break;
          case L.SpinStateProcess.REEL_STOPPING:
            x.sendFastStopGA(Q, Y.isAutoSpin());
            this.triggerFastStopWhileStopping();
            break;
          case L.SpinStateProcess.REEL_STOPPED:
            this.triggerFastStopWhileStopped();
        }
      }
    };
      // 轉輪旋轉時觸發快速停止
      V.prototype.triggerFastStopWhileSpinning = function () {
      var Q = this.slotController;
      var N = this.spinButtonController;
      this.disableSpinAction();
      N.disableButton();
      Q.setOnClickCallback(undefined);
      Q.markFastStop();
    };
      // 轉輪停止中觸發快速停止
      V.prototype.triggerFastStopWhileStopping = function () {
      var Q = this.slotController;
      var N = this.spinButtonController;
      this.disableSpinAction();
      N.disableButton();
      Q.setOnClickCallback(undefined);
      Q.fastStop();
    };
      // 轉輪已停時觸發快速停止（佔位）
      V.prototype.triggerFastStopWhileStopped = function () {};
    // 初始化特色遊戲相關屬性
    V.prototype.setupFeatureProperties = function () {
      this.hasFeature = false;
    };
    // 設定轉輪資料來源
    V.prototype.setSlotData = function () {
      this.slotController.setReelData(this.dataSource.transactionModel.originalReels);
    };
    // 渲染轉輪區域並在完成後停止轉輪
    V.prototype.renderSlotRegion = function (Q) {
      this.setSlotData();
      C.spawnCallback(this.stopSlot.bind(this), this.slotDidStartStopping.bind(this))(Q);
    };
    // 停止轉輪並設定完成回呼
    V.prototype.stopSlot = function (Q) {
      if (this.process === L.SpinStateProcess.REEL_SPINNING) {
        this.process = L.SpinStateProcess.REEL_STOPPING;
        this.slotController.setStopCompletedCallback(Q);
        this.invokeSlotStop();
      } else if (Q) {
        Q();
      }
    };
    // 定義是否觸發特色遊戲
    V.prototype.defineFeature = function (Q) {
      this.setupFeatureProperties();
      Q();
    };
    // 轉輪完全停止後處理按鈕狀態並播放結果
    V.prototype.slotDidCompleteStop = function (Q) {
      this.process = L.SpinStateProcess.REEL_STOPPED;
      var N = this.spinButtonController;
      if (!N.isAutoSpin()) {
        this.disableSpinAction();
      }
      N.stopSpin();
      if (this.dataSource.transactionModel.winLines || this.hasFeature) {
        N.disableButton();
      }
      this.renderFeature(Q);
    };
    // 處理旋轉按鈕點擊
    V.prototype.onClickSpinButton = function (Q) {
      var N = this.spinButtonController;
      var Y = this.slotController.getStopStyle() === T.StopStyle.FAST;
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
      this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, L.SpinTrigger.CLICK));
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