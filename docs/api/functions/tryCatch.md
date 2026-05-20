# Function: tryCatch()

```ts
function tryCatch<T, E>(fn, errorHandler): Result<T, E>;
```

Defined in: [result.ts:115](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L115)

Wraps a synchronous function in try/catch, returning a Result.
If the function throws, the error handler is called to produce the error value.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `T` |
| `errorHandler` | (`error`) => `E` |

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>
