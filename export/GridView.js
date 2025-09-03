if (!cc._RF.push(module, "2a349Sf9h1Dw6gCmtoNZ3ZP", "GridView")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("ScrollViewEx");
  function x(u, c, p) {
    return u.fuzzyEquals(c, p);
  }
  function L(u, c) {
    return u.sub(c).mag();
  }
  var D = cc._decorator;
  var k = D.ccclass;
  D.property;
  var C = function (u) {
    function j() {
      var G = u !== null && u.apply(this, arguments) || this;
      G.autoSnap = true;
      G._nodePools = {};
      G._templates = {};
      return G;
    }
    var c = {
      get: function () {
        return this._nodePools;
      },
      enumerable: false,
      configurable: true
    };
    var p = {
      get: function () {
        return this._templates;
      },
      enumerable: false,
      configurable: true
    };
    __extends(j, u);
    Object.defineProperty(j.prototype, "nodePools", c);
    Object.defineProperty(j.prototype, "templates", p);
    // 設定估算的項目大小
    j.prototype.setEstimatedSize = function (G) {
      if (this.vertical) {
        this.estimatedHeight = G.y;
      } else {
        this.estimatedWidth = G.x;
      }
    };
    // 指定每個項目的固定尺寸
    j.prototype.setConstantCellSize = function (G, V) {
      var Q = {
        width: G,
        height: V
      };
      this.constCellSize = Q;
    };
    // 重置完成後的回呼
    j.prototype.setResetFinish = function (G) {
      this.resetFinish = G;
    };
    // 設定生成新項目的行為
    j.prototype.setSpawnCell = function (G) {
      this._spawnCellAction = G;
    };
    // 設定移除項目的行為
    j.prototype.setRemoveCell = function (G) {
      this._removeCellAction = G;
    };
    // 以下為下拉/拉動相關的回呼設定
    j.prototype.setPullingLeft = function (G) {
      this._pullingLeftAction = G;
    };
    j.prototype.setPullLeftEnd = function (G) {
      this._pullLeftEndAction = G;
    };
    j.prototype.setPullingRight = function (G) {
      this._pullingRightAction = G;
    };
    j.prototype.setPullRightEnd = function (G) {
      this._pullRightEndAction = G;
    };
    j.prototype.setPullingDown = function (G) {
      this._pullingDownAction = G;
    };
    j.prototype.setPullDownEnd = function (G) {
      this._pullDownEndAction = G;
    };
    j.prototype.setPullingUp = function (G) {
      this._pullingUpAction = G;
    };
    j.prototype.setPullUpEnd = function (G) {
      this._pullUpEndAction = G;
    };
    // 設定對焦點位置，用於捲動後對齊
    j.prototype.setFocusPoint = function (G) {
      switch (G) {
        case 1:
          this.focusPoint = {};
          this.focusPoint.type = 1;
          this.focusPoint.width = this.viewSize.width / 2;
          this.focusPoint.height = this.viewSize.height / 2;
          break;
        case 2:
          this.focusPoint = {};
          this.focusPoint.type = 2;
          this.focusPoint.width = this.viewSize.width;
          this.focusPoint.height = this.viewSize.height;
          break;
        default:
          this.focusPoint = {};
          this.focusPoint.type = 0;
          this.focusPoint.width = 0;
          this.focusPoint.height = 0;
      }
    };
    // 取得目前的對焦點設定
    j.prototype.getFocusPoint = function () {
      if (!this.focusPoint) {
        this.focusPoint = {};
        this.focusPoint.type = 0;
        this.focusPoint.width = 0;
        this.focusPoint.height = 0;
      }
      return this.focusPoint;
    };
    // 設定內容節點的排版間距
    j.prototype.setLayoutSetting = function (G) {
      this.contentLayout = this.content.getComponent(cc.Layout);
      this.layoutSetting = this.getLayoutSetting();
      if (G.spacingLeft) {
        this.layoutSetting.spacingLeft = G.spacingLeft;
      }
      if (G.spacingRight) {
        this.layoutSetting.spacingRight = G.spacingRight;
      }
      if (G.spacingTop) {
        this.layoutSetting.spacingTop = G.spacingTop;
      }
      if (G.spacingBottom) {
        this.layoutSetting.spacingBottom = G.spacingBottom;
      }
      if (G.spacingX) {
        this.layoutSetting.spacingX = G.spacingX;
      }
      if (G.spacingY) {
        this.layoutSetting.spacingY = G.spacingY;
      }
      this.contentLayout.paddingLeft = this.layoutSetting.spacingLeft;
      this.contentLayout.paddingRight = this.layoutSetting.spacingRight;
      this.contentLayout.paddingTop = this.layoutSetting.spacingTop;
      this.contentLayout.paddingBottom = this.layoutSetting.spacingBottom;
      this.contentLayout.spacingX = this.layoutSetting.spacingX;
      this.contentLayout.spacingY = this.layoutSetting.spacingY;
    };
    j.prototype.getLayoutSetting = function () {
      if (this.layoutSetting) {
        return this.layoutSetting;
      } else {
        return this.layoutSetting = {
          spacingLeft: 0,
          spacingRight: 0,
          spacingTop: 0,
          spacingBottom: 0,
          spacingX: 0,
          spacingY: 0
        };
      }
    };
    // 取得目前畫面上可見的項目
    j.prototype.getVisibleItems = function () {
      var G = [];
      var V = this.content.children;
      if (V.length) {
        for (var Q = 0; Q < V.length; Q++) {
          G.push(V[Q]);
        }
      }
      return G;
    };
    // 指定資料來源並更新視窗尺寸
    j.prototype.setDataSource = function (G) {
      var V = this.node;
      var Q = V.width;
      var N = V.height;
      this._setViewSize(Q, N);
      if (G !== this._dataSource) {
        this._dataSource = G;
      }
    };
    j.prototype._getDataSource = function () {
      return this._dataSource;
    };
    // 設定或取得資料筆數
    j.prototype._setDataCount = function (G) {
      this._dataCount = G;
    };
    j.prototype._getDataCount = function () {
      this._dataCount ||= 0;
      return this._dataCount;
    };
    // 當節點尺寸改變時重新計算
    j.prototype._onSizeChanged = function () {
      var G = this.node;
      var V = G.width;
      var Q = G.height;
      this._setViewSize(V, Q);
      this._respawn(this._sectionIndex, this.currentIndex);
    };
    // 內部設定視窗尺寸
    j.prototype._setViewSize = function (G, V) {
      var Q = {
        width: G,
        height: V
      };
      this.viewSize = Q;
      this.content.parent.setContentSize(G, V);
    };
    // 取得目前視窗尺寸
    j.prototype._getViewSize = function () {
      return this.viewSize;
    };
    // 註冊可重複使用的節點模板
    j.prototype.register = function (G, V, Q) {
      if (this.nodePools[G]) ;else if (V) {
        var N = new cc.NodePool(Q);
        this.templates[G] = V;
        this.nodePools[G] = N;
      }
    };
    // 重新載入資料並更新顯示
    j.prototype.reloadData = function () {
      this.setSnapDone(true);
      var G = this._dataSource;
      var V = G.getCount(this, this._sectionIndex);
      var Q = this._dataCount;
      if (Q !== V) {
        this.setMasterControl(true);
        if (V < Q) {
          this._reloadReduceData(V);
        } else {
          this._setDataCount(V);
          this.reloadCurrentData();
          this._reloadAddData();
        }
      } else {
        this.reloadCurrentData();
      }
      if (G.didReloadData) {
        G.didReloadData();
      }
    };
    // 佔位：插入與移除項目
    j.prototype.insertItem = function () {};
    j.prototype.removeItem = function () {};
    // 重新生成列表並回到初始狀態
    j.prototype._respawn = function (G = this._sectionIndex, V, Q) {
      this._unbindListener();
      this._resetScrollView();
      this.setMasterControl(true);
      this.content.y = 0;
      this.content.x = 0;
      this.content.setContentSize(0, 0);
      this.contentLayout.paddingTop = this.layoutSetting.spacingTop;
      this.contentLayout.paddingBottom = this.layoutSetting.spacingBottom;
      this.contentLayout.paddingLeft = this.layoutSetting.spacingLeft;
      this.contentLayout.paddingRight = this.layoutSetting.spacingRight;
      if (this.content.children.length) {
        for (var N = this.content.children.length - 1; N >= 0; N--) {
          var Y = this.content.children[N];
          this._putOuterCellNode(Y);
        }
      }
      this.init(G, V, false, Q);
    };
    // 重置並可選擇指定索引
    j.prototype.reset = function (G = this._sectionIndex, V) {
      this._respawn(G, V, this.resetFinish);
    };
    // 初始化 GridView
    j.prototype.init = function (G, V, Q, N) {
      if (V === undefined) {
        V = 0;
      }
      if (Q === undefined) {
        Q = true;
      }
      if (!this.layoutSetting) {
        this.setLayoutSetting({
          spacingLeft: 0,
          spacingRight: 0,
          spacingTop: 0,
          spacingBottom: 0,
          spacingX: 0,
          spacingY: 0
        });
      }
      var W = this._dataSource;
      this.isDynamicSize = !!W.getCellSize;
      this.isPreCalculateSize = !!this.constCellSize || !!this.isDynamicSize;
      if (!this.isPreCalculateSize) {
        V = 0;
      }
      this.originalElastic = this.elastic;
      this.currentIndex = V;
      this.currentTarget = V;
      this.requestSnap = false;
      this.setMasterControl(false);
      this.contentLayout = this.content.getComponent(cc.Layout);
      this.setSnapDone(true);
      this.snapPause = false;
      this.outerCellsMatrix = [];
      this._sectionIndex = G;
      this.pauseUpdate = false;
      this.pullDir = null;
      this.prevContentY = this.content.y;
      this.prevContentX = this.content.x * -1;
      this._bindListener();
      this._setDataCount(W.getCount(this, this._sectionIndex));
      if (this.vertical) {
        this.contentLayout.startAxis = 0;
        this.content.width = this.viewSize.width;
        this._spawnVerticalInit(0, V, this.viewSize.height, Q, N);
      } else {
        this.contentLayout.startAxis = 1;
        this.content.height = this.viewSize.height;
        this._spawnHorizontalInit(0, V, this.viewSize.width, Q, N);
      }
    };
    // 捲動到指定索引
    j.prototype.scrollTo = function (G, V) {
      var Q = this;
      if (V === undefined) {
        V = true;
      }
      if (!(G >= this._dataCount)) {
        if (!this.isPreCalculateSize || V) {
          if (this.vertical) {
            var N = this._getRowOrColByIndex(G);
            if (N !== null) {
              var Y = this.getFocusPoint();
              this.currentIndex = G;
              if (Y.type === 1) {
                this.target = this._getRowTotalHeight(N) - this.outerCellsMatrix[N].height - Y.height + this.outerCellsMatrix[N][0].height / 2;
              } else {
                this.target = this._getRowTotalHeight(N) - this.outerCellsMatrix[N].height - this.layoutSetting.spacingTop;
              }
              var W = this.content.height - this.viewSize.height;
              if (this.target < 0) {
                this.target = 0;
              } else if (this.target > W) {
                this.target = W;
              }
            } else {
              this.target = this.estimatedHeight;
              this.suddenStopIndex = G;
            }
          } else {
            var q = this._getRowOrColByIndex(G);
            if (q !== null) {
              Y = this.getFocusPoint();
              this.currentIndex = G;
              if (Y.type === 1) {
                this.target = this._getColTotalWidth(q) - this.outerCellsMatrix[q].width - Y.width + this.outerCellsMatrix[q][0].width / 2;
              } else {
                this.target = this._getColTotalWidth(q) - this.outerCellsMatrix[q].width - this.layoutSetting.spacingLeft;
              }
              var S = this.content.width - this.viewSize.width;
              if (this.target < 0) {
                this.target = 0;
              } else if (this.target > S) {
                this.target = S;
              }
            } else {
              this.target = this.estimatedWidth;
              this.suddenStopIndex = G;
            }
          }
          this.lerpSpeed = 10;
          this.setSnapDone(false);
        } else {
          this._respawn(this._sectionIndex, G, function () {
            if (Q.snapFinish) {
              Q.snapFinish(G);
            }
          });
        }
      }
    };
    // 停止更新
    j.prototype.stopUpdate = function () {
      this.setMasterControl(true);
    };
    // 恢復更新
    j.prototype.resumeUpdate = function () {
      if (this.pauseUpdate) {
        this.setMasterControl(false);
        this.pullDir = null;
        this.pauseUpdate = false;
      }
    };
    // 設定是否由外部控制捲動
    j.prototype.setMasterControl = function (G) {
      this._masterControl = G;
    };
    // 回收離開視窗的項目
    j.prototype._recycle = function () {
      if (!this.pauseUpdate && !this._masterControl) {
        if (this.content.children.length) {
          if (this.vertical) {
            if (this.content.y !== this.prevContentY) {
              this._recycleVertical();
            }
          } else if (this.content.x * -1 !== this.prevContentX) {
            this._recycleHorizontal();
          }
        }
      }
    };
    // 計算指定列的累積高度
    j.prototype._getRowTotalHeight = function (G) {
      if (this.outerCellsMatrix[G] && this.outerCellsMatrix[G].totalHeight) {
        return this.outerCellsMatrix[G].totalHeight;
      }
      var V = this.layoutSetting.spacingTop;
      for (var Q = 0; Q <= G; Q++) {
        V += this.outerCellsMatrix[Q].height;
        if (Q === G) {
          this.outerCellsMatrix[G].totalHeight = V;
          return V;
        }
        V += this.layoutSetting.spacingY;
      }
    };
    // 計算指定行的累積寬度
    j.prototype._getColTotalWidth = function (G) {
      if (this.outerCellsMatrix[G] && this.outerCellsMatrix[G].totalWidth) {
        return this.outerCellsMatrix[G].totalWidth;
      }
      var V = this.layoutSetting.spacingLeft;
      for (var Q = 0; Q <= G; Q++) {
        V += this.outerCellsMatrix[Q].width;
        if (Q === G) {
          this.outerCellsMatrix[G].totalWidth = V;
          return V;
        }
        V += this.layoutSetting.spacingX;
      }
    };
    // 取得最靠近焦點的項目索引
    j.prototype._getNearestItem = function () {
      if (this.vertical) {
        if (this._getContentTopBoundary() < this._topBoundary) {
          return 0;
        }
        if (this._getContentBottomBoundary() > this._bottomBoundary) {
          var G = this.content.children.length - 1;
          return this.content.children[G].row;
        }
        var V = 0;
        var Q = 0;
        var N = this.content.height;
        var Y = null;
        for (var W = 0; W < this.content.children.length; W++) {
          if (Y != this.content.children[W].row) {
            Y = this.content.children[W].row;
            var q = this._getRowTotalHeight(Y) - this.outerCellsMatrix[Y].height - this.layoutSetting.spacingTop;
            if ((Q = Math.abs(q - this.content.y)) >= N) {
              return V;
            }
            V = Y;
            N = Q;
          }
        }
        return V;
      }
      if (this._getContentLeftBoundary() > this._leftBoundary) {
        return 0;
      }
      if (this._getContentRightBoundary() < this._rightBoundary) {
        G = this.content.children.length - 1;
        return this.content.children[G].col;
      }
      var S = 0;
      var z = 0;
      N = this.content.width;
      var f = null;
      for (W = 0; W < this.content.children.length; W++) {
        if (f != this.content.children[W].col) {
          f = this.content.children[W].col;
          var A = this._getColTotalWidth(f) - this.outerCellsMatrix[f].width - this.layoutSetting.spacingLeft;
          if ((z = Math.abs(A - this.content.x * -1)) >= N) {
            return S;
          }
          S = f;
          N = z;
        }
      }
      return S;
    };
    // 對齊至最近的項目
    j.prototype._autoSnapTo = function () {
      this.elastic = this.originalElastic;
      if (!this._masterControl && this.requestSnap && this.content.children.length) {
        if (this.vertical) {
          var G = this.getFocusPoint();
          this.requestSnap = false;
          var V = this._getNearestItem();
          this.currentTarget = V;
          this.currentIndex = this.outerCellsMatrix[V][0] ? this.outerCellsMatrix[V][0].zIndex : null;
          if (G.type === 1) {
            this.target = this._getRowTotalHeight(V) - this.outerCellsMatrix[V].height - G.height + this.outerCellsMatrix[V][0].height / 2;
          } else {
            this.target = this._getRowTotalHeight(V) - this.outerCellsMatrix[V].height - this.layoutSetting.spacingTop;
          }
          var Q = this.content.height - this.viewSize.height;
          if (Q < 0) {
            Q = 0;
          }
          if (this.target <= 0) {
            this.target = 0;
          } else if (this.target >= Q) {
            this.target = Q;
          }
        } else {
          G = this.getFocusPoint();
          this.requestSnap = false;
          var N = this._getNearestItem();
          this.currentTarget = N;
          this.currentIndex = this.outerCellsMatrix[N][0] ? this.outerCellsMatrix[N][0].zIndex : null;
          if (G.type === 1) {
            this.target = this._getColTotalWidth(N) - this.outerCellsMatrix[N].width - G.width + this.outerCellsMatrix[N][0].width / 2;
          } else {
            this.target = this._getColTotalWidth(N) - this.outerCellsMatrix[N].width - this.layoutSetting.spacingLeft;
          }
          var Y = this.content.width - this.viewSize.width;
          if (Y < 0) {
            Y = 0;
          }
          if (this.target <= 0) {
            this.target = 0;
          } else if (this.target >= Y) {
            this.target = Y;
          }
        }
        this.lerpSpeed = 5;
        this.setSnapDone(false);
      }
    };
    j.prototype._recycleVertical = function () {
      var G = this.content.y;
      var V = this.content.children[0];
      var Q = this.content.children[this.content.children.length - 1];
      var N = V.row;
      var Y = Q.row;
      var W = this._getRowTotalHeight(Y) - this.viewSize.height;
      if (this.prevContentY > G) {
        var q = V.zIndex;
        var S = G - this.contentLayout.paddingTop + this.layoutSetting.spacingY;
        if (S < 0) {
          this._spawnVerticalPrevious(N - 1, q - 1, S);
        }
        if (Y > 0 && this.outerCellsMatrix[Y - 1] && this.outerCellsMatrix[Y - 1][0]) {
          var z = G - W + this.layoutSetting.spacingY + this.outerCellsMatrix[Y].height;
          if (z < 0) {
            this._removeVerticalNext(Y, z, W);
          }
        }
      } else {
        var f = Q.zIndex;
        var A = G - W;
        if (A > 0) {
          this._spawnVerticalNext(Y + 1, 0, f + 1, A);
        }
        if (N < this.outerCellsMatrix.length - 1 && this.outerCellsMatrix[N + 1] && this.outerCellsMatrix[N + 1][0]) {
          var M = G - this.contentLayout.paddingTop - this.outerCellsMatrix[N].height;
          if (M > 0) {
            this._removeVerticalPrevious(N, M);
          }
        }
      }
      this.prevContentY = G;
    };
    j.prototype._recycleHorizontal = function () {
      var G = this.content.x * -1;
      var V = this.content.children[0];
      var Q = this.content.children[this.content.children.length - 1];
      var N = V.col;
      var Y = Q.col;
      var W = this._getColTotalWidth(Y) - this.viewSize.width;
      if (this.prevContentX > G) {
        var q = V.zIndex;
        var S = G - this.contentLayout.paddingLeft + this.layoutSetting.spacingX;
        if (S < 0) {
          this._spawnHorizontalPrevious(N - 1, q - 1, S);
        }
        if (Y > 0 && this.outerCellsMatrix[Y - 1] && this.outerCellsMatrix[Y - 1][0]) {
          var z = G - W + this.layoutSetting.spacingX + this.outerCellsMatrix[Y].width;
          if (z < 0) {
            this._removeHorizontalNext(Y, z, W);
          }
        }
      } else {
        var f = Q.zIndex;
        var A = G - W;
        if (A > 0) {
          this._spawnHorizontalNext(0, Y + 1, f + 1, A);
        }
        if (N < this.outerCellsMatrix.length - 1 && this.outerCellsMatrix[N + 1] && this.outerCellsMatrix[N + 1][0]) {
          var M = G - this.contentLayout.paddingLeft - this.outerCellsMatrix[N].width;
          if (M > 0) {
            this._removeHorizontalPrevious(N, M);
          }
        }
      }
      this.prevContentX = G;
    };
    j.prototype._precalculateVerticalContent = function () {
      for (var G, V, Q = this.layoutSetting, N = Q.spacingX, Y = Q.spacingLeft + Q.spacingRight, W = 0, q = 0, S = 0, z = this._dataCount; W < z;) {
        if (this.isDynamicSize) {
          var f = this._dataSource.getCellSize(W);
          G = f.width + N;
          V = f.height;
        } else {
          G = this.constCellSize.width + N;
          V = this.constCellSize.height;
        }
        if (!this.outerCellsMatrix[q]) {
          this.outerCellsMatrix[q] = {};
          this.outerCellsMatrix[q][S] = null;
          this.outerCellsMatrix[q].itemCount = 0;
          this.outerCellsMatrix[q].height = 0;
          this.outerCellsMatrix[q].freeWidth = this.viewSize.width - Y;
          this.freeWidth = this.viewSize.width - Y;
        }
        if (this.freeWidth - G >= 0) {
          this.outerCellsMatrix[q].height = Math.max(V, this.outerCellsMatrix[q].height);
          this.outerCellsMatrix[q][S] = null;
          this.freeWidth -= G;
          S += 1;
          this.outerCellsMatrix[q].itemCount = S;
          W++;
        } else if (this.freeWidth + N - G >= 0) {
          this.outerCellsMatrix[q].height = Math.max(V, this.outerCellsMatrix[q].height);
          this.outerCellsMatrix[q][S] = null;
          this.freeWidth -= G;
          S += 1;
          this.outerCellsMatrix[q].itemCount = S;
          W++;
        } else {
          q += 1;
          S = 0;
        }
      }
      this.freeWidth = undefined;
      this._resetRowScrollSize();
    };
    j.prototype._precalculateHorizontalContent = function () {
      var G;
      for (var V, Q = this.layoutSetting, N = Q.spacingY, Y = Q.spacingTop + Q.spacingBottom, W = 0, q = 0, S = 0, z = this._dataCount; W < z;) {
        if (this.isDynamicSize) {
          var f = this._dataSource.getCellSize(W);
          G = f.width;
          V = f.height + N;
        } else {
          G = this.constCellSize.width;
          V = this.constCellSize.height + N;
        }
        if (!this.outerCellsMatrix[S]) {
          this.outerCellsMatrix[S] = {};
          this.outerCellsMatrix[S][q] = {};
          this.outerCellsMatrix[S].itemCount = 0;
          this.outerCellsMatrix[S].width = 0;
          this.outerCellsMatrix[S].freeHeight = this.viewSize.height - Y;
          this.freeHeight = this.viewSize.height - Y;
        }
        if (this.freeHeight - V >= 0) {
          this.outerCellsMatrix[S].width = Math.max(G, this.outerCellsMatrix[S].width);
          this.outerCellsMatrix[S][q] = null;
          this.freeHeight -= V;
          q += 1;
          this.outerCellsMatrix[S].itemCount = q;
          W++;
        } else if (this.freeHeight + this.layoutSetting.spacingY - V >= 0) {
          this.outerCellsMatrix[S].width = Math.max(G, this.outerCellsMatrix[S].width);
          this.outerCellsMatrix[S][q] = null;
          this.freeHeight -= V;
          q += 1;
          this.outerCellsMatrix[S].itemCount = q;
          W++;
        } else {
          S += 1;
          q = 0;
        }
      }
      this.freeHeight = undefined;
      this._resetColScrollSize();
    };
    j.prototype._spawnTopToBottom = function (G, V, Q) {
      this.lastContentY = this.content.y;
      var N;
      var Y;
      var W = this.layoutSetting;
      var q = W.spacingX;
      for (var S = W.spacingY, z = W.spacingLeft + W.spacingRight, A = G, M = 0, E = this._dataCount, F = 0; V < E;) {
        if (this.isDynamicSize) {
          var b = this._dataSource.getCellSize(V);
          N = b.width + q;
          Y = b.height;
        } else {
          N = this.constCellSize.width + q;
          Y = this.constCellSize.height;
        }
        if (!(Q > 0)) {
          return;
        }
        if (!this.outerCellsMatrix[A]) {
          this.outerCellsMatrix[A] = {};
          this.outerCellsMatrix[A][M] = null;
          this.outerCellsMatrix[A].itemCount = 0;
          this.outerCellsMatrix[A].height = 0;
          this.outerCellsMatrix[A].freeWidth = this.viewSize.width - z;
        }
        if (this.outerCellsMatrix[A].freeWidth - N >= 0) {
          this.outerCellsMatrix[A].height = Math.max(Y, this.outerCellsMatrix[A].height);
          var H = this._dataSource.getItem(this, V, this._sectionIndex);
          this._setOuterCellData(H, A, M, V);
          this.outerCellsMatrix[A].freeWidth -= N;
          M += 1;
          this.outerCellsMatrix[A].itemCount = M;
          V++;
        } else if (this.outerCellsMatrix[A].freeWidth + q - N >= 0) {
          this.outerCellsMatrix[A].height = Math.max(Y, this.outerCellsMatrix[A].height);
          H = this._dataSource.getItem(this, V, this._sectionIndex);
          this._setOuterCellData(H, A, M, V);
          this.outerCellsMatrix[A].freeWidth -= N;
          M += 1;
          this.outerCellsMatrix[A].itemCount = M;
          V++;
        } else {
          var w = (Q -= F) - (this.outerCellsMatrix[A].height + S);
          if (w > 0) {
            Q = w;
          } else if (w + S > 0) {
            Q = w + S;
            F = S;
          } else {
            Q = w;
          }
          A += 1;
          M = 0;
        }
      }
    };
    j.prototype._spawnLeftToRight = function (G, V, Q) {
      this.lastContentX = this.content.x * -1;
      var N;
      var Y;
      var W = this.layoutSetting;
      for (var q = W.spacingX, S = W.spacingY, z = W.spacingTop + W.spacingBottom, A = 0, M = G, E = this._dataCount, F = 0; V < E;) {
        if (this.isDynamicSize) {
          var b = this._dataSource.getCellSize(V);
          N = b.width;
          Y = b.height + S;
        } else {
          N = this.constCellSize.width;
          Y = this.constCellSize.height + S;
        }
        if (!(Q > 0)) {
          this.setMasterControl(false);
          return;
        }
        if (!this.outerCellsMatrix[M]) {
          this.outerCellsMatrix[M] = {};
          this.outerCellsMatrix[M][A] = {};
          this.outerCellsMatrix[M].itemCount = 0;
          this.outerCellsMatrix[M].width = 0;
          this.outerCellsMatrix[M].freeHeight = this.viewSize.height - z;
        }
        if (this.outerCellsMatrix[M].freeHeight - Y >= 0) {
          this.outerCellsMatrix[M].width = Math.max(N, this.outerCellsMatrix[M].width);
          var H = this._dataSource.getItem(this, V, this._sectionIndex);
          this._setOuterCellData(H, A, M, V);
          this.outerCellsMatrix[M].freeHeight -= Y;
          A += 1;
          this.outerCellsMatrix[M].itemCount = A;
          V++;
        } else if (this.outerCellsMatrix[M].freeHeight + S - Y >= 0) {
          this.outerCellsMatrix[M].width = Math.max(N, this.outerCellsMatrix[M].width);
          H = this._dataSource.getItem(this, V, this._sectionIndex);
          this._setOuterCellData(H, A, M, V);
          this.outerCellsMatrix[M].freeHeight -= Y;
          A += 1;
          this.outerCellsMatrix[M].itemCount = A;
          V++;
        } else {
          var w = (Q -= F) - (this.outerCellsMatrix[M].width + q);
          if (w > 0) {
            Q = w;
          } else if (w + q > 0) {
            Q = w + q;
            F = q;
          } else {
            Q = w;
          }
          M += 1;
          A = 0;
        }
      }
      this.setMasterControl(false);
    };
    j.prototype._spawnVerticalTargetArea = function (G, V, Q) {
      var N = this._getRowOrColByIndex(G);
      var Y = this._getFirstIndexByRowOrCol(N);
      var W = this._getRowTotalHeight(N) - this.outerCellsMatrix[N].height;
      if (this._getContentTopBoundary() < this._topBoundary) {
        this.target = 0;
      } else if (this._getContentBottomBoundary() > this._bottomBoundary) {
        this.target = this.content.height + this._bottomBoundary;
      } else {
        this.target = W - this.layoutSetting.spacingTop;
      }
      this.content.y = this.target;
      this.contentLayout.paddingTop = W;
      this.contentLayout.paddingBottom = this.layoutSetting.spacingBottom;
      this.contentLayout.updateLayout();
      this._spawnTopToBottom(N, Y, V);
      var q = this.content.y - W;
      if (q < 0) {
        this._spawnVerticalPrevious(N - 1, Y - 1, q, Q);
      } else if (Q) {
        Q();
      }
      this.setMasterControl(false);
    };
    j.prototype._spawnHorizontalTargetArea = function (G, V, Q) {
      var N = this._getRowOrColByIndex(G);
      var Y = this._getFirstIndexByRowOrCol(N);
      var W = (this._getColTotalWidth(N) - this.outerCellsMatrix[N].width) * -1;
      if (this._getContentLeftBoundary() > this._leftBoundary) {
        this.target = 0;
      } else if (this._getContentRightBoundary() < this._rightBoundary) {
        this.target = (this.content.width - this._rightBoundary) * -1;
      } else {
        this.target = W + this.layoutSetting.spacingLeft;
      }
      this.content.x = this.target;
      this.contentLayout.paddingLeft = -W;
      this.contentLayout.paddingRight = this.layoutSetting.spacingRight;
      this.contentLayout.updateLayout();
      this._spawnLeftToRight(N, Y, V);
      var q = this.content.x * -1 + W;
      if (q < 0) {
        this._spawnHorizontalPrevious(N - 1, Y - 1, q, Q);
      } else if (Q) {
        Q();
      }
      this.setMasterControl(false);
    };
    j.prototype._spawnVerticalInit = function (G, V, Q, N = true, Y) {
      if (this._dataCount) {
        if (this.isPreCalculateSize && !N) {
          this._precalculateVerticalContent();
          this._spawnVerticalTargetArea(V, Q, Y);
        } else {
          this.lastContentY = this.content.y;
          var W = this.layoutSetting;
          var q = W.spacingX;
          for (var S = W.spacingY, z = W.spacingLeft + W.spacingRight, A = G, M = 0, E = undefined, F = undefined, b = undefined, H = this._dataCount, w = 0; V < H;) {
            F = (E = this._dataSource.getItem(this, V, this._sectionIndex)).width + q;
            b = E.height;
            if (!(Q > 0)) {
              this._resetRowScrollSize();
              this._enqueueReusableItem(E);
              this.setMasterControl(false);
              return;
            }
            if (!this.outerCellsMatrix[A]) {
              this.outerCellsMatrix[A] = {};
              this.outerCellsMatrix[A][M] = null;
              this.outerCellsMatrix[A].itemCount = 0;
              this.outerCellsMatrix[A].height = 0;
              this.outerCellsMatrix[A].freeWidth = this.viewSize.width - z;
            }
            if (this.outerCellsMatrix[A].freeWidth - F >= 0) {
              this.outerCellsMatrix[A].height = Math.max(b, this.outerCellsMatrix[A].height);
              this._setOuterCellData(E, A, M, V);
              this.outerCellsMatrix[A].freeWidth -= F;
              M += 1;
              this.outerCellsMatrix[A].itemCount = M;
              V++;
              this._resetRowScrollSize();
            } else if (this.outerCellsMatrix[A].freeWidth + q - F >= 0) {
              this.outerCellsMatrix[A].height = Math.max(b, this.outerCellsMatrix[A].height);
              this._setOuterCellData(E, A, M, V);
              this.outerCellsMatrix[A].freeWidth -= F;
              M += 1;
              this.outerCellsMatrix[A].itemCount = M;
              V++;
              this._resetRowScrollSize();
            } else {
              var U = (Q -= w) - (this.outerCellsMatrix[A].height + S);
              if (U > 0) {
                Q = U;
              } else if (U + S > 0) {
                Q = U + S;
                w = S;
              } else {
                Q = U;
              }
              this._resetRowScrollSize();
              this._enqueueReusableItem(E);
              A += 1;
              M = 0;
            }
          }
          this.setMasterControl(false);
        }
      } else if (Y) {
        Y();
      }
    };
    j.prototype._spawnHorizontalInit = function (G, V, Q, N, Y) {
      if (this._dataCount) {
        if (this.isPreCalculateSize && !N) {
          this._precalculateHorizontalContent();
          this._spawnHorizontalTargetArea(V, Q, Y);
        } else {
          this.lastContentX = this.content.x * -1;
          for (var W = this.layoutSetting, q = W.spacingX, S = W.spacingY, z = W.spacingTop + W.spacingBottom, A = 0, M = G, E = undefined, F = undefined, b = undefined, H = this._dataCount, w = 0; V < H;) {
            F = (E = this._dataSource.getItem(this, V, this._sectionIndex)).width;
            b = E.height + S;
            if (!(Q > 0)) {
              this._resetColScrollSize();
              this._enqueueReusableItem(E);
              this.setMasterControl(false);
              return;
            }
            if (!this.outerCellsMatrix[M]) {
              this.outerCellsMatrix[M] = {};
              this.outerCellsMatrix[M][A] = {};
              this.outerCellsMatrix[M].itemCount = 0;
              this.outerCellsMatrix[M].width = 0;
              this.outerCellsMatrix[M].freeHeight = this.viewSize.height - z;
            }
            if (this.outerCellsMatrix[M].freeHeight - b >= 0) {
              this.outerCellsMatrix[M].width = Math.max(F, this.outerCellsMatrix[M].width);
              this._setOuterCellData(E, A, M, V);
              this.outerCellsMatrix[M].freeHeight -= b;
              A += 1;
              this.outerCellsMatrix[M].itemCount = A;
              V++;
              this._resetColScrollSize();
            } else if (this.outerCellsMatrix[M].freeHeight + S - b >= 0) {
              this.outerCellsMatrix[M].width = Math.max(F, this.outerCellsMatrix[M].width);
              this._setOuterCellData(E, A, M, V);
              this.outerCellsMatrix[M].freeHeight -= b;
              A += 1;
              this.outerCellsMatrix[M].itemCount = A;
              V++;
              this._resetColScrollSize();
            } else {
              var U = (Q -= w) - (this.outerCellsMatrix[M].width + q);
              if (U > 0) {
                Q = U;
              } else if (U + q > 0) {
                Q = U + q;
                w = q;
              } else {
                Q = U;
              }
              this._resetColScrollSize();
              this._enqueueReusableItem(E);
              M += 1;
              A = 0;
            }
          }
          this.setMasterControl(false);
        }
      } else if (Y) {
        Y();
      }
    };
    j.prototype._removeVerticalPrevious = function (G, V) {
      var Q = this.layoutSetting.spacingLeft + this.layoutSetting.spacingRight;
      var N = this.outerCellsMatrix[G].itemCount - 1;
      while (V > 0) {
        if (N >= 0) {
          if (this._removeCellAction) {
            this._removeCellAction();
          }
          this._putOuterCellNode(this.outerCellsMatrix[G][N]);
          N--;
        } else {
          this.contentLayout.paddingTop += this.outerCellsMatrix[G].height + this.layoutSetting.spacingY;
          this.outerCellsMatrix[G].freeWidth = this.viewSize.width - Q;
          if ((G += 1) >= this.outerCellsMatrix.length - 1 || !this.outerCellsMatrix[G][0]) {
            return;
          }
          N = this.outerCellsMatrix[G].itemCount - 1;
          V = this.content.y - this.contentLayout.paddingTop - this.outerCellsMatrix[G].height;
        }
      }
    };
    j.prototype._removeHorizontalPrevious = function (G, V) {
      var Q = this.layoutSetting.spacingTop + this.layoutSetting.spacingBottom;
      var N = this.outerCellsMatrix[G].itemCount - 1;
      while (V > 0) {
        if (N >= 0) {
          this._putOuterCellNode(this.outerCellsMatrix[G][N]);
          N--;
        } else {
          this.contentLayout.paddingLeft += this.outerCellsMatrix[G].width + this.layoutSetting.spacingX;
          this.outerCellsMatrix[G].freeHeight = this.viewSize.height - Q;
          if ((G += 1) >= this.outerCellsMatrix.length - 1 || !this.outerCellsMatrix[G][0]) {
            return;
          }
          N = this.outerCellsMatrix[G].itemCount - 1;
          V = this.content.x * -1 - this.contentLayout.paddingLeft - this.outerCellsMatrix[G].width;
        }
      }
    };
    j.prototype._removeVerticalNext = function (G, V, Q) {
      for (var N = this.layoutSetting.spacingLeft + this.layoutSetting.spacingRight, Y = this.outerCellsMatrix[G].itemCount - 1; V < 0;) {
        if (Y >= 0) {
          if (this._removeCellAction) {
            this._removeCellAction();
          }
          this._putOuterCellNode(this.outerCellsMatrix[G][Y]);
          Y--;
        } else {
          this.outerCellsMatrix[G].freeWidth = this.viewSize.width - N;
          if ((G -= 1) <= 0 || !this.outerCellsMatrix[G][0]) {
            return;
          }
          Y = this.outerCellsMatrix[G].itemCount - 1;
          Q = this._getRowTotalHeight(G) - this.viewSize.height;
          V = this.content.y - Q + this.layoutSetting.spacingY + this.outerCellsMatrix[G].height;
        }
      }
    };
    j.prototype._removeHorizontalNext = function (G, V, Q) {
      var N = this.layoutSetting.spacingTop + this.layoutSetting.spacingBottom;
      var Y = this.outerCellsMatrix[G].itemCount - 1;
      while (V < 0) {
        if (Y >= 0) {
          if (this._removeCellAction) {
            this._removeCellAction();
          }
          this._putOuterCellNode(this.outerCellsMatrix[G][Y]);
          Y--;
        } else {
          this.outerCellsMatrix[G].freeHeight = this.viewSize.height - N;
          if ((G -= 1) <= 0 || !this.outerCellsMatrix[G][0]) {
            return;
          }
          Y = this.outerCellsMatrix[G].itemCount - 1;
          Q = this._getColTotalWidth(G) - this.viewSize.width;
          V = this.content.x * -1 - Q + this.layoutSetting.spacingX + this.outerCellsMatrix[G].width;
        }
      }
    };
    j.prototype.removeUselessItems = function (G, V) {
      this._setDataCount(G);
      if (this.vertical) {
        for (var Q = this.content.children.length - 1; Q >= 0; Q--) {
          if (!((Y = this.content.children[Q]).zIndex > G - 1)) {
            this.reloadCurrentData();
            var N = Y.col + 1;
            this.outerCellsMatrix[Y.row].itemCount = N;
            this.outerCellsMatrix.splice(Y.row + 1, this.outerCellsMatrix.length - 1);
            this._resetRowScrollSize();
            this.setMasterControl(false);
            if (V) {
              V();
            }
            break;
          }
          this.outerCellsMatrix[Y.row].freeWidth += this.outerCellsMatrix[Y.row][Y.col].width + this.layoutSetting.spacingX;
          this._putOuterCellNode(Y);
          if (Q === 0) {
            this._resetRowScrollSize();
            this.setMasterControl(false);
            if (V) {
              V();
            }
          }
        }
      } else {
        for (Q = this.content.children.length - 1; Q >= 0; Q--) {
          var Y;
          if (!((Y = this.content.children[Q]).zIndex >= G - 1)) {
            this.reloadCurrentData();
            N = Y.row + 1;
            this.outerCellsMatrix[Y.col].itemCount = N;
            this.outerCellsMatrix.splice(Y.col + 1, this.outerCellsMatrix.length - 1);
            this._resetColScrollSize();
            this.setMasterControl(false);
            if (V) {
              V();
            }
            break;
          }
          this.outerCellsMatrix[Y.col].freeHeight += this.outerCellsMatrix[Y.col][Y.row].height + this.layoutSetting.spacingY;
          this._putOuterCellNode(Y);
          if (Q === 0) {
            this._resetRowScrollSize();
            this.setMasterControl(false);
            if (V) {
              V();
            }
          }
        }
      }
    };
    j.prototype._spawnVerticalNext = function (G, V, Q, N) {
      this.lastContentY = this.content.y;
      for (var Y, W, q, S = this.layoutSetting.spacingLeft + this.layoutSetting.spacingRight, z = G, f = V, A = this._dataCount; Q < A;) {
        W = (Y = this._dataSource.getItem(this, Q, this._sectionIndex)).width + this.layoutSetting.spacingX;
        q = Y.height;
        if (!(N > 0)) {
          this._resetRowScrollSize();
          this._enqueueReusableItem(Y);
          return;
        }
        if (!this.outerCellsMatrix[z]) {
          this.outerCellsMatrix[z] = {};
          this.outerCellsMatrix[z][f] = {};
          this.outerCellsMatrix[z].itemCount = 0;
          this.outerCellsMatrix[z].height = 0;
          this.outerCellsMatrix[z].freeWidth = this.viewSize.width - S;
        }
        if (this.outerCellsMatrix[z].freeWidth - W >= 0) {
          if (this._spawnCellAction) {
            this._spawnCellAction();
          }
          this.outerCellsMatrix[z].height = Math.max(q, this.outerCellsMatrix[z].height);
          this._setOuterCellData(Y, z, f, Q);
          this.outerCellsMatrix[z].freeWidth -= W;
          f += 1;
          this.outerCellsMatrix[z].itemCount = f;
          if (++Q >= A) {
            this._resetRowScrollSize();
          }
        } else if (this.outerCellsMatrix[z].freeWidth + this.layoutSetting.spacingX - W >= 0) {
          if (this._spawnCellAction) {
            this._spawnCellAction();
          }
          this.outerCellsMatrix[z].height = Math.max(q, this.outerCellsMatrix[z].height);
          this._setOuterCellData(Y, z, f, Q);
          this.outerCellsMatrix[z].freeWidth -= W;
          f += 1;
          this.outerCellsMatrix[z].itemCount = f;
          Q++;
          this._resetRowScrollSize();
        } else {
          var M = this.content.children[this.content.children.length - 1].row;
          var E = this._getRowTotalHeight(M) - this.viewSize.height;
          N = this.content.y - E;
          this._resetRowScrollSize();
          this._enqueueReusableItem(Y);
          z += 1;
          f = 0;
        }
      }
    };
    j.prototype._spawnHorizontalNext = function (G, V, Q, N) {
      this.lastContentY = this.content.x * -1;
      var Y;
      var W;
      var q;
      var S = this.layoutSetting.spacingTop + this.layoutSetting.spacingBottom;
      var z = G;
      var f = V;
      for (var A = this._dataCount; Q < A;) {
        W = (Y = this._dataSource.getItem(this, Q, this._sectionIndex)).width;
        q = Y.height + this.layoutSetting.spacingY;
        if (!(N > 0)) {
          this._resetColScrollSize();
          this._enqueueReusableItem(Y);
          return;
        }
        if (!this.outerCellsMatrix[f]) {
          this.outerCellsMatrix[f] = {};
          this.outerCellsMatrix[f][z] = {};
          this.outerCellsMatrix[f].itemCount = 0;
          this.outerCellsMatrix[f].width = 0;
          this.outerCellsMatrix[f].freeHeight = this.viewSize.height - S;
        }
        if (this.outerCellsMatrix[f].freeHeight - q >= 0) {
          if (this._spawnCellAction) {
            this._spawnCellAction();
          }
          this.outerCellsMatrix[f].width = Math.max(W, this.outerCellsMatrix[f].width);
          this._setOuterCellData(Y, z, f, Q);
          this.outerCellsMatrix[f].freeHeight -= q;
          z += 1;
          this.outerCellsMatrix[f].itemCount = z;
          if (++Q >= A) {
            this._resetColScrollSize();
          }
        } else if (this.outerCellsMatrix[f].freeHeight + this.layoutSetting.spacingY - q >= 0) {
          if (this._spawnCellAction) {
            this._spawnCellAction();
          }
          this.outerCellsMatrix[f].width = Math.max(W, this.outerCellsMatrix[f].width);
          this._setOuterCellData(Y, z, f, Q);
          this.outerCellsMatrix[f].freeHeight -= q;
          z += 1;
          this.outerCellsMatrix[f].itemCount = z;
          Q++;
          this._resetColScrollSize();
        } else {
          var M = this.content.children[this.content.children.length - 1].col;
          var E = this._getColTotalWidth(M) - this.viewSize.width;
          N = this.content.x * -1 - E;
          this._resetColScrollSize();
          this._enqueueReusableItem(Y);
          f += 1;
          z = 0;
        }
      }
    };
    j.prototype._spawnVerticalPrevious = function (G, V, Q, N) {
      if (!(G < 0)) {
        for (var Y, W, q, S = G, z = this.outerCellsMatrix[S].itemCount - 1; V >= 0;) {
          W = (Y = this._dataSource.getItem(this, V, this._sectionIndex)).width + this.layoutSetting.spacingX;
          q = Y.height;
          if (!(Q < 0)) {
            this._resetRowScrollSize();
            this._enqueueReusableItem(Y);
            if (N) {
              N();
            }
            return;
          }
          if (z >= 0) {
            if (this._spawnCellAction) {
              this._spawnCellAction();
            }
            this.outerCellsMatrix[S].height = Math.max(q, this.outerCellsMatrix[S].height);
            this._setOuterCellData(Y, S, z, V);
            this.outerCellsMatrix[S].freeWidth -= W;
            if (V === 0) {
              this.contentLayout.paddingTop -= this.outerCellsMatrix[S].height + this.layoutSetting.spacingY;
              Q = this.content.y - this.contentLayout.paddingTop;
            }
            z -= 1;
            V--;
          } else {
            this.contentLayout.paddingTop -= this.outerCellsMatrix[S].height + this.layoutSetting.spacingY;
            Q = this.content.y - this.contentLayout.paddingTop;
            this._resetRowScrollSize();
            this._enqueueReusableItem(Y);
            S -= 1;
            z = this.outerCellsMatrix[S].itemCount - 1;
          }
        }
        if (N) {
          N();
        }
      }
    };
    j.prototype._spawnHorizontalPrevious = function (G, V, Q, N) {
      if (!(G < 0)) {
        for (var Y, W, q, S = this.content.x * -1, z = G, f = this.outerCellsMatrix[z].itemCount - 1; V >= 0;) {
          W = (Y = this._dataSource.getItem(this, V, this._sectionIndex)).width;
          q = Y.height + this.layoutSetting.spacingY;
          if (!(Q < 0)) {
            this._resetColScrollSize();
            this._enqueueReusableItem(Y);
            if (N) {
              N();
            }
            return;
          }
          if (f >= 0) {
            if (this._spawnCellAction) {
              this._spawnCellAction();
            }
            this.outerCellsMatrix[z].width = Math.max(W, this.outerCellsMatrix[z].width);
            this._setOuterCellData(Y, f, z, V);
            this.outerCellsMatrix[z].freeHeight -= q;
            if (V === 0) {
              this.contentLayout.paddingLeft -= this.outerCellsMatrix[z].width + this.layoutSetting.spacingX;
              Q = S - this.contentLayout.paddingLeft;
            }
            f -= 1;
            V--;
          } else {
            this.contentLayout.paddingLeft -= this.outerCellsMatrix[z].width + this.layoutSetting.spacingX;
            Q = S - this.contentLayout.paddingLeft;
            this._resetColScrollSize();
            this._enqueueReusableItem(Y);
            z -= 1;
            f = this.outerCellsMatrix[z].itemCount - 1;
          }
        }
        if (N) {
          N();
        }
      }
    };
    j.prototype._resetRowScrollSize = function () {
      var G = this.layoutSetting.spacingTop + this.layoutSetting.spacingBottom;
      for (var V = 0; V < this.outerCellsMatrix.length; V++) {
        G += this.outerCellsMatrix[V].height;
        if (V !== this.outerCellsMatrix.length - 1) {
          G += this.layoutSetting.spacingY;
        } else if (this.content.height !== G) {
          this.content.height = G;
        }
      }
    };
    j.prototype._resetColScrollSize = function () {
      var G = this.layoutSetting.spacingLeft + this.layoutSetting.spacingRight;
      for (var V = 0; V < this.outerCellsMatrix.length; V++) {
        G += this.outerCellsMatrix[V].width;
        if (V !== this.outerCellsMatrix.length - 1) {
          G += this.layoutSetting.spacingX;
        } else if (this.content.width !== G) {
          this.content.width = G;
        }
      }
    };
    j.prototype._setOuterCellData = function (G, V, Q, N) {
      var Y = this._getOuterCellNode();
      if (this.vertical) {
        this.outerCellsMatrix[V][Q] = Y;
      } else {
        this.outerCellsMatrix[Q][V] = Y;
      }
      this.content.addChild(Y);
      Y.addChild(G);
      Y.row = V;
      Y.col = Q;
      Y.zIndex = N;
      Y.width = G.width;
      Y.height = G.height;
      this.content.sortAllChildren();
    };
    j.prototype.dequeueReusableItem = function (G) {
      var V;
      var Q = this.nodePools[G];
      if (Q) {
        if (!(V = Q.get())) {
          var N = this.templates[G];
          V = cc.instantiate(N);
        }
        V.lv_type = G;
      }
      return V;
    };
    j.prototype._enqueueReusableItem = function (G) {
      var V;
      var Q = G.lv_type;
      if (Q) {
        V = this.nodePools[Q];
      }
      if (V) {
        V.put(G);
      }
    };
    j.prototype._reloadReduceData = function (G) {
      if (this.vertical) {
        var V = this._getRowOrColByIndex(this.currentIndex);
        if (this.currentIndex <= G - 1) {
          this.removeUselessItems(G);
        } else if (V !== null) {
          this.isReducingData = true;
          this.newDataCount = G;
          this.setMasterControl(true);
          this.scrollTo(0);
        } else {
          this.removeUselessItems(G);
        }
      } else {
        var Q = this._getRowOrColByIndex(this.currentIndex);
        if (this.currentIndex < G - 1) {
          this.removeUselessItems(G);
        } else if (Q !== null) {
          this.isReducingData = true;
          this.stopAutoScroll();
          this.setMasterControl(true);
          this.scrollTo(0);
        } else {
          this.removeUselessItems(G);
        }
      }
    };
    j.prototype._reloadAddData = function () {
      if (this.vertical) {
        if (!this.content.children.length) {
          this._spawnVerticalInit(0, 0, this.viewSize.height);
          return;
        }
        var G = (q = this.content.children[this.content.children.length - 1]).row;
        var V = G - 1;
        if (V < 0) {
          V = 0;
        }
        var Q = this._getRowTotalHeight(V) - this.viewSize.height;
        var N = q.zIndex;
        var Y = this.content.y - Q;
        var W = (f = this._dataSource.getItem(this, N + 1, this._sectionIndex)).width + this.layoutSetting.spacingX;
        this._enqueueReusableItem(f);
        if (this.outerCellsMatrix[G].freeWidth - W >= 0) {
          this._spawnVerticalNext(G, this.outerCellsMatrix[G].itemCount, N + 1, Y);
        } else if (this.outerCellsMatrix[G].freeWidth + this.layoutSetting.spacingX - W >= 0) {
          this._spawnVerticalNext(G, this.outerCellsMatrix[G].itemCount, N + 1, Y);
        }
        this.setMasterControl(false);
      } else {
        if (!this.content.children.length) {
          this._spawnHorizontalInit(0, 0, this.viewSize.width);
          return;
        }
        var q;
        var S = (q = this.content.children[this.content.children.length - 1]).col;
        var z = S - 1;
        if (z < 0) {
          z = 0;
        }
        Q = this._getColTotalWidth(z) - this.viewSize.width;
        var f;
        var A = q.zIndex;
        var M = this.content.x * -1 - Q;
        var E = (f = this._dataSource.getItem(this, A + 1, this._sectionIndex)).height + this.layoutSetting.spacingY;
        this._enqueueReusableItem(f);
        if (this.outerCellsMatrix[S].freeHeight - E >= 0) {
          this._spawnHorizontalNext(this.outerCellsMatrix[A].itemCount, S, A + 1, M);
        } else if (this.outerCellsMatrix[S].freeWidth + this.layoutSetting.spacingX - E >= 0) {
          this._spawnHorizontalNext(this.outerCellsMatrix[S].itemCount, S, A + 1, M);
        }
        this.setMasterControl(false);
      }
    };
    j.prototype.reloadCurrentData = function (G) {
      if (this.content.children.length) {
        for (var V = 0; V < this.content.children.length; V++) {
          this._enqueueReusableItem(this.content.children[V].children[0]);
          var Q = this._dataSource.getItem(this, this.content.children[V].zIndex, this._sectionIndex);
          this.content.children[V].addChild(Q);
          this.content.sortAllChildren();
        }
      }
      if (G) {
        G();
      }
    };
    j.prototype._putOuterCellNode = function (G) {
      var V = G;
      if (V !== null && V.row !== null && V.col !== null) {
        if (this.vertical) {
          this.outerCellsMatrix[V.row][V.col] = null;
        } else {
          this.outerCellsMatrix[V.col][V.row] = null;
        }
        if (V.children.length) {
          this._enqueueReusableItem(V.children[0]);
        }
        this._nodePool.put(V);
        this.content.sortAllChildren();
      }
    };
    j.prototype._getOuterCellNode = function () {
      if (this._nodePool) {
        if (this._nodePool.size()) {
          return this._nodePool.get();
        } else {
          return new cc.Node();
        }
      } else {
        this._nodePool = new cc.NodePool();
        return new cc.Node();
      }
    };
    j.prototype._lerp1D = function (G, V, Q, N = 1, Y) {
      if (L(cc.v2(G, 0), cc.v2(V, 0)) <= 1) {
        this._lerpDone(Y);
        return V;
      }
      this._dispatchEvent("scrolling");
      var W = G + (Q *= N) * (V - G);
      if (G >= V) {
        if (W <= V) {
          this._lerpDone(Y);
          W = V;
        }
      } else if (W >= V) {
        this._lerpDone(Y);
        W = V;
      }
      return W;
    };
    j.prototype._lerpDone = function (G) {
      var V = this;
      if (this.isReducingData) {
        this.isReducingData = false;
        this.removeUselessItems(this.newDataCount, function () {
          V.setMasterControl(false);
          V.setSnapDone(true);
          V.stopAutoScroll();
          V._dispatchEvent("scroll-ended");
          if (V.currentIndex === null) {
            var N = V._getNearestItem();
            V.currentIndex = V.outerCellsMatrix[N][0].zIndex;
          }
          if (V.snapFinish) {
            V.snapFinish(V.currentIndex);
          }
          if (G) {
            G();
          }
        });
      } else {
        this.setMasterControl(false);
        this.setSnapDone(true);
        this.stopAutoScroll();
        this._dispatchEvent("scroll-ended");
        if (this.currentIndex === null) {
          var Q = this._getNearestItem();
          this.currentIndex = this.outerCellsMatrix[Q][0].zIndex;
        }
        if (this.snapFinish) {
          this.snapFinish(this.currentIndex);
        }
        if (G) {
          G();
        }
      }
    };
    j.prototype._getFirstIndexByRowOrCol = function (G) {
      var V = 0;
      for (var Q = 0; Q <= G; Q++) {
        if (G === Q) {
          return V;
        }
        V += this.outerCellsMatrix[Q].itemCount;
      }
    };
    j.prototype._getRowOrColByIndex = function (G) {
      for (var V = this.outerCellsMatrix.length - 1, Q = 0; Q <= V; Q++) {
        if (!((G -= this.outerCellsMatrix[Q].itemCount) >= 0)) {
          return Q;
        }
        if (Q === V) {
          return null;
        }
      }
    };
    j.prototype.destroy = function () {
      this._unbindListener();
      u.prototype.destroy.call(this);
    };
    j.prototype._bindListener = function () {
      this.content.on(cc.Node.EventType.POSITION_CHANGED, this._recycle, this);
      if (this.autoSnap) {
        this.node.on("scroll-ended", this._autoSnapTo, this);
      }
      this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
    };
    j.prototype._unbindListener = function () {
      this.content.off(cc.Node.EventType.POSITION_CHANGED, this._recycle, this);
      if (this.autoSnap) {
        this.node.off("scroll-ended", this._autoSnapTo, this);
      }
      this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChanged, this);
    };
    j.prototype._resetScrollView = function () {
      this._topBoundary = 0;
      this._bottomBoundary = 0;
      this._leftBoundary = 0;
      this._rightBoundary = 0;
      this._touchMoveDisplacements = [];
      this._touchMoveTimeDeltas = [];
      this._touchMovePreviousTimestamp = 0;
      this._touchMoved = false;
      this._autoScrolling = false;
      this._autoScrollAttenuate = false;
      this._autoScrollStartPosition = cc.v2(0, 0);
      this._autoScrollTargetDelta = cc.v2(0, 0);
      this._autoScrollTotalTime = 0;
      this._autoScrollAccumulatedTime = 0;
      this._autoScrollCurrentlyOutOfBoundary = false;
      this._autoScrollBraking = false;
      this._autoScrollBrakingStartPosition = cc.v2(0, 0);
      this._outOfBoundaryAmount = cc.v2(0, 0);
      this._outOfBoundaryAmountDirty = true;
      this._stopMouseWheel = false;
      this._mouseWheelEventElapsedTime = 0;
      this._isScrollEndedWithThresholdEventFired = false;
      this._scrollEventEmitMask = 0;
      this._isBouncing = false;
      this._scrolling = false;
    };
    j.prototype.update = function (G) {
      if (!this.pauseUpdate) {
        if (this.snapPause) {
          this.setSnapDone(true);
          this.stopAutoScroll();
          return;
        }
        if (!this.snapDone) {
          if (!this.content.children.length) {
            this.content.setPosition(cc.v2(0, 0));
            this.setSnapDone(true);
            return;
          }
          if (!this.suddenStopIndex || !(this.content.children[this.content.children.length - 1].zIndex >= this.suddenStopIndex)) {
            this.stopAutoScroll();
            if (this.vertical) {
              this.content.y = this._lerp1D(this.content.y, this.target, G, this.lerpSpeed);
            } else {
              this.content.x = this._lerp1D(this.content.x * -1, this.target, G, this.lerpSpeed) * -1;
            }
            return;
          }
          this.setMasterControl(true);
          this.scrollTo(this.suddenStopIndex);
          this.suddenStopIndex = null;
        }
        u.prototype.update.call(this, G);
      }
    };
    j.prototype._onTouchBegan = function (G, V) {
      this.elastic = this.originalElastic;
      this.touchPos = G.touch.getLocation();
      if (!this._masterControl && this.content.children.length) {
        this.unschedule(this._checkMouseWheel);
        this._stopMouseWheel = false;
        this.snapPause = true;
        this.setSnapDone(true);
        u.prototype._onTouchBegan.call(this, G, V);
      }
    };
    j.prototype._onTouchMoved = function (G, V) {
      this.elastic = this.originalElastic;
      if (!this._masterControl && this.content.children.length) {
        if (this.vertical) {
          this._verticalPullAction(G);
        } else {
          this._horizontalPullAction(G);
        }
        if (!this.pauseUpdate) {
          u.prototype._onTouchMoved.call(this, G, V);
        }
      }
    };
    j.prototype._mouseWheelVertical = function () {
      if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() > 0) {
        if (this._pullingUpAction && this.pullDir === 2) {
          this._pullingUpAction(0);
        }
        if (this._pullingDownAction && this._getContentTopBoundary() <= this._topBoundary) {
          if (!this.pauseUpdate) {
            this.beginPullPos = cc.v2(0, this._mouseWheelEvent.getScrollY());
          }
          if ((G = this.beginPullPos.y - this._mouseWheelEvent.getScrollY()) > 0) {
            G = 0;
          }
          this._pullingDownAction(Math.abs(G));
          this.pauseUpdate = true;
          this.pullDir = 1;
        }
        if (this.content.children[0].zIndex > 0) {
          this.elastic = true;
        }
      } else if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() < 0) {
        var G;
        if (this._pullingDownAction && this.pullDir === 1) {
          this._pullingDownAction(0);
        }
        if (this._pullingUpAction && Math.round(this._getContentBottomBoundary()) >= Math.round(this._bottomBoundary)) {
          if (!this.content.children.length || this.content.children[this.content.children.length - 1].zIndex === this._dataCount - 1) {
            if (!this.pauseUpdate) {
              this.beginPullPos = cc.v2(0, this._mouseWheelEvent.getScrollY());
            }
            if ((G = this.beginPullPos.y - this._mouseWheelEvent.getScrollY()) < 0) {
              G = 0;
            }
            this._pullingUpAction(G);
            this.pauseUpdate = true;
            this.pullDir = 2;
          }
        }
        if (this.content.children[this.content.children.length - 1].zIndex < this._dataCount - 1) {
          this.elastic = true;
        }
      }
    };
    j.prototype._mouseWheelHorizontal = function () {
      if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() > 0) {
        if (this._pullingUpAction && this.pullDir === 2) {
          this._pullingRightAction(0);
        }
        if (this._pullingLeftAction && this._getContentRightBoundary() <= this._rightBoundary) {
          if (!this.pauseUpdate) {
            this.beginPullPos = cc.v2(this._mouseWheelEvent.getScrollY(), 0);
          }
          if ((G = this.beginPullPos.x - this._mouseWheelEvent.getScrollY()) > 0) {
            G = 0;
          }
          this._pullingLeftAction(Math.abs(G));
          this.pauseUpdate = true;
          this.pullDir = 1;
        }
        if (this.content.children[0].zIndex > 0) {
          this.elastic = true;
        }
      } else if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() < 0) {
        var G;
        if (this._pullingDownAction && this.pullDir === 1) {
          this._pullingLeftAction(0);
        }
        if (this._pullingRightAction && this._getContentLeftBoundary() >= this._leftBoundary) {
          if (!this.content.children.length || this.content.children[this.content.children.length - 1].zIndex === this._dataCount - 1) {
            if (!this.pauseUpdate) {
              this.beginPullPos = cc.v2(this._mouseWheelEvent.getScrollY(), 0);
            }
            if ((G = this.beginPullPos.x - this._mouseWheelEvent.getScrollY()) < 0) {
              G = 0;
            }
            this._pullingRightAction(G);
            this.pauseUpdate = true;
            this.pullDir = 2;
          }
        }
        if (this.content.children[this.content.children.length - 1].zIndex < this._dataCount - 1) {
          this.elastic = true;
        }
      }
    };
    j.prototype._verticalPullAction = function (G) {
      if (this.touchPos.y > G.touch.getLocation().y) {
        if (this._pullingUpAction && this.pullDir === 2) {
          this._pullingUpAction(0);
        }
        if (this._pullingDownAction && this._getContentTopBoundary() <= this._topBoundary) {
          if (!this.pauseUpdate) {
            this.beginPullPos = G.touch.getLocation();
          }
          if ((V = this.beginPullPos.y - G.touch.getLocation().y) < 0) {
            V = 0;
          }
          this._pullingDownAction(V);
          this.pauseUpdate = true;
          this.pullDir = 1;
        }
        if (this.content.children[0].zIndex > 0) {
          this.elastic = true;
        }
      } else if (this.touchPos.y < G.touch.getLocation().y) {
        var V;
        if (this._pullingDownAction && this.pullDir === 1) {
          this._pullingDownAction(0);
        }
        if (this._pullingUpAction && Math.round(this._getContentBottomBoundary()) >= Math.round(this._bottomBoundary)) {
          if (!this.content.children.length || this.content.children[this.content.children.length - 1].zIndex === this._dataCount - 1) {
            if (!this.pauseUpdate) {
              this.beginPullPos = G.touch.getLocation();
            }
            if ((V = this.beginPullPos.y - G.touch.getLocation().y) > 0) {
              V = 0;
            }
            this._pullingUpAction(Math.abs(V));
            this.pauseUpdate = true;
            this.pullDir = 2;
          }
        }
        if (this.content.children[this.content.children.length - 1].zIndex < this._dataCount - 1) {
          this.elastic = true;
        }
      }
    };
    j.prototype._horizontalPullAction = function (G) {
      if (this.touchPos.x > G.touch.getLocation().x) {
        if (this._pullingRightAction && this.pullDir === 1) {
          this._pullingRightAction(0);
        }
        if (this._pullingLeftAction && this._getContentRightBoundary() <= this._rightBoundary) {
          if (!this.content.children.length || this.content.children[this.content.children.length - 1].zIndex === this._dataCount - 1) {
            if (!this.pauseUpdate) {
              this.beginPullPos = G.touch.getLocation();
            }
            if ((V = this.beginPullPos.x - G.touch.getLocation().x) < 0) {
              V = 0;
            }
            this._pullingLeftAction(V);
            this.pauseUpdate = true;
            this.pullDir = 2;
          }
        }
        if (this.content.children[this.content.children.length - 1].zIndex < this._dataCount - 1) {
          this.elastic = true;
        }
      } else if (this.touchPos.x < G.touch.getLocation().x) {
        var V;
        if (this._pullingLeftAction && this.pullDir === 2) {
          this._pullingLeftAction(0);
        }
        if (this._pullingRightAction && this._getContentLeftBoundary() >= this._leftBoundary) {
          if (!this.pauseUpdate) {
            this.beginPullPos = G.touch.getLocation();
          }
          if ((V = this.beginPullPos.x - G.touch.getLocation().x) > 0) {
            V = 0;
          }
          this._pullingRightAction(Math.abs(V));
          this.pauseUpdate = true;
          this.pullDir = 1;
        }
        if (this.content.children[0].zIndex > 0) {
          this.elastic = true;
        }
      }
    };
    j.prototype._onTouchEnded = function (G, V) {
      if (L(this.touchPos, G.touch.getLocation()) >= 50) {
        G.stopPropagationImmediate();
      }
      if (!this._masterControl && this.content.children.length) {
        if (this.pauseUpdate) {
          if (this.vertical) {
            var Q = this.beginPullPos.y - G.touch.getLocation().y;
            if (this._pullDownEndAction && this.pullDir === 1) {
              if (Q < 0) {
                Q = 0;
              }
              this._pullDownEndAction(Q);
            } else if (this._pullUpEndAction && this.pullDir === 2) {
              if (Q > 0) {
                Q = 0;
              }
              this._pullUpEndAction(Math.abs(Q));
            }
          } else {
            Q = this.beginPullPos.x - G.touch.getLocation().x;
            if (this._pullRightEndAction && this.pullDir === 1) {
              if (Q > 0) {
                Q = 0;
              }
              this._pullRightEndAction(Math.abs(Q));
            } else if (this._pullLeftEndAction && this.pullDir === 2) {
              if (Q < 0) {
                Q = 0;
              }
              this._pullLeftEndAction(Q);
            }
          }
          this.pullDir = null;
        }
        this.snapPause = false;
        this.requestSnap = true;
        u.prototype._onTouchEnded.call(this, G, V);
      }
    };
    j.prototype._onTouchCancelled = function (G, V) {
      if (L(this.touchPos, G.touch.getLocation()) >= 50) {
        G.stopPropagationImmediate();
      }
      if (!this._masterControl && this.content.children.length) {
        if (this.pauseUpdate) {
          if (this.vertical) {
            var Q = this.beginPullPos.y - G.touch.getLocation().y;
            if (this._pullDownEndAction && this.pullDir === 1) {
              if (Q < 0) {
                Q = 0;
              }
              this._pullDownEndAction(Q);
            } else if (this._pullUpEndAction && this.pullDir === 2) {
              if (Q > 0) {
                Q = 0;
              }
              this._pullUpEndAction(Math.abs(Q));
            }
          } else {
            Q = this.beginPullPos.x - G.touch.getLocation().x;
            if (this._pullRightEndAction && this.pullDir === 1) {
              if (Q > 0) {
                Q = 0;
              }
              this._pullRightEndAction(Math.abs(Q));
            } else if (this._pullLeftEndAction && this.pullDir === 2) {
              if (Q < 0) {
                Q = 0;
              }
              this._pullLeftEndAction(Q);
            }
          }
          this.pullDir = null;
        }
        this.snapPause = false;
        this.requestSnap = true;
        u.prototype._onTouchCancelled.call(this, G, V);
      }
    };
    j.prototype._onMouseWheelStart = function () {
      this.snapPause = true;
      this.setSnapDone(true);
    };
    j.prototype._onMouseWheelEnd = function () {
      if (!this._masterControl) {
        if (this.pauseUpdate) {
          if (this.vertical) {
            var G = this.beginPullPos.y - this._mouseWheelEvent.getScrollY();
            if (this._pullDownEndAction && this.pullDir === 1) {
              if (G > 0) {
                G = 0;
              }
              this._pullDownEndAction(Math.abs(G));
            } else if (this._pullUpEndAction && this.pullDir === 2) {
              if (G < 0) {
                G = 0;
              }
              this._pullUpEndAction(G);
            }
          } else {
            G = this.beginPullPos.x - this._mouseWheelEvent.getScrollY();
            if (this._pullRightEndAction && this.pullDir === 1) {
              if (G > 0) {
                G = 0;
              }
              this._pullRightEndAction(Math.abs(G));
            } else if (this._pullLeftEndAction && this.pullDir === 2) {
              if (G < 0) {
                G = 0;
              }
              this._pullLeftEndAction(G);
            }
          }
          this.pullDir = null;
        }
        this.snapPause = false;
        this.requestSnap = true;
        if (this.autoSnap) {
          this._autoSnapTo();
        }
        this._mouseWheelEvent = undefined;
      }
    };
    j.prototype._onMouseWheel = function (G, V) {
      this.elastic = this.originalElastic;
      if (!this._masterControl && this.content.children.length && this.enabledInHierarchy && !this._hasNestedViewGroup(G, V)) {
        this._mouseWheelEvent = G;
        var Q = cc.v2(0, 0);
        if (this.vertical) {
          Q = cc.v2(0, G.getScrollY() * -0.1);
          this._mouseWheelVertical();
        } else if (this.horizontal) {
          Q = cc.v2(G.getScrollY() * -0.1, 0);
          this._mouseWheelHorizontal();
        }
        this._mouseWheelEventElapsedTime = 0;
        this._processDeltaMove(Q);
        if (!this._stopMouseWheel) {
          this._handlePressLogic();
          this.schedule(this._checkMouseWheel, 1 / 60);
          this._stopMouseWheel = true;
          this._onMouseWheelStart();
        }
        this._stopPropagationIfTargetIsMe(G);
      }
    };
    j.prototype._checkMouseWheel = function (G) {
      if (!this._masterControl) {
        var V = this._getHowMuchOutOfBoundary();
        if (!x(V, cc.v2(0, 0), 0.0001)) {
          this._processInertiaScroll();
          this.unschedule(this._checkMouseWheel);
          this._stopMouseWheel = false;
          this._onMouseWheelEnd();
          return;
        }
        this._mouseWheelEventElapsedTime += G;
        if (this._mouseWheelEventElapsedTime > 0.1) {
          this._onScrollBarTouchEnded();
          this.unschedule(this._checkMouseWheel);
          this._stopMouseWheel = false;
          this._onMouseWheelEnd();
        }
      }
    };
    j.prototype._processAutoScrolling = function (G) {
      var V = this._isNecessaryAutoScrollBrake();
      var Q = V ? 0.05 : 1;
      this._autoScrollAccumulatedTime += G * (1 / Q);
      var N;
      var Y = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
      if (this._autoScrollAttenuate) {
        N = Y;
        Y = (N -= 1) * N * N * N * N + 1;
      }
      var W = this._autoScrollStartPosition.add(this._autoScrollTargetDelta.mul(Y));
      var q = Y > 0.5;
      if (Math.abs(Y - 1) <= this.getScrollEndedEventTiming() && !this._isScrollEndedWithThresholdEventFired) {
        this._dispatchEvent("scroll-ended-with-threshold");
        this._isScrollEndedWithThresholdEventFired = true;
      }
      if (this.elastic) {
        var S = W.sub(this._autoScrollBrakingStartPosition);
        if (V) {
          S = S.mul(Q);
        }
        W = this._autoScrollBrakingStartPosition.add(S);
      } else {
        var z = W.sub(this.getContentPosition());
        var f = this._getHowMuchOutOfBoundary(z);
        if (!f.fuzzyEquals(cc.v2(0, 0), 0.0001)) {
          W = W.add(f);
          q = true;
        }
      }
      if (q) {
        this._autoScrolling = false;
      }
      var A = W.sub(this.getContentPosition());
      this._moveContent(this._clampDelta(A), q);
      this._dispatchEvent("scrolling");
      if (!this._autoScrolling) {
        this._isBouncing = false;
        this._scrolling = false;
        this._dispatchEvent("scroll-ended");
      }
    };
    j.prototype._hasNestedViewGroup = function () {
      return false;
    };
    j.prototype._processInertiaScroll = function () {
      if (!this._startBounceBackIfNeeded() && this.inertia) {
        var G = this._calculateTouchMoveVelocity();
        if (!x(G, cc.v2(0, 0), 0.0001) && this.brake < 1) {
          this._startInertiaScroll(G);
        } else if (this.autoSnap) {
          this._autoSnapTo();
        }
      }
      this._onScrollBarTouchEnded();
    };
    return __decorate([k], j);
  }(T.default);
  exports.default = C;
  cc._RF.pop();
}