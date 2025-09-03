if (!cc._RF.push(module, "dfa18t2v9JGMYU5wqlXKj6g", "MultiplierController")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.curveTo = exports.threePointCurve = exports.DESELECTED_MULTIPLIER_SIZE_MAP = exports.SELECTED_MULTIPLIER_SIZE_MAP = exports.MULTIPLIER_T = exports.MULTIPLIER_SIZE = undefined;
  var D = require("Utils");
  var k = require("NodePoolHandler");
  var C = require("AudioConstant");
  var j = require("AudioManager");
  var G = require("GameConstant");
  var V = require("MultiplierItemController");
  var Q = require("MultiplierShiftHandler");
  var N = require("WBSGameUtils");
  var Y = cc._decorator;
  var W = Y.ccclass;
  var q = Y.property;
  exports.MULTIPLIER_SIZE = [1, 1, 1, 1, 1];
  exports.MULTIPLIER_T = [0.18, 0.32, 0.5, 0.68, 0.83];
  exports.SELECTED_MULTIPLIER_SIZE_MAP = {
    "1": 1.43,
    "2": 1.43,
    "4": 1.43,
    "8": 1.43,
    "16": 1.33,
    "32": 1.33,
    "64": 1.33,
    "128": 1.23,
    "256": 1.23,
    "512": 1.23,
    "1024": 1.13
  };
  exports.DESELECTED_MULTIPLIER_SIZE_MAP = {
    "1": 0.86,
    "2": 0.86,
    "4": 0.86,
    "8": 0.86,
    "16": 0.82,
    "32": 0.82,
    "64": 0.82,
    "128": 0.76,
    "256": 0.76,
    "512": 0.76,
    "1024": 0.72
  };
  var M = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
  var E = [8, 16, 32, 64, 128, 256, 512, 1024];
  var F = cc.v2(-600, 179);
  var H = cc.v2(0, -191);
  var w = cc.v2(600, 179);
  exports.threePointCurve = B;
  exports.curveTo = P;
  var U = function (X) {
    function J() {
      var Z0 = X !== null && X.apply(this, arguments) || this;
      Z0.holder = undefined;
      Z0.tint = undefined;
      Z0.multiplierItem = undefined;
      Z0.multiplierContainer = undefined;
      Z0.nextMultiplierEffect = undefined;
      Z0.numberFacingPoint = undefined;
      Z0.introAnim = undefined;
      Z0.introShine = undefined;
      Z0.shinningEffectAnim = undefined;
      Z0.freeSpinMultiplierContainer = undefined;
      Z0._multiplierShiftSlotHandler = undefined;
      Z0._multiplierItemObject = Object.create(null);
      Z0._currentMultiplierList = [];
      Z0._currentMultiplier = undefined;
      Z0._infoboardPos = cc.v2(0, -1360);
      Z0._disposeZoom = undefined;
      Z0._freeSpinMultiplierList = [];
      return Z0;
    }
    __extends(J, X);
    // 初始化倍數控制器並建立所需的物件池
    J.prototype.init = function () {
      this.reset();
      this._clearVfx();
      k.nodePoolHandler.registerReusableItem(G.NodePoolName.Multiplier, this.multiplierItem, "MultiplierItemController", 7);
      this._multiplierShiftSlotHandler = new Q.default();
      this._multiplierShiftSlotHandler.init({
        getMultiplierItems: this._getCurrentMultiplierItem.bind(this),
        createMultiplier: this._createMultiplier.bind(this),
        multiplierItemContainer: this.multiplierContainer
      });
    };
    // 倍數面板向上縮放顯示
    J.prototype.zoomIn = function (Z0, Z1) {
      var Z2 = this;
      if (Z0 === undefined) {
        Z0 = false;
      }
      var Z3 = this.holder.y;
      var Z4 = this._disposeZoom;
      if (Z4) {
        Z4();
      }
      this._disposeZoom = undefined;
      if (Z0) {
        this.holder.setPosition(0, 893);
        if (Z1) {
          Z1();
        }
      } else {
        this._disposeZoom = N.lerpTo(function (Z5, Z6) {
          var Z7 = Z6 * (2 - Z6);
          var Z8 = cc.misc.lerp(Z3, 893, Z7);
          Z2.holder.setPosition(0, Z8);
          if (Z6 === 1 && Z1) {
            Z1();
          }
        }, Z3, 893, 1);
      }
    };
    // 倍數面板恢復原始位置
    J.prototype.zoomOut = function (Z0, Z1) {
      var Z2 = this;
      if (Z0 === undefined) {
        Z0 = false;
      }
      var Z3 = this.holder.y;
      var Z4 = this._disposeZoom;
      if (Z4) {
        Z4();
      }
      this._disposeZoom = undefined;
      if (Z0) {
        this.holder.setPosition(0, 843);
        if (Z1) {
          Z1();
        }
      } else {
        this._disposeZoom = N.lerpTo(function (Z5, Z6) {
          var Z7 = Z6 * (2 - Z6);
          var Z8 = cc.misc.lerp(Z3, 843, Z7);
          Z2.holder.setPosition(0, Z8);
          if (Z6 === 1 && Z1) {
            Z1();
          }
        }, Z3, 843, 4);
      }
    };
    J.prototype.playGameIntroZoomIn = function (Z0, Z1) {
      var Z2 = this;
      if (Z0 === undefined) {
        Z0 = false;
      }
      var Z3 = this.holder.y;
      var Z4 = this._disposeZoom;
      if (Z4) {
        Z4();
      }
      this._disposeZoom = undefined;
      if (Z0) {
        this.holder.setPosition(0, 893);
        if (Z1) {
          Z1();
        }
      } else {
        this._disposeZoom = N.lerpTo(function (Z5, Z6) {
          var Z7 = 1 - Math.pow(1 - Z6, 4);
          var Z8 = cc.misc.lerp(Z3, 893, Z7);
          Z2.holder.setPosition(0, Z8);
          if (Z6 === 1 && Z1) {
            Z1();
          }
        }, Z3, 893, 1);
      }
    };
    J.prototype.playGameIntroShinningEffect = function () {
      this.shinningEffectAnim.play();
    };
    J.prototype.playBonusIntro = function (Z0) {
      var Z1 = this;
      j.playAudio(C.GENERAL_AUDIO.fsIntroStart.key);
      var Z2 = this.holder.y;
      var Z3 = this._disposeZoom;
      if (Z3) {
        Z3();
      }
      this._disposeZoom = N.lerpTo(function (Z4, Z5) {
        var Z6 = Z5 < 0.5 ? Z5 * 16 * Z5 * Z5 * Z5 * Z5 : 1 - Math.pow(Z5 * -2 + 2, 5) / 2;
        var Z7 = cc.misc.lerp(Z2, 200, Z6);
        Z1.holder.setPosition(0, Z7);
        if (Z5 === 1 && Z0) {
          Z0();
        }
      }, Z2, 200, 1);
    };
    J.prototype.exitBonusInto = function (Z0, Z1) {
      var Z2 = this;
      if (Z0 === undefined) {
        Z0 = false;
      }
      var Z3 = this.holder.y;
      var Z4 = this._disposeZoom;
      if (Z4) {
        Z4();
      }
      this._disposeZoom = undefined;
      j.playAudio(C.GENERAL_AUDIO.fsIntroEnd.key);
      if (Z0) {
        this.holder.setPosition(0, 893);
        if (Z1) {
          Z1();
        }
      } else {
        this._disposeZoom = N.lerpTo(function (Z5, Z6) {
          var Z7 = 1 - Math.pow(1 - Z6, 5);
          var Z8 = cc.misc.lerp(Z3, 893, Z7);
          Z2.holder.setPosition(0, Z8);
          if (Z6 === 1 && Z1) {
            Z1();
          }
        }, Z3, 893, 1);
      }
    };
    J.prototype.reloadMultiplier = function (Z0, Z1) {
      var Z2 = this;
      if (Z1 === undefined) {
        Z1 = false;
      }
      this._currentMultiplier = Z0;
      this.reset();
      var Z3 = this._getMultiplierToShow(Z0, Z1);
      this._currentMultiplierList = Z3;
      Z3.forEach(function (Z4, Z5) {
        Z2._createMultiplier(Z4, Z5);
      });
    };
    // 觸發倍數向右移動的動畫
    J.prototype.playShiftRight = function (Z0, Z1, Z2) {
      var Z3 = this;
      this._currentMultiplier = Z0;
      if (Z0 > this._currentMultiplierList[2]) {
        var Z4 = this._getMultiplierToShow(Z0, Z1);
        this._playMultiplierUpAudio(Z0);
        this._playNextMultiplierGlowEffect();
        this._multiplierShiftSlotHandler.playShiftRight(Z4, this._currentMultiplierList, function () {
          Z3.reloadMultiplier(Z0, Z1);
          if (Z2) {
            Z2();
          }
        });
      } else if (Z2) {
        Z2();
      }
    };
    // 觸發倍數向左移動的動畫
    J.prototype.playShiftLeft = function (Z0, Z1, Z2) {
      var Z3 = this;
      this._currentMultiplier = Z0;
      if (Z0 < this._currentMultiplierList[2]) {
        var Z4 = this._getMultiplierToShow(Z0, Z1);
        this._multiplierShiftSlotHandler.playShiftLeft(Z4, this._currentMultiplierList, function () {
          Z3.reloadMultiplier(Z0, Z1);
          if (Z2) {
            Z2();
          }
        });
      } else if (Z2) {
        Z2();
      }
    };
    // 播放重置倍數的動畫
    J.prototype.playReset = function (Z0, Z1) {
      var Z2 = Z0 ? 8 : 1;
      this.playShiftTo(Z2, Z0, Z1);
    };
    J.prototype.playShiftTo = function (Z0, Z1, Z2) {
      this._recursiveShift(Z0, Z1, Z2);
    };
    // 重置所有倍數顯示狀態
    J.prototype.reset = function () {
      this._clear();
    };
    // 播放指定倍數的效果
    J.prototype.playMultiplier = function (Z0) {
      var Z1 = this;
      var Z2 = k.nodePoolHandler.dequeueReusableItem(G.NodePoolName.Multiplier);
      Z2.parent = this.holder;
      Z2.position = cc.v3(0, -147, 0);
      var Z3 = Z2.getComponent(V.default);
      Z3.show(this._currentMultiplier);
      Z3.showShine();
      this._setupSelectedMultiplierNode(Z3);
      this._playMultiplierFlyAudio(this._currentMultiplier);
      var Z4 = Z2.position;
      var Z5 = Z4.x;
      var Z6 = Z4.y;
      var Z7 = (Z5 + this._infoboardPos.x) / 2;
      var Z8 = (Z6 + this._infoboardPos.y) / 2;
      var Z9 = cc.v2(Z7, Z8);
      Z2.stopAllActions();
      Z2.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
        var ZZ = Object.keys(Z1._multiplierItemObject);
        if (ZZ.length > 0) {
          ZZ.forEach(function (ZI) {
            Z1._multiplierItemObject[ZI].hideShine(true);
          });
        }
      }), cc.spawn(cc.moveTo(0.4, Z9).easing(cc.easeOut(1.5)), cc.scaleTo(0.4, 2.5).easing(cc.easeOut(1.5))), cc.spawn(cc.moveTo(0.4, this._infoboardPos).easing(cc.easeIn(2)), cc.scaleTo(0.4, 1).easing(cc.easeIn(2))), cc.callFunc(function () {
        if (Z0) {
          Z0();
        }
      }), cc.callFunc(function () {
        var ZZ = Object.keys(Z1._multiplierItemObject);
        if (ZZ.length > 0) {
          ZZ.forEach(function (ZI) {
            var Zd = Z1._multiplierItemObject[ZI];
            if (Zd.multiplierNumber === 1024 && Zd.isSelected) {
              Zd.showShine();
            }
          });
        }
      }), cc.spawn(cc.scaleTo(0.5, 5), cc.fadeOut(0.2)), cc.callFunc(function () {
        Z2.destroy();
      })));
    };
    J.prototype.playTransformToFreeSpinMutliplier = function (Z0) {
      var Z1 = this;
      this._enableDim();
      D.sequenceCallback(this.playBonusIntro.bind(this), function (Z2) {
        Z1.playShiftTo(8, false, function () {
          var Z4 = Z1.introAnim;
          Z4.node.active = true;
          Z4.stop();
          Z4.play();
          Z2();
        });
        j.playAudio(C.GENERAL_AUDIO.fsIntroShift.key);
        var Z3 = Z1.introShine;
        Z3.stopAllActions();
        Z3.eulerAngles = cc.Vec3.ZERO;
        Z3.opacity = 0;
        Z3.runAction(cc.rotateBy(25, 360).repeatForever());
        Z3.runAction(cc.fadeIn(0.3));
      }, function (Z2) {
        var Z3 = [];
        for (var Z4 = Object.values(Z1._multiplierItemObject).slice(0, 2), Z5 = function (Z8) {
            var Z9 = Z4[Z8];
            var ZZ = Z4.length - 1 - Z8 * 0.15;
            Z3.push(function (ZI) {
              Z9.playBreak(ZZ, ZI);
            });
          }, Z6 = 0; Z6 < Z4.length; Z6++) {
          Z5(Z6);
        }
        var Z7 = Z4.length - 1;
        D.delayCallback(Z7)(function () {
          j.playAudio(C.GENERAL_AUDIO.fsIntroChange.key);
        });
        D.spawnCallback(Z3)(Z2);
      }, this._playFreeSpinMultiplier.bind(this), this._removeFreeSpinMultiplier.bind(this), function (Z2) {
        Z1.reloadMultiplier(8, true);
        var Z3 = Z1.introAnim;
        Z3.stop();
        Z3.node.active = false;
        var Z4 = Z1.introShine;
        Z4.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function () {
          Z4.stopAllActions();
          Z2();
        })));
      })(function () {
        Z1._disableDim();
        Z1.exitBonusInto(false, Z0);
      });
    };
    // 啟用半透明遮罩
    J.prototype._enableDim = function () {
      this.tint.stopAllActions();
      this.tint.runAction(cc.fadeTo(0.5, 102));
    };
    // 關閉半透明遮罩
    J.prototype._disableDim = function () {
      this.tint.stopAllActions();
      this.tint.runAction(cc.fadeOut(1));
    };
    J.prototype._recursiveShift = function (Z0, Z1, Z2) {
      var Z3 = this;
      var Z4 = this._currentMultiplier;
      function Z5() {
        Z3._recursiveShift(Z0, Z1, Z2);
      }
      if (Z0 > Z4) {
        var Z6 = Z4 * 2;
        this.playShiftRight(Z6, Z1, Z5);
      } else if (Z0 < Z4) {
        Z6 = Z4 / 2;
        this.playShiftLeft(Z6, Z1, Z5);
      } else if (Z2) {
        Z2();
      }
    };
    // 清除所有倍數項目
    J.prototype._clear = function () {
      var Z0 = this;
      var Z1 = Object.keys(this._multiplierItemObject);
      if (Z1.length > 0) {
        Z1.forEach(function (Z2) {
          Z0._multiplierItemObject[Z2].node.destroy();
        });
        this._multiplierItemObject = Object.create(null);
      }
    };
    J.prototype._clearVfx = function () {
      var Z0 = this.introAnim;
      Z0.stop();
      Z0.node.active = false;
      var Z1 = this.introShine;
      Z1.stopAllActions();
      Z1.opacity = 0;
      Z1.eulerAngles = cc.Vec3.ZERO;
    };
    // 取得目前顯示的倍數項目列表
    J.prototype._getCurrentMultiplierItem = function () {
      var Z0 = this;
      var Z1 = [];
      this._currentMultiplierList.forEach(function (Z2) {
        if (Z2 !== -1) {
          Z1.push(Z0._multiplierItemObject[Z2]);
        } else {
          Z1.push(null);
        }
      });
      return Z1;
    };
    J.prototype._getMultiplierToShow = function (Z0, Z1 = false) {
      var Z2 = Z1 ? E : M;
      var Z3 = Z2.indexOf(Z0);
      var Z4 = [];
      Z4[0] = Z2[Z3 - 2];
      Z4[1] = Z2[Z3 - 1];
      Z4[2] = Z2[Z3];
      Z4[3] = Z2[Z3 + 1];
      Z4[4] = Z2[Z3 + 2];
      switch (Z3) {
        case 0:
          Z4[0] = Z2[Z2.length - 2];
          Z4[1] = Z2[Z2.length - 1];
          break;
        case 1:
          Z4[0] = Z2[Z2.length - 1];
          Z4[1] = Z2[Z3 - 1];
          break;
        case Z2.length - 1:
          Z4[3] = Z2[0];
          Z4[4] = Z2[1];
          break;
        case Z2.length - 2:
          Z4[3] = Z2[Z3 + 1];
          Z4[4] = Z2[0];
      }
      return Z4;
    };
    J.prototype._createMultiplier = function (Z0, Z1) {
      if (Z0 !== -1) {
        var Z2 = this.numberFacingPoint;
        var Z3 = k.nodePoolHandler.dequeueReusableItem(G.NodePoolName.Multiplier);
        var Z4 = Z3.getComponent(V.default);
        var Z5 = P(exports.MULTIPLIER_T[Z1]);
        this.multiplierContainer.addChild(Z3);
        Z3.setPosition(cc.v3(Z5.x, Z5.y, 0));
        Z4.init(Z2);
        Z4.show(Z0);
        if (this._currentMultiplier === Z0) {
          this._setupSelectedMultiplierNode(Z4);
        } else {
          this._setupDeselectedMultiplierNode(Z4);
        }
        this._multiplierItemObject[Z0] = Z4;
        return Z4;
      }
    };
    J.prototype._setupSelectedMultiplierNode = function (Z0) {
      Z0.selected();
    };
    J.prototype._setupDeselectedMultiplierNode = function (Z0) {
      Z0.deselected();
    };
    J.prototype._playNextMultiplierGlowEffect = function () {
      this.nextMultiplierEffect.stopAllActions();
      this.nextMultiplierEffect.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.1), cc.fadeOut(0.1)));
    };
    J.prototype._playFreeSpinMultiplier = function (Z0) {
      var Z1 = 0;
      var Z2 = 0;
      var Z3 = function (Z6) {
        Z1++;
        var Z7 = Z4.numberFacingPoint;
        var Z8 = k.nodePoolHandler.dequeueReusableItem(G.NodePoolName.Multiplier);
        var Z9 = Z8.getComponent(V.default);
        var ZZ = P(0);
        Z4.freeSpinMultiplierContainer.addChild(Z8);
        Z8.setPosition(cc.v3(ZZ.x, ZZ.y, 0));
        Z9.init(Z7);
        Z9.show(E[E.length - (2 - Z6)]);
        Z4._setupDeselectedMultiplierNode(Z9);
        Z4._freeSpinMultiplierList.push(Z8);
        var ZI = exports.MULTIPLIER_T[Z6];
        var Zd = (1 - Z6) * 0.04;
        D.delayCallback(Zd)(function () {
          N.lerpTo(function (ZO) {
            var ZR = P(ZO);
            Z8.setPosition(ZR.x, ZR.y, 0);
            if (ZO === ZI && Z1 === ++Z2 && Z0) {
              Z0();
            }
          }, 0, ZI, 0.15);
        });
      };
      var Z4 = this;
      for (var Z5 = 0; Z5 < 2; Z5++) {
        Z3(Z5);
      }
    };
    J.prototype._removeFreeSpinMultiplier = function (Z0) {
      if (this._freeSpinMultiplierList.length > 0) {
        this._freeSpinMultiplierList.forEach(function (Z1) {
          k.nodePoolHandler.enqueueReusableItem(Z1, G.NodePoolName.Multiplier);
        });
        this._freeSpinMultiplierList = [];
      }
      if (Z0) {
        Z0();
      }
    };
    J.prototype._playMultiplierUpAudio = function (Z0) {
      switch (Z0) {
        case 1:
        case 2:
          j.playAudio(C.GENERAL_AUDIO.multiUp1.key);
          break;
        case 4:
        case 8:
          j.playAudio(C.GENERAL_AUDIO.multiUp2.key);
          break;
        case 16:
        case 32:
        case 64:
          j.playAudio(C.GENERAL_AUDIO.multiUp3.key);
          break;
        case 128:
        case 256:
        case 512:
        case 1024:
          j.playAudio(C.GENERAL_AUDIO.multiUp4.key);
      }
    };
    J.prototype._playMultiplierFlyAudio = function (Z0) {
      switch (Z0) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 16:
        case 32:
        case 64:
          j.playAudio(C.GENERAL_AUDIO.multiFly.key);
          break;
        case 128:
        case 256:
        case 512:
        case 1024:
          j.playAudio(C.GENERAL_AUDIO.multiFlyBig.key);
      }
    };
    __decorate([q(cc.Node)], J.prototype, "holder", undefined);
    __decorate([q(cc.Node)], J.prototype, "tint", undefined);
    __decorate([q(cc.Prefab)], J.prototype, "multiplierItem", undefined);
    __decorate([q(cc.Node)], J.prototype, "multiplierContainer", undefined);
    __decorate([q(cc.Node)], J.prototype, "nextMultiplierEffect", undefined);
    __decorate([q(cc.Node)], J.prototype, "numberFacingPoint", undefined);
    __decorate([q(cc.Animation)], J.prototype, "introAnim", undefined);
    __decorate([q(cc.Node)], J.prototype, "introShine", undefined);
    __decorate([q(cc.Animation)], J.prototype, "shinningEffectAnim", undefined);
    __decorate([q(cc.Node)], J.prototype, "freeSpinMultiplierContainer", undefined);
    return __decorate([W], J);
  }(cc.Component);
  exports.default = U;
  cc._RF.pop();
}
function B(X, J, Z0, Z1) {
  var Z2 = Math.pow(1 - X, 2) * J.x + (1 - X) * 2 * X * Z0.x + Math.pow(X, 2) * Z1.x;
  var Z3 = Math.pow(1 - X, 2) * J.y + (1 - X) * 2 * X * Z0.y + Math.pow(X, 2) * Z1.y;
  return cc.v2(Z2, Z3);
}
function P(X) {
  return B(X, F, H, w);
}