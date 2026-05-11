# Class: Templates

Defined in: templates.ts:8

## Constructors

### Constructor

```ts
new Templates(client): Templates;
```

Defined in: templates.ts:9

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

Defined in: templates.ts:11

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

Defined in: templates.ts:28

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

Defined in: templates.ts:24

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

Defined in: templates.ts:20

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Template`](../interfaces/Template.md)[], [`MNotifyError`](MNotifyError.md)\>\>
