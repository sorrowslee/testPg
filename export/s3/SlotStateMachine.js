if (!cc._RF.push(module, "f1d53JqS5hGVbtNCz0JAnwN", "SlotStateMachine")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StopStyle = exports.SlotStates = undefined;
  var T;
  var x;
  var L = require("Utils");
  (function (k) {
    k[k.SPINNING = 0] = "SPINNING";
    k[k.STOPPING = 1] = "STOPPING";
    k[k.STOPPED = 2] = "STOPPED";
  })(T = exports.SlotStates ||= {});
  (function (k) {
    k[k.NORMAL = 0] = "NORMAL";
    k[k.FAST = 1] = "FAST";
  })(x = exports.StopStyle ||= {});
  var D = function () {
    function k() {
      this._state = T.STOPPED;
      this._stopStyle = x.NORMAL;
      this._minimumSpinningTimeReached = false;
      this._regularSpinningTimeReached = false;
      this._unscheduleRegularSpinning = undefined;
      this._stopRequestCallback = undefined;
    }
      // 取得目前的旋轉狀態
      k.prototype.getState = function () {
      return this._state;
    };
      // 取得目前的停止方式
      k.prototype.getStopStyle = function () {
      return this._stopStyle;
    };
      // 開始旋轉並設定最短與一般轉動時間
      k.prototype.spin = function (C, u) {
      if (this._state === T.STOPPED) {
        this._state = T.SPINNING;
        L.delayCallback(C)(this._minimumSpinTimeOut.bind(this));
        this._unscheduleRegularSpinning = L.delayCallback(u)(this._regularSpinTimeOut.bind(this));
      }
    };
      // 標記為快速停止
      k.prototype.markFastStop = function () {
      if (this._state === T.SPINNING) {
        this._stopStyle = x.FAST;
      }
    };
      // 取消快速停止標記
      k.prototype.unmarkFastStop = function () {
      if (this._stopStyle === x.FAST && this._state === T.SPINNING) {
        this._stopStyle = x.NORMAL;
      }
    };
      // 請求立即以快速方式停止
      k.prototype.fastStop = function (C) {
      if (this._state === T.SPINNING || this._state === T.STOPPING) {
        this._stopStyle = x.FAST;
        this._state = T.STOPPING;
        this._stopRequestCallback = C;
        if (this._minimumSpinningTimeReached) {
          this._fastStop();
        }
      }
    };
      // 請求以一般方式停止
      k.prototype.stop = function (C) {
      if (this._state === T.SPINNING) {
        if (this._stopStyle === x.FAST) {
          return;
        }
        this._state = T.STOPPING;
        this._stopRequestCallback = C;
        if (this._regularSpinningTimeReached) {
          this._stop();
        }
      }
    };
      // 完成停止後重置狀態
      k.prototype.stopped = function () {
      this._state = T.STOPPED;
      this._reset();
    };
      // 最短轉動時間到期的處理
      k.prototype._minimumSpinTimeOut = function () {
      this._minimumSpinningTimeReached = true;
      if (this._state === T.STOPPING && this._stopStyle === x.FAST) {
        this._fastStop();
      }
    };
      // 一般轉動時間到期的處理
      k.prototype._regularSpinTimeOut = function () {
      this._regularSpinningTimeReached = true;
      if (this._state === T.STOPPING && this._stopStyle === x.NORMAL) {
        this._stop();
      }
    };
      // 觸發快速停止流程
      k.prototype._fastStop = function () {
      var C = this._unscheduleRegularSpinning;
      this._unscheduleRegularSpinning = undefined;
      if (C) {
        C();
      }
      this._stop();
    };
      // 執行停止回呼
      k.prototype._stop = function () {
      var C = this._stopRequestCallback;
      this._stopRequestCallback = undefined;
      if (C) {
        C();
      }
    };
      // 重置所有暫存狀態
      k.prototype._reset = function () {
      this._stopStyle = x.NORMAL;
      this._minimumSpinningTimeReached = false;
      this._regularSpinningTimeReached = false;
      this._stopRequestCallback = undefined;
      this._unscheduleRegularSpinning = undefined;
    };
    return k;
  }();
  exports.default = D;
  cc._RF.pop();
}