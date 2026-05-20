# Examples

The repository ships with runnable local examples under `examples/`.

## Run Them

Build the package first because the examples import `../dist/index.mjs`.

### Node

```bash
npm run build
npm run example:sms
npm run example:railway
npm run example:content
```

### Bun

```bash
npm run build
bun run examples/sendSMS.ts
bun run examples/railwayOrientedExample.ts
bun run examples/contentManagement.ts
```

### Deno

```bash
npm run build
deno run --allow-env --allow-net examples/sendSMS.ts
deno run --allow-env --allow-net examples/railwayOrientedExample.ts
deno run --allow-env --allow-net examples/contentManagement.ts
```

### Smoke Mode For CI Or Local Validation

```bash
MNOTIFY_EXAMPLE_MODE=smoke bun run examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke deno run --allow-env examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke node --experimental-strip-types examples/sendSMS.ts
```

Real API runs still require `MNOTIFY_API_KEY`. The SMS example also needs an approved sender via `MNOTIFY_SMS_SENDER` or `MNOTIFY_SENDER_ID`.

## Available Examples

### `example:sms`

Runs `examples/sendSMS.ts`.

Shows:

- sending a message with `mnotify.sms.send()`
- checking balance with `mnotify.account.getBalance()`
- fetching delivery status with `mnotify.sms.getStatus()`

Optional environment variables:

```bash
export MNOTIFY_SMS_SENDER="MySender"
export MNOTIFY_SENDER_ID="MySender"
export MNOTIFY_SMS_RECIPIENT="233200000000"
```

### `example:railway`

Runs `examples/railwayOrientedExample.ts`.

Shows:

- `match`
- `map`
- `andThen`
- `unwrapOr`
- `unwrapOrElse`
- `combine`

Optional environment variables:

```bash
export MNOTIFY_SENDER_ID="MySender"
export MNOTIFY_GROUP_ID="group-id"
```

### `example:content`

Runs `examples/contentManagement.ts`.

Shows:

- creating and listing groups
- creating and fetching templates

Optional environment variables:

```bash
export MNOTIFY_EXAMPLE_GROUP_NAME="SDK Example Group"
export MNOTIFY_EXAMPLE_TEMPLATE_NAME="SDK Example Template"
```

This example creates remote data. Delete the created group or template manually if you do not want to keep them.
