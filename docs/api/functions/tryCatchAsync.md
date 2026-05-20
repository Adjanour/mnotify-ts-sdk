# Function: tryCatchAsync()

```ts
function tryCatchAsync<T, E>(fn, errorHandler): Promise<Result<T, E>>;
```

Defined in: [result.ts:130](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/result.ts#L130)

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
