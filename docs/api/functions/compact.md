# Function: compact()

```ts
function compact<T>(obj): Partial<T>;
```

Defined in: [helpers.ts:34](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/helpers.ts#L34)

Removes null and undefined values from an object, returning a partial copy.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Record`\<`string`, `unknown`\> |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `T` |

## Returns

`Partial`\<`T`\>
