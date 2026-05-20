# Class: Account

Defined in: [account.ts:16](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/account.ts#L16)

Account-related operations: balance and sender ID management.

## Constructors

### Constructor

```ts
new Account(client): Account;
```

Defined in: [account.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/account.ts#L17)

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

Defined in: [account.ts:63](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/account.ts#L63)

Checks the approval status of a sender ID.

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

Defined in: [account.ts:20](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/account.ts#L20)

Fetches the current account balance.

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

Defined in: [account.ts:43](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/account.ts#L43)

Registers a new sender ID.

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
