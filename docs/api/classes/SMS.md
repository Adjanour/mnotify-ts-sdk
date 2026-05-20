# Class: SMS

Defined in: [sms.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/sms.ts#L17)

SMS sending and campaign status operations.

## Constructors

### Constructor

```ts
new SMS(client): SMS;
```

Defined in: [sms.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/sms.ts#L18)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`SMS`

## Methods

### getStatus()

```ts
getStatus(campaignId, status?): Promise<Result<SmsDeliveryReport, MNotifyError>>;
```

Defined in: [sms.ts:50](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/sms.ts#L50)

Fetches the delivery report for a campaign.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `campaignId` | `string` |
| `status?` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SmsDeliveryReport`](../interfaces/SmsDeliveryReport.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### send()

```ts
send(options): Promise<Result<SendSMSResponse, MNotifyError>>;
```

Defined in: [sms.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/sms.ts#L21)

Sends an SMS message to one or more recipients.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`SendSMSOptions`](../interfaces/SendSMSOptions.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SendSMSResponse`](../interfaces/SendSMSResponse.md), [`MNotifyError`](MNotifyError.md)\>\>
