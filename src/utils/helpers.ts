/**
 * Functional programming utilities for the SDK
 * Pure functions for common operations
 */

/**
 * Pipes functions from left to right (first to last)
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T): T =>
  fns.reduce((acc, fn) => fn(acc), value);

/**
 * Retries a function with exponential backoff
 * @param fn - Async function to retry
 * @param maxRetries - Maximum number of retries
 * @param delay - Initial delay in milliseconds
 * @returns Promise that resolves with the function result
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries) {
        throw error instanceof Error ? error : new Error(String(error));
      }
      await sleep(delay * Math.pow(2, i)); // Exponential backoff
    }
  }
  
  // This line should never be reached, but TypeScript requires a return
  throw new Error('Retry failed');
};

/**
 * Sleep utility
 * @param ms - Milliseconds to sleep
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Safely parses JSON with a fallback value
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Converts a value to an array if it isn't already
 * @param value - Value to convert
 * @returns Array
 */
export const toArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

/**
 * Picks specific keys from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only the specified keys
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> =>
  keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);

/**
 * Omits specific keys from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without the specified keys
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

/**
 * Filters out null and undefined values from an object
 * @param obj - Source object
 * @returns New object without null/undefined values
 */
export const compact = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      (acc as Record<string, unknown>)[key] = value;
    }
    return acc;
  }, {} as Partial<T>);

/**
 * Validates and normalizes phone numbers
 * @param phone - Phone number to normalize
 * @returns Normalized phone number
 */
export const normalizePhone = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with country code (233 for Ghana)
  if (digits.startsWith('0')) {
    return '233' + digits.slice(1);
  }
  
  return digits;
};

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns True if valid
 */
export const isValidPhone = (phone: string): boolean => {
  const normalized = normalizePhone(phone);
  // Should be at least 10 digits
  return /^\d{10,15}$/.test(normalized);
};

/**
 * Chunks an array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
