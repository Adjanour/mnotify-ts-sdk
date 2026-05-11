import { Account } from "./account.js";
import { Contacts } from "./contacts.js";
import { Groups } from "./groups.js";
import { HttpClient } from "./http.js";
import { SMS } from "./sms.js";
import { Templates } from "./templates.js";
import type { MNotifyConfig } from "./types.js";

export class MNotify {
	readonly sms: SMS;
	readonly contacts: Contacts;
	readonly account: Account;
	readonly templates: Templates;
	readonly groups: Groups;

	constructor(config: MNotifyConfig) {
		const client = new HttpClient(config);
		this.sms = new SMS(client);
		this.contacts = new Contacts(client);
		this.account = new Account(client);
		this.templates = new Templates(client);
		this.groups = new Groups(client);
	}
}
