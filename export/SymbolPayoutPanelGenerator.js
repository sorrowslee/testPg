if (!cc._RF.push(module, "b4807S7wZxNyKaQIPwkQNfI", "SymbolPayoutPanelGenerator")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.regeneratePanel = exports.getButtonList = exports.getButtonComponentList = exports.getButtonControllerList = exports.generatePanel = exports.symbolPayoutPanelGenerator = undefined;
  var T = require("ButtonController");
  var x = function () {
    function L() {
      this._button = [];
      this._buttonController = [];
      this._buttonComponent = [];
      this._buttonPool = new cc.NodePool();
    }
    L.prototype._setButtonPosition = function (D, k, C, j, G, V, Q) {
      var N = Math.floor(C % Q);
      var Y = Math.floor(C / Q);
      var W = G * (1 - D.anchorY);
      var q = j * D.anchorX;
      var S = W - k.height / 2;
      var z = -(q - k.width / 2);
      var A = S - k.height * N;
      var M = z + k.width * Y;
      k.setPosition(M, A);
    };
    L.prototype.generatePanel = function (D) {
      var k = D.containerNode;
      var C = D.containerSize ? D.containerSize : k.getContentSize();
      var j = C.width;
      var G = C.height;
      k.width = j;
      k.height = G;
      var V = D.numberOfColumn;
      var Q = D.numberOfRow;
      for (var N = D.numberOfButton ? D.numberOfButton : V * Q, Y = j / V, W = G / Q, q = 0; q < N; q++) {
        var z = this._buttonPool.get();
        var A = undefined;
        var M = undefined;
        if (z) {
          A = z.getComponent(T.default);
          M = z.getComponent(cc.Button);
        } else {
          z = new cc.Node("payout_button");
          var E = new cc.Node("background");
          z.addChild(E);
          M = z.addComponent(cc.Button);
          A = z.addComponent(T.default);
          M.target = E;
          z.height = D.buttonHeight ? D.buttonHeight : W;
          z.width = D.buttonWidth ? D.buttonWidth : Y;
          M.transition = cc.Button.Transition.COLOR;
          M.pressedColor = cc.Color.GRAY;
          var F = E.addComponent(cc.Sprite);
          F.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          if (D.buttonBase) {
            F.spriteFrame = D.buttonBase.spriteFrame;
          }
          E.height = W;
          E.width = Y;
        }
        z.parent = k;
        var b = D.buttonPosition;
        if (b) {
          z.setPosition(b[q]);
        } else {
          this._setButtonPosition(k, z, q, j, G, V, Q);
        }
        this._button.push(z);
        this._buttonController.push(A);
        this._buttonComponent.push(M);
      }
    };
    L.prototype.getButtonList = function () {
      return this._button;
    };
    L.prototype.getButtonControllerList = function () {
      return this._buttonController;
    };
    L.prototype.getButtonComponentList = function () {
      return this._buttonComponent;
    };
    L.prototype.regeneratePanel = function (D) {
      var k = this;
      this._button.forEach(function (C) {
        k._buttonPool.put(C);
      });
      this._button = [];
      this._buttonComponent = [];
      this._buttonController = [];
      this.generatePanel(D);
    };
    return L;
  }();
  exports.default = x;
  exports.symbolPayoutPanelGenerator = new x();
  exports.generatePanel = exports.symbolPayoutPanelGenerator.generatePanel.bind(exports.symbolPayoutPanelGenerator);
  exports.getButtonControllerList = exports.symbolPayoutPanelGenerator.getButtonControllerList.bind(exports.symbolPayoutPanelGenerator);
  exports.getButtonComponentList = exports.symbolPayoutPanelGenerator.getButtonComponentList.bind(exports.symbolPayoutPanelGenerator);
  exports.getButtonList = exports.symbolPayoutPanelGenerator.getButtonList.bind(exports.symbolPayoutPanelGenerator);
  exports.regeneratePanel = exports.symbolPayoutPanelGenerator.regeneratePanel.bind(exports.symbolPayoutPanelGenerator);
  cc._RF.pop();
}