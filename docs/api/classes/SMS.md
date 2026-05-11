# Class: SMS

Defined in: sms.ts:9

## Constructors

### Constructor

```ts
new SMS(client): SMS;
```

Defined in: sms.ts:10

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

Defined in: sms.ts:39

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

Defined in: sms.ts:12

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`SendSMSOptions`](../interfaces/SendSMSOptions.md) |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SendSMSResponse`](../interfaces/SendSMSResponse.md), [`MNotifyError`](MNotifyError.md)\>\>
