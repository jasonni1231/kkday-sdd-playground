# BasicKeypad Component

A Vue 3 calculator keypad component built using Test-Driven Development (TDD).

## Features

- **18 Buttons**: Numbers (0-9), operators (+, -, *, /), equals (=), decimal (.), clear (C), and clear entry (CE)
- **Accessible**: All buttons have proper `aria-label` attributes
- **Touch-friendly**: Minimum 44x44px touch targets
- **Visual Feedback**: Hover and active states for better UX
- **Responsive Design**: Grid layout that adapts to different screen sizes
- **Brand Colors**: Uses project's primary color (#26bec9) for operator buttons
- **Dark Mode Support**: Automatically adjusts colors based on system preference

## Button Layout

```
C   CE   /   *
7   8    9   -
4   5    6   +
1   2    3   =
0   .        =
```

## Usage

```vue
<template>
  <div>
    <BasicKeypad @button-click="handleButtonClick" />
  </div>
</template>

<script setup lang="ts">
import BasicKeypad from '@/components/BasicKeypad.vue'

const handleButtonClick = (value: string) => {
  console.log('Button clicked:', value)
  // Handle the button click
}
</script>
```

## Events

### `button-click`

Emitted when any button is clicked.

**Payload**: `string` - The value of the button that was clicked (e.g., '1', '+', '=', 'C')

## Button Values

- **Numbers**: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
- **Operators**: '+', '-', '*', '/'
- **Special**: '=' (equals), '.' (decimal point), 'C' (clear), 'CE' (clear entry)

## Styling

The component uses scoped styles and CSS variables from the project's design system:

- Primary color: `--color-primary` (#26bec9)
- Button sizes: Minimum 44x44px
- Grid layout: 4 columns with responsive gap
- Transitions: Smooth hover and active states

### CSS Variables Used

- `--color-primary`
- `--color-primary-dark`
- `--color-primary-light`
- `--color-button-number`
- `--color-button-operator`
- `--color-button-function`
- `--spacing-sm`, `--spacing-md`
- `--radius-sm`, `--radius-md`
- `--transition-fast`

## Accessibility

- All buttons have descriptive `aria-label` attributes
- Keyboard navigation supported (standard button behavior)
- Focus-visible outline for keyboard users
- High contrast for text and backgrounds
- Minimum touch target size of 44x44px

## Testing

The component has comprehensive test coverage:

```bash
npm test -- BasicKeypad.spec.ts
```

**Test Coverage**:
- Component rendering (all buttons present)
- Button click events and emission
- Accessibility (aria-labels)
- Visual states (CSS classes)
- Layout structure

## Development

### TDD Approach

This component was built using the Red-Green-Refactor cycle:

1. **RED**: Write failing tests first
2. **GREEN**: Implement component to pass tests
3. **REFACTOR**: Improve code while keeping tests green

### File Structure

```
src/components/
├── BasicKeypad.vue           # Main component
├── BasicKeypad.spec.ts       # Unit tests
├── BasicKeypad.md            # Documentation
└── BasicKeypadExample.vue    # Usage example
```

## Browser Compatibility

- Modern browsers with CSS Grid support
- Vue 3.5+
- TypeScript support included
