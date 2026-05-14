# Function: compact()

```ts
function compact<T>(obj): Partial<T>;
```

Defined in: [helpers.ts:34](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/helpers.ts#L34)

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
