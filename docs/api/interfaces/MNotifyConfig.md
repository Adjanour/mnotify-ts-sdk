# Interface: MNotifyConfig

Defined in: [types.ts:5](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L5)

Configuration options for creating an MNotify client instance.

## Properties

### apiKey

```ts
apiKey: string;
```

Defined in: [types.ts:7](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L7)

Your mNotify API key.

***

### baseUrl?

```ts
optional baseUrl?: string;
```

Defined in: [types.ts:9](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L9)

Base URL for the mNotify API. Defaults to https://api.mnotify.com/api.

***

### maxRetries?

```ts
optional maxRetries?: number;
```

Defined in: [types.ts:13](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L13)

Maximum number of retries for failed requests. Defaults to 3.

***

### timeout?

```ts
optional timeout?: number;
```

Defined in: [types.ts:11](https://github.com/Adjanour/mnotify-ts-sdk/blob/d345aa76bf5105d594bb458953bad99534ff7361/src/types.ts#L11)

Request timeout in milliseconds. Defaults to 10000.
