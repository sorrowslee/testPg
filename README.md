# 專案概觀

## API 發送與接收位置
- `web-api/auth/session/v2/verifySession.html`: 用於驗證玩家 Session，回應包含遊戲 API (`geu`)、大廳路徑 (`lau`)、資源代理 (`bau`) 等欄位。如果要修改，步驟：
  1. 開啟該檔案。
  2. 調整欄位值，例如改成新的 API 路徑。
  3. 儲存後重新部署【F:web-api/auth/session/v2/verifySession.html†L1-L8】。
- `game-api/wild-bounty-sd/v2/GameInfo/Get.html`: 回傳遊戲設定與賭注資訊，修改時同樣編輯 JSON 中對應欄位【F:game-api/wild-bounty-sd/v2/GameInfo/Get.html†L1-L7】。
- `web-api/game-proxy/v2/GameName/Get.html`: 提供遊戲代號與名稱對照，可直接更新 JSON 值【F:web-api/game-proxy/v2/GameName/Get.html†L1】。
- `web-api/game-proxy/v2/Resources/GetByResourcesTypeIds.html`: 列出各資源的 URL，如圖示、語系等。修改步驟與上述相同【F:web-api/game-proxy/v2/Resources/GetByResourcesTypeIds.html†L1】。
- `shared/service-worker/sw.js`: 利用 Workbox 攔截 `fetch` 事件進行快取，若需修改網路行為，可調整此檔案中的策略【F:shared/service-worker/sw.js†L1】。
- `gtag/js.html` 與 `gtm.js`: 透過多處 `fetch` 呼叫將資料送往 Google Analytics，修改追蹤行為需調整這些函式【F:gtag/js.html†L159-L160】【F:gtm.js†L178-L179】。

## 檔案用途說明
- `135/`: 指定遊戲 (ID 135) 的主目錄。
  - `index.html`: 遊戲入口頁。
  - `assets/main/index.b8ae1.js`: 遊戲主程式，經過編譯與混淆。
  - `assets/main/config.689d3.json`、`assets/resources/config.0ff33.json`: 遊戲設定。
  - `assets/main/import/`、`assets/resources/import/`: 動態載入模組。
  - `assets/*/native/`: 平台相關的原生適配程式碼。
- `g/collect.html`: 紀錄發送至 Google Analytics 的收集 URL【F:g/collect.html†L1-L8】。
- `game-api/`: 模擬後端遊戲 API 回應，如 `GameInfo/Get.html` 提供遊戲配置。
- `gtag/js.html`: Google Tag (Gtag) 組態檔，載入追蹤程式並包含多個 `fetch` 呼叫【F:gtag/js.html†L159-L160】。
- `gtm.js`: Google Tag Manager 運作腳本，含大量函式與 `fetch` 請求【F:gtm.js†L178-L179】。
- `loader/04.js`: 遊戲啟動載入器，負責資源初始化與環境偵測。
- `shared/`: 共享模組與工具。
  - `*/index.js`、`*.json`: 被遊戲主程式引用的模組。
  - `service-worker/sw.js`: Workbox 產生的 Service Worker，用於資源快取與離線支援【F:shared/service-worker/sw.js†L1】。
- `web-api/`: 與玩家或代理相關的 Web API 回應，如 `verifySession.html` 驗證登入、`GameName` 與 `Resources` 提供遊戲資訊。

## 修改 API 的一般步驟
1. 找到對應的 API 檔案（例如 `verifySession.html`、`GameInfo/Get.html` 等）。
2. 以文字編輯器開啟，搜尋並調整 URL、參數或回傳值。
3. 若涉及 `fetch` 攔截或快取策略，另需同步更新 `shared/service-worker/sw.js`。
4. 儲存後於部署環境重新載入或重新註冊 Service Worker，以確保變更生效。
