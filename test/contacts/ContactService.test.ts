import { ContactService } from "../../src/contacts/ContactService";
import { HttpClient } from "../../src/client/HttpClient";

global.fetch = jest.fn();

describe("ContactService (v2 routes)", () => {
  let service: ContactService;

  beforeEach(() => {
    const client = new HttpClient({ apiKey: "test-key", timeout: 10000 });
    service = new ContactService(client);
    jest.clearAllMocks();
  });

  it("should require groupId when creating contact", async () => {
    const result = await service.createContactSafe({
      phone: "233200000000",
      firstname: "John",
      lastname: "Doe",
    });

    expect(result.isErr()).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
    if (result.isErr()) {
      expect(result.error.message).toContain("requires groupId");
      expect(result.error.context?.path).toBe("/contact/{group_id}");
    }
  });

  it("should call /contact/{groupId} to create contact", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        _id: "c_123",
        phone: "233200000000",
        firstname: "John",
        lastname: "Doe",
      }),
    });

    const result = await service.createContactSafe(
      {
        phone: "233200000000",
        firstname: "John",
        lastname: "Doe",
      },
      "group_1",
    );

    expect(result.isOk()).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/contact/group_1"),
      expect.objectContaining({
        method: "POST",
      }),
    );
  });
});
