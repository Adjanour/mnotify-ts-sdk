export class MNotifyError extends Error {
    constructor(
      message: string,
      public readonly statusCode: number,
      public readonly data?: unknown
    ) {
      super(message);
      this.name = 'MNotifyError';
      
      // Maintains proper stack trace for where our error was thrown
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, MNotifyError);
      }
    }
  
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        data: this.data,
        stack: this.stack
      };
    }
  }