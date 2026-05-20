# Class: MNotifyError

Defined in: [errors.ts:31](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L31)

Structured error representing an mNotify API failure.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new MNotifyError(
   message, 
   statusCode, 
   data?, 
   context?, 
   cause?): MNotifyError;
```

Defined in: [errors.ts:32](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L32)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `statusCode` | `number` |
| `data?` | `unknown` |
| `context?` | [`MNotifyErrorContext`](../-internal-/interfaces/MNotifyErrorContext.md) |
| `cause?` | `unknown` |

#### Returns

`MNotifyError`

#### Overrides

```ts
Error.constructor
```

## Properties

### cause?

```ts
readonly optional cause?: unknown;
```

Defined in: [errors.ts:37](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L37)

#### Inherited from

```ts
Error.cause
```

***

### context?

```ts
readonly optional context?: MNotifyErrorContext;
```

Defined in: [errors.ts:36](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L36)

***

### data?

```ts
readonly optional data?: unknown;
```

Defined in: [errors.ts:35](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L35)

***

### statusCode

```ts
readonly statusCode: number;
```

Defined in: [errors.ts:34](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L34)

## Methods

### toJSON()

```ts
toJSON(): Record<string, unknown>;
```

Defined in: [errors.ts:87](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L87)

#### Returns

`Record`\<`string`, `unknown`\>

***

### withContext()

```ts
withContext(context): MNotifyError;
```

Defined in: [errors.ts:47](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L47)

Returns a new MNotifyError with merged context.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`MNotifyErrorContext`](../-internal-/interfaces/MNotifyErrorContext.md) |

#### Returns

`MNotifyError`

***

### fromUnknown()

```ts
static fromUnknown(
   error, 
   fallbackMessage, 
   statusCode, 
   context?, 
   data?): MNotifyError;
```

Defined in: [errors.ts:63](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/errors.ts#L63)

Creates an MNotifyError from an unknown value.
Preserves the original error if it is already an MNotifyError.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |
| `fallbackMessage` | `string` |
| `statusCode` | `number` |
| `context?` | [`MNotifyErrorContext`](../-internal-/interfaces/MNotifyErrorContext.md) |
| `data?` | `unknown` |

#### Returns

`MNotifyError`
