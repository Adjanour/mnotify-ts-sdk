# mNotify TypeScript SDK

[![npm version](https://img.shields.io/npm/v/mnotify-ts-sdk)](https://www.npmjs.com/package/mnotify-sdk)
[![CI/CD](https://github.com/adjanour/mnotify-ts-sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/your-org/mnotify-ts-sdk/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Modern, zero-dependency TypeScript SDK for mNotify's Bulk Messaging Solution (BMS) API, providing seamless SMS, Voice, and contact management capabilities.

## Project Purpose

Simplify integration with mNotify's communication APIs by providing:
- **Zero dependencies** - No external runtime dependencies
- **Type-safe** interactions with full TypeScript support
- **Modern functional** programming style
- **Developer-friendly** abstractions with intuitive API
- **Comprehensive** API coverage
- **Reliable** error handling and validation

## Key Features

| Feature Area       | Capabilities |
|--------------------|--------------|
| **SMS**            | Bulk sending, Delivery reports, Scheduled SMS |
| **Contacts**       | CRUD operations, Contact management |
| **Groups**         | Group creation, Contact assignment |
| **Templates**      | Create/list/delete templates, Approval status |
| **Account**        | Balance checks, Sender ID management |
| **Utilities**      | Built-in validation, Automatic retries |

## Why Zero Dependencies?

- **Smaller bundle size** - No extra packages to download
- **Faster installation** - No dependency tree to resolve
- **Better security** - Fewer attack vectors
- **Future-proof** - No dependency breaking changes
- **Better performance** - Native fetch API, optimized code

## Getting Started

### Installation
```bash
npm install mnotify-ts-sdk
# or
pnpm install mnotify-ts-sdk
# or
yarn add mnotify-ts-sdk
```

### Basic Usage
```typescript
import { MNotify } from 'mnotify-ts-sdk';

// Initialize client with API key
const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY!
});

// Send SMS
const response = await mnotify.sms.sendQuickBulkSMS({
  recipient: ['233200000000'],
  sender: 'MyApp',
  message: 'Hello from SDK!'
});

// Check delivery status
const status = await mnotify.sms.getSMSStatus(response.summary.message_id);

// Check account balance
const balance = await mnotify.account.getBalance();
console.log(`Balance: ${balance.balance}`);
```

## API Documentation

### SMS Service

```typescript
// Send single or bulk SMS
await mnotify.sms.sendQuickBulkSMS({
  recipient: ['233200000000', '233244444444'],
  sender: 'MyApp',
  message: 'Hello World!'
});

// Schedule SMS
await mnotify.sms.sendQuickBulkSMS({
  recipient: ['233200000000'],
  sender: 'MyApp',
  message: 'Scheduled message',
  is_schedule: true,
  schedule_date: '2024-12-31T12:00:00Z'
});

// Get delivery status
const status = await mnotify.sms.getSMSStatus('campaign_id');
```

### Contact Management

```typescript
// Create contact
const contact = await mnotify.contacts.createContact({
  phone: '233200000000',
  firstname: 'John',
  lastname: 'Doe',
  email: ['john@example.com']
});

// Get all contacts
const contacts = await mnotify.contacts.getContacts();
```

### Group Management

```typescript
// Create group
const group = await mnotify.groups.createGroup({
  name: 'VIP Customers',
  description: 'High-value customer segment'
});

// Add contact to group
await mnotify.groups.addContactToGroup(group.id, contact._id);

// Get all groups
const groups = await mnotify.groups.getGroups();
```

### Template Management

```typescript
// Create template
const template = await mnotify.templates.createTemplate({
  name: 'Welcome Message',
  content: 'Welcome {{name}} to our service!'
});

// Get all templates
const templates = await mnotify.templates.getTemplates();

// Delete template
await mnotify.templates.deleteTemplate(template.id);
```

### Account Operations

```typescript
// Check balance
const balance = await mnotify.account.getBalance();

// Get sender IDs
const senderIds = await mnotify.account.getSenderIds();

// Register new sender ID
await mnotify.account.registerSenderId('MyNewApp');
```

## Configuration

The SDK accepts the following configuration options:

```typescript
const mnotify = new MNotify({
  apiKey: 'your-api-key',        // Required: Your mNotify API key
  baseUrl: 'https://...',         // Optional: Custom API base URL
  timeout: 10000,                 // Optional: Request timeout in ms (default: 10000)
  maxRetries: 3                   // Optional: Max retry attempts (default: 3)
});
```

## Error Handling

The SDK provides detailed error information:

```typescript
import { MNotifyError } from 'mnotify-ts-sdk';

try {
  await mnotify.sms.sendQuickBulkSMS({...});
} catch (error) {
  if (error instanceof MNotifyError) {
    console.error('Status:', error.statusCode);
    console.error('Message:', error.message);
    console.error('Data:', error.data);
  }
}
```

## Contribution Guidelines

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/adjanour/mnotify-ts-sdk.git
cd mnotify-ts-sdk
pnpm install
```

### Testing
```bash
pnpm test
# Watch mode
pnpm run test:watch
```

### Building Documentation
```bash
pnpm run docs
```

## Documentation

Full API reference available at:  
[ mNotify SDK Documentation](https://your-docs-url.com)

## License

MIT © [Bernard](https://adjarnour.tech)

---

> **Need Help?**  
> Open an issue or contact adjanour@icloud.com
