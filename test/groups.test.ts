import { Groups } from "../src/groups.js";
import { HttpClient } from "../src/http.js";

global.fetch = jest.fn() as jest.Mock;

describe("Groups", () => {
	let groups: Groups;

	beforeEach(() => {
		groups = new Groups(new HttpClient({ apiKey: "test-key", timeout: 10000 }));
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("sends name to API and normalizes response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					_id: "g_1",
					name: "VIP",
					description: "High value",
					contact_count: 0,
					created_at: "2023-01-01",
					updated_at: "2023-01-01",
				}),
			});

			const result = await groups.create({ name: "VIP", description: "High value" });
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.id).toBe("g_1");
				expect(result.value.name).toBe("VIP");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/group"),
				expect.objectContaining({
					method: "POST",
					body: expect.stringContaining("name"),
				}),
			);
		});
	});

	describe("list", () => {
		it("fetches and normalizes groups", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => [
					{
						_id: "g_1",
						group_name: "VIP",
						contact_count: 5,
						created_at: "2023-01-01",
						updated_at: "2023-01-01",
					},
				],
			});

			const result = await groups.list();
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0].id).toBe("g_1");
				expect(result.value[0].name).toBe("VIP");
			}
		});
	});

	describe("get", () => {
		it("fetches single group by id", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					id: "g_1",
					name: "Test",
					contact_count: 3,
					created_at: "",
					updated_at: "",
				}),
			});

			const result = await groups.get("g_1");
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.id).toBe("g_1");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/group/g_1"),
				expect.any(Object),
			);
		});
	});

	describe("addContact", () => {
		it("sends a contact payload to /contact/{groupId}", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					status: "success",
					contact: {
						_id: 4,
						phone: "0244698970",
						title: "Dr",
						firstname: "Stephen",
						lastname: "Strange",
						email: "strange.smart@gmail.com",
						dob: "1979-01-01",
					},
				}),
			});

			const result = await groups.addContact("g_1", {
				phone: "0244698970",
				title: "Dr",
				firstname: "Stephen",
				lastname: "Strange",
				email: "strange.smart@gmail.com",
				dob: "1979-01-01",
			});
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/contact/g_1"),
				expect.objectContaining({
					method: "POST",
					body: expect.stringContaining("firstname"),
				}),
			);
		});
	});

	describe("removeContact", () => {
		it("calls DELETE on /contact/{contactId}", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success", message: "Removed" }),
			});

			const result = await groups.removeContact("c_1");
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/contact/c_1"),
				expect.objectContaining({ method: "DELETE" }),
			);
		});
	});

	describe("delete", () => {
		it("calls DELETE on /group/{id}", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success", message: "Deleted" }),
			});

			const result = await groups.delete("g_1");
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/group/g_1"),
				expect.objectContaining({ method: "DELETE" }),
			);
		});
	});
});
