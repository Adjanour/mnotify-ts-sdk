# Interface: SmsDeliveryReport

Defined in: [types.ts:55](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L55)

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

Defined in: [types.ts:59](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L59)

Array of per-recipient delivery details.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `_id` | `number` | [types.ts:60](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L60) |
| `campaign_id?` | `string` | [types.ts:66](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L66) |
| `date_sent` | `string` | [types.ts:65](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L65) |
| `message` | `string` | [types.ts:62](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L62) |
| `recipient` | `string` | [types.ts:61](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L61) |
| `retries` | `number` | [types.ts:67](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L67) |
| `sender` | `string` | [types.ts:63](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L63) |
| `status` | `string` | [types.ts:64](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L64) |

***

### status

```ts
status: string;
```

Defined in: [types.ts:57](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L57)

Overall report status.
