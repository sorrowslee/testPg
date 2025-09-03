if (!cc._RF.push(module, "f962cm61b9P6rw9Yco9B/O4", "InfoboardMessageController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InfoboardMessageOrderState = undefined;
  var T;
  var x;
  var L = require("NumberDisplayController");
  var D = require("NumberRollController");
  var k = require("Utils");
  var C = require("AutomationDecorator");
  var j = require("InfoboardMessageController.spec");
  (function (Y) {
    Y[Y.SEQUENCE = 0] = "SEQUENCE";
    Y[Y.RANDOM = 1] = "RANDOM";
  })(T = exports.InfoboardMessageOrderState ||= {});
  (function (Y) {
    Y._fntConfig = "_fntConfig";
  })(x ||= {});
  var G = cc._decorator;
  var V = G.ccclass;
  var Q = G.property;
  var N = function (Y) {
    function W() {
      var F = Y !== null && Y.apply(this, arguments) || this;
      F.maskNode = undefined;
      F.padding = 40;
      F.label = undefined;
      F.winLabelColor = new cc.Color();
      F.winLabelOutlineColor = new cc.Color();
      F.tipsLabelColor = new cc.Color();
      F.tipsLabelOutlineColor = new cc.Color();
      F.enableWinOutline = true;
      F.enableTipsOutline = true;
      F.spriteMessageNode = undefined;
      F.sprite = undefined;
      F.numberRollController = undefined;
      F.numberDisplayController = undefined;
      F.winText = undefined;
      F.totalText = undefined;
      F.winDisplayNode = undefined;
      F._initSpriteNodePos = undefined;
      F._tips = [];
      F._sprites = [];
      F._availableTips = [];
      F._availableSprites = [];
      F._isWinAmountShown = undefined;
      F._willExpire = undefined;
      F._isEventShown = undefined;
      F._numberRollCompleteCallback = undefined;
      F._labelMessageMinDelayTime = 4;
      F._labelMessageRangeOfTimeAdded = 3;
      F._spriteMessageMinDelayTime = 4;
      F._spriteMessageRangeOfTimeAdded = 3;
      F._labelOriginY = 0;
      F._maxNumberDisplayNodeWidth = 650;
      F._initialNumberDisplayNodeScale = 1;
      F._orderMessageState = T.RANDOM;
      F._anchorPoint = 0;
      F._complement = -1;
      F._winDisplayLayout = undefined;
      return F;
    }
    var q = {
      get: function () {
        return this._willExpire;
      },
      enumerable: false,
      configurable: true
    };
    __extends(W, Y);
    Object.defineProperty(W.prototype, "willExpire", q);
    // 初始化節點與語系方向
    W.prototype.onLoad = function () {
      if (shell.isRTLLanguage()) {
        this._anchorPoint = 1;
        this._complement = 1;
      }
      if (this.winText) {
        var F = this.winText.node.parent;
        var b = this._winDisplayLayout = F.getComponent(cc.Layout);
        if (shell.isRTLLanguage()) {
          b.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
        }
      }
    };
    // 設定數字顯示節點的事件
    W.prototype.initNumberDisplayNodeEvent = function () {
      this._initialNumberDisplayNodeScale = this.winDisplayNode.scale;
      this.winDisplayNode.on("size-changed", this.resizeNumberDisplay, this);
    };
    // 設定數字顯示區最大寬度
    W.prototype.setNumberDisplayNodeWidth = function (F) {
      this._maxNumberDisplayNodeWidth = F;
    };
    // 顯示事件訊息，可為文字或圖片
    W.prototype.setEventMessage = function (F, b = true, H = false) {
      if (!this._isWinAmountShown) {
        if (H) {
          this.label.node.color = this.tipsLabelOutlineColor;
          this.label.node.getComponent(cc.LabelOutline).enabled = this.enableTipsOutline;
        }
        this._isWinAmountShown = false;
        this._isEventShown = true;
        this._willExpire = b;
        this.unschedule(this.playRandomTips);
        this.unschedule(this.playRandomSpriteTips);
        if (F instanceof cc.SpriteFrame) {
          this.setSpriteMessage(F);
        } else if (typeof F == "string") {
          this.setLabel(F);
        }
      }
    };
    // 清除目前顯示的訊息或提示
    W.prototype.clear = function (F = false) {
      if (this._isWinAmountShown || this._isEventShown || F || this._orderMessageState !== T.RANDOM) {
        if (this.sprite) {
          this.unschedule(this.playRandomSpriteTips);
          this.playRandomSpriteTips();
        } else if (this.label) {
          this.unschedule(this.playRandomTips);
          this.playRandomTips();
        }
      }
    };
    // 停止文字或圖片的動畫效果
    W.prototype.stop = function () {
      if (this.sprite) {
        this.sprite.node.stopAllActions();
      }
      if (this.label) {
        this.label.node.stopAllActions();
      }
    };
    // 設定多語系的圖像資源
    W.prototype.setLocalizedSpriteFrame = function (F, b) {
      this.winText.spriteFrame = F;
      this.totalText.spriteFrame = b;
    };
    // 設定可輪播的圖片清單
    W.prototype.setSprites = function (F) {
      this._sprites = undefined;
      this._sprites = F;
      this._availableSprites = F.slice();
    };
    // 設定訊息播放順序
    W.prototype.setOrderOfMessage = function (F = T.RANDOM) {
      this._orderMessageState = F;
    };
    // 調整圖片提示輪播的時間範圍
    W.prototype.setRandomSpriteScheduleTime = function (F = 4, b = 3) {
      this._spriteMessageRangeOfTimeAdded = b;
      this._spriteMessageMinDelayTime = F;
    };
    // 立即排程下一次圖片提示
    W.prototype.playScheduleRandomSpriteTipsOverride = function () {
      var F = Math.floor(Math.random() * this._spriteMessageRangeOfTimeAdded) + this._spriteMessageMinDelayTime;
      this.unschedule(this.playRandomSpriteTips);
      this.scheduleOnce(this.playRandomSpriteTips, F);
    };
    // 在指定時間後播放圖片提示
    W.prototype.playScheduleRandomSpriteTips = function (F = 0) {
      this.unschedule(this.playRandomSpriteTips);
      this.scheduleOnce(this.playRandomSpriteTips, F);
    };
    // 取消圖片提示的排程
    W.prototype.unscheduleRandomSpriteTips = function () {
      this.unschedule(this.playRandomSpriteTips);
    };
    // 控制顯示總得獎或單次得獎文字
    W.prototype.setTotalAndWinText = function (F, b) {
      this.totalText.node.active = F;
      this.winText.node.active = b;
      this.winDisplayNode.opacity = 255;
      if (this._winDisplayLayout) {
        this._winDisplayLayout.updateLayout();
      }
    };
    // 顯示訊息板內容
    W.prototype.showInfoboardMessage = function () {
      var F = this.maskNode.getComponent(cc.Mask);
      if (F) {
        F.enabled = true;
      }
      this.spriteMessageNode.active = true;
    };
    // 隱藏訊息板內容
    W.prototype.hideInfoboardMessage = function () {
      this.spriteMessageNode.active = false;
      var F = this.maskNode.getComponent(cc.Mask);
      if (F) {
        F.enabled = false;
      }
    };
    // 直接顯示數字
    W.prototype.showDisplayNumber = function (F, b = false) {
      this._isWinAmountShown = true;
      if (this.winDisplayNode) {
        this.winDisplayNode.setScale(this._initialNumberDisplayNodeScale);
      }
      this.numberDisplayController.clear();
      this.numberDisplayController.displayNumber(F, b);
      if (this._winDisplayLayout) {
        this._winDisplayLayout.updateLayout();
      }
    };
    // 清除顯示的數字
    W.prototype.clearDisplayNumber = function () {
      this.numberDisplayController.clear();
    };
    // 播放數字滾動效果
    W.prototype.showNumberRoll = function (F, b, H, w, U = true) {
      this._isEventShown = false;
      this._isWinAmountShown = true;
      this._numberRollCompleteCallback = w;
      if (this.winDisplayNode) {
        this.winDisplayNode.setScale(this._initialNumberDisplayNodeScale);
      }
      this.numberRollController.rollDuration = F;
      this.numberRollController.play(b, H, this.onNumberRollComplete.bind(this), U);
    };
    // 快速跳過數字滾動
    W.prototype.skipNumberRoll = function () {
      this.numberRollController.skip();
      this.onNumberRollComplete();
    };
    // 停止數字滾動效果
    W.prototype.clearNumberRoll = function () {
      this.numberRollController.stop();
    };
    // 設定圖片訊息並處理捲動
    W.prototype.setSpriteMessage = function (F) {
      var b = this;
      var H = this.padding;
      var w = this.sprite;
      var U = w.node;
      U.stopAllActions();
      w.spriteFrame = F;
      var B = this.maskNode.width;
      if (U.width * U.scaleY + H * 2 > B) {
        var P = this._complement;
        U.setAnchorPoint(this._anchorPoint, U.anchorY);
        U.setPosition(cc.v2((B / 2 - H) * P, U.y));
        this._initSpriteNodePos = U.position;
        var X = U.width * U.scaleY + H * 2;
        var y = cc.delayTime(1.5);
        var m = cc.moveBy(X / 130, cc.v2(X * P, 0));
        var v = undefined;
        v = this._willExpire ? cc.sequence(y, m, cc.callFunc(this.playScheduleRandomSpriteTips, this)) : cc.sequence(y, m, cc.callFunc(function () {
          U.position = b._initSpriteNodePos;
        })).repeatForever();
        U.runAction(v);
      } else {
        U.setAnchorPoint(0.5, U.anchorY);
        U.x = 0;
        if (!this._willExpire) {
          return;
        }
        k.deferCallback(true)(this.playScheduleRandomSpriteTipsOverride.bind(this));
      }
    };
    // 隨機播放圖片提示
    W.prototype.playRandomSpriteTips = function () {
      this._isWinAmountShown = false;
      this._isEventShown = false;
      this._willExpire = true;
      if (this._availableSprites.length === 0) {
        this._availableSprites = this._sprites.slice();
      }
      var F = this._availableSprites;
      if (this._orderMessageState === T.RANDOM) {
        var b = Math.floor(Math.random() * F.length);
        if (F.length > 1) {
          while (this.sprite.spriteFrame === F[b]) {
            b = Math.floor(Math.random() * F.length);
          }
        }
        this.setSpriteMessage(F[b]);
        this._availableSprites.splice(b, 1);
      } else if (this._orderMessageState === T.SEQUENCE) {
        this.setSpriteMessage(F[0]);
        this._availableSprites.splice(0, 1);
      }
    };
    // 依最大寬度調整數字顯示比例
    W.prototype.resizeNumberDisplay = function () {
      var F = this._maxNumberDisplayNodeWidth;
      var b = this.winDisplayNode.width * this._initialNumberDisplayNodeScale;
      var H = b - F;
      if (H > 0) {
        var w = this._initialNumberDisplayNodeScale - H / b;
        this.winDisplayNode.scale = w;
      }
    };
    // 數字滾動完成時的回呼
    W.prototype.onNumberRollComplete = function () {
      var F = this._numberRollCompleteCallback;
      this._isWinAmountShown = false;
      this._numberRollCompleteCallback = undefined;
      if (F) {
        F();
      }
    };
    // 記錄文字節點原始 Y 座標
    W.prototype.initLabelNodeY = function () {
      this._labelOriginY = this.label.node.y;
    };
    // 設定文字提示清單
    W.prototype.setTips = function (F) {
      this._tips = F;
      this._availableTips = F.slice();
    };
    // 設定多語系字型
    W.prototype.setLocalizedFont = function (F) {
      this.label.font = F;
    };
    // 調整字型行高
    W.prototype.setLabelFontHeight = function (F = 0) {
      var b = this.label.font;
      if (b[x._fntConfig]) {
        this.label.lineHeight = b[x._fntConfig].commonHeight + F;
      }
    };
    // 設定得獎文字顏色
    W.prototype.setWinLabelColor = function (F) {
      this.winLabelColor = F;
    };
    // 設定得獎文字外框顏色
    W.prototype.setWinLabelOutlineColor = function (F) {
      this.winLabelOutlineColor = F;
    };
    // 設定提示文字顏色
    W.prototype.setTipsLabelColor = function (F) {
      this.tipsLabelColor = F;
    };
    // 設定提示文字外框顏色
    W.prototype.setTipsLabelOutlineColor = function (F) {
      this.tipsLabelOutlineColor = F;
    };
    // 顯示得獎金額文字
    W.prototype.setWinAmount = function (F, b = false, H = false) {
      if (F && F > 0) {
        this.unschedule(this.playRandomTips);
        this.unschedule(this.playRandomSpriteTips);
        this._isEventShown = false;
        this._isWinAmountShown = true;
        this._willExpire = H;
        var w = this.label.node;
        var U = w.getComponent(cc.LabelOutline);
        w.color = this.winLabelColor;
        if (U) {
          U.color = this.winLabelOutlineColor;
          U.enabled = this.enableWinOutline;
        }
        var B = (b ? shell.I18n.t("InfoboardMessage.TotalWin") : shell.I18n.t("InfoboardMessage.Win")) + " " + k.formatCurrency(F, "", "");
        this.setLabel(B);
      }
    };
    // 設定文字提示輪播時間
    W.prototype.setRandomLabelScheduleTime = function (F = 4, b = 3) {
      this._labelMessageRangeOfTimeAdded = b;
      this._labelMessageMinDelayTime = F;
    };
    // 排程下一次文字提示
    W.prototype.scheduleRandomTips = function () {
      var F = Math.floor(Math.random() * this._labelMessageRangeOfTimeAdded) + this._labelMessageMinDelayTime;
      this.unschedule(this.playRandomTips);
      this.scheduleOnce(this.playRandomTips, F);
    };
    // 在指定時間後播放文字提示
    W.prototype.playScheduleRandomTips = function (F = 0) {
      this.unschedule(this.playRandomTips);
      this.scheduleOnce(this.playRandomTips, F);
    };
    // 取消文字提示排程
    W.prototype.unscheduleRandomTips = function () {
      this.unschedule(this.playRandomTips);
    };
    // 隨機顯示文字提示
    W.prototype.playRandomTips = function () {
      this._isWinAmountShown = false;
      this._isEventShown = false;
      if (this._tips.length !== 1) {
        this._willExpire = true;
      }
      if (this._availableTips.length === 0) {
        this._availableTips = this._tips.slice();
      }
      var F = this._availableTips;
      var b = Math.floor(Math.random() * F.length);
      var H = this.label.node;
      H.color = this.tipsLabelColor;
      var w = H.getComponent(cc.LabelOutline);
      if (w) {
        w.color = this.tipsLabelOutlineColor;
        w.enabled = this.enableTipsOutline;
      }
      this.setLabel(F[b]);
      this._availableTips.splice(b, 1);
    };
    // 設定訊息文字並檢查是否需要捲動
    W.prototype.setLabel = function (F) {
      var b = this.label;
      b.string = F;
      b.node.y = this.maskNode.height * 2;
      this.unschedule(this.determineOverFlow);
      this.scheduleOnce(this.determineOverFlow);
    };
    // 判斷文字是否超出範圍
    W.prototype.determineOverFlow = function () {
      var F = this.label.node;
      var b = this.padding;
      if (F.width + b * 2 > this.maskNode.width) {
        this.scrollLabel();
      } else {
        F.stopAllActions();
        F.setAnchorPoint(0.5, F.anchorY);
        F.x = 0;
        if (this._willExpire) {
          this.scheduleRandomTips();
        }
      }
      F.y = this._labelOriginY;
    };
    // 文字超出時進行水平捲動
    W.prototype.scrollLabel = function () {
      var F = this.label;
      var b = this.padding;
      var H = F.node;
      var w = this._complement;
      H.stopAllActions();
      H.setAnchorPoint(this._anchorPoint, H.anchorY);
      H.setPosition(cc.v2((this.maskNode.width / 2 - b) * w, H.y));
      var U;
      var B = H.width + b * 2;
      var P = cc.delayTime(1.5);
      var X = cc.moveBy(B / 130, cc.v2(B * w, 0));
      U = this._willExpire ? cc.sequence(P, X, cc.callFunc(this.playScheduleRandomTips, this)) : cc.sequence(P, X, cc.callFunc(this.scrollLabel, this));
      H.runAction(U);
    };
    // 重置控制器狀態
    W.prototype._reset = function () {
      this.stop();
      this.numberRollController.stop();
      this.numberDisplayController.clear();
      this.unschedule(this.scheduleRandomTips);
      this.unschedule(this.playRandomSpriteTips);
      this.unschedule(this.playRandomTips);
      this.padding = 40;
      this._maxNumberDisplayNodeWidth = 650;
      this._labelOriginY = 0;
      this._orderMessageState = T.RANDOM;
      this.enableTipsOutline = true;
      this.enableWinOutline = true;
      this._isWinAmountShown = false;
      this._tips = [];
      this._sprites = [];
      this._availableSprites = [];
      this._availableTips = undefined;
      this._willExpire = undefined;
      this._isEventShown = undefined;
      this.tipsLabelColor = undefined;
      this.tipsLabelOutlineColor = undefined;
      this._numberRollCompleteCallback = undefined;
    };
    // 銷毀控制器並釋放資源
    W.prototype.destroy = function () {
      this._reset();
      this.node.destroy();
      return Y.prototype.destroy.call(this);
    };
    __decorate([Q({
      type: cc.Node,
      tooltip: false
    })], W.prototype, "maskNode", undefined);
    __decorate([Q({
      type: cc.Float,
      tooltip: false
    })], W.prototype, "padding", undefined);
    __decorate([Q({
      type: cc.Label,
      tooltip: false
    })], W.prototype, "label", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "winLabelColor", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "winLabelOutlineColor", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "tipsLabelColor", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "tipsLabelOutlineColor", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "enableWinOutline", undefined);
    __decorate([Q({
      tooltip: false
    })], W.prototype, "enableTipsOutline", undefined);
    __decorate([Q({
      type: cc.Node,
      tooltip: false
    })], W.prototype, "spriteMessageNode", undefined);
    __decorate([Q({
      type: cc.Sprite,
      tooltip: false
    })], W.prototype, "sprite", undefined);
    __decorate([Q({
      type: D.default,
      tooltip: false
    })], W.prototype, "numberRollController", undefined);
    __decorate([Q({
      type: L.default,
      tooltip: false
    })], W.prototype, "numberDisplayController", undefined);
    __decorate([Q({
      type: cc.Sprite,
      tooltip: false
    })], W.prototype, "winText", undefined);
    __decorate([Q({
      type: cc.Sprite,
      tooltip: false
    })], W.prototype, "totalText", undefined);
    __decorate([Q({
      type: cc.Node,
      tooltip: false
    })], W.prototype, "winDisplayNode", undefined);
    __decorate([C.automationDec({
      func: j.setTotalAndWinText
    })], W.prototype, "setTotalAndWinText", null);
    __decorate([C.automationDec({
      func: j.setWinAmount
    })], W.prototype, "setWinAmount", null);
    return __decorate([V], W);
  }(cc.Component);
  exports.default = N;
  cc._RF.pop();
}