# Examples

Build the SDK, then run either example:

```bash
npm run example:sms
npm run example:railway
npm run example:content
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
