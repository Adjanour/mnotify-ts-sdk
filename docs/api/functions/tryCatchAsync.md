# Function: tryCatchAsync()

```ts
function tryCatchAsync<T, E>(fn, errorHandler): Promise<Result<T, E>>;
```

Defined in: result.ts:110

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
