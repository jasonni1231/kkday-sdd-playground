<template>
  <div class="example-container">
    <h2>BasicKeypad Component Example</h2>

    <div class="display">
      <div class="input-display">{{ display }}</div>
    </div>

    <BasicKeypad @button-click="handleButtonClick" />

    <div class="info">
      <p>Last button pressed: <strong>{{ lastButton }}</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicKeypad from './BasicKeypad.vue'

const display = ref('0')
const lastButton = ref('None')

const handleButtonClick = (value: string) => {
  lastButton.value = value

  if (value === 'C') {
    display.value = '0'
  } else if (value === 'CE') {
    display.value = '0'
  } else if (display.value === '0' && value !== '.') {
    display.value = value
  } else {
    display.value += value
  }
}
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  margin: 0;
}

.display {
  width: 100%;
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.input-display {
  font-size: var(--font-size-display);
  text-align: right;
  color: var(--color-text-primary);
  font-weight: 500;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  word-break: break-all;
}

.info {
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
  text-align: center;
}

.info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
}

.info strong {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
}
</style>
