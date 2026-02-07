import { ok, err, tryCatch, tryCatchAsync, combine, Result } from '../../src/types/Result';

describe('Result Type', () => {
  describe('ok', () => {
    it('should create a successful Result', () => {
      const result = ok(42);
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
      expect(result.unwrap()).toBe(42);
    });

    it('should map over ok values', () => {
      const result = ok(42).map(x => x * 2);
      expect(result.unwrap()).toBe(84);
    });

    it('should chain operations with andThen', () => {
      const result = ok(42).andThen(x => ok(x * 2));
      expect(result.unwrap()).toBe(84);
    });

    it('should pattern match on ok', () => {
      const result = ok(42);
      const value = result.match({
        ok: (v) => v * 2,
        err: () => 0
      });
      expect(value).toBe(84);
    });

    it('should return value with unwrapOr', () => {
      const result = ok(42);
      expect(result.unwrapOr(100)).toBe(42);
    });
  });

  describe('err', () => {
    it('should create an error Result', () => {
      const error = new Error('test error');
      const result = err(error);
      expect(result.isOk()).toBe(false);
      expect(result.isErr()).toBe(true);
    });

    it('should throw on unwrap', () => {
      const error = new Error('test error');
      const result = err(error);
      expect(() => result.unwrap()).toThrow('test error');
    });

    it('should not map over err values', () => {
      const error = new Error('test error');
      const result: Result<number, Error> = err(error);
      const mapped = result.map(x => x * 2);
      expect(mapped.isErr()).toBe(true);
    });

    it('should pattern match on err', () => {
      const error = new Error('test error');
      const result = err(error);
      const value = result.match({
        ok: () => 42,
        err: (e) => e.message
      });
      expect(value).toBe('test error');
    });

    it('should return default with unwrapOr', () => {
      const error = new Error('test error');
      const result = err(error);
      expect(result.unwrapOr(100)).toBe(100);
    });

    it('should compute default with unwrapOrElse', () => {
      const error = new Error('test error');
      const result = err(error);
      expect(result.unwrapOrElse((e) => e.message.length)).toBe(10);
    });
  });

  describe('tryCatch', () => {
    it('should catch thrown errors', () => {
      const result = tryCatch(() => {
        throw new Error('test error');
      });
      expect(result.isErr()).toBe(true);
    });

    it('should return ok for successful operations', () => {
      const result = tryCatch(() => 42);
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it('should use error handler', () => {
      const result = tryCatch(
        () => { throw new Error('test'); },
        (e) => new Error(`Caught: ${(e as Error).message}`)
      );
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toBe('Caught: test');
      }
    });
  });

  describe('tryCatchAsync', () => {
    it('should catch async errors', async () => {
      const result = await tryCatchAsync(async () => {
        throw new Error('async error');
      });
      expect(result.isErr()).toBe(true);
    });

    it('should return ok for successful async operations', async () => {
      const result = await tryCatchAsync(async () => 42);
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });
  });

  describe('combine', () => {
    it('should combine all ok results', () => {
      const results = [ok(1), ok(2), ok(3)];
      const combined = combine(results);
      expect(combined.isOk()).toBe(true);
      expect(combined.unwrap()).toEqual([1, 2, 3]);
    });

    it('should return first error', () => {
      const error1 = new Error('error 1');
      const error2 = new Error('error 2');
      const results: Result<number, Error>[] = [ok(1), err(error1), err(error2)];
      const combined = combine(results);
      expect(combined.isErr()).toBe(true);
      if (combined.isErr()) {
        expect(combined.error).toBe(error1);
      }
    });

    it('should handle empty array', () => {
      const results: Result<number, Error>[] = [];
      const combined = combine(results);
      expect(combined.isOk()).toBe(true);
      expect(combined.unwrap()).toEqual([]);
    });
  });

  describe('mapErr', () => {
    it('should map error values', () => {
      const result: Result<number, Error> = err(new Error('original'));
      const mapped = result.mapErr(e => new Error(`Mapped: ${e.message}`));
      expect(mapped.isErr()).toBe(true);
      if (mapped.isErr()) {
        expect(mapped.error.message).toBe('Mapped: original');
      }
    });

    it('should not affect ok values', () => {
      const result: Result<number, Error> = ok(42);
      const mapped = result.mapErr(e => new Error(`Mapped: ${e.message}`));
      expect(mapped.isOk()).toBe(true);
      expect(mapped.unwrap()).toBe(42);
    });
  });
});
