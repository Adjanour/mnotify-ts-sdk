# Type Alias: Result\<T, E\>

```ts
type Result<T, E> = 
  | Ok<T, E>
| Err<T, E>;
```

Defined in: [result.ts:9](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/result.ts#L9)

Represents the outcome of an operation that can succeed or fail.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |
