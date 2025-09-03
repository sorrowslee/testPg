if (!cc._RF.push(module, "213874uZn5HSqZznN5luzQQ", "SlotGenerator")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generateSlot = undefined;
  var L = require("SlotView");
  var D = require("SlotScrollerController");
  var k = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };
  var C = {
    containerNode: undefined,
    numberOfColumn: undefined,
    slotView: L.default,
    slotScrollerController: D.default
  };
  // 建立轉輪與遮罩節點，並回傳控制器與視圖
  exports.generateSlot = function (j) {
    var G;
    var V = (j = __assign(__assign({}, C), j)).containerNode;
    var Q = j.slotSize ? j.slotSize : V.getContentSize();
    var N = Q.width;
    var Y = Q.height;
    var W = new cc.Node("slot_scroller");
    if (j.dontGenerateMask) {
      W.parent = V;
      W.width = N;
      W.height = Y;
    } else {
      var q = __assign(__assign({}, k), j.maskMargin);
      var S = new cc.Node("slot_mask");
      S.parent = V;
      S.width = N + q.left + q.right;
      S.height = Y + q.up + q.down;
      S.x = (q.right - q.left) / 2;
      S.y = (q.up - q.down) / 2;
      (G = S.addComponent(cc.Mask)).type = cc.Mask.Type.RECT;
      G.inverted = false;
      W.parent = S;
      W.width = N;
      W.height = Y;
      W.x = -S.x;
      W.y = -S.y;
    }
    for (var z = j.numberOfColumn, A = N / z, M = (A - N) / 2, E = [], F = 0; F < z; F++) {
      E[F] = new j.slotView(W, M + A * F);
    }
    return {
      mask: G,
      slotScrollerController: W.addComponent(j.slotScrollerController),
      slotViews: E
    };
  };
  cc._RF.pop();
}