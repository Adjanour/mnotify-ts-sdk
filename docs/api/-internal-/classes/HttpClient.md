# Class: HttpClient

Defined in: http.ts:13

## Constructors

### Constructor

```ts
new HttpClient(config): HttpClient;
```

Defined in: http.ts:19

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`MNotifyConfig`](../../interfaces/MNotifyConfig.md) |

#### Returns

`HttpClient`

## Methods

### request()

```ts
request<T>(config, retryCount?): Promise<Result<T, MNotifyError>>;
```

Defined in: http.ts:26

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `config` | [`RequestConfig`](../interfaces/RequestConfig.md) | `undefined` |
| `retryCount` | `number` | `0` |

#### Returns

`Promise`\<[`Result`](../../type-aliases/Result.md)\<`T`, [`MNotifyError`](../../classes/MNotifyError.md)\>\>
