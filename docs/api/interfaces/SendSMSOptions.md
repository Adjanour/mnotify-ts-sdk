# Interface: SendSMSOptions

Defined in: [types.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L17)

Options for sending an SMS message.

## Properties

### is\_schedule?

```ts
optional is_schedule?: boolean;
```

Defined in: [types.ts:25](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L25)

Whether the message is scheduled for later delivery.

***

### message

```ts
message: string;
```

Defined in: [types.ts:23](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L23)

The message content to send.

***

### recipient

```ts
recipient: string | string[];
```

Defined in: [types.ts:19](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L19)

Recipient phone number(s). Can be a single number or an array of numbers.

***

### schedule\_date?

```ts
optional schedule_date?: string;
```

Defined in: [types.ts:27](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L27)

The scheduled delivery date/time (required if is_schedule is true).

***

### sender

```ts
sender: string;
```

Defined in: [types.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L21)

Sender ID (sender name) to use.

***

### sms\_type?

```ts
optional sms_type?: string;
```

Defined in: [types.ts:29](https://github.com/Adjanour/mnotify-ts-sdk/blob/327384f0264f1a881b58446e7701bf016fcf1f24/src/types.ts#L29)

Optional SMS type, for example `otp` when sending OTP campaigns.
