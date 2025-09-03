if (!cc._RF.push(module, "16fa48YcbZClp+85Xk1WOH4", "WalletHandlers")) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setupWallets = undefined;
  exports.setupWallets = function (T) {
    // 初始化錢包相關控制與回呼
    var x = T.dataSource;
    var L = T.settingMenuHelper;
    var D = T.walletHelper;
    var k = T.callback;
    var C = x.playerModel.currencySymbol;
    D.setup({
      openWalletMenuFunc: L.openWalletMenu.bind(L),
      setFreeGameModeFunc: L.setFreeGameMode.bind(L),
      currencySymbol: C,
      footerController: T.settingWalletPanelController
    });
    D.setupWallet(x.lastTransactionRawData);
    if (k) {
      k();
    }
  };
  cc._RF.pop();
}