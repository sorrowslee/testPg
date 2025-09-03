if (!cc._RF.push(module, "3abd4EpJjRPAJTm/EYgPzXu", "WBSPrizeState")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var T = require("Utils");
  var x = require("TransactionStateMachineHandler");
  var L = require("PrizeState");
  var D = require("SettingMenuHelper");
  var k = require("SlotGameTools");
  var C = require("GameConstant");
  var j = require("InfoBoardController");
  require("WBSTweaksConfig");
  var G = require("AutomationDecorator");
  var V = require("WinHighlight.spec");
  var Q = function (N) {
    function Y(W, q, S) {
      var z = N.call(this, W, q, S) || this;
      z.name = "Prize State";
      var f = q.generalControllers;
      var A = f.slotController;
      var M = f.spinButtonController;
      z.setSlotController(A);
      z.setSpinButtonController(M);
      return z;
    }
    __extends(Y, N);
    Y.prototype.renderPrize = function () {
      // 依據倍數與交易狀態播放獎勵流程
      var W = this.dataSource.transactionModel;
      var q = W.isTransactionEnd;
      var S = W.gameMultiplier;
      if (!q && S > 1) {
        T.sequenceCallback(this._updateTransitionState.bind(this), T.spawnCallback(this.renderLines.bind(this), T.sequenceCallback(T.spawnCallback(this._playMultiplier.bind(this), this._preSymbolBreakEffect.bind(this)), this.playPrize.bind(this))), T.spawnCallback(this._showFreeSpinWon.bind(this), this._checkBonusStep.bind(this)))(this.exit.bind(this));
      } else {
        T.sequenceCallback(this._updateTransitionState.bind(this), T.spawnCallback(this.renderLines.bind(this), T.sequenceCallback(this._preSymbolBreakEffect.bind(this), T.delayCallback(0.3)), this.playPrize.bind(this)), T.spawnCallback(this._showFreeSpinWon.bind(this), this._checkBonusStep.bind(this)))(this.exit.bind(this));
      }
    };
    Y.prototype.renderLines = function (W) {
      // 顯示得獎線
      N.prototype.renderLines.call(this, W);
    };
    Y.prototype.playAllLines = function (W) {
      // 播放所有得獎線或高亮效果
      if (this.dataSource.transactionModel.isMaximumWin) {
        W();
      } else {
        this._playHighLightEffect(W);
      }
    };
    Y.prototype.playPrize = function (W) {
      // 根據獲勝金額判斷獎勵類型
      var q = this.dataSource.transactionModel;
      var S = q.singleSpinAccumulatedWin;
      var z = q.totalWinAmount;
      var f = q.stateTransitionFrom;
      var A = q.isTransactionEnd;
      var M = this.getWinThresholds();
      var E = f !== C.TransitionState.NORMAL && A ? S : z;
      if (A) {
        if (k.isBigWinThreshold(E, M)) {
          this.runBigPrizeState(E, W);
        } else if (k.isMediumWinThreshold(S, M)) {
          this.runMediumPrizeState(E, W);
        } else if (E > 0) {
          this.runSmallPrizeState(E, W);
        } else {
          this._updatePrizes();
          W();
        }
      } else {
        if (k.isMediumWinThreshold(S, M)) {
          this.runMediumPrizeState(E);
        } else if (E > 0) {
          this.runSmallPrizeState(E);
        } else {
          this._updatePrizes();
        }
        W();
      }
    };
    Y.prototype.runBigPrizeState = function (W, q) {
      // 播放大獎流程
      var S = this.dataSource.transactionModel;
      var z = S.isTransactionEnd;
      var f = S.gameMultiplier;
      var A = z ? j.InfoBoardShowState.HIGH_PAY_BIG_TOTAL_WIN : j.InfoBoardShowState.HIGH_PAY_WIN;
      T.sequenceCallback(k.emitSocialBigWinStart, T.delayCallback(1), this._playBigWin(W), this._showInfoboardWin(A, W, f), T.delayCallback(0.5), k.emitSocialBigWinEnd, this._updatePrizes.bind(this))(q);
    };
    Y.prototype.runMediumPrizeState = function (W, q) {
      // 播放中獎流程
      var S = this.dataSource.transactionModel;
      var z = S.isTransactionEnd;
      var f = S.gameMultiplier;
      var A = z ? j.InfoBoardShowState.HIGH_PAY_TOTAL_WIN : j.InfoBoardShowState.HIGH_PAY_WIN;
      T.sequenceCallback(this._showInfoboardWin(A, W, f), this._updatePrizes.bind(this))(function () {
        if (q) {
          q();
        }
      });
    };
    Y.prototype.runSmallPrizeState = function (W, q) {
      // 播放小獎流程
      var S = this.dataSource.transactionModel;
      var z = S.isTransactionEnd;
      var f = S.gameMultiplier;
      var A = z ? j.InfoBoardShowState.LOW_PAY_TOTAL_WIN : j.InfoBoardShowState.LOW_PAY_WIN;
      T.sequenceCallback(this._showInfoboardWin(A, W, f), this._updatePrizes.bind(this))(function () {
        if (q) {
          q();
        }
      });
    };
    Y.prototype.runBeforeMultiplierPrizeState = function (W, q, S) {
      // 倍數計算前顯示預覽獎金
      this._showInfoboardWin(j.InfoBoardShowState.BEFORE_FINAL_PAY_WIN, W, q)();
      if (S) {
        S();
      }
    };
    Y.prototype._showFreeSpinWon = function (W) {
      // 顯示額外免費旋轉的提示
      var q = this.dataSource.transactionModel;
      var S = q.freeSpin;
      if (q.stateTransitionTo === C.TransitionState.FREE_SPIN && S && S.additionalStep) {
        var z = this.controllerPool.bonusControllers.freeSpinWonController;
        var f = this.controllerPool.generalControllers.slotTintController;
        this.controllerPool.generalControllers.infoboardController.showFreeSpinWonTip();
        f.enableFullDarkReel();
        z.play(S.additionalStep, function () {
          f.disableDarkMode(true, W);
        });
      } else if (W) {
        W();
      }
    };
    Y.prototype._checkBonusStep = function (W) {
      // 更新剩餘免費旋轉次數
      var q = this.dataSource.transactionModel;
      var S = q.freeSpin;
      if (q.stateTransitionTo === C.TransitionState.FREE_SPIN && S && S.additionalStep) {
        var z = this.controllerPool.bonusControllers.remainingFreeSpinController;
        T.delayCallback(1)(function () {
          z.increaseFreeSpinCount(S.step, W);
        });
      } else if (W) {
        W();
      }
    };
    Y.prototype._updateTransitionState = function (W) {
      // 更新狀態機轉換
      var q = this.dataSource.transactionModel;
      var S = q.isTransactionEnd;
      var z = q.stateTransitionTo;
      if (S) {
        var f = z === C.TransitionState.NORMAL ? "setup" : "idle";
        T.sequenceCallback(x.transitionCompleteCallback("prize"), x.goToStateCallback(f, true))(W);
      } else if (W) {
        W();
      }
    };
    Y.prototype._updatePrizes = function (W) {
      // 更新設定選單中的餘額與贏分
      var q = this.dataSource.playerModel.balance;
      var S = this.dataSource.transactionModel.accumulatedWinAmount;
      D.settingMenuHelper.setWinAmount(S);
      D.settingMenuHelper.setBalance(q);
      if (W) {
        W();
      }
    };
    Y.prototype._playBigWin = function (W) {
      // 播放 Big Win 動畫
      var q = this;
      return function (S) {
        q.controllerPool.generalControllers.bigWinController.play(W, 0, S);
      };
    };
    Y.prototype._showInfoboardWin = function (W, q, S) {
      // 顯示訊息板獲獎資訊
      var z = this;
      return function (f) {
        var A = z.controllerPool.generalControllers.infoboardController;
        var M = {
          playState: W,
          amount: q,
          multiplierNumber: S
        };
        A.stop();
        A.play(M, f);
      };
    };
    Y.prototype._playHighLightEffect = function (W) {
      // 高亮顯示中獎符號
      var q = D.settingMenuHelper.turboSpinOn;
      var S = this.controllerPool.generalControllers;
      var z = S.slotTintController;
      var f = S.slotController;
      var A = this.dataSource.transactionModel.winPositionList;
      z.removeOverlaySlotItem();
      z.enableFullDarkReel(true);
      var M = [];
      if (q) {
        f.getSlotItems(A).forEach(function (b) {
          z.addOverlaySlotItem(b);
          M.push(function (H) {
            b.playHighLight(H);
          });
        });
      } else {
        var E = function (b) {
          var H = C.SLOT_ITEM_MAP[b];
          var w = b * 0.05;
          var U = function (P) {
            var X = A[P];
            if (H.includes(X)) {
              var y = f.getSlotItems([X])[0];
              z.addOverlaySlotItem(y);
              M.push(function (m) {
                T.delayCallback(w)(function () {
                  y.playHighLight(m);
                });
              });
            }
          };
          for (var B = 0; B < A.length; B++) {
            U(B);
          }
        };
        for (var F = 0; F < C.SLOT_ITEM_MAP.length; F++) {
          E(F);
        }
      }
      T.spawnCallback(M)(W);
    };
    Y.prototype._preSymbolBreakEffect = function (W) {
      // 播放符號破裂前的預備動畫
      var q = this.dataSource.transactionModel;
      var S = q.isMaximumWin;
      var z = q.winLines;
      if (!S && z) {
        var f = this.controllerPool.generalControllers.slotController;
        var A = this.dataSource.transactionModel.winPositionList;
        var M = f.getSlotItems(A);
        T.delayCallback(0.7)(function () {
          M.forEach(function (E) {
            E.playPreBreak();
          });
          if (W) {
            W();
          }
        });
      } else if (W) {
        W();
      }
    };
    Y.prototype._playMultiplier = function (W) {
      // 播放倍數動畫後進入獎勵
      var q = this.dataSource.transactionModel;
      var S = q.gameMultiplier;
      var z = q.totalWinBeforeMultiplier;
      var f = this.controllerPool.generalControllers.multiplierController;
      this.runBeforeMultiplierPrizeState(z, S, function () {
        f.playMultiplier(W);
      });
    };
    __decorate([G.automationDec({
      func: V.showWinHighlight
    })], Y.prototype, "playAllLines", null);
    return Y;
  }(L.default);
  exports.default = Q;
  cc._RF.pop();
}