if (!cc._RF.push(module, "482e7ITATFKo7j4cEkygqNc", "WBSApiClient")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wbsApiClient = undefined;
  var T = require("APIClient");
  var x = require("SettingMenuHelper");
  var L = require("WBSDataSource");
  require("TweaksData");
  var D = require("AutomationDecorator");
  var k = require("WBSApiClient.spec");
  var C = function (p) {
    function j() {
      var Q = p !== null && p.apply(this, arguments) || this;
      Q._spinInfo = undefined;
      return Q;
    }
    var G = {
      func: k.onRequestSent
    };
    var V = {
      func: k.onRequestReceived
    };
    __extends(j, p);
    j.prototype.spin = function (Q) {
      var N = this;
      var Y = this.dataSource;
      var W = Y.isFeatureBuy;
      var q = Y.transactionModel.transactionId;
      var S = {
        cs: x.settingMenuHelper.betSizeValue,
        ml: x.settingMenuHelper.betLevelValue,
        sn: this.currentSelectedMenuIndex ? this.dataSource.currentSelectedMenuIndex : 1,
        id: q,
        crl: undefined,
        wk: this.dataSource.playerModel.walletKey,
        fb: !!W && 2
      };
      this._onRequestSent("v2/Spin", S, function (z, f) {
        N.logResult("spin", f);
        N._onRequestReceived(z, f);
        if (Q) {
          Q(z, f);
        }
      });
    };
    j.prototype.updateTransactionInfo = function () {
      var Q = this._spinInfo;
      if (Q) {
        this.dataSource.isFeatureBuy = false;
        this.dataSource.updateTransactionInfo(Q);
      }
    };
    j.prototype._onRequestSent = function (Q, N, Y) {
      this.requestEngine(Q, N, Y);
    };
    j.prototype._onRequestReceived = function (Q, N) {
      if (N && N.dt) {
        var Y = N.dt.si;
        this.print(Y.sid);
        this._spinInfo = Y;
      }
    };
    __decorate([D.automationDec(G)], j.prototype, "_onRequestSent", null);
    __decorate([D.automationDec(V)], j.prototype, "_onRequestReceived", null);
    return j;
  }(T.default);
  exports.default = C;
  var u = new C(L.wbsDataSource);
  exports.wbsApiClient = u;
  cc._RF.pop();
}