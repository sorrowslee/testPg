if (!cc._RF.push(module, "db0df9/6UZNW6sskb9QIFSg", "PageControl")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("PageControlButton");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (C) {
    function _u() {
      var c = C !== null && C.apply(this, arguments) || this;
      c.buttonPrefab = undefined;
      c.delegate = undefined;
      c._currentPage = 0;
      c._totalPage = 0;
      c._dotButtons = [];
      return c;
    }
    __extends(_u, C);
    _u.prototype.init = function (c, p, j) {
      // 初始化頁面控制器，生成對應頁數的點點按鈕
      if (!(c >= p) && !(c < 0)) {
        this.node.removeAllChildren();
        this._totalPage = p;
        this.delegate = j;
        var l = [];
        for (var G = 0; G < p; G++) {
          var V = cc.instantiate(this.buttonPrefab);
          V.parent = this.node;
          var Q = V.getComponent(T.default);
          Q.index = G;
          Q.delegate = this;
          Q.init();
          l.push(Q);
        }
        l[c].setSelect();
        this._currentPage = c;
        this._dotButtons = l;
      }
    };
    _u.prototype.layoutContainer = function (c) {
      // 設定點點按鈕的水平間距
      this.getComponent(cc.Layout).spacingX = c;
    };
    _u.prototype.changeCurrentPage = function (c) {
      // 切換目前的頁面索引
      var p = this._totalPage;
      if (!(c < 0) && !(c >= p)) {
        var j = this._dotButtons;
        j[this._currentPage].setUnselect();
        j[c].setSelect();
        this._currentPage = c;
      }
    };
    _u.prototype.getCurrentPage = function () {
      // 取得目前頁面索引
      return this._currentPage;
    };
    _u.prototype.didSelectDotAtIndex = function (c) {
      // 點擊點點時更新選取並通知委派物件
      this._dotButtons[this._currentPage].setUnselect();
      this._currentPage = c;
      if (this.delegate && this.delegate.changePage) {
        this.delegate.changePage(c);
      }
    };
    _u.prototype.canChangePage = function () {
      // 判斷是否允許切換頁面
      var c = this.delegate;
      return !c || !c.enableChangePage || !!c.enableChangePage();
    };
    __decorate([D(cc.Prefab)], _u.prototype, "buttonPrefab", undefined);
    return __decorate([L], _u);
  }(cc.Component);
  exports.default = k;
  cc._RF.pop();
}