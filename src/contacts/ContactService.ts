import type { HttpClient } from "../client/HttpClient";
import { isObject, isString, isArray } from "../utils/validation";
import type { Result } from "../types/Result";
import { ok, err } from "../types/Result";
import { MNotifyError } from "../errors/MNotifyError";
import { annotateResultError } from "../errors/errorContext";

export interface Contact {
  _id: string;
  phone: string;
  title?: string;
  firstname: string;
  lastname: string;
  email?: string[];
  dbo?: string;
}

export type CreateContactInput = Omit<Contact, "_id">;

/**
 * Validates contact response
 */
const validateContact = (data: unknown): data is Contact => {
  if (!isObject(data)) return false;
  const hasId = isString(data._id) || isString(data.id);
  return hasId && isString(data.phone);
};

const normalizeContact = (data: unknown): Contact | null => {
  if (!isObject(data)) return null;

  const id =
    typeof data._id === "string"
      ? data._id
      : typeof data.id === "string"
        ? data.id
        : null;

  if (!id || !isString(data.phone)) {
    return null;
  }

  return {
    _id: id,
    phone: data.phone,
    firstname: isString(data.firstname) ? data.firstname : "",
    lastname: isString(data.lastname) ? data.lastname : "",
    title: isString(data.title) ? data.title : undefined,
    email:
      isArray<string>(data.email) && data.email.every((item) => isString(item))
        ? data.email
        : undefined,
    dbo: isString(data.dbo) ? data.dbo : undefined,
  };
};

/**
 * Service for managing contacts with mNotify API
 */
export class ContactService {
  constructor(private readonly client: HttpClient) {}

  private annotate<T>(
    result: Result<T, MNotifyError>,
    operation: string,
  ): Result<T, MNotifyError> {
    return annotateResultError(result, {
      service: "ContactService",
      operation,
    });
  }

  /**
   * Creates a new contact (railway-oriented programming)
   * @param contact - Contact data
   * @returns Result containing created contact with ID or error
   */
  public async createContactSafe(
    contact: CreateContactInput,
    groupId?: string,
  ): Promise<Result<Contact, MNotifyError>> {
    if (!groupId) {
      return err(
        new MNotifyError(
          "mNotify v2 requires groupId to create a contact. Pass createContactSafe(contact, groupId).",
          400,
          undefined,
          {
            service: "ContactService",
            operation: "createContactSafe",
            stage: "validation",
            path: "/contact/{group_id}",
          },
        ),
      );
    }

    const result = this.annotate(
      await this.client.requestSafe<Contact>({
        method: "POST",
        url: `/contact/${groupId}`,
        data: contact,
      }),
      "createContactSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!validateContact(result.value)) {
      return err(
        new MNotifyError("Invalid contact response format", 0, result.value, {
          service: "ContactService",
          operation: "createContactSafe",
          stage: "validation",
        }),
      );
    }

    const normalized = normalizeContact(result.value);
    if (!normalized) {
      return err(
        new MNotifyError("Invalid contact response format", 0, result.value, {
          service: "ContactService",
          operation: "createContactSafe",
          stage: "validation",
        }),
      );
    }

    return ok(normalized);
  }

  /**
   * Creates a new contact (throws on error - legacy API)
   * @param contact - Contact data
   * @returns Created contact with ID
   */
  public async createContact(
    contact: CreateContactInput,
    groupId?: string,
  ): Promise<Contact> {
    const result = await this.createContactSafe(contact, groupId);
    return result.unwrap();
  }

  /**
   * Retrieves all contacts (railway-oriented programming)
   * @returns Result containing array of contacts or error
   */
  public async getContactsSafe(): Promise<Result<Contact[], MNotifyError>> {
    const result = this.annotate(
      await this.client.requestSafe<Contact[]>({
        method: "GET",
        url: "/contact",
      }),
      "getContactsSafe",
    );

    if (result.isErr()) {
      return result;
    }

    if (!isArray(result.value)) {
      return err(
        new MNotifyError("Invalid contacts response format", 0, result.value, {
          service: "ContactService",
          operation: "getContactsSafe",
          stage: "validation",
        }),
      );
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
