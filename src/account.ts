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
import { err, ok } from "./result.js";
import type { BalanceResponse, SenderIdStatus } from "./types.js";

/** Account-related operations: balance and sender ID management. */
export class Account {
	constructor(private readonly client: HttpClient) {}

	/** Fetches the current account balance. */
	async getBalance(): Promise<Result<BalanceResponse, MNotifyError>> {
		const result = annotate(
			await this.client.request<unknown>({ method: "GET", url: "/balance/sms" }),
			{ service: "Account", operation: "getBalance" },
		);
		if (result.isErr()) return err(result.error);
		const data = result.value;
		const record = data as Record<string, unknown>;
		if (
			typeof data !== "object" ||
			data === null ||
			typeof record.balance !== "number"
		) {
			return invalidResponse<BalanceResponse>("balance", data as BalanceResponse, "getBalance");
		}
		return ok({
			status: typeof record.status === "string" ? record.status : "success",
			balance: record.balance as number,
			bonus: typeof record.bonus === "number" ? record.bonus : undefined,
		});
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
			await this.client.request<unknown>({
				method: "POST",
				url: "/senderid/status",
				data: { sender_name: name },
			}),
			{ service: "Account", operation: "checkSender" },
		);
		if (result.isErr()) return err(result.error);
		if (typeof result.value !== "object" || result.value === null) {
			return invalidResponse<SenderIdStatus>(
				"sender status",
				result.value as SenderIdStatus,
				"checkSender",
			);
		}
		const data = result.value as Record<string, unknown>;
		const summary =
			typeof data.summary === "object" && data.summary !== null
				? (data.summary as Record<string, unknown>)
				: undefined;
		return ok({
			status: typeof data.status === "string" ? data.status : "success",
			code: typeof data.code === "string" ? data.code : undefined,
			message: typeof data.message === "string" ? data.message : undefined,
			sender_name:
				typeof summary?.sender_name === "string"
					? summary.sender_name
					: typeof summary?.["sender name"] === "string"
						? (summary["sender name"] as string)
						: typeof data.sender_name === "string"
							? data.sender_name
							: undefined,
			approval_status:
				typeof summary?.status === "string"
					? summary.status
					: typeof data.approval_status === "string"
						? data.approval_status
						: undefined,
		});
	}
}
