if (!cc._RF.push(module, "9fd10r5SF9AY7ViKPJFg+fR", "TransitionContext")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TransitionContext = undefined;
  var T = function () {
    function x(L, D, k, C, u) {
      this._fromController = L;
      this._toController = D;
      this._fromView = k;
      this._toView = C;
      this._container = u;
    }
    // 取得來源控制器
    x.prototype.getFromController = function () {
      return this._fromController;
    };
    // 取得目標控制器
    x.prototype.getToController = function () {
      return this._toController;
    };
    // 取得來源視圖
    x.prototype.getFromView = function () {
      return this._fromView;
    };
    // 取得目標視圖
    x.prototype.getToView = function () {
      return this._toView;
    };
    // 取得轉場容器
    x.prototype.getContainer = function () {
      return this._container;
    };
    return x;
  }();
  exports.TransitionContext = T;
  cc._RF.pop();
}