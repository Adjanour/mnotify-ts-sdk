# Interface: MNotifyErrorContext

Defined in: [errors.ts:13](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L13)

Contextual metadata attached to an error for debugging and tracing.

## Properties

### method?

```ts
optional method?: string;
```

Defined in: [errors.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L21)

The HTTP method used in the request.

***

### operation?

```ts
optional operation?: string;
```

Defined in: [errors.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L17)

The operation being performed when the error occurred.

***

### path?

```ts
optional path?: string;
```

Defined in: [errors.ts:23](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L23)

The API path that was called.

***

### retryCount?

```ts
optional retryCount?: number;
```

Defined in: [errors.ts:27](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L27)

The retry count at the time of the error.

***

### service?

```ts
optional service?: string;
```

Defined in: [errors.ts:15](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L15)

The service where the error occurred (e.g., "SMS", "Groups").

***

### stage?

```ts
optional stage?: "request" | "validation" | "response" | "network";
```

Defined in: [errors.ts:19](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L19)

The stage of the request lifecycle where the error occurred.

***

### url?

```ts
optional url?: string;
```

Defined in: [errors.ts:25](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/errors.ts#L25)

The full URL that was requested (with API key redacted).
