if (!cc._RF.push(module, "b6e176hgIFCvo12TMjQIRc7", "NumberLabelController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("NumberDisplayInterface");
  var x = require("Utils");
  var L = cc._decorator.ccclass;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u._isScaling = false;
      u._originalScaleX = 0;
      u._originalScaleY = 0;
      u._label = undefined;
      return u;
    }
    __extends(C, k);
    // 初始化標籤並監聽尺寸變化
    C.prototype.onLoad = function () {
      this._originalScaleX = this.numberContainer.scaleX;
      this._originalScaleY = this.numberContainer.scaleY;
      this._setupNumberContainer();
      this.numberContainer.on(cc.Node.EventType.SIZE_CHANGED, this.resizeNumberIfNeeded, this);
    };
    // 設定顯示在數字前的字串
    C.prototype.setPrefix = function (u) {
      this._prefix = u;
    };
    // 顯示數字並可選擇立即完成
    C.prototype.displayNumber = function (u, c = true, p) {
      this._endCallback = p;
      var j = this.getNumberList(u, c);
      this._label.string = this._prefix ? this._prefix + j : j;
      if (c) {
        var l = this._endCallback;
        this._endCallback = null;
        if (l) {
          l();
        }
      }
    };
    // 取得格式化後的數字字串
    C.prototype.getNumberList = function (u, c) {
      var p = /(?:\d+)(?:\.\d+)?/gm.exec(u.toString());
      if (p) {
        var j = parseFloat(p[0]);
        var l = this._getNumberDisplay(j, c);
        if (typeof u == "number") {
          return l;
        } else {
          return u.replace(p[0], l);
        }
      }
      return u.toString();
    };
    // 處理千分位與縮寫的數字
    C.prototype._getNumberDisplay = function (u, c) {
      var p = u;
      var j = "";
      var l = 1;
      if (this.enableShortenNumber && u > 999) {
        l = 1000;
        j = "k";
      }
      var G = !x.getDefaultCurrencyFormat().hideDecimal && this.enableDecimal;
      p = G ? Math.floor(p / l) : Math.round(p / l);
      if (this.enableComma) {
        p = this.numberWithComma(p);
      }
      if (G) {
        p += this._getDecimalStringFrom(u, c);
      }
      return p + j;
    };
    // 取得小數部分文字
    C.prototype._getDecimalStringFrom = function (u, c) {
      var p;
      var j;
      var l;
      var G = x.getDefaultCurrencyFormat().decimalSeparator;
      if (this.enableShortenNumber && u > 999) {
        p = Math.round(u / 100) / 10;
        j = 2;
        l = c ? "" : G + "0";
      } else {
        p = u;
        j = 3;
        l = G + "00";
      }
      var V = p.toString();
      if (V.indexOf(G) !== -1) {
        for (l = V.substring(V.indexOf(G), V.indexOf(G) + j); l.length !== j;) {
          l += "0";
        }
      }
      return l;
    };
    // 清除顯示文字並還原縮放
    C.prototype.clear = function () {
      this._label.string = "";
      this._revertScale();
    };
    // 超出容器時調整字體大小
    C.prototype.resizeNumberIfNeeded = function () {
      var u = this;
      if (!this._isScaling) {
        var c = this.numberContainer.width;
        var p = this.maxContainerSize / c;
        var j = c * this.numberContainer.scaleX;
        var l = this._endCallback;
        this._endCallback = null;
        if (isFinite(p) && !this._isScaling && Math.round(j) > this.maxContainerSize) {
          this._isScaling = true;
          var G = p - 0.06;
          function V() {
            u._isScaling = false;
            if (l) {
              l();
            }
          }
          if (this._resizeFunc) {
            this._resizeFunc(this.numberContainer, G, p, V);
          } else {
            this._bounceEffect(G, p, V);
          }
        } else {
          x.delayCallback(0)(function () {
            if (l) {
              l();
            }
          });
        }
      }
    };
    // 還原標籤縮放
    C.prototype._revertScale = function () {
      if (this._originalScaleX && this._originalScaleY) {
        this.numberContainer.scaleX = this._originalScaleX;
        this.numberContainer.scaleY = this._originalScaleY;
      }
    };
    // 縮放彈跳效果
    C.prototype._bounceEffect = function (u, c, p) {
      this.numberContainer.runAction(cc.sequence(cc.scaleTo(0.08, u), cc.scaleTo(0.05, c), cc.callFunc(p, this)));
    };
    // 初始化數字容器與字體
    C.prototype._setupNumberContainer = function () {
      this._label = this.numberContainer.getComponent(cc.Label);
      if (!this._label) {
        this._label = this.numberContainer.addComponent(cc.Label);
        this._label.fontSize = 45;
        this._label.lineHeight = 60;
        this._label.string = "";
      }
    };
    // 清理回呼與動畫函式
    C.prototype.onDestroy = function () {
      this._endCallback = null;
      this._resizeFunc = null;
    };
    return __decorate([L], C);
  }(T.default);
  exports.default = D;
  cc._RF.pop();
}