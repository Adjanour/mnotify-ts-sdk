/**
 * Contacts service.
 *
 * Provides methods for creating contacts and listing contacts within groups.
 * Normalizes the API response, converting `_id` to `id`.
 */

import { MNotifyError, annotate, invalidResponse } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { err, ok } from "./result.js";
import type { Contact, CreateContactInput } from "./types.js";

/** Contact management operations. */
export class Contacts {
	constructor(private readonly client: HttpClient) {}

	/**
	 * Creates a new contact in the specified group.
	 *
	 * @param input - Contact details (name, phone, etc.).
	 * @param groupId - The ID of the group to add the contact to (required by mNotify v2 API).
	 */
	create(input: CreateContactInput, groupId: string): Promise<Result<Contact, MNotifyError>> {
		if (!groupId) {
			return Promise.resolve(
				err(
					new MNotifyError(
						"mNotify v2 requires groupId to create a contact. Pass create(contact, groupId).",
						400,
						undefined,
						{
							service: "Contacts",
							operation: "create",
							stage: "validation",
							path: "/contact/{group_id}",
						},
					),
				),
			);
		}
		return this.createContact(input, groupId);
	}

	/** Lists all contacts. */
	list(): Promise<Result<Contact[], MNotifyError>> {
		return this.requestArray("/contact", "list", normalizeContact, [
			"contact_list",
			"contacts_list",
		]);
	}

	private async createContact(
		input: CreateContactInput,
		groupId: string,
	): Promise<Result<Contact, MNotifyError>> {
		const result = annotate(
			await this.client.request<Record<string, unknown>>({
				method: "POST",
				url: `/contact/${groupId}`,
				data: input,
			}),
			{ service: "Contacts", operation: "create" },
		);
		if (result.isErr()) return err(result.error);
		const normalized = normalizeContact(result.value);
		if (normalized) return ok(normalized);
		const id =
			typeof result.value._id === "string"
				? result.value._id
				: typeof result.value._id === "number"
					? String(result.value._id)
					: null;
		if (!id)
			return invalidResponse<Contact>("contact", result.value as unknown as Contact, "create");
		return ok(contactFromInput(id, input));
	}

	private async requestSingle<T>(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
		normalize: (data: unknown) => T | null,
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "Contacts", operation },
		);
		if (result.isErr()) return result;
		const normalized = normalize(result.value);
		if (normalized === null) return invalidResponse("contact", result.value, operation);
		return ok(normalized);
	}

	private async requestArray<T>(
		path: string,
		operation: string,
		normalize: (data: unknown) => T | null,
		wrapperKeys: string[] = [],
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Contacts",
			operation,
		});
		if (result.isErr()) return result;
		const list = unwrapArray(result.value, wrapperKeys);
		if (!list) return invalidResponse("contacts", result.value, operation);
		const normalized = list.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}
}

function normalizeContact(data: unknown): Contact | null {
	if (typeof data !== "object" || data === null) return null;
	const d = data as Record<string, unknown>;
	const id =
		typeof d._id === "string"
			? d._id
			: typeof d._id === "number"
				? String(d._id)
				: typeof d.id === "string"
					? d.id
					: null;
	if (!id || typeof d.phone !== "string") return null;
	return {
		id,
		phone: d.phone,
		firstname: typeof d.firstname === "string" ? d.firstname : "",
		lastname: typeof d.lastname === "string" ? d.lastname : "",
		title: typeof d.title === "string" ? d.title : undefined,
		email: Array.isArray(d.email)
			? d.email.filter((e): e is string => typeof e === "string")
			: typeof d.email === "string"
				? [d.email]
				: undefined,
		dob: typeof d.dob === "string" ? d.dob : typeof d.dbo === "string" ? d.dbo : undefined,
		dbo: typeof d.dbo === "string" ? d.dbo : typeof d.dob === "string" ? d.dob : undefined,
	};
}

function unwrapArray(data: unknown, keys: string[]): unknown[] | null {
	if (Array.isArray(data)) return data;
	if (typeof data !== "object" || data === null) return null;
	const record = data as Record<string, unknown>;
	for (const key of keys) {
		if (Array.isArray(record[key])) return record[key] as unknown[];
	}
	return null;
}

function contactFromInput(id: string, input: CreateContactInput): Contact {
	const email = Array.isArray(input.email) ? input.email : input.email ? [input.email] : undefined;
	const dob = input.dob ?? input.dbo;
	return {
		id,
		phone: input.phone,
		title: input.title,
		firstname: input.firstname,
		lastname: input.lastname,
		email,
		dob,
		dbo: dob,
	};
}
