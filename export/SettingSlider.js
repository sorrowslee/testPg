if (!cc._RF.push(module, "357638pYQ9Eibsf8KFNqaZK", "SettingSlider")) {
  exports.__esModule = true;
  exports.default = undefined;
  var K = cc.Class({
    extends: cc.Component,
    properties: {
      settingSliderNum: cc.Prefab,
      numInterval: 10,
      maxUnit: 10,
      minNum: 0,
      content: cc.Node,
      alwaysShow: false,
      isPositive: false,
      showValue: false
    },
    setValueColor: function (g, T) {
      this._valueOnColor = g;
      this._valueOffColor = T;
    },
    init: function () {
      var g = this;
      var T = this._sliderNums = [];
      var x = this.numInterval;
      var L = this.minNum;
      for (var D = this.maxUnit, k = this.content, C = 0; C <= D; C++) {
        var j = cc.instantiate(this.settingSliderNum);
        var G = T[C] = j.getComponent("SettingSliderNum");
        G.setColor(this._valueOnColor, this._valueOffColor);
        G.num = L + C * x;
        j.x = 621 + C * 210;
        if (C == 0) {
          G.isMin = true;
        } else {
          G.setDisplayValue(this.showValue, G.num);
        }
        j.parent = k;
      }
      var V = -621 - D * 210;
      var Q = this.node;
      Q.on(cc.Node.EventType.TOUCH_START, function (Y) {
        if (Q.active) {
          Y.stopPropagation();
          g._startingX = Y.getLocation().x;
          g._contentX = k.x;
        }
      });
      Q.on(cc.Node.EventType.TOUCH_MOVE, function (Y) {
        if (Q.active) {
          Y.stopPropagation();
          var W = Y.getLocation().x - g._startingX;
          var q = g._contentX + W;
          if (q < V) {
            k.x = V;
            g.setLight(D);
          } else if (q > -621) {
            k.x = -621;
            g.setLight(0);
          } else {
            var S = Math.round(W / 105);
            var z = S * 105;
            var f = g._contentX + z;
            k.x = f;
            g.setLight(-((621 + g._contentX) / 105 + S) / 2);
          }
        }
      });
      Q.on(cc.Node.EventType.TOUCH_CANCEL, function (Y) {
        if (Q.active) {
          Y.stopPropagation();
          if (g.saveValue) {
            g.saveValue(g._currentSliderValue);
          }
        }
      });
      Q.on(cc.Node.EventType.TOUCH_END, function (Y) {
        if (Q.active) {
          Y.stopPropagation();
          if (g.saveValue) {
            g.saveValue(g._currentSliderValue);
          }
        }
      });
      if (this.alwaysShow) {
        var N = this._currentSliderValue || 0;
        this.setDefaultFirstSliderNum(N);
      } else {
        Q.active = false;
      }
    },
    setLight: function (g, T = false) {
      this._currentSliderValue;
      if (!T) {
        this._currentSliderValue;
      }
      if (g % 1 == 0) {
        var x = this._sliderNums[g];
        if (x == this._lastSliderNum) {
          if (this.saveValue) {
            this.saveValue(this._currentSliderValue);
          }
          return;
        }
        x.setLight(true);
        if (this._lastSliderNum) {
          this._lastSliderNum.setLight(false);
        }
        this._lastSliderNum = x;
      } else if (this._lastSliderNum) {
        this._lastSliderNum.setLight(false);
        this._lastSliderNum = null;
      }
      if (this.saveValue) {
        this.saveValue(this._currentSliderValue);
      }
    },
    setDefaultFirstSliderNum: function (g) {
      var T = (g - this.minNum) / 5;
      var x = -621 - T * 105;
      this.content.x = x;
      this.setLight(T / 2, true);
    },
    setValue: function (g) {
      this._currentSliderValue = g;
    },
    getValue: function () {
      return this._currentSliderValue;
    },
    updateSlider: function () {
      this.setDefaultFirstSliderNum(this._currentSliderValue);
    },
    testSetSliderNum: function () {
      this.setDefaultFirstSliderNum(Math.floor(Math.random() * 21) * 5);
    }
  });
  exports.default = K;
  module.exports = exports.default;
  cc._RF.pop();
}