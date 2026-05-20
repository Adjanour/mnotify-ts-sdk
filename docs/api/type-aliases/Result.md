# Type Alias: Result\<T, E\>

```ts
type Result<T, E> = 
  | Ok<T, E>
| Err<T, E>;
```

Defined in: [result.ts:9](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/result.ts#L9)

Represents the outcome of an operation that can succeed or fail.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |
