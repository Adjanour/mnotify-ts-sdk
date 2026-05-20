# Function: tryCatch()

```ts
function tryCatch<T, E>(fn, errorHandler): Result<T, E>;
```

Defined in: [result.ts:115](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/result.ts#L115)

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
