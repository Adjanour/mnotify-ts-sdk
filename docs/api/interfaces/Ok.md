# Interface: Ok\<T, E\>

Defined in: [result.ts:12](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L12)

A successful result containing a value.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `E` |

## Properties

### success

```ts
readonly success: true;
```

Defined in: [result.ts:13](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L13)

***

### value

```ts
readonly value: T;
```

Defined in: [result.ts:14](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L14)

## Methods

### andThen()

```ts
andThen<U>(fn): Result<U, E>;
```

Defined in: [result.ts:19](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L19)

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

Defined in: [result.ts:16](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L16)

#### Returns

`this is Err<T, E>`

***

### isOk()

```ts
isOk(): this is Ok<T, E>;
```

Defined in: [result.ts:15](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L15)

#### Returns

`this is Ok<T, E>`

***

### map()

```ts
map<U>(fn): Result<U, E>;
```

Defined in: [result.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L17)

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

Defined in: [result.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L18)

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

Defined in: [result.ts:23](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L23)

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

Defined in: [result.ts:20](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L20)

#### Returns

`T`

***

### unwrapOr()

```ts
unwrapOr(defaultValue): T;
```

Defined in: [result.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L21)

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

Defined in: [result.ts:22](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/result.ts#L22)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`error`) => `T` |

#### Returns

`T`
