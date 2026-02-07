import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';

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
   * Creates a new contact
   * @param contact - Contact data
   * @returns Created contact with ID
   */
  public async createContact(contact: CreateContactInput): Promise<Contact> {
    const response = await this.client.request<Contact>({
      method: 'POST',
      url: '/contacts',
      data: contact,
    });

    if (!validateContact(response)) {
      throw new ValidationError('Invalid contact response format');
    }

    return response;
  }

  /**
   * Retrieves all contacts
   * @returns Array of contacts
   */
  public async getContacts(): Promise<Contact[]> {
    const response = await this.client.request<Contact[]>({
      method: 'GET',
      url: '/contacts',
    });

    if (!isArray(response)) {
      throw new ValidationError('Invalid contacts response format');
    }

    return response;
  }
}