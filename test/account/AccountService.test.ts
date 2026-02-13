import { AccountService } from "../../src/account/AccountService";
import { HttpClient } from "../../src/client/HttpClient";

global.fetch = jest.fn();

describe("AccountService (v2 routes)", () => {
  let service: AccountService;

  beforeEach(() => {
    const client = new HttpClient({ apiKey: "test-key", timeout: 10000 });
    service = new AccountService(client);
    jest.clearAllMocks();
  });

  it("should return an explicit error for getSenderIdsSafe in v2", async () => {
    const result = await service.getSenderIdsSafe();

    expect(result.isErr()).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
    if (result.isErr()) {
      expect(result.error.message).toContain(
        "does not provide a sender list endpoint",
      );
      expect(result.error.context?.path).toBe("/senderid/status");
    }
  });

  it("should call /senderid/register with v2 payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: "success", message: "registered" }),
    });

    const result = await service.registerSenderIdSafe("MyApp", ["promo"]);
    expect(result.isOk()).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/senderid/register"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          sender_name: "MyApp",
          purpose: ["promo"],
        }),
      }),
    );
  });

  it("should call /senderid/status with sender_name", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: "success", approval_status: "approved" }),
    });

    const result = await service.checkSenderIdStatusSafe("MyApp");
    expect(result.isOk()).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/senderid/status"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          sender_name: "MyApp",
        }),
      }),
    );
  });
});
