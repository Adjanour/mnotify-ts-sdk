# Class: Groups

Defined in: [groups.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L17)

Contact group management operations.

## Constructors

### Constructor

```ts
new Groups(client): Groups;
```

Defined in: [groups.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`Groups`

## Methods

### addContact()

```ts
addContact(groupId, input): Promise<Result<Contact, MNotifyError>>;
```

Defined in: [groups.ts:61](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L61)

Adds an existing contact to a group.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `groupId` | `string` |
| `input` | [`CreateContactInput`](../interfaces/CreateContactInput.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Contact`](../interfaces/Contact.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### create()

```ts
create(input): Promise<Result<Group, MNotifyError>>;
```

Defined in: [groups.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L21)

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

Defined in: [groups.ts:77](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L77)

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

Defined in: [groups.ts:56](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L56)

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

Defined in: [groups.ts:51](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L51)

Lists all contact groups.

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Group`](../interfaces/Group.md)[], [`MNotifyError`](MNotifyError.md)\>\>

***

### removeContact()

```ts
removeContact(contactId): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: [groups.ts:66](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/groups.ts#L66)

Deletes a contact by its ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `contactId` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{
  `message`: `string`;
  `status`: `string`;
\}, [`MNotifyError`](MNotifyError.md)\>\>
