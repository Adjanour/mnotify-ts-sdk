/** Discriminated union type representing either a successful or failed operation. */
export type Result<T, E = Error> = import("./result.js").Result<T, E>;

/** Configuration options for creating an MNotify client instance. */
export interface MNotifyConfig {
	/** Your mNotify API key. */
	apiKey: string;
	/** Base URL for the mNotify API. Defaults to https://api.mnotify.com/api. */
	baseUrl?: string;
	/** Request timeout in milliseconds. Defaults to 10000. */
	timeout?: number;
	/** Maximum number of retries for failed requests. Defaults to 3. */
	maxRetries?: number;
}

/** Options for sending an SMS message. */
export interface SendSMSOptions {
	/** Recipient phone number(s). Can be a single number or an array of numbers. */
	recipient: string | string[];
	/** Sender ID (sender name) to use. */
	sender: string;
	/** The message content to send. */
	message: string;
	/** Whether the message is scheduled for later delivery. */
	is_schedule?: boolean;
	/** The scheduled delivery date/time (required if is_schedule is true). */
	schedule_date?: string;
}

/** Response returned after sending an SMS campaign. */
export interface SendSMSResponse {
	/** Status of the send request. */
	status: string;
	/** Response code from the API. */
	code: string;
	/** Human-readable response message. */
	message: string;
	/** Summary of the SMS campaign results. */
	summary: {
		_id: string;
		message_id: string;
		type: string;
		total_sent: number;
		contacts: number;
		total_rejected: number;
		numbers_sent: string[];
		credit_used: number;
		credit_left: number;
	};
}

/** Delivery report for an SMS campaign. */
export interface SmsDeliveryReport {
	/** Overall report status. */
	status: string;
	/** Array of per-recipient delivery details. */
	report: Array<{
		_id: number;
		recipient: string;
		message: string;
		sender: string;
		status: string;
		date_sent: string;
		campaign_id?: string;
		retries: number;
	}>;
}

/** A contact stored in the mNotify system. */
export interface Contact {
	/** Unique contact identifier. */
	id: string;
	/** Phone number of the contact. */
	phone: string;
	/** Optional title (e.g., Mr, Mrs, Dr). */
	title?: string;
	/** First name of the contact. */
	firstname: string;
	/** Last name of the contact. */
	lastname: string;
	/** Email address(es) associated with the contact. */
	email?: string[];
	/** Date of birth of the contact. */
	dbo?: string;
}

/** Input type for creating a new contact. Omits the id field which is assigned by the server. */
export type CreateContactInput = Omit<Contact, "id">;

/** A contact group in the mNotify system. */
export interface Group {
	/** Unique group identifier. */
	id: string;
	/** Name of the group. */
	name: string;
	/** Optional description of the group. */
	description?: string;
	/** Number of contacts in the group. */
	contact_count: number;
	/** ISO timestamp of when the group was created. */
	created_at: string;
	/** ISO timestamp of when the group was last updated. */
	updated_at: string;
}

/** Input type for creating a new group. */
export interface CreateGroupInput {
	/** Name of the group. */
	name: string;
	/** Optional description of the group. */
	description?: string;
}

/** An SMS template in the mNotify system. */
export interface Template {
	/** Unique template identifier. */
	id: string;
	/** Name of the template. */
	name: string;
	/** Body content of the template. */
	content: string;
	/** Approval status of the template. */
	status: "approved" | "pending" | "rejected";
	/** ISO timestamp of when the template was created. */
	created_at: string;
	/** ISO timestamp of when the template was last updated. */
	updated_at: string;
}

/** Input type for creating a new template. */
export interface CreateTemplateInput {
	/** Name of the template. */
	name: string;
	/** Body content of the template. */
	content: string;
}

/** Response containing the account balance. */
export interface BalanceResponse {
	/** Current account balance. */
	balance: number;
	/** Currency code (e.g., GHS). */
	currency: string;
}

/** Status of a registered sender ID. */
export interface SenderIdStatus {
	/** Status of the sender ID registration. */
	status: string;
	/** Optional message from the API. */
	message?: string;
	/** The sender name that was checked. */
	sender_name?: string;
	/** Approval status of the sender ID (e.g., approved, pending). */
	approval_status?: string;
}
