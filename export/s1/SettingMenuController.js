if (!cc._RF.push(module, "fba916JMWpJiL2n5fnfp4nN", "SettingMenuController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SettingMenuController = undefined;
  var T = require("CanvasResizeBroadcaster");
  var x = require("HitPassThrough");
  var L = require("Utils");
  var D = require("UIAppearanceHelper");
  var k = require("BVFramework");
  var C = cc._decorator;
  var j = C.ccclass;
  var G = C.property;
  var V = function (Q) {
    function N() {
      var Y = Q !== null && Q.apply(this, arguments) || this;
      Y.blackTintBackground = undefined;
      Y.dimBackground = undefined;
      Y.subControllerHolder = undefined;
      Y.menusLayerHolder = undefined;
      Y.defaultMenuLayerNode = undefined;
      Y.moreMenuLayerNode = undefined;
      Y.subControllerBG = undefined;
      Y.settingInfoFooterFrontHolder = undefined;
      Y.settingInfoFooterMiddleBottomHolder = undefined;
      Y.settingInfoFooterBottomHolder = undefined;
      Y.walletButtonSensor = undefined;
      Y.hitPassThroughComponent = undefined;
      Y.settingToast = undefined;
      Y.settingToastBg = undefined;
      Y.settingToastLayout = undefined;
      Y.settingToastLabel = undefined;
      Y.settingTurboSprite = undefined;
      Y.settingTurboOnSprite = undefined;
      Y.settingTurboOffSprite = undefined;
      Y.featureBuyToast = undefined;
      Y.featureBuyToastBg = undefined;
      Y.featureBuyToastLayout = undefined;
      Y.featureBuyToastLabel = undefined;
      Y.featureBuyTurboSprite = undefined;
      Y.reminderBoard = undefined;
      Y.originalBetAmountLabel = undefined;
      Y.reminderBoardLabel = undefined;
      Y.holders = [];
      Y.muteIcon = undefined;
      Y.settingMenuUIBlock = undefined;
      Y._isControllerPresent = false;
      Y._showingDefaultMenu = true;
      Y._isSwitchingLayer = false;
      Y._itemList = [];
      Y._visibleItems = [];
      Y._isFullView = false;
      Y.FRONT_MAX_HOLDER = 4;
      Y._isPanelTouchMoved = false;
      Y._reminderBoardShowed = false;
      Y._subControllerHolderMoveDuration = 0.2;
      Y._panelCanBeMove = false;
      Y._startTouchPosY = 0;
      Y._lockWalletButton = false;
      return Y;
    }
    __extends(N, Q);
    // 初始設定與註冊事件
    N.prototype.onLoad = function () {
      this.settingTurboSprite.node.color = D.uiAppearanceHelper.v("setting.theme_color");
      this.defaultMenuLayerNode.y = 0;
      this.settingToast.opacity = 0;
      this.featureBuyToast.opacity = 0;
      this.featureBuyToast.active = false;
      this.moreMenuLayerNode.y = -this.defaultMenuLayerNode.height;
      this.moreMenuLayerNode.opacity = 0;
      this.moreMenuLayerNode.active = false;
      this.reminderBoard.active = false;
      this.reminderBoard.opacity = 1;
      this.blackTintBackground.active = false;
      this.settingMenuUIBlock.active = false;
      this.subControllerHolder.height = this._currentUsingHeight = cc.view.getVisibleSize().height;
      var Y = T.default.subscribe(this._onSizeChanged.bind(this));
      this._unsubscribeBroadcaster = typeof Y == "function" ? Y : undefined;
      this._gameContext = k.getGameContext();
    };
    // 螢幕尺寸改變時更新布局
    N.prototype._onSizeChanged = function () {
      var Y = this;
      var W = this._sizeChangeAbort;
      this._sizeChangeAbort = undefined;
      if (W) {
        W();
      }
      var q = [];
      if (this._isFullView) {
        q.push(function () {
          var S = cc.view.getVisibleSize().height;
          var z = Y._getGapBetweenBottomScreenValue();
          Y.subControllerHolder.height = S - z;
          Y.subControllerBG.height = S;
        });
      } else {
        q.push(function () {
          if (Y._currentUsingHeight === undefined) {
            throw Error("SettingMenuController :: _onSizeChanged : Please update holder height using updateSubControllerHolderHeight first!");
          }
          var S = Y._getGapBetweenBottomScreenValue();
          Y.subControllerHolder.height = Y._currentUsingHeight;
          Y.subControllerBG.height = Y._currentUsingHeight + S;
        });
      }
      this._sizeChangeAbort = L.sequenceCallback(L.delayCallback(0))(function () {
        Y._sizeChangeAbort = undefined;
        for (var S = 0; S < q.length; S++) {
          q[S]();
        }
      });
    };
    // 解除尺寸監聽
    N.prototype.onDestroy = function () {
      var Y = this._unsubscribeBroadcaster;
      this._unsubscribeBroadcaster = undefined;
      if (Y) {
        Y();
      }
    };
    // 設定改變下注時的提示文字
    N.prototype.setBetChangeReminderLabel = function (Y) {
      this.reminderBoardLabel.string = Y;
    };
    // 顯示變更下注提醒面板
    N.prototype.showBetReminderBoard = function (Y) {
      if (!this._reminderBoardShowed) {
        this._reminderBoardShowed = true;
        this.reminderBoard.active = true;
        this.reminderBoard.stopAllActions();
        this.reminderBoard.runAction(cc.fadeIn(0.2));
        this.originalBetAmountLabel.string = Y;
      }
    };
    // 隱藏變更下注提醒面板
    N.prototype.hideBetReminderBoard = function () {
      var Y = this;
      if (this._reminderBoardShowed) {
        this._reminderBoardShowed = false;
        this.reminderBoard.stopAllActions();
        this.reminderBoard.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
          Y.reminderBoard.active = false;
        })));
      }
    };
    // 判斷提醒面板是否顯示中
    N.prototype.isSettingBetReminderBoardShowed = function () {
      return this._reminderBoardShowed;
    };
    // 取消變更下注
    N.prototype.cancelToChangeBetAmount = function () {
      if (this._cancelToChangeBetAmountCB) {
        this._cancelToChangeBetAmountCB();
      }
    };
    // 確認變更下注
    N.prototype.confirmToChangeBetAmount = function () {
      if (this._confirmToChangeBetAmountCB) {
        this._confirmToChangeBetAmountCB();
      }
    };
    // 設定提醒面板的取消與確認回呼
    N.prototype.setBetReminderCancelAndConfirmCallback = function (Y, W) {
      this._cancelToChangeBetAmountCB = Y;
      this._confirmToChangeBetAmountCB = W;
    };
    // 顯示帶有渦輪圖示的提示訊息
    N.prototype.showSettingTurboToast = function (Y, W, q) {
      var S = this;
      if (q === undefined) {
        q = 2;
      }
      var z = this._abortUpdateSettingToastBgSize;
      this._abortUpdateSettingToastBgSize = undefined;
      if (z) {
        z();
      }
      this.settingToast.stopAllActions();
      if (!z) {
        this.settingToast.opacity = 1;
      }
      this.settingToastLabel.string = Y;
      this.settingTurboSprite.node.active = true;
      this.settingTurboSprite.spriteFrame = W ? this.settingTurboOnSprite : this.settingTurboOffSprite;
      this.settingTurboSprite.node.stopAllActions();
      this.settingTurboSprite.node.opacity = 0;
      this._abortUpdateSettingToastBgSize = L.delayCallback(0)(function () {
        S.settingToastBg.width = S.settingToastLabel.node.width + 48 + S.settingTurboSprite.node.width;
        S.settingToastBg.height = S.settingToastLabel.node.height + 24;
        S.settingToast.opacity = 255;
        S.settingToast.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.spawn(cc.scaleTo(0.1, 1), cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
          S.settingTurboSprite.node.runAction(cc.fadeTo(0.05, 255));
        }))), cc.delayTime(q), cc.fadeOut(0.3), cc.callFunc(function () {
          S._abortUpdateSettingToastBgSize = undefined;
        })));
      });
    };
    // 顯示一般提示訊息
    N.prototype.showSettingToast = function (Y, W) {
      var q = this;
      if (W === undefined) {
        W = 2;
      }
      var S = this._abortUpdateSettingToastBgSize;
      this._abortUpdateSettingToastBgSize = undefined;
      if (S) {
        S();
      }
      this.settingToast.stopAllActions();
      this.settingTurboSprite.node.stopAllActions();
      this.settingTurboSprite.node.active = false;
      this.settingTurboSprite.node.opacity = 0;
      if (!S) {
        this.settingToast.opacity = 1;
      }
      this.settingToastLabel.string = Y;
      this._abortUpdateSettingToastBgSize = L.delayCallback(0)(function () {
        q.settingToastBg.width = q.settingToastLabel.node.width + 48;
        q.settingToastBg.height = q.settingToastLabel.node.height + 24;
        q.settingToast.opacity = 255;
        q.settingToast.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1), cc.delayTime(W), cc.fadeOut(0.3), cc.callFunc(function () {
          q._abortUpdateSettingToastBgSize = undefined;
        })));
      });
    };
    // 隱藏一般提示訊息
    N.prototype.hideSettingToast = function () {
      var Y = this;
      var W = this._abortUpdateSettingToastBgSize;
      this._abortUpdateSettingToastBgSize = undefined;
      if (W) {
        W();
      }
      this.settingToast.stopAllActions();
      this.settingToast.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        Y._abortUpdateSettingToastBgSize = undefined;
      })));
    };
    // 顯示購買功能提示
    N.prototype.showFeatureBuyToast = function (Y, W) {
      var q = this;
      if (W === undefined) {
        W = 2;
      }
      var S = this._abortUpdateFeatureBuyToastBgSize;
      this._abortUpdateFeatureBuyToastBgSize = undefined;
      if (S) {
        S();
      }
      this.featureBuyToast.active = true;
      this.featureBuyToast.stopAllActions();
      this.featureBuyTurboSprite.node.stopAllActions();
      this.featureBuyTurboSprite.node.active = false;
      this.featureBuyTurboSprite.node.opacity = 0;
      if (!S) {
        this.featureBuyToast.opacity = 1;
      }
      this.featureBuyToastLabel.string = Y;
      this._abortUpdateFeatureBuyToastBgSize = L.delayCallback(0)(function () {
        q.featureBuyToastBg.width = q.featureBuyToastLabel.node.width + 20;
        q.featureBuyToastBg.height = q.featureBuyToastLabel.node.height + 48;
        q.featureBuyToast.opacity = 255;
        q.featureBuyToast.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1), cc.delayTime(W), cc.fadeOut(0.3), cc.callFunc(function () {
          q._abortUpdateFeatureBuyToastBgSize = undefined;
        })));
      });
    };
    // 隱藏購買功能提示
    N.prototype.hideFeatureBuyToast = function () {
      var Y = this;
      var W = this._abortUpdateFeatureBuyToastBgSize;
      this._abortUpdateFeatureBuyToastBgSize = undefined;
      if (W) {
        W();
      }
      this.featureBuyToast.stopAllActions();
      this.featureBuyToast.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
        Y._abortUpdateFeatureBuyToastBgSize = undefined;
      })));
    };
    // 設定購買提示位置
    N.prototype.setFeatureBuyToastNodePosition = function (Y, W, q) {
      this.featureBuyToast.setPosition(Y, W, q);
    };
    // 取得按鈕容器列表
    N.prototype.buttonsHolder = function () {
      return this.holders;
    };
    // 新增一個選單項目
    N.prototype.addMenuItem = function (Y) {
      this.holders[this._itemList.length].addChild(Y);
      this._itemList.push(Y);
      this._reloadMenuItems();
      return this.holders[this._itemList.length - 1];
    };
    // 插入空的選單位置
    N.prototype.addEmptyItem = function () {
      this._itemList.push(null);
      this._reloadMenuItems();
      return this.holders[this._itemList.length - 1];
    };
    // 以新陣列取代目前選單項目
    N.prototype.replaceMenuItems = function (Y) {
      this._itemList.length = 0;
      for (var W = 0, q = Y.length; W < q; W++) {
        this._itemList.push(Y[W]);
      }
      this._reloadMenuItems();
    };
    // 重新計算可見的選單項目
    N.prototype._reloadMenuItems = function () {
      this._visibleItems.length = 0;
      for (var Y = 0, W = this._itemList.length; Y < W; Y++) {
        if (this._showingDefaultMenu) {
          if (Y >= this.FRONT_MAX_HOLDER) {
            break;
          }
          this._visibleItems.push(this._itemList[Y]);
        } else if (Y >= this.FRONT_MAX_HOLDER) {
          this._visibleItems.push(this._itemList[Y]);
        }
      }
    };
    // 檢查項目是否可見
    N.prototype.isItemVisible = function (Y) {
      return this._visibleItems.indexOf(Y) !== -1;
    };
    // 取得目前可見項目列表
    N.prototype.visibleItems = function () {
      return this._visibleItems.slice();
    };
    // 取得所有項目的複本
    N.prototype.getTotalItems = function () {
      return this._itemList.slice();
    };
    // 判斷控制器是否處於閒置狀態
    N.prototype.isIdle = function () {
      return !this._isControllerPresent && this._showingDefaultMenu;
    };
    // 是否正在顯示預設選單
    N.prototype.isShowingDefaultMenu = function () {
      return this._showingDefaultMenu;
    };
    // 設定可穿透點擊的區域
    N.prototype.setHitPassThroughPosAndSize = function (Y, W, q, S) {
      var z = this.walletButtonSensor.convertToNodeSpaceAR(cc.v2(Y, W));
      this.hitPassThroughComponent.passPoint = cc.v2(z.x, z.y);
      this.hitPassThroughComponent.passSize = cc.size(q, S);
    };
    // 顯示或隱藏整個控制器
    N.prototype.setHidden = function (Y) {
      this.node.active = !Y;
    };
    // 取得前景資訊板的節點
    N.prototype.getSettingInfoFooterFrontHolder = function () {
      return this.settingInfoFooterFrontHolder;
    };
    // 取得底部資訊板的節點
    N.prototype.getSettingInfoFooterBottomHolder = function () {
      return this.settingInfoFooterBottomHolder;
    };
    // 取得中下資訊板的節點
    N.prototype.getSettingInfoFooterMiddleBottomHolder = function () {
      return this.settingInfoFooterMiddleBottomHolder;
    };
    // 調整選單層的偏移位置
    N.prototype.setMenusLayerHolderOffsetPosition = function (Y, W) {
      var q = this.menusLayerHolder;
      q.setPosition(q.x + Y, q.y + W);
    };
    // 判斷是否正在切換選單層
    N.prototype.isSwitchingMenuLayer = function () {
      return this._isSwitchingLayer;
    };
    // 顯示更多選單
    N.prototype.showMoreMenuLayer = function (Y) {
      var W = this;
      if (Y === undefined) {
        Y = false;
      }
      if (!this._isSwitchingLayer) {
        this._isSwitchingLayer = true;
        this._showingDefaultMenu = false;
        this._reloadMenuItems();
        this.defaultMenuLayerNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, 0, -this.defaultMenuLayerNode.height).easing(cc.easeQuadraticActionOut()), cc.fadeOut(0.2)), cc.callFunc(function () {
          W.defaultMenuLayerNode.active = false;
          W._isSwitchingLayer = false;
          if (W.onMenuEndChanged) {
            W.onMenuEndChanged();
          }
        })));
        this.moreMenuLayerNode.active = true;
        this.moreMenuLayerNode.runAction(cc.spawn(cc.moveTo(0.2, 0, 0).easing(cc.easeQuadraticActionOut()), cc.fadeIn(0.2).easing(cc.easeQuadraticActionOut())));
        if (Y) {
          this.blackTintBackground.active = true;
          this.blackTintBackground.runAction(cc.fadeTo(0.2, 127.5));
        }
        var q = this.onMenuStartChanged;
        if (q) {
          q(true, true);
        }
      }
    };
    // 隱藏更多選單
    N.prototype.hideMoreMenuLayer = function () {
      var Y = this;
      if (!this._isSwitchingLayer) {
        this._isSwitchingLayer = true;
        this._showingDefaultMenu = true;
        this._reloadMenuItems();
        this.defaultMenuLayerNode.active = true;
        this.defaultMenuLayerNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, 0, 0).easing(cc.easeQuadraticActionOut()), cc.fadeIn(0.2)), cc.callFunc(function () {
          Y._isSwitchingLayer = false;
          if (Y.onMenuEndChanged) {
            Y.onMenuEndChanged();
          }
        })));
        this.moreMenuLayerNode.runAction(cc.sequence(cc.spawn(cc.moveTo(0.2, 0, -this.defaultMenuLayerNode.height).easing(cc.easeQuadraticActionOut()), cc.fadeOut(0.2).easing(cc.easeQuadraticActionOut())), cc.callFunc(function () {
          Y.moreMenuLayerNode.active = false;
        })));
        if (this.blackTintBackground.active === true) {
          this.blackTintBackground.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
            Y.blackTintBackground.active = false;
          })));
        }
        var W = this.onMenuStartChanged;
        if (W) {
          W(false, true);
        }
      }
    };
    // 是否正在顯示控制器
    N.prototype.isControllerPresenting = function () {
      return this._isControllerPresent;
    };
    // 設定控制器顯示狀態
    N.prototype.setIsControllerPresenting = function (Y) {
      this._isControllerPresent = Y;
    };
    // 設定子控制器移動時間
    N.prototype.setSubControllerHolderMoveDuration = function (Y) {
      this._subControllerHolderMoveDuration = Y;
    };
    // 計算節點底部距離螢幕底的距離
    N.prototype._getGapBetweenBottomScreenValue = function () {
      return this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x, this.node.y)).y;
    };
    // 對外取得底部間距
    N.prototype.getGapBetweenBottomScreenValue = function () {
      return this._getGapBetweenBottomScreenValue();
    };
    // 更新子控制器容器高度
    N.prototype.updateSubControllerHolderHeight = function (Y) {
      this.subControllerHolder.height = this._currentUsingHeight = Y;
    };
    // 是否正在拖曳面板
    N.prototype.isPanelTouchMoving = function () {
      return this._isPanelTouchMoved;
    };
    // 開始拖曳面板
    N.prototype.startMovePanel = function (Y, W) {
      if (!this._isControllerPresent) {
        this._isPanelTouchMoved = false;
        this._panelCanBeMove = false;
        this.subControllerHolder.height = W;
        this.subControllerHolder.y = -W;
        this._startTouchPosY = Y;
        this.subControllerBG.height = this._getGapBetweenBottomScreenValue() + W;
      }
    };
    // 拖曳過程調整面板位置
    N.prototype.movePanel = function (Y) {
      if (!this._isControllerPresent) {
        this._isPanelTouchMoved = true;
        var W = this.subControllerHolder;
        var q = this.subControllerHolder.height;
        var S = W.parent.convertToNodeSpaceAR(cc.v2(0, Y)).y;
        var z = Math.abs(this._startTouchPosY - Y);
        if (this._panelCanBeMove) {
          W.y = S - q;
          if (W.y >= 0) {
            W.y = 0;
          }
        } else if (z > 60) {
          if (Y > this._startTouchPosY) {
            this._panelCanBeMove = true;
            this.subControllerBG.opacity = 255;
            if (this._movePanelCallback) {
              this._movePanelCallback();
            }
          }
        } else {
          W.y = S - q;
        }
      }
    };
    // 關閉面板動畫
    N.prototype.closePanel = function () {
      var Y = this;
      if (!this._isControllerPresent) {
        this._isControllerPresent = true;
        var W = this.subControllerHolder.height + this._getGapBetweenBottomScreenValue();
        this.subControllerHolder.runAction(cc.sequence(cc.moveTo(this._subControllerHolderMoveDuration, 0, -W), cc.callFunc(function () {
          Y._isControllerPresent = false;
          Y._isPanelTouchMoved = false;
          Y.subControllerBG.opacity = 0;
        })));
      }
    };
    // 取得面板頂部的 Y 位置
    N.prototype.getCurrentPanelTopPositionY = function () {
      var Y = this.subControllerHolder;
      return Y.y + Y.height;
    };
    // 鎖定或解鎖錢包按鈕
    N.prototype.setWalletButtonLock = function (Y = false) {
      this._lockWalletButton = Y;
    };
    // 錢包按鈕互動時關閉面板
    N.prototype.interactableWalletButton = function (Y, W) {
      if (this._lockWalletButton === false && !Y && W) {
        this.closePanel();
      }
    };
    // 控制選單遮罩顯示
    N.prototype.setMenuUIBlock = function (Y) {
      this.settingMenuUIBlock.active = Y;
    };
    // 依語系調整提示排版
    N.prototype.updateLayout = function (Y) {
      if (Y) {
        this.settingToastLayout.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
      }
    };
    __decorate([G(cc.Node)], N.prototype, "blackTintBackground", undefined);
    __decorate([G(cc.Node)], N.prototype, "dimBackground", undefined);
    __decorate([G(cc.Node)], N.prototype, "subControllerHolder", undefined);
    __decorate([G(cc.Node)], N.prototype, "menusLayerHolder", undefined);
    __decorate([G(cc.Node)], N.prototype, "defaultMenuLayerNode", undefined);
    __decorate([G(cc.Node)], N.prototype, "moreMenuLayerNode", undefined);
    __decorate([G(cc.Node)], N.prototype, "subControllerBG", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingInfoFooterFrontHolder", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingInfoFooterMiddleBottomHolder", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingInfoFooterBottomHolder", undefined);
    __decorate([G(cc.Node)], N.prototype, "walletButtonSensor", undefined);
    __decorate([G(x.default)], N.prototype, "hitPassThroughComponent", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingToast", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingToastBg", undefined);
    __decorate([G(cc.Layout)], N.prototype, "settingToastLayout", undefined);
    __decorate([G(cc.Label)], N.prototype, "settingToastLabel", undefined);
    __decorate([G(cc.Sprite)], N.prototype, "settingTurboSprite", undefined);
    __decorate([G(cc.SpriteFrame)], N.prototype, "settingTurboOnSprite", undefined);
    __decorate([G(cc.SpriteFrame)], N.prototype, "settingTurboOffSprite", undefined);
    __decorate([G(cc.Node)], N.prototype, "featureBuyToast", undefined);
    __decorate([G(cc.Node)], N.prototype, "featureBuyToastBg", undefined);
    __decorate([G(cc.Layout)], N.prototype, "featureBuyToastLayout", undefined);
    __decorate([G(cc.RichText)], N.prototype, "featureBuyToastLabel", undefined);
    __decorate([G(cc.Sprite)], N.prototype, "featureBuyTurboSprite", undefined);
    __decorate([G(cc.Node)], N.prototype, "reminderBoard", undefined);
    __decorate([G(cc.Label)], N.prototype, "originalBetAmountLabel", undefined);
    __decorate([G(cc.Label)], N.prototype, "reminderBoardLabel", undefined);
    __decorate([G([cc.Node])], N.prototype, "holders", undefined);
    __decorate([G(cc.Node)], N.prototype, "muteIcon", undefined);
    __decorate([G(cc.Node)], N.prototype, "settingMenuUIBlock", undefined);
    return __decorate([j], N);
  }(cc.Component);
  exports.SettingMenuController = V;
  cc._RF.pop();
}