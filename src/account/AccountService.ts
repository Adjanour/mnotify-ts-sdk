import type { HttpClient } from "../client/HttpClient";
import {
  isObject,
  isNumber,
  isString,
  validateRequired,
  ValidationError,
} from "../utils/validation";
import type { Result } from "../types/Result";
import { ok, err } from "../types/Result";
import { MNotifyError } from "../errors/MNotifyError";

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

/**
 * Validates balance response
 */
const validateBalanceResponse = (data: unknown): data is BalanceResponse => {
  if (!isObject(data)) return false;
  validateRequired(data, ["balance"]);
  return isNumber(data.balance);
};

/**
 * Service for managing account operations with mNotify API
 */
export class AccountService {
  constructor(private readonly client: HttpClient) {}

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
    const result = await this.client.requestSafe<BalanceResponse>({
      method: "GET",
      url: "/balance/sms",
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateBalanceResponse(result.value)) {
      return err(new MNotifyError("Invalid balance response format", 0));
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
    const result = await this.client.requestSafe<SenderId[]>({
      method: "GET",
      url: "/senders",
    });

    if (result.isErr()) {
      return result;
    }

    if (!Array.isArray(result.value)) {
      return err(new MNotifyError("Invalid sender IDs response format", 0));
    }

    return ok(result.value);
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
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = await this.client.requestSafe<{
      status: string;
      message: string;
    }>({
      method: "POST",
      url: "/senders",
      data: { name },
    });

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError("Invalid sender ID registration response", 0),
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
  ): Promise<{ status: string; message: string }> {
    const result = await this.registerSenderIdSafe(name);
    return result.unwrap();
  }
}
