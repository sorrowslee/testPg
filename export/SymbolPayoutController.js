if (!cc._RF.push(module, "7c05ali6OlCEJ+GOnxbYWHT", "SymbolPayoutController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("SymbolPayoutPanelGenerator");
  var x = require("SinglePayoutModel");
  var L = require("Utils");
  var D = require("PopOutItemHandler");
  var k = cc._decorator;
  var C = k.ccclass;
  var p = k.property;
  var j = function (G) {
    function V() {
      var Q = G !== null && G.apply(this, arguments) || this;
      Q.popOutItem = undefined;
      Q.popOutTint = undefined;
      Q._tintController = [];
      Q._additionalOnClickCallback = undefined;
      Q._additionalOnCancelCallback = undefined;
      Q._popoutItemHandler = new D.default();
      Q._extraInitialzation = undefined;
      Q._singlePayoutModel = new x.default();
      Q._symbolPayoutPanelGenerator = T.symbolPayoutPanelGenerator;
      return Q;
    }
    __extends(V, G);
    V.prototype.init = function (Q) {
      Q.containerNode = Q.containerNode ? Q.containerNode : this.node;
      this._config = Q;
      var N = Q.numberOfTint ? Q.numberOfTint : 1;
      this._overrideSymbolPayoutPanel();
      this._symbolPayoutPanelGenerator.generatePanel(Q);
      if (N > 1) {
        this._tintController = [];
        for (var Y = 0; Y < N; Y++) {
          var W = cc.instantiate(this.popOutTint);
          if (Array.isArray(this._popOutTintHolder)) {
            this._popOutTintHolder[Y].addChild(W);
          } else {
            this._popOutTintHolder.addChild(W);
          }
          var q;
          var S = W.getComponent("PopOutTintController");
          q = Array.isArray(this._tintConfig) ? this._tintConfig[Y] : this._tintConfig;
          this._tintController.push(S);
          S.setup(q);
        }
      } else {
        W = cc.instantiate(this.popOutTint);
        this._popOutTintHolder.addChild(W);
        this._tintController = W.getComponent("PopOutTintController");
        this._tintController.setup(this._tintConfig);
      }
      this._popoutItemHandler.init(this.popOutItem, this._popOutDisplayHolder);
      this._singlePayoutModel.payoutData = Q.payoutData;
      if (this._extraInitialzation) {
        this._extraInitialzation(Q);
      }
    };
    V.prototype.resetPanel = function (Q) {
      Q.containerNode = Q.containerNode ? Q.containerNode : this.node;
      this._config = Q;
      this._symbolPayoutPanelGenerator.regeneratePanel(Q);
      this._singlePayoutModel.payoutData = Q.payoutData ? Q.payoutData : this._singlePayoutModel.payoutData;
    };
    V.prototype.setExtraInitialzation = function (Q) {
      this._extraInitialzation = Q;
    };
    V.prototype.setPopOutDisplayHolder = function (Q) {
      this._popOutDisplayHolder = Q;
    };
    V.prototype.setPopOutTintHolder = function (Q) {
      this._popOutTintHolder = Q;
    };
    V.prototype.setReelData = function (Q, N, Y) {
      this._singlePayoutModel.reelData = Q;
      this._singlePayoutModel.extendSymbolData = N;
      this._singlePayoutModel.extendBlockData = Y;
    };
    V.prototype.setAdditionalData = function (Q) {
      this._singlePayoutModel.additionalData = Q;
    };
    V.prototype.setTintConfig = function (Q) {
      this._tintConfig = Q;
    };
    V.prototype.setupButtonEvent = function (Q) {
      var N = this;
      if (Q === undefined) {
        Q = [];
      }
      var Y = this._symbolPayoutPanelGenerator.getButtonControllerList();
      var W = this._symbolPayoutPanelGenerator.getButtonComponentList();
      Y.forEach(function (q, S) {
        if (Q.includes(S)) {
          q.setClickCallback(undefined);
          W[S].clickEvents = [];
        } else {
          var z = N._showPopOutItem.bind(N, S, N._singlePayoutModel.reelData[S], N._singlePayoutModel.payoutData);
          q.setClickCallback(z);
          var f = q.getControllerAndHandlerName();
          var A = f.ControllerName;
          var M = f.HandlerName;
          var E = new cc.Component.EventHandler();
          E.target = q.node;
          E.component = A;
          E.handler = M;
          W[S].clickEvents = [];
          W[S].clickEvents.push(E);
        }
      });
    };
    V.prototype.setAdditionalOnClickCallback = function (Q) {
      this._additionalOnClickCallback = Q;
    };
    V.prototype.setAdditionalOnCancelCallback = function (Q) {
      this._additionalOnCancelCallback = Q;
    };
    V.prototype.clearOnClickCallback = function () {
      this._symbolPayoutPanelGenerator.getButtonControllerList().forEach(function (Q) {
        Q.clearClickCallback();
      });
    };
    V.prototype.enablePanel = function () {
      this.node.active = true;
      this._symbolPayoutPanelGenerator.getButtonComponentList().forEach(function (Q) {
        Q.interactable = true;
      });
    };
    V.prototype.disablePanel = function () {
      this._symbolPayoutPanelGenerator.getButtonComponentList().forEach(function (Q) {
        Q.interactable = false;
      });
      this.node.active = false;
    };
    V.prototype.hidePopOutItem = function (Q) {
      this._hidePopOutItem(Q);
    };
    Object.defineProperty(V.prototype, "buttonList", {
      get: function () {
        return this._symbolPayoutPanelGenerator.getButtonList();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(V.prototype, "buttonControllerList", {
      get: function () {
        return this._symbolPayoutPanelGenerator.getButtonControllerList();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(V.prototype, "buttonComponentList", {
      get: function () {
        return this._symbolPayoutPanelGenerator.getButtonComponentList();
      },
      enumerable: false,
      configurable: true
    });
    V.prototype._showPopOutItem = function (Q, N, Y) {
      var W = this;
      this._setPopOutItemCancelCallback(this._hidePopOutItem.bind(this));
      L.spawnCallback(this._showPopOutTint.bind(this, Q, N), this._setupPopOutItem.bind(this, Q, N, Y))(function () {
        W._runAdditionalOnClickCallback();
      });
    };
    V.prototype.setPopOutItemLayout = function (Q, N) {
      var Y;
      Y = N < Math.round(this._config.numberOfColumn / 2) * this._config.numberOfRow;
      var W = Q.parent.convertToWorldSpaceAR(Q.position);
      return {
        isLeftToRight: Y,
        position: this._popOutDisplayHolder.convertToNodeSpaceAR(W)
      };
    };
    V.prototype._setupPopOutItem = function (Q, N, Y, W) {
      var q = this._singlePayoutModel;
      var S = q.extendSymbolData;
      var z = q.extendBlockData;
      var f = q.additionalData;
      if (S) {
        Object.keys(S).forEach(function (h) {
          if (S[h].includes(Q)) {
            var b = S[h].length;
            Q = S[h][b - 1];
          }
        });
      }
      var A = this._symbolPayoutPanelGenerator.getButtonList()[Q];
      var M = this.setPopOutItemLayout(A, Q);
      var E = M.isLeftToRight;
      var F = M.position;
      this._popoutItemHandler.runPopoutItemShowCallback(W, Y, Q, N, cc.v2(F), E, S, z, f);
    };
    V.prototype._setPopOutItemCancelCallback = function (Q) {
      this._popoutItemHandler.setCancelCallback(Q);
    };
    V.prototype._showPopOutTint = function (Q, N, Y) {
      function W() {
        if (Y) {
          Y();
        }
      }
      if (Array.isArray(this._tintController)) {
        var q = [];
        this._tintController.forEach(function (S) {
          q.push(S.show.bind(S));
        });
        L.spawnCallback(q)(W);
      } else {
        this._tintController.show(function () {
          W();
        });
      }
    };
    V.prototype._hidePopOutItem = function (Q) {
      this._popoutItemHandler.runPopoutItemHideCallback();
      function N() {
        if (Q) {
          Q();
        }
      }
      if (Array.isArray(this._tintController)) {
        var Y = [];
        this._tintController.forEach(function (W) {
          Y.push(W.hide.bind(W));
        });
        L.spawnCallback(Y)(N);
      } else {
        this._tintController.hide(N);
      }
      this._runAdditionalOnCancelCallback();
    };
    V.prototype._runAdditionalOnClickCallback = function () {
      if (this._additionalOnClickCallback) {
        this._additionalOnClickCallback();
      }
    };
    V.prototype._runAdditionalOnCancelCallback = function () {
      if (this._additionalOnCancelCallback) {
        this._additionalOnCancelCallback();
      }
    };
    V.prototype._overrideSymbolPayoutPanel = function () {
      if (this._config.symbolPayoutPanelGenerator) {
        this._symbolPayoutPanelGenerator = this._config.symbolPayoutPanelGenerator;
      }
    };
    Object.defineProperty(V.prototype, "singlePayoutModel", {
      get: function () {
        return this._singlePayoutModel;
      },
      enumerable: false,
      configurable: true
    });
    __decorate([p(cc.Prefab)], V.prototype, "popOutItem", undefined);
    __decorate([p(cc.Prefab)], V.prototype, "popOutTint", undefined);
    return __decorate([C], V);
  }(cc.Component);
  exports.default = j;
  cc._RF.pop();
}