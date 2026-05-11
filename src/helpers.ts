/**
 * Utility helpers for data manipulation.
 *
 * Provides functions for array coercion, phone number normalization,
 * phone validation, chunking, and object compaction.
 */

/** Wraps a value in an array if it is not already an array. */
export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}

/** Normalizes a phone number by stripping non-digit characters and converting leading 0 to 233 country code. */
export function normalizePhone(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	return digits.startsWith("0") ? `233${digits.slice(1)}` : digits;
}

/** Returns true if the phone number is between 10 and 15 digits after normalization. */
export function isValidPhone(phone: string): boolean {
	return /^\d{10,15}$/.test(normalizePhone(phone));
}

/** Splits an array into chunks of the specified size. */
export function chunk<T>(array: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}

/** Removes null and undefined values from an object, returning a partial copy. */
export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
	const result: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null && value !== undefined) {
			result[key] = value;
		}
	}
	return result as Partial<T>;
}
