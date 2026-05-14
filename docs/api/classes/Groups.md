# Class: Groups

Defined in: [groups.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L17)

Contact group management operations.

## Constructors

### Constructor

```ts
new Groups(client): Groups;
```

Defined in: [groups.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L18)

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

Defined in: [groups.ts:44](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L44)

Adds an existing contact to a group.

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

Defined in: [groups.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L21)

Creates a new contact group.

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

Defined in: [groups.ts:73](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L73)

Deletes a group by its ID.

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

Defined in: [groups.ts:39](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L39)

Fetches a single group by its ID.

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

Defined in: [groups.ts:34](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L34)

Lists all contact groups.

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

Defined in: [groups.ts:59](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/groups.ts#L59)

Removes a contact from a group.

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
