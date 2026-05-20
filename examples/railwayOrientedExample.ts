import { MNotify, MNotifyError, combine, err, ok, type Result } from "../dist/index.mjs";

function getClient(): MNotify {
	const apiKey = process.env.MNOTIFY_API_KEY;
	if (!apiKey) {
		throw new Error("MNOTIFY_API_KEY environment variable is required");
	}

	return new MNotify({
		apiKey,
		baseUrl: process.env.MNOTIFY_BASE_URL ?? "https://api.mnotify.com/api",
	});
}

function minimumBalance(required: number) {
	return <T extends { balance: number; currency: string }>(balance: T): Result<T, MNotifyError> => {
		return balance.balance >= required
			? ok(balance)
			: err(
				new MNotifyError(`Need at least ${required} ${balance.currency} to continue.`, 400),
			);
	};
}

async function examplePatternMatching(mnotify: MNotify) {
	console.log("\n=== Pattern Matching ===");

	const result = await mnotify.account.getBalance();
	console.log(
		result.match({
			ok: (balance) => `Balance: ${balance.balance} ${balance.currency}`,
			err: (error) => `Balance lookup failed: ${error.message}`,
		}),
	);
}

async function exampleChaining(mnotify: MNotify) {
	console.log("\n=== Result Chaining ===");

	const result = (await mnotify.account.getBalance())
		.map((balance) => ({
			...balance,
			label: balance.balance > 0 ? "funded" : "empty",
		}))
		.andThen(minimumBalance(1));

	result.match({
		ok: (balance) => console.log(`Account is ${balance.label} with ${balance.balance} ${balance.currency}`),
		err: (error) => console.error(error.message),
	});
}

async function exampleFallbacks(mnotify: MNotify) {
	console.log("\n=== Fallback Values ===");

	const result = await mnotify.account.getBalance();
	const amount = result.map((balance) => balance.balance).unwrapOr(0);
	const formatted = result
		.map((balance) => `${balance.balance} ${balance.currency}`)
		.unwrapOrElse((error) => `fallback used because: ${error.message}`);

	console.log("Amount:", amount);
	console.log("Formatted:", formatted);
}

async function exampleParallelOperations(mnotify: MNotify) {
	console.log("\n=== Parallel Operations ===");

	const senderName = process.env.MNOTIFY_SENDER_ID;
	const tasks = [(await mnotify.account.getBalance()).map((balance) => `Balance: ${balance.balance} ${balance.currency}`)];

	if (senderName) {
		tasks.push(
			(await mnotify.account.checkSender(senderName)).map(
				(sender) => `Sender ${senderName}: ${sender.approval_status ?? sender.status}`,
			),
		);
	}

	const combined = combine(tasks);
	combined.match({
		ok: (values) => {
			console.log("Operations succeeded:", values.length);
			console.log(values);
		},
		err: (error) => {
			console.error("At least one operation failed:", error.message);
		},
	});

	if (!senderName) {
		console.log("Set MNOTIFY_SENDER_ID to also check sender approval status.");
	}
}

async function exampleContactCreation(mnotify: MNotify) {
	console.log("\n=== Contact Creation ===");

	const groupId = process.env.MNOTIFY_GROUP_ID;
	if (!groupId) {
		console.log("Set MNOTIFY_GROUP_ID to run the contact creation example.");
		return;
	}

	const result = await mnotify.contacts.create(
		{
			phone: "233200000000",
			firstname: "John",
			lastname: "Doe",
			email: ["john@example.com"],
		},
		groupId,
	);

	result.match({
		ok: (contact) => console.log("Created contact:", contact),
		err: (error) => console.error("Contact creation failed:", error.message),
	});
}

async function main() {
	const mnotify = getClient();

	console.log("Railway-oriented examples for the current Result-only API");

	await examplePatternMatching(mnotify);
	await exampleChaining(mnotify);
	await exampleFallbacks(mnotify);
	await exampleParallelOperations(mnotify);
	await exampleContactCreation(mnotify);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
