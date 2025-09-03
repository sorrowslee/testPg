if (!cc._RF.push(module, "d742diXy4tHCIVIgSy1jEIb", "NavigationController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("ViewController");
  var x = require("NavigationBar");
  var L = require("TransitionEnum");
  var D = require("NavigationDefaultTransition");
  var k = require("TransitionContext");
  var C = require("UIKit");
  var j = require("TabBarItem");
  var G = cc._decorator;
  var V = G.ccclass;
  var Q = G.property;
  var N = function (Y) {
    function W() {
      var q = Y !== null && Y.apply(this, arguments) || this;
      q.defaultNavigationBar = undefined;
      q.statusBarPlaceholderNode = undefined;
      q.contentNode = undefined;
      q._navigationBar = undefined;
      q._controllers = [];
      q._isOnTransistion = false;
      q._tabBarItem = undefined;
      return q;
    }
    __extends(W, Y);
    Object.defineProperty(W.prototype, "controllers", {
      get: function () {
        return this._controllers.slice();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "tabBarItem", {
      get: function () {
        return this._tabBarItem;
      },
      set: function (q) {
        this._tabBarItem = q;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "topController", {
      get: function () {
        var q = this.controllers;
        if (q && q.length > 0) {
          return q[q.length - 1];
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "backController", {
      get: function () {
        var q = this.controllers;
        if (q && q.length > 1) {
          return q[q.length - 2];
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(W.prototype, "navigationBar", {
      get: function () {
        if (!this._navigationBar) {
          this._navigationBar = this.defaultNavigationBar;
          if (this._navigationBar) {
            this._navigationBar.navigator = this;
          }
        }
        return this._navigationBar;
      },
      set: function (q) {
        if (q !== this._navigationBar) {
          var S = this._navigationBar;
          this._navigationBar = q;
          if (this._navigationBar) {
            this._navigationBar.navigator = this;
          }
          if (S) {
            S.navigator = undefined;
          }
        }
      },
      enumerable: false,
      configurable: true
    });
    W.prototype.onLoad = function () {
      var q = cc.Canvas.instance.designResolution;
      var S = q.height;
      var z = q.width;
      this.node.setContentSize(z, S);
      this.navigationBar.node.width = z;
      var f = shell.environment.getOrientationMode() === "land" ? C.NavigationConfigs.bar.landscape : C.NavigationConfigs.bar.portrait;
      var A = this.navigationBar.getBarHeight(f, this.safeAreaInsets);
      var M = S - A;
      this.contentNode.setContentSize(z, M);
      this.contentNode.y = -A;
      this.statusBarPlaceholderNode.height = this.safeAreaInsets.top;
      this.node.on("size-changed", this._resize, this);
    };
    W.prototype.onEnable = function () {
      var q = this.topController;
      if (q) {
        q.enabled = true;
      }
    };
    W.prototype.onDisable = function () {
      var q = this.topController;
      if (q) {
        q.enabled = false;
      }
    };
    W.prototype.viewWillAppear = function (q) {
      var S = this.topController;
      if (S) {
        S.viewWillAppear(q);
      }
    };
    W.prototype.viewDidAppear = function (q) {
      var S = this.topController;
      if (S) {
        S.viewDidAppear(q);
      }
    };
    W.prototype.viewWillDisappear = function (q) {
      var S = this.topController;
      if (S) {
        S.viewWillDisappear(q);
      }
    };
    W.prototype.viewDidDisappear = function (q) {
      var S = this.topController;
      if (S) {
        S.viewDidDisappear(q);
      }
    };
    W.prototype.viewDidLayoutSubviews = function () {};
    W.prototype.pushController = function (q, S) {
      if (!this._isOnTransistion && q) {
        this._isOnTransistion = true;
        var z = this.contentNode;
        var A = z.width;
        var M = z.height;
        q.navigator = this;
        q.view.setContentSize(A, M);
        var E = (q.node.anchorY - z.anchorY) * M;
        var F = (q.node.anchorX - z.anchorX) * A;
        if (S) {
          F = (q.node.anchorX - z.anchorX + 1) * A;
        }
        q.view.setPosition(cc.v2(F, E));
        z.addChild(q.view);
        q.enabled = true;
        if (this._checkIfNeedCallAppear()) {
          q.viewWillAppear(S);
        } else {
          S = false;
        }
        var b = this.topController;
        if (b) {
          b.viewWillDisappear(S);
        }
        this.navigationBar.pushItem(q, S);
        if (S) {
          var H = undefined;
          var w = this.navigationDelegate;
          H = w && w.animationForOperation ? w.animationForOperation(L.NavigationControllerOperation.Push) : new D.DefaultNavigationPushTransition();
          var U = b ? b.view : undefined;
          var B = new k.TransitionContext(b, q, U, q.view, z);
          var P = this._pushViewControllerAnimateEnd.bind(this, q, true);
          H.animateTransition(B, P);
        } else {
          this._pushViewControllerAnimateEnd(q, false);
        }
      }
    };
    W.prototype.popController = function (q) {
      var S = this.topController;
      var z = this.backController;
      if (!this._isOnTransistion && S && z) {
        this._isOnTransistion = true;
        z.enabled = true;
        z.viewWillAppear(q);
        S.viewWillDisappear(q);
        this.navigationBar.popItem(q);
        if (q) {
          var f = undefined;
          var A = this.navigationDelegate;
          f = A && A.animationForOperation ? A.animationForOperation(L.NavigationControllerOperation.Pop) : new D.DefaultNavigationPopTransition();
          var M = new k.TransitionContext(S, z, S.view, z.view, this.contentNode);
          var E = this._popViewControllerAnimateEnd.bind(this, true);
          f.animateTransition(M, E);
        } else {
          this._popViewControllerAnimateEnd(false);
        }
      }
    };
    W.prototype.popToController = function (q, S) {
      for (var z = this.controllers.length - S; z;) {
        var f = this.topController;
        if (f) {
          f.enabled = false;
          this.navigationBar.popItem(false);
          this.contentNode.removeChild(f.view);
          this._controllers.pop();
          f.node.destroy();
        }
        z -= 1;
      }
      this.popController(q);
    };
    W.prototype.popToRootController = function (q) {
      for (var S = this.controllers.length - 2; S;) {
        var z = this.topController;
        if (z) {
          z.enabled = false;
          this.navigationBar.popItem(false);
          this.contentNode.removeChild(z.view);
          this._controllers.pop();
          z.node.destroy();
        }
        S -= 1;
      }
      this.popController(q);
    };
    W.prototype.hideNavigationBarBackground = function () {
      this.navigationBar.background.node.active = false;
      this.navigationBar.shadow.active = false;
    };
    W.prototype.showNavigationBarBackground = function () {
      this.navigationBar.background.node.active = true;
      this.navigationBar.shadow.active = true;
    };
    W.prototype.hideNavigationBar = function (q = true) {
      this.navigationBar.node.active = false;
      if (q) {
        this._resize();
      }
    };
    W.prototype.showNavigationBar = function (q = true) {
      this.navigationBar.node.active = true;
      if (q) {
        this._resize();
      }
    };
    W.prototype.enableItems = function () {
      this.navigationBar.enableButtons();
    };
    W.prototype.disableItems = function () {
      this.navigationBar.disableButtons();
    };
    W.prototype.setControllers = function (q) {
      if (q && q.length && !(q.length < 1)) {
        var S = this.controllers;
        var z = S.filter(function (E) {
          return q.indexOf(E) < 0;
        });
        for (var f = z.length - 1; f >= 0; f--) {
          var A = z[f];
          A.enabled = false;
          this.contentNode.removeChild(A.view);
          var M = S.indexOf(A);
          this.navigationBar.removeItemsAtIndex(M);
          A.node.destroy();
        }
        this._controllers = q;
      }
    };
    W.prototype._resize = function () {
      this._resizeContentNode();
      this._resizeViewControllers();
    };
    W.prototype._resizeContentNode = function () {
      var q = this.contentNode;
      var S = this.navigationBar.node.active ? this.navigationBar.node.height : this.statusBarPlaceholderNode.height;
      var z = this.node.height - S;
      q.setContentSize(this.node.width, z);
      q.y = -S;
    };
    W.prototype._resizeViewControllers = function () {
      var q = this.contentNode;
      var S = q.width;
      var z = q.height;
      var f = q.anchorX;
      var A = q.anchorY;
      this.controllers.forEach(function (M) {
        var E = M.node;
        var F = (E.anchorX - f) * S;
        var b = (E.anchorY - A) * z;
        M.viewWillLayoutSubviews();
        E.setContentSize(S, z);
        E.setPosition(cc.v2(F, b));
        M.viewDidLayoutSubviews();
      });
    };
    W.prototype._pushViewControllerAnimateEnd = function (q, S = false) {
      if (this._checkIfNeedCallAppear()) {
        q.viewDidAppear(S);
      }
      var z = this.topController;
      this._controllers.push(q);
      q.view.setContentSize(this.contentNode.width, this.contentNode.height);
      this._isOnTransistion = false;
      if (z) {
        z.viewDidDisappear(S);
        z.enabled = false;
      }
    };
    W.prototype._popViewControllerAnimateEnd = function (q = false) {
      var S = this.backController;
      if (S) {
        S.viewDidAppear(q);
      }
      this.scheduleOnce(this._popAnimationClearStacks.bind(this, q));
    };
    W.prototype._popAnimationClearStacks = function (q) {
      var S = this.topController;
      if (S) {
        this.contentNode.removeChild(S.view);
        this._controllers.pop();
        this._isOnTransistion = false;
        S.viewDidDisappear(q);
        S.enabled = false;
        if (S.destroy) {
          S.destroy();
        }
        S.node.destroy();
      }
    };
    W.prototype._checkIfNeedCallAppear = function () {
      return !(this.tabBarItem instanceof j.default) || !!this.topController;
    };
    __decorate([Q(x.default)], W.prototype, "defaultNavigationBar", undefined);
    __decorate([Q(cc.Node)], W.prototype, "statusBarPlaceholderNode", undefined);
    __decorate([Q(cc.Node)], W.prototype, "contentNode", undefined);
    return __decorate([V], W);
  }(T.default);
  exports.default = N;
  cc._RF.pop();
}