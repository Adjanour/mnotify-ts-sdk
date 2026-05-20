# Function: err()

```ts
function err<T, E>(error): Result<T, E>;
```

Defined in: [result.ts:77](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/result.ts#L77)

Creates a failed Result containing the given error.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `E` |

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>
