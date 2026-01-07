<template>
  <div class="calculator-display">
    <div class="display-value" aria-live="polite">{{ displayText }}</div>
    <div v-if="error" class="error-message" role="alert">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  displayValue: string
  error: string | null
}

const props = defineProps<Props>()

const displayText = computed(() => {
  return props.displayValue
})
</script>

<style scoped>
.calculator-display {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition-fast);
}

.calculator-display:focus-within {
  border-color: var(--color-primary);
  outline: none;
}

.display-value {
  font-size: var(--font-size-display);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-family);
  text-align: right;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 1.2em;
  line-height: 1.2;
}

.error-message {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  font-weight: 500;
  text-align: right;
  width: 100%;
  animation: fadeIn var(--transition-fast);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure good contrast ratios for accessibility (WCAG AA) */
@media (prefers-color-scheme: dark) {
  .calculator-display {
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  .display-value {
    color: var(--color-text-primary);
  }
}

/* Responsive design for smaller screens */
@media (max-width: 480px) {
  .calculator-display {
    padding: var(--spacing-md);
    min-height: 60px;
  }

  .display-value {
    font-size: var(--font-size-xl);
  }
}
</style>
