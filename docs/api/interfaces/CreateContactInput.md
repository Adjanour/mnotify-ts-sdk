# Interface: CreateContactInput

Defined in: [types.ts:92](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L92)

Input type for creating a new contact. Omits the id field which is assigned by the server.

## Properties

### ~~dbo?~~

```ts
optional dbo?: string;
```

Defined in: [types.ts:106](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L106)

#### Deprecated

Use `dob` instead.

***

### dob?

```ts
optional dob?: string;
```

Defined in: [types.ts:104](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L104)

Date of birth of the contact.

***

### email?

```ts
optional email?: string | string[];
```

Defined in: [types.ts:102](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L102)

Email address(es) associated with the contact.

***

### firstname

```ts
firstname: string;
```

Defined in: [types.ts:98](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L98)

First name of the contact.

***

### lastname

```ts
lastname: string;
```

Defined in: [types.ts:100](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L100)

Last name of the contact.

***

### phone

```ts
phone: string;
```

Defined in: [types.ts:94](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L94)

Phone number of the contact.

***

### title?

```ts
optional title?: string;
```

Defined in: [types.ts:96](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L96)

Optional title (e.g., Mr, Mrs, Dr).
