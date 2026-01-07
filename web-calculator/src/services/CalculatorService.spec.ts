import { describe, it, expect } from 'vitest';
import { CalculatorService } from './CalculatorService';
import { CalculatorError } from '@/types';

describe('CalculatorService', () => {
  describe('Addition (+)', () => {
    it('should add two positive numbers', () => {
      const result = CalculatorService.calculate(5, '+', 3);
      expect(result).toBe(8);
    });

    it('should add two negative numbers', () => {
      const result = CalculatorService.calculate(-5, '+', -3);
      expect(result).toBe(-8);
    });

    it('should add positive and negative numbers', () => {
      const result = CalculatorService.calculate(10, '+', -7);
      expect(result).toBe(3);
    });

    it('should add decimal numbers', () => {
      const result = CalculatorService.calculate(2.5, '+', 3.7);
      expect(result).toBeCloseTo(6.2);
    });

    it('should handle adding zero', () => {
      const result = CalculatorService.calculate(5, '+', 0);
      expect(result).toBe(5);
    });

    it('should handle very large numbers', () => {
      const result = CalculatorService.calculate(1e15, '+', 1e15);
      expect(result).toBe(2e15);
    });
  });

  describe('Subtraction (-)', () => {
    it('should subtract two positive numbers', () => {
      const result = CalculatorService.calculate(10, '-', 3);
      expect(result).toBe(7);
    });

    it('should subtract two negative numbers', () => {
      const result = CalculatorService.calculate(-5, '-', -3);
      expect(result).toBe(-2);
    });

    it('should subtract resulting in negative number', () => {
      const result = CalculatorService.calculate(3, '-', 10);
      expect(result).toBe(-7);
    });

    it('should subtract decimal numbers', () => {
      const result = CalculatorService.calculate(5.5, '-', 2.3);
      expect(result).toBeCloseTo(3.2);
    });

    it('should handle subtracting zero', () => {
      const result = CalculatorService.calculate(5, '-', 0);
      expect(result).toBe(5);
    });

    it('should handle subtracting from zero', () => {
      const result = CalculatorService.calculate(0, '-', 5);
      expect(result).toBe(-5);
    });
  });

  describe('Multiplication (*)', () => {
    it('should multiply two positive numbers', () => {
      const result = CalculatorService.calculate(5, '*', 3);
      expect(result).toBe(15);
    });

    it('should multiply two negative numbers', () => {
      const result = CalculatorService.calculate(-5, '*', -3);
      expect(result).toBe(15);
    });

    it('should multiply positive and negative numbers', () => {
      const result = CalculatorService.calculate(5, '*', -3);
      expect(result).toBe(-15);
    });

    it('should multiply decimal numbers', () => {
      const result = CalculatorService.calculate(2.5, '*', 4);
      expect(result).toBe(10);
    });

    it('should multiply by zero', () => {
      const result = CalculatorService.calculate(5, '*', 0);
      expect(result).toBe(0);
    });

    it('should multiply by one', () => {
      const result = CalculatorService.calculate(5, '*', 1);
      expect(result).toBe(5);
    });

    it('should handle very large number multiplication', () => {
      const result = CalculatorService.calculate(1e10, '*', 1e5);
      expect(result).toBe(1e15);
    });
  });

  describe('Division (/)', () => {
    it('should divide two positive numbers', () => {
      const result = CalculatorService.calculate(15, '/', 3);
      expect(result).toBe(5);
    });

    it('should divide two negative numbers', () => {
      const result = CalculatorService.calculate(-15, '/', -3);
      expect(result).toBe(5);
    });

    it('should divide positive by negative', () => {
      const result = CalculatorService.calculate(15, '/', -3);
      expect(result).toBe(-5);
    });

    it('should divide resulting in decimal', () => {
      const result = CalculatorService.calculate(5, '/', 2);
      expect(result).toBe(2.5);
    });

    it('should divide zero by number', () => {
      const result = CalculatorService.calculate(0, '/', 5);
      expect(result).toBe(0);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => CalculatorService.calculate(5, '/', 0)).toThrow(
        CalculatorError.DIVISION_BY_ZERO
      );
    });

    it('should throw error when dividing zero by zero', () => {
      expect(() => CalculatorService.calculate(0, '/', 0)).toThrow(
        CalculatorError.DIVISION_BY_ZERO
      );
    });

    it('should handle decimal division', () => {
      const result = CalculatorService.calculate(7.5, '/', 2.5);
      expect(result).toBe(3);
    });

    it('should handle very small division results', () => {
      const result = CalculatorService.calculate(1, '/', 3);
      expect(result).toBeCloseTo(0.3333333333333333);
    });
  });

  describe('Edge Cases', () => {
    it('should handle floating point precision issues', () => {
      const result = CalculatorService.calculate(0.1, '+', 0.2);
      expect(result).toBeCloseTo(0.3);
    });

    it('should handle negative zero', () => {
      const result = CalculatorService.calculate(-0, '+', 0);
      expect(result).toBe(0);
    });

    it('should handle very small numbers', () => {
      const result = CalculatorService.calculate(1e-10, '+', 2e-10);
      expect(result).toBeCloseTo(3e-10);
    });

    it('should detect overflow for very large additions', () => {
      const result = CalculatorService.calculate(Number.MAX_SAFE_INTEGER, '+', 1);
      expect(() => {
        if (!Number.isSafeInteger(result)) {
          throw new Error(CalculatorError.OVERFLOW);
        }
      }).toThrow(CalculatorError.OVERFLOW);
    });

    it('should handle Infinity from division', () => {
      const result = CalculatorService.calculate(Number.MAX_VALUE, '*', 2);
      expect(result).toBe(Infinity);
    });
  });

  describe('Input Validation', () => {
    it('should throw error for invalid operator', () => {
      expect(() => CalculatorService.calculate(5, '%' as any, 3)).toThrow(
        CalculatorError.INVALID_OPERATION
      );
    });

    it('should throw error for NaN operand1', () => {
      expect(() => CalculatorService.calculate(NaN, '+', 3)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should throw error for NaN operand2', () => {
      expect(() => CalculatorService.calculate(5, '+', NaN)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should throw error for undefined operand1', () => {
      expect(() => CalculatorService.calculate(undefined as any, '+', 3)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should throw error for undefined operand2', () => {
      expect(() => CalculatorService.calculate(5, '+', undefined as any)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should throw error for null operand1', () => {
      expect(() => CalculatorService.calculate(null as any, '+', 3)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should throw error for null operand2', () => {
      expect(() => CalculatorService.calculate(5, '+', null as any)).toThrow(
        CalculatorError.INVALID_INPUT
      );
    });

    it('should accept Infinity as valid input', () => {
      const result = CalculatorService.calculate(Infinity, '+', 5);
      expect(result).toBe(Infinity);
    });

    it('should accept -Infinity as valid input', () => {
      const result = CalculatorService.calculate(-Infinity, '+', 5);
      expect(result).toBe(-Infinity);
    });
  });

  describe('Mathematical Properties', () => {
    it('should demonstrate commutative property of addition', () => {
      const result1 = CalculatorService.calculate(5, '+', 3);
      const result2 = CalculatorService.calculate(3, '+', 5);
      expect(result1).toBe(result2);
    });

    it('should demonstrate commutative property of multiplication', () => {
      const result1 = CalculatorService.calculate(5, '*', 3);
      const result2 = CalculatorService.calculate(3, '*', 5);
      expect(result1).toBe(result2);
    });

    it('should demonstrate associative property with addition', () => {
      // (5 + 3) + 2 = 10
      const step1 = CalculatorService.calculate(5, '+', 3);
      const result1 = CalculatorService.calculate(step1, '+', 2);

      // 5 + (3 + 2) = 10
      const step2 = CalculatorService.calculate(3, '+', 2);
      const result2 = CalculatorService.calculate(5, '+', step2);

      expect(result1).toBe(result2);
    });

    it('should handle identity element for addition (zero)', () => {
      expect(CalculatorService.calculate(42, '+', 0)).toBe(42);
      expect(CalculatorService.calculate(0, '+', 42)).toBe(42);
    });

    it('should handle identity element for multiplication (one)', () => {
      expect(CalculatorService.calculate(42, '*', 1)).toBe(42);
      expect(CalculatorService.calculate(1, '*', 42)).toBe(42);
    });

    it('should handle absorbing element for multiplication (zero)', () => {
      expect(CalculatorService.calculate(42, '*', 0)).toBe(0);
      expect(CalculatorService.calculate(0, '*', 42)).toBe(0);
    });
  });
});
