# Technology Stack

## Project Type
Web Application - 前端單頁應用 (SPA)，提供互動式計算器功能

## Core Technologies

### Primary Language(s)
- **Language**: TypeScript 5.9.3
- **Runtime**: 瀏覽器環境 (ES2020+)
- **Language-specific tools**: npm (package manager), TypeScript compiler

### Key Dependencies/Libraries
- **Vue 3.5.24**: 漸進式 JavaScript 框架，使用 Composition API 和 `<script setup>` 語法
- **Vite 7.2.4**: 現代化建構工具，提供快速開發體驗和 HMR
- **@vitejs/plugin-vue 6.0.1**: Vite 的 Vue 3 單文件組件支援

### Application Architecture
**Component-based Architecture with Service Layer**
- **Presentation Layer**: Vue 3 組件 (App.vue, CalculatorDisplay, BasicKeypad)
- **Business Logic Layer**: CalculatorService (靜態方法，純函數設計)
- **State Management**: Reactive state using Vue 3 Composition API
- **Type System**: 完整的 TypeScript 類型定義和類型守衛

### Data Storage
- **Primary storage**: 瀏覽器記憶體 (in-memory reactive state)
- **Caching**: 不適用
- **Data formats**: TypeScript interfaces 和 type definitions

### External Integrations
無外部 API 或服務整合，完全自包含的前端應用

## Development Environment

### Build & Development Tools
- **Build System**: Vite (基於 Rollup)
- **Package Management**: npm
- **Development workflow**:
  - `npm run dev` - 開發伺服器 with HMR
  - `npm run build` - 生產環境建構
  - `npm run preview` - 預覽生產建構

### Code Quality Tools
- **Static Analysis**:
  - ESLint 9.39.2 with TypeScript ESLint 8.52.0
  - Vue ESLint plugin 10.6.2
  - 嚴格規則: `@typescript-eslint/no-explicit-any: error`
- **Formatting**:
  - Prettier 3.7.4
  - ESLint + Prettier 整合 (eslint-plugin-prettier)
  - 自動格式化腳本: `npm run format`
- **Testing Framework**:
  - Vitest 4.0.16 (與 Vite 原生整合)
  - @vue/test-utils 2.4.6 (Vue 組件測試工具)
  - happy-dom 20.0.11 (輕量級 DOM 環境)
  - @vitest/ui 4.0.16 (測試 UI 介面)
  - Coverage: v8 provider, 多格式報告 (text, json, html)
- **Documentation**: TypeScript JSDoc comments in source code

### Version Control & Collaboration
- **VCS**: Git
- **Branching Strategy**: 待定 (由團隊決定)
- **Code Review Process**: AI-assisted development with spec workflow

## Deployment & Distribution
- **Target Platform(s)**: 現代瀏覽器 (支援 ES2020+)
- **Distribution Method**: 靜態網站託管 (dist 目錄輸出)
- **Installation Requirements**: 無需安裝，瀏覽器直接訪問
- **Update Mechanism**: 透過 CDN 或靜態伺服器更新

## Technical Requirements & Constraints

### Performance Requirements
- 快速初始載入 (Vite 優化的程式碼分割和 tree-shaking)
- 即時響應的使用者互動 (Vue 3 reactive system)
- 記憶體效率 (單一狀態對象，無不必要的資料複製)

### Compatibility Requirements
- **Platform Support**:
  - Chrome, Firefox, Safari, Edge (最新兩個版本)
  - 移動瀏覽器 (responsive design)
- **Dependency Versions**:
  - Node.js >= 18 (開發環境)
  - TypeScript ~5.9.3
  - Vue ^3.5.24
- **Standards Compliance**: ES Modules, TypeScript strict mode

### Security & Compliance
- **Security Requirements**:
  - 無外部資料傳輸，完全客戶端運算
  - 類型安全 (TypeScript strict mode)
  - 輸入驗證 (CalculatorService.validateInputs)
- **Compliance Standards**: 不適用 (無資料收集)
- **Threat Model**:
  - XSS 防護 (Vue 3 自動轉義)
  - 數值溢位保護 (錯誤處理機制)

### Scalability & Reliability
- **Expected Load**: 單使用者應用，無後端負載
- **Availability Requirements**: 靜態網站 99.9% 可用性 (依託管平台)
- **Growth Projections**: 可擴展為更複雜的科學計算器

## Technical Decisions & Rationale

### Decision Log

1. **Vue 3 Composition API**:
   - 更好的 TypeScript 支援
   - 邏輯復用和程式碼組織
   - 相比 Options API 更簡潔

2. **Vite over Webpack**:
   - 開發體驗更快 (原生 ESM, esbuild)
   - 配置更簡單
   - Vue 3 官方推薦

3. **Vitest over Jest**:
   - 與 Vite 原生整合
   - 更快的測試執行速度
   - 相同的配置檔案格式

4. **Service Layer Pattern**:
   - 分離業務邏輯和 UI
   - 易於測試 (純函數)
   - 可重用於其他組件或平台

5. **Strict TypeScript Configuration**:
   - 禁止 `any` 類型
   - 強制類型檢查
   - 提升程式碼品質和可維護性

6. **Happy-DOM over JSDOM**:
   - 更快的測試執行
   - 更輕量的依賴
   - 與 Vitest 更好的整合

## Known Limitations

- **精度限制**: JavaScript Number 類型的浮點數精度限制 (IEEE 754)
- **溢位處理**: 目前未實作大數運算，極大或極小數值可能造成精度損失
- **無歷史記錄**: 目前不支援計算歷史或復原功能
- **有限的運算子**: 僅支援基本四則運算，未來可擴展科學運算
