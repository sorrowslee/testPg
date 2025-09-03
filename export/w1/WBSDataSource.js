if (!cc._RF.push(module, "ea57bfn2ppGbJ8oIv5a3F58", "WBSDataSource")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wbsDataSource = undefined;
  var T = require("PlayerModel");
  var x = require("DataSource");
  var L = require("RtConfig");
  var D = require("WBSSlotTransactionModel");
  var k = require("WBSSlotSystemModel");
  var C = function (p) {
    function j() {
      var G = p.call(this, {
        playerModel: new T.default(),
        systemModel: new k.default(L.cs_Config),
        transactionModel: new D.default()
      }) || this;
      G.autoSpinCount = -1;
      G.demoReminderCount = -1;
      G.currentSelectedMenuIndex = 0;
      G.isReplayDone = false;
      G.isRefreshWorld = false;
      G.isReplayStarted = false;
      G.isFeatureBuy = false;
      return G;
    }
    __extends(j, p);
    return j;
  }(x.default);
  exports.default = C;
  var u = new C();
  exports.wbsDataSource = u;
  cc._RF.pop();
}