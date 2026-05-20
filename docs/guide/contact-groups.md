# Contact Groups

## Create a Group

```ts
const result = await mnotify.groups.create({
  name: "VIP Customers",
  description: "High-value customer segment",
});
```

## List Groups

```ts
const result = await mnotify.groups.list();

if (result.isOk()) {
  console.log(`You have ${result.value.length} groups`);
}
```

## Get a Single Group

```ts
const result = await mnotify.groups.get("group_id");
```

## Add a Contact to a Group

```ts
const result = await mnotify.groups.addContact("group_id", {
  phone: "0244698970",
  title: "Dr",
  firstname: "Stephen",
  lastname: "Strange",
  email: "strange.smart@gmail.com",
  dob: "1979-01-01",
});
```

## Remove a Contact from a Group

```ts
const result = await mnotify.groups.removeContact("contact_id");
```

> Note: the live API deletes the contact by ID; the current OpenAPI documents a group-aware delete route, but the deployed API only accepts the contact ID form.

## Delete a Group

```ts
const result = await mnotify.groups.delete("group_id");
```
