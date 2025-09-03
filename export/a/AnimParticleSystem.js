if (!cc._RF.push(module, "3142aQR/shASo2uVaU35yUL", "AnimParticleSystem")) {
  exports.__esModule = true;
  exports.default = undefined;
  var L = require("AnimParticleSystemUtils");
  var D = cc.Enum({
    LINEAR: 0,
    GRAVITY: 1
  });
  var k = [undefined, {
    proto: cc.easeIn,
    needParam: true
  }, {
    proto: cc.easeOut,
    needParam: true
  }, {
    proto: cc.easeInOut,
    needParam: true
  }, {
    proto: cc.easeSineIn
  }, {
    proto: cc.easeSineOut
  }, {
    proto: cc.easeSineInOut
  }, {
    proto: cc.easeCubicActionIn
  }, {
    proto: cc.easeCubicActionOut
  }, {
    proto: cc.easeCubicActionInOut
  }, {
    proto: cc.easeQuinticActionIn
  }, {
    proto: cc.easeQuinticActionOut
  }, {
    proto: cc.easeQuinticActionInOut
  }, {
    proto: cc.easeCircleActionIn
  }, {
    proto: cc.easeCircleActionOut
  }, {
    proto: cc.easeCircleActionInOut
  }, {
    proto: cc.easeElasticIn,
    needParam: true
  }, {
    proto: cc.easeElasticOut,
    needParam: true
  }, {
    proto: cc.easeElasticInOut,
    needParam: true
  }, {
    proto: cc.easeQuadraticActionIn
  }, {
    proto: cc.easeQuadraticActionOut
  }, {
    proto: cc.easeQuadraticActionInOut
  }, {
    proto: cc.easeQuarticActionIn
  }, {
    proto: cc.easeQuarticActionOut
  }, {
    proto: cc.easeQuarticActionInOut
  }, {
    proto: cc.easeExponentialIn
  }, {
    proto: cc.easeExponentialOut
  }, {
    proto: cc.easeExponentialInOut
  }, {
    proto: cc.easeBackIn
  }, {
    proto: cc.easeBackOut
  }, {
    proto: cc.easeBackInOut
  }, {
    proto: cc.easeBounceIn
  }, {
    proto: cc.easeBounceOut
  }, {
    proto: cc.easeBounceInOut
  }];
  var C = cc.Enum({
    None: 0,
    EaseIn: 1,
    EaseOut: 2,
    EaseInOut: 3,
    EaseSineIn: 4,
    EaseSineOut: 5,
    EaseSineInOut: 6,
    EaseCubicActionIn: 7,
    EaseCubicActionOut: 8,
    EaseCubicActionInOut: 9,
    EaseQuinticActionIn: 10,
    EaseQuinticActionOut: 11,
    EaseQuinticActionInOut: 12,
    EaseCircleActionIn: 13,
    EaseCircleActionOut: 14,
    EaseCircleActionInOut: 15,
    EaseElasticIn: 16,
    EaseElasticOut: 17,
    EaseElasticInOut: 18,
    EaseQuadraticActionIn: 19,
    EaseQuadraticActionOut: 20,
    EaseQuadraticActionInOut: 21,
    EaseQuarticActionIn: 22,
    EaseQuarticActionOut: 23,
    EaseQuarticActionInOut: 24,
    EaseExponentialIn: 25,
    EaseExponentialOut: 26,
    EaseExponentialInOut: 27,
    EaseBackIn: 28,
    EaseBackOut: 29,
    EaseBackInOut: 30,
    EaseBounceIn: 31,
    EaseBounceOut: 32,
    EaseBounceInOut: 33
  });
  var u = false;
  var c = cc.Class({
    extends: cc.Component,
    properties: {
      particlePrefab: {
        type: cc.Prefab,
        tooltip: false,
        default: undefined
      },
      duration: {
        type: cc.Float,
        tooltip: false,
        default: -1
      },
      emissionRate: {
        type: cc.Float,
        tooltip: false,
        default: 20,
        min: 0.1
      },
      life: {
        type: cc.Float,
        tooltip: false,
        default: 1,
        min: 0.1
      },
      lifeVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      particleCount: {
        type: cc.Integer,
        tooltip: false,
        default: 10,
        min: 1
      },
      particleMovementEasing: {
        type: C,
        tooltip: false,
        default: C.None
      },
      particleMovementParam: {
        visible: function () {
          var p;
          return ((p = k[this.particleMovementEasing]) == null ? undefined : p.needParam) === true;
        },
        type: cc.Float,
        tooltip: false,
        default: 0,
        min: 0
      },
      startColor: {
        tooltip: false,
        default: cc.Color.WHITE
      },
      startColorVar: {
        tooltip: false,
        default: cc.Color.BLACK
      },
      endColor: {
        tooltip: false,
        default: cc.Color.WHITE
      },
      endColorVar: {
        tooltip: false,
        default: cc.Color.BLACK
      },
      colorDelayRatio: {
        visible: function () {
          return !this.startColor.equals(this.endColor) || !this.startColorVar.equals(this.endColorVar);
        },
        type: cc.Float,
        tooltip: false,
        range: [0, 1, 0.01],
        default: 0
      },
      colorEasing: {
        visible: function () {
          return !this.startColor.equals(this.endColor) || !this.startColorVar.equals(this.endColorVar);
        },
        type: C,
        tooltip: false,
        default: C.None
      },
      colorEasingParam: {
        visible: function () {
          var p;
          return ((p = k[this.colorEasing]) == null ? undefined : p.needParam) === true;
        },
        type: cc.Float,
        tooltip: false,
        default: 0,
        min: 0
      },
      startAlpha: {
        type: cc.Float,
        tooltip: false,
        default: 255,
        min: 0
      },
      startAlphaVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endAlpha: {
        type: cc.Float,
        tooltip: false,
        default: 255,
        min: 0
      },
      endAlphaVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      alphaDelayRatio: {
        visible: function () {
          return this.startAlpha !== this.endAlpha || this.startAlphaVar !== this.endAlphaVar;
        },
        type: cc.Float,
        tooltip: false,
        range: [0, 1, 0.01],
        default: 0
      },
      alphaEasing: {
        visible: function () {
          return this.startAlpha !== this.endAlpha || this.startAlphaVar !== this.endAlphaVar;
        },
        type: C,
        tooltip: false,
        default: C.None
      },
      alphaEasingParam: {
        visible: function () {
          var p;
          return ((p = k[this.alphaEasing]) == null ? undefined : p.needParam) === true;
        },
        type: cc.Float,
        tooltip: false,
        default: 0,
        min: 0
      },
      speed: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      speedVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      angle: {
        type: cc.Float,
        tooltip: false,
        default: 90
      },
      angleVar: {
        type: cc.Float,
        tooltip: false,
        default: 20
      },
      startScale: {
        type: cc.Float,
        tooltip: false,
        default: 1
      },
      startScaleVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endScale: {
        type: cc.Float,
        tooltip: false,
        default: 1
      },
      endScaleVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endScaleIsFactor: {
        visible: function () {
          return this.startScale !== this.endScale || this.startScaleVar !== this.endScaleVar;
        },
        default: false
      },
      scaleDelayRatio: {
        visible: function () {
          return this.startScale !== this.endScale || this.startScaleVar !== this.endScaleVar;
        },
        type: cc.Float,
        tooltip: false,
        range: [0, 1, 0.01],
        default: 0
      },
      scaleEasing: {
        visible: function () {
          return this.startScale !== this.endScale || this.startScaleVar !== this.endScaleVar;
        },
        type: C,
        tooltip: false,
        default: C.None
      },
      scaleEasingParam: {
        visible: function () {
          var p;
          return ((p = k[this.scaleEasing]) == null ? undefined : p.needParam) === true;
        },
        type: cc.Float,
        tooltip: false,
        default: 0,
        min: 0
      },
      startSpin: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      startSpinVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endSpin: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endSpinVar: {
        type: cc.Float,
        tooltip: false,
        default: 0
      },
      endSpinLocked: {
        visible: function () {
          return this.startSpinVar !== 0;
        },
        default: false
      },
      spinDelayRatio: {
        visible: function () {
          return this.startSpin !== this.endSpin || this.startSpinVar !== this.endSpinVar;
        },
        type: cc.Float,
        tooltip: false,
        range: [0, 1, 0.01],
        default: 0
      },
      spinEasing: {
        visible: function () {
          return this.startSpin !== this.endSpin || this.startSpinVar !== this.endSpinVar;
        },
        type: C,
        tooltip: false,
        default: C.None
      },
      spinEasingParam: {
        visible: function () {
          var p;
          return ((p = k[this.spinEasing]) == null ? undefined : p.needParam) === true;
        },
        type: cc.Float,
        tooltip: false,
        default: 0,
        min: 0
      },
      sourcePos: {
        tooltip: false,
        default: cc.v2(0, 0)
      },
      sourcePosVar: {
        tooltip: false,
        default: cc.v2(0, 0)
      },
      emitterMode: {
        tooltip: false,
        default: D.LINEAR,
        type: D
      },
      gravityVec: {
        visible: function () {
          return this.emitterMode === D.GRAVITY;
        },
        tooltip: false,
        default: cc.v2(0, 0)
      },
      gravityVecVar: {
        visible: function () {
          return this.emitterMode === D.GRAVITY;
        },
        tooltip: false,
        default: cc.v2(0, 0)
      },
      nodePool: {
        visible: false,
        get: function () {
          this._nodePool ||= new cc.NodePool("AnimParticleSystemPoolHandler");
          return this._nodePool;
        }
      },
      _liveParticles: []
    },
    resetSystem: function (p = true) {
      if (p) {
        this.stopSystem(true);
      }
      var j = 1 / this.emissionRate;
      this.unschedule(this._spawnParticle);
      var G = this.duration;
      if (G !== 0) {
        this.schedule(this._spawnParticle, j);
        if (G > 0) {
          this.unschedule(this.stopSystem);
          this.scheduleOnce(this.stopSystem, G);
        }
      }
    },
    stopSystem: function (p) {
      var j = this;
      if (p === undefined) {
        p = false;
      }
      this.unschedule(this._spawnParticle);
      this.unschedule(this.stopSystem);
      if (p === true) {
        this._liveParticles.forEach(function (G) {
          G.stopAllActions();
          j.nodePool.put(G);
        });
        this._liveParticles = [];
      }
    },
    _spawnParticle: function () {
      if (!(this._liveParticles.length >= this.particleCount)) {
        var p = this.nodePool.get();
        p ||= cc.instantiate(this.particlePrefab);
        this._playParticleAction(p);
        p.getComponent(cc.Animation).play();
      }
    },
    getLife: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getSpeed: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getEmissionAngle: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getSourceStartScale: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getSourceStartSpinAngle: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getSourceStartAlpha: function (p, j) {
      return (0, L.getRandomFromRange)(p, j);
    },
    getSourceStartColor: function (p, j) {
      if (j.equals(cc.Color.BLACK)) {
        return p;
      } else {
        return new cc.Color((0, L.getRandomFromRange)(p.getR(), j.getR()), (0, L.getRandomFromRange)(p.getG(), j.getG()), (0, L.getRandomFromRange)(p.getB(), j.getB()));
      }
    },
    getSourceStartPosition: function (p, j) {
      return cc.v2((0, L.getRandomFromRange)(p.x, j.x), (0, L.getRandomFromRange)(p.y, j.y));
    },
    getSourceEndScale: function (p, j, G, V) {
      return (V ? p : 1) * (0, L.getRandomFromRange)(j, G);
    },
    getSourceEndSpinAngle: function (p, j, G, V) {
      if (V) {
        return p;
      } else {
        return (0, L.getRandomFromRange)(j, G);
      }
    },
    getSourceEndAlpha: function (p, j, G) {
      return (0, L.getRandomFromRange)(j, G);
    },
    getSourceEndColor: function (p, j, G) {
      if (G.equals(cc.Color.BLACK)) {
        return j;
      } else {
        return new cc.Color((0, L.getRandomFromRange)(j.getR(), G.getR()), (0, L.getRandomFromRange)(j.getG(), G.getG()), (0, L.getRandomFromRange)(j.getB(), G.getB()));
      }
    },
    getSourceEndPositionLinear: function (p, j, G, V) {
      var Q = Math.cos(G / 180 * Math.PI) * j * V;
      var N = Math.sin(G / 180 * Math.PI) * j * V;
      return cc.v2(p.x + Q, p.y + N);
    },
    getSourceEndPositionGravity: function (j, G, V, Q, N, Y) {
      var W = Math.cos(V / 180 * Math.PI) * G * Q;
      var q = Math.sin(V / 180 * Math.PI) * G * Q;
      var z = (0, L.getRandomFromRange)(N.x, Y.x);
      var M = (0, L.getRandomFromRange)(N.y, Y.y);
      var E = j.x + W / 3;
      var F = j.y + q / 3;
      var H = j.x + W / 3 * 2;
      var w = j.y + q / 3 * 2;
      var U = j.x + W;
      var P = j.y + q;
      var X = Q * 60 / 3;
      var J = (0, L.getAccelerationDistance)(z, X);
      var Z0 = (0, L.getAccelerationDistance)(M, X);
      var Z1 = X * 2;
      var Z2 = (0, L.getAccelerationDistance)(z, Z1);
      var Z3 = (0, L.getAccelerationDistance)(M, Z1);
      var Z4 = X * 3;
      var Z5 = (0, L.getAccelerationDistance)(z, Z4);
      var Z6 = (0, L.getAccelerationDistance)(M, Z4);
      var Z7 = U > 0 ? 1 : -1;
      return [cc.v2(E - J * Z7, F - Z0), cc.v2(H - Z2 * Z7, w - Z3), cc.v2(U - Z5 * Z7, P - Z6)];
    },
    getMoveAction: function (p, j, G, V, Q) {
      var N = cc.moveTo(G, j);
      if (V) {
        return N.easing(V(Q));
      } else {
        return N;
      }
    },
    getBezierAction: function (p, j, G, V, Q) {
      var N = cc.bezierTo(G, j);
      if (V) {
        return N.easing(V(Q));
      } else {
        return N;
      }
    },
    getScaleAction: function (p, j, G, V, Q, N) {
      if (!Q) {
        if (V === 0) {
          return cc.scaleTo(G, j);
        } else {
          return cc.sequence(cc.delayTime(V * G), cc.scaleTo(G - V * G, j));
        }
      }
      var Y = Q(N);
      if (V === 0) {
        return cc.scaleTo(G, j).easing(Y);
      } else {
        return cc.sequence(cc.delayTime(V * G), cc.scaleTo(G - V * G, j).easing(Y));
      }
    },
    getRotateAction: function (p, j, G, V, Q, N) {
      if (!Q) {
        if (V === 0) {
          return cc.rotateTo(G, -j);
        } else {
          return cc.sequence(cc.delayTime(V * G), cc.rotateTo(G - V * G, -j));
        }
      }
      var Y = Q(N);
      if (V === 0) {
        return cc.rotateTo(G, -j).easing(Y);
      } else {
        return cc.sequence(cc.delayTime(V * G), cc.rotateTo(G - V * G, -j).easing(Y));
      }
    },
    getFadeAction: function (p, j, G, V, Q, N) {
      if (!Q) {
        if (V === 0) {
          return cc.fadeTo(G, j);
        } else {
          return cc.sequence(cc.delayTime(V * G), cc.fadeTo(G - V * G, j));
        }
      }
      var Y = Q(N);
      if (V === 0) {
        return cc.fadeTo(G, j).easing(Y);
      } else {
        return cc.sequence(cc.delayTime(V * G), cc.fadeTo(G - V * G, j).easing(Y));
      }
    },
    getTintAction: function (p, j, G, V, Q, N) {
      if (!Q) {
        if (V === 0) {
          return cc.tintTo(G, j);
        } else {
          return cc.sequence(cc.delayTime(V * G), cc.tintTo(G - V * G, j));
        }
      }
      var Y = Q(N);
      if (V === 0) {
        return cc.tintTo(G, j).easing(Y);
      } else {
        return cc.sequence(cc.delayTime(V * G), cc.tintTo(G - V * G, j).easing(Y));
      }
    },
    _playParticleAction: function (j) {
      var G = this;
      var V = this.getLife(this.life, this.lifeVar);
      var Q = this.getSourceStartPosition(this.sourcePos, this.sourcePosVar);
      j.setPosition(Q);
      var N = this.getSpeed(this.speed, this.speedVar);
      var Y = this.getEmissionAngle(this.angle, this.angleVar);
      var W = [];
      if (this.emitterMode === D.LINEAR) {
        var q;
        var z = this.getSourceEndPositionLinear(Q, N, Y, V);
        W.push(this.getMoveAction(j.position, z, V, (q = k[this.particleMovementEasing]) == null ? undefined : q.proto, this.particleMovementEasingParam));
      } else if (this.emitterMode === D.GRAVITY) {
        var M;
        var E = this.getSourceEndPositionGravity(Q, N, Y, V, this.gravityVec, this.gravityVecVar);
        W.push(this.getBezierAction(j.position, E, V, (M = k[this.particleMovementEasing]) == null ? undefined : M.proto, this.particleMovementEasingParam));
      }
      var F;
      var H = j.scale = this.getSourceStartScale(this.startScale, this.startScaleVar);
      var w = this.getSourceEndScale(H, this.endScale, this.endScaleVar, this.endScaleIsFactor);
      if (H !== w && this.scaleDelayRatio < 1) {
        W.push(this.getScaleAction(H, w, V, this.scaleDelayRatio, (F = k[this.scaleEasing]) == null ? undefined : F.proto, this.scaleEasingParam));
      }
      var U;
      var P = j.angle = this.getSourceStartSpinAngle(-this.startSpin, -this.startSpinVar);
      var X = this.getSourceEndSpinAngle(P, -this.endSpin, -this.endSpinVar, this.endSpinLocked);
      if (P !== X && this.spinDelayRatio < 1) {
        W.push(this.getRotateAction(P, X, V, this.spinDelayRatio, (U = k[this.spinEasing]) == null ? undefined : U.proto, this.spinEasingParam));
      }
      var J;
      var Z0 = j.opacity = this.getSourceStartAlpha(this.startAlpha, this.startAlphaVar);
      var Z1 = this.getSourceEndAlpha(Z0, this.endAlpha, this.endAlphaVar);
      if (Z0 !== Z1 && this.alphaDelayRatio < 1) {
        W.push(this.getFadeAction(Z0, Z1, V, this.alphaDelayRatio, (J = k[this.alphaEasing]) == null ? undefined : J.proto, this.alphaEasingParam));
      }
      if (!this.startColor.equals(cc.Color.WHITE) || !this.startColorVar.equals(cc.Color.BLACK) || !this.endColor.equals(cc.Color.WHITE) || !this.endColorVar.equals(cc.Color.BLACK)) {
        var Z2;
        var Z3 = j.color = this.getSourceStartColor(this.startColor, this.startColorVar);
        var Z4 = this.getSourceEndColor(Z3, this.endColor, this.endColorVar);
        if (!Z3.equals(Z4) && this.colorDelayRatio < 1) {
          W.push(this.getTintAction(Z3, Z4, V, this.colorDelayRatio, (Z2 = k[this.colorEasing]) == null ? undefined : Z2.proto, this.colorEasingParam));
        }
      }
      var Z5;
      var Z6 = W.length;
      if (Z6 > 1) {
        Z5 = cc.sequence(cc.spawn(W), cc.callFunc(function () {
          G._particleSelfDestruct(j);
        }, this));
      } else if (Z6 === 1) {
        Z5 = cc.sequence(W[0], cc.callFunc(function () {
          G._particleSelfDestruct(j);
        }, this));
      }
      this._liveParticles.push(j);
      this.node.addChild(j);
      j.runAction(Z5);
    },
    _accelerationDistance: function (p, j) {
      u ||= true;
      return p * 0.5 * j * j;
    },
    _particleSelfDestruct: function (p) {
      var j = this._liveParticles;
      var G = j.indexOf(p);
      if (G > -1) {
        j.splice(G, 1);
      }
      this.nodePool.put(p);
    }
  });
  exports.default = c;
  module.exports = exports.default;
  cc._RF.pop();
}