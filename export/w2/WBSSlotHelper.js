if (!cc._RF.push(module, "239d699csBFGqLUk4z1+S78", "WBSSlotHelper")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SlotHelper");
  var x = require("GameConstant");
  var L = function (D) {
    function k() {
      var C = D !== null && D.apply(this, arguments) || this;
      C._topBufferRow = 1;
      return C;
    }
    __extends(k, D);
    // 初始化 SlotHelper 並設定視圖索引
    k.prototype.init = function (C) {
      this._topBufferRow = C.topBufferRow;
      C.slotViews.forEach(function (u, c) {
        u.slotViewIndex = c;
      });
      D.prototype.init.call(this, C);
    };
    // 計算滾動器需要停止的距離
    k.prototype.scrollerGetStopDistance = function (C) {
      var u;
      var c = this._scrollerController.indexOfScroller(C);
      var p = this._slotViews[c];
      var j = this._topBufferRow + x.NUMBER_OF_ROW_LIST[c];
      u = C.getRunTimeConfig().maxSpeed > 0 ? p.getNextBottomIndex(j) : p.getNextTopIndex(this._topExtraScrollRow);
      this._slotDataHandler.setReelDataPosition(c, u);
      return p.getDistanceToIndex(u);
    };
    return k;
  }(T.default);
  exports.default = L;
  cc._RF.pop();
}