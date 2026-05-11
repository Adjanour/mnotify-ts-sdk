# Managing Contacts

## Create a Contact

Contacts require a group in mNotify v2. Pass the `groupId` as the second argument:

```ts
const result = await mnotify.contacts.create(
  {
    phone: "233200000000",
    firstname: "John",
    lastname: "Doe",
    email: ["john@example.com"],
  },
  "group_id_here",
);

result.match({
  ok: (contact) => console.log(`Created contact: ${contact.id}`),
  err: (error) => console.error(error.message),
});
```

## List All Contacts

```ts
const result = await mnotify.contacts.list();

if (result.isOk()) {
  for (const contact of result.value) {
    console.log(`${contact.firstname} ${contact.lastname}: ${contact.phone}`);
  }
}
```

## Contact Shape

```ts
interface Contact {
  id: string;
  phone: string;
  firstname: string;
  lastname: string;
  title?: string;
  email?: string[];
  dbo?: string;
}
```

> Note: the API may return `_id` but the SDK normalizes it to `id` for consistency.
