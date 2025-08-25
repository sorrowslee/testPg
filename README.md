# 遊戲資源解析

此倉庫為 PGSoft《Wild Bounty Showdown》網頁版的編譯後檔案，所有程式碼皆經過混淆處理。以下整理各檔案與資料夾的用途，以及 API 呼叫的位置與修改方式。

## API 發送與接收

* **攔截與改寫機制：** `135/hack.js` 於載入時改寫 `fetch` 與 `XMLHttpRequest`，將任何指向 `api.0.0.1`、`api.127.0.0.1` 或以 `/` 開頭的路徑全部轉向 `https://api.pgsoft-games.com`【F:135/hack.js†L1】。
* **會話設定：** `web-api/auth/session/v2/verifySession.html` 回傳遊戲所需的基礎路徑，例如 `geu`（遊戲 API）、`lau`（大廳 API）、`bau`（代理 API）等【F:web-api/auth/session/v2/verifySession.html†L1】。
* **資源列表：** `web-api/game-proxy/v2/Resources/GetByResourcesTypeIds.html` 提供各類資源對應的 CDN 連結，如 `public.pgsoft-games.com` 圖片資源【F:web-api/game-proxy/v2/Resources/GetByResourcesTypeIds.html†L1】。
* **遊戲資訊：** `game-api/wild-bounty-sd/v2/GameInfo/Get.html` 是實際遊戲 API 的回應，包含押注、轉輪等設定【F:game-api/wild-bounty-sd/v2/GameInfo/Get.html†L1-L7】。

### 修改 API 的步驟
1. **更換網域或路徑：**
   - 編輯 `135/hack.js`，將 `api.pgsoft-games.com` 改為新的 API 網域。
   - 如需變更預設 API 子路徑，修改 `web-api/auth/session/v2/verifySession.html` 中的 `geu`、`lau`、`bau` 參數。
2. **重新部署：**
   - 將修改後的檔案重新佈署至伺服器，並確保瀏覽器清除快取或更新 Service Worker（`shared/service-worker/sw.js`）。

## 檔案與資料夾用途

| 位置 | 說明 |
| --- | --- |
| `135/index.html` | 網站進入點，載入 `hack.js` 與主要遊戲腳本。 |
| `135/hack.js` | 攔截並改寫 API 請求的腳本。 |
| `135/assets/main/index.b8ae1.js` | 經混淆的 Cocos 遊戲主程式。 |
| `135/assets/main/config.689d3.json` | 資源清單與場景索引，例如 `db://assets/default/scene/main.fire` 等【F:135/assets/main/config.689d3.json†L1-L20】 |
| `loader/04.js` | 初始化與載入遊戲資源的程式。 |
| `shared/*` | 以雜湊命名的模組與腳本，含 `service-worker/sw.js` 供快取與離線使用。 |
| `web-api/` | 模擬的 Web API 回應，如會話驗證、資源查詢。 |
| `game-api/` | 模擬的遊戲 API 回應，如 `GameInfo`。 |
| `gtag/`, `gtm.js`, `g/collect.html` | Google Tag/Analytics 相關腳本與範例請求。 |

