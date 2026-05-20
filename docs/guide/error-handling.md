# Error Handling

Every method returns a `Result<T, MNotifyError>` — you never need to catch exceptions.

## Pattern Matching

The `match` method handles both cases inline:

```ts
const result = await mnotify.sms.send({ ... });

const message = result.match({
  ok: (res) => `Sent! Campaign: ${res.summary._id}`,
  err: (err) => `Failed: ${err.message}`,
});
```

## Guarding

Use `isOk()` / `isErr()` for conditional branches:

```ts
const result = await mnotify.account.getBalance();

if (result.isOk()) {
  console.log(result.value.balance); // safe access
}

if (result.isErr()) {
  console.error(result.error.message);
  console.error(result.error.statusCode); // HTTP status
  console.error(result.error.context); // request metadata
}
```

## Unwrapping (when you want to throw)

```ts
const balance = (await mnotify.account.getBalance()).unwrap();
// throws MNotifyError on failure
```

## The MNotifyError

```ts
class MNotifyError extends Error {
  statusCode: number;    // HTTP status or 0 for validation
  data?: unknown;        // Raw API error response
  context?: {            // Request metadata
    service: string;
    operation: string;
    stage: "request" | "validation" | "response" | "network";
    method?: string;
    path?: string;
    url?: string;
    retryCount?: number;
  };
  cause?: unknown;       // Original error (if wrapped)
}
```

## Chaining with Result

```ts
import { ok, err, tryCatch, combine } from "mnotify-ts-sdk";

// Chain operations — short-circuits on error
const final = await result
  .map((data) => transform(data))
  .andThen((transformed) => doMoreWork(transformed));

// Combine multiple results
const all = combine([result1, result2, result3]);
// all.isOk() only if every result is Ok
```
