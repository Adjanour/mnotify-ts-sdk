# Interface: Err\<T, E\>

Defined in: [result.ts:27](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L27)

A failed result containing an error.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `E` |

## Properties

### error

```ts
readonly error: E;
```

Defined in: [result.ts:29](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L29)

***

### success

```ts
readonly success: false;
```

Defined in: [result.ts:28](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L28)

## Methods

### andThen()

```ts
andThen<U>(fn): Result<U, E>;
```

Defined in: [result.ts:34](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L34)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`value`) => [`Result`](../type-aliases/Result.md)\<`U`, `E`\> |

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### isErr()

```ts
isErr(): this is Err<T, E>;
```

Defined in: [result.ts:31](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L31)

#### Returns

`this is Err<T, E>`

***

### isOk()

```ts
isOk(): this is Ok<T, E>;
```

Defined in: [result.ts:30](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L30)

#### Returns

`this is Ok<T, E>`

***

### map()

```ts
map<U>(fn): Result<U, E>;
```

Defined in: [result.ts:32](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L32)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`value`) => `U` |

#### Returns

[`Result`](../type-aliases/Result.md)\<`U`, `E`\>

***

### mapErr()

```ts
mapErr<F>(fn): Result<T, F>;
```

Defined in: [result.ts:33](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L33)

#### Type Parameters

| Type Parameter |
| ------ |
| `F` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`error`) => `F` |

#### Returns

[`Result`](../type-aliases/Result.md)\<`T`, `F`\>

***

### match()

```ts
match<U>(matcher): U;
```

Defined in: [result.ts:38](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L38)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `matcher` | \{ `err`: (`error`) => `U`; `ok`: (`value`) => `U`; \} |
| `matcher.err` | (`error`) => `U` |
| `matcher.ok` | (`value`) => `U` |

#### Returns

`U`

***

### unwrap()

```ts
unwrap(): T;
```

Defined in: [result.ts:35](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L35)

#### Returns

`T`

***

### unwrapOr()

```ts
unwrapOr(defaultValue): T;
```

Defined in: [result.ts:36](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L36)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `defaultValue` | `T` |

#### Returns

`T`

***

### unwrapOrElse()

```ts
unwrapOrElse(fn): T;
```

Defined in: [result.ts:37](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/result.ts#L37)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`error`) => `T` |

#### Returns

`T`
