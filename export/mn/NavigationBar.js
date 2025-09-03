if (!cc._RF.push(module, "0dc7dijGWtKO4QKzl8UL9Pz", "NavigationBar")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u._navigator = undefined;
      u.animatedLayer = undefined;
      u.defaultLeftItem = undefined;
      u.rightItemContainer = undefined;
      u.leftItemContainer = undefined;
      u.middleItemContainer = undefined;
      u.titleLabel = undefined;
      u.background = undefined;
      u.shadow = undefined;
      u._items = [];
      u._pushAnimated = false;
      u._titleLabelColor = undefined;
      return u;
    }
    __extends(C, k);
    Object.defineProperty(C.prototype, "navigator", {
      get: function () {
        return this._navigator;
      },
      set: function (u) {
        this._navigator = u;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(C.prototype, "topItem", {
      get: function () {
        if (this._items && this._items.length > 0) {
          return this._items[this._items.length - 1];
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(C.prototype, "backItem", {
      get: function () {
        if (this._items && this._items.length > 1) {
          return this._items[this._items.length - 2];
        }
      },
      enumerable: false,
      configurable: true
    });
    // 初始化導航列尺寸與陰影位置
    C.prototype.onLoad = function () {
      var u = this.node.width;
      var c = this.node.height;
      this.background.node.setContentSize(u, c);
      this.shadow.y = -c;
    };
    // 根據裝置資訊計算並設定導航列高度
    C.prototype.getBarHeight = function (u, c) {
      var p = this.node.width;
      var j = u.height;
      var l = c.top;
      var G = j + l;
      this.animatedLayer.setContentSize(p, j);
      this.animatedLayer.y = -l;
      this.node.height = G;
      this.shadow.y = -j;
      this._setItemsConfig(u.item_space_x);
      return G;
    };
    // 推入新的導航項目並處理動畫
    C.prototype.pushItem = function (j, G) {
      if (j) {
        var V = this._items[this._items.length - 1];
        var Q = this.leftItemContainer.children[0];
        var N = this.middleItemContainer.children[1];
        var Y = this.rightItemContainer.children[0];
        var W = V ? V.title : "";
        var q = V && !V.leftItem;
        var S = j.title;
        var z = undefined;
        var f = undefined;
        var A = j.rightItem instanceof cc.Node ? j.rightItem : undefined;
        var M = true;
        this._items.push(j);
        this._pushAnimated = G;
        if (j.middleItem instanceof cc.Node) {
          f = j.middleItem;
          j.title = "";
        }
        if (j.leftItem instanceof cc.Node) {
          z = j.leftItem;
          M = false;
        } else if (this._items.length > 1) {
          z = cc.instantiate(this.defaultLeftItem);
          this._createDefaultLeftItemEvents(z);
          var E = z.children ? z.getComponentInChildren(cc.Label) : undefined;
          if (E instanceof cc.Label && W) {
            E.string = W;
          }
        }
        var F = {
          leftItem: Q,
          middleItem: N,
          rightItem: Y,
          title: W,
          useDefaultLeftItem: q
        };
        var b = {
          leftItem: z,
          middleItem: f,
          rightItem: A,
          title: S,
          useDefaultLeftItem: M
        };
        if (G) {
          this._playPushAnimation(F, b);
        } else {
          this._removeFromParent(Q);
          this._addChild(this.leftItemContainer, z);
          this._removeFromParent(N);
          this._addChild(this.middleItemContainer, f);
          this._removeFromParent(Y);
          this._addChild(this.rightItemContainer, A);
          this.titleLabel.string = S;
          this._titleLabelColor = this.titleLabel.node.color;
          if (shell.environment.getOrientationMode() === "land") {
            this.titleLabel.fontSize = 42;
            this.titleLabel.lineHeight = 50;
          }
        }
      }
    };
    // 彈出頂端導航項目並更新顯示
    C.prototype.popItem = function (j) {
      var G = this.topItem;
      if (G) {
        var V = this.backItem;
        this._items.pop();
        if (!V) {
          this.titleLabel.string = "";
          this.rightItemContainer.removeAllChildren(false);
          this.leftItemContainer.removeAllChildren(false);
          if (this.middleItemContainer.children[1]) {
            this.middleItemContainer.children[1].removeFromParent(false);
          }
          this._titleLabelColor = this.titleLabel.node.color;
          return;
        }
        var Q = this._items[this._items.length - 2];
        var N = "";
        if (Q && !Q.middleItem) {
          N = Q.title;
        }
        var Y = this.leftItemContainer.children[0];
        var W = this.middleItemContainer.children[1];
        var q = this.rightItemContainer.children[0];
        var S = W ? "" : G.title;
        var z = !G.leftItem;
        var A = V.title;
        var M = undefined;
        var E = undefined;
        var F = V.rightItem instanceof cc.Node ? V.rightItem : undefined;
        var b = true;
        if (V.middleItem instanceof cc.Node) {
          E = V.middleItem;
          V.title = "";
        }
        if (V.leftItem instanceof cc.Node) {
          M = V.leftItem;
          b = false;
        } else if (this._items.length > 1) {
          M = cc.instantiate(this.defaultLeftItem);
          this._createDefaultLeftItemEvents(M);
          var H = M.children ? M.getComponentInChildren(cc.Label) : null;
          if (H) {
            H.string = N;
          }
        }
        var w = {
          leftItem: Y,
          middleItem: W,
          rightItem: q,
          title: S,
          useDefaultLeftItem: z
        };
        var U = {
          leftItem: M,
          middleItem: E,
          rightItem: F,
          title: A,
          useDefaultLeftItem: b
        };
        if (j) {
          this._playPopAnimation(w, U);
        } else {
          this._removeFromParent(Y);
          this._addChild(this.leftItemContainer, M);
          this._removeFromParent(W);
          this._addChild(this.middleItemContainer, E);
          this._removeFromParent(q);
          this._addChild(this.rightItemContainer, F);
          this.titleLabel.string = A;
          this._titleLabelColor = this.titleLabel.node.color;
        }
      }
    };
    // 允許左右按鈕可被點擊
    C.prototype.enableButtons = function () {
      var u = this.leftItemContainer.children[0];
      var c = this.rightItemContainer.children[0];
      if (u) {
        var p = u.getComponent(cc.Button);
        if (p) {
          p.interactable = true;
        }
      }
      if (c) {
        var j = c.getComponent(cc.Button);
        if (j) {
          j.interactable = true;
        }
      }
    };
    // 禁用左右按鈕
    C.prototype.disableButtons = function () {
      var u = this.leftItemContainer.children[0];
      var c = this.rightItemContainer.children[0];
      if (u) {
        var p = u.getComponent(cc.Button);
        if (p) {
          p.interactable = false;
        }
      }
      if (c) {
        var j = c.getComponent(cc.Button);
        if (j) {
          j.interactable = false;
        }
      }
    };
    // 設定標題文字顏色
    C.prototype.setTitleColor = function (u) {
      this.titleLabel.node.color = u;
    };
    // 設定標題文字大小
    C.prototype.setTitleSize = function (u) {
      this.titleLabel.fontSize = u;
    };
    // 移除指定索引之導航項目
    C.prototype.removeItemsAtIndex = function (u) {
      if (!(this._items.length <= u)) {
        this._items.splice(u, 1);
      }
    };
    C.prototype._assignLabel = function (u) {
      u.node.setContentSize(this.titleLabel.node.width, this.titleLabel.node.height);
      u.string = this.titleLabel.string;
      u.fontSize = this.titleLabel.fontSize;
      u.lineHeight = this.titleLabel.lineHeight;
      u.verticalAlign = 1;
      if (this.titleLabel.font) {
        u.font = this.titleLabel.font;
      }
    };
    C.prototype._createDefaultLeftItemEvents = function (u) {
      var c = new cc.Component.EventHandler();
      c.target = this.node;
      c.component = "NavigationBar";
      c.handler = "onLeftItemPressed";
      u.getComponent(cc.Button).clickEvents.push(c);
    };
    C.prototype._setItemsConfig = function (u) {
      var c = this.node.width;
      var p = this.leftItemContainer;
      var j = -c / 2 + u + p.width / 2;
      var l = this.rightItemContainer;
      var G = c / 2 - u - l.width / 2;
      p.x = j;
      l.x = G;
    };
    // 左側返回按鈕的點擊回呼
    C.prototype.onLeftItemPressed = function () {
      var u = this.navigator;
      this.navigator.topController;
      if (u && u.topController) {
        var c = this._pushAnimated;
        this.navigator.popController(c);
      }
    };
    // 執行推入動畫效果
    C.prototype._playPushAnimation = function (j, G) {
      var V = j.leftItem;
      var Q = j.middleItem;
      var N = j.rightItem;
      var Y = j.title;
      var W = j.useDefaultLeftItem;
      var q = G.leftItem;
      var S = G.middleItem;
      var z = G.rightItem;
      var f = G.title;
      var A = G.useDefaultLeftItem;
      var M = !Q && !S;
      this._playPushMiddleItemAnimation(M, Y, f, Q, S);
      this._playPushLeftItemAnimation(A, W, M, V, q);
      this._playRightContainerFadeAnim(N, z);
    };
    // 執行彈出動畫效果
    C.prototype._playPopAnimation = function (j, G) {
      var V = j.leftItem;
      var Q = j.middleItem;
      var N = j.rightItem;
      var Y = j.title;
      var W = j.useDefaultLeftItem;
      var q = G.leftItem;
      var S = G.middleItem;
      var z = G.rightItem;
      var f = G.title;
      var A = G.useDefaultLeftItem;
      var M = !Q && !S;
      this._playPopMiddleItemAnimation(M, Y, f, Q, S);
      this._playPopLeftItemAnimation(A, W, M, V, q);
      this._playRightContainerFadeAnim(N, z);
    };
    C.prototype._playPushMiddleItemAnimation = function (j, G, V, Q, N, Y) {
      if (j) {
        var W = this.middleItemContainer;
        var q = this.leftItemContainer;
        var S = W.x - W.width * W.anchorX - q.x - q.width * (1 - q.anchorX);
        if (G) {
          var z = this.titleLabel.node;
          var A = z.parent.convertToWorldSpaceAR(cc.v2(z.x, z.y));
          var M = this.animatedLayer.convertToNodeSpaceAR(A);
          var E = new cc.Node();
          var F = E.addComponent(cc.Label);
          E.parent = this.animatedLayer;
          E.position = M;
          F.node.color = this._titleLabelColor;
          this._assignLabel(F);
          var b = cc.spawn(cc.moveBy(0.2, cc.v2(-S / 2, 0)).easing(cc.easeIn(3)), cc.fadeOut(0.2).easing(cc.easeIn(3)));
          E.runAction(cc.sequence(b, cc.callFunc(function () {
            E.active = false;
            E.removeFromParent();
          })));
        }
        W.x += S;
        W.opacity = 0;
        this.titleLabel.string = V;
        var H = cc.spawn(cc.moveBy(0.3, cc.v2(-S, 0)).easing(cc.easeOut(3)), cc.fadeIn(0.3).easing(cc.easeIn(3)));
        W.runAction(cc.sequence(cc.delayTime(0.1), H, cc.callFunc(function () {
          W.active = true;
          W.opacity = 255;
          if (Y) {
            Y();
          }
        })));
      } else {
        this._playMiddleContainerFadeAnim(Q, N, V, Y);
      }
    };
    C.prototype._playPushLeftItemAnimation = function (j, G, V, Q, N, Y) {
      var W = this;
      if (j && G && V) {
        var q = undefined;
        var z = undefined;
        var M = undefined;
        var E = undefined;
        if (Q && Q.children) {
          q = Q.getComponentInChildren(cc.Label);
          z = Q.getComponentInChildren(cc.Sprite);
        }
        if (N && N.children) {
          M = N.getComponentInChildren(cc.Label);
          E = N.getComponentInChildren(cc.Sprite);
        }
        if (M) {
          if (q) {
            var F = q.node;
            var H = F.x;
            var w = F.width;
            var U = F.anchorX;
            var B = H - w * U - H - w * (1 - U);
            var P = cc.spawn(cc.moveBy(0.2, cc.v2(-B * 2, 0)).easing(cc.easeOut(3)), cc.fadeOut(0.2).easing(cc.easeIn(3)));
            F.runAction(cc.sequence(P, cc.callFunc(function () {
              F.active = false;
            })));
          }
          var X = this.middleItemContainer;
          var J = this.leftItemContainer;
          var Z0 = X.x - X.width * X.anchorX - J.x - J.width * (1 - J.anchorX);
          var Z1 = E.node;
          var Z2 = M.node;
          if (N) {
            J.addChild(N);
          }
          Z1.active = false;
          Z2.opacity = 0;
          Z2.x += Z0 / 2;
          var Z3 = cc.spawn(cc.moveBy(0.2, cc.v2(-Z0 / 2, 0)).easing(cc.easeOut(3)), cc.fadeIn(0.2).easing(cc.easeIn(3)));
          Z2.runAction(cc.sequence(cc.delayTime(0.2), Z3, cc.callFunc(function () {
            Z2.opacity = 255;
            Z1.active = true;
            if (Q) {
              Q.removeFromParent(false);
            }
            if (Y) {
              Y();
            }
          })));
        } else {
          this._playLeftContainerFadeAnim(Q, N, Y);
        }
      } else if (j && G && Q) {
        q = undefined;
        z = undefined;
        if (Q && Q.children) {
          q = Q.getComponentInChildren(cc.Label);
          z = Q.getComponentInChildren(cc.Sprite);
        }
        if (!q || !z) {
          this._playLeftContainerFadeAnim(Q, N, Y);
          return;
        }
        var Z4 = z.node;
        var Z5 = q.node;
        B = Z5.x - Z5.width * Z5.anchorX - Z4.x - Z4.width * (1 - Z4.anchorX);
        P = cc.spawn(cc.moveBy(0.2, cc.v2(-B, 0)).easing(cc.easeOut(3)), cc.fadeOut(0.2).easing(cc.easeIn(3)));
        Z5.runAction(cc.sequence(P, cc.callFunc(function () {
          if (Q) {
            Q.removeFromParent(false);
          }
          if (N) {
            W.leftItemContainer.addChild(N);
          }
          if (Y) {
            Y();
          }
        })));
      } else {
        this._playLeftContainerFadeAnim(Q, N, Y);
      }
    };
    C.prototype._playPopLeftItemAnimation = function (j, G, V, Q, N, Y) {
      if (j && G && V) {
        var W = undefined;
        var q = undefined;
        var z = undefined;
        var A = undefined;
        if (Q && Q.children) {
          W = Q.getComponentInChildren(cc.Label);
          q = Q.getComponentInChildren(cc.Sprite);
        }
        if (N && N.children) {
          z = N.getComponentInChildren(cc.Label);
          A = N.getComponentInChildren(cc.Sprite);
        }
        if (!z || !W) {
          this._playLeftContainerFadeAnim(Q, N, Y);
          return;
        }
        var M = this.middleItemContainer;
        var E = this.leftItemContainer;
        var F = M.x - M.width * M.anchorX - E.x - E.width * (1 - E.anchorX);
        var H = W.node;
        var w = q.node;
        var U = H.x - H.width * H.anchorX - w.x - w.width * (1 - w.anchorX);
        var B = cc.spawn(cc.moveBy(0.2, cc.v2(F / 2, 0)).easing(cc.easeOut(3)), cc.fadeOut(0.2).easing(cc.easeIn(3)));
        if (N) {
          H.runAction(cc.sequence(B, cc.callFunc(function () {
            H.active = false;
          })));
          var P = z.node;
          var X = A.node;
          X.active = false;
          P.opacity = 0;
          E.addChild(N);
          P.x -= U * 2;
          var J = cc.spawn(cc.moveBy(0.2, cc.v2(U * 2, 0)).easing(cc.easeOut(3)), cc.fadeIn(0.2).easing(cc.easeIn(3)));
          P.runAction(cc.sequence(cc.delayTime(0.2), J, cc.callFunc(function () {
            P.opacity = 255;
            X.active = true;
            if (Q) {
              Q.removeFromParent(false);
            }
            if (Y) {
              Y();
            }
          })));
        } else {
          H.runAction(cc.sequence(B, cc.callFunc(function () {
            if (Q) {
              Q.removeFromParent(false);
            }
            if (Y) {
              Y();
            }
          })));
        }
      } else if (j && G) {
        z = undefined;
        A = undefined;
        if (N && N.children) {
          z = N.getComponentInChildren(cc.Label);
          A = N.getComponentInChildren(cc.Sprite);
        }
        if (!z || !A) {
          this._playLeftContainerFadeAnim(Q, N, Y);
          return;
        }
        var Z0 = z.node;
        var Z1 = A.node;
        U = Z0.x - Z0.width * Z0.anchorX - Z1.x - Z1.width * (1 - Z1.anchorX);
        if (Q) {
          Q.removeFromParent(false);
        }
        if (N) {
          this.leftItemContainer.addChild(N);
        }
        Z0.opacity = 0;
        Z0.x -= U * 2;
        J = cc.spawn(cc.moveBy(0.2, cc.v2(U * 2, 0)).easing(cc.easeOut(3)), cc.fadeIn(0.2).easing(cc.easeIn(3)));
        Z0.runAction(cc.sequence(cc.delayTime(0.2), J, cc.callFunc(function () {
          Z0.opacity = 255;
          if (Y) {
            Y();
          }
        })));
      } else {
        this._playLeftContainerFadeAnim(Q, N, Y);
      }
    };
    C.prototype._playPopMiddleItemAnimation = function (j, G, V, Q, N, Y) {
      if (j) {
        var W = this.leftItemContainer;
        var q = this.middleItemContainer;
        var S = q.x - q.width * q.anchorX - W.x - W.width * (1 - W.anchorX);
        if (G) {
          var z = this.titleLabel.node.parent.convertToWorldSpaceAR(cc.v2(this.titleLabel.node.x, this.titleLabel.node.y));
          var A = this.animatedLayer.convertToNodeSpaceAR(z);
          var M = new cc.Node();
          M.addComponent(cc.Label);
          var E = M.getComponent(cc.Label);
          M.parent = this.animatedLayer;
          E.node.color = this._titleLabelColor;
          M.position = A;
          this._assignLabel(E);
          var F = cc.spawn(cc.moveBy(0.2, cc.v2(S / 2, 0)).easing(cc.easeOut(3)), cc.fadeOut(0.2).easing(cc.easeOut(3)));
          M.runAction(cc.sequence(F, cc.callFunc(function () {
            M.active = false;
            M.removeFromParent();
          })));
        }
        this.titleLabel.string = V;
        q.x -= S / 2;
        q.opacity = 0;
        var b = cc.spawn(cc.moveBy(0.3, cc.v2(S / 2, 0)).easing(cc.easeOut(3)), cc.fadeIn(0.3).easing(cc.easeIn(3)));
        this.middleItemContainer.runAction(cc.sequence(cc.delayTime(0.1), b, cc.callFunc(function () {
          q.active = true;
          q.opacity = 255;
          if (Y) {
            Y();
          }
        })));
      } else {
        this._playMiddleContainerFadeAnim(Q, N, V, Y);
      }
    };
    C.prototype._playLeftContainerFadeAnim = function (u, c, p) {
      var j = this.leftItemContainer;
      if (u) {
        u.removeFromParent(false);
      }
      if (c) {
        this.leftItemContainer.addChild(c);
      }
      j.opacity = 0;
      j.runAction(cc.sequence(cc.fadeIn(0.3).easing(cc.easeOut(3)), cc.callFunc(function () {
        if (p) {
          p();
        }
      })));
    };
    C.prototype._playMiddleContainerFadeAnim = function (u, c, p, j) {
      var l = this.middleItemContainer;
      if (u) {
        u.removeFromParent(false);
      }
      if (c) {
        l.addChild(c);
      }
      this.titleLabel.string = p;
      l.opacity = 0;
      l.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
        if (j) {
          j();
        }
      })));
    };
    C.prototype._playRightContainerFadeAnim = function (u, c, p) {
      var j = this;
      if (u) {
        u.removeFromParent(false);
      }
      if (c) {
        this.rightItemContainer.addChild(c);
      }
      this.rightItemContainer.opacity = 0;
      this.rightItemContainer.runAction(cc.sequence(cc.fadeIn(0.3).easing(cc.easeOut(3)), cc.callFunc(function () {
        j._titleLabelColor = j.titleLabel.node.color;
        if (p) {
          p();
        }
      })));
    };
    C.prototype._removeFromParent = function (u) {
      if (u && u.parent) {
        u.removeFromParent(false);
      }
    };
    C.prototype._addChild = function (u, c) {
      if (u && c) {
        u.addChild(c);
      }
    };
    __decorate([L(cc.Node)], C.prototype, "animatedLayer", undefined);
    __decorate([L(cc.Prefab)], C.prototype, "defaultLeftItem", undefined);
    __decorate([L(cc.Node)], C.prototype, "rightItemContainer", undefined);
    __decorate([L(cc.Node)], C.prototype, "leftItemContainer", undefined);
    __decorate([L(cc.Node)], C.prototype, "middleItemContainer", undefined);
    __decorate([L(cc.Label)], C.prototype, "titleLabel", undefined);
    __decorate([L(cc.Sprite)], C.prototype, "background", undefined);
    __decorate([L(cc.Node)], C.prototype, "shadow", undefined);
    return __decorate([x], C);
  }(cc.Component);
  exports.default = D;
  cc._RF.pop();
}