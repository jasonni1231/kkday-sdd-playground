<template>
  <div class="calculator-app">
    <div class="calculator-container">
      <h1 class="sr-only">Web Calculator</h1>

      <CalculatorDisplay :displayValue="state.displayValue" :error="state.error" />

      <BasicKeypad @button-click="handleButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CalculatorDisplay from './components/CalculatorDisplay.vue'
import BasicKeypad from './components/BasicKeypad.vue'
import { CalculatorService } from './services/CalculatorService'
import type { CalculatorState, Operator } from './types'
import { isOperator } from './types'

// Initialize calculator state
const state = reactive<CalculatorState>({
  displayValue: '0',
  currentOperand: null,
  operator: null,
  waitingForOperand: false,
  error: null
})

/**
 * Handle button clicks from the keypad
 */
const handleButtonClick = (value: string) => {
  // Clear any existing errors when user interacts
  if (state.error) {
    state.error = null
  }

  // Handle different button types
  if (value >= '0' && value <= '9') {
    handleNumber(value)
  } else if (value === '.') {
    handleDecimal()
  } else if (isOperator(value)) {
    handleOperator(value)
  } else if (value === '=') {
    handleEquals()
  } else if (value === 'C') {
    handleClear()
  } else if (value === 'CE') {
    handleClearEntry()
  }
}

/**
 * Handle number button input
 */
const handleNumber = (digit: string) => {
  if (state.waitingForOperand) {
    state.displayValue = digit
    state.waitingForOperand = false
  } else {
    state.displayValue = state.displayValue === '0' ? digit : state.displayValue + digit
  }
}

/**
 * Handle decimal point input
 */
const handleDecimal = () => {
  if (state.waitingForOperand) {
    state.displayValue = '0.'
    state.waitingForOperand = false
  } else if (!state.displayValue.includes('.')) {
    state.displayValue += '.'
  }
}

/**
 * Handle operator button (+, -, *, /)
 */
const handleOperator = (nextOperator: Operator) => {
  const inputValue = parseFloat(state.displayValue)

  if (state.currentOperand === null) {
    // First operand
    state.currentOperand = inputValue
  } else if (state.operator) {
    // Perform calculation with previous operator
    try {
      const result = CalculatorService.calculate(
        state.currentOperand,
        state.operator,
        inputValue
      )

      state.displayValue = String(result)
      state.currentOperand = result
    } catch (error) {
      state.error = (error as Error).message
      state.currentOperand = null
      state.operator = null
      state.waitingForOperand = false
      return
    }
  }

  state.waitingForOperand = true
  state.operator = nextOperator
}

/**
 * Handle equals button
 */
const handleEquals = () => {
  const inputValue = parseFloat(state.displayValue)

  if (state.currentOperand !== null && state.operator) {
    try {
      const result = CalculatorService.calculate(
        state.currentOperand,
        state.operator,
        inputValue
      )

      state.displayValue = String(result)
      state.currentOperand = null
      state.operator = null
      state.waitingForOperand = false
    } catch (error) {
      state.error = (error as Error).message
      state.displayValue = '0'
      state.currentOperand = null
      state.operator = null
      state.waitingForOperand = false
    }
  }
}

/**
 * Handle clear button (C) - reset everything
 */
const handleClear = () => {
  state.displayValue = '0'
  state.currentOperand = null
  state.operator = null
  state.waitingForOperand = false
  state.error = null
}

/**
 * Handle clear entry button (CE) - clear current input only
 */
const handleClearEntry = () => {
  state.displayValue = '0'
  state.waitingForOperand = false
}
</script>

<style scoped>
.calculator-app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: var(--spacing-md);
}

.calculator-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 400px;
  width: 100%;
  padding: var(--spacing-lg);
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .calculator-app {
    padding: 0;
  }

  .calculator-container {
    max-width: 100%;
    min-height: 100vh;
    border-radius: 0;
    justify-content: center;
  }
}
</style>
