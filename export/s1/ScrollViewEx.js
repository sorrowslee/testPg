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
    // 將暫存的 cell 重新掛回內容節點
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
    // 將 cell 從內容節點移出並暫存到目標節點
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
    // 設定是否暫停吸附效果
    C.prototype.setSnapPause = function (u) {
      this.snapPause = u;
    };
    // 標記吸附動作是否完成
    C.prototype.setSnapDone = function (u) {
      this.snapDone = u;
    };
    // 取得吸附動作是否完成
    C.prototype.isSnapDone = function () {
      return this.snapDone;
    };
    // 指定下一個將出現的節點
    C.prototype.setNextAppearTarget = function (u) {
      this.nextAppearTarget = u;
    };
    // 設定吸附完成後的回呼
    C.prototype.setSnapFinish = function (u) {
      this.snapFinish = u;
    };
    // 綁定觸控監聽
    C.prototype._bindTouchListener = function (u) {
      u.on(cc.Node.EventType.TOUCH_START, this._clickStart, this);
      u.on(cc.Node.EventType.TOUCH_END, this._clickEnd, this);
      u.on(cc.Node.EventType.TOUCH_MOVE, this._clickMove, this);
      u.on(cc.Node.EventType.TOUCH_CANCEL, this._clickCancel, this);
    };
    // 取消觸控監聽
    C.prototype._unbindTouchListener = function (u) {
      u.off(cc.Node.EventType.TOUCH_START, this._clickStart, this);
      u.off(cc.Node.EventType.TOUCH_END, this._clickEnd, this);
      u.off(cc.Node.EventType.TOUCH_MOVE, this._clickMove, this);
      u.off(cc.Node.EventType.TOUCH_CANCEL, this._clickCancel, this);
    };
    // 記錄點擊起始位置
    C.prototype._clickStart = function (u) {
      var c = u.touch.getLocation();
      this.clickPos = c;
      this.clickTarget = u.currentTarget;
      this.timer = Date.now();
    };
    // 觸控移動事件暫不處理
    C.prototype._clickMove = function () {};
    // 點擊結束時判斷是否為點擊
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
    // 取消點擊時判斷是否為點擊
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
    // 判斷兩點距離是否超過最小觸控距離
    C.prototype._touchMinDistance = function (u, c) {
      return Math.abs(c - u) > 100;
    };
    // 單維度線性插值，用於吸附動畫
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
    // 重置點擊狀態
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