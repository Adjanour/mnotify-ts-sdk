export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}

export function normalizePhone(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	return digits.startsWith("0") ? `233${digits.slice(1)}` : digits;
}

export function isValidPhone(phone: string): boolean {
	return /^\d{10,15}$/.test(normalizePhone(phone));
}

export function chunk<T>(array: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}

export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
	const result: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null && value !== undefined) {
			result[key] = value;
		}
	}
	return result as Partial<T>;
}
