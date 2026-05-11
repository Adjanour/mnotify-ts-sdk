import { annotate, invalidResponse } from "./errors.js";
import type { MNotifyError } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { ok } from "./result.js";
import type { CreateTemplateInput, Template } from "./types.js";

export class Templates {
	constructor(private readonly client: HttpClient) {}

	create(input: CreateTemplateInput): Promise<Result<Template, MNotifyError>> {
		return this.requestSingle(
			"/template",
			{ method: "POST", data: { title: input.name, body: input.content } },
			"create",
			normalizeTemplate,
		);
	}

	list(): Promise<Result<Template[], MNotifyError>> {
		return this.requestArray("/template", "list", normalizeTemplate);
	}

	get(id: string): Promise<Result<Template, MNotifyError>> {
		return this.requestSingle(`/template/${id}`, { method: "GET" }, "get", normalizeTemplate);
	}

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
	): Promise<Result<T, MNotifyError>> {
		const result = annotate(
			await this.client.request<T>({ method: config.method, url: path, data: config.data }),
			{ service: "Templates", operation },
		);
		if (result.isErr()) return result;
		const normalized = normalize(result.value);
		if (normalized === null) return invalidResponse("template", result.value, operation);
		return ok(normalized);
	}

	private async requestArray<T>(
		path: string,
		operation: string,
		normalize: (data: unknown) => T | null,
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Templates",
			operation,
		});
		if (result.isErr()) return result;
		if (!Array.isArray(result.value)) return invalidResponse("templates", result.value, operation);
		const normalized = result.value.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}
}

function normalizeTemplate(data: unknown): Template | null {
	if (typeof data !== "object" || data === null) return null;
	const d = data as Record<string, unknown>;
	const id = typeof d.id === "string" ? d.id : typeof d._id === "string" ? d._id : null;
	const name = typeof d.name === "string" ? d.name : typeof d.title === "string" ? d.title : null;
	const content =
		typeof d.content === "string" ? d.content : typeof d.body === "string" ? d.body : null;
	if (!id || !name || !content) return null;
	return {
		id,
		name,
		content,
		status: ["approved", "pending", "rejected"].includes(d.status as string)
			? (d.status as Template["status"])
			: "pending",
		created_at: typeof d.created_at === "string" ? d.created_at : "",
		updated_at: typeof d.updated_at === "string" ? d.updated_at : "",
	};
}
