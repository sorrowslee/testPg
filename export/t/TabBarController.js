if (!cc._RF.push(module, "b2f70mOAvdOxZtKjfDu/lHM", "TabBarController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("TabBar");
  var x = require("TabBarItem");
  var L = require("TransitionContext");
  var D = require("ViewController");
  var k = cc._decorator;
  var C = k.ccclass;
  var p = k.property;
  var j = function (G) {
    function V() {
      var Q = G !== null && G.apply(this, arguments) || this;
      Q.content = undefined;
      Q.tabBar = undefined;
      Q.bottomNode = undefined;
      Q.tabBarItemPrefab = undefined;
      Q._tabBarItems = [];
      Q._controllers = [];
      Q._selectedController = undefined;
      Q._selectedIndex = 0;
      Q._isOnTransistion = false;
      return Q;
    }
    __extends(V, G);
    // 初始化內容區與 TabBar 尺寸，並監聽大小變化
    V.prototype.onLoad = function () {
      this._resizeContent();
      this._resizeTabBar();
      this._resizeBottomPlaceHolder();
      this.node.on("size-changed", this._resize, this);
    };
    // 啟用目前選取的控制器
    V.prototype.onEnable = function () {
      var Q = this._selectedController;
      if (Q) {
        Q.enabled = true;
      }
    };
    // 停用目前選取的控制器
    V.prototype.onDisable = function () {
      var Q = this._selectedController;
      if (Q) {
        Q.enabled = false;
      }
    };
    // 控制器即將顯示時轉發事件
    V.prototype.viewWillAppear = function (Q) {
      var N = this._selectedController;
      if (N) {
        N.viewWillAppear(Q);
      }
    };
    // 控制器顯示完成時轉發事件
    V.prototype.viewDidAppear = function (Q) {
      var N = this._selectedController;
      if (N) {
        N.viewDidAppear(Q);
      }
    };
    // 控制器即將隱藏時轉發事件
    V.prototype.viewWillDisappear = function (Q) {
      var N = this._selectedController;
      if (N) {
        N.viewWillDisappear(Q);
      }
    };
    // 控制器隱藏完成時轉發事件
    V.prototype.viewDidDisappear = function (Q) {
      var N = this._selectedController;
      if (N) {
        N.viewDidDisappear(Q);
      }
    };
    // 佈局完成後的回呼，暫未實作
    V.prototype.viewDidLayoutSubviews = function () {};
    // 設定子控制器與對應的 Tab 項目
    V.prototype.setControllers = function (Q, N = 0, Y = false) {
      if (Array.isArray(Q)) {
        this._selectedIndex = N;
        this._controllers = Q;
        this._reduceDrawCalls();
        this._tabBarItems = [];
        var W = this._tabBarItems;
        for (var q = 0; q < Q.length; q++) {
          var S = Q[q];
          S.node.parent = this.content;
          this._resizeController(q);
          var z = S.tabBarItem;
          if (!z || !(z instanceof x.default)) {
            var f = S.title;
            (z = cc.instantiate(this.tabBarItemPrefab).getComponent(x.default)).init(f, undefined, undefined, q);
            S.tabBarItem = z;
          }
          z.selectAction = this._selectTabAtIndex.bind(this, q, Y);
          W.push(z);
          S.enabled = q === N;
        }
        this.tabBar.setItems(W, N);
        var A = Q[N];
        this._selectedController = A;
        A.viewWillAppear(false);
        A.viewDidAppear(false);
        if (A.tabBarItem && A.tabBarItem.animFinish) {
          A.tabBarItem.animFinish();
        }
        this._moveContentToIndex(N);
      }
    };
    // 取得目前選取的控制器
    V.prototype.getSelectedController = function () {
      return this._selectedController;
    };
    // 取得目前選取的 Tab 項目
    V.prototype.getSelectedTabBarItem = function () {
      return this.tabBar.getSelectedItem();
    };
    // 隱藏 TabBar 並重新計算版面
    V.prototype.hideTabBar = function () {
      if (this.tabBar.node.active || this.bottomNode.active) {
        this.tabBar.node.active = false;
        this.bottomNode.active = false;
        this._resize();
      }
    };
    // 顯示 TabBar 並重新計算版面
    V.prototype.showTabBar = function () {
      if (!this.tabBar.node.active || !this.bottomNode.active) {
        this.tabBar.node.active = true;
        this.bottomNode.active = true;
        this._resize();
      }
    };
    // 調整指定控制器的尺寸與位置
    V.prototype._resizeController = function (Q) {
      var N = this._controllers[Q];
      var Y = this.content;
      if (N && N.node.getContentSize() !== Y.getContentSize()) {
        var W = N.node;
        var q = Y.width;
        var S = Y.height;
        var z = Y.anchorX;
        var f = Y.anchorY;
        var A = (W.anchorX - z + Q) * q;
        var M = (W.anchorY - f) * S;
        W.setContentSize(q, S);
        W.setPosition(A, M);
      }
    };
    // 取得底部安全區域高度
    V.prototype._getBottomSafeArea = function () {
      if (this.tabBar.node.active === true) {
        return this.safeAreaInsets.bottom;
      } else {
        return 0;
      }
    };
    // 依據安全區域調整內容區大小
    V.prototype._resizeContent = function () {
      var Q = this._getBottomSafeArea();
      var N = this.node;
      var Y = N.width;
      var W = N.height;
      this.content.setContentSize(Y, W - Q);
    };
    // 調整 TabBar 的垂直位置
    V.prototype._resizeTabBar = function () {
      var Q = this._getBottomSafeArea();
      var N = this.node.height;
      this.tabBar.node.y = Q + this.tabBar.node.height - N;
    };
    // 更新底部占位節點的大小與位置
    V.prototype._resizeBottomPlaceHolder = function () {
      if (this.tabBar.node.active) {
        var Q = this._getBottomSafeArea();
        var N = this.node;
        var Y = N.width;
        var W = N.height;
        var q = this.bottomNode;
        q.setContentSize(Y, Q);
        q.y = Q - W;
      }
    };
    // 重新計算所有相關尺寸
    V.prototype._resize = function () {
      var Q = this._selectedIndex;
      this._resizeContent();
      this._resizeTabBar();
      this._resizeBottomPlaceHolder();
      this._resizeController(Q);
    };
    // 將內容區移動到指定索引
    V.prototype._moveContentToIndex = function (Q) {
      this.content.x = -Q * this.content.width;
    };
    // 選取指定索引的 Tab 並處理轉場動畫
    V.prototype._selectTabAtIndex = function (Q, N) {
      if (!this._isOnTransistion && Q !== this._selectedIndex) {
        var Y = this._controllers;
        if (!(Q >= Y.length)) {
          var W = this._selectedController;
          var q = Y[Q];
          if (W !== undefined && q !== undefined) {
            this._handleSwitchNavigationDrawCalls(Q);
            this._isOnTransistion = true;
            this.tabBar.selectItemAtIndex(Q);
            this._selectedIndex = Q;
            this._selectedController = q;
            if (q.setSelect) {
              q.setSelect();
            }
            q.enabled = true;
            if (W.viewWillDisappear) {
              W.viewWillDisappear(N);
            }
            if (q.viewWillAppear) {
              q.viewWillAppear(N);
            }
            if (N) {
              if (this.tabBarControllerDelegate && (this.tabBarControllerDelegate.transitionAnimationForTabBarToRight || this.tabBarControllerDelegate.transitionAnimationForTabBarToLeft)) {
                var S;
                if (S = Q > this._selectedIndex ? this.tabBarControllerDelegate.transitionAnimationForTabBarToRight() : this.tabBarControllerDelegate.transitionAnimationForTabBarToLeft()) {
                  this._playCustomSelectTabAnim(S, W, q, Q);
                } else {
                  this._moveContentToIndex(Q);
                  this._playDefaultSelectTabAnim(W, q, Q);
                }
              } else {
                this._moveContentToIndex(Q);
                this._playDefaultSelectTabAnim(W, q, Q);
              }
            } else {
              this._moveContentToIndex(Q);
              this._selectTabBarFinish(W, q, Q, false);
            }
          }
        }
      }
    };
    // 執行自訂的 Tab 切換動畫
    V.prototype._playCustomSelectTabAnim = function (Q, N, Y, W) {
      var q = this;
      var S = new L.TransitionContext(N, Y, N.view, Y.view, this.content);
      Q.animateTransition(S, function () {
        q._selectTabBarFinish(N, Y, W, true);
      });
    };
    // 使用預設淡入效果切換 Tab
    V.prototype._playDefaultSelectTabAnim = function (Q, N, Y) {
      var W = this;
      var q = N.navigator ? N.navigator : N;
      q.node.opacity = 0;
      var S = cc.sequence(cc.fadeTo(1, 255).easing(cc.easeSineIn()), cc.callFunc(function () {
        q.node.opacity = 255;
        W._selectTabBarFinish(Q, N, Y, true);
      }));
      q.node.runAction(S);
    };
    // 切換 Tab 完成後的狀態處理
    V.prototype._selectTabBarFinish = function (Q, N, Y, W) {
      if (N.tabBarItem && N.tabBarItem.animFinish) {
        N.tabBarItem.animFinish();
      }
      if (N) {
        N.viewDidAppear(W);
      }
      if (Q) {
        Q.viewDidDisappear(W);
      }
      if (Q) {
        Q.enabled = false;
      }
      this._isOnTransistion = false;
      this._reduceDrawCalls();
    };
    // 在切換範圍內暫時顯示控制器避免繪圖問題
    V.prototype._handleSwitchNavigationDrawCalls = function (Q) {
      var N;
      var Y;
      var W = this._selectedIndex;
      var q = this._controllers;
      if (W > Q) {
        N = Q;
        Y = W;
      } else {
        N = W;
        Y = Q;
      }
      for (var S = N; S <= Y; S++) {
        q[S].node.opacity = 255;
      }
    };
    // 將非選取控制器透明以減少繪圖量
    V.prototype._reduceDrawCalls = function () {
      var Q = this._selectedIndex;
      for (var N = this._controllers, Y = 0; Y < N.length; Y++) {
        if (Y !== Q) {
          N[Y].node.opacity = 0;
        }
      }
    };
    __decorate([p(cc.Node)], V.prototype, "content", undefined);
    __decorate([p(T.default)], V.prototype, "tabBar", undefined);
    __decorate([p(cc.Node)], V.prototype, "bottomNode", undefined);
    __decorate([p(cc.Prefab)], V.prototype, "tabBarItemPrefab", undefined);
    return __decorate([C], V);
  }(D.default);
  exports.default = j;
  cc._RF.pop();
}