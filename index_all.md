# index_all.js 中符號表演與中獎連線邏輯整理

- **GameConstant 模組（第6391-6449行）**  
  定義各種符號與其對應的圖像、模糊版本及框線設定，提供符號顯示所需的資源映射。

- **SlotSymbol 類別（第25324-25379行）**  
  控制單個符號的建立、回收與顯示狀態，並在符號加入或移除時透過事件通知遊戲框架。

- **SymbolPayoutController（第26783-26844行）**  
  初始化符號賠付面板，建立色調控制與彈出項目，用於呈現符號賠付資訊。

- **SymbolPayoutPanelGenerator（第27053-27145行）**  
  產生賠付面板的按鈕與位置配置，協助展示各符號的賠付表。

- **PrizeState.renderLines（第17919-17930行）**  
  在獎勵狀態中檢查 `transactionModel.winLines`，若存在則播放所有中獎線。

- **SlotTransactionModel.updateTransactionInfo（第25625-25638行）**  
  根據伺服器回傳資料更新 `_winLines` 與 `_winValues`，儲存本局中獎線與獎金資訊。

- **WBSPrizeState._playHighLightEffect（第31064-31105行）**  
  依據 `winPositionList` 為中獎符號添加遮罩與亮框動畫，強調中獎效果。

- **WBSPrizeState._preSymbolBreakEffect（第31106-31124行）**  
  若有中獎線則在符號破碎動畫前播放 `playPreBreak`，進一步表現中獎符號。

- **WinLinesModel（第34424-34458行）**  
  儲存並提供各位置對應的中獎線資料，支援依位置取得線上符號組合。

