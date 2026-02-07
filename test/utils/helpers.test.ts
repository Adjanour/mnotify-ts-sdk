import {
  toArray,
  normalizePhone,
  isValidPhone,
  chunk,
  compact,
  pick,
  omit,
} from '../../src/utils/helpers';

describe('Helper Utilities', () => {
  describe('toArray', () => {
    it('should convert a single value to an array', () => {
      expect(toArray('hello')).toEqual(['hello']);
      expect(toArray(42)).toEqual([42]);
    });

    it('should return array as is', () => {
      const arr = ['a', 'b', 'c'];
      expect(toArray(arr)).toEqual(arr);
    });
  });

  describe('normalizePhone', () => {
    it('should remove non-digit characters', () => {
      expect(normalizePhone('+233-20-000-0000')).toBe('233200000000');
      expect(normalizePhone('(233) 20 000 0000')).toBe('233200000000');
    });

    it('should replace leading 0 with country code', () => {
      expect(normalizePhone('0200000000')).toBe('233200000000');
    });

    it('should keep international format', () => {
      expect(normalizePhone('233200000000')).toBe('233200000000');
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhone('233200000000')).toBe(true);
      expect(isValidPhone('0200000000')).toBe(true);
      expect(isValidPhone('+233200000000')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('compact', () => {
    it('should remove null and undefined values', () => {
      const obj = {
        a: 1,
        b: null,
        c: undefined,
        d: 'hello',
        e: 0,
        f: false,
      };
      expect(compact(obj)).toEqual({
        a: 1,
        d: 'hello',
        e: 0,
        f: false,
      });
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, ['a', 'c' as keyof typeof obj])).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      expect(omit(obj, ['c' as keyof typeof obj])).toEqual({ a: 1, b: 2 });
    });
  });
});
