import { Contacts } from "../src/contacts.js";
import { HttpClient } from "../src/http.js";

global.fetch = jest.fn() as jest.Mock;

describe("Contacts", () => {
	let contacts: Contacts;

	beforeEach(() => {
		contacts = new Contacts(new HttpClient({ apiKey: "test-key", timeout: 10000 }));
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("requires groupId", async () => {
			const result = await contacts.create(
				{ phone: "233200000000", firstname: "John", lastname: "Doe" },
				"",
			);
			expect(result.isErr()).toBe(true);
			expect(global.fetch).not.toHaveBeenCalled();
			if (result.isErr()) {
				expect(result.error.message).toContain("requires groupId");
			}
		});

		it("calls /contact/{groupId} with POST", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					_id: "c_123",
					phone: "233200000000",
					firstname: "John",
					lastname: "Doe",
				}),
			});

			const result = await contacts.create(
				{ phone: "233200000000", firstname: "John", lastname: "Doe" },
				"group_1",
			);
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.id).toBe("c_123");
				expect(result.value.phone).toBe("233200000000");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/contact/group_1"),
				expect.objectContaining({ method: "POST" }),
			);
		});
	});

	describe("list", () => {
		it("fetches contacts array", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => [
					{ _id: "c_1", phone: "233200000000", firstname: "A", lastname: "B" },
					{ _id: "c_2", phone: "233200000001", firstname: "C", lastname: "D" },
				],
			});

			const result = await contacts.list();
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value).toHaveLength(2);
				expect(result.value[0].id).toBe("c_1");
			}
		});

		it("returns error for non-array response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ not: "an array" }),
			});

			const result = await contacts.list();
			expect(result.isErr()).toBe(true);
		});
	});
});
