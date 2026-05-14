# Interface: RequestConfig

Defined in: [http.ts:14](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L14)

Configuration for an individual HTTP request.

## Properties

### data?

```ts
optional data?: unknown;
```

Defined in: [http.ts:20](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L20)

Optional request body (will be JSON-serialized).

***

### method

```ts
method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
```

Defined in: [http.ts:16](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L16)

HTTP method.

***

### params?

```ts
optional params?: Record<string, string>;
```

Defined in: [http.ts:22](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L22)

Optional query parameters.

***

### url

```ts
url: string;
```

Defined in: [http.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/96ee30f0ca2fe9cab828f3d83ce687463c643551/src/http.ts#L18)

API path (relative to the base URL).
