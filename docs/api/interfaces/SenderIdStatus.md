# Interface: SenderIdStatus

Defined in: [types.ts:168](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L168)

Status of a registered sender ID.

## Properties

### approval\_status?

```ts
optional approval_status?: string;
```

Defined in: [types.ts:178](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L178)

Approval status of the sender ID (e.g., approved, pending).

***

### code?

```ts
optional code?: string;
```

Defined in: [types.ts:172](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L172)

Optional API response code.

***

### message?

```ts
optional message?: string;
```

Defined in: [types.ts:174](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L174)

Optional message from the API.

***

### sender\_name?

```ts
optional sender_name?: string;
```

Defined in: [types.ts:176](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L176)

The sender name that was checked.

***

### status

```ts
status: string;
```

Defined in: [types.ts:170](https://github.com/Adjanour/mnotify-ts-sdk/blob/f07627c7fdffaee599e5ec81bf71142b407065ab/src/types.ts#L170)

Request status returned by the API.
