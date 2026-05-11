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
import { ok } from "./result.js";
import type { CreateGroupInput, Group } from "./types.js";

/** Contact group management operations. */
export class Groups {
	constructor(private readonly client: HttpClient) {}

	/** Creates a new contact group. */
	create(input: CreateGroupInput): Promise<Result<Group, MNotifyError>> {
		return this.request<Group>(
			"/group",
			{
				method: "POST",
				data: { group_name: input.name, description: input.description },
			},
			"create",
			normalizeGroup,
		);
	}

	/** Lists all contact groups. */
	list(): Promise<Result<Group[], MNotifyError>> {
		return this.requestArray<Group>("/group", "list", normalizeGroup);
	}

	/** Fetches a single group by its ID. */
	get(id: string): Promise<Result<Group, MNotifyError>> {
		return this.request<Group>(`/group/${id}`, { method: "GET" }, "get", normalizeGroup);
	}

	/** Adds an existing contact to a group. */
	addContact(
		groupId: string,
		contactId: string,
	): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		return this.requestRaw(
			`/contact/${groupId}`,
			{
				method: "POST",
				data: { contact_id: contactId },
			},
			"addContact",
		);
	}

	/** Removes a contact from a group. */
	removeContact(
		groupId: string,
		contactId: string,
	): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		return this.requestRaw(
			`/contact/${contactId}/${groupId}`,
			{
				method: "DELETE",
			},
			"removeContact",
		);
	}

	/** Deletes a group by its ID. */
	delete(id: string): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		return this.requestRaw(`/group/${id}`, { method: "DELETE" }, "delete");
	}

	private async request<T>(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
		normalize: (data: unknown) => T | null,
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "Groups", operation },
		);
		if (result.isErr()) return result;
		const normalized = normalize(result.value);
		if (normalized === null) return invalidResponse("group", result.value, operation);
		return ok(normalized);
	}

	private async requestArray<T>(
		path: string,
		operation: string,
		normalize: (data: unknown) => T | null,
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Groups",
			operation,
		});
		if (result.isErr()) return result;
		if (!Array.isArray(result.value)) return invalidResponse("groups", result.value, operation);
		const normalized = result.value.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}

	private async requestRaw(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
	): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		const result = annotate(
			await this.client.request<{ status: string; message: string }>({
				method: config.method,
				url: path,
				data: config.data,
			}),
			{ service: "Groups", operation },
		);
		if (result.isErr()) return result;
		if (typeof result.value !== "object" || result.value === null)
			return invalidResponse("operation", result.value, operation);
		return ok(result.value);
	}
}

function normalizeGroup(data: unknown): Group | null {
	if (typeof data !== "object" || data === null) return null;
	const d = data as Record<string, unknown>;
	const id = typeof d.id === "string" ? d.id : typeof d._id === "string" ? d._id : null;
	const name =
		typeof d.name === "string" ? d.name : typeof d.group_name === "string" ? d.group_name : null;
	if (!id || !name) return null;
	return {
		id,
		name,
		description: typeof d.description === "string" ? d.description : undefined,
		contact_count: typeof d.contact_count === "number" ? d.contact_count : 0,
		created_at: typeof d.created_at === "string" ? d.created_at : "",
		updated_at: typeof d.updated_at === "string" ? d.updated_at : "",
	};
}
