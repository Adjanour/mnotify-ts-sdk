import { MNotifyError, annotate, invalidResponse } from "./errors.js";
import type { HttpClient } from "./http.js";
import type { Result } from "./result.js";
import { err, ok } from "./result.js";
import type { Contact, CreateContactInput } from "./types.js";

export class Contacts {
	constructor(private readonly client: HttpClient) {}

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
		return this.requestSingle(
			`/contact/${groupId}`,
			{ method: "POST", data: input },
			"create",
			normalizeContact,
		);
	}

	list(): Promise<Result<Contact[], MNotifyError>> {
		return this.requestArray("/contact", "list", normalizeContact);
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
	): Promise<Result<T[], MNotifyError>> {
		const result = annotate(await this.client.request<T[]>({ method: "GET", url: path }), {
			service: "Contacts",
			operation,
		});
		if (result.isErr()) return result;
		if (!Array.isArray(result.value)) return invalidResponse("contacts", result.value, operation);
		const normalized = result.value.map(normalize).filter((x): x is T => x !== null);
		return ok(normalized);
	}
}

function normalizeContact(data: unknown): Contact | null {
	if (typeof data !== "object" || data === null) return null;
	const d = data as Record<string, unknown>;
	const id = typeof d._id === "string" ? d._id : typeof d.id === "string" ? d.id : null;
	if (!id || typeof d.phone !== "string") return null;
	return {
		id,
		phone: d.phone,
		firstname: typeof d.firstname === "string" ? d.firstname : "",
		lastname: typeof d.lastname === "string" ? d.lastname : "",
		title: typeof d.title === "string" ? d.title : undefined,
		email: Array.isArray(d.email)
			? d.email.filter((e): e is string => typeof e === "string")
			: undefined,
		dbo: typeof d.dbo === "string" ? d.dbo : undefined,
	};
}
