import { Account } from "../src/account.js";
import { HttpClient } from "../src/http.js";

global.fetch = jest.fn() as jest.Mock;

describe("Account", () => {
	let account: Account;

	beforeEach(() => {
		account = new Account(new HttpClient({ apiKey: "test-key", timeout: 10000 }));
		jest.clearAllMocks();
	});

	describe("getBalance", () => {
		it("fetches balance from API", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ balance: 100.5, currency: "GHS" }),
			});

			const result = await account.getBalance();
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.balance).toBe(100.5);
				expect(result.value.currency).toBe("GHS");
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/balance/sms"),
				expect.any(Object),
			);
		});

		it("returns error for invalid balance response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ balance: "not-a-number" }),
			});

			const result = await account.getBalance();
			expect(result.isErr()).toBe(true);
		});
	});

	describe("registerSender", () => {
		it("calls /senderid/register with sender_name and purpose", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success", message: "registered" }),
			});

			const result = await account.registerSender("MyApp", ["promo"]);
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/senderid/register"),
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({ sender_name: "MyApp", purpose: ["promo"] }),
				}),
			);
		});
	});

	describe("checkSender", () => {
		it("calls /senderid/status with sender_name", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success", approval_status: "approved" }),
			});

			const result = await account.checkSender("MyApp");
			expect(result.isOk()).toBe(true);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/senderid/status"),
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({ sender_name: "MyApp" }),
				}),
			);
		});
	});
});
