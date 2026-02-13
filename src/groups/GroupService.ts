import type { HttpClient } from "../client/HttpClient";
import { isObject, isString, isArray, isNumber } from "../utils/validation";
import type { Result } from "../types/Result";
import { ok, err } from "../types/Result";
import { MNotifyError } from "../errors/MNotifyError";
import { annotateResultError } from "../errors/errorContext";

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
  const id =
    (isString(data.id) && data.id) || (isString(data._id) && data._id) || null;
  const name =
    (isString(data.name) && data.name) ||
    (isString(data.group_name) && data.group_name) ||
    null;
  return Boolean(id && name);
};

const normalizeGroup = (data: unknown): Group | null => {
  if (!isObject(data)) return null;

  const id =
    (isString(data.id) && data.id) || (isString(data._id) && data._id) || null;
  const name =
    (isString(data.name) && data.name) ||
    (isString(data.group_name) && data.group_name) ||
    null;

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    description: isString(data.description) ? data.description : undefined,
    contact_count: isNumber(data.contact_count) ? data.contact_count : 0,
    created_at: isString(data.created_at) ? data.created_at : "",
    updated_at: isString(data.updated_at) ? data.updated_at : "",
  };
};

/**
 * Service for managing contact groups with mNotify API
 */
export class GroupService {
  constructor(private readonly client: HttpClient) {}

  private annotate<T>(
    result: Result<T, MNotifyError>,
    operation: string,
  ): Result<T, MNotifyError> {
    return annotateResultError(result, {
      service: "GroupService",
      operation,
    });
  }

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
  public async createGroupSafe(
    input: CreateGroupInput,
  ): Promise<Result<Group, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<Group>({
        method: "POST",
        url: "/group",
        data: {
          group_name: input.name,
          description: input.description,
        },
      }),
      "createGroupSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!validateGroup(result.value)) {
      return err(
        new MNotifyError("Invalid group response format", 0, result.value, {
          service: "GroupService",
          operation: "createGroupSafe",
          stage: "validation",
        }),
      );
    }

    const normalized = normalizeGroup(result.value);
    if (!normalized) {
      return err(
        new MNotifyError("Invalid group response format", 0, result.value, {
          service: "GroupService",
          operation: "createGroupSafe",
          stage: "validation",
        }),
      );
    }

    return ok(normalized);
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
    const result = this.annotate(
      await this.client.requestSafe<Group[]>({
        method: "GET",
        url: "/group",
      }),
      "getGroupsSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isArray(result.value)) {
      return err(
        new MNotifyError("Invalid groups response format", 0, result.value, {
          service: "GroupService",
          operation: "getGroupsSafe",
          stage: "validation",
        }),
      );
    }

    const normalized = result.value
      .map((item) => normalizeGroup(item))
      .filter((item): item is Group => item !== null);
    return ok(normalized);
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
    const result = this.annotate(
      await this.client.requestSafe<Group>({
        method: "GET",
        url: `/group/${id}`,
      }),
      "getGroupSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!validateGroup(result.value)) {
      return err(
        new MNotifyError("Invalid group response format", 0, result.value, {
          service: "GroupService",
          operation: "getGroupSafe",
          stage: "validation",
        }),
      );
    }

    const normalized = normalizeGroup(result.value);
    if (!normalized) {
      return err(
        new MNotifyError("Invalid group response format", 0, result.value, {
          service: "GroupService",
          operation: "getGroupSafe",
          stage: "validation",
        }),
      );
    }

    return ok(normalized);
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
    contactId: string,
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<{ status: string; message: string }>({
        method: "POST",
        url: `/contact/${groupId}`,
        data: { contact_id: contactId },
      }),
      "addContactToGroupSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError(
          "Invalid add contact response format",
          0,
          result.value,
          {
            service: "GroupService",
            operation: "addContactToGroupSafe",
            stage: "validation",
          },
        ),
      );
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
    contactId: string,
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
    contactId: string,
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<{ status: string; message: string }>({
        method: "DELETE",
        url: `/contact/${contactId}/${groupId}`,
      }),
      "removeContactFromGroupSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError(
          "Invalid remove contact response format",
          0,
          result.value,
          {
            service: "GroupService",
            operation: "removeContactFromGroupSafe",
            stage: "validation",
          },
        ),
      );
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
    contactId: string,
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
  public async deleteGroupSafe(
    id: string,
  ): Promise<Result<{ status: string; message: string }, MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<{ status: string; message: string }>({
        method: "DELETE",
        url: `/group/${id}`,
      }),
      "deleteGroupSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isObject(result.value)) {
      return err(
        new MNotifyError("Invalid delete response format", 0, result.value, {
          service: "GroupService",
          operation: "deleteGroupSafe",
          stage: "validation",
        }),
      );
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
  public async deleteGroup(
    id: string,
  ): Promise<{ status: string; message: string }> {
    const result = await this.deleteGroupSafe(id);
    return result.unwrap();
  }
}
