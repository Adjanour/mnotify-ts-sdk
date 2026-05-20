# Interface: SendSMSResponse

Defined in: [types.ts:31](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L31)

Response returned after sending an SMS campaign.

## Properties

### code

```ts
code: string;
```

Defined in: [types.ts:35](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L35)

Response code from the API.

***

### message

```ts
message: string;
```

Defined in: [types.ts:37](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L37)

Human-readable response message.

***

### status

```ts
status: string;
```

Defined in: [types.ts:33](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L33)

Status of the send request.

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

Defined in: [types.ts:39](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L39)

Summary of the SMS campaign results.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `_id` | `string` | [types.ts:40](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L40) |
| `contacts` | `number` | [types.ts:44](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L44) |
| `credit_left` | `number` | [types.ts:48](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L48) |
| `credit_used` | `number` | [types.ts:47](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L47) |
| `message_id` | `string` | [types.ts:41](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L41) |
| `numbers_sent` | `string`[] | [types.ts:46](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L46) |
| `total_rejected` | `number` | [types.ts:45](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L45) |
| `total_sent` | `number` | [types.ts:43](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L43) |
| `type` | `string` | [types.ts:42](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L42) |
