if (!cc._RF.push(module, "2472eYgH9NBWJvtIuLXvIEh", "NavigationDefaultTransition")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DefaultNavigationPopTransition = exports.DefaultNavigationPushTransition = undefined;
  var T = require("ViewControllerTransition");
  var x = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    // 回傳過渡動畫時間
    k.prototype.transitionDuration = function () {};
    // 推入場景的移動動畫
    k.prototype.animateTransition = function (C, u) {
      var c = C.getToController();
      var p = C.getFromController();
      var j = C.getContainer();
      var G = (p.node.anchorX - j.anchorX - 1) * j.width;
      var V = (p.node.anchorY - j.anchorY) * j.height;
      p.node.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(G, V)).easing(cc.easeSineIn()), cc.callFunc(function () {
        p.node.setPosition(G, V);
      })));
      var Q = (c.node.anchorX - j.anchorX) * j.width;
      var N = (c.node.anchorY - j.anchorY) * j.height;
      c.node.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(Q, N)).easing(cc.easeSineIn()), cc.callFunc(function () {
        c.node.setPosition(Q, N);
        if (u) {
          u();
        }
      })));
    };
    k.prototype.animationEnd = function () {};
    return k;
  }(T.default);
  exports.DefaultNavigationPushTransition = x;
  var L = function (D) {
    function k() {
      return D !== null && D.apply(this, arguments) || this;
    }
    __extends(k, D);
    // 回傳過渡動畫時間
    k.prototype.transitionDuration = function () {};
    // 彈出場景的移動動畫
    k.prototype.animateTransition = function (C, u) {
      var c = C.getToController();
      var p = C.getFromController();
      var j = C.getContainer();
      var G = (p.node.anchorX - j.anchorX + 1) * j.width;
      var V = (p.node.anchorY - j.anchorY) * j.height;
      p.node.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(G, V)).easing(cc.easeSineIn()), cc.callFunc(function () {
        p.node.setPosition(G, V);
      })));
      var Q = (c.node.anchorX - j.anchorX) * j.width;
      var N = (c.node.anchorY - j.anchorY) * j.height;
      c.node.runAction(cc.sequence(cc.moveTo(0.4, cc.v2(Q, N)).easing(cc.easeSineIn()), cc.callFunc(function () {
        c.node.setPosition(Q, N);
        if (u) {
          u();
        }
      })));
    };
    k.prototype.animationEnd = function () {};
    return k;
  }(T.default);
  exports.DefaultNavigationPopTransition = L;
  cc._RF.pop();
}