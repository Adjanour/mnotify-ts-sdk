import type { HttpClient } from '../client/HttpClient';
import { isObject, isString, isArray, validateRequired, ValidationError } from '../utils/validation';
import type { Result } from '../types/Result';
import { ok, err } from '../types/Result';
import { MNotifyError } from '../errors/MNotifyError';

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
   * Creates a new contact group (railway-oriented programming)
   * @param input - Group data
   * @returns Result containing created group or error
   *
   * @example
   * ```typescript
   * const result = await groupService.createGroupSafe({
   *   name: 'VIP Customers',
   *   description: 'High-value customer segment'
   * });
   * result.match({
   *   ok: (group) => console.log('Group created:', group),
   *   err: (error) => console.error('Failed to create group:', error)
   * });
   * ```
   */
  public async createGroupSafe(input: CreateGroupInput): Promise<Result<Group, MNotifyError>> {
    const result = await this.client.requestSafe<Group>({
      method: 'POST',
      url: '/groups',
      data: input,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateGroup(result.value)) {
      return err(new MNotifyError('Invalid group response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Creates a new contact group (throws on error - legacy API)
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
    const result = await this.createGroupSafe(input);
    return result.unwrap();
  }

  /**
   * Retrieves all groups (railway-oriented programming)
   * @returns Result containing array of groups or error
   *
   * @example
   * ```typescript
   * const result = await groupService.getGroupsSafe();
   * if (result.isOk()) {
   *   console.log('Groups:', result.value);
   * }
   * ```
   */
  public async getGroupsSafe(): Promise<Result<Group[], MNotifyError>> {
    const result = await this.client.requestSafe<Group[]>({
      method: 'GET',
      url: '/groups',
    });

    if (result.isErr()) {
      return result;
    }

    if (!isArray(result.value)) {
      return err(new MNotifyError('Invalid groups response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves all groups (throws on error - legacy API)
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
    const result = await this.getGroupsSafe();
    return result.unwrap();
  }

  /**
   * Retrieves a specific group by ID (railway-oriented programming)
   * @param id - Group ID
   * @returns Result containing group details or error
   *
   * @example
   * ```typescript
   * const result = await groupService.getGroupSafe('group_123');
   * result.match({
   *   ok: (group) => console.log('Group:', group),
   *   err: (error) => console.error('Failed to get group:', error)
   * });
   * ```
   */
  public async getGroupSafe(id: string): Promise<Result<Group, MNotifyError>> {
    const result = await this.client.requestSafe<Group>({
      method: 'GET',
      url: `/groups/${id}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!validateGroup(result.value)) {
      return err(new MNotifyError('Invalid group response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Retrieves a specific group by ID (throws on error - legacy API)
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
    const result = await this.getGroupSafe(id);
    return result.unwrap();
  }

  /**
   * Adds a contact to a group (railway-oriented programming)
   * @param groupId - Group ID
   * @param contactId - Contact ID
   * @returns Result containing operation result or error
   *
   * @example
   * ```typescript
   * const result = await groupService.addContactToGroupSafe('group_123', 'contact_456');
   * result.match({
   *   ok: (res) => console.log('Contact added:', res),
   *   err: (error) => console.error('Failed to add contact:', error)
   * });
   * ```
   */
  public async addContactToGroupSafe(
    groupId: string,
    contactId: string
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = await this.client.requestSafe<{ status: string; message: string }>({
      method: 'POST',
      url: `/groups/${groupId}/contacts`,
      data: { contact_id: contactId },
    });

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(new MNotifyError('Invalid add contact response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Adds a contact to a group (throws on error - legacy API)
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
    const result = await this.addContactToGroupSafe(groupId, contactId);
    return result.unwrap();
  }

  /**
   * Removes a contact from a group (railway-oriented programming)
   * @param groupId - Group ID
   * @param contactId - Contact ID
   * @returns Result containing operation result or error
   *
   * @example
   * ```typescript
   * const result = await groupService.removeContactFromGroupSafe('group_123', 'contact_456');
   * result.match({
   *   ok: (res) => console.log('Contact removed:', res),
   *   err: (error) => console.error('Failed to remove contact:', error)
   * });
   * ```
   */
  public async removeContactFromGroupSafe(
    groupId: string,
    contactId: string
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = await this.client.requestSafe<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/groups/${groupId}/contacts/${contactId}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(new MNotifyError('Invalid remove contact response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Removes a contact from a group (throws on error - legacy API)
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
    const result = await this.removeContactFromGroupSafe(groupId, contactId);
    return result.unwrap();
  }

  /**
   * Deletes a group (railway-oriented programming)
   * @param id - Group ID
   * @returns Result containing deletion confirmation or error
   *
   * @example
   * ```typescript
   * const result = await groupService.deleteGroupSafe('group_123');
   * result.match({
   *   ok: (res) => console.log('Group deleted:', res),
   *   err: (error) => console.error('Failed to delete group:', error)
   * });
   * ```
   */
  public async deleteGroupSafe(id: string): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = await this.client.requestSafe<{ status: string; message: string }>({
      method: 'DELETE',
      url: `/groups/${id}`,
    });

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(new MNotifyError('Invalid delete response format', 0));
    }

    return ok(result.value);
  }

  /**
   * Deletes a group (throws on error - legacy API)
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
    const result = await this.deleteGroupSafe(id);
    return result.unwrap();
  }
}
