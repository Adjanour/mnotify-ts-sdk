/**
 * Templates service.
 *
 * Provides methods for managing SMS templates — creating, listing,
 * fetching individual templates, and deleting them.
 * Normalizes API responses, supporting both `id`/`_id` and `name`/`title` field names.
 */

import { annotate, invalidResponse } from "./errors.js";
import type { MNotifyError } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { err, ok } from "./result.js";
import type { CreateTemplateInput, Template } from "./types.js";

/** SMS template management operations. */
export class Templates {
	constructor(private readonly client: HttpClient) {}

	/** Creates a new SMS template. */
	async create(input: CreateTemplateInput): Promise<Result<Template, MNotifyError>> {
		const result = annotate(
			await this.client.request<Record<string, unknown>>({
				method: "POST",
				url: "/template",
				data: { title: input.name, body: input.content },
			}),
			{ service: "Templates", operation: "create" },
		);
		if (result.isErr()) return err(result.error);
		const normalized = normalizeTemplate(result.value);
		if (normalized) return ok(normalized);
		const id =
			typeof result.value._id === "string"
				? result.value._id
				: typeof result.value._id === "number"
					? String(result.value._id)
					: null;
		if (!id) return invalidResponse<Template>("template", result.value as unknown as Template, "create");
		return ok({
			id,
			name: input.name,
			content: input.content,
			status: "pending",
			created_at: "",
			updated_at: "",
		});
	}

	/** Lists all SMS templates. */
	list(): Promise<Result<Template[], MNotifyError>> {
		return this.requestArray("/template", "list", normalizeTemplate, ["template_list"]);
	}

	/** Fetches a single template by its ID. */
	get(id: string): Promise<Result<Template, MNotifyError>> {
		return this.requestSingle(
			`/template/${id}`,
			{ method: "GET" },
			"get",
			normalizeTemplate,
			["template_list", "template"],
		);
	}

	/** Deletes a template by its ID. */
	async delete(id: string): Promise<Result<{ status: string; message: string }, MNotifyError>> {
		const result = annotate(
			await this.client.request<{ status: string; message: string }>({
				method: "DELETE",
				url: `/template/${id}`,
			}),
			{ service: "Templates", operation: "delete" },
		);
		if (result.isErr()) return result;
		if (typeof result.value !== "object" || result.value === null)
			return invalidResponse("operation", result.value, "delete");
		return ok(result.value);
	}

	private async requestSingle<T>(
		path: string,
		config: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; data?: unknown },
		operation: string,
		normalize: (data: unknown) => T | null,
		wrapperKeys: string[] = [],
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "Templates", operation },
		);
		if (result.isErr()) return result;
		const normalized = normalize(unwrapObject(result.value, wrapperKeys) ?? result.value);
		if (normalized === null) return invalidResponse("template", result.value, operation);
		return ok(normalized);
	}

	private async requestArray<T>(
		path: string,
		operation: string,
		normalize: (data: unknown) => T | null,
		wrapperKeys: string[] = [],
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Templates",
			operation,
		});
		if (result.isErr()) return result;
		const list = unwrapArray(result.value, wrapperKeys);
		if (!list) return invalidResponse("templates", result.value, operation);
		const normalized = list.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}
}

function normalizeTemplate(data: unknown): Template | null {
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
	const name = typeof d.name === "string" ? d.name : typeof d.title === "string" ? d.title : null;
	const content =
		typeof d.content === "string" ? d.content : typeof d.body === "string" ? d.body : null;
	if (!id || !name || !content) return null;
	return {
		id,
		name,
		content,
		status: ["approved", "pending", "rejected"].includes(
			String(d.status ?? d.type).toLowerCase(),
		)
			? (String(d.status ?? d.type).toLowerCase() as Template["status"])
			: "pending",
		created_at: typeof d.created_at === "string" ? d.created_at : "",
		updated_at: typeof d.updated_at === "string" ? d.updated_at : "",
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
