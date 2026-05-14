# mNotify TypeScript SDK

[![npm version](https://img.shields.io/npm/v/mnotify-ts-sdk)](https://www.npmjs.com/package/mnotify-ts-sdk)
[![JSR](https://jsr.io/badges/@adjarnor/mnotify-ts-sdk)](https://jsr.io/@adjarnor/mnotify-ts-sdk)
[![CI](https://github.com/adjanour/mnotify-ts-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/adjanour/mnotify-ts-sdk/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Zero-dependency TypeScript SDK for [mNotify BMS API](https://mnotify.com) — send SMS, manage contacts and groups, and handle account operations with **railway-oriented programming**.

- **Zero runtime dependencies** — uses native `fetch`
- **Runtime-agnostic** — Node 18+, Deno, Bun, Cloudflare Workers, browsers
- **Functional error handling** — every method returns a `Result` type
- **Dual-published** — [npm](https://npmjs.com/package/mnotify-ts-sdk) + [JSR](https://jsr.io/@adjarnor/mnotify-ts-sdk)

## Quick Start

```
npm install mnotify-ts-sdk
```

```typescript
import { MNotify } from "mnotify-ts-sdk";

const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY!,
});

const result = await mnotify.sms.send({
  recipient: "233200000000",
  sender: "MyApp",
  message: "Hello from mNotify!",
});

result.match({
  ok: (res) => console.log(`Sent! ID: ${res.summary.message_id}`),
  err: (err) => console.error(`Failed: ${err.message}`),
});
```

## Services

| Service | Methods | Description |
|---------|---------|-------------|
| `mnotify.sms` | `send`, `getStatus` | Send SMS and check delivery |
| `mnotify.contacts` | `create`, `list` | Manage contacts |
| `mnotify.groups` | `create`, `list`, `get`, `addContact`, `removeContact`, `delete` | Contact groups |
| `mnotify.templates` | `create`, `list`, `get`, `delete` | SMS templates |
| `mnotify.account` | `getBalance`, `registerSender`, `checkSender` | Account & sender IDs |

Every method returns `Result<T, MNotifyError>` — see [Error Handling](#error-handling).

## Error Handling

No try/catch needed. Every method returns a `Result` type:

```typescript
const result = await mnotify.account.getBalance();

if (result.isOk()) {
  console.log(`Balance: ${result.value.balance}`);
} else {
  console.error(result.error.message, result.error.statusCode);
}
```

Chain operations with `.map()` and `.andThen()`:

```typescript
import { ok, err, tryCatch, combine } from "mnotify-ts-sdk";

const final = await result
  .map((data) => transform(data))
  .andThen((transformed) => doMore(transformed));
```

## Installation

### npm
```
npm install mnotify-ts-sdk
```

### JSR
```
npx jsr add @adjarnor/mnotify-ts-sdk
```

### Deno
```
deno add @adjarnor/mnotify-ts-sdk
```

## Configuration

```typescript
const mnotify = new MNotify({
  apiKey: "your-api-key",     // required
  baseUrl: "https://...",      // optional (default: https://api.mnotify.com/api)
  timeout: 10000,              // optional (default: 10000ms)
  maxRetries: 3,               // optional (default: 3, only on 429)
});
```

## Docs

Full documentation at [https://adjanour.github.io/mnotify-ts-sdk](https://adjanour.github.io/mnotify-ts-sdk) or run locally:

```
npm run docs:dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build ESM + CJS |
| `npm test` | Run tests |
| `npm run lint` | Biome lint |
| `npm run format` | Biome format |
| `npm run docs:dev` | Start docs dev server |
| `npm run docs:build` | Build static docs |

## License

MIT
