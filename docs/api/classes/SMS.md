# Class: SMS

Defined in: [sms.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/sms.ts#L17)

SMS sending and campaign status operations.

## Constructors

### Constructor

```ts
new SMS(client): SMS;
```

Defined in: [sms.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/sms.ts#L18)

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

Defined in: [sms.ts:49](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/sms.ts#L49)

Fetches the delivery report for a campaign.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `campaignId` | `string` | `undefined` |
| `status` | `string` | `"null"` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SmsDeliveryReport`](../interfaces/SmsDeliveryReport.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### send()

```ts
send(options): Promise<Result<SendSMSResponse, MNotifyError>>;
```

Defined in: [sms.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/sms.ts#L21)

Sends an SMS message to one or more recipients.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`SendSMSOptions`](../interfaces/SendSMSOptions.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SendSMSResponse`](../interfaces/SendSMSResponse.md), [`MNotifyError`](MNotifyError.md)\>\>
