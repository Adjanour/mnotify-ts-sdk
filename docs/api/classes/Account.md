# Class: Account

Defined in: account.ts:8

## Constructors

### Constructor

```ts
new Account(client): Account;
```

Defined in: account.ts:9

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`HttpClient`](../-internal-/classes/HttpClient.md) |

#### Returns

`Account`

## Methods

### checkSender()

```ts
checkSender(name): Promise<Result<SenderIdStatus, MNotifyError>>;
```

Defined in: account.ts:47

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`SenderIdStatus`](../interfaces/SenderIdStatus.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### getBalance()

```ts
getBalance(): Promise<Result<BalanceResponse, MNotifyError>>;
```

Defined in: account.ts:11

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<[`BalanceResponse`](../interfaces/BalanceResponse.md), [`MNotifyError`](MNotifyError.md)\>\>

***

### registerSender()

```ts
registerSender(name, purpose?): Promise<Result<{
  message: string;
  status: string;
}, MNotifyError>>;
```

Defined in: account.ts:28

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `purpose` | `string`[] |

#### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<\{
  `message`: `string`;
  `status`: `string`;
\}, [`MNotifyError`](MNotifyError.md)\>\>
