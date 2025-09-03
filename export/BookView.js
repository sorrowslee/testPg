if (!cc._RF.push(module, "46ec0uZUDVPMZDgV9Idp1EN", "BookView")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var L = require("ScrollViewEx");
  var D = cc.Enum({
    LEFT: 1,
    RIGHT: 2,
    NULL: 3
  });
  function k(p, j) {
    return p.sub(j);
  }
  var C = cc._decorator;
  var u = C.ccclass;
  C.property;
  var c = function (p) {
    function V() {
      var Q = p !== null && p.apply(this, arguments) || this;
      Q._nodePools = {};
      Q._templates = {};
      Q._dataSource = undefined;
      return Q;
    }
    var j = {
      get: function () {
        return this._nodePools;
      },
      enumerable: false,
      configurable: true
    };
    var G = {
      get: function () {
        return this._templates;
      },
      enumerable: false,
      configurable: true
    };
    __extends(V, p);
    Object.defineProperty(V.prototype, "nodePools", j);
    Object.defineProperty(V.prototype, "templates", G);
    V.prototype.register = function (Q, N, Y) {
      if (this._nodePools[Q]) ;else if (N) {
        var W;
        W = Y ? new cc.NodePool(Y) : new cc.NodePool();
        this._templates[Q] = N;
        this._nodePools[Q] = W;
      }
    };
    V.prototype.setDataSource = function (Q) {
      if (Q !== this._dataSource) {
        this._dataSource = Q;
      }
    };
    V.prototype.reloadData = function () {
      this._unbindListener();
      this.init(this._sectionIndex);
    };
    V.prototype._createContentOuterCell = function () {
      for (this.contentChildsLayout = []; this.content.children.length < 3;) {
        var Q = this.node.width;
        var N = this.node.height;
        var Y = new cc.Node();
        var W = Y.addComponent(cc.Layout);
        W.type = cc.Layout.Type.VERTICAL;
        Y.setContentSize(Q, N);
        this.content.addChild(Y);
        this.contentChildsLayout.push(W);
      }
    };
    V.prototype._onSizeChanged = function () {
      var Q = this.node.width;
      var N = this.node.height;
      for (var Y = 0; Y < this.content.children.length; Y++) {
        this.content.children[Y].setContentSize(Q, N);
      }
      this.cellSize = Q;
      this.maxScrollArea = cc.v2(-this.cellSize * 0, -this.cellSize * 2);
      var W = this._totalLength >= this.content.children.length ? this.content.children.length : this._totalLength;
      this.distance = this.cellSize;
      var q = this.contentLayout.spacingX / W;
      this.distance += q;
      this._changeTo(this.currIndex);
    };
    V.prototype._bindListener = function () {
      this.node.on("size-changed", this._onSizeChanged, this);
    };
    V.prototype._unbindListener = function () {
      this.node.off("size-changed", this._onSizeChanged, this);
    };
    V.prototype.init = function (Q) {
      this._bindListener();
      this._createContentOuterCell();
      this.contentLayout = this.content.getComponent(cc.Layout);
      this.cellSize = this.node.width;
      this.target = 0;
      this.originalSpeed = this.speed;
      this.freeCells = [];
      this.dir = D.NULL;
      this.selected = true;
      this._sectionIndex = Q;
      this._totalLength = 0;
      this.constChildList = [];
      this.middleIndex = Math.floor(this.content.children.length / 2);
      this.currIndex = 0;
      this.itemOffSet = 0;
      this.snapPause = false;
      this.maxScrollArea = cc.v2(-this.cellSize * 0, -this.cellSize * 2);
      this._totalLength = this._dataSource.getCount(this, Q);
      for (var N = 0; N < this.content.children.length; N++) {
        var Y = undefined;
        if (N <= this._totalLength - 1) {
          if (this.content.children[N].children.length) {
            this._enqueueReusableItem(this.content.children[N].children[0]);
            (Y = this._dataSource.getItem(this, N, Q)).parent = this.content.children[N];
            this.content.children[N].zIndex = N;
            Y.cellIndex = N % this._totalLength;
            this.content.children[N].slotID = N;
            this.constChildList.push(Y);
          } else {
            this.content.children[N].zIndex = N;
            (Y = this._dataSource.getItem(this, N, Q)).parent = this.content.children[N];
            this._bindTouchListener(Y);
            Y.cellIndex = N % this._totalLength;
            this.content.children[N].slotID = N;
            this.constChildList.push(Y);
          }
        } else {
          this.content.children[N].zIndex = N;
          this.content.children[N].slotID = N;
        }
        if (this._totalLength - 1 >= N) {
          this.content.children[N].active = true;
        } else {
          this.content.children[N].active = false;
        }
      }
      if (this._totalLength >= this.content.children.length) {
        this.totalItems = this.content.children.length - 1;
      } else {
        this.totalItems = this._totalLength - 1;
      }
      var W = this._totalLength >= this.content.children.length ? this.content.children.length : this._totalLength;
      this.distance = this.cellSize;
      var q = this.contentLayout.spacingX / W;
      this.distance += q;
      this._changeTo(this.currIndex);
    };
    V.prototype.toLeftItem = function () {
      var Q = this.content.children[0].children[0].cellIndex - 1;
      if (this.currIndex === 2) {
        this.currIndex -= 1;
        this._changeTo(this.currIndex);
        if (this.nextAppearTarget) {
          this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
        }
        return;
      }
      if (Q < 0) {
        if (this.currIndex === 0) {
          if (this.closeFromLeft) {
            this.closeFromLeft();
          }
          this._changeTo(this.currIndex);
        } else {
          this.currIndex = 0;
          this._changeTo(this.currIndex);
          if (this.cancelCloseBook) {
            this.cancelCloseBook();
          }
          if (this.nextAppearTarget) {
            this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
          }
        }
      } else {
        for (var N = 0; N < this.content.children.length; N++) {
          if (N === this.content.children.length - 1) {
            if (Q < 0) {
              Q = this._totalLength - 1;
            }
            this._enqueueReusableItem(this.content.children[N].children[0]);
            var Y = this._dataSource.getItem(this, Q, this._sectionIndex);
            this.constChildList[this.content.children[N].slotID] = Y;
            this.constChildList[this.content.children[N].slotID].cellIndex = Q;
            this.content.children[N].zIndex = 0;
            Y.parent = this.content.children[N];
          } else {
            this.content.children[N].zIndex += 1;
          }
        }
        this.resetLayout = true;
        this.changeIndexTo = 0;
        this.currIndex -= 1;
        if (this.nextAppearTarget) {
          this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
        }
        this.contentLayout.updateLayout();
        this.content.x = this.content.x + this.itemOffSet;
        this.snapDone = false;
        this.currIndex = this.middleIndex;
      }
    };
    V.prototype.toRightItem = function () {
      var Q = this.content.children[this.totalItems].children[0].cellIndex + 1;
      if (this.currIndex === 0 && this.currIndex < this.totalItems) {
        this.currIndex += 1;
        this._changeTo(this.currIndex);
        if (this.nextAppearTarget) {
          this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
        }
        return;
      }
      if (Q > this._totalLength - 1) {
        if (this.currIndex === this.totalItems) {
          if (this.closeFromRight) {
            this.closeFromRight();
          }
          this._changeTo(this.currIndex);
        } else {
          this.currIndex = this.totalItems;
          this._changeTo(this.currIndex);
          if (this.cancelCloseBook) {
            this.cancelCloseBook();
          }
          if (this.nextAppearTarget) {
            this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
          }
        }
      } else {
        for (var N = this.content.children.length - 1; N >= 0; N--) {
          if (N === 0) {
            if (Q >= this._totalLength) {
              Q = 0;
            }
            this._enqueueReusableItem(this.content.children[N].children[0]);
            var Y = this._dataSource.getItem(this, Q, this._sectionIndex);
            this.constChildList[this.content.children[N].slotID] = Y;
            this.constChildList[this.content.children[N].slotID].cellIndex = Q;
            this.content.children[N].zIndex = this.content.children.length - 1;
            Y.parent = this.content.children[N];
          } else {
            this.content.children[N].zIndex -= 1;
          }
        }
        this.resetLayout = true;
        this.changeIndexTo = 2;
        this.currIndex += 1;
        if (this.nextAppearTarget) {
          this.nextAppearTarget(this.constChildList[this.content.children[this.currIndex].slotID].cellIndex);
        }
        this.contentLayout.updateLayout();
        this.content.x = this.content.x + this.itemOffSet;
        this.snapDone = false;
        this.currIndex = this.middleIndex;
      }
    };
    V.prototype.setElasticLeft = function (Q) {
      this.elasticLeft = Q;
    };
    V.prototype.setElasticRight = function (Q) {
      this.elasticRight = Q;
    };
    V.prototype.setClosingFromLeft = function (Q) {
      this.closingFromLeft = Q;
    };
    V.prototype.setCloseFromLeft = function (Q) {
      this.closeFromLeft = Q;
    };
    V.prototype.setClosingFromRight = function (Q) {
      this.closingFromRight = Q;
    };
    V.prototype.setCloseFromRight = function (Q) {
      this.closeFromRight = Q;
    };
    V.prototype.setCancelCloseBook = function (Q) {
      this.cancelCloseBook = Q;
    };
    V.prototype.setStartScrolling = function (Q) {
      this.startScrolling = Q;
    };
    V.prototype.getAllItems = function () {
      var Q = [];
      this.content.children.forEach(function (N) {
        if (N.children.length) {
          Q.push(N.children[0]);
        }
      });
      return Q;
    };
    V.prototype.scrollTo = function (Q) {
      if (this.snapDone && !this.snapPause) {
        var N = this.content.children[this.currIndex].children[0].cellIndex;
        if (N !== Q && !(Q > this._totalLength - 1) && !(Q < 0)) {
          if (Q > N) {
            if (Q === N + 1) {
              if (this.currIndex === 0) {
                this.toRightItem();
              } else {
                this.dir = D.RIGHT;
                this.itemOffSet = this.cellSize;
                this._recycleItem();
              }
            } else if (this.currIndex === 0) {
              var Y = this.content.children.length - 1;
              this._enqueueReusableItem(this.content.children[Y].children[0]);
              var W = this._dataSource.getItem(this, Q, this._sectionIndex);
              this.constChildList[this.content.children[Y].slotID] = W;
              this.constChildList[this.content.children[Y].slotID].cellIndex = Q;
              W.parent = this.content.children[Y];
              this.speed = 10;
              this.currIndex = 2;
              this.reloadCells = true;
              this._changeTo(this.currIndex);
            } else {
              var q = Q;
              for (var S = this.content.children.length - 1; S >= 0; S--) {
                if (S === 0) {
                  this.content.children[S].zIndex = 2;
                  this._enqueueReusableItem(this.content.children[S].children[0]);
                  W = this._dataSource.getItem(this, q, this._sectionIndex);
                  this.constChildList[this.content.children[S].slotID] = W;
                  this.constChildList[this.content.children[S].slotID].cellIndex = q;
                  W.parent = this.content.children[S];
                } else {
                  this.content.children[S].zIndex = S === 1 ? 0 : 1;
                }
              }
              this.currIndex = 0;
              this.changeIndexTo = 2;
              this.changeContentPos = true;
            }
          } else if (Q === N - 1) {
            if (this.currIndex === 2) {
              this.toLeftItem();
            } else {
              this.dir = D.LEFT;
              this.itemOffSet = -this.cellSize;
              this._recycleItem();
            }
          } else if (this.currIndex === this.content.children.length - 1) {
            q = 0;
            this._enqueueReusableItem(this.content.children[q].children[0]);
            W = this._dataSource.getItem(this, Q, this._sectionIndex);
            this.constChildList[this.content.children[q].slotID] = W;
            this.constChildList[this.content.children[q].slotID].cellIndex = Q;
            W.parent = this.content.children[q];
            this.speed = 10;
            this.currIndex = 0;
            this.reloadCells = true;
            this._changeTo(this.currIndex);
          } else {
            Y = Q;
            S = this.content.children.length - 1;
            for (; S >= 0; S--) {
              if (S === 2) {
                this.content.children[S].zIndex = 0;
                this._enqueueReusableItem(this.content.children[S].children[0]);
                W = this._dataSource.getItem(this, Y, this._sectionIndex);
                this.constChildList[this.content.children[S].slotID] = W;
                this.constChildList[this.content.children[S].slotID].cellIndex = Y;
                W.parent = this.content.children[S];
              } else {
                this.content.children[S].zIndex = S === 1 ? 2 : 1;
              }
            }
            this.currIndex = 2;
            this.changeIndexTo = 0;
            this.changeContentPos = true;
          }
        }
      }
    };
    V.prototype.dequeueReusableItem = function (Q) {
      var N;
      var Y = this._nodePools[Q];
      if (Y) {
        if (!(N = Y.get())) {
          var W = this._templates[Q];
          N = cc.instantiate(W);
        }
        N.lv_type = Q;
      }
      return N;
    };
    V.prototype._enqueueReusableItem = function (Q) {
      var N;
      var Y = Q.lv_type;
      if (Y) {
        N = this._nodePools[Y];
      }
      if (N) {
        N.put(Q);
      }
    };
    V.prototype._reloadCellsData = function () {
      var Q = this.content.children[this.currIndex].children[0].cellIndex;
      if (Q === this._totalLength - 1) {
        var N = Q - 2;
        var Y = Q - 1;
        for (var W = this.content.children.length - 1; W >= 0; W--) {
          if (W === 0) {
            this._enqueueReusableItem(this.content.children[W].children[0]);
            var q = this._dataSource.getItem(this, N, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = N;
            q.parent = this.content.children[W];
          } else if (W === 1) {
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, Y, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = Y;
            q.parent = this.content.children[W];
          }
        }
      } else if (Q === 0) {
        Y = Q + 1;
        var S = Q + 2;
        for (W = this.content.children.length - 1; W >= 0; W--) {
          if (W === 1) {
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, Y, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = Y;
            q.parent = this.content.children[W];
          } else if (W === 2) {
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, S, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = S;
            q.parent = this.content.children[W];
          }
        }
      } else if (this.currIndex === 0) {
        Y = Q + 1;
        S = Q - 1;
        W = this.content.children.length - 1;
        for (; W >= 0; W--) {
          if (W === 1) {
            this.content.children[W].zIndex = 2;
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, Y, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = Y;
            q.parent = this.content.children[W];
          } else if (W === 2) {
            this.content.children[W].zIndex = 0;
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, S, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = S;
            q.parent = this.content.children[W];
          } else {
            this.content.children[W].zIndex = 1;
          }
        }
        this.resetContentPos = true;
      } else {
        N = Q + 1;
        Y = Q - 1;
        W = this.content.children.length - 1;
        for (; W >= 0; W--) {
          if (W === 0) {
            this.content.children[W].zIndex = 2;
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, N, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = N;
            q.parent = this.content.children[W];
          } else if (W === 1) {
            this.content.children[W].zIndex = 0;
            this._enqueueReusableItem(this.content.children[W].children[0]);
            q = this._dataSource.getItem(this, Y, this._sectionIndex);
            this.constChildList[this.content.children[W].slotID] = q;
            this.constChildList[this.content.children[W].slotID].cellIndex = Y;
            q.parent = this.content.children[W];
          } else {
            this.content.children[W].zIndex = 1;
          }
        }
        this.resetContentPos = true;
      }
    };
    V.prototype._changeTo = function (Q) {
      if (!(Q > this.totalItems) && !(Q < 0)) {
        this.currIndex = Q;
        this.target = -this.currIndex * this.distance;
        this.snapDone = false;
      }
    };
    V.prototype._recycleItem = function () {
      if (this.dir === D.LEFT && this.content.x > this.maxScrollArea.y) {
        this.toLeftItem();
      } else if (this.dir === D.RIGHT && this.content.x < this.maxScrollArea.x) {
        this.toRightItem();
      }
      this.dir = D.NULL;
    };
    V.prototype.update = function (Q) {
      var N = this;
      if (this.snapDone || this.snapPause) {
        if (this.changeContentPos) {
          this.changeContentPos = false;
          this.target = -this.currIndex * this.distance;
          this.content.x = -this.currIndex * this.distance;
          this._changeTo(this.changeIndexTo);
          this.reloadCells = true;
        }
      } else {
        this.content.x = this._lerp1D(this.content.x, this.target, Q, this.speed, function () {
          if (N.snapFinish) {
            N.snapFinish(N.constChildList[N.content.children[N.currIndex].slotID].cellIndex);
          }
          if (N.reloadCells) {
            N.reloadCells = false;
            N.speed = N.originalSpeed;
            N._reloadCellsData();
          }
        });
        if (this.resetContentPos) {
          this.resetContentPos = false;
          this.currIndex = this.middleIndex;
          this.target = -this.currIndex * this.distance;
          this.content.x = -this.currIndex * this.distance;
        }
        this.content.sortAllChildren();
      }
    };
    V.prototype._onTouchBegan = function (Q, N) {
      if (!this.reloadCells && this.content.children.length) {
        this.snapPause = true;
        var Y = Q.touch;
        var W = cc.v2(Y.getLocation().x, Y.getLocation().y);
        this.startPos = W;
        this._onBegan(Q, N);
      } else {
        this.startPos = null;
      }
    };
    V.prototype._onTouchMoved = function (Q, N) {
      var Y = Q.touch;
      var W = cc.v2(Y.getLocation().x, Y.getLocation().y);
      if (this.startPos && this.content.children.length) {
        if (this.startPos.x < W.x) {
          if (this.elasticLeft != null) {
            this.elastic = this.elasticLeft;
          }
          if (this.content.children[0].children[0].cellIndex === 0 && this.currIndex === 0) {
            if (this.selected && this.closingFromLeft) {
              this.closingFromLeft(this.startPos.x, W.x);
            }
            if (this.content.x !== 0 && this.selected) {
              this._onMove(Q, N);
            }
          } else if (this.selected) {
            this._onMove(Q, N);
          }
        } else {
          if (this.elasticRight != null) {
            this.elastic = this.elasticRight;
          }
          if (this.content.children[this.totalItems].children[0].cellIndex + 1 === this._totalLength && this.currIndex === this.totalItems) {
            if (this.selected && this.closingFromRight) {
              this.closingFromRight(this.startPos.x, W.x);
            }
            if (this.content.x !== this.content.width && this.selected) {
              this._onMove(Q, N);
            }
          } else if (this.selected) {
            this._onMove(Q, N);
          }
        }
        if (this.content.x > 0 && this.elasticLeft != null) {
          this.elastic = this.elasticLeft;
        } else if (this.content.x > -this.content.width && this.elasticRight != null) {
          this.elastic = this.elasticRight;
        }
      }
    };
    V.prototype._onTouchEnded = function (Q, N) {
      if (!this.reloadCells && this.content.children.length) {
        this.dragElastic = false;
        var Y = Q.touch;
        var W = cc.v2(Y.getLocation().x, Y.getLocation().y);
        this.currentPos = W;
        if (this.startPos) {
          if (this._touchMinDistance(this.startPos.x, this.currentPos.x) && this.selected) {
            if (this.dir != D.RIGHT && this.startPos.x > this.currentPos.x) {
              this.dir = D.RIGHT;
              this.itemOffSet = this.cellSize;
              this._recycleItem();
              if (this.cancelCloseBook) {
                this.cancelCloseBook();
              }
            } else if (this.dir != D.LEFT && this.startPos.x < this.currentPos.x) {
              this.dir = D.LEFT;
              this.itemOffSet = -this.cellSize;
              this._recycleItem();
            } else {
              this._changeTo(this.currIndex);
              if (this.cancelCloseBook) {
                this.cancelCloseBook();
              }
            }
          } else {
            this._changeTo(this.currIndex);
            if (this.cancelCloseBook) {
              this.cancelCloseBook();
            }
          }
          this.snapPause = false;
          this._onEnded(Q, N);
        }
      }
    };
    V.prototype._onTouchCancelled = function (Q, N) {
      if (!this.reloadCells && this.content.children.length) {
        this.dragElastic = false;
        var Y = Q.touch;
        var W = cc.v2(Y.getLocation().x, Y.getLocation().y);
        this.currentPos = W;
        if (this.startPos) {
          if (this._touchMinDistance(this.startPos.x, this.currentPos.x) && this.selected) {
            if (this.dir != D.RIGHT && this.startPos.x > this.currentPos.x) {
              this.dir = D.RIGHT;
              this.itemOffSet = this.cellSize;
              this._recycleItem();
              if (this.cancelCloseBook) {
                this.cancelCloseBook();
              }
            } else if (this.dir != D.LEFT && this.startPos.x < this.currentPos.x) {
              this.dir = D.LEFT;
              this.itemOffSet = -this.cellSize;
              this._recycleItem();
            } else {
              this._changeTo(this.currIndex);
              if (this.cancelCloseBook) {
                this.cancelCloseBook();
              }
            }
          } else {
            this._changeTo(this.currIndex);
            if (this.cancelCloseBook) {
              this.cancelCloseBook();
            }
          }
          this.snapPause = false;
          this._onCancelled(Q, N);
        }
      }
    };
    V.prototype._onBegan = function (Q) {
      this.clickBegan = true;
      if (this.enabledInHierarchy) {
        var N = Q.touch;
        if (this.content) {
          this._handlePressLogic(N);
        }
        this._touchMoved = false;
        this._stopPropagationIfTargetIsMe(Q);
      }
    };
    V.prototype._onMove = function (Q) {
      if (this.clickBegan) {
        this.clickBegan = false;
        if (this.startScrolling) {
          this.startScrolling();
        }
      }
      if (this.enabledInHierarchy) {
        var N = Q.touch;
        if (this.content) {
          this._handleMoveLogic(N);
        }
        if (this.cancelInnerEvents) {
          var Y;
          Y = N.getLocation();
          N.getStartLocation();
          var W = Y.mag();
          if (k(W) > 7 && !this._touchMoved && Q.target !== this.node) {
            var q = new cc.Event.EventTouch(Q.getTouches(), Q.bubbles);
            q.type = cc.Node.EventType.TOUCH_CANCEL;
            q.touch = Q.touch;
            q.simulate = true;
            Q.target.dispatchEvent(q);
            this._touchMoved = true;
          }
          this._stopPropagationIfTargetIsMe(Q);
        }
      }
    };
    V.prototype._onEnded = function (Q) {
      this.clickBegan = false;
      if (this.enabledInHierarchy) {
        var N = Q.touch;
        if (this.content) {
          this._handleReleaseLogic(N);
        }
        this._dispatchEvent("touch-up");
        if (this._touchMoved) {
          Q.stopPropagation();
        } else {
          this._stopPropagationIfTargetIsMe(Q);
        }
      }
    };
    V.prototype._onCancelled = function (Q) {
      this.clickBegan = false;
      if (this.enabledInHierarchy) {
        if (!Q.simulate) {
          var N = Q.touch;
          if (this.content) {
            this._handleReleaseLogic(N);
          }
        }
        this._stopPropagationIfTargetIsMe(Q);
      }
    };
    V.prototype._mouseWheelHorizontal = function () {
      if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() > 0) {
        this.dir = D.RIGHT;
      } else if (this._mouseWheelEvent && this._mouseWheelEvent.getScrollY() < 0) {
        this.dir = D.LEFT;
      }
    };
    V.prototype._onMouseWheelStart = function () {
      this.snapPause = true;
      this.snapDone = true;
    };
    V.prototype._onMouseWheelEnd = function () {
      this.itemOffSet = this.cellSize;
      this._recycleItem();
      this.snapPause = false;
      this._mouseWheelEvent = undefined;
    };
    V.prototype._onMouseWheel = function (Q) {
      if (this.content.children.length && this.enabledInHierarchy) {
        this._mouseWheelEvent = Q;
        var N = cc.v2(0, 0);
        if (this.vertical) {
          N = cc.v2(0, Q.getScrollY() * -0.1);
        } else if (this.horizontal) {
          N = cc.v2(Q.getScrollY() * -0.1, 0);
          this._mouseWheelHorizontal();
        }
        this._mouseWheelEventElapsedTime = 0;
        this._processDeltaMove(N);
        if (!this._stopMouseWheel) {
          this._handlePressLogic();
          this.schedule(this._checkMouseWheel, 1 / 60);
          this._stopMouseWheel = true;
          this._onMouseWheelStart();
        }
        this._stopPropagationIfTargetIsMe(Q);
      }
    };
    V.prototype._checkMouseWheel = function (Q) {
      var N;
      var Y;
      N = this._getHowMuchOutOfBoundary();
      Y = cc.v2(0, 0);
      0.0001;
      if (!N.fuzzyEquals(Y, 0.0001)) {
        this._processInertiaScroll();
        this.unschedule(this._checkMouseWheel);
        this._stopMouseWheel = false;
        this._onMouseWheelEnd();
        return;
      }
      this._mouseWheelEventElapsedTime += Q;
      if (this._mouseWheelEventElapsedTime > 0.1) {
        this._onScrollBarTouchEnded();
        this.unschedule(this._checkMouseWheel);
        this._stopMouseWheel = false;
        this._onMouseWheelEnd();
      }
    };
    return __decorate([u], V);
  }(L.default);
  exports.default = c;
  cc._RF.pop();
}