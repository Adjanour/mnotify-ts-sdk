import { SMSService } from "../../src/sms/SMSService";
import { MNotifyClient } from "../../src/client/MNotifyClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SendSMSResponseSchema } from "../../src/sms/SMSService";

describe("SMSService", () => {
	let service: SMSService;
	let mockAxios: MockAdapter;
	let client: MNotifyClient;

	beforeEach(() => {
		client = new MNotifyClient({ apiKey: "test-key",timeout:10000 });
		service = new SMSService(client);
		mockAxios = new MockAdapter(client.axiosInstance); // This mocks the actual axios instance
	});

	afterEach(() => {
		mockAxios.restore();
		jest.clearAllMocks();
	});

	describe("sendQuickBulkSMS", () => {
		it("should format single recipient as array and make proper API call", async () => {
			// Mock the successful API response
			const mockResponse = {
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

			mockAxios
				.onPost("https://api.mnotify.com/api/sms/quick")
				.reply(200, mockResponse);

			const result = await service.sendQuickBulkSMS({
				recipient: "233200000000",
				sender: "Test",
				message: "Hello",
			});

			// Verify the parsed response
			expect(SendSMSResponseSchema.parse(result)).toEqual(mockResponse);

			// Verify the request payload
			expect(mockAxios.history.post[0].data).toEqual(
				JSON.stringify({
					recipient: ["233200000000"],
					sender: "Test",
					message: "Hello",
					is_schedule: false,
					schedule_date: "",
				}),
			);
		});

		it("should handle API errors properly", async () => {
			// Mock a failed API response
			mockAxios.onPost("https://api.mnotify.com/api/sms/quick").reply(400, {
				status: "error",
				code: "400",
				message: "Invalid sender ID",
			});

			await expect(
				service.sendQuickBulkSMS({
					recipient: "233200000000",
					sender: "Invalid",
					message: "Hello",
				}),
			).rejects.toThrow("Invalid sender ID");
		});
	});

	describe("getSMSStatus", () => {
		it("should fetch campaign status correctly", async () => {
			const mockResponse = {
				status: "success",
				report: [
					{
						_id: 1,
						recipient: "233200000000",
						message: "Hello",
						sender: "Test",
						status: "delivered",
						date_sent: "2023-08-20T12:00:00Z",
						campaign_id: "camp_123",
						retries: 1,
					},
				],
			};

			mockAxios
				.onGet("https://api.mnotify.com/api/campaign/camp_123/null")
				.reply(200, mockResponse);

			const result = await service.getSMSStatus("camp_123");
			expect(result).toEqual(mockResponse);
		});
	});
});