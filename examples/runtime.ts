type RuntimeGlobals = typeof globalThis & {
	process?: {
		env?: Record<string, string | undefined>;
		exitCode?: number;
	};
	Deno?: {
		env: {
			get(name: string): string | undefined;
		};
		exit(code?: number): never;
	};
};

const runtime = globalThis as RuntimeGlobals;

export function getEnv(name: string): string | undefined {
	const processValue = runtime.process?.env?.[name];
	if (typeof processValue === "string") return processValue;
	return runtime.Deno?.env.get(name);
}

export function requireEnv(name: string): string {
	const value = getEnv(name);
	if (!value) {
		throw new Error(`${name} environment variable is required`);
	}
	return value;
}

export function isSmokeMode(): boolean {
	return getEnv("MNOTIFY_EXAMPLE_MODE") === "smoke";
}

export function getApiKeyForExample(): string {
	return getEnv("MNOTIFY_API_KEY") ?? (isSmokeMode() ? "smoke-api-key" : requireEnv("MNOTIFY_API_KEY"));
}

export function setFailureExitCode(): void {
	if (runtime.process) {
		runtime.process.exitCode = 1;
	}
}

export function exitWithError(error: unknown): void {
	console.error(error instanceof Error ? error.message : error);
	if (runtime.Deno) {
		runtime.Deno.exit(1);
	}
	setFailureExitCode();
}
