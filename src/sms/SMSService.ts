import { ca } from "zod/v4/locales";
import type { MNotifyClient } from "../client/MNotifyClient";
import { z } from "zod";

/**
 * Schema for validating SMS send responses
 * @property {string} status - 'success' or 'error'
 * @property {string} code - Response status code
 * @property {string} message - Human-readable response message
 * @property {object} summary - Detailed send summary
 * @property {string} summary._id - Internal campaign ID
 * @property {string} summary.message_id - Public message identifier
 * @property {string} summary.type - Message type
 * @property {number} summary.total_sent - Total messages successfully sent
 * @property {number} summary.contacts - Number of contacts targeted
 * @property {number} summary.total_rejected - Number of failed deliveries
 * @property {string[]} summary.numbers_sent - Array of numbers that received the message
 * @property {number} summary.credit_used - Credits consumed
 * @property {number} summary.credit_left - Remaining account balance
 */
export const SendSMSResponseSchema = z.object({
	status: z.enum(["success", "error"]),
	code: z.string(),
	message: z.string(),
	summary: z.object({
		_id: z.string(),
		message_id: z.string(),
		type: z.string(),
		total_sent: z.number(),
		contacts: z.number(),
		total_rejected: z.number(),
		numbers_sent: z.array(z.string()),
		credit_used: z.number(),
		credit_left: z.number(),
	}),
});

/**
 * Schema for validating SMS delivery reports
 * @property {string} status - 'success' or 'error'
 * @property {object[]} report - Array of delivery status objects
 * @property {number} report._id - Internal report ID
 * @property {string} report.recipient - Recipient phone number
 * @property {string} report.message - Message content
 * @property {string} report.sender - Sender ID
 * @property {string} report.status - Delivery status
 * @property {string} report.date_sent - ISO timestamp of send attempt
 * @property {string} [report.campaign_id] - Optional campaign identifier
 * @property {number} report.retries - Number of delivery attempts
 */
const SmsDeliveryReportSchema = z.object({
	status: z.enum(["success", "error"]),
	report: z.array(
		z.object({
			_id: z.number(),
			recipient: z.string(),
			message: z.string(),
			sender: z.string(),
			status: z.string(),
			date_sent: z.string(),
			campaign_id: z.string().optional(),
			retries: z.number(),
		}),
	),
});

/**
 * Response type for SMS send operations
 */
export type SendSMSResponse = z.infer<typeof SendSMSResponseSchema>;

/**
 * Delivery report type for SMS status checks
 */
export type SmsDeliveryReport = z.infer<typeof SmsDeliveryReportSchema>;

/**
 * Options for sending SMS messages
 * @property {string|string[]} recipient - Single number or array of numbers
 * @property {string} sender - Registered sender ID
 * @property {string} message - Content to send (160 chars max)
 * @property {boolean} [is_schedule=false] - Flag for scheduled messages
 * @property {string} [schedule_date] - ISO date for scheduled sends
 */
export type SendSMSOptions = {
	recipient: string | string[];
	sender: string;
	message: string;
	is_schedule?: boolean;
	schedule_date?: string;
};

/**
 * Service for managing SMS operations with mNotify BMS API
 */
export class SMSService {
	/**
	 * Creates an instance of SMSService
	 * @param {MNotifyClient} client - Configured API client instance
	 */
	constructor(private readonly client: MNotifyClient) {}

	/**
	 * Sends bulk SMS messages to one or more recipients
	 * @param {SendSMSOptions} options - SMS configuration
	 * @returns {Promise<SendSMSResponse>} Detailed send report
	 * @throws {MNotifyError} On API failure or validation errors
	 *
	 * @example
	 * ```typescript
	 * await smsService.sendQuickBulkSMS({
	 *   recipient: ['233200000000', '233244444444'],
	 *   sender: 'MyApp',
	 *   message: 'Hello from mNotify!'
	 * });
	 * ```
	 */
	public async sendQuickBulkSMS(
		options: SendSMSOptions,
	): Promise<SendSMSResponse> {
		const recipients = Array.isArray(options.recipient)
			? options.recipient
			: [options.recipient];

		const payload = {
			recipient: recipients,
			sender: options.sender,
			message: options.message,
			is_schedule: options.is_schedule || false,
			schedule_date: options.schedule_date || "",
		};

		const response = await this.client.request<SendSMSResponse>({
			method: "POST",
			url: "/sms/quick",
			data: payload,
		});

		console.log("SMS sent response:", response);
		return SendSMSResponseSchema.parse(response);
	}

	/**
	 * Retrieves delivery status for a sent SMS campaign
	 * @param {string} campaignId - ID from send response
	 * @param {string} [status='null'] - Optional status filter
	 * @returns {Promise<SmsDeliveryReport>} Detailed delivery report
	 * @throws {MNotifyError} On API failure or invalid campaign ID
	 *
	 * @example
	 * ```typescript
	 * const report = await smsService.getSMSStatus('campaign_123');
	 * console.log(report.status); // 'delivered', 'failed', etc.
	 * ```
	 */
	public async getSMSStatus(
		campaignId: string,
		status = "null",
	): Promise<SmsDeliveryReport> {
		const response = await this.client.request<SmsDeliveryReport>({
			method: "GET",
			url: `/campaign/${campaignId}/${status}`,
		});

		return SmsDeliveryReportSchema.parse(response);
	}
}