if (!cc._RF.push(module, "3d710qNmRNP1LLRNNBcLNnF", "ListView")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("ListViewEnum");
  var x = cc._decorator;
  var L = x.ccclass;
  var D = x.property;
  var k = function (p) {
    function j() {
      var N = p !== null && p.apply(this, arguments) || this;
      N.view = undefined;
      N.contentWidget = undefined;
      N._nodePools = {};
      N._templates = {};
      N._visibleItems = [];
      N._firstPosition = 0;
      N._selectScrollPosition = 0;
      N._cellCount = 0;
      N._estimateCellHeight = 0;
      N._shouldIgnoreContentEvent = false;
      N._isReloadPending = false;
      N._disableScroll = false;
      N._dataSource = undefined;
      return N;
    }
    var G = {
      get: function () {
        return this._nodePools;
      },
      enumerable: false,
      configurable: true
    };
    var V = {
      get: function () {
        return this._templates;
      },
      enumerable: false,
      configurable: true
    };
    var Q = {
      get: function () {
        return this._visibleItems;
      },
      enumerable: false,
      configurable: true
    };
    __extends(j, p);
    Object.defineProperty(j.prototype, "nodePools", G);
    Object.defineProperty(j.prototype, "templates", V);
    Object.defineProperty(j.prototype, "visibleCells", Q);
    j.prototype.onLoad = function () {
      this.content.originY = this.content.y;
    };
    j.prototype.start = function () {
      p.prototype.start.call(this);
      cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._disableTopWidget, this);
    };
    j.prototype.onDisable = function () {
      p.prototype.onDisable.call(this);
      this.content.off("position-changed", this._onContentMoved, this);
      this.node.off("scroll-to-top", this._scrollToTop, this);
      this.node.off("scroll-to-bottom", this._scrollToBottom, this);
      this.node.off("scroll-ended", this._scrollEnded, this);
      this.node.off("scrolling", this._whenScrolling, this);
      this.node.off("size-changed", this._onSizeChanged, this);
    };
    j.prototype.onEnable = function () {
      p.prototype.onEnable.call(this);
      this.content.on("position-changed", this._onContentMoved, this);
      this.node.on("scroll-to-top", this._scrollToTop, this);
      this.node.on("scroll-to-bottom", this._scrollToBottom, this);
      this.node.on("scroll-ended", this._scrollEnded, this);
      this.node.on("scrolling", this._whenScrolling, this);
      this.node.on("size-changed", this._onSizeChanged, this);
      if (this._isReloadPending) {
        this.reloadData();
        this._isReloadPending = false;
      }
    };
    j.prototype.viewWillLayoutSubviews = function () {};
    j.prototype.viewDidLayoutSubviews = function () {
      var N = this.node.width;
      var Y = this.node.height;
      this.view.setContentSize(N, Y);
      this.content.width = N;
      while (this._shouldPushBottom()) {
        this._pushAtBottom();
      }
      while (this._shouldPopTop()) {
        this._popFromTop();
      }
      while (this._shouldPushTop()) {
        this._pushAtTop();
      }
      while (this._shouldPopBottom()) {
        this._popFromBottom();
      }
    };
    j.prototype.setDataSource = function (N) {
      this._dataSource = N;
    };
    j.prototype.register = function (N, Y, W) {
      if (this.nodePools[N]) ;else if (Y) {
        var q;
        q = W ? new cc.NodePool(W) : new cc.NodePool();
        this.templates[N] = Y;
        this.nodePools[N] = q;
      }
    };
    j.prototype.dequeueReusableItem = function (N) {
      var Y;
      var W = this.nodePools[N];
      if (W) {
        if (!(Y = W.get())) {
          var q = this.templates[N];
          Y = cc.instantiate(q);
        }
        Y.lv_type = N;
      }
      return Y;
    };
    j.prototype.reloadData = function () {
      var N = this;
      if (this._dataSource) {
        if (this._isOnLoadCalled) {
          this.stopAutoScroll();
          var Y = this._visibleItems;
          var W = this._cellCount = this._dataSource.getCount(this);
          var q = 0;
          var z = 0;
          var A = 0;
          if (Y && Y.length && Y.length > 0) {
            q = (Z0 = Y[0]).listViewIndex;
            z = C(Z0);
            A = Y[Y.length - 1].listViewIndex;
          }
          this._shouldIgnoreContentEvent = true;
          if (Y && Y.length && (W === 0 || A >= W)) {
            for (var M = Y.length - 1; A >= W && (H = Y[M]);) {
              if (H) {
                this._enqueueReusableItem(H);
              }
              A--;
              M--;
            }
          }
          var E = this._visibleItems = [];
          if (q < W) {
            for (var F = 0, b = (M = q, z); M < W && this._shouldPushBottom();) {
              var H;
              if (H = this._itemAtIndexInArr(M, Y)) {
                this._enqueueReusableItem(H);
              }
              if (X = this._dataSource.getItem(this, M)) {
                X.lv_type;
                X.x = 0;
                X.y = b - X.height * X.anchorY;
                X.listViewIndex = M;
                F += X.height;
                this.content.addChild(X);
                E.push(X);
                b = u(X);
                M++;
              }
            }
            var w = this.content.originY - b - this.view.height;
            this.content.height = Math.abs(b);
            if (F < this.view.height && q > 0) {
              M = q - 1;
              for (var U = this.view.height - F, B = 0, P = z; M >= 0 && B < U;) {
                if (X = this._dataSource.getItem(this, M)) {
                  X.lv_type;
                  X.x = 0;
                  X.y = P + X.height * (1 - X.anchorY);
                  X.listViewIndex = M;
                  B += X.height;
                  this.content.addChild(X);
                  E.unshift(X);
                  P = C(X);
                  M--;
                }
              }
              this.content.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, w)), cc.callFunc(function () {
                N.content.y = w;
                N.content.oldY = w;
                N._shouldIgnoreContentEvent = false;
                N._finishReload();
              })));
            } else {
              this._shouldIgnoreContentEvent = false;
              this._finishReload();
            }
          } else {
            F = 0;
            M = W - 1;
            P = -W * this._estimateCellHeight;
            while (M >= 0 && F < this.view.height) {
              var X;
              if (X = this._dataSource.getItem(this, M)) {
                X.lv_type;
                X.x = 0;
                X.y = P + X.height * (1 - X.anchorY);
                X.listViewIndex = M;
                F += X.height;
                this.content.addChild(X);
                E.unshift(X);
                P = C(X);
                M--;
              }
            }
            U = 0;
            if (F > this.view.height) {
              U = F - this.view.height;
            } else if (F < this.view.height) {
              this._requestLayout(true);
            }
            var J = this.content.originY + U;
            this.content.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, J)), cc.callFunc(function () {
              N.content.y = J;
              N.content.oldY = J;
              N._shouldIgnoreContentEvent = false;
              N._finishReload();
            })));
          }
          if (E.length && E.length > 0) {
            var Z0 = E[0];
            var Z1 = E[E.length - 1];
            this._estimateCellHeight = (C(Z0) - u(Z1)) / (Z1.listViewIndex - Z0.listViewIndex + 1);
            this.content.height = this._estimateCellHeight * W;
          }
        } else {
          this._isReloadPending = true;
        }
      }
    };
    j.prototype.scrollToRow = function (N, Y, W) {
      var q = this;
      if (Y === undefined) {
        Y = T.scrollPosition.scrollPositionTop;
      }
      if (W === undefined) {
        W = true;
      }
      this.stopAutoScroll();
      var S = this.content.y;
      if (!(N < 0) && !(N >= this._cellCount)) {
        var z = this._visibleItems;
        if (z && z.length && !(z.length <= 0)) {
          this.content.off("position-changed", this._onContentMoved, this);
          var f = this._selectScrollPosition = N;
          z = this._preloadCells(f, z);
          this._visibleItems = z;
          if (z[0].listViewIndex === 0) {
            this._requestLayout(true);
          }
          var A;
          var M;
          var E = this.itemAtIndex(N);
          var F = z.indexOf(E);
          var b = 0;
          M = Y === T.scrollPosition.scrollPositionTop ? 0 : Y === T.scrollPosition.scrollPositionMiddle ? this.view.height / 2 - E.height * E.anchorY : this.view.height;
          if (Y === T.scrollPosition.scrollPositionBottom) {
            b = (b = M - (H = this._calculateIfReachHeight(F, z, M, false))) >= 0 ? b : 0;
            A = this.content.originY + Math.abs(E.y) + E.height * E.anchorY - M + b;
          } else if (Y === T.scrollPosition.scrollPositionTop) {
            var H = this._calculateIfReachHeight(F, z, this.view.height - M, true);
            b = (b = this.view.height - M - H) >= 0 ? b : 0;
            A = this.content.originY + Math.abs(E.y) - E.height * E.anchorY - M - b;
          } else {
            H = this._calculateIfReachHeight(F, z, this.view.height - M, true);
            if ((b = this.view.height - M - H) <= 0) {
              b = M - (H = this._calculateIfReachHeight(F - 1, z, M, false));
            }
            b = b >= 0 ? b : 0;
            A = this.content.originY + Math.abs(E.y) - E.height * E.anchorY - M - b;
          }
          if (S === (A = A >= this.content.originY ? A : this.content.originY)) {
            this.content.y = A;
            this.content.oldY = A;
            this._popAllInvisibleItems(f);
            this.content.on("position-changed", this._onContentMoved, this);
            return;
          }
          if (W) {
            this.content.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.content.x, A)), cc.callFunc(function () {
              q.content.y = A;
              q.content.oldY = A;
              q._popAllInvisibleItems(f);
              q.content.on("position-changed", q._onContentMoved, q);
            })));
          } else {
            this.content.y = A;
            this.content.oldY = A;
            this._popAllInvisibleItems(f);
            this.content.on("position-changed", this._onContentMoved, this);
          }
        }
      }
    };
    j.prototype.visibleItems = function () {
      return this._visibleItems;
    };
    j.prototype.itemAtIndex = function (N) {
      return this._itemAtIndexInArr(N, this._visibleItems);
    };
    j.prototype.insertCellAtIndex = function (N, Y) {
      var W = this;
      if (Y === undefined) {
        Y = true;
      }
      if (!(N > this._cellCount)) {
        this.stopAutoScroll();
        this._cellCount += 1;
        this.content.height = this._estimateCellHeight * this._cellCount;
        var q = this.itemAtIndex(N);
        var S = this._visibleItems;
        var z = this._cellUpdateAnimCallback;
        if (!q) {
          var f = S[0];
          if (f.listViewIndex > N) {
            this._updateCellsListIndex(0, f.listViewIndex + 1);
          } else if (this._shouldPushBottom()) {
            this._pushAtBottom();
          }
          if (z) {
            z.updateCellAmimation(null, T.cellUpdateAction.cellUpdateActionInsert);
          }
          if (z) {
            z.animationEnd();
          }
          return;
        }
        var A = S.indexOf(q);
        var M = C(q);
        var E = this._dataSource.getItem(this, N);
        E.x = 0;
        E.y = M - E.height * E.anchorY;
        E.listViewIndex = N;
        this.content.addChild(E);
        S.splice(A, 0, E);
        M = u(E);
        this._updateCellsListIndex(A + 1, N + 1);
        if (z) {
          z.updateCellAmimation(E, T.cellUpdateAction.cellUpdateActionInsert);
        }
        this._updateCells(A + 1, M, T.cellUpdateAction.cellUpdateActionInsert, Y, function () {
          while (W._shouldPopBottom()) {
            W._popFromBottom();
          }
          W._resizeContentHeight();
          W._isStartUpdateCell = false;
        });
      }
    };
    j.prototype.removeCellAtIndex = function (N, Y) {
      var W = this;
      if (Y === undefined) {
        Y = true;
      }
      if (!(N >= this._cellCount)) {
        var q = this._visibleItems;
        this._cellCount -= 1;
        var S = this.itemAtIndex(N);
        var z = this._cellUpdateAnimCallback;
        if (!S) {
          var f = q[0];
          if (f.listViewIndex > N) {
            this._updateCellsListIndex(0, f.listViewIndex - 1);
          }
          if (z) {
            z.updateCellAmimation(null, T.cellUpdateAction.cellUpdateActionRemove);
          }
          if (z) {
            z.animationEnd();
          }
          return;
        }
        this.stopAutoScroll();
        var A = q.indexOf(S);
        var M = C(S);
        q.splice(A, 1);
        this._updateCellsListIndex(A, N);
        if (this._cellUpdateAnimCallback) {
          z.updateCellAmimation(S, T.cellUpdateAction.cellUpdateActionRemove, function () {
            W._enqueueReusableItem(S);
            S.removeFromParent();
          });
        } else {
          this._enqueueReusableItem(S);
          S.removeFromParent();
        }
        this._updateCells(A, M, T.cellUpdateAction.cellUpdateActionRemove, Y, function () {
          while (W._shouldPushTop()) {
            W._pushAtTop();
          }
          while (W._shouldPushBottom()) {
            W._pushAtBottom();
          }
          W._resizeContentHeight();
          W._isStartUpdateCell = false;
        });
      }
    };
    j.prototype.updateCellAtIndex = function (N, Y) {
      var W = this;
      if (Y === undefined) {
        Y = true;
      }
      var q = this.itemAtIndex(N);
      if (q) {
        var S = this._visibleItems;
        var z = S.indexOf(q);
        var f = C(q);
        var A = q.height;
        var M = this._dataSource.getItem(this, N);
        if (M && (this._enqueueReusableItem(q), M.x = 0, M.y = f - M.height * M.anchorY, M.listViewIndex = N, this.content.addChild(M), S[z] = M, A !== M.height)) {
          f = u(M);
          this._updateCells(z + 1, f, T.cellUpdateAction.cellUpdateActionUpdate, Y, function () {
            if (A < M.height) {
              while (W._shouldPopBottom()) {
                W._popFromBottom();
              }
            } else {
              while (W._shouldPushBottom()) {
                W._pushAtBottom();
              }
            }
            W._resizeContentHeight();
            W._isStartUpdateCell = false;
          });
        }
      }
    };
    j.prototype.setScrollToTopCallback = function (N) {
      this._scrollToTopCallback = N;
    };
    j.prototype.setScrollToBottomCallback = function (N) {
      this._scrollToButtomCallback = N;
    };
    j.prototype.setScrollEndedCallback = function (N) {
      this._scrollToEndedCallback = N;
    };
    j.prototype.setScrollingCallback = function (N) {
      this._scrollingCallback = N;
    };
    j.prototype.setCellUpdateAnimCallback = function (N) {
      this._cellUpdateAnimCallback = N;
    };
    j.prototype._disableTopWidget = function () {
      if (this.contentWidget) {
        this.contentWidget.isAlignTop = false;
      }
    };
    j.prototype._enqueueReusableItem = function (N) {
      var Y;
      var W = N.lv_type;
      if (W) {
        Y = this.nodePools[W];
      }
      if (Y) {
        Y.put(N);
      }
    };
    j.prototype._resizeContentHeight = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        var Y = N[N.length - 1];
        var W = N[0];
        var q = Math.abs(Y.y) + Y.height * Y.anchorY;
        if (q > this.content.height) {
          this.content.height = q;
        } else if (q < this.view.height && W.listViewIndex === 0) {
          this.content.y = this.content.originY;
          this.content.oldY = this.content.originY;
          this.content.height = q;
        } else if (Y.listViewIndex === this._cellCount - 1) {
          this.content.height = q;
        }
      } else {
        this.content.height = 0;
      }
    };
    j.prototype._requestLayoutIfNecessary = function () {
      var N = this._visibleItems;
      if (N && N.length && !(N.length <= 0)) {
        var Y = N[0];
        var W = C(Y);
        var q = N[N.length - 1];
        if (Y.listViewIndex !== 0 || W === 0) {
          if (W > -this._estimateCellHeight && Y.listViewIndex > 1) {
            this._adjustPosition(true);
          } else if (q.listViewIndex === this._cellCount - 1 && Math.abs(q.y) + q.height * q.anchorY < this.content.height) {
            this._adjustPosition(true);
          } else if (Math.abs(q.y) + q.height * q.anchorY > this.content.height) {
            this._adjustPosition(false);
          }
        } else {
          this._adjustPosition(true);
        }
      }
    };
    j.prototype._adjustPosition = function (N, Y = true) {
      this._shouldIgnoreContentEvent = true;
      this._requestLayout(N);
      this._shouldIgnoreContentEvent = false;
      this._autoScrollStartPosition.y = this.content.y;
      if (Y) {
        this._continueAutoScroll();
      }
    };
    j.prototype._requestLayout = function (N) {
      var Y = this._visibleItems;
      if (Y && Y.length && !(Y.length <= 0)) {
        this.stopAutoScroll();
        if (N) {
          var W = -Y[0].listViewIndex * this._estimateCellHeight;
          for (var q = 0; q < Y.length;) {
            (z = Y[q]).x = 0;
            z.y = W - z.height * z.anchorY;
            W = u(z);
            q++;
          }
        } else {
          var S = -Y[Y.length - 1].listViewIndex * this._estimateCellHeight;
          for (q = Y.length - 1; q >= 0;) {
            var z;
            (z = Y[q]).x = 0;
            z.y = S - z.height * z.anchorY + z.height;
            S = C(z);
            q--;
          }
        }
        var f = Y[0];
        var A = this.content.originY - u(f);
        this.content.y = A;
        this.content.oldY = A;
        this._resizeContentHeight();
      }
    };
    j.prototype._continueAutoScroll = function () {
      this._autoScrolling = true;
      this._autoScrollTotalTime = this._storedAutoScrollLeftTime;
      this._autoScrollAccumulatedTime = 0;
      this._autoScrollTargetDelta = this._leftScrollDelta;
    };
    j.prototype._shouldPushBottom = function () {
      var N = false;
      var Y = this._visibleItems;
      if (Y.length > 0) {
        var W = Y[Y.length - 1];
        if (W.listViewIndex === this._cellCount - 1) {
          return false;
        }
        var q = u(W);
        var S = this.content.convertToWorldSpaceAR(cc.v2(0, q));
        var z = u(this.view);
        var f = this.view.parent.convertToWorldSpaceAR(cc.v2(0, z));
        if (S.y >= f.y) {
          N = true;
        }
      } else if (Y.length === 0 && this._cellCount > 0) {
        N = true;
      }
      return N;
    };
    j.prototype._shouldPushTop = function () {
      var N = false;
      var Y = this._visibleItems;
      if (Y.length > 0) {
        var W = Y[0];
        if (W.listViewIndex === 0) {
          return false;
        }
        var q = C(W);
        var S = this.content.convertToWorldSpaceAR(cc.v2(0, q));
        var z = C(this.view);
        var f = this.view.parent.convertToWorldSpaceAR(cc.v2(0, z));
        if (S.y <= f.y) {
          N = true;
        }
      }
      return N;
    };
    j.prototype._shouldPopBottom = function () {
      var N = false;
      var Y = this._visibleItems;
      if (Y.length > 1) {
        var W = C(Y[Y.length - 1]);
        var q = this.content.convertToWorldSpaceAR(cc.v2(0, W));
        var S = u(this.view);
        var z = this.view.parent.convertToWorldSpaceAR(cc.v2(0, S));
        if (q.y < z.y) {
          N = true;
        }
      }
      return N;
    };
    j.prototype._shouldPopTop = function () {
      var N = false;
      var Y = this._visibleItems;
      if (Y.length > 1) {
        var W = u(Y[0]);
        var q = this.content.convertToWorldSpaceAR(cc.v2(0, W));
        var S = C(this.view);
        var z = this.view.parent.convertToWorldSpaceAR(cc.v2(0, S));
        if (q.y > z.y) {
          N = true;
        }
      }
      return N;
    };
    j.prototype._pushAtBottom = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        var Y = this._cellCount;
        var W = N[N.length - 1];
        var q = W.listViewIndex + 1;
        if (q < Y) {
          var S = this._dataSource.getItem(this, q);
          S.lv_type;
          var z = u(W);
          S.x = 0;
          S.y = z - S.height * S.anchorY;
          S.listViewIndex = q;
          this.content.addChild(S);
          N.push(S);
        }
      }
    };
    j.prototype._pushAtTop = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        var Y = N[0];
        var W = Y.listViewIndex - 1;
        if (W >= 0) {
          var q = this._dataSource.getItem(this, W);
          q.lv_type;
          var S = C(Y);
          q.x = 0;
          q.y = S - q.height * q.anchorY + q.height;
          q.listViewIndex = W;
          this.content.addChild(q);
          N.unshift(q);
        }
      }
    };
    j.prototype._popFromTop = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        var Y = N[0];
        this._enqueueReusableItem(Y);
        N.shift();
      }
    };
    j.prototype._popFromBottom = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        var Y = N[N.length - 1];
        this._enqueueReusableItem(Y);
        N.pop();
      }
    };
    j.prototype._popAllTopInvisibleItems = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        for (var Y = 0; Y < N.length && this._shouldPopTop();) {
          this._popFromTop();
          Y++;
        }
      }
    };
    j.prototype._popAllBottomInvisibleItems = function () {
      var N = this._visibleItems;
      if (N.length > 0) {
        for (var Y = N[N.length - 1]; Y >= 0 && this._shouldPopBottom();) {
          this._popFromBottom();
          Y--;
        }
      }
    };
    j.prototype._popAllInvisibleItems = function (N) {
      this._popAllTopInvisibleItems();
      this._popAllBottomInvisibleItems();
      var Y = this._visibleItems;
      var W = this.itemAtIndex(N);
      var q = Y.indexOf(W);
      if (q !== -1) {
        var S = q;
        var z = [];
        var A = -1;
        var M = -1;
        if (Y.length > S) {
          var E = Y[S];
          var F = E.listViewIndex;
          S++;
          z.push(E);
          while (S < Y.length) {
            if ((b = (U = Y[S]).listViewIndex) - F != 1) {
              A = b;
              break;
            }
            z.push(U);
            S++;
            F = b;
          }
          S = q - 1;
          F = E.listViewIndex;
          while (S >= 0) {
            var b;
            if (F - (b = (U = Y[S]).listViewIndex) != 1) {
              M = b;
              break;
            }
            z.unshift(U);
            S--;
            F = b;
          }
        }
        if (A >= 0) {
          var H = this.itemAtIndex(A);
          for (var w = Y.indexOf(H); Y.length > w;) {
            var U = Y[w];
            this._enqueueReusableItem(U);
            w++;
          }
        }
        if (M >= 0) {
          var B = this.itemAtIndex(M);
          for (var P = Y.indexOf(B); P >= 0;) {
            U = Y[P];
            this._enqueueReusableItem(U);
            P--;
          }
        }
        this._visibleItems = z;
      }
    };
    j.prototype._createOrReuseCellFromTopToBottom = function (N, Y) {
      var W = this._visibleItems;
      for (var q = W[0], S = W[W.length - 1], z = N, f = 0, A = []; z < this._cellCount && f <= Y && z !== q.listViewIndex && z !== S.listViewIndex;) {
        var M = this._dataSource.getItem(this, z);
        M.listViewIndex = z;
        this.content.addChild(M);
        A.push(M);
        f += M.height;
        z++;
      }
      return A;
    };
    j.prototype._createOrReuseCellFromBottomToTop = function (N, Y) {
      var W = this._visibleItems;
      for (var q = W[0], S = W[W.length - 1], z = N, f = 0, A = []; z >= 0 && f <= Y && z !== q.listViewIndex && z !== S.listViewIndex;) {
        var M = this._dataSource.getItem(this, z);
        M.listViewIndex = z;
        this.content.addChild(M);
        A.unshift(M);
        f += M.height;
        z--;
      }
      return A;
    };
    j.prototype._layoutCellsFromTopToBottom = function (N, Y) {
      if (!Y || !Y.length || Y.length <= 0) {
        return null;
      }
      for (var W = 0; W < Y.length; W++) {
        var q = Y[W];
        q.x = 0;
        q.y = N - q.height * q.anchorY;
        N -= q.height;
      }
      return Y;
    };
    j.prototype._layoutCellsFromBottomToTop = function (N, Y) {
      if (!Y || !Y.length || Y.length <= 0) {
        return null;
      }
      for (var W = Y.length - 1; W >= 0; W--) {
        var q = Y[W];
        q.x = 0;
        q.y = N + q.height * q.anchorY;
        N += q.height;
      }
      return Y;
    };
    j.prototype._calculateIfReachHeight = function (N, Y, W, q) {
      var S = N;
      var z = 0;
      if (q) {
        for (var f = S; f < Y.length && !((z += Y[f].height) >= W); f++);
      } else {
        for (f = S; f >= 0 && !((z += Y[f].height) >= W); f--);
      }
      return z;
    };
    j.prototype._preloadCells = function (N, Y) {
      var W;
      var q;
      var S = Y[0];
      var z = Y[Y.length - 1];
      var f = this.view.height;
      if (N >= S.listViewIndex && N <= z.listViewIndex) {
        W = this._createOrReuseCellFromTopToBottom(z.listViewIndex + 1, f);
        q = this._createOrReuseCellFromBottomToTop(S.listViewIndex - 1, f);
        W = this._layoutCellsFromTopToBottom(u(z), W);
        if (q = this._layoutCellsFromBottomToTop(C(S), q)) {
          Y = q.concat(Y);
        }
        if (W) {
          Y = Y.concat(W);
        }
      } else {
        var A = N;
        W = this._createOrReuseCellFromTopToBottom(A, f);
        A = N;
        var M = undefined;
        M = (q = this._createOrReuseCellFromBottomToTop(A - 1, f)) && W ? q.concat(W) : q || W;
        if (N > z.listViewIndex) {
          M = this._layoutCellsFromTopToBottom(u(z), M);
          Y = Y.concat(M);
        } else if (M = this._layoutCellsFromBottomToTop(C(S), M)) {
          Y = M.concat(Y);
        }
      }
      return Y;
    };
    j.prototype._isLastCellLoaded = function () {
      var N = this._visibleItems;
      return !(N.length > 0) || N[N.length - 1].listViewIndex === this._cellCount - 1;
    };
    j.prototype._itemAtIndexInArr = function (N, Y) {
      if (!Y || !Y.length || Y.length <= 0) {
        return null;
      }
      var W = null;
      for (var q = 0; q < Y.length;) {
        var S = Y[q];
        if (S.listViewIndex === N) {
          W = S;
          break;
        }
        q++;
      }
      return W;
    };
    j.prototype._finishReload = function () {
      this._resizeContentHeight();
      if (this._dataSource.didReloadData) {
        this._dataSource.didReloadData(this);
      }
    };
    j.prototype._updateCells = function (N, Y, W, q, S) {
      var z = this;
      var f = this._cellUpdateAnimCallback;
      this._isStartUpdateCell = true;
      var A;
      for (var M = this._visibleItems, E = f ? f.layoutDuration() : 0.5, F = f ? f.layoutDelay(W) : 0, b = function (U) {
          var B = M[U];
          var P = B.y;
          var X = Y - B.height * B.anchorY;
          Y = X - B.height * B.anchorY;
          if (U === M.length - 1) {
            A = Math.abs(X) + B.height * B.anchorY;
          }
          if (P !== X && q) {
            B.runAction(cc.sequence(cc.delayTime(F), cc.moveTo(E, cc.v2(B.x, X)), cc.callFunc(function () {
              B.y = X;
              if (U === M.length - 1) {
                z._LayoutUpdatedCells(A);
                if (S) {
                  S();
                }
                if (f) {
                  f.animationEnd();
                }
              }
            })));
          } else {
            B.y = X;
            if (U === M.length - 1) {
              H._LayoutUpdatedCells(A);
              if (S) {
                S();
              }
              if (f) {
                f.animationEnd();
              }
            }
          }
        }, H = this, w = N; w < M.length; w++) {
        b(w);
      }
      if (N >= M.length) {
        if (S) {
          S();
        }
        if (f) {
          f.animationEnd();
        }
      }
    };
    j.prototype._LayoutUpdatedCells = function (N) {
      var Y = N + this.content.originY - this.content.y - this.view.height;
      if (Y < 0) {
        this.content.oldY += Y;
        this.content.y += Y;
      }
    };
    j.prototype._updateCellsListIndex = function (N, Y) {
      for (var W = this._visibleItems, q = N; q < W.length; q++) {
        W[q].listViewIndex = Y;
        Y += 1;
      }
    };
    j.prototype._onContentMoved = function () {
      var N = this.content;
      var Y = N.y - N.oldY;
      N.oldY = N.y;
      if (!this._shouldIgnoreContentEvent) {
        if (Y > 0) {
          while (this._shouldPushBottom()) {
            this._pushAtBottom();
          }
          while (this._shouldPopTop()) {
            this._popFromTop();
          }
        } else if (Y < 0) {
          while (this._shouldPushTop()) {
            this._pushAtTop();
          }
          while (this._shouldPopBottom()) {
            this._popFromBottom();
          }
        }
        this._requestLayoutIfNecessary();
      }
    };
    j.prototype._scrollToTop = function () {
      this._isScrollToTop = true;
    };
    j.prototype._scrollToBottom = function () {
      this._isScrollToBottom = true;
    };
    j.prototype._scrollEnded = function () {
      if (this._scrollToEndedCallback) {
        this._scrollToEndedCallback();
      }
    };
    j.prototype._whenScrolling = function () {
      var N = this._getHowMuchOutOfBoundary();
      if (this._scrollingCallback) {
        this._scrollingCallback(N.y);
      }
    };
    j.prototype._onSizeChanged = function () {
      this.viewDidLayoutSubviews();
    };
    j.prototype.stopAutoScroll = function () {
      if (this._shouldIgnoreContentEvent) {
        this._storedAutoScrollLeftTime = this._autoScrollTotalTime - this._autoScrollAccumulatedTime;
        var N = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
        if (this._autoScrollAttenuate) {
          W = N;
          N = (W -= 1) * W * W * W * W + 1;
        }
        this._leftScrollDelta = (Y = 1 - N, this._autoScrollTargetDelta.mul(Y));
      }
      var Y;
      var W;
      p.prototype.stopAutoScroll.call(this);
    };
    j.prototype._processInertiaScroll = function () {
      var N = this;
      if (this._isScrollToTop && this._scrollToTopCallback) {
        var Y = this._getHowMuchOutOfBoundary();
        this._scrollToTopCallback(function () {
          N._isScrollToTop = false;
          N._startInertiaScroll(cc.v2(0, 0));
        }, Y);
      } else if (this._isScrollToBottom && this._scrollToButtomCallback && this._isLastCellLoaded()) {
        this._scrollToButtomCallback(function (W) {
          N._isScrollToBottom = false;
          var q = N._cellCount = N._dataSource.getCount(N);
          N.content.height = N._estimateCellHeight * q;
          var S = N._visibleItems;
          if (S && S.length && S.length > 0) {
            var z = S[S.length - 1].listViewIndex;
            for (N.content.off("position-changed", N._onContentMoved, N); z < q && N._shouldPushBottom();) {
              N._pushAtBottom();
              z += 1;
            }
            N._resizeContentHeight();
            N.content.on("position-changed", N._onContentMoved, N);
          }
          if (W) {
            N._processInertiaScroll();
          }
        });
      } else {
        this._isScrollToTop = false;
        this._isScrollToBottom = false;
        p.prototype._processInertiaScroll.call(this);
      }
    };
    j.prototype._handleMoveLogic = function (N) {
      if (!this._isStartUpdateCell) {
        p.prototype._handleMoveLogic.call(this, N);
      }
    };
    __decorate([D(cc.Node)], j.prototype, "view", undefined);
    __decorate([D(cc.Widget)], j.prototype, "contentWidget", undefined);
    return __decorate([L], j);
  }(cc.ScrollView);
  exports.default = k;
  cc._RF.pop();
}
function C(p) {
  return p.y - p.height * p.anchorY + p.height;
}
function u(p) {
  return p.y - p.height * p.anchorY;
}