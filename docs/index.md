# mNotify TypeScript SDK

Modern, zero-dependency TypeScript SDK for the [mNotify BMS API](https://mnotify.com) — send SMS, manage contacts and groups, and handle account operations with **railway-oriented programming**.

```ts
import { MNotify } from "mnotify-ts-sdk";

const mnotify = new MNotify({ apiKey: "your-api-key" });

const result = await mnotify.sms.send({
  recipient: "233200000000",
  sender: "MyApp",
  message: "Hello from mNotify!",
});
```

## Features

- **Zero runtime dependencies** — uses native `fetch`
- **Runtime-agnostic** — Node 18+, Deno, Bun, Cloudflare Workers, browsers
- **Railway-oriented programming** — explicit error handling via `Result` types
- **Type-safe** — full TypeScript declarations
- **Dual-published** — npm (`mnotify-ts-sdk`) + JSR (`@adjarnor/mnotify-ts-sdk`)

## Quick Start

```
npm install mnotify-ts-sdk
```

```ts
import { MNotify } from "mnotify-ts-sdk";
```

```bash
bun add mnotify-ts-sdk
```

```ts
import { MNotify } from "mnotify-ts-sdk";
```

```bash
deno add jsr:@adjarnor/mnotify-ts-sdk
```

```ts
import { MNotify } from "jsr:@adjarnor/mnotify-ts-sdk";
```

```ts
import { MNotify } from "mnotify-ts-sdk";

const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY!,
});

const balance = await mnotify.account.getBalance();
if (balance.isOk()) {
  console.log(`Balance: ${balance.value.balance}`);
  console.log(`Bonus: ${balance.value.bonus ?? 0}`);
}
```
