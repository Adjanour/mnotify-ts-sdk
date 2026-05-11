# Interface: SendSMSResponse

Defined in: types.ts:18

## Properties

### code

```ts
code: string;
```

Defined in: types.ts:20

***

### message

```ts
message: string;
```

Defined in: types.ts:21

***

### status

```ts
status: string;
```

Defined in: types.ts:19

***

### summary

```ts
summary: {
  _id: string;
  contacts: number;
  credit_left: number;
  credit_used: number;
  message_id: string;
  numbers_sent: string[];
  total_rejected: number;
  total_sent: number;
  type: string;
};
```

Defined in: types.ts:22

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `_id` | `string` | types.ts:23 |
| `contacts` | `number` | types.ts:27 |
| `credit_left` | `number` | types.ts:31 |
| `credit_used` | `number` | types.ts:30 |
| `message_id` | `string` | types.ts:24 |
| `numbers_sent` | `string`[] | types.ts:29 |
| `total_rejected` | `number` | types.ts:28 |
| `total_sent` | `number` | types.ts:26 |
| `type` | `string` | types.ts:25 |
