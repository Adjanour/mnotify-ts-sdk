# Class: HttpClient

Defined in: [http.ts:26](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L26)

Low-level HTTP client for communicating with the mNotify API.

## Constructors

### Constructor

```ts
new HttpClient(config): HttpClient;
```

Defined in: [http.ts:32](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L32)

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

Defined in: [http.ts:40](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L40)

Performs an HTTP request, returning a Result. Retries on 429 rate-limit responses.

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
