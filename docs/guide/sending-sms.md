# Sending SMS

## Send a Message

```ts
const result = await mnotify.sms.send({
  recipient: "233200000000",
  sender: "MyApp",
  message: "Hello from mNotify!",
});

result.match({
  ok: (response) => {
    console.log(`Sent! Credit left: ${response.summary.credit_left}`);
  },
  err: (error) => {
    console.error(`Failed: ${error.message}`);
  },
});
```

### Multiple Recipients

Pass an array of phone numbers:

```ts
const result = await mnotify.sms.send({
  recipient: ["233200000000", "233200000001", "233200000002"],
  sender: "MyApp",
  message: "Broadcast message",
});
```

### Scheduled Messages

`schedule_date` should use the official `YYYY-MM-DD hh:mm` format.

```ts
const result = await mnotify.sms.send({
  recipient: "233200000000",
  sender: "MyApp",
  message: "Scheduled message",
  is_schedule: true,
  schedule_date: "2025-06-01 09:00",
});
```

## Check Delivery Status

```ts
const result = await mnotify.sms.getStatus("campaign_id_123");

if (result.isOk()) {
  for (const report of result.value.report) {
    console.log(`${report.recipient}: ${report.status}`);
  }
}
```

## Phone Number Formatting

Numbers are automatically normalized:

| Input | Normalized |
|-------|-----------|
| `+233-20-000-0000` | `233200000000` |
| `0200000000` | `233200000000` |
| `233200000000` | `233200000000` |

Use the helper if you need to format numbers elsewhere:

```ts
import { normalizePhone, isValidPhone } from "mnotify-ts-sdk";

if (isValidPhone("0200000000")) {
  const normalized = normalizePhone("0200000000");
  // "233200000000"
}
```
