# Getting Started

## Installation

### Node / npm

```
npm install mnotify-ts-sdk
```

```ts
import { MNotify } from "mnotify-ts-sdk";
```

### Bun

```bash
bun add mnotify-ts-sdk
```

```ts
import { MNotify } from "mnotify-ts-sdk";
```

### JSR

```
npx jsr add @adjarnor/mnotify-ts-sdk
```

### Deno

```
deno add jsr:@adjarnor/mnotify-ts-sdk
```

```ts
import { MNotify } from "jsr:@adjarnor/mnotify-ts-sdk";
```

## Basic Setup

Create a client with your API key:

```ts
import { MNotify } from "mnotify-ts-sdk";

const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY!,
});
```

### Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `apiKey` | (required) | Your mNotify API key |
| `baseUrl` | `https://api.mnotify.com/api` | API base URL |
| `timeout` | `10000` | Request timeout in ms |
| `maxRetries` | `3` | Max retries on rate limits |

```ts
const mnotify = new MNotify({
  apiKey: "your-api-key",
  timeout: 5000,
  maxRetries: 5,
});
```

## Service Overview

The client exposes five services:

| Service | Description |
|---------|-------------|
| `mnotify.sms` | Send SMS and check delivery status |
| `mnotify.contacts` | Manage contacts |
| `mnotify.groups` | Manage contact groups |
| `mnotify.templates` | Manage SMS templates |
| `mnotify.account` | Check balance and manage sender IDs |

Every method returns a `Result` type — see [Error Handling](/guide/error-handling) for details.

## Cross-Runtime Examples

Build once, then run examples in your runtime of choice.

### Node

```bash
npm run build
npm run example:smoke
```

### Bun

```bash
npm run build
MNOTIFY_EXAMPLE_MODE=smoke bun run examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke bun run examples/railwayOrientedExample.ts
MNOTIFY_EXAMPLE_MODE=smoke bun run examples/contentManagement.ts
```

### Deno

```bash
npm run build
MNOTIFY_EXAMPLE_MODE=smoke deno run --allow-env examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke deno run --allow-env examples/railwayOrientedExample.ts
MNOTIFY_EXAMPLE_MODE=smoke deno run --allow-env examples/contentManagement.ts
```
