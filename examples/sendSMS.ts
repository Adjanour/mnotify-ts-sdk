import { MNotify } from "../src";

/**
 * Example usage of the mNotify SDK
 *
 * To run this example:
 * 1. Set your API key as an environment variable:
 *    export MNOTIFY_API_KEY=your_api_key_here
 * 2. Run with ts-node:
 *    npm run example:sms
 */
async function main() {
  const apiKey = process.env.MNOTIFY_API_KEY;
  const baseUrl = process.env.MNOTIFY_BASE_URL || "https://api.mnotify.com/api";
  const sender =
    process.env.MNOTIFY_SMS_SENDER || process.env.MNOTIFY_SENDER_ID;
  const recipient = process.env.MNOTIFY_SMS_RECIPIENT || "233595661863";

  if (!apiKey) {
    throw new Error("MNOTIFY_API_KEY environment variable is required");
  }
  if (!sender) {
    throw new Error(
      "MNOTIFY_SMS_SENDER (or MNOTIFY_SENDER_ID) environment variable is required",
    );
  }

  // Initialize the SDK with your API key
  const mnotify = new MNotify({ apiKey, baseUrl });

  console.log(
    `Config: baseUrl=${baseUrl}, sender=${sender}, recipient=${recipient}`,
  );

  try {
    // Example 1: Send SMS
    console.log("Sending SMS...");
    const smsResponse = await mnotify.sms.sendQuickBulkSMS({
      recipient: [recipient],
      sender,
      message: "Hello from mNotify SDK!",
    });
    console.log("SMS sent successfully:", smsResponse.summary);

    // Example 2: Check balance
    console.log("\nChecking account balance...");
    const balance = await mnotify.account.getBalance();
    console.log("Account balance:", balance);

    // Example 3: Create contact (optional; requires group id in v2)
    const groupId = process.env.MNOTIFY_GROUP_ID;
    if (groupId) {
      console.log("\nCreating contact...");
      const contact = await mnotify.contacts.createContact(
        {
          phone: "233200000000",
          firstname: "John",
          lastname: "Doe",
        },
        groupId,
      );
      console.log("Contact created:", contact);
    } else {
      console.log(
        "\nSkipping contact creation (set MNOTIFY_GROUP_ID to enable).",
      );
    }

    // Example 4: Check delivery status after a delay
    setTimeout(async () => {
      console.log("\nChecking delivery status...");
      const status = await mnotify.sms.getSMSStatus(smsResponse.summary._id);
      console.log("Delivery status:", status.report);
    }, 5000);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
