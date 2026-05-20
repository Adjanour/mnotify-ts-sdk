# Function: ok()

```ts
function ok<T, E>(value): Result<T, E>;
```

Defined in: [result.ts:42](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/result.ts#L42)

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
