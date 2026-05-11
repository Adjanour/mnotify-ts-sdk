export type Result<T, E = Error> = import("./result.js").Result<T, E>;

export interface MNotifyConfig {
	apiKey: string;
	baseUrl?: string;
	timeout?: number;
	maxRetries?: number;
}

export interface SendSMSOptions {
	recipient: string | string[];
	sender: string;
	message: string;
	is_schedule?: boolean;
	schedule_date?: string;
}

export interface SendSMSResponse {
	status: string;
	code: string;
	message: string;
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

export interface SmsDeliveryReport {
	status: string;
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

export interface Contact {
	id: string;
	phone: string;
	title?: string;
	firstname: string;
	lastname: string;
	email?: string[];
	dbo?: string;
}

export type CreateContactInput = Omit<Contact, "id">;

export interface Group {
	id: string;
	name: string;
	description?: string;
	contact_count: number;
	created_at: string;
	updated_at: string;
}

export interface CreateGroupInput {
	name: string;
	description?: string;
}

export interface Template {
	id: string;
	name: string;
	content: string;
	status: "approved" | "pending" | "rejected";
	created_at: string;
	updated_at: string;
}

export interface CreateTemplateInput {
	name: string;
	content: string;
}

export interface BalanceResponse {
	balance: number;
	currency: string;
}

export interface SenderIdStatus {
	status: string;
	message?: string;
	sender_name?: string;
	approval_status?: string;
}
