任務罐 APP (Task Jar) - v7.5 完整專案文件

這是一個結合目標管理、遊戲化體驗、社群互動與AI 輔助的單頁式網頁應用程式 (SPA)。使用者將目標設定為「櫃子」，將分類設定為「罐子」，透過完成任務來填滿罐子裡的能量液體。

🔗 專案資源連結

應用主頁 (Demo URL):
https://nomochrome.site/chihlee/missionapp_demo.html

後端 API (Google Apps Script Web App URL):
https://script.google.com/macros/s/AKfycbzGCeuJiAXRf5Z8ZWDiYM2pAkQq9E9z_C0yLMrmBU_hVYsJ7yqX2m4HXihigRJDWkXA/exec

雲端資料庫 (Google Sheets):
點此查看資料庫
(注意：需確保 Sheet 擁有 Data, Friends, Chats, SharedJars 四個工作表)

🌟 核心功能 (Features)

1. 使用者系統 & 引導

ID 登入機制：輸入使用者 ID 即可登入，系統自動判斷是原用戶（載入雲端資料）還是新用戶（進入引導流程）。

NPC 引導 (Onboarding)：以對話機器人形式，引導新用戶建立第一個目標與任務罐。

防呆機制：登入時若查無 ID，會彈出確認視窗，避免誤創新帳號。

2. 視覺化任務管理 (Dashboard)

三層結構：

櫃子 (Cabinet)：代表最終大目標（如：多益金榜），設定完成後的獎勵。

罐子 (Jar)：代表任務分類（如：單字、聽力），支援「簡單罐」(僅打勾) 與「複雜罐」(需時間/備註)。

任務 (Task)：具體的執行項目。

動態特效：

液體動畫：罐子內的液體高度隨任務完成度自動升降。

黃金模式：當罐子 100% 完成時，會發出黃金光澤並出現獎盃圖示。

彩帶慶祝：完成最後一個任務時觸發全螢幕彩帶特效。

3. 社群協作 (Social)

好友系統：

搜尋加入：輸入 ID 搜尋好友，系統會驗證 ID 是否存在。

通訊錄：獨立的分頁管理好友名單。

即時聊天：

點擊好友進入聊天室。

支援訊息發送與歷史紀錄讀取（採用輪詢機制模擬即時性）。

訊息排序為「新至舊」（最新訊息在最上方）。

任務罐共享：

多選分享：建立或編輯罐子時，可勾選多位好友進行共享。

雙向同步：任何一方對共享罐新增任務或打勾，狀態會即時同步給所有成員。

視覺標記：共享的罐子會顯示「👥 共享中」標籤及成員 ID 列表。

4. AI 智能助手 (Gemini Integrated)

真實 AI 對話：整合 Google Gemini 2.5 Flash 模型。

上下文感知：AI 能「看見」您目前的任務櫃狀態（櫃子名稱、罐子進度），提供具體建議。

快捷回應：提供「給我動力」、「拆解任務」等快捷氣泡，一鍵生成建議。

打字動畫：模擬真人思考中的動態效果。

5. 系統設定與同步

雲端同步：操作後 2 秒自動將資料寫入 Google Sheets (Debounce 機制)。

設定面板：查看帳號資訊、清除本機快取、手動強制同步、登出。

🛠️ 技術架構 (Tech Stack)

類別

技術/工具

用途說明

前端框架

React 18 (UMD)

使用 CDN 引入，無需 Node.js 環境即可運行，方便分享與修改。

語言

JavaScript (ES6+) / JSX

透過 Babel Standalone 在瀏覽器端即時編譯。

樣式庫

Tailwind CSS

快速構建響應式與玻璃擬態 (Glassmorphism) 風格介面。

後端 API

Google Apps Script (GAS)

接收前端的 GET/POST 請求，作為 Serverless 後端。

資料庫

Google Sheets

儲存使用者資料、好友關係、聊天記錄。

特效庫

Canvas Confetti

實現慶祝時的撒紙花效果。

AI 模型

Gemini 2.5 Flash

Google Generative AI API，用於智慧助手功能。

💻 開發細節與解決方案 (Coding Details & Solutions)

1. CDN 架構與單一檔案 (CDN & Single File)

設計考量：為了讓專案能夠「下載即用 (No-Build)」，我們不使用傳統的 create-react-app 或 vite 打包流程。

實作方式：

React & ReactDOM：直接透過 unpkg CDN 引入 UMD 版本。

Babel：引入 babel-standalone，讓瀏覽器能即時編譯 <script type="text/babel"> 區塊內的 JSX 語法。

Tailwind CSS：使用 Play CDN 版本，自動掃描 HTML class 並生成樣式。

優點：極度輕量、易於部署（只需一個 HTML 檔）、方便教學與修改。

2. GAS 跨域問題解決 (CORS Solution)

問題：瀏覽器在發送 application/json 格式的 POST 請求給 Google Apps Script 時，會觸發 CORS 預檢請求 (Preflight Options)，導致請求被 Google 阻擋。

解決方案：

前端 fetch 時，將 header 設定為 Content-Type: text/plain。

這樣瀏覽器會將其視為「簡單請求 (Simple Request)」，跳過預檢直接發送。

後端 GAS 接收到 text/plain 字串後，再透過 JSON.parse() 解析回物件進行處理。

3. React 組件狀態與焦點問題 (Component Re-render)

問題：若將子組件（如聊天室、輸入框）定義在主 App 函數內部，每次 App 狀態更新（如輸入文字）都會導致子組件被視為「新組件」而重新掛載 (Remount)，造成輸入框失去焦點。

解決方案：

將所有子組件（ChatTabComp, HomeTabComp 等）移至 App 函數外部定義。

透過 props 將狀態與函數傳遞給子組件。

這確保了 React 的 Virtual DOM Diffing 機制能正確運作，只更新數值而不重建 DOM。

⚙️ 系統邏輯 (System Logic)

1. 資料結構 (Data Schema)

前端主要維護 cabinets 陣列，結構如下：

[
  {
    id: "cab_01",
    name: "目標名稱",
    reward: "獎勵",
    jars: [
      {
        id: "jar_01",
        name: "罐子名稱",
        type: "類型",
        mode: "簡單罐",
        isShared: true,      // 是否共享
        sharedWith: ["user2"], // 共享給誰
        tasks: [
          { id: "t1", name: "任務A", completed: false }
        ]
      }
    ]
  }
]



2. 同步機制 (Sync Mechanism)

讀取 (Load)：登入時呼叫 GAS doGet，參數 action=get_personal。

寫入 (Save)：

使用 useEffect 監聽 cabinets 變化。

設定 2000ms 的 Debounce (防抖)，避免頻繁寫入。

呼叫 GAS doPost，為了避開 CORS 預檢請求 (Preflight)，Header 設定為 Content-Type: text/plain。

3. 共享邏輯 (Sharing Logic)

建立共享：呼叫 API action=share_jar，將罐子資料寫入 Sheet 的 SharedJars 表。

讀取共享：登入時呼叫 API action=get_shared_jars，抓取別人分享給我的罐子。

合併顯示：前端會比對「個人櫃」與「雲端共享櫃」的資料，若 ID 相同，則優先顯示雲端的最新進度，達成同步效果。

🔄 使用者流程圖 (User Flow)

graph TD
    A[啟動 APP] --> B{本地有登入紀錄?}
    B -- 是 --> C[自動登入 & 載入雲端資料]
    B -- 否 --> D[登入頁面]
    
    D --> E(輸入 ID & 資料庫網址)
    E --> F{檢查 ID 是否存在?}
    F -- 存在 --> C
    F -- 不存在 --> G[彈出確認視窗]
    G -- 建立新帳號 --> H[NPC 引導設定目標]
    H --> C
    
    C --> I[主控台 (Dashboard)]
    
    I --> J{操作行為}
    J -- 新增/編輯任務 --> K[更新本地 State]
    J -- 建立/分享罐子 --> L[呼叫 Share API]
    J -- 切換分頁 --> M[好友/聊天/AI]
    
    K --> N((自動同步 debounce 2s))
    N --> O[寫入 Google Sheet]
    
    M -- 聊天 --> P[發送訊息] --> Q[寫入 Chats Sheet]
    M -- AI 助手 --> R[發送 Prompt] --> S[呼叫 Gemini API] --> T[顯示建議]



5. 部署與發布 (Deployment)

前端：

直接將 HTML 檔案部署至任何靜態網頁託管服務 (GitHub Pages, Vercel, Netlify) 或直接在本地開啟。

後端 (Google Apps Script)：

貼上腳本至 GAS 編輯器。

部署為「網頁應用程式」。

權限設定為 Execute as: Me, Who has access: Anyone。