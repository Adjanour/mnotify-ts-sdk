# Examples

The repository ships with runnable local examples under `examples/`.

## Run Them

```bash
export MNOTIFY_API_KEY="your-api-key"
npm run example:sms
npm run example:railway
npm run example:content
```

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
