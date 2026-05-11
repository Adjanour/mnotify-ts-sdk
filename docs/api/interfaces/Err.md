# Interface: Err\<T, E\>

Defined in: result.ts:17

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

Defined in: result.ts:19

***

### success

```ts
readonly success: false;
```

Defined in: result.ts:18

## Methods

### andThen()

```ts
andThen<U>(fn): Result<U, E>;
```

Defined in: result.ts:24

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

Defined in: result.ts:21

#### Returns

`this is Err<T, E>`

***

### isOk()

```ts
isOk(): this is Ok<T, E>;
```

Defined in: result.ts:20

#### Returns

`this is Ok<T, E>`

***

### map()

```ts
map<U>(fn): Result<U, E>;
```

Defined in: result.ts:22

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

Defined in: result.ts:23

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

Defined in: result.ts:28

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

Defined in: result.ts:25

#### Returns

`T`

***

### unwrapOr()

```ts
unwrapOr(defaultValue): T;
```

Defined in: result.ts:26

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

Defined in: result.ts:27

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`error`) => `T` |

#### Returns

`T`
