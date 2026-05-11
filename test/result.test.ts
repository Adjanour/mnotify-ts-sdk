import { type Result, combine, err, ok, tryCatch, tryCatchAsync } from "../src/result.js";

describe("Result", () => {
	describe("ok", () => {
		it("creates a successful Result", () => {
			const result = ok(42);
			expect(result.isOk()).toBe(true);
			expect(result.isErr()).toBe(false);
			expect(result.unwrap()).toBe(42);
		});

		it("maps over ok values", () => {
			const result = ok(42).map((x) => x * 2);
			expect(result.unwrap()).toBe(84);
		});

		it("chains operations with andThen", () => {
			const result = ok(42).andThen((x) => ok(x * 2));
			expect(result.unwrap()).toBe(84);
		});

		it("pattern matches on ok", () => {
			const result = ok(42);
			const value = result.match({ ok: (v) => v * 2, err: () => 0 });
			expect(value).toBe(84);
		});

		it("returns value with unwrapOr", () => {
			const result = ok(42);
			expect(result.unwrapOr(100)).toBe(42);
		});

		it("returns value with unwrapOrElse", () => {
			const result = ok(42);
			expect(result.unwrapOrElse(() => 100)).toBe(42);
		});

		it("mapErr is a no-op on ok", () => {
			const result = ok(42).mapErr(() => new Error("mapped"));
			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(42);
		});
	});

	describe("err", () => {
		it("creates an error Result", () => {
			const error = new Error("test");
			const result = err(error);
			expect(result.isOk()).toBe(false);
			expect(result.isErr()).toBe(true);
		});

		it("throws on unwrap", () => {
			const error = new Error("test");
			const result = err(error);
			expect(() => result.unwrap()).toThrow("test");
		});

		it("does not map over err values", () => {
			const result = err(new Error("test")) as Result<number, Error>;
			const mapped = result.map((x) => x * 2);
			expect(mapped.isErr()).toBe(true);
		});

		it("pattern matches on err", () => {
			const result = err<number, Error>(new Error("test"));
			const value = result.match<number | string>({ ok: () => 42, err: (e) => e.message });
			expect(value).toBe("test");
		});

		it("returns default with unwrapOr", () => {
			const result = err(new Error("test"));
			expect(result.unwrapOr(100)).toBe(100);
		});

		it("computes default with unwrapOrElse", () => {
			const result = err(new Error("test"));
			expect(result.unwrapOrElse((e) => e.message.length)).toBe(4);
		});

		it("mapErr transforms the error", () => {
			const result = err(new Error("original"));
			const mapped = result.mapErr((e) => new Error(`mapped: ${e.message}`));
			expect(mapped.isErr()).toBe(true);
			if (mapped.isErr()) {
				expect(mapped.error.message).toBe("mapped: original");
			}
		});
	});

	describe("tryCatch", () => {
		it("catches thrown errors", () => {
			const result = tryCatch(
				() => {
					throw new Error("test");
				},
				(e) => e as Error,
			);
			expect(result.isErr()).toBe(true);
		});

		it("returns ok for successful operations", () => {
			const result = tryCatch(
				() => 42,
				(e) => e as Error,
			);
			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(42);
		});

		it("uses error handler", () => {
			const result = tryCatch(
				() => {
					throw new Error("test");
				},
				(e) => new Error(`Caught: ${(e as Error).message}`),
			);
			expect(result.isErr()).toBe(true);
			if (result.isErr()) {
				expect(result.error.message).toBe("Caught: test");
			}
		});
	});

	describe("tryCatchAsync", () => {
		it("catches async errors", async () => {
			const result = await tryCatchAsync(
				async () => {
					throw new Error("async error");
				},
				(e) => e as Error,
			);
			expect(result.isErr()).toBe(true);
		});

		it("returns ok for successful async operations", async () => {
			const result = await tryCatchAsync(
				async () => 42,
				(e) => e as Error,
			);
			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(42);
		});
	});

	describe("combine", () => {
		it("combines all ok results", () => {
			const results = [ok(1), ok(2), ok(3)];
			const combined = combine(results);
			expect(combined.isOk()).toBe(true);
			expect(combined.unwrap()).toEqual([1, 2, 3]);
		});

		it("returns first error", () => {
			const results: Result<number, Error>[] = [ok(1), err(new Error("e1")), err(new Error("e2"))];
			const combined = combine(results);
			expect(combined.isErr()).toBe(true);
			if (combined.isErr()) {
				expect(combined.error.message).toBe("e1");
			}
		});

		it("handles empty array", () => {
			const results: Result<number, Error>[] = [];
			const combined = combine(results);
			expect(combined.isOk()).toBe(true);
			expect(combined.unwrap()).toEqual([]);
		});
	});
});
