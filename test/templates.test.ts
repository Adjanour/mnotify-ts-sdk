import { HttpClient } from "../src/http.js";
import { Templates } from "../src/templates.js";

global.fetch = jest.fn() as jest.Mock;

describe("Templates", () => {
	let templates: Templates;

	beforeEach(() => {
		templates = new Templates(new HttpClient({ apiKey: "test-key", timeout: 10000 }));
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("sends title/body to API and normalizes response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					_id: "t_1",
					title: "Welcome",
					body: "Hello {{name}}",
					status: "approved",
					created_at: "2023-01-01",
					updated_at: "2023-01-01",
				}),
			});

			const result = await templates.create({ name: "Welcome", content: "Hello {{name}}" });
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.id).toBe("t_1");
				expect(result.value.name).toBe("Welcome");
				expect(result.value.content).toBe("Hello {{name}}");
				expect(result.value.status).toBe("approved");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/template"),
				expect.objectContaining({
					method: "POST",
					body: expect.stringContaining("title"),
				}),
			);
		});
	});

	describe("list", () => {
		it("fetches and normalizes templates", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => [
					{
						_id: "t_1",
						title: "Welcome",
						body: "Hi",
						status: "approved",
						created_at: "",
						updated_at: "",
					},
				],
			});

			const result = await templates.list();
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0].name).toBe("Welcome");
				expect(result.value[0].content).toBe("Hi");
			}
		});
	});

	describe("get", () => {
		it("fetches single template by id", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					id: "t_1",
					name: "Test",
					content: "Hello",
					status: "pending",
					created_at: "",
					updated_at: "",
				}),
			});

			const result = await templates.get("t_1");
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.id).toBe("t_1");
				expect(result.value.name).toBe("Test");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/template/t_1"),
				expect.any(Object),
			);
		});
	});

	describe("delete", () => {
		it("calls DELETE on /template/{id}", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success", message: "Deleted" }),
			});

			const result = await templates.delete("t_1");
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/template/t_1"),
				expect.objectContaining({ method: "DELETE" }),
			);
		});
	});
});
