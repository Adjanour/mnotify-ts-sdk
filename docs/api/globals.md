# mnotify-ts-sdk

## Modules

| Module | Description |
| ------ | ------ |
| [\<internal\>](-internal-/README.md) | - |

## Classes

| Class | Description |
| ------ | ------ |
| [Account](classes/Account.md) | Account-related operations: balance and sender ID management. |
| [Contacts](classes/Contacts.md) | Contact management operations. |
| [Groups](classes/Groups.md) | Contact group management operations. |
| [MNotify](classes/MNotify.md) | Main SDK client for the mNotify API. |
| [MNotifyError](classes/MNotifyError.md) | Structured error representing an mNotify API failure. |
| [SMS](classes/SMS.md) | SMS sending and campaign status operations. |
| [Templates](classes/Templates.md) | SMS template management operations. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [BalanceResponse](interfaces/BalanceResponse.md) | Response containing the account balance. |
| [Contact](interfaces/Contact.md) | A contact stored in the mNotify system. |
| [CreateContactInput](interfaces/CreateContactInput.md) | Input type for creating a new contact. Omits the id field which is assigned by the server. |
| [CreateGroupInput](interfaces/CreateGroupInput.md) | Input type for creating a new group. |
| [CreateTemplateInput](interfaces/CreateTemplateInput.md) | Input type for creating a new template. |
| [Err](interfaces/Err.md) | A failed result containing an error. |
| [Group](interfaces/Group.md) | A contact group in the mNotify system. |
| [MNotifyConfig](interfaces/MNotifyConfig.md) | Configuration options for creating an MNotify client instance. |
| [Ok](interfaces/Ok.md) | A successful result containing a value. |
| [SenderIdStatus](interfaces/SenderIdStatus.md) | Status of a registered sender ID. |
| [SendSMSOptions](interfaces/SendSMSOptions.md) | Options for sending an SMS message. |
| [SendSMSResponse](interfaces/SendSMSResponse.md) | Response returned after sending an SMS campaign. |
| [SmsDeliveryReport](interfaces/SmsDeliveryReport.md) | Delivery report for an SMS campaign. |
| [Template](interfaces/Template.md) | An SMS template in the mNotify system. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [Result](type-aliases/Result.md) | Represents the outcome of an operation that can succeed or fail. |

## Functions

| Function | Description |
| ------ | ------ |
| [chunk](functions/chunk.md) | Splits an array into chunks of the specified size. |
| [combine](functions/combine.md) | Combines an array of Results into a single Result containing an array of values. Returns the first error encountered, or an array of all values if all Results are Ok. |
| [compact](functions/compact.md) | Removes null and undefined values from an object, returning a partial copy. |
| [err](functions/err.md) | Creates a failed Result containing the given error. |
| [isValidPhone](functions/isValidPhone.md) | Returns true if the phone number is between 10 and 15 digits after normalization. |
| [normalizePhone](functions/normalizePhone.md) | Normalizes a phone number by stripping non-digit characters and converting leading 0 to 233 country code. |
| [ok](functions/ok.md) | Creates a successful Result wrapping the given value. |
| [toArray](functions/toArray.md) | Wraps a value in an array if it is not already an array. |
| [tryCatch](functions/tryCatch.md) | Wraps a synchronous function in try/catch, returning a Result. If the function throws, the error handler is called to produce the error value. |
| [tryCatchAsync](functions/tryCatchAsync.md) | Wraps an async function in try/catch, returning a Promise of a Result. If the function throws or rejects, the error handler is called to produce the error value. |
