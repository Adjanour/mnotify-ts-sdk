import { HttpClient, type MNotifyConfig } from './client/HttpClient';
import { SMSService } from './sms/SMSService';
import { ContactService } from './contacts/ContactService';
import { MNotifyError } from './errors/MNotifyError';

/**
 * Main MNotify SDK client
 * 
 * @example
 * ```typescript
 * const mnotify = new MNotify({
 *   apiKey: process.env.MNOTIFY_API_KEY!
 * });
 * 
 * const response = await mnotify.sms.sendQuickBulkSMS({
 *   recipient: ['233200000000'],
 *   sender: 'MyApp',
 *   message: 'Hello!'
 * });
 * ```
 */
export class MNotify {
  public readonly sms: SMSService;
  public readonly contacts: ContactService;

  constructor(config: MNotifyConfig) {
    const client = new HttpClient(config);
    this.sms = new SMSService(client);
    this.contacts = new ContactService(client);
  }
}

export { MNotifyError };
export type { MNotifyConfig } from './client/HttpClient';
export type { SendSMSOptions, SendSMSResponse, SmsDeliveryReport } from './sms/SMSService';
export type { Contact, CreateContactInput } from './contacts/ContactService';