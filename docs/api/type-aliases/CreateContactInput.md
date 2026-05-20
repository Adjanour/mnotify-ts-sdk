# Type Alias: CreateContactInput

```ts
type CreateContactInput = Omit<Contact, "id">;
```

Defined in: [types.ts:88](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L88)

Input type for creating a new contact. Omits the id field which is assigned by the server.
