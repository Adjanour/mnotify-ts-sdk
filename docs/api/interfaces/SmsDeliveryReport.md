# Interface: SmsDeliveryReport

Defined in: types.ts:35

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

Defined in: types.ts:37

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `_id` | `number` | types.ts:38 |
| `campaign_id?` | `string` | types.ts:44 |
| `date_sent` | `string` | types.ts:43 |
| `message` | `string` | types.ts:40 |
| `recipient` | `string` | types.ts:39 |
| `retries` | `number` | types.ts:45 |
| `sender` | `string` | types.ts:41 |
| `status` | `string` | types.ts:42 |

***

### status

```ts
status: string;
```

Defined in: types.ts:36
