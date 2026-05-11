# Class: Contacts

Defined in: contacts.ts:7

## Constructors

### Constructor

```ts
new Contacts(client): Contacts;
```

Defined in: contacts.ts:8

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

Defined in: contacts.ts:10

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`CreateContactInput`](../type-aliases/CreateContactInput.md) |
| `groupId` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Contact`](../interfaces/Contact.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### list()

```ts
list(): Promise<Result<Contact[], MNotifyError>>;
```

Defined in: contacts.ts:36

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`Contact`](../interfaces/Contact.md)[], [`MNotifyError`](MNotifyError.md)\>\>
