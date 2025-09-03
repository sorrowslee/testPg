if (!cc._RF.push(module, "41cdfy0E9FKC7KilcTyf7iZ", "SettingSliderSingle")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = cc.Class({
    extends: cc.Component,
    properties: {
      settingSliderNum: cc.Prefab,
      numbers: [cc.Float],
      content: cc.Node,
      valueLabel: cc.Label,
      alwaysShow: false
    },
    // 啟用時調整數字起點並監聽尺寸變化
    onEnable: function () {
      this._changeNumberStartPoint();
      this.node.on("size-changed", this._changeNumberStartPoint, this);
    },
    // 停用時移除尺寸監聽
    onDisable: function () {
      this.node.off("size-changed", this._changeNumberStartPoint, this);
    },
    // 根據畫布寬度重新排列數字
    _changeNumberStartPoint: function () {
      this._middlePoint = cc.Canvas.instance.node.width / 2;
      if (this._inited) {
        var g = this._sliderNums;
        for (var T = 0, x = g.length; T < x; T++) {
          g[T].node.x = this._middlePoint + T * 183;
        }
        this.updateSlider();
      }
    },
    // 將滑桿設定為最大值
    setBiggestValue: function () {
      var g = this.numbers.length - 1;
      this.setLight(g);
      this.content.x = -this._middlePoint - g * 183;
    },
    // 設定可選數字列表
    setNumberList: function (g) {
      this.numbers = g;
    },
    // 設定數字亮暗顏色
    setValueColor: function (g, T) {
      this._valueOnColor = g;
      this._valueOffColor = T;
    },
    // 設定播放音效的方法
    setPlaySound: function (g) {
      this._playSound = g;
    },
    // 初始化滑桿與數字項目
    init: function () {
      var g = this;
      this._inited = false;
      var T = this._sliderNums = [];
      var x = this.numbers;
      var L = this.numbers.length - 1;
      var D = this.content;
      for (var k = 0, C = this.numbers.length; k < C; k++) {
        var j = cc.instantiate(this.settingSliderNum);
        var G = T[k] = j.getComponent("SettingSliderSingleNum");
        G.setColor(this._valueOnColor, this._valueOffColor);
        G.num = x[k];
        j.x = this._middlePoint + k * 183;
        j.parent = this.content;
      }
      var V = -this._middlePoint - L * 183;
      var Q = -this._middlePoint;
      var N = this.node;
      N.on(cc.Node.EventType.TOUCH_START, function (W) {
        if (N.active) {
          W.stopPropagation();
          g._startingX = W.getLocation().x;
          g._contentX = D.x;
        }
      });
      N.on(cc.Node.EventType.TOUCH_MOVE, function (W) {
        if (N.active) {
          W.stopPropagation();
          var q = W.getLocation().x - g._startingX;
          var S = g._contentX + q;
          if (S < V) {
            D.x = V;
            g.setLight(L);
          } else if (S > Q) {
            D.x = Q;
            g.setLight(0);
          } else {
            var z = Math.round(q / 183);
            var f = z * 183;
            var A = g._contentX + f;
            D.x = A;
            g.setLight(-((g._middlePoint + g._contentX) / 183 + z));
          }
        }
      });
      N.on(cc.Node.EventType.TOUCH_CANCEL, function (W) {
        if (N.active) {
          W.stopPropagation();
          if (g.updateValue) {
            g.updateValue(g._currentSliderValue);
          }
        }
      });
      N.on(cc.Node.EventType.TOUCH_END, function (W) {
        if (N.active) {
          W.stopPropagation();
          if (g.updateValue) {
            g.updateValue(g._currentSliderValue);
          }
        }
      });
      if (this.alwaysShow) {
        var Y = this._currentSliderValue || 0;
        this.setDefaultFirstSliderNum(Y);
      } else {
        N.active = false;
      }
      this._inited = true;
    },
    // 高亮選取的數字並觸發音效
    setLight: function (g, T = false) {
      g = Math.round(g);
      var x = this._currentSliderValue;
      if (this.valueLabel) {
        this._currentSliderValue = this.valueLabel.string = this.numbers[g];
      } else {
        this._currentSliderValue = this.numbers[g];
      }
      if (!T && x != this._currentSliderValue) {
        this._playSound();
      }
      if (g % 1 == 0) {
        var L = this._sliderNums[g];
        if (L == this._lastSliderNum) {
          return;
        }
        L.setLight(true);
        if (this._lastSliderNum) {
          this._lastSliderNum.setLight(false);
        }
        this._lastSliderNum = L;
      } else if (this._lastSliderNum) {
        this._lastSliderNum.setLight(false);
        this._lastSliderNum = null;
      }
      if (this.saveValue) {
        this.saveValue(this._currentSliderValue);
      }
    },
    // 設定預設顯示的數字
    setDefaultFirstSliderNum: function (g) {
      var T = this.numbers.indexOf(g);
      if (T === -1) {
        T = 0;
      }
      var x = T * 183;
      var L = -this._middlePoint - x;
      this.content.x = L;
      this.setLight(T, true);
    },
    // 儲存目前數值
    setValue: function (g) {
      this._currentSliderValue = g;
    },
    // 取得目前數值
    getValue: function () {
      return this._currentSliderValue;
    },
    // 依照數值更新滑桿位置
    updateSlider: function () {
      this.setDefaultFirstSliderNum(this._currentSliderValue);
    },
    // 測試用隨機設定數字
    testSetSliderNum: function () {
      this.setDefaultFirstSliderNum(Math.floor(Math.random() * 21) * 5);
    },
    // 播放滑動音效（預留）
    _playSound: function () {}
  });
  exports.default = K;
  module.exports = exports.default;
  cc._RF.pop();
}