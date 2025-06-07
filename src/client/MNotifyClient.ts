import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { MNotifyError } from '../errors/MNotifyError';

export interface MNotifyConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

/**
 * Core HTTP client for mNotify API communication
 *
 * @remarks
 * This class handles all low-level HTTP requests to the mNotify API,
 * including authentication, retries, and error handling.
 */
export class MNotifyClient {
		public readonly axiosInstance: AxiosInstance;
		private readonly maxRetries: number;
		/**
		 * Creates a new MNotifyClient instance
		 * @param config - Configuration object
		 * @param config.apiKey - Your mNotify API key
		 * @param config.baseUrl - Base API URL (default: 'https://api.mnotify.com/api')
		 * @param config.timeout - Request timeout in ms (default: 10000)
		 * @param config.maxRetries - Maximum retry attempts for failed requests (default: 3)
		 */
		constructor(config: MNotifyConfig) {
			this.maxRetries = config.maxRetries || 3;

			this.axiosInstance = axios.create({
				baseURL: config.baseUrl || "https://api.mnotify.com/api",
				timeout: config.timeout || 100000,
				headers: {
					Authorization: config.apiKey,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				params: { key: config.apiKey },
			});
		}

		/**
		 * Makes an HTTP request to the mNotify API
		 * @param config - Axios request configuration
		 * @param retryCount - Current retry attempt (used internally)
     * @param T - Type of the response data
		 * @returns Promise with the parsed response data
		 * @throws {MNotifyError} When API returns an error response
		 *
		 * @example
		 * ```typescript
		 * const client = new MNotifyClient({ apiKey: 'your-key' });
		 * const response = await client.request<T>({
		 *   method: 'GET',
		 *   url: '/account/balance'
		 * });
		 * ```
		 */
		public async request<T>(
			config: AxiosRequestConfig,
			retryCount = 0,
		): Promise<T> {
			try {
				const response: AxiosResponse = await this.axiosInstance(config);
				return response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 429 && retryCount < this.maxRetries) {
						const retryAfter =
							Number.parseInt(error.response.headers["retry-after"] || "1") *
							1000;
						await new Promise((resolve) => setTimeout(resolve, retryAfter));
						return this.request<T>(config, retryCount + 1);
					}

					throw new MNotifyError(
						error.response?.data?.message || error.message,
						error.response?.status || 500,
						error.response?.data,
					);
				}
				throw error;
			}
		}
	}