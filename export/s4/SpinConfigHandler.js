if (!cc._RF.push(module, "636ecG9L2tOfadXZr7kHqve", "SpinConfigHandler")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initSpinConfig = exports.featureConfig = undefined;
  var L = {
    minimumSpinningTime: 0,
    regularSpinningTime: 1,
    minimumTurboSpinningTime: 0,
    regularTurboSpinningTime: 1,
    fastStopFeature: false,
    turboSpinFeature: false
  };
  exports.featureConfig = L;
  exports.initSpinConfig = function (D) {
    var k = D.jurisdictionModel;
    var C = D.minimumSpinningTime;
    var j = D.regularSpinningTime;
    var G = D.minimumTurboSpinningTime;
    var V = D.regularTurboSpinningTime;
    var Q = L;
    var N = k.singlePlayMinDuration;
    var Y = C;
    var W = j;
    var q = G !== undefined ? G : C;
    var S = V !== undefined ? V : j;
    if (N > 0) {
      Y = D.minimumSpinningTimeOffset || 0;
      W = D.regularSpinningTimeOffset || 0;
      q = D.minimumTurboSpinningTimeOffset || 0;
      S = D.regularTurboSpinningTimeOffset || 0;
    }
    Q.minimumSpinningTime = N + Y;
    Q.regularSpinningTime = N + W;
    Q.minimumTurboSpinningTime = N + q;
    Q.regularTurboSpinningTime = N + S;
    Q.turboSpinFeature = k.turboSpinEnable;
    Q.fastStopFeature = k.turboSpinEnable;
    exports.featureConfig = Object.freeze(Q);
  };
  cc._RF.pop();
}