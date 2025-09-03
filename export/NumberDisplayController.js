if (!cc._RF.push(module, "e13cc9FLShL66GevrFVSv5p", "NumberDisplayController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("NumberDisplayInterface");
  var L = cc._decorator;
  var D = L.ccclass;
  var k = L.property;
  var C = function (u) {
    function G() {
      var V = u !== null && u.apply(this, arguments) || this;
      V.numberSpriteAtlas = undefined;
      V.numberBlurSpriteAtlas = undefined;
      V.numberSprite = [];
      V.numberBlurSprite = [];
      V.kSprite = undefined;
      V.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
      V.dstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
      V.nodeNumberWidth = 141;
      V.nodeNumberY = 0;
      V.nodeNumberScale = 1;
      V.commaWidth = 50;
      V.commaY = 0;
      V.commaScale = 1;
      V.decimalWidth = 60;
      V.decimalY = 0;
      V.decimalScale = 1;
      V.decimalNumberWidth = 121;
      V.decimalNumberY = 1;
      V.decimalNumberScale = 0.9;
      V.multiplySpriteWidth = 50;
      V.multiplySpriteY = 0;
      V.multiplySpriteScale = 1;
      V.layoutSpacingX = 0;
      V.layoutSpacingY = 0;
      V.blurScale = 1;
      V.spriteColor = "FFFFFF";
      V.disableFixedWidth = false;
      V.enablePrefixNumber = false;
      V._isScaling = false;
      V._widthBeforePreview = 0;
      V._preview = false;
      V._previewNumber = "0";
      V._originalScaleX = 0;
      V._originalScaleY = 0;
      V.attributesForNumberContainer = undefined;
      return V;
    }
    __extends(G, u);
    Object.defineProperty(G.prototype, "preview", {
      get: function () {
        return this._preview;
      },
      set: function (V) {
        this._preview = V;
        if (V) {
          this._widthBeforePreview = this.node.width;
          this.displayNumber(this.previewNumber);
        } else {
          this.clear();
          this.numberContainer.removeComponent(cc.Layout);
          this.node.width = this._widthBeforePreview;
          this._layout = undefined;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(G.prototype, "previewNumber", {
      get: function () {
        return this._previewNumber;
      },
      set: function (V) {
        this._previewNumber = V;
        this.displayNumber(V);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(G.prototype, "currentNumberBlurSprite", {
      get: function () {
        if (this.numberBlurSpriteAtlas) {
          return this.numberBlurSpriteAtlas.getSpriteFrames();
        } else {
          return this.numberBlurSprite;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(G.prototype, "currentNumberSprite", {
      get: function () {
        if (this.numberSpriteAtlas) {
          return this.numberSpriteAtlas.getSpriteFrames();
        } else {
          return this.numberSprite;
        }
      },
      enumerable: false,
      configurable: true
    });
    G.prototype.onLoad = function () {
      this._originalScaleX = this.numberContainer.scaleX;
      this._originalScaleY = this.numberContainer.scaleY;
      this.numberContainer.on(cc.Node.EventType.SIZE_CHANGED, this.resizeNumberIfNeeded, this);
    };
    G.prototype.getNumberList = function (V, Q) {
      var N = /(?:\d+)(?:\.\d+)?/gm.exec(V.toString());
      if (N) {
        var Y = parseFloat(N[0]);
        var W = this._getNumberDisplay(Y, Q);
        var q = typeof V == "number" ? W : V.replace(N[0], W);
        var S = Array.from(q);
        if (this.enablePrefixNumber) {
          S.unshift("x");
        }
        return S;
      }
      return Array.from(V.toString());
    };
    G.prototype.getSpriteConfig = function (V) {
      switch (V) {
        case ",":
          var Q = {
            width: this.commaWidth,
            scale: this.commaScale,
            y: this.commaY,
            spriteFrame: this.currentNumberSprite[10]
          };
          return Q;
        case ".":
          var N = {
            width: this.decimalWidth,
            scale: this.decimalScale,
            y: this.decimalY,
            spriteFrame: this.currentNumberSprite[11]
          };
          return N;
        case "x":
          var Y = {
            width: this.multiplySpriteWidth,
            scale: this.multiplySpriteScale,
            y: this.multiplySpriteY,
            spriteFrame: this.currentNumberSprite[12]
          };
          return Y;
        case "k":
          var W = {
            width: this.nodeNumberWidth,
            scale: this.nodeNumberScale,
            y: this.nodeNumberY,
            spriteFrame: this.kSprite
          };
          return W;
        case " ":
          var q = {
            width: this.commaWidth,
            scale: this.commaScale,
            y: this.commaY,
            spriteFrame: undefined
          };
          return q;
        default:
          return;
      }
    };
    G.prototype.getNumberSpriteConfig = function (V, Q, N) {
      if (N) {
        return {
          scale: Q ? this.decimalNumberScale * this.blurScale : this.decimalNumberScale,
          width: this.decimalNumberWidth,
          y: this.decimalNumberY,
          spriteFrame: Q ? this.currentNumberBlurSprite[parseInt(V, 10)] : this.currentNumberSprite[parseInt(V, 10)]
        };
      } else {
        return {
          scale: this.nodeNumberScale,
          width: this.nodeNumberWidth,
          y: this.nodeNumberY,
          spriteFrame: Q ? this.currentNumberBlurSprite[parseInt(V, 10)] : this.currentNumberSprite[parseInt(V, 10)]
        };
      }
    };
    G.prototype.displayNumber = function (V, Q = true, N) {
      this._setupNumberContainer();
      var Y = this.getNumberList(V, Q);
      Y = Y.reverse();
      var W = false;
      this._clearNumberIfLenghtChange(Y.length);
      for (var q = 0; q < Y.length; q++) {
        var S = this.dequeueNumberContainer(q);
        var z = S.getChildByName("numberSprite").getComponent(cc.Sprite);
        var f = this.getSpriteConfig(Y[q]);
        if (f) {
          S.width = f.width;
          S.scaleX = S.scaleY = f.scale;
          z.node.y = f.y;
          z.spriteFrame = f.spriteFrame;
        } else {
          W = false;
          var A = T.getDefaultCurrencyFormat().decimalSeparator;
          var M = q < Y.indexOf(A);
          if (M && Y.indexOf(A) !== -1) {
            W = !Q;
          }
          var E = this.getNumberSpriteConfig(Y[q], W, M && Y.indexOf(A) !== -1);
          S.scale = E.scale;
          S.width = E.width;
          z.node.y = E.y;
          z.spriteFrame = E.spriteFrame;
        }
        if (this.disableFixedWidth || S.width === -1) {
          S.width = z.node.width;
        }
        this._attributesForNumberContainer(q, Y[q], W, S);
      }
      if (this._layout) {
        this._layout.updateLayout();
      }
      if (N) {
        N();
      }
    };
    G.prototype._clearNumberIfLenghtChange = function (V) {
      var Q = this.numberContainer.children.length;
      if (V < Q) {
        for (var N = Q - V; N !== 0;) {
          var Y = this.numberContainer.children[0];
          Y.removeFromParent();
          Y.destroy();
          N--;
        }
      }
    };
    G.prototype.clear = function () {
      for (var V = this.numberContainer.children.length - 1; V > -1; V--) {
        var Q = this.numberContainer.children[V];
        Q.removeFromParent();
        Q.destroy();
      }
      this._revertScale();
      this.numberContainer.width = 0;
    };
    G.prototype._revertScale = function () {
      if (this._originalScaleX && this._originalScaleY) {
        this.numberContainer.scaleX = this._originalScaleX;
        this.numberContainer.scaleY = this._originalScaleY;
      }
    };
    G.prototype._getNumberDisplay = function (V, Q) {
      var N = V;
      var Y = "";
      var W = 1;
      if (this.enableShortenNumber && V > 999) {
        W = 1000;
        Y = "k";
      }
      var q = !T.getDefaultCurrencyFormat().hideDecimal && this.enableDecimal;
      N = q ? Math.floor(N / W) : Math.round(N / W);
      if (this.enableComma) {
        N = this.numberWithComma(N);
      }
      if (q) {
        N += this._getDecimalStringFrom(V, Q);
      }
      return N + Y;
    };
    G.prototype._getDecimalStringFrom = function (V, Q) {
      var N;
      var Y;
      var W;
      var q = T.getDefaultCurrencyFormat().decimalSeparator;
      if (this.enableShortenNumber && V > 999) {
        N = Math.round(V / 100) / 10;
        Y = 2;
        W = Q ? "" : q + "0";
      } else {
        N = V;
        Y = 3;
        W = q + "00";
      }
      var S = N.toString();
      if (S.indexOf(".") !== -1) {
        for (W = q + (W = S.substring(S.indexOf(".") + 1, S.indexOf(".") + Y)); W.length !== Y;) {
          W += "0";
        }
      }
      return W;
    };
    G.prototype._attributesForNumberContainer = function (V, Q, N, Y) {
      if (this.attributesForNumberContainer) {
        this.attributesForNumberContainer(V, Q, N, Y);
      }
    };
    G.prototype.dequeueNumberContainer = function (V) {
      var Q = this.numberContainer.children[V];
      if (!Q) {
        (Q = new cc.Node("container")).width = this.nodeNumberWidth;
        this.numberContainer.addChild(Q);
        var N = new cc.Node("numberSprite");
        N.addComponent(cc.Sprite);
        var Y = N.getComponent(cc.Sprite);
        Y.srcBlendFactor = this.srcBlendFactor;
        Y.dstBlendFactor = this.dstBlendFactor;
        Q.addChild(N);
        N.color = new cc.Color().fromHEX(this.spriteColor);
      }
      return Q;
    };
    G.prototype.resizeNumberIfNeeded = function () {
      var V = this.numberContainer.width;
      var Q = this.maxContainerSize / V;
      var N = V * this.numberContainer.scaleX;
      if (isFinite(Q) && Math.round(N) > this.maxContainerSize) {
        this.numberContainer.scale = Q;
      }
    };
    G.prototype._bounceEffect = function (V, Q, N) {
      this.numberContainer.runAction(cc.sequence(cc.scaleTo(0.08, V), cc.scaleTo(0.05, Q), cc.callFunc(N, this)));
    };
    G.prototype._setupNumberContainer = function () {
      if (!this._layout) {
        var V = this._layout = this.numberContainer.getComponent(cc.Layout);
        V ||= this._layout = this.numberContainer.addComponent(cc.Layout);
        V.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        V.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
        V.type = cc.Layout.Type.HORIZONTAL;
        V.spacingX = this.layoutSpacingX;
        V.spacingY = this.layoutSpacingY;
      }
    };
    G.prototype.onDestroy = function () {
      this.attributesForNumberContainer = undefined;
    };
    __decorate([k({
      type: cc.SpriteAtlas,
      tooltip: false
    })], G.prototype, "numberSpriteAtlas", undefined);
    __decorate([k({
      type: cc.SpriteAtlas,
      tooltip: false
    })], G.prototype, "numberBlurSpriteAtlas", undefined);
    __decorate([k({
      type: [cc.SpriteFrame],
      tooltip: false
    })], G.prototype, "numberSprite", undefined);
    __decorate([k({
      type: [cc.SpriteFrame]
    })], G.prototype, "numberBlurSprite", undefined);
    __decorate([k({
      type: cc.SpriteFrame
    })], G.prototype, "kSprite", undefined);
    __decorate([k({
      type: cc.macro.BlendFactor,
      tooltip: false
    }), k({
      type: cc.macro.BlendFactor,
      tooltip: false
    })], G.prototype, "srcBlendFactor", undefined);
    __decorate([k({
      type: cc.macro.BlendFactor,
      tooltip: false
    })], G.prototype, "dstBlendFactor", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "nodeNumberWidth", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "nodeNumberY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "nodeNumberScale", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "commaWidth", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "commaY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "commaScale", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "decimalWidth", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "decimalY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "decimalScale", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "decimalNumberWidth", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "decimalNumberY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "decimalNumberScale", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "multiplySpriteWidth", undefined);
    __decorate([k({
      type: cc.Integer,
      tooltip: false
    })], G.prototype, "multiplySpriteY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "multiplySpriteScale", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "layoutSpacingX", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "layoutSpacingY", undefined);
    __decorate([k({
      type: cc.Float,
      tooltip: false
    })], G.prototype, "blurScale", undefined);
    __decorate([k({
      tooltip: false
    })], G.prototype, "spriteColor", undefined);
    __decorate([k({
      tooltip: false
    })], G.prototype, "disableFixedWidth", undefined);
    __decorate([k({
      tooltip: false
    })], G.prototype, "enablePrefixNumber", undefined);
    __decorate([k], G.prototype, "preview", null);
    __decorate([k({
      type: cc.String,
      visible: function () {
        return this.preview;
      }
    })], G.prototype, "previewNumber", null);
    return __decorate([D], G);
  }(x.default);
  exports.default = C;
  cc._RF.pop();
}