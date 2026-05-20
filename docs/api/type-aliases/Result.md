# Type Alias: Result\<T, E\>

```ts
type Result<T, E> = 
  | Ok<T, E>
| Err<T, E>;
```

Defined in: [result.ts:9](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L9)

Represents the outcome of an operation that can succeed or fail.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |
