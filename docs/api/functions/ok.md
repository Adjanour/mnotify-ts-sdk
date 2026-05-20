# Function: ok()

```ts
function ok<T, E>(value): Result<T, E>;
```

Defined in: [result.ts:42](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/result.ts#L42)

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
