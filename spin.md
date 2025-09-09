# Spin流程與盤面生成

本文紀錄從玩家按下 Spin 按鈕開始，到轉輪停止的流程，以及盤面符號的來源。

## 1. 送出旋轉請求
- 玩家點擊 Spin 後，前端會呼叫 `WBSApiClient.spin` 對後端傳送 `v2/Spin` 請求，帶入下注額度等資訊【F:export/WBSApiClient.js†L25-L46】。
- 後端回傳後，`_onRequestReceived` 會將回應中的 `si` (spin info) 暫存為 `_spinInfo`，供後續使用【F:export/WBSApiClient.js†L60-L66】。

## 2. 解析伺服器回傳
- `SlotTransactionModel.updateTransactionInfo` 會從 `_spinInfo` 中取出 `rl` (reels)，將其存為 `_reels`，這代表本次旋轉的整個盤面內容【F:export/SlotTransactionModel.js†L63-L76】。
- 也會更新下注資訊與獎線等資料，供遊戲邏輯使用。

## 3. 建立轉輪資料
- `SlotHandler` 初始化時，將 `transactionModel` 中的 `reels` 經過處理後傳入 `slotDataHandler` 的 `reelData`，作為轉輪顯示的基礎資料【F:export/SlotHandler.js†L120-L158】。
- `SlotDataHandler.setReelData` 會先為轉輪上下緩衝區填入隨機符號，再將後端的 `reels` 插入對應位置，形成完整的可見盤面【F:export/SlotDataHandler.js†L86-L105】。

## 4. 隨機符號的用途
- `SlotHandler._getRandomSymbol` 定義了產生隨機符號的方式，主要用於緩衝區或當某位置沒有伺服器資料時的補值，不影響最終可見盤面【F:export/SlotHandler.js†L392-L407】。

## 5. 轉輪運行與停止
- 取得 `reelData` 後，前端播放轉輪動畫；收到資料後依序停止各捲軸，並依 `reels` 展示最終結果。

### 結論
盤面上所有可見符號（無論是否中獎）皆由後端回傳的 `rl` 決定；前端僅在緩衝區或缺資料時使用隨機符號。因此沒有中獎的位置也並非前端自行隨機，而是後端所指定的結果。

