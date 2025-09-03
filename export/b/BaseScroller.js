if (!cc._RF.push(module, "7a55d+EM2dKr590KKrgiTXR", "BaseScroller")) {
  var T;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SCROLLER_EVENT = exports.ScrollerState = undefined;
  (function (k) {
    k[k.IDLE = 0] = "IDLE";
    k[k.RUNNING = 1] = "RUNNING";
    k[k.ENDED = 2] = "ENDED";
  })(T = exports.ScrollerState ||= {});
  exports.SCROLLER_EVENT = Object.freeze({
    RUN: "run",
    END: "end",
    ACCELERATE: "accelerate",
    DECELERATE: "decelerate"
  });
  var D = function (k) {
    function C(p) {
      var j = k.call(this) || this;
      j.state = T.IDLE;
      j.config = undefined;
      j.runtimeConfig = undefined;
      j.config = p;
      j.runtimeConfig = __assign({}, p);
      return j;
    }
    var u = {
      get: function () {
        return this.state === T.RUNNING;
      },
      enumerable: false,
      configurable: true
    };
    var c = {
      get: function () {
        return this.state === T.ENDED;
      },
      enumerable: false,
      configurable: true
    };
    __extends(C, k);
    Object.defineProperty(C.prototype, "isPlaying", u);
    Object.defineProperty(C.prototype, "isEnded", c);
    // 更新設定檔的參數
    C.prototype.setConfig = function (p) {
      Object.assign(this.config, p);
    };
    // 更新執行時的動態設定
    C.prototype.updateRunTimeConfig = function (p) {
      Object.assign(this.runtimeConfig, p);
    };
    // 取得目前的執行時設定
    C.prototype.getRunTimeConfig = function () {
      return __assign({}, this.runtimeConfig);
    };
    // 重置狀態並恢復初始設定
    C.prototype.reset = function () {
      this.state = T.IDLE;
      this.runtimeConfig = __assign({}, this.config);
      this.onReset();
    };
    // 開始執行滾動邏輯
    C.prototype.run = function () {
      if (this.state === T.IDLE) {
        this.state = T.RUNNING;
        this.onRun();
      }
    };
    // 結束滾動並觸發回呼
    C.prototype.end = function () {
      if (this.state !== T.ENDED) {
        this.state = T.ENDED;
        this.onEnd();
      }
    };
    // 可由子類實作重置時的行為
    C.prototype.onReset = function () {};
    // 可由子類實作開始時的行為
    C.prototype.onRun = function () {};
    // 可由子類實作結束時的行為
    C.prototype.onEnd = function () {};
    // 發送滾動事件與速度資訊
    C.prototype.emitEvent = function (p, j) {
      var l = {
        scroller: this,
        speedFactor: j
      };
      var G = l;
      this.emit(p, G);
    };
    return C;
  }(cc.EventTarget);
  exports.default = D;
  cc._RF.pop();
}