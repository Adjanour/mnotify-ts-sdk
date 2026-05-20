# Class: Templates

Defined in: [templates.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L17)

SMS template management operations.

## Constructors

### Constructor

```ts
new Templates(client): Templates;
```

Defined in: [templates.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`Templates`

## Methods

### create()

```ts
create(input): Promise<Result<Template, MNotifyError>>;
```

Defined in: [templates.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L21)

Creates a new SMS template.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CreateTemplateInput`](../interfaces/CreateTemplateInput.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Template`](../interfaces/Template.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### delete()

```ts
delete(id): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: [templates.ts:67](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L67)

Deletes a template by its ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{
  `message`: `string`;
  `status`: `string`;
\}, [`MNotifyError`](MNotifyError.md)\>\>

***

### get()

```ts
get(id): Promise<Result<Template, MNotifyError>>;
```

Defined in: [templates.ts:56](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L56)

Fetches a single template by its ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Template`](../interfaces/Template.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### list()

```ts
list(): Promise<Result<Template[], MNotifyError>>;
```

Defined in: [templates.ts:51](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/templates.ts#L51)

Lists all SMS templates.

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Template`](../interfaces/Template.md)[], [`MNotifyError`](MNotifyError.md)\>\>
