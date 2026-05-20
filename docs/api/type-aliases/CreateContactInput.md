# Type Alias: CreateContactInput

```ts
type CreateContactInput = Omit<Contact, "id">;
```

Defined in: [types.ts:88](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/types.ts#L88)

Input type for creating a new contact. Omits the id field which is assigned by the server.
