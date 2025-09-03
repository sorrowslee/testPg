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
    x.prototype.getFromController = function () {
      return this._fromController;
    };
    x.prototype.getToController = function () {
      return this._toController;
    };
    x.prototype.getFromView = function () {
      return this._fromView;
    };
    x.prototype.getToView = function () {
      return this._toView;
    };
    x.prototype.getContainer = function () {
      return this._container;
    };
    return x;
  }();
  exports.TransitionContext = T;
  cc._RF.pop();
}