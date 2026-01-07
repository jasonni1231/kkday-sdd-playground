# Project Structure

## Directory Organization

```
kkday-sdd-playground/
├── .spec-workflow/              # Spec workflow 系統目錄
│   ├── templates/              # 文檔模板
│   ├── steering/               # 指導文件 (product, tech, structure)
│   └── specs/                  # 功能規格文件
├── web-calculator/             # Vue 3 計算器應用
│   ├── src/                    # 源碼目錄
│   │   ├── components/         # Vue 組件
│   │   ├── services/           # 業務邏輯服務層
│   │   ├── types/              # TypeScript 類型定義
│   │   ├── assets/             # 靜態資源
│   │   │   └── styles/         # 全局樣式
│   │   ├── utils/              # 工具函數
│   │   ├── App.vue             # 根組件
│   │   └── main.ts             # 應用入口
│   ├── tests/                  # 測試目錄
│   │   ├── unit/               # 單元測試
│   │   ├── integration/        # 整合測試
│   │   └── e2e/                # 端對端測試
│   ├── public/                 # 公共靜態資源
│   ├── dist/                   # 建構輸出
│   └── [config files]          # 配置文件
└── AGENTS.md                   # AI agents 操作指南
```

### 組織原則
- **按層分組**: components (UI) / services (邏輯) / types (類型)
- **測試分離**: 獨立的 tests 目錄，按測試類型組織
- **資源集中**: 靜態資源統一在 assets 目錄
- **配置扁平**: 配置文件放在項目根目錄

## Naming Conventions

### Files
- **Vue 組件**: `PascalCase.vue` (例: `BasicKeypad.vue`, `CalculatorDisplay.vue`)
- **Services**: `PascalCaseService.ts` (例: `CalculatorService.ts`)
- **Types**: `index.ts` (集中導出) 或 `types.ts`
- **Tests**: `[filename].spec.ts` (例: `BasicKeypad.spec.ts`)
- **Documentation**: `[ComponentName].md` (與組件同目錄)
- **Utilities**: `camelCase.ts` (例: `dateUtils.ts`, `formatters.ts`)
- **Styles**: `kebab-case.css` (例: `base.css`, `variables.css`)
- **Config files**: `kebab-case.config.ts` (例: `vite.config.ts`, `eslint.config.js`)

### Code
- **Classes/Types**: `PascalCase` (例: `CalculatorService`, `CalculatorState`)
- **Interfaces**: `PascalCase` (例: `CalculatorState`, `CalculatorActions`)
- **Functions**: `camelCase` (例: `handleButtonClick`, `validateInputs`)
- **Constants/Enums**: `UPPER_SNAKE_CASE` 或 `PascalCase` (例: `CalculatorError`, `OperatorSymbols`)
- **Variables**: `camelCase` (例: `displayValue`, `currentOperand`)
- **Type Aliases**: `PascalCase` + `Type` suffix (例: `OperatorType`, `CalculatorErrorType`)

## Import Patterns

### Import Order
1. Vue core imports
2. External dependencies
3. Internal type imports (使用 `type` keyword)
4. Internal module imports (使用 `@/` alias)
5. Relative imports
6. Style imports

### Example
```typescript
import { reactive } from 'vue'                        // 1. Vue core
import { computed, ref } from 'vue'                   // 1. Vue core
import type { Operator, CalculatorState } from '@/types' // 2. Type imports
import CalculatorDisplay from '@/components/CalculatorDisplay.vue' // 3. Component imports
import { CalculatorService } from '@/services/CalculatorService' // 4. Service imports
import './styles.css'                                 // 5. Style imports
```

### Module Organization
- **Absolute imports**: 使用 `@/` alias 指向 `src/` 目錄
- **Type-only imports**: 使用 `import type` 明確標示類型導入
- **Barrel exports**: types 目錄使用 index.ts 集中導出

## Code Structure Patterns

### Vue Component Organization
```vue
<template>
  <!-- UI 模板 -->
</template>

<script setup lang="ts">
// 1. Imports
import { reactive } from 'vue'
import type { ComponentType } from '@/types'
import SomeComponent from '@/components/SomeComponent.vue'

// 2. Props/Emits definitions
interface Props {
  // ...
}

// 3. Reactive state
const state = reactive({
  // ...
})

// 4. Event handlers
const handleSomething = () => {
  // ...
}

// 5. Computed/Watchers (if needed)
</script>

<style scoped>
/* 組件樣式 */
</style>
```

### Service Class Organization
```typescript
// 1. Imports
import type { Operator } from '@/types'
import { CalculatorError } from '@/types'

// 2. Class documentation
/**
 * Service description
 */
export class SomeService {
  // 3. Public static methods
  static publicMethod() {
    // Input validation
    // Core logic
    // Return result
  }

  // 4. Private helper methods
  private static helperMethod() {
    // Implementation
  }
}
```

### Type Definition Organization
```typescript
// 1. Type imports (if needed)

// 2. Basic types and type aliases
export type Operator = '+' | '-' | '*' | '/'

// 3. Constants
export const SomeConstants = {
  VALUE1: 'value1',
  VALUE2: 'value2'
} as const

// 4. Interfaces
export interface SomeInterface {
  // ...
}

// 5. Type guards
export function isOperator(value: string): value is Operator {
  // ...
}

// 6. Helper types
export type DerivedType = typeof SomeConstants[keyof typeof SomeConstants]
```

## Code Organization Principles

1. **單一職責**: 每個文件有一個明確目的
   - 組件專注 UI 邏輯
   - Service 專注業務邏輯
   - Types 專注類型定義

2. **就近原則**: 相關文件放在一起
   - 組件測試與組件同目錄
   - 組件文檔與組件同目錄
   - 範例組件與主組件同目錄

3. **可測試性**: 結構設計便於測試
   - Service 使用純函數和靜態方法
   - 組件邏輯與業務邏輯分離
   - 清晰的輸入輸出和錯誤處理

4. **一致性**: 遵循既定模式
   - 所有組件使用 Composition API
   - 所有 Service 使用靜態方法
   - 統一的命名和組織方式

## Module Boundaries

### Layer Dependencies
```
App.vue
    ↓
Components (UI Layer)
    ↓
Services (Business Logic Layer)
    ↓
Types (Type Definitions)
```

**規則**:
- Components 可依賴 Services 和 Types
- Services 只能依賴 Types
- Types 不依賴任何其他層
- **嚴禁反向依賴**

### Public vs Internal
- **Public API**: 從 `src/components/` 和 `src/services/` 導出的組件和服務
- **Internal**: `private` 方法、helper functions、內部 utilities
- **Types**: 所有類型定義都是 public，通過 `types/index.ts` 統一導出

## Code Size Guidelines

### File Size
- **Component files**: ≤ 200 行 (含 template, script, style)
- **Service files**: ≤ 300 行
- **Type definition files**: ≤ 200 行
- **超過限制時**: 考慮拆分為多個文件或子模組

### Function/Method Size
- **Max lines per function**: ≤ 50 行
- **Max parameters**: ≤ 4 個
- **超過限制時**: 拆分為多個小函數

### Complexity
- **Nesting depth**: ≤ 3 層
- **Cyclomatic complexity**: ≤ 10
- **工具**: 使用 ESLint 規則檢查複雜度

## Documentation Standards

### Required Documentation
1. **Components**:
   - 每個組件都有 `.md` 文檔（與組件同目錄）
   - 包含: 功能說明、使用範例、Props/Events、樣式變數

2. **Services**:
   - JSDoc comments 描述每個 public method
   - 包含: 參數說明、返回值、拋出的錯誤、使用範例

3. **Types**:
   - JSDoc comments 描述複雜類型和接口
   - 包含: 用途說明、欄位含義、使用範例

### Documentation Format
- 使用 TypeScript JSDoc 標準格式
- 中文說明 + 英文範例程式碼
- 保持精簡，避免過度文檔化

### Example
```typescript
/**
 * 執行兩個運算元的計算
 *
 * @param operand1 - 第一個運算元
 * @param operator - 運算符 (+, -, *, /)
 * @param operand2 - 第二個運算元
 * @returns 計算結果
 * @throws {Error} 除以零時拋出錯誤
 *
 * @example
 * ```typescript
 * CalculatorService.calculate(10, '+', 5)  // 15
 * CalculatorService.calculate(10, '/', 0)  // throws Error
 * ```
 */
static calculate(operand1: number, operator: Operator, operand2: number): number
```

## Testing Structure

### Test File Location
- **Component tests**: 與組件同目錄 (`ComponentName.spec.ts`)
- **Service tests**: 與 service 同目錄 (`ServiceName.spec.ts`)
- **Integration tests**: `tests/integration/` 目錄
- **E2E tests**: `tests/e2e/` 目錄

### Test Organization
```typescript
// 1. Imports
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Component.vue'

// 2. Describe blocks (grouped by feature)
describe('ComponentName', () => {
  // 3. Test cases
  it('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  })
})
```

### Test Naming
- **Test files**: `[filename].spec.ts`
- **Describe blocks**: 描述測試對象 (Component name, Service name)
- **Test cases**: 使用 "should..." 格式描述期望行為

## Project-Specific Conventions

### Vue 3 Specifics
- 使用 `<script setup>` 語法
- 使用 Composition API（不使用 Options API）
- 使用 `reactive()` 管理複雜狀態
- 使用 `type` import 明確標示類型

### TypeScript Strictness
- 啟用 strict mode
- 禁止使用 `any` (ESLint rule: `@typescript-eslint/no-explicit-any: error`)
- 所有函數都要有明確的返回類型（除非可推斷）
- 使用 type guards 進行運行時類型檢查

### Error Handling
- Service 層拋出有意義的錯誤訊息
- 使用預定義的錯誤常數（`CalculatorError`）
- Component 層捕獲並顯示錯誤給用戶
- 錯誤狀態存儲在 reactive state 中
