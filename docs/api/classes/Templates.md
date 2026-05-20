# Class: Templates

Defined in: [templates.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L17)

SMS template management operations.

## Constructors

### Constructor

```ts
new Templates(client): Templates;
```

Defined in: [templates.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L18)

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

Defined in: [templates.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L21)

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

Defined in: [templates.ts:41](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L41)

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

Defined in: [templates.ts:36](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L36)

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

Defined in: [templates.ts:31](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/templates.ts#L31)

Lists all SMS templates.

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Template`](../interfaces/Template.md)[], [`MNotifyError`](MNotifyError.md)\>\>
