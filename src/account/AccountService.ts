import type { HttpClient } from "../client/HttpClient";
import { isObject, isNumber, hasRequiredFields } from "../utils/validation";
import type { Result } from "../types/Result";
import { ok, err } from "../types/Result";
import { MNotifyError } from "../errors/MNotifyError";
import { annotateResultError } from "../errors/errorContext";

/**
 * Account balance response
 */
export interface BalanceResponse {
  balance: number;
  currency: string;
}

/**
 * Sender ID information
 */
export interface SenderId {
  id: string;
  name: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
}

export interface SenderIdStatus {
  status: string;
  message?: string;
  sender_name?: string;
  approval_status?: string;
}

/**
 * Validates balance response
 */
const validateBalanceResponse = (data: unknown): data is BalanceResponse => {
  if (!isObject(data)) return false;
  if (!hasRequiredFields(data, ["balance"])) {
    return false;
  }
  return isNumber(data.balance);
};

/**
 * Service for managing account operations with mNotify API
 */
export class AccountService {
  constructor(private readonly client: HttpClient) {}

  private annotate<T>(
    result: Result<T, MNotifyError>,
    operation: string,
  ): Result<T, MNotifyError> {
    return annotateResultError(result, {
      service: "AccountService",
      operation,
    });
  }

  /**
   * Retrieves current account balance (railway-oriented programming)
   * @returns Result containing balance information or error
   *
   * @example
   * ```typescript
   * const result = await accountService.getBalanceSafe();
   * result.match({
   *   ok: (balance) => console.log(`Balance: ${balance.balance} ${balance.currency}`),
   *   err: (error) => console.error('Failed to get balance:', error)
   * });
   * ```
   */
  public async getBalanceSafe(): Promise<
    Result<BalanceResponse, MNotifyError>
  > {
    const result = this.annotate(
      await this.client.requestSafe<BalanceResponse>({
        method: "GET",
        url: "/balance/sms",
      }),
      "getBalanceSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!validateBalanceResponse(result.value)) {
      return err(
        new MNotifyError("Invalid balance response format", 0, result.value, {
          service: "AccountService",
          operation: "getBalanceSafe",
          stage: "validation",
        }),
      );
    }

    return ok(result.value);
  }

  /**
   * Retrieves current account balance (throws on error - legacy API)
   * @returns Account balance information
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const balance = await accountService.getBalance();
   * console.log(`Balance: ${balance.balance} ${balance.currency}`);
   * ```
   */
  public async getBalance(): Promise<BalanceResponse> {
    const result = await this.getBalanceSafe();
    return result.unwrap();
  }

  /**
   * Retrieves list of registered sender IDs (railway-oriented programming)
   * @returns Result containing array of sender IDs or error
   *
   * @example
   * ```typescript
   * const result = await accountService.getSenderIdsSafe();
   * if (result.isOk()) {
   *   console.log('Available sender IDs:', result.value);
   * }
   * ```
   */
  public async getSenderIdsSafe(): Promise<Result<SenderId[], MNotifyError>> {
    return err(
      new MNotifyError(
        "mNotify v2 does not provide a sender list endpoint. Use checkSenderIdStatusSafe(senderName).",
        400,
        undefined,
        {
          service: "AccountService",
          operation: "getSenderIdsSafe",
          stage: "validation",
          path: "/senderid/status",
        },
      ),
    );
  }

  /**
   * Retrieves list of registered sender IDs (throws on error - legacy API)
   * @returns Array of sender IDs
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const senderIds = await accountService.getSenderIds();
   * console.log('Available sender IDs:', senderIds);
   * ```
   */
  public async getSenderIds(): Promise<SenderId[]> {
    const result = await this.getSenderIdsSafe();
    return result.unwrap();
  }

  /**
   * Registers a new sender ID (railway-oriented programming)
   * @param name - Sender ID name to register
   * @returns Result containing registration response or error
   *
   * @example
   * ```typescript
   * const result = await accountService.registerSenderIdSafe('MyApp');
   * result.match({
   *   ok: (res) => console.log('Sender ID registered:', res),
   *   err: (error) => console.error('Registration failed:', error)
   * });
   * ```
   */
  public async registerSenderIdSafe(
    name: string,
    purpose: string[] = ["general"],
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<{
        status: string;
        message: string;
      }>({
        method: "POST",
        url: "/senderid/register",
        data: {
          sender_name: name,
          purpose,
        },
      }),
      "registerSenderIdSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError(
          "Invalid sender ID registration response",
          0,
          result.value,
          {
            service: "AccountService",
            operation: "registerSenderIdSafe",
            stage: "validation",
          },
        ),
      );
    }

    return ok(result.value);
  }

  /**
   * Registers a new sender ID (throws on error - legacy API)
   * @param name - Sender ID name to register
   * @returns Registration response
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const result = await accountService.registerSenderId('MyApp');
   * console.log('Sender ID registered:', result);
   * ```
   */
  public async registerSenderId(
    name: string,
    purpose: string[] = ["general"],
  ): Promise<{ status: string; message: string }> {
    const result = await this.registerSenderIdSafe(name, purpose);
    return result.unwrap();
  }

  /**
   * Checks sender ID approval status (railway-oriented programming)
   * @param name - Sender ID name
   * @returns Result containing sender status response or error
   */
  public async checkSenderIdStatusSafe(
    name: string,
  ): Promise<Result<SenderIdStatus, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<SenderIdStatus>({
        method: "POST",
        url: "/senderid/status",
        data: {
          sender_name: name,
        },
      }),
      "checkSenderIdStatusSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError("Invalid sender ID status response", 0, result.value, {
          service: "AccountService",
          operation: "checkSenderIdStatusSafe",
          stage: "validation",
        }),
      );
    }

    return ok(result.value);
  }

  /**
   * Checks sender ID approval status (throws on error - legacy API)
   * @param name - Sender ID name
   * @returns Sender status response
   */
  public async checkSenderIdStatus(name: string): Promise<SenderIdStatus> {
    const result = await this.checkSenderIdStatusSafe(name);
    return result.unwrap();
  }
}
