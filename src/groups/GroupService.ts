import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';

/**
 * Contact Group
 */
export interface Group {
  id: string;
  name: string;
  description?: string;
  contact_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Group creation input
 */
export interface CreateGroupInput {
  name: string;
  description?: string;
}

/**
 * Validates group response
 */
const validateGroup = (data: unknown): data is Group => {
  if (!isObject(data)) return false;
  validateRequired(data, ['id', 'name']);
  return isString(data.id) && isString(data.name);
};

/**
 * Service for managing contact groups with mNotify API
 */
export class GroupService {
  constructor(private readonly client: HttpClient) {}

  /**
   * Creates a new contact group
   * @param input - Group data
   * @returns Created group
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const group = await groupService.createGroup({
   *   name: 'VIP Customers',
   *   description: 'High-value customer segment'
   * });
   * ```
   */
  public async createGroup(input: CreateGroupInput): Promise<Group> {
    const response = await this.client.request<Group>({
      method: 'POST',
      url: '/groups',
      data: input,
    });

    if (!validateGroup(response)) {
      throw new ValidationError('Invalid group response format');
    }

    return response;
  }

  /**
   * Retrieves all groups
   * @returns Array of groups
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const groups = await groupService.getGroups();
   * console.log('Groups:', groups);
   * ```
   */
  public async getGroups(): Promise<Group[]> {
    const response = await this.client.request<Group[]>({
      method: 'GET',
      url: '/groups',
    });

    if (!isArray(response)) {
      throw new ValidationError('Invalid groups response format');
    }

    return response;
  }

  /**
   * Retrieves a specific group by ID
   * @param id - Group ID
   * @returns Group details
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * const group = await groupService.getGroup('group_123');
   * console.log('Group:', group);
   * ```
   */
  public async getGroup(id: string): Promise<Group> {
    const response = await this.client.request<Group>({
      method: 'GET',
      url: `/groups/${id}`,
    });

    if (!validateGroup(response)) {
      throw new ValidationError('Invalid group response format');
    }

    return response;
  }

  /**
   * Adds a contact to a group
   * @param groupId - Group ID
   * @param contactId - Contact ID
   * @returns Operation result
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * await groupService.addContactToGroup('group_123', 'contact_456');
   * ```
   */
  public async addContactToGroup(
    groupId: string,
    contactId: string
  ): Promise<{ status: string; message: string }> {
    const response = await this.client.request<{ status: string; message: string }>({
      method: 'POST',
      url: `/groups/${groupId}/contacts`,
      data: { contact_id: contactId },
    });

    if (!isObject(response)) {
      throw new ValidationError('Invalid add contact response format');
    }

    return response;
  }

  /**
   * Removes a contact from a group
   * @param groupId - Group ID
   * @param contactId - Contact ID
   * @returns Operation result
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * await groupService.removeContactFromGroup('group_123', 'contact_456');
   * ```
   */
  public async removeContactFromGroup(
    groupId: string,
    contactId: string
  ): Promise<{ status: string; message: string }> {
    const response = await this.client.request<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/groups/${groupId}/contacts/${contactId}`,
    });

    if (!isObject(response)) {
      throw new ValidationError('Invalid remove contact response format');
    }

    return response;
  }

  /**
   * Deletes a group
   * @param id - Group ID
   * @returns Deletion confirmation
   * @throws {MNotifyError} On API failure
   *
   * @example
   * ```typescript
   * await groupService.deleteGroup('group_123');
   * ```
   */
  public async deleteGroup(id: string): Promise<{ status: string; message: string }> {
    const response = await this.client.request<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/groups/${id}`,
    });

    if (!isObject(response)) {
      throw new ValidationError('Invalid delete response format');
    }

    return response;
  }
}
