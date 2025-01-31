# Bullet OOTD

Bullet OOTD 是一個 **穿搭記錄管理應用**，使用 **Vite + React + TypeScript + Redux Toolkit + Tailwind CSS**，並支援 **多語言 (i18n)**。

## 🚀 技術棧
- **框架**：Vite + React + TypeScript
- **狀態管理**：Redux Toolkit
- **樣式**：Tailwind CSS
- **日期處理**：Moment.js
- **多語言**：i18next
- **圖片管理**：Redux + 本地 `/public/demo-outfits/`
- **數據儲存**：目前使用 Redux，未來可對接 API
- **環境管理**：Vite 環境變數 (`.env`)

## ⚙️ 環境需求
- **Node.js v22 以上**（請使用 `nvm use v22` 切換至正確版本）
- **Yarn**（請使用 `yarn` 而非 `npm`）


## 💻 開發環境安裝
```sh
# 切換 Node.js 版本（確保使用 v22）
nvm use v22

# 安裝專案依賴
yarn install

# 啟動開發環境
yarn dev