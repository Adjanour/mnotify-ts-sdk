# Account

## Get Balance

```ts
const result = await mnotify.account.getBalance();

result.match({
  ok: (balance) => {
    console.log(`Balance: ${balance.balance}`);
    console.log(`Bonus: ${balance.bonus ?? 0}`);
  },
  err: (error) => console.error(error.message),
});
```

## Register a Sender ID

```ts
const result = await mnotify.account.registerSender("MyApp", ["general"]);

if (result.isOk()) {
  console.log("Sender ID registered! Awaiting approval.");
}
```

## Check Sender ID Status

```ts
const result = await mnotify.account.checkSender("MyApp");

if (result.isOk()) {
  console.log(`Status: ${result.value.approval_status}`);
}
```
