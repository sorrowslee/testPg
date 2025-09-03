if (!cc._RF.push(module, "4403eAPMfNGO4d5KWMoVrU7", "ScrollViewEx")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = cc._decorator;
  var x = T.ccclass;
  var L = T.property;
  var D = function (k) {
    function C() {
      var u = k !== null && k.apply(this, arguments) || this;
      u.speed = 1;
      u.freeCells = [];
      u.snapPause = false;
      u.snapDone = false;
      u.nextAppearTarget = undefined;
      u.snapFinish = undefined;
      u.clickPos = undefined;
      u.clickTarget = undefined;
      u.timer = undefined;
      return u;
    }
    __extends(C, k);
    C.prototype.cellsInsertToParent = function () {
      if (this.freeCells.length) {
        for (var u = 0; u < this.content.children.length; u++) {
          if (this.freeCells[u]) {
            this.freeCells[u].cellNode.parent = this.content.children[u];
            this.freeCells[u].cellNode.setPosition(cc.v2(0, 0));
            this._bindTouchListener(this.freeCells[u].cellNode);
          }
        }
        this.freeCells = [];
      }
      this.snapPause = false;
    };
    C.prototype.cellsPullOutFromParent = function (u) {
      if (!this.freeCells.length) {
        this.snapPause = true;
        this.setSnapDone(true);
        for (var c = 0; c < this.content.children.length; c++) {
          var p = this.content.children[c].children[0];
          if (p) {
            this._unbindTouchListener(p);
            var j = p.parent.convertToWorldSpaceAR(p.getPosition());
            var l = u.convertToNodeSpaceAR(j);
            this.freeCells[c] = {
              cellNode: p,
              position: l,
              index: c
            };
            this.freeCells[c].cellNode.setPosition(l);
            this.freeCells[c].cellNode.parent = u;
          }
        }
        return this.freeCells;
      }
    };
    C.prototype.setSnapPause = function (u) {
      this.snapPause = u;
    };
    C.prototype.setSnapDone = function (u) {
      this.snapDone = u;
    };
    C.prototype.isSnapDone = function () {
      return this.snapDone;
    };
    C.prototype.setNextAppearTarget = function (u) {
      this.nextAppearTarget = u;
    };
    C.prototype.setSnapFinish = function (u) {
      this.snapFinish = u;
    };
    C.prototype._bindTouchListener = function (u) {
      u.on(cc.Node.EventType.TOUCH_START, this._clickStart, this);
      u.on(cc.Node.EventType.TOUCH_END, this._clickEnd, this);
      u.on(cc.Node.EventType.TOUCH_MOVE, this._clickMove, this);
      u.on(cc.Node.EventType.TOUCH_CANCEL, this._clickCancel, this);
    };
    C.prototype._unbindTouchListener = function (u) {
      u.off(cc.Node.EventType.TOUCH_START, this._clickStart, this);
      u.off(cc.Node.EventType.TOUCH_END, this._clickEnd, this);
      u.off(cc.Node.EventType.TOUCH_MOVE, this._clickMove, this);
      u.off(cc.Node.EventType.TOUCH_CANCEL, this._clickCancel, this);
    };
    C.prototype._clickStart = function (u) {
      var c = u.touch.getLocation();
      this.clickPos = c;
      this.clickTarget = u.currentTarget;
      this.timer = Date.now();
    };
    C.prototype._clickMove = function () {};
    C.prototype._clickEnd = function (u) {
      if (this.clickPos) {
        var c = u.touch.getLocation();
        var p = this.clickPos;
        var j = this.timer;
        if (!this._touchMinDistance(p.x, c.x) && !this._touchMinDistance(p.y, c.y) && !!j && !(Date.now() - j > 120)) {
          this._resetClick();
        }
      }
    };
    C.prototype._clickCancel = function (u) {
      if (this.clickPos) {
        var c = u.touch.getLocation();
        var p = this.clickPos;
        var j = this.timer;
        if (!this._touchMinDistance(p.x, c.x) && !this._touchMinDistance(p.y, c.y) && !!j && !(Date.now() - j > 120)) {
          this._resetClick();
        }
      }
    };
    C.prototype._touchMinDistance = function (u, c) {
      return Math.abs(c - u) > 100;
    };
    C.prototype._lerp1D = function (u, c, p, j = 1, l) {
      G = cc.v2(u, 0);
      V = cc.v2(c, 0);
      if (G.sub(V).mag() <= 1) {
        this.setSnapDone(true);
        if (l) {
          l();
        }
        return c;
      }
      var G;
      var V;
      var Q = u + (p *= j) * (c - u);
      if (u >= c) {
        if (Q <= c) {
          if (l) {
            l();
          }
          Q = c;
        }
      } else if (Q >= c) {
        if (l) {
          l();
        }
        Q = c;
      }
      return Q;
    };
    C.prototype._resetClick = function () {
      this.clickTarget = undefined;
      this.timer = undefined;
    };
    __decorate([L(cc.Integer)], C.prototype, "speed", undefined);
    return __decorate([x], C);
  }(cc.ScrollView);
  exports.default = D;
  cc._RF.pop();
}