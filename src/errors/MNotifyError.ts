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

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MNotifyError);
    }
  }

  public withContext(context: MNotifyErrorContext): MNotifyError {
    const mergedContext = { ...this.context, ...context };
    const wrapped = new MNotifyError(
      this.message,
      this.statusCode,
      this.data,
      mergedContext,
      this.cause,
    );
    wrapped.stack = this.stack;
    return wrapped;
  }

  public static fromUnknown(
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

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
      context: this.context,
      cause:
        this.cause instanceof Error
          ? {
              name: this.cause.name,
              message: this.cause.message,
              stack: this.cause.stack,
            }
          : this.cause,
      stack: this.stack,
    };
  }
}
