/**
 * Groups service.
 *
 * Provides methods for managing contact groups, including creating,
 * listing, fetching individual groups, adding/removing contacts, and deleting groups.
 * Normalizes API responses, supporting both `id` and `_id` field names.
 */

import { annotate, invalidResponse } from "./errors.js";
import type { MNotifyError } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { err, ok } from "./result.js";
import type { Contact, CreateContactInput, CreateGroupInput, Group } from "./types.js";

/** Contact group management operations. */
export class Groups {
	constructor(private readonly client: HttpClient) {}

	/** Creates a new contact group. */
	async create(input: CreateGroupInput): Promise<Result<Group, MNotifyError>> {
		const result = annotate(
			await this.client.request<Record<string, unknown>>({
				method: "POST",
				url: "/group",
				data: { name: input.name, description: input.description },
			}),
			{ service: "Groups", operation: "create" },
		);
		if (result.isErr()) return err(result.error);
		const normalized = normalizeGroup(result.value);
		if (normalized) return ok(normalized);
		const id =
			typeof result.value._id === "string"
				? result.value._id
				: typeof result.value._id === "number"
					? String(result.value._id)
					: null;
		if (!id) return invalidResponse<Group>("group", result.value as unknown as Group, "create");
		return ok({
			id,
			name: input.name,
			description: input.description,
			contact_count: 0,
			created_at: "",
			updated_at: "",
		});
	}

	/** Lists all contact groups. */
	list(): Promise<Result<Group[], MNotifyError>> {
		return this.requestArray<Group>("/group", "list", normalizeGroup, ["group_list"]);
	}

	/** Fetches a single group by its ID. */
	get(id: string): Promise<Result<Group, MNotifyError>> {
		return this.request<Group>(`/group/${id}`, { method: "GET" }, "get", normalizeGroup, ["group"]);
	}

	/** Adds an existing contact to a group. */
	addContact(groupId: string, input: CreateContactInput): Promise<Result<Contact, MNotifyError>> {
		return this.createContact(groupId, input);
	}

	/** Deletes a contact by its ID. */
	removeContact(
		contactId: string,
	): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		return this.requestJson<{ status: string; message: string }>(
			`/contact/${contactId}`,
			"DELETE",
			"removeContact",
		);
	}

	/** Deletes a group by its ID. */
	delete(id: string): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		return this.requestJson<{ status: string; message: string }>(
			`/group/${id}`,
			"DELETE",
			"delete",
		);
	}

	private async request<T>(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
		normalize: (data: unknown) => T | null,
		wrapperKeys: string[] = [],
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "Groups", operation },
		);
		if (result.isErr()) return result;
		const normalized = normalize(unwrapObject(result.value, wrapperKeys) ?? result.value);
		if (normalized === null) return invalidResponse("group", result.value, operation);
		return ok(normalized);
	}

	private async requestArray<T>(
		path: string,
		operation: string,
		normalize: (data: unknown) => T | null,
		wrapperKeys: string[] = [],
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Groups",
			operation,
		});
		if (result.isErr()) return result;
		const list = unwrapArray(result.value, wrapperKeys);
		if (!list) return invalidResponse("groups", result.value, operation);
		const normalized = list.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}

	private async requestJson<T>(
		path: string,
		method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
		operation: string,
		data?: unknown,
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(await this.client.request<T>({ method, url: path, data }), {
			service: "Groups",
			operation,
		});
		if (result.isErr()) return result;
		return ok(result.value);
	}

	private async createContact(
		groupId: string,
		input: CreateContactInput,
	): Promise<Result<Contact, MNotifyError>> {
		const result = annotate(
			await this.client.request<Record<string, unknown>>({
				method: "POST",
				url: `/contact/${groupId}`,
				data: input,
			}),
			{ service: "Groups", operation: "addContact" },
		);
		if (result.isErr()) return err(result.error);
		const contact = normalizeContact(
			unwrapObject(result.value, ["contact"]) ?? result.value,
			input,
		);
		if (contact) return ok(contact);
		return invalidResponse<Contact>("contact", result.value as unknown as Contact, "addContact");
	}
}

function normalizeGroup(data: unknown): Group | null {
	if (typeof data !== "object" || data === null) return null;
	const d = data as Record<string, unknown>;
	const id =
		typeof d.id === "string"
			? d.id
			: typeof d._id === "string"
				? d._id
				: typeof d._id === "number"
					? String(d._id)
					: null;
	const name =
		typeof d.name === "string" ? d.name : typeof d.group_name === "string" ? d.group_name : null;
	if (!id || !name) return null;
	return {
		id,
		name,
		description: typeof d.description === "string" ? d.description : undefined,
		contact_count:
			typeof d.contact_count === "number"
				? d.contact_count
				: typeof d.total_contacts === "number"
					? d.total_contacts
					: 0,
		created_at: typeof d.created_at === "string" ? d.created_at : "",
		updated_at: typeof d.updated_at === "string" ? d.updated_at : "",
	};
}

function normalizeContact(data: unknown, input?: CreateContactInput): Contact | null {
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
	const fallback = input ?? { phone: "", firstname: "", lastname: "" };
	if (!id) return null;
	return {
		id,
		phone: typeof d.phone === "string" ? d.phone : fallback.phone,
		firstname: typeof d.firstname === "string" ? d.firstname : fallback.firstname,
		lastname: typeof d.lastname === "string" ? d.lastname : fallback.lastname,
		title: typeof d.title === "string" ? d.title : fallback.title,
		email: Array.isArray(d.email)
			? d.email.filter((e): e is string => typeof e === "string")
			: typeof d.email === "string"
				? [d.email]
				: typeof fallback.email === "string"
					? [fallback.email]
					: Array.isArray(fallback.email)
						? fallback.email
						: undefined,
		dob:
			typeof d.dob === "string"
				? d.dob
				: typeof d.dbo === "string"
					? d.dbo
					: (fallback.dob ?? fallback.dbo),
		dbo:
			typeof d.dbo === "string"
				? d.dbo
				: typeof d.dob === "string"
					? d.dob
					: (fallback.dbo ?? fallback.dob),
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

function unwrapObject(data: unknown, keys: string[]): unknown | null {
	if (typeof data !== "object" || data === null) return null;
	const record = data as Record<string, unknown>;
	for (const key of keys) {
		if (typeof record[key] === "object" && record[key] !== null) return record[key];
	}
	return null;
}
