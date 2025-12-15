任務罐 APP (Task Jar) - v7.5 完整專案文件
===

**專案簡介**
---
這是一個結合 目標管理、遊戲化體驗、社群互動 與 AI 輔助 的單頁式網頁應用程式 (SPA)。使用者將目標設定為「櫃子」，將分類設定為「罐子」，透過完成任務來填滿罐子裡的能量液體。


🔗 **專案資源連結**
---
🚀 應用主頁

https://nomochrome.site/chihlee/missionapp_demo.html

⚡ 後端 API

https://script.google.com/macros/s/AKfycbzGCeuJiAXRf5Z8ZWDiYM2pAkQq9E9z_C0yLMrmBU_hVYsJ7yqX2m4HXihigRJDWkXA/exec

Google Apps Script

📊 雲端資料庫

Google Sheets Link

需包含 Data, Friends 等工作表

✅ **開發進度與功能清單**
---
👤 使用者系統

- [x] ID 登入機制：自動判斷老手/新手。

- [x] NPC 引導 (Onboarding)：對話式機器人引導建立初次目標。

- [x] 防呆機制：登入時若查無 ID，彈出確認視窗。

🎨 視覺化介面 (Dashboard)

- [x] Apple 風格毛玻璃特效 (Glassmorphism)。

- [x] 液體動畫：隨任務進度自動升降。

- [x] 黃金模式：100% 完成時觸發發光特效與獎盃。

- [x] 彩帶慶祝：完成任務時的撒紙花效果。

🤝 社群協作 (Social)

- [x] 好友搜尋與加入。

- [x] 即時聊天室 (支援訊息新至舊排序)。

- [x] 任務罐共享 (多選好友、雙向同步)。

- [x] 共享標記：顯示「👥 共享中」與成員名單。

🤖 AI 智能助手

- [x] Gemini 2.5 Flash 整合。

- [x] 上下文感知：AI 能讀取目前的任務櫃狀態。

- [x] 快捷回應氣泡：一鍵發送常用指令。

- [x] 打字模擬動畫。

💻 **開發細節與解決方案 (Solutions)**
---
- 輕量化架構 (No-Build Architecture)

* 為了讓專案能夠「下載即用」，我們不使用 Webpack 或 Vite 打包。

* 核心：React 18 (UMD) + Babel Standalone。

* 樣式：Tailwind CSS (CDN)。

* 優點：只有一個 .html 檔案，部署極致簡單。

- Google Apps Script 跨域問題 (CORS)

* 問題：瀏覽器直接 POST JSON 到 GAS 會觸發 CORS Preflight 錯誤。

**解決方案：**
---

**前端 fetch 設定**
'''
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // 偽裝成純文字繞過檢查
    body: JSON.stringify(payload)
});
'''

**React 組件重新渲染問題**

- 問題：若將子組件定義在 App 內部，每次輸入都會導致 Input 失去焦點。

* 解決方案：

* 將 ChatTabComp, HomeTabComp 等所有組件移至 App 函數 外部 定義。

* 透過 props 傳遞狀態，確保 React Diffing 機制正常運作。

⚙️ **系統邏輯與資料結構**
---
資料結構 (Data Schema)

- 前端維護的核心 cabinets 陣列結構如下：
'''
[
  {
    "id": "cab_01",
    "name": "多益金榜 (櫃子)",
    "reward": "Switch 遊戲片",
    "jars": [
      {
        "id": "jar_01",
        "name": "單字累積 (罐子)",
        "type": "學習",
        "mode": "簡單罐",
        "isShared": true,
        "sharedWith": ["user2", "user3"],
        "tasks": [
          { "id": "t1", "name": "背50個單字", "completed": false }
        ]
      }
    ]
  }
]
'''

**- 同步機制 (Sync)**

* Debounce (防抖)：資料變更後，等待 2 秒無動作才寫入資料庫，減少 API 呼叫次數。

* 雙向合併：登入時讀取 SharedJars，若發現有別人共享給自己的罐子，會自動合併到個人櫃顯示。

🔄 **使用者流程圖 (User Flow)**
---
graph TD
    Start[🚀 啟動 APP] --> CheckLogin{本地有登入紀錄?}
    
    CheckLogin -- 是 --> AutoLogin[自動登入 & 載入雲端]
    CheckLogin -- 否 --> LoginPage[🔐 登入頁面]
    
    LoginPage --> InputID(輸入 ID & 資料庫網址)
    InputID --> CheckID{檢查 ID 是否存在?}
    
    CheckID -- 存在 --> AutoLogin
    CheckID -- 不存在 --> Confirm[⚠️ 彈出確認視窗]
    
    Confirm -- 建立新帳號 --> NPC[🤖 NPC 引導設定]
    NPC --> Dashboard
    AutoLogin --> Dashboard[🏠 主控台 (Dashboard)]
    
    Dashboard --> Action{使用者操作}
    
    Action -- 新增/編輯任務 --> LocalUpdate[更新本地 State]
    Action -- 建立/分享罐子 --> API_Share[呼叫 Share API]
    Action -- 聊天/AI --> Chat[聊天室功能]
    
    LocalUpdate --> Sync((⏳ 自動同步 2s))
    Sync --> GAS[寫入 Google Sheet]


📸 **應用程式截圖**
---
(有空再加，要做demo)

登入畫面

主控台 (任務櫃)

聊天室與好友

AI 助手

🚀 **部署教學**
---
下載：將本專案的 schedule_planner.html 下載至本機。

執行：直接雙擊檔案，使用 Chrome / Edge / Safari 開啟。

後端設定 (若需自行架設)：

複製 GAS 腳本至您的 Google Apps Script 專案。

部署為「網頁應用程式」。

權限設定：Execute as: Me, Who has access: Anyone。
