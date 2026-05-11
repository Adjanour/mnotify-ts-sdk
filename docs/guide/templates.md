# Templates

## Create a Template

```ts
const result = await mnotify.templates.create({
  name: "Welcome Message",
  content: "Welcome {{name}} to our service!",
});
```

## List Templates

```ts
const result = await mnotify.templates.list();

if (result.isOk()) {
  result.value.forEach((t) => {
    console.log(`${t.name}: ${t.status}`);
  });
}
```

## Get a Template

```ts
const result = await mnotify.templates.get("template_id");
```

## Delete a Template

```ts
const result = await mnotify.templates.delete("template_id");
```

## Template Shape

```ts
interface Template {
  id: string;
  name: string;
  content: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
  updated_at: string;
}
```
