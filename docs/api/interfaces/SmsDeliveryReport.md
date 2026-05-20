# Interface: SmsDeliveryReport

Defined in: [types.ts:53](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L53)

Delivery report for an SMS campaign.

## Properties

### report

```ts
report: {
  _id: number;
  campaign_id?: string;
  date_sent: string;
  message: string;
  recipient: string;
  retries: number;
  sender: string;
  status: string;
}[];
```

Defined in: [types.ts:57](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L57)

Array of per-recipient delivery details.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `_id` | `number` | [types.ts:58](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L58) |
| `campaign_id?` | `string` | [types.ts:64](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L64) |
| `date_sent` | `string` | [types.ts:63](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L63) |
| `message` | `string` | [types.ts:60](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L60) |
| `recipient` | `string` | [types.ts:59](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L59) |
| `retries` | `number` | [types.ts:65](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L65) |
| `sender` | `string` | [types.ts:61](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L61) |
| `status` | `string` | [types.ts:62](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L62) |

***

### status

```ts
status: string;
```

Defined in: [types.ts:55](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L55)

Overall report status.
