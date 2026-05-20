# Function: ok()

```ts
function ok<T, E>(value): Result<T, E>;
```

Defined in: [result.ts:42](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L42)

Creates a successful Result wrapping the given value.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

## Returns

[`Result`](../type-aliases/Result.md)\<`T`, `E`\>
