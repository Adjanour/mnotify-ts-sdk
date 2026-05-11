import type { Result } from "./result.js";
import { err } from "./result.js";

export interface MNotifyErrorContext {
	service?: string;
	operation?: string;
	stage?: "request" | "validation" | "response" | "network";
	method?: string;
	path?: string;
	url?: string;
	retryCount?: number;
}

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

export function annotate<T>(
	result: Result<T, MNotifyError>,
	context: MNotifyErrorContext,
): Result<T, MNotifyError> {
	return result.mapErr((error) => error.withContext(context));
}

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
