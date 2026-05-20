# Function: combine()

```ts
function combine<T, E>(results): Result<T[], E>;
```

Defined in: [result.ts:145](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L145)

Combines an array of Results into a single Result containing an array of values.
Returns the first error encountered, or an array of all values if all Results are Ok.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `E` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `results` | [`Result`](../type-aliases/Result.md)\<`T`, `E`\>[] |

## Returns

[`Result`](../type-aliases/Result.md)\<`T`[], `E`\>
