import { MNotifyError } from '../errors/MNotifyError';
import { Result, ok, err } from '../types/Result';

export interface MNotifyConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: unknown;
  params?: Record<string, string>;
}

/**
 * Core HTTP client for mNotify API communication using native fetch
 *
 * @remarks
 * This class handles all low-level HTTP requests to the mNotify API,
 * including authentication, retries, and error handling.
 */
export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;

  /**
   * Creates a new HttpClient instance
   * @param config - Configuration object
   * @param config.apiKey - Your mNotify API key
   * @param config.baseUrl - Base API URL (default: 'https://api.mnotify.com/api')
   * @param config.timeout - Request timeout in ms (default: 10000)
   * @param config.maxRetries - Maximum retry attempts for failed requests (default: 3)
   */
  constructor(config: MNotifyConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.mnotify.com/api';
    this.timeout = config.timeout || 10000;
    this.maxRetries = config.maxRetries || 3;
  }

  /**
   * Makes an HTTP request to the mNotify API with Result type (railway-oriented programming)
   * @param config - Request configuration
   * @param retryCount - Current retry attempt (used internally)
   * @returns Promise with Result containing either the response data or an error
   *
   * @example
   * ```typescript
   * const client = new HttpClient({ apiKey: 'your-key' });
   * const result = await client.requestSafe<T>({
   *   method: 'GET',
   *   url: '/account/balance'
   * });
   * 
   * if (result.isOk()) {
   *   console.log(result.value);
   * } else {
   *   console.error(result.error);
   * }
   * ```
   */
  public async requestSafe<T>(
    config: RequestConfig,
    retryCount = 0
  ): Promise<Result<T, MNotifyError>> {
    const url = this.buildUrl(config.url, config.params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: config.method,
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle rate limiting with retry
        if (response.status === 429 && retryCount < this.maxRetries) {
          const retryAfter = parseInt(response.headers.get('retry-after') || '1') * 1000;
          await this.sleep(retryAfter);
          return this.requestSafe<T>(config, retryCount + 1);
        }

        const errorData = await response.json().catch(() => ({}));
        return err(new MNotifyError(
          errorData.message || response.statusText,
          response.status,
          errorData
        ));
      }

      const data = await response.json() as T;
      return ok(data);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof MNotifyError) {
        return err(error);
      }

      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        return err(new MNotifyError('Request timeout', 408));
      }

      // Handle network errors
      return err(new MNotifyError(
        error instanceof Error ? error.message : 'Network error',
        0
      ));
    }
  }

  /**
   * Makes an HTTP request to the mNotify API (throws on error - legacy API)
   * @param config - Request configuration
   * @param retryCount - Current retry attempt (used internally)
   * @returns Promise with the parsed response data
   * @throws {MNotifyError} When API returns an error response
   *
   * @example
   * ```typescript
   * const client = new HttpClient({ apiKey: 'your-key' });
   * const response = await client.request<T>({
   *   method: 'GET',
   *   url: '/account/balance'
   * });
   * ```
   */
  public async request<T>(
    config: RequestConfig,
    retryCount = 0
  ): Promise<T> {
    const result = await this.requestSafe<T>(config, retryCount);
    return result.unwrap();
  }

  /**
   * Builds the full URL with query parameters
   */
  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl);
    
    // Always add API key as query param
    url.searchParams.set('key', this.apiKey);
    
    // Add additional params if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  }

  /**
   * Sleep utility for retry logic
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
