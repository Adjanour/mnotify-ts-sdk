# Class: MNotify

Defined in: [client.ts:17](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L17)

Main SDK client for the mNotify API.

## Constructors

### Constructor

```ts
new MNotify(config): MNotify;
```

Defined in: [client.ts:37](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L37)

Creates a new mNotify client.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`MNotifyConfig`](../interfaces/MNotifyConfig.md) |

#### Returns

`MNotify`

#### Example

```ts
const mnotify = new MNotify({ apiKey: "your-api-key" });
```

## Properties

### account

```ts
readonly account: Account;
```

Defined in: [client.ts:23](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L23)

Account balance and sender ID management.

***

### contacts

```ts
readonly contacts: Contacts;
```

Defined in: [client.ts:21](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L21)

Contact management.

***

### groups

```ts
readonly groups: Groups;
```

Defined in: [client.ts:27](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L27)

Contact group management.

***

### sms

```ts
readonly sms: SMS;
```

Defined in: [client.ts:19](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L19)

SMS sending and campaign status.

***

### templates

```ts
readonly templates: Templates;
```

Defined in: [client.ts:25](https://github.com/Adjanour/mnotify-ts-sdk/blob/2fed91eedea1d4c1a76a327282eb523016c1040d/src/client.ts#L25)

SMS template management.
