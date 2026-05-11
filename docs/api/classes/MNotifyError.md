# Class: MNotifyError

Defined in: errors.ts:14

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

Defined in: errors.ts:15

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

Defined in: errors.ts:20

#### Inherited from

```ts
Error.cause
```

***

### context?

```ts
readonly optional context?: MNotifyErrorContext;
```

Defined in: errors.ts:19

***

### data?

```ts
readonly optional data?: unknown;
```

Defined in: errors.ts:18

***

### statusCode

```ts
readonly statusCode: number;
```

Defined in: errors.ts:17

## Methods

### toJSON()

```ts
toJSON(): {
  cause: unknown;
  context:   | MNotifyErrorContext
     | undefined;
  data: unknown;
  message: string;
  name: string;
  stack: string | undefined;
  statusCode: number;
};
```

Defined in: errors.ts:65

#### Returns

```ts
{
  cause: unknown;
  context:   | MNotifyErrorContext
     | undefined;
  data: unknown;
  message: string;
  name: string;
  stack: string | undefined;
  statusCode: number;
}
```

##### cause

```ts
cause: unknown;
```

##### context

```ts
context: 
  | MNotifyErrorContext
  | undefined;
```

##### data

```ts
data: unknown;
```

##### message

```ts
message: string;
```

##### name

```ts
name: string;
```

##### stack

```ts
stack: string | undefined;
```

##### statusCode

```ts
statusCode: number;
```

***

### withContext()

```ts
withContext(context): MNotifyError;
```

Defined in: errors.ts:29

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

Defined in: errors.ts:41

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
