/**
 * SMS service.
 *
 * Provides methods for sending SMS messages and retrieving
 * campaign delivery reports.
 */

import { annotate, invalidResponse } from "./errors.js";
import type { MNotifyError } from "./errors.js";
import { toArray } from "./helpers.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { ok } from "./result.js";
import type { SendSMSOptions, SendSMSResponse, SmsDeliveryReport } from "./types.js";

/** SMS sending and campaign status operations. */
export class SMS {
	constructor(private readonly client: HttpClient) {}

	/** Sends an SMS message to one or more recipients. */
	send(options: SendSMSOptions): Promise<Result<SendSMSResponse, MNotifyError>> {
		return this.request<SendSMSResponse>(
			"/sms/quick",
			{
				method: "POST",
				data: {
					recipient: toArray(options.recipient),
					sender: options.sender,
					message: options.message,
					is_schedule: options.is_schedule || false,
					schedule_date: options.schedule_date || "",
				},
			},
			"send",
			(data): data is SendSMSResponse => {
				return (
					typeof data === "object" &&
					data !== null &&
					"status" in data &&
					"code" in data &&
					"message" in data &&
					"summary" in data
				);
			},
		);
	}

	/** Fetches the delivery report for a campaign. */
	getStatus(campaignId: string, status = "null"): Promise<Result<SmsDeliveryReport, MNotifyError>> {
		return this.request<SmsDeliveryReport>(
			`/campaign/${campaignId}/${status}`,
			{
				method: "GET",
			},
			"getStatus",
			(data): data is SmsDeliveryReport => {
				return typeof data === "object" && data !== null && "status" in data && "report" in data;
			},
		);
	}

	private async request<T>(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
		validate: (data: unknown) => data is T,
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "SMS", operation },
		);
		if (result.isErr()) return result;
		if (!validate(result.value))
			return invalidResponse(
				typeof result.value === "object" ? "SMS" : "SMS",
				result.value,
				operation,
			);
		return ok(result.value);
	}
}
