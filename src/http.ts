import { MNotifyError } from "./errors.js";
import type { Result } from "./result.js";
import { err, ok } from "./result.js";
import type { MNotifyConfig } from "./types.js";

export interface RequestConfig {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	url: string;
	data?: unknown;
	params?: Record<string, string>;
}

export class HttpClient {
	private readonly apiKey: string;
	private readonly baseUrl: string;
	private readonly timeout: number;
	private readonly maxRetries: number;

	constructor(config: MNotifyConfig) {
		this.apiKey = config.apiKey;
		this.baseUrl = config.baseUrl || "https://api.mnotify.com/api";
		this.timeout = config.timeout || 10000;
		this.maxRetries = config.maxRetries || 3;
	}

	async request<T>(config: RequestConfig, retryCount = 0): Promise<Result<T, MNotifyError>> {
		const url = this.buildUrl(config.url, config.params);
		const requestContext = {
			service: "HttpClient" as const,
			operation: "request" as const,
			stage: "request" as const,
			method: config.method,
			path: config.url,
			url: this.redactUrl(url),
			retryCount,
		};
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url, {
				method: config.method,
				headers: {
					Authorization: this.apiKey,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: config.data ? JSON.stringify(config.data) : undefined,
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				if (response.status === 429 && retryCount < this.maxRetries) {
					const retryAfter = Number.parseInt(response.headers.get("retry-after") || "1") * 1000;
					await this.sleep(retryAfter);
					return this.request<T>(config, retryCount + 1);
				}

				const errorData = await response.json().catch(() => ({}));
				return err(
					new MNotifyError(errorData.message || response.statusText, response.status, errorData, {
						...requestContext,
						stage: "response",
					}),
				);
			}

			const data = (await response.json()) as T;
			return ok(data);
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof MNotifyError) {
				return err(error.withContext({ ...requestContext, stage: "network" }));
			}

			if (error instanceof Error && error.name === "AbortError") {
				return err(
					MNotifyError.fromUnknown(error, "Request timeout", 408, {
						...requestContext,
						stage: "network",
					}),
				);
			}

			return err(
				MNotifyError.fromUnknown(error, "Network error", 0, {
					...requestContext,
					stage: "network",
				}),
			);
		}
	}

	private buildUrl(path: string, params?: Record<string, string>): string {
		const base = this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`;
		const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
		const url = new URL(normalizedPath, base);
		url.searchParams.set("key", this.apiKey);
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				url.searchParams.set(key, value);
			}
		}
		return url.toString();
	}

	private redactUrl(rawUrl: string): string {
		try {
			const url = new URL(rawUrl);
			if (url.searchParams.has("key")) {
				url.searchParams.set("key", "***");
			}
			return url.toString();
		} catch {
			return rawUrl;
		}
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
