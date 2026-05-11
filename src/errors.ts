/**
 * Error types and helpers for the mNotify SDK.
 *
 * Provides {@link MNotifyError}, a structured error class, along with
 * utility functions for annotating results with context and producing
 * validation-error results.
 */

import type { Result } from "./result.js";
import { err } from "./result.js";

/** Contextual metadata attached to an error for debugging and tracing. */
export interface MNotifyErrorContext {
	/** The service where the error occurred (e.g., "SMS", "Groups"). */
	service?: string;
	/** The operation being performed when the error occurred. */
	operation?: string;
	/** The stage of the request lifecycle where the error occurred. */
	stage?: "request" | "validation" | "response" | "network";
	/** The HTTP method used in the request. */
	method?: string;
	/** The API path that was called. */
	path?: string;
	/** The full URL that was requested (with API key redacted). */
	url?: string;
	/** The retry count at the time of the error. */
	retryCount?: number;
}

/** Structured error representing an mNotify API failure. */
export class MNotifyError extends Error {
	constructor(
		message: string,
		public readonly statusCode: number,
		public readonly data?: unknown,
		public readonly context?: MNotifyErrorContext,
		public readonly cause?: unknown,
	) {
		super(message);
		this.name = "MNotifyError";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, MNotifyError);
		}
	}

	/** Returns a new MNotifyError with merged context. */
	withContext(context: MNotifyErrorContext): MNotifyError {
		const err = new MNotifyError(
			this.message,
			this.statusCode,
			this.data,
			{ ...this.context, ...context },
			this.cause,
		);
		err.stack = this.stack;
		return err;
	}

	/**
	 * Creates an MNotifyError from an unknown value.
	 * Preserves the original error if it is already an MNotifyError.
	 */
	static fromUnknown(
		error: unknown,
		fallbackMessage: string,
		statusCode: number,
		context?: MNotifyErrorContext,
		data?: unknown,
	): MNotifyError {
		if (error instanceof MNotifyError) {
			return context ? error.withContext(context) : error;
		}
		if (error instanceof Error) {
			const wrapped = new MNotifyError(
				error.message || fallbackMessage,
				statusCode,
				data,
				context,
				error,
			);
			wrapped.stack = error.stack || wrapped.stack;
			return wrapped;
		}
		return new MNotifyError(fallbackMessage, statusCode, data, context, error);
	}

	toJSON(): Record<string, unknown> {
		return {
			name: this.name,
			message: this.message,
			statusCode: this.statusCode,
			data: this.data,
			context: this.context,
			cause:
				this.cause instanceof Error
					? { name: this.cause.name, message: this.cause.message, stack: this.cause.stack }
					: this.cause,
			stack: this.stack,
		};
	}
}

/** Attaches error context to a Result's error value if it is an Err. */
export function annotate<T>(
	result: Result<T, MNotifyError>,
	context: MNotifyErrorContext,
): Result<T, MNotifyError> {
	return result.mapErr((error) => error.withContext(context));
}

/** Returns an Err Result indicating an invalid response format from the API. */
export function invalidResponse<T>(
	entity: string,
	data: T,
	operation: string,
): Result<T, MNotifyError> {
	return err(
		new MNotifyError(`Invalid ${entity} response format`, 0, data, {
			stage: "validation" as const,
			operation,
		}),
	);
}
