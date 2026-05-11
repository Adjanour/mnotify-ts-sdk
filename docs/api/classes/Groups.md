# Class: Groups

Defined in: groups.ts:8

## Constructors

### Constructor

```ts
new Groups(client): Groups;
```

Defined in: groups.ts:9

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`Groups`

## Methods

### addContact()

```ts
addContact(groupId, contactId): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: groups.ts:31

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `groupId` | `string` |
| `contactId` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{
  `message`: `string`;
  `status`: `string`;
\}, [`MNotifyError`](MNotifyError.md)\>\>

***

### create()

```ts
create(input): Promise<Result<Group, MNotifyError>>;
```

Defined in: groups.ts:11

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CreateGroupInput`](../interfaces/CreateGroupInput.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Group`](../interfaces/Group.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### delete()

```ts
delete(id): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: groups.ts:58

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
get(id): Promise<Result<Group, MNotifyError>>;
```

Defined in: groups.ts:27

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Group`](../interfaces/Group.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### list()

```ts
list(): Promise<Result<Group[], MNotifyError>>;
```

Defined in: groups.ts:23

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Group`](../interfaces/Group.md)[], [`MNotifyError`](MNotifyError.md)\>\>

***

### removeContact()

```ts
removeContact(groupId, contactId): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: groups.ts:45

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `groupId` | `string` |
| `contactId` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{
  `message`: `string`;
  `status`: `string`;
\}, [`MNotifyError`](MNotifyError.md)\>\>
