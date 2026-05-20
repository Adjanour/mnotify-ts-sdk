# Interface: RequestConfig

Defined in: [http.ts:14](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/http.ts#L14)

Configuration for an individual HTTP request.

## Properties

### data?

```ts
optional data?: unknown;
```

Defined in: [http.ts:20](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/http.ts#L20)

Optional request body (will be JSON-serialized).

***

### method

```ts
method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
```

Defined in: [http.ts:16](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/http.ts#L16)

HTTP method.

***

### params?

```ts
optional params?: Record<string, string>;
```

Defined in: [http.ts:22](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/http.ts#L22)

Optional query parameters.

***

### url

```ts
url: string;
```

Defined in: [http.ts:18](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/http.ts#L18)

API path (relative to the base URL).
