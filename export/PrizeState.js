if (!cc._RF.push(module, "b8e16tOyU5GT4m5ZQseMAOn", "PrizeState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("AutoSpinHandler");
  var x = require("SlotAnalyticsEnum");
  var L = require("UIState");
  var D = require("SlotGameTools");
  var k = require("SettingMenuHelper");
  var C = require("Utils");
  require("TweaksData");
  var u = function (p) {
    function j(G, V, Q) {
      var N = p.call(this, G, V, Q) || this;
      N.name = "Prize State";
      return N;
    }
    __extends(j, p);
      j.prototype.setSlotController = function (G) {
        // 設定轉輪控制器
        this.slotController = G;
      };
      j.prototype.setSpinButtonController = function (G) {
        // 設定旋轉按鈕控制器
        this.spinButtonController = G;
      };
      j.prototype.run = function () {
        // 進入狀態時顯示獎金並檢查自動旋轉
        p.prototype.run.call(this);
        if (this.spinButtonController.isAutoSpin()) {
          this.enableSpinAction();
        }
        this.renderPrize();
      };
      j.prototype.exit = function () {
        // 離開狀態時取消按鈕行為
        this.disableSpinAction();
        p.prototype.exit.call(this);
      };
      j.prototype.destroy = function () {
        // 清理引用資源
        p.prototype.destroy.call(this);
        this.spinButtonController = undefined;
        this.slotController = undefined;
      };
      j.prototype.onReady = function () {};
      j.prototype.onRun = function () {};
      j.prototype.onForceExit = function (G) {
        // 強制離開時立即執行回呼
        G();
      };
      j.prototype.onExit = function (G) {
        // 狀態正常結束時回呼
        G();
      };
      j.prototype.onDestroy = function (G) {
        // 銷毀狀態時回呼
        G();
      };
      j.prototype.runBigPrizeState = function (G, V) {
        // 執行大獎流程
        if (V) {
          V();
        }
      };
      j.prototype.runMediumPrizeState = function (G, V) {
        // 執行中獎流程
        if (V) {
          V();
        }
      };
      j.prototype.runNoWinPrizeState = function (G) {
        // 沒有獲獎時更新餘額
        var V = this.dataSource.playerModel.balance;
        k.settingMenuHelper.setBalance(V);
        if (G) {
          G();
        }
      };
      j.prototype.renderPrize = function () {
        // 依序顯示得獎線與獎金
        C.spawnCallback(this.renderLines.bind(this), this.playPrize.bind(this))(this.exit.bind(this));
      };
      j.prototype.renderLines = function (G) {
        // 有得獎線時播放線效果
        if (this.dataSource.transactionModel.winLines) {
          this.playAllLines(G);
        } else if (G) {
          G();
        }
      };
      j.prototype.playAllLines = function (G) {
        // 播放所有得獎線的動畫
        G();
      };
      j.prototype.playPrize = function (G) {
        // 依獎金大小決定獎勵流程
        var V = this;
        var Q = this.getWinThresholds();
        var N = this.dataSource.transactionModel.totalWinAmount;
        if (D.isBigWinThreshold(N, Q)) {
          C.sequenceCallback(D.emitSocialBigWinStart, function (Y) {
            V.runBigPrizeState(N, Y);
          }, D.emitSocialBigWinEnd)(G);
        } else if (D.isMediumWinThreshold(N, Q)) {
          this.runMediumPrizeState(N, G);
        } else if (N > 0) {
          this.runSmallPrizeState(N, G);
        } else {
          this.runNoWinPrizeState(G);
        }
      };
      j.prototype.getWinThresholds = function () {
        // 取得獎金等級閾值
        return D.getWinThresholds(this.dataSource);
      };
      j.prototype.onClickSpinButton = function () {
        // 點擊按鈕時退出自動旋轉並關閉按鈕
        var G = this.spinButtonController;
        T.exitAutoSpin(G);
        G.disableButton();
        this.disableSpinAction();
      };
      j.prototype.enableSpinAction = function () {
        // 啟用按鈕點擊回呼
        this.spinButtonController.setOnClickCallback(this.onClickSpinButton.bind(this, x.SpinTrigger.CLICK));
      };
      j.prototype.disableSpinAction = function () {
        // 清除按鈕點擊回呼
        this.spinButtonController.clearOnClickCallback();
      };
    return j;
  }(L.default);
  exports.default = u;
  cc._RF.pop();
}