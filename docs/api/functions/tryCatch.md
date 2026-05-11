# Function: tryCatch()

```ts
function tryCatch<T, E>(fn, errorHandler): Result<T, E>;
```

Defined in: result.ts:99

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
