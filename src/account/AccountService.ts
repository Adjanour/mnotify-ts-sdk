import type { HttpClient } from '../client/HttpClient';
import { isObject, isNumber, isString, validateRequired, ValidationError } from '../utils/validation';

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
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
}

/**
 * Validates balance response
 */
const validateBalanceResponse = (data: unknown): data is BalanceResponse => {
  if (!isObject(data)) return false;
  validateRequired(data, ['balance']);
  return isNumber(data.balance);
};

/**
 * Service for managing account operations with mNotify API
 */
export class AccountService {
  constructor(private readonly client: HttpClient) {}

  /**
   * Retrieves current account balance
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
    const response = await this.client.request<BalanceResponse>({
      method: 'GET',
      url: '/balance',
    });

    if (!validateBalanceResponse(response)) {
      throw new ValidationError('Invalid balance response format');
    }

    return response;
  }

  /**
   * Retrieves list of registered sender IDs
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
    const response = await this.client.request<SenderId[]>({
      method: 'GET',
      url: '/senders',
    });

    if (!Array.isArray(response)) {
      throw new ValidationError('Invalid sender IDs response format');
    }

    return response;
  }

  /**
   * Registers a new sender ID
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
  public async registerSenderId(name: string): Promise<{ status: string; message: string }> {
    const response = await this.client.request<{ status: string; message: string }>({
      method: 'POST',
      url: '/senders',
      data: { name },
    });

    if (!isObject(response)) {
      throw new ValidationError('Invalid sender ID registration response');
    }

    return response;
  }
}
