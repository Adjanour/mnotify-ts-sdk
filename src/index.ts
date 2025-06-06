import { MNotifyClient } from './client/MNotifyClient';
import { SMSService } from './sms/SMSService';
import { ContactService } from './contacts/ContactService';
import { MNotifyError } from './errors/MNotifyError';

export class MNotify {
  public readonly sms: SMSService;
  public readonly contacts: ContactService;

  constructor(config: {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
    maxRetries?: number;
  }) {
    const client = new MNotifyClient(config);
    this.sms = new SMSService(client);
    this.contacts = new ContactService(client);
  }
}

export { MNotifyError };
export type { MNotifyConfig } from './client/MNotifyClient';