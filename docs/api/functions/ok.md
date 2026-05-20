# Function: ok()

```ts
function ok<T, E>(value): Result<T, E>;
```

Defined in: [result.ts:42](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/result.ts#L42)

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
