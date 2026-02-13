import type { Result } from "../types/Result";
import { MNotifyError, type MNotifyErrorContext } from "./MNotifyError";

export function annotateResultError<T>(
  result: Result<T, MNotifyError>,
  context: MNotifyErrorContext,
): Result<T, MNotifyError> {
  return result.mapErr((error) => error.withContext(context));
}

export function validationError(
  message: string,
  context: MNotifyErrorContext,
  cause?: unknown,
): MNotifyError {
  return MNotifyError.fromUnknown(cause, message, 0, context);
}
