import type { Operator } from '@/types';
import { CalculatorError, isOperator } from '@/types';

/**
 * CalculatorService
 *
 * Provides static methods for performing basic arithmetic calculations.
 * Supports addition, subtraction, multiplication, and division operations
 * with comprehensive error handling and input validation.
 *
 * @example
 * ```typescript
 * const result = CalculatorService.calculate(10, '+', 5); // 15
 * const quotient = CalculatorService.calculate(20, '/', 4); // 5
 * ```
 */
export class CalculatorService {
  /**
   * Performs a calculation with two operands and an operator.
   *
   * This method handles all basic arithmetic operations with proper
   * error handling for edge cases such as division by zero, invalid
   * inputs, and overflow conditions.
   *
   * @param operand1 - The first operand (left side of the operation)
   * @param operator - The arithmetic operator (+, -, *, /)
   * @param operand2 - The second operand (right side of the operation)
   * @returns The result of the calculation
   *
   * @throws {Error} When dividing by zero (DIVISION_BY_ZERO)
   * @throws {Error} When operator is invalid (INVALID_OPERATION)
   * @throws {Error} When operands are invalid (INVALID_INPUT)
   *
   * @example
   * ```typescript
   * // Basic operations
   * CalculatorService.calculate(5, '+', 3);  // 8
   * CalculatorService.calculate(10, '-', 7); // 3
   * CalculatorService.calculate(4, '*', 5);  // 20
   * CalculatorService.calculate(15, '/', 3); // 5
   *
   * // Error cases
   * CalculatorService.calculate(5, '/', 0);  // throws Error: Cannot divide by zero
   * CalculatorService.calculate(NaN, '+', 5); // throws Error: Invalid input
   * ```
   */
  static calculate(operand1: number, operator: Operator, operand2: number): number {
    // Validate inputs
    this.validateInputs(operand1, operand2, operator);

    // Perform the calculation based on the operator
    let result: number;

    switch (operator) {
      case '+':
        result = this.add(operand1, operand2);
        break;
      case '-':
        result = this.subtract(operand1, operand2);
        break;
      case '*':
        result = this.multiply(operand1, operand2);
        break;
      case '/':
        result = this.divide(operand1, operand2);
        break;
      default:
        // This should never happen due to type checking, but we handle it for runtime safety
        throw new Error(CalculatorError.INVALID_OPERATION);
    }

    return result;
  }

  /**
   * Validates input operands and operator.
   *
   * @param operand1 - The first operand to validate
   * @param operand2 - The second operand to validate
   * @param operator - The operator to validate
   * @throws {Error} When any input is invalid
   *
   * @private
   */
  private static validateInputs(operand1: number, operand2: number, operator: Operator): void {
    // Check if operands are numbers (not null, undefined, or NaN)
    if (
      typeof operand1 !== 'number' ||
      typeof operand2 !== 'number' ||
      operand1 === null ||
      operand2 === null
    ) {
      throw new Error(CalculatorError.INVALID_INPUT);
    }

    // Check for NaN specifically (NaN !== NaN in JavaScript)
    if (Number.isNaN(operand1) || Number.isNaN(operand2)) {
      throw new Error(CalculatorError.INVALID_INPUT);
    }

    // Validate operator
    if (!isOperator(operator)) {
      throw new Error(CalculatorError.INVALID_OPERATION);
    }
  }

  /**
   * Adds two numbers.
   *
   * @param a - First operand
   * @param b - Second operand
   * @returns Sum of a and b
   *
   * @private
   */
  private static add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts the second number from the first.
   *
   * @param a - First operand (minuend)
   * @param b - Second operand (subtrahend)
   * @returns Difference of a and b
   *
   * @private
   */
  private static subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers.
   *
   * @param a - First operand
   * @param b - Second operand
   * @returns Product of a and b
   *
   * @private
   */
  private static multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides the first number by the second.
   *
   * @param a - First operand (dividend)
   * @param b - Second operand (divisor)
   * @returns Quotient of a and b
   * @throws {Error} When attempting to divide by zero
   *
   * @private
   */
  private static divide(a: number, b: number): number {
    // Check for division by zero
    if (b === 0) {
      throw new Error(CalculatorError.DIVISION_BY_ZERO);
    }

    return a / b;
  }
}
