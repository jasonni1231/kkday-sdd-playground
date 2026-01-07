<template>
  <div class="basic-keypad">
    <!-- Row 1: Clear buttons and division, multiply -->
    <button
      class="function"
      aria-label="Clear"
      @click="handleClick('C')"
    >
      C
    </button>
    <button
      class="function"
      aria-label="Clear entry"
      @click="handleClick('CE')"
    >
      CE
    </button>
    <button
      class="operator"
      aria-label="Divide"
      @click="handleClick('/')"
    >
      /
    </button>
    <button
      class="operator"
      aria-label="Multiply"
      @click="handleClick('*')"
    >
      *
    </button>

    <!-- Row 2: 7, 8, 9, minus -->
    <button
      aria-label="Number 7"
      @click="handleClick('7')"
    >
      7
    </button>
    <button
      aria-label="Number 8"
      @click="handleClick('8')"
    >
      8
    </button>
    <button
      aria-label="Number 9"
      @click="handleClick('9')"
    >
      9
    </button>
    <button
      class="operator"
      aria-label="Minus"
      @click="handleClick('-')"
    >
      -
    </button>

    <!-- Row 3: 4, 5, 6, plus -->
    <button
      aria-label="Number 4"
      @click="handleClick('4')"
    >
      4
    </button>
    <button
      aria-label="Number 5"
      @click="handleClick('5')"
    >
      5
    </button>
    <button
      aria-label="Number 6"
      @click="handleClick('6')"
    >
      6
    </button>
    <button
      class="operator"
      aria-label="Plus"
      @click="handleClick('+')"
    >
      +
    </button>

    <!-- Row 4: 1, 2, 3, equals -->
    <button
      aria-label="Number 1"
      @click="handleClick('1')"
    >
      1
    </button>
    <button
      aria-label="Number 2"
      @click="handleClick('2')"
    >
      2
    </button>
    <button
      aria-label="Number 3"
      @click="handleClick('3')"
    >
      3
    </button>
    <button
      class="equals"
      aria-label="Equals"
      @click="handleClick('=')"
    >
      =
    </button>

    <!-- Row 5: 0, decimal point -->
    <button
      class="zero"
      aria-label="Number 0"
      @click="handleClick('0')"
    >
      0
    </button>
    <button
      aria-label="Decimal point"
      @click="handleClick('.')"
    >
      .
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'button-click': [value: string]
}>()

const handleClick = (value: string) => {
  emit('button-click', value)
}
</script>

<style scoped>
.basic-keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  max-width: 320px;
}

button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: 500;
  font-family: var(--font-family);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-button-number);
  color: var(--color-button-text);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button:hover {
  background-color: var(--color-button-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Operator buttons */
.operator {
  background-color: var(--color-button-operator);
  color: white;
  font-weight: 600;
}

.operator:hover {
  background-color: var(--color-primary-dark);
}

/* Function buttons (Clear, Clear Entry) */
.function {
  background-color: var(--color-button-function);
  font-weight: 600;
}

.function:hover {
  background-color: #e0e0e0;
}

/* Equals button */
.equals {
  background-color: var(--color-primary-light);
  color: white;
  font-weight: 600;
  grid-row: span 2;
}

.equals:hover {
  background-color: var(--color-primary);
}

/* Zero button - spans 2 columns */
.zero {
  grid-column: span 2;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .basic-keypad {
    max-width: 100%;
  }

  button {
    min-height: 56px;
    font-size: var(--font-size-xl);
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  button {
    border-color: var(--color-border);
  }

  .function:hover {
    background-color: #505050;
  }
}
</style>
