import { MNotify } from "../dist/index.mjs";
import { exitWithError, getApiKeyForExample, getEnv, isSmokeMode, setFailureExitCode } from "./runtime.ts";

async function main() {
	const apiKey = getApiKeyForExample();
	const sender = getEnv("MNOTIFY_SMS_SENDER") ?? getEnv("MNOTIFY_SENDER_ID") ?? (isSmokeMode() ? "SMOKE" : undefined);
	const recipient = getEnv("MNOTIFY_SMS_RECIPIENT") ?? "233200000000";
	const baseUrl = getEnv("MNOTIFY_BASE_URL") ?? "https://api.mnotify.com/api";

	if (!sender) {
		throw new Error(
			"Set MNOTIFY_SMS_SENDER or MNOTIFY_SENDER_ID to an approved sender ID before running this example.",
		);
	}

	const mnotify = new MNotify({ apiKey, baseUrl });

	if (isSmokeMode()) {
		console.log("Smoke mode: constructed client and validated SMS example configuration.");
		console.log({ sender, recipient, baseUrl });
		return;
	}

	console.log(`Sending SMS to ${recipient} with sender ${sender}...`);

	const sendResult = await mnotify.sms.send({
		recipient,
		sender,
		message: "Hello from the mNotify TypeScript SDK.",
	});

	sendResult.match({
		ok: (response) => {
			console.log("Send succeeded:", response.summary);
		},
		err: (error) => {
			console.error("Send failed:", {
				message: error.message,
				statusCode: error.statusCode,
				context: error.context,
			});
		},
	});

	const balanceResult = await mnotify.account.getBalance();
	balanceResult.match({
		ok: (balance) => {
			console.log(`Balance: ${balance.balance} ${balance.currency}`);
		},
		err: (error) => {
			console.error("Balance check failed:", error.message);
		},
	});

	if (sendResult.isErr()) {
		setFailureExitCode();
		return;
	}

	const campaignId = sendResult.value.summary._id;
	console.log(`Checking delivery status for campaign ${campaignId}...`);

	const statusResult = await mnotify.sms.getStatus(campaignId);
	statusResult.match({
		ok: (status) => {
			console.log("Delivery report status:", status.status);
			console.log("Delivery report entries:", status.report.length);
		},
		err: (error) => {
			console.error("Delivery status check failed:", error.message);
		},
	});
}

main().catch((error) => {
	exitWithError(error);
});
