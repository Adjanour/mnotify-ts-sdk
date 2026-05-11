/**
 * Railway-oriented programming primitives.
 *
 * Provides a `Result` type for representing success/failure without exceptions,
 * along with constructors (`ok`, `err`) and combinators (`tryCatch`, `tryCatchAsync`, `combine`).
 */

/** Represents the outcome of an operation that can succeed or fail. */
export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

/** A successful result containing a value. */
export interface Ok<T, E> {
	readonly success: true;
	readonly value: T;
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

/** A failed result containing an error. */
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

/** Creates a successful Result wrapping the given value. */
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

/** Creates a failed Result containing the given error. */
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
 * Wraps a synchronous function in try/catch, returning a Result.
 * If the function throws, the error handler is called to produce the error value.
 */
export function tryCatch<T, E = Error>(
	fn: () => T,
	errorHandler: (error: unknown) => E,
): Result<T, E> {
	try {
		return ok(fn());
	} catch (e) {
		return err(errorHandler(e));
	}
}

/**
 * Wraps an async function in try/catch, returning a Promise of a Result.
 * If the function throws or rejects, the error handler is called to produce the error value.
 */
export async function tryCatchAsync<T, E = Error>(
	fn: () => Promise<T>,
	errorHandler: (error: unknown) => E,
): Promise<Result<T, E>> {
	try {
		return ok(await fn());
	} catch (e) {
		return err(errorHandler(e));
	}
}

/**
 * Combines an array of Results into a single Result containing an array of values.
 * Returns the first error encountered, or an array of all values if all Results are Ok.
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
