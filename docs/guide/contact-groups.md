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
const result = await mnotify.groups.addContact("group_id", "contact_id");
```

## Remove a Contact from a Group

```ts
const result = await mnotify.groups.removeContact("group_id", "contact_id");
```

## Delete a Group

```ts
const result = await mnotify.groups.delete("group_id");
```
