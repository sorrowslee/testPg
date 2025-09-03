if (!cc._RF.push(module, "741a8m7jWlDQowhgiMh2U/V", "ResRC")) {
  var g = function (x, L) {
    var D = {};
    for (var n in L) {
      if (x.hasOwnProperty(n)) {
        D[x[n]] = L[n];
      } else {
        D[n] = L[n];
      }
    }
    return D;
  }({
    r0: "releaseBundleAsset",
    r1: "release",
    r2: "releaseBundle",
    r3: "removeBundle",
    r4: "loadBundleAsset",
    r5: "loadRemoteSingle"
  }, System.get("common").ResRC);
  for (var T in g) {
    if (g.hasOwnProperty(T)) {
      module.exports[T] = g[T];
    }
  }
  module.exports.__esModule = true;
  cc._RF.pop();
}