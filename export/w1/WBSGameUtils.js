if (!cc._RF.push(module, "8caf2Z5GP1O36zsmaXn7b4T", "WBSGameUtils")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getPositionRemoveColumnList = exports.lerpTo = exports.isPassUKGC = exports.getProcessedReelSymbols = exports.differentArray = exports.uniqueArray = exports.scheduleIterator = undefined;
  var T = require("GameUtils");
  var x = require("Utils");
  var L = require("WBSDataSource");
  var D = require("GameConstant");
  var k = x.getSharedScheduler();
  exports.scheduleIterator = function (C, u, c, p) {
    var j = 0;
    var G = 0;
    function V() {
      if (++G === c && p) {
        p();
      }
    }
    function Q() {
      C(j, V);
      j++;
    }
    Q();
    if (c >= 2) {
      k.schedule(Q, u, c - 2, 0);
    }
    return function () {
      if (c >= 2) {
        k.unschedule(Q);
      }
      p = undefined;
    };
  };
  exports.uniqueArray = function (C) {
    return C.filter(function (u, c, p) {
      return p.indexOf(u) === c;
    });
  };
  exports.differentArray = function (C, u) {
    var c = [];
    for (var p = 0; p < C.length; p++) {
      if (!u.includes(C[p])) {
        c.push(C[p]);
      }
    }
    return c;
  };
  exports.getProcessedReelSymbols = function (C, u) {
    var c = [];
    var p = u ? Object.keys(u) : [];
    C.forEach(function (V) {
      c.push(V + D.BLOCK_TYPE.NORMAL);
    });
    for (var j = 0; j < p.length; j++) {
      var l = u[p[j]];
      var G = c[l] % 100;
      c[l] = G + D.BLOCK_TYPE.GOLD;
    }
    return c;
  };
  exports.isPassUKGC = function (C) {
    return T.checkOperatorProfit(C, L.wbsDataSource);
  };
  exports.lerpTo = function (C, u, c, p = 0) {
    var j = 0;
    var l = 0;
    function G(V) {
      if ((j += V / p) >= 1) {
        k.unschedule(G);
        j = 1;
      }
      l = cc.misc.lerp(u, c, j);
      C(l, j);
    }
    k.schedule(G, 0, cc.macro.REPEAT_FOREVER, 0);
    return function () {
      return k.unschedule(G);
    };
  };
  exports.getPositionRemoveColumnList = function (C) {
    var u = [];
    for (var c = 0; c < C.length; c++) {
      if (C[c].length > 0) {
        u.push(c);
      }
    }
    return u;
  };
  cc._RF.pop();
}