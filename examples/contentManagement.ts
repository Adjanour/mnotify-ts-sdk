import { MNotify } from "../dist/index.mjs";

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`${name} environment variable is required`);
	}
	return value;
}

async function main() {
	const apiKey = requireEnv("MNOTIFY_API_KEY");
	const baseUrl = process.env.MNOTIFY_BASE_URL ?? "https://api.mnotify.com/api";
	const groupName = process.env.MNOTIFY_EXAMPLE_GROUP_NAME ?? `SDK Example ${Date.now()}`;
	const templateName = process.env.MNOTIFY_EXAMPLE_TEMPLATE_NAME ?? `SDK Template ${Date.now()}`;

	const mnotify = new MNotify({ apiKey, baseUrl });

	console.log("Creating a group...");
	const groupResult = await mnotify.groups.create({
		name: groupName,
		description: "Created by the mnotify-ts-sdk content management example.",
	});

	if (groupResult.isErr()) {
		console.error("Group creation failed:", groupResult.error.message);
		process.exitCode = 1;
		return;
	}

	console.log("Created group:", groupResult.value);

	console.log("Listing groups...");
	const groupsResult = await mnotify.groups.list();
	groupsResult.match({
		ok: (groups) => console.log(`Found ${groups.length} groups.`),
		err: (error) => console.error("Group listing failed:", error.message),
	});

	console.log("Creating a template...");
	const templateResult = await mnotify.templates.create({
		name: templateName,
		content: "Hello {{name}}, this is a template created by the SDK example.",
	});

	templateResult.match({
		ok: (template) => console.log("Created template:", template),
		err: (error) => {
			console.error("Template creation failed:", error.message);
			process.exitCode = 1;
		},
	});

	if (templateResult.isErr()) {
		return;
	}

	console.log("Fetching the template we just created...");
	const fetchedTemplateResult = await mnotify.templates.get(templateResult.value.id);
	fetchedTemplateResult.match({
		ok: (template) => console.log("Fetched template:", template),
		err: (error) => console.error("Template lookup failed:", error.message),
	});

	console.log("Tip: delete test data manually if you do not want to keep it.");
	console.log(`Group ID: ${groupResult.value.id}`);
	console.log(`Template ID: ${templateResult.value.id}`);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
