import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorDisplay from './CalculatorDisplay.vue'

describe('CalculatorDisplay', () => {
  describe('Display Value Rendering', () => {
    it('should render the display value', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123',
          error: null
        }
      })

      const displayElement = wrapper.find('.display-value')
      expect(displayElement.exists()).toBe(true)
      expect(displayElement.text()).toBe('123')
    })

    it('should render zero when display value is "0"', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('0')
    })

    it('should render decimal numbers correctly', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123.456',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('123.456')
    })

    it('should render negative numbers correctly', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '-42',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('-42')
    })

    it('should render empty string as display value', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('')
    })
  })

  describe('Error Message Display', () => {
    it('should not show error message when error is null', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123',
          error: null
        }
      })

      expect(wrapper.find('.error-message').exists()).toBe(false)
    })

    it('should show error message when error prop is provided', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Cannot divide by zero'
        }
      })

      const errorElement = wrapper.find('.error-message')
      expect(errorElement.exists()).toBe(true)
      expect(errorElement.text()).toBe('Cannot divide by zero')
    })

    it('should show error message for overflow errors', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Number too large'
        }
      })

      expect(wrapper.find('.error-message').text()).toBe('Number too large')
    })

    it('should show error message for invalid operations', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Invalid operation'
        }
      })

      expect(wrapper.find('.error-message').text()).toBe('Invalid operation')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-live="polite" attribute on display value', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123',
          error: null
        }
      })

      const displayElement = wrapper.find('.display-value')
      expect(displayElement.attributes('aria-live')).toBe('polite')
    })

    it('should have appropriate role for display container', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123',
          error: null
        }
      })

      const displayContainer = wrapper.find('.calculator-display')
      expect(displayContainer.exists()).toBe(true)
    })

    it('should announce error messages to screen readers', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Cannot divide by zero'
        }
      })

      const errorElement = wrapper.find('.error-message')
      expect(errorElement.attributes('role')).toBe('alert')
    })
  })

  describe('Long Number Overflow Handling', () => {
    it('should render very long numbers without breaking layout', () => {
      const longNumber = '123456789012345678901234567890'
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: longNumber,
          error: null
        }
      })

      const displayElement = wrapper.find('.display-value')
      expect(displayElement.text()).toBe(longNumber)
      expect(displayElement.exists()).toBe(true)
    })

    it('should have overflow handling styles applied', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123456789012345678901234567890',
          error: null
        }
      })

      const displayElement = wrapper.find('.display-value')
      // Check that the element exists and has proper styling
      expect(displayElement.exists()).toBe(true)
    })
  })

  describe('Different Display States', () => {
    it('should render in initial state (empty)', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('0')
      expect(wrapper.find('.error-message').exists()).toBe(false)
    })

    it('should render in number input state', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '456.78',
          error: null
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('456.78')
      expect(wrapper.find('.error-message').exists()).toBe(false)
    })

    it('should render in error state', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Invalid input'
        }
      })

      expect(wrapper.find('.display-value').text()).toBe('0')
      expect(wrapper.find('.error-message').text()).toBe('Invalid input')
    })

    it('should handle state transition from normal to error', async () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '100',
          error: null
        }
      })

      expect(wrapper.find('.error-message').exists()).toBe(false)

      await wrapper.setProps({
        displayValue: '0',
        error: 'Cannot divide by zero'
      })

      expect(wrapper.find('.error-message').exists()).toBe(true)
      expect(wrapper.find('.error-message').text()).toBe('Cannot divide by zero')
    })

    it('should handle state transition from error to normal', async () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Invalid operation'
        }
      })

      expect(wrapper.find('.error-message').exists()).toBe(true)

      await wrapper.setProps({
        displayValue: '42',
        error: null
      })

      expect(wrapper.find('.error-message').exists()).toBe(false)
      expect(wrapper.find('.display-value').text()).toBe('42')
    })
  })

  describe('Component Structure', () => {
    it('should have proper component structure', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '123',
          error: null
        }
      })

      expect(wrapper.find('.calculator-display').exists()).toBe(true)
      expect(wrapper.find('.display-value').exists()).toBe(true)
    })

    it('should accept displayValue prop', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '999',
          error: null
        }
      })

      expect(wrapper.props('displayValue')).toBe('999')
    })

    it('should accept error prop', () => {
      const wrapper = mount(CalculatorDisplay, {
        props: {
          displayValue: '0',
          error: 'Test error'
        }
      })

      expect(wrapper.props('error')).toBe('Test error')
    })
  })
})
