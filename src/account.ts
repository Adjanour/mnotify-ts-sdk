/**
 * Account service.
 *
 * Provides methods for checking account balance, registering sender IDs,
 * and checking sender ID approval status.
 */

import { annotate, invalidResponse } from "./errors.js";
import type { MNotifyError } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { ok } from "./result.js";
import type { BalanceResponse, SenderIdStatus } from "./types.js";

/** Account-related operations: balance and sender ID management. */
export class Account {
	constructor(private readonly client: HttpClient) {}

	/** Fetches the current account balance. */
	async getBalance(): Promise<Result<BalanceResponse, MNotifyError>> {
		const result = annotate(
			await this.client.request<BalanceResponse>({ method: "GET", url: "/balance/sms" }),
			{ service: "Account", operation: "getBalance" },
		);
		if (result.isErr()) return result;
		const data = result.value;
		if (
			typeof data !== "object" ||
			data === null ||
			typeof (data as unknown as Record<string, unknown>).balance !== "number"
		) {
			return invalidResponse("balance", data, "getBalance");
		}
		return ok(data as unknown as BalanceResponse);
	}

	/** Registers a new sender ID. */
	async registerSender(
		name: string,
		purpose: string[] = ["general"],
	): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		const result = annotate(
			await this.client.request<{ status: string; message: string }>({
				method: "POST",
				url: "/senderid/register",
				data: { sender_name: name, purpose },
			}),
			{ service: "Account", operation: "registerSender" },
		);
		if (result.isErr()) return result;
		if (typeof result.value !== "object" || result.value === null) {
			return invalidResponse("sender registration", result.value, "registerSender");
		}
		return ok(result.value);
	}

	/** Checks the approval status of a sender ID. */
	async checkSender(name: string): Promise<Result<SenderIdStatus, MNotifyError>> {
		const result = annotate(
			await this.client.request<SenderIdStatus>({
				method: "POST",
				url: "/senderid/status",
				data: { sender_name: name },
			}),
			{ service: "Account", operation: "checkSender" },
		);
		if (result.isErr()) return result;
		if (typeof result.value !== "object" || result.value === null) {
			return invalidResponse("sender status", result.value, "checkSender");
		}
		return ok(result.value);
	}
}
