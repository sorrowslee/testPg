# 04_all.js 中符號表演與中獎連線邏輯整理

- **GameConstant 模組（約第1730-1754行）**
  定義各種符號與其圖像、模糊版及框線設定，提供符號顯示所需的資源映射。

- **SlotSymbol 類別（約第6888-6903行）**
  控制單個符號的建立、回收與顯示狀態，並在符號加入或移除時透過事件通知遊戲框架。

- **SymbolPayoutController（約第7285-7302行）**
  初始化符號賠付面板，建立色調控制與彈出項目，用於呈現符號賠付資訊。

- **SymbolPayoutPanelGenerator（約第7374-7399行）**
  產生賠付面板的按鈕與位置配置，協助展示各符號的賠付表。

- **PrizeState.renderLines（約第4874-4877行）**
  在獎勵狀態中檢查 `transactionModel.winLines`，若存在則播放所有中獎線。

- **SlotTransactionModel.updateTransactionInfo（約第6970-6974行）**
  根據伺服器回傳資料更新 `_winLines` 與 `_winValues`，儲存本局中獎線與獎金資訊。

- **WBSPrizeState._playHighLightEffect（約第8469-8480行）**
  依據 `winPositionList` 為中獎符號添加遮罩與亮框動畫，強調中獎效果。

- **WBSPrizeState._preSymbolBreakEffect（約第8480-8485行）**
  若有中獎線則在符號破碎動畫前播放 `playPreBreak`，進一步表現中獎符號。

- **WinLinesModel（約第9363-9372行）**
  儲存並提供各位置對應的中獎線資料，支援依位置取得線上符號組合。

