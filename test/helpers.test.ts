import { chunk, compact, isValidPhone, normalizePhone, toArray } from "../src/helpers.js";

describe("helpers", () => {
	describe("toArray", () => {
		it("converts a single value to an array", () => {
			expect(toArray("hello")).toEqual(["hello"]);
			expect(toArray(42)).toEqual([42]);
		});

		it("returns array as is", () => {
			expect(toArray(["a", "b"])).toEqual(["a", "b"]);
		});
	});

	describe("normalizePhone", () => {
		it("removes non-digit characters", () => {
			expect(normalizePhone("+233-20-000-0000")).toBe("233200000000");
		});

		it("replaces leading 0 with country code", () => {
			expect(normalizePhone("0200000000")).toBe("233200000000");
		});

		it("keeps international format", () => {
			expect(normalizePhone("233200000000")).toBe("233200000000");
		});
	});

	describe("isValidPhone", () => {
		it("validates correct phone numbers", () => {
			expect(isValidPhone("233200000000")).toBe(true);
			expect(isValidPhone("0200000000")).toBe(true);
			expect(isValidPhone("+233200000000")).toBe(true);
		});

		it("rejects invalid phone numbers", () => {
			expect(isValidPhone("123")).toBe(false);
			expect(isValidPhone("")).toBe(false);
		});
	});

	describe("chunk", () => {
		it("splits array into chunks", () => {
			expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
		});

		it("handles empty array", () => {
			expect(chunk([], 3)).toEqual([]);
		});

		it("handles chunk size larger than array", () => {
			expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
		});
	});

	describe("compact", () => {
		it("removes null and undefined values", () => {
			const obj = { a: 1, b: null, c: undefined, d: "hello", e: 0, f: false };
			expect(compact(obj)).toEqual({ a: 1, d: "hello", e: 0, f: false });
		});
	});
});
