# Examples

Build the SDK, then run the examples in your runtime of choice:

```bash
npm run build
npm run example:sms
npm run example:railway
npm run example:content
```

```bash
npm run build
bun run examples/sendSMS.ts
bun run examples/railwayOrientedExample.ts
bun run examples/contentManagement.ts
```

```bash
npm run build
deno run --allow-env --allow-net examples/sendSMS.ts
deno run --allow-env --allow-net examples/railwayOrientedExample.ts
deno run --allow-env --allow-net examples/contentManagement.ts
```

Smoke mode skips network calls and does not require a real API key:

```bash
MNOTIFY_EXAMPLE_MODE=smoke node --experimental-strip-types examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke bun run examples/sendSMS.ts
MNOTIFY_EXAMPLE_MODE=smoke deno run --allow-env examples/sendSMS.ts
```

Required environment variables:

```bash
export MNOTIFY_API_KEY="your-api-key"
```

Optional environment variables:

```bash
export MNOTIFY_BASE_URL="https://api.mnotify.com/api"
export MNOTIFY_SMS_SENDER="MySender"
export MNOTIFY_SENDER_ID="MySender"
export MNOTIFY_SMS_RECIPIENT="233200000000"
export MNOTIFY_GROUP_ID="group-id-for-contact-example"
```

`sendSMS.ts` shows a simple send, balance lookup, and delivery-status check.

`railwayOrientedExample.ts` shows `match`, `map`, `andThen`, `unwrapOr`, `unwrapOrElse`, and `combine` with the current Result-only API.

`contentManagement.ts` shows creating and listing groups, then creating and fetching a template.
