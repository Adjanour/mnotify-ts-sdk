# Type Alias: Result\<T, E\>

```ts
type Result<T, E> = 
  | Ok<T, E>
| Err<T, E>;
```

Defined in: [result.ts:9](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/result.ts#L9)

Represents the outcome of an operation that can succeed or fail.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `Error` |
