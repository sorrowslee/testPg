if (!cc._RF.push(module, "b879fiUzY1Om5HhXaCp7Qrf", "ButtonController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator.ccclass;
  var x = function (L) {
    function D() {
      var k = L !== null && L.apply(this, arguments) || this;
      k._onClickCallback = undefined;
      return k;
    }
    __extends(D, L);
    // 設定按下時的回呼函式
    D.prototype.setClickCallback = function (k) {
      this._onClickCallback = k;
    };
    // 觸發點擊回呼
    D.prototype.onClick = function () {
      if (this._onClickCallback) {
        this._onClickCallback();
      }
    };
    // 清除點擊回呼
    D.prototype.clearClickCallback = function () {
      this._onClickCallback = undefined;
    };
    // 提供控制器與事件名稱資訊
    D.prototype.getControllerAndHandlerName = function () {
      return {
        ControllerName: "ButtonController",
        HandlerName: "onClick"
      };
    };
    return __decorate([T], D);
  }(cc.Component);
  exports.default = x;
  cc._RF.pop();
}