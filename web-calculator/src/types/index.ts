/**
 * Type definitions for the Web Calculator application
 *
 * This module provides comprehensive type definitions for calculator state management,
 * operations, and error handling for basic arithmetic operations (+, -, *, /).
 */

/**
 * Valid arithmetic operators supported by the calculator
 * Using string literal union for erasableSyntaxOnly compatibility
 */
export type Operator = '+' | '-' | '*' | '/';

/**
 * Type alias for operator values
 * Allows for type-safe operator checking
 */
export type OperatorType = Operator | null;

/**
 * Constants for each operator type
 * Provides named constants for better code readability
 */
export const OperatorSymbols = {
  ADD: '+' as const,
  SUBTRACT: '-' as const,
  MULTIPLY: '*' as const,
  DIVIDE: '/' as const
} as const;

/**
 * Error types that can occur during calculator operations
 * Using const object for erasableSyntaxOnly compatibility
 */
export const CalculatorError = {
  /** Attempted division by zero */
  DIVISION_BY_ZERO: 'Cannot divide by zero',
  /** Invalid mathematical operation */
  INVALID_OPERATION: 'Invalid operation',
  /** Number exceeds maximum safe integer */
  OVERFLOW: 'Number too large',
  /** Invalid input provided */
  INVALID_INPUT: 'Invalid input'
} as const;

/**
 * Type representing all possible calculator error messages
 */
export type CalculatorErrorType = typeof CalculatorError[keyof typeof CalculatorError];

/**
 * Main state interface for the calculator
 *
 * This interface represents the complete state of the calculator at any given moment,
 * tracking the display value, stored operand, current operator, and input state.
 *
 * @example
 * ```typescript
 * const initialState: CalculatorState = {
 *   displayValue: '0',
 *   currentOperand: null,
 *   operator: null,
 *   waitingForOperand: false,
 *   error: null
 * };
 * ```
 */
export interface CalculatorState {
  /**
   * The current value displayed on the calculator screen
   * Represented as a string to preserve decimal formatting and leading zeros
   */
  displayValue: string;

  /**
   * The stored operand from a previous operation
   * Null when no operation is in progress
   */
  currentOperand: number | null;

  /**
   * The current arithmetic operator selected
   * Null when no operator has been selected
   */
  operator: OperatorType;

  /**
   * Flag indicating whether the calculator is waiting for a new operand
   * True after an operator is pressed, false during number entry
   * This determines whether the next digit starts a new number or appends to the current one
   */
  waitingForOperand: boolean;

  /**
   * Error message if an error has occurred
   * Null when no error is present
   */
  error: string | null;
}

/**
 * Array of all valid operators for runtime validation
 */
const VALID_OPERATORS: readonly Operator[] = ['+', '-', '*', '/'] as const;

/**
 * Type guard to check if a string is a valid operator
 *
 * @param value - The string to check
 * @returns True if the value is a valid operator
 *
 * @example
 * ```typescript
 * if (isOperator('+')) {
 *   // Handle operator
 * }
 * ```
 */
export function isOperator(value: string): value is Operator {
  return VALID_OPERATORS.includes(value as Operator);
}

/**
 * Helper type for calculator button values
 * Represents all possible values that can be input via calculator buttons
 */
export type ButtonValue =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '.'
  | Operator
  | 'C' // Clear
  | '=' // Equals
  | 'CE'; // Clear Entry

/**
 * Type for calculator action handlers
 * Used to enforce consistent function signatures for calculator operations
 */
export interface CalculatorActions {
  /** Input a digit (0-9) */
  inputDigit: (digit: string) => void;
  /** Input a decimal point */
  inputDecimal: () => void;
  /** Clear all state */
  clear: () => void;
  /** Clear current entry */
  clearEntry: () => void;
  /** Perform an arithmetic operation */
  performOperation: (nextOperator: Operator) => void;
  /** Calculate and display the result */
  calculate: () => void;
}

/**
 * Configuration options for calculator behavior
 */
export interface CalculatorConfig {
  /** Maximum number of decimal places to display */
  maxDecimalPlaces?: number;
  /** Maximum value before overflow error */
  maxValue?: number;
  /** Minimum value before underflow */
  minValue?: number;
}
