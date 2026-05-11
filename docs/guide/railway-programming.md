# Railway-Oriented Programming

This SDK uses **railway-oriented programming** — a functional pattern where every operation returns a `Result` type instead of throwing exceptions.

Think of it as a railway track with two rails:

```
       ┌── success rail ──┐
input ─┤                   ├──> output
       └── failure rail ──┘
```

Operations transform the value along the success rail. If anything fails, execution switches to the failure rail and skips the remaining steps.

## Result Type

```ts
type Result<T, E = Error> = Ok<T, E> | Err<T, E>;
```

### Creating Results

```ts
import { ok, err } from "mnotify-ts-sdk";

const success = ok(42);
const failure = err(new Error("something went wrong"));
```

### Wrapping Throwing Code

```ts
import { tryCatch } from "mnotify-ts-sdk";

const result = tryCatch(
  () => JSON.parse(jsonString),
  (error) => new Error(`Parse failed: ${(error as Error).message}`),
);
```

### Async Wrapping

```ts
import { tryCatchAsync } from "mnotify-ts-sdk";

const result = await tryCatchAsync(
  async () => await fetch("https://api.example.com/data"),
  (error) => new Error(`Fetch failed: ${(error as Error).message}`),
);
```

## Why Result?

| Approach | Pros | Cons |
|----------|------|------|
| Throwing | Familiar | Hidden control flow, easy to forget try/catch |
| Callbacks | Explicit | Callback hell, hard to compose |
| **Result** | Explicit, composable, type-safe | Requires learning the pattern |

Results make error handling **visible in the type system** — you can't accidentally ignore a failure.
