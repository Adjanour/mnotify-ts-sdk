# Type Alias: CreateContactInput

```ts
type CreateContactInput = Omit<Contact, "id">;
```

Defined in: [types.ts:88](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/types.ts#L88)

Input type for creating a new contact. Omits the id field which is assigned by the server.
