import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';
import type { Result } from '../types/Result';
import { ok, err } from '../types/Result';
import { MNotifyError } from '../errors/MNotifyError';

export interface Contact {
  _id: string;
  phone: string;
  title?: string;
  firstname: string;
  lastname: string;
  email?: string[];
  dbo?: string;
}

export type CreateContactInput = Omit<Contact, '_id'>;

/**
 * Validates contact response
 */
const validateContact = (data: unknown): data is Contact => {
  if (!isObject(data)) return false;

  validateRequired(data, ['_id', 'phone', 'firstname', 'lastname']);

  return (
    isString(data._id) &&
    isString(data.phone) &&
    isString(data.firstname) &&
    isString(data.lastname)
  );
};

/**
 * Service for managing contacts with mNotify API
 */
export class ContactService {
  constructor(private readonly client: HttpClient) {}

  /**
   * Creates a new contact (railway-oriented programming)
   * @param contact - Contact data
   * @returns Result containing created contact with ID or error
   */
  public async createContactSafe(contact: CreateContactInput): Promise<Result<Contact, MNotifyError>> {
    const result = await this.client.requestSafe<Contact>({
      method: 'POST',
      url: '/contacts',
      data: contact,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateContact(result.value)) {
      return err(new MNotifyError('Invalid contact response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Creates a new contact (throws on error - legacy API)
   * @param contact - Contact data
   * @returns Created contact with ID
   */
  public async createContact(contact: CreateContactInput): Promise<Contact> {
    const result = await this.createContactSafe(contact);
    return result.unwrap();
  }

  /**
   * Retrieves all contacts (railway-oriented programming)
   * @returns Result containing array of contacts or error
   */
  public async getContactsSafe(): Promise<Result<Contact[], MNotifyError>> {
    const result = await this.client.requestSafe<Contact[]>({
      method: 'GET',
      url: '/contacts',
    });

    if (result.isErr()) {
      return result;
    }

    if (!isArray(result.value)) {
      return err(new MNotifyError('Invalid contacts response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves all contacts (throws on error - legacy API)
   * @returns Array of contacts
   */
  public async getContacts(): Promise<Contact[]> {
    const result = await this.getContactsSafe();
    return result.unwrap();
  }
}