import { HttpClient, type MNotifyConfig } from './client/HttpClient';
import { SMSService } from './sms/SMSService';
import { ContactService } from './contacts/ContactService';
import { AccountService } from './account/AccountService';
import { TemplateService } from './templates/TemplateService';
import { GroupService } from './groups/GroupService';
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
 * // Send SMS
 * const response = await mnotify.sms.sendQuickBulkSMS({
 *   recipient: ['233200000000'],
 *   sender: 'MyApp',
 *   message: 'Hello!'
 * });
 * 
 * // Check balance
 * const balance = await mnotify.account.getBalance();
 * 
 * // Manage contacts
 * const contact = await mnotify.contacts.createContact({
 *   phone: '233200000000',
 *   firstname: 'John',
 *   lastname: 'Doe'
 * });
 * ```
 */
export class MNotify {
  public readonly sms: SMSService;
  public readonly contacts: ContactService;
  public readonly account: AccountService;
  public readonly templates: TemplateService;
  public readonly groups: GroupService;

  constructor(config: MNotifyConfig) {
    const client = new HttpClient(config);
    this.sms = new SMSService(client);
    this.contacts = new ContactService(client);
    this.account = new AccountService(client);
    this.templates = new TemplateService(client);
    this.groups = new GroupService(client);
  }
}

export { MNotifyError };
export type { MNotifyConfig } from './client/HttpClient';
export type { SendSMSOptions, SendSMSResponse, SmsDeliveryReport } from './sms/SMSService';
export type { Contact, CreateContactInput } from './contacts/ContactService';
export type { BalanceResponse, SenderId } from './account/AccountService';
export type { Template, CreateTemplateInput } from './templates/TemplateService';
export type { Group, CreateGroupInput } from './groups/GroupService';

// Export utility functions for advanced use cases
export {
  toArray,
  normalizePhone,
  isValidPhone,
  chunk,
  compact,
} from './utils/helpers';