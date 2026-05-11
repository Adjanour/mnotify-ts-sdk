/**
 * Main entry point for the mNotify SDK.
 *
 * Provides the {@link MNotify} class that ties together all service modules
 * (SMS, Contacts, Groups, Templates, Account) behind a single configured client.
 */

import { Account } from "./account.js";
import { Contacts } from "./contacts.js";
import { Groups } from "./groups.js";
import { HttpClient } from "./http.js";
import { SMS } from "./sms.js";
import { Templates } from "./templates.js";
import type { MNotifyConfig } from "./types.js";

/** Main SDK client for the mNotify API. */
export class MNotify {
	/** SMS sending and campaign status. */
	readonly sms: SMS;
	/** Contact management. */
	readonly contacts: Contacts;
	/** Account balance and sender ID management. */
	readonly account: Account;
	/** SMS template management. */
	readonly templates: Templates;
	/** Contact group management. */
	readonly groups: Groups;

	/**
	 * Creates a new mNotify client.
	 *
	 * @example
	 * ```ts
	 * const mnotify = new MNotify({ apiKey: "your-api-key" });
	 * ```
	 */
	constructor(config: MNotifyConfig) {
		const client = new HttpClient(config);
		this.sms = new SMS(client);
		this.contacts = new Contacts(client);
		this.account = new Account(client);
		this.templates = new Templates(client);
		this.groups = new Groups(client);
	}
}
