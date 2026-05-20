# Function: tryCatchAsync()

```ts
function tryCatchAsync<T, E>(fn, errorHandler): Promise<Result<T, E>>;
```

Defined in: [result.ts:130](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L130)

Wraps an async function in try/catch, returning a Promise of a Result.
If the function throws or rejects, the error handler is called to produce the error value.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `Promise`\<`T`\> |
| `errorHandler` | (`error`) => `E` |

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`T`, `E`\>\>
