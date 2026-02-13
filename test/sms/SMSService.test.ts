import { SMSService, type SendSMSResponse } from "../../src/sms/SMSService";
import { HttpClient } from "../../src/client/HttpClient";

// Mock fetch globally
global.fetch = jest.fn();

describe("SMSService", () => {
  let service: SMSService;
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({ apiKey: "test-key", timeout: 10000 });
    service = new SMSService(client);
    jest.clearAllMocks();
  });

  describe("sendQuickBulkSMS", () => {
    it("should format single recipient as array and make proper API call", async () => {
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

      const result = await service.sendQuickBulkSMS({
        recipient: "233200000000",
        sender: "Test",
        message: "Hello",
      });

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/sms/quick"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "test-key",
            "Content-Type": "application/json",
          }),
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

    it("should preserve /api when a custom baseUrl includes a path segment", async () => {
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

      client = new HttpClient({
        apiKey: "test-key",
        baseUrl: "https://api.mnotify.com/api",
      });
      service = new SMSService(client);

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await service.sendQuickBulkSMS({
        recipient: "233200000000",
        sender: "Test",
        message: "Hello",
      });

      const requestUrl = String((global.fetch as jest.Mock).mock.calls[0][0]);
      expect(requestUrl).toContain("/api/sms/quick");
      expect(requestUrl).toContain("key=test-key");
    });

    it("should handle API errors properly", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: async () => ({
          status: "error",
          code: "400",
          message: "Invalid sender ID",
        }),
      });

      await expect(
        service.sendQuickBulkSMS({
          recipient: "233200000000",
          sender: "Invalid",
          message: "Hello",
        }),
      ).rejects.toThrow("Invalid sender ID");
    });

    it("should surface request context in safe-mode errors", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({
          message: "Route not found",
        }),
      });

      const result = await service.sendQuickBulkSMSSafe({
        recipient: "233200000000",
        sender: "Test",
        message: "Hello",
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.context).toMatchObject({
          service: "SMSService",
          operation: "sendQuickBulkSMSSafe",
          method: "POST",
          path: "/sms/quick",
        });
      }
    });

    it("should surface validation context for invalid API response shape", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "success",
          code: "200",
          message: "ok",
        }),
      });

      const result = await service.sendQuickBulkSMSSafe({
        recipient: "233200000000",
        sender: "Test",
        message: "Hello",
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toBe("Invalid SMS response format");
        expect(result.error.context).toMatchObject({
          service: "SMSService",
          operation: "sendQuickBulkSMSSafe",
          stage: "validation",
        });
      }
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

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await service.getSMSStatus("camp_123");
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/campaign/camp_123/null"),
        expect.any(Object),
      );
    });
  });
});
