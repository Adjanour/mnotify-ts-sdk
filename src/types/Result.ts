/**
 * Railway-oriented programming Result type for functional error handling
 * 
 * This type represents the result of an operation that can either succeed with a value
 * or fail with an error, following the principles of railway-oriented programming
 * inspired by Rust's Result<T, E> type.
 * 
 * @template T - The type of the success value
 * @template E - The type of the error value (defaults to Error)
 * 
 * @example
 * ```typescript
 * // Success case
 * const success: Result<number> = ok(42);
 * 
 * // Error case
 * const failure: Result<number> = err(new Error('Something went wrong'));
 * 
 * // Pattern matching
 * const value = success.match({
 *   ok: (value) => value * 2,
 *   err: (error) => 0
 * });
 * ```
 */
export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

/**
 * Success variant of Result
 */
export interface Ok<T, E> {
  readonly success: true;
  readonly value: T;
  
  /**
   * Returns true if the result is Ok
   */
  isOk(): this is Ok<T, E>;
  
  /**
   * Returns true if the result is Err
   */
  isErr(): this is Err<T, E>;
  
  /**
   * Maps the Ok value to a new value
   */
  map<U>(fn: (value: T) => U): Result<U, E>;
  
  /**
   * Maps the error value (no-op for Ok)
   */
  mapErr<F>(fn: (error: E) => F): Result<T, F>;
  
  /**
   * Chains another Result-returning operation
   */
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
  
  /**
   * Returns the Ok value or throws the Err
   */
  unwrap(): T;
  
  /**
   * Returns the Ok value or a default value
   */
  unwrapOr(defaultValue: T): T;
  
  /**
   * Returns the Ok value or computes it from a function
   */
  unwrapOrElse(fn: (error: E) => T): T;
  
  /**
   * Pattern match on the Result
   */
  match<U>(matcher: { ok: (value: T) => U; err: (error: E) => U }): U;
}

/**
 * Error variant of Result
 */
export interface Err<T, E> {
  readonly success: false;
  readonly error: E;
  
  isOk(): this is Ok<T, E>;
  isErr(): this is Err<T, E>;
  map<U>(fn: (value: T) => U): Result<U, E>;
  mapErr<F>(fn: (error: E) => F): Result<T, F>;
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
  unwrapOrElse(fn: (error: E) => T): T;
  match<U>(matcher: { ok: (value: T) => U; err: (error: E) => U }): U;
}

/**
 * Creates a successful Result
 */
export function ok<T, E = Error>(value: T): Result<T, E> {
  return {
    success: true,
    value,
    isOk(): this is Ok<T, E> {
      return true;
    },
    isErr(): this is Err<T, E> {
      return false;
    },
    map<U>(fn: (value: T) => U): Result<U, E> {
      return ok(fn(value));
    },
    mapErr<F>(_fn: (error: E) => F): Result<T, F> {
      return ok(value);
    },
    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
      return fn(value);
    },
    unwrap(): T {
      return value;
    },
    unwrapOr(_defaultValue: T): T {
      return value;
    },
    unwrapOrElse(_fn: (error: E) => T): T {
      return value;
    },
    match<U>(matcher: { ok: (value: T) => U; err: (error: E) => U }): U {
      return matcher.ok(value);
    },
  };
}

/**
 * Creates an error Result
 */
export function err<T, E = Error>(error: E): Result<T, E> {
  return {
    success: false,
    error,
    isOk(): this is Ok<T, E> {
      return false;
    },
    isErr(): this is Err<T, E> {
      return true;
    },
    map<U>(_fn: (value: T) => U): Result<U, E> {
      return err(error);
    },
    mapErr<F>(fn: (error: E) => F): Result<T, F> {
      return err(fn(error));
    },
    andThen<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
      return err(error);
    },
    unwrap(): T {
      throw error;
    },
    unwrapOr(defaultValue: T): T {
      return defaultValue;
    },
    unwrapOrElse(fn: (error: E) => T): T {
      return fn(error);
    },
    match<U>(matcher: { ok: (value: T) => U; err: (error: E) => U }): U {
      return matcher.err(error);
    },
  };
}

/**
 * Wraps a function that might throw in a Result
 */
export function tryCatch<T, E = Error>(
  fn: () => T,
  errorHandler?: (error: unknown) => E
): Result<T, E> {
  try {
    return ok(fn());
  } catch (error) {
    const mappedError = errorHandler 
      ? errorHandler(error) 
      : (error as E);
    return err(mappedError);
  }
}

/**
 * Wraps an async function that might throw in a Result
 */
export async function tryCatchAsync<T, E = Error>(
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const value = await fn();
    return ok(value);
  } catch (error) {
    const mappedError = errorHandler 
      ? errorHandler(error) 
      : (error as E);
    return err(mappedError);
  }
}

/**
 * Combines multiple Results into a single Result
 * Returns Ok with array of values if all are Ok, or the first Err encountered
 */
export function combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  
  for (const result of results) {
    if (result.isErr()) {
      return err(result.error);
    }
    values.push(result.value);
  }
  
  return ok(values);
}
