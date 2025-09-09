# _getRandomSymbol 與 getRandomSymbol 相關程式碼分析

以下整理專案中與 `_getRandomSymbol()` 及 `getRandomSymbol()` 有關的程式碼位置與用途，並說明它們在轉輪運作時被反覆呼叫的原因。

## 主要定義
- **`SlotHandler._getRandomSymbol`**：負責產生隨機符號，並控制散佈符號及金幣符號的出現機率【F:export/SlotHandler.js†L392-L407】。
- 在 `SlotHandler.init` 中，將上述方法綁定給 `slotHelper` 使用，作為 `getRandomSymbol` 回呼【F:export/SlotHandler.js†L150-L158】。
- **`GeneralSlotController.getRandomSymbol`**：基底控制器提供的預設實作，僅回傳固定數值，實際遊戲會由子類別覆寫【F:export/GeneralSlotController.js†L343-L344】。

## 轉輪資料處理
- **`SlotHelper`**：初始化時從外部取得 `getRandomSymbol`，並傳入 `SlotDataHandler`，以便在需要時取得隨機符號【F:export/SlotHelper.js†L30-L31】【F:export/SlotHelper.js†L139-L150】。
- **`SlotDataHandler.setReelData`**：建立輪帶資料時，先為上下緩衝區填入隨機符號，再插入後端提供的 `reelData`【F:export/SlotDataHandler.js†L86-L96】。
- **`SlotDataHandler.getSymbol`**：當畫面需要顯示新符號而資料尚未到位（或在緩衝區內）時，呼叫 `getRandomSymbol` 生成暫時符號【F:export/SlotDataHandler.js†L145-L167】。
- **`WBSSlotDataHandler.setReelData`**：針對不同欄位高度的情況，同樣利用 `getRandomSymbol` 產生緩衝區符號【F:export/WBSSlotDataHandler.js†L13-L23】。

## 為何需要不斷呼叫 `getRandomSymbol()`？
在轉輪持續滾動的過程中，前端需要為每個捲動到可視範圍的格子提供一個符號。由於最終結果完全依賴後端回傳的 `rl`，在等待後端資料的期間，這些位置暫時沒有確定內容。為了維持轉輪動畫的自然與連續性，系統會透過 `getRandomSymbol()` 產生隨機符號填補：

1. **緩衝區填充**：上下緩衝列在任何時候都需要有符號，即使這些符號不會被玩家看到。
2. **轉動中的佔位符**：當轉輪尚未收到後端結果時，每次有新格子進入畫面都需要一個暫時符號，避免出現空白。
3. **視覺效果**：散佈符號與金幣符號的機率控制，讓轉動過程看起來更貼近真實轉盤，避免在等待結果時出現不自然的排列。

因此，`getRandomSymbol()` 被頻繁呼叫只是為了動畫與佔位需求，並不影響最終顯示的結果；實際停輪時會以後端回傳的 `rl` 重新覆蓋盤面。這也解釋了在斷線或未收到回應時轉輪會持續轉動——因為沒有伺服器結果可用來停止，只能不斷產生隨機符號延長動畫。

