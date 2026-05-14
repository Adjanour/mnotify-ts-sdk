# Class: Contacts

Defined in: [contacts.ts:15](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/contacts.ts#L15)

Contact management operations.

## Constructors

### Constructor

```ts
new Contacts(client): Contacts;
```

Defined in: [contacts.ts:16](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/contacts.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`Contacts`

## Methods

### create()

```ts
create(input, groupId): Promise<Result<Contact, MNotifyError>>;
```

Defined in: [contacts.ts:24](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/contacts.ts#L24)

Creates a new contact in the specified group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`CreateContactInput`](../type-aliases/CreateContactInput.md) | Contact details (name, phone, etc.). |
| `groupId` | `string` | The ID of the group to add the contact to (required by mNotify v2 API). |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Contact`](../interfaces/Contact.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### list()

```ts
list(): Promise<Result<Contact[], MNotifyError>>;
```

Defined in: [contacts.ts:51](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/contacts.ts#L51)

Lists all contacts.

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Contact`](../interfaces/Contact.md)[], [`MNotifyError`](MNotifyError.md)\>\>
