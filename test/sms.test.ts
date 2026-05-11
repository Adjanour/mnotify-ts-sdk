import { HttpClient } from "../src/http.js";
import { SMS } from "../src/sms.js";
import type { SendSMSResponse } from "../src/types.js";

global.fetch = jest.fn() as jest.Mock;

describe("SMS", () => {
	let sms: SMS;

	beforeEach(() => {
		sms = new SMS(new HttpClient({ apiKey: "test-key", timeout: 10000 }));
		jest.clearAllMocks();
	});

	describe("send", () => {
		it("sends SMS with single recipient wrapped in array", async () => {
			const mockResponse: SendSMSResponse = {
				status: "success",
				code: "200",
				message: "Message sent",
				summary: {
					_id: "123",
					message_id: "msg_123",
					type: "sms",
					total_sent: 1,
					contacts: 1,
					total_rejected: 0,
					numbers_sent: ["233200000000"],
					credit_used: 1,
					credit_left: 99,
				},
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await sms.send({
				recipient: "233200000000",
				sender: "Test",
				message: "Hello",
			});

			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value).toEqual(mockResponse);
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/sms/quick"),
				expect.objectContaining({
					method: "POST",
					headers: expect.objectContaining({ Authorization: "test-key" }),
					body: JSON.stringify({
						recipient: ["233200000000"],
						sender: "Test",
						message: "Hello",
						is_schedule: false,
						schedule_date: "",
					}),
				}),
			);
		});

		it("preserves /api path segment in custom baseUrl", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					status: "success",
					code: "200",
					message: "ok",
					summary: {
						_id: "1",
						message_id: "m1",
						type: "sms",
						total_sent: 1,
						contacts: 1,
						total_rejected: 0,
						numbers_sent: [],
						credit_used: 1,
						credit_left: 99,
					},
				}),
			});

			const customSms = new SMS(
				new HttpClient({ apiKey: "test-key", baseUrl: "https://api.mnotify.com/api" }),
			);
			await customSms.send({ recipient: "233200000000", sender: "Test", message: "Hello" });
			const requestUrl = String((global.fetch as jest.Mock).mock.calls[0][0]);
			expect(requestUrl).toContain("/api/sms/quick");
		});

		it("returns error for invalid API response", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({ status: "success" }),
			});

			const result = await sms.send({
				recipient: "233200000000",
				sender: "Test",
				message: "Hello",
			});
			expect(result.isErr()).toBe(true);
			if (result.isErr()) {
				expect(result.error.message).toContain("Invalid SMS");
			}
		});

		it("surfaces request context on API error", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: "Not Found",
				json: async () => ({ message: "Route not found" }),
			});

			const result = await sms.send({
				recipient: "233200000000",
				sender: "Test",
				message: "Hello",
			});
			expect(result.isErr()).toBe(true);
			if (result.isErr()) {
				expect(result.error.context).toMatchObject({
					service: "SMS",
					operation: "send",
					method: "POST",
					path: "/sms/quick",
				});
			}
		});
	});

	describe("getStatus", () => {
		it("fetches campaign delivery report", async () => {
			const mockResponse = {
				status: "success",
				report: [
					{
						_id: 1,
						recipient: "233200000000",
						message: "Hello",
						sender: "Test",
						status: "delivered",
						date_sent: "2023-01-01T00:00:00Z",
						retries: 0,
					},
				],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await sms.getStatus("camp_123");
			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value).toEqual(mockResponse);
			}
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/campaign/camp_123/null"),
				expect.any(Object),
			);
		});
	});
});
