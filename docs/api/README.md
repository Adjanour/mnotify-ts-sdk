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
| **Error Handling** | Railway-oriented programming with Result type |

## Railway-Oriented Programming

This SDK supports **railway-oriented programming** (inspired by Rust's `Result<T, E>` type) for safer, more predictable error handling. All methods have both throwing and non-throwing variants.

### Using Result Type (Recommended)

```typescript
import { MNotify } from 'mnotify-ts-sdk';

const mnotify = new MNotify({ apiKey: process.env.MNOTIFY_API_KEY! });

// Use "Safe" methods that return Result<T, Error>
const result = await mnotify.sms.sendQuickBulkSMSSafe({
  recipient: ['233200000000'],
  sender: 'MyApp',
  message: 'Hello!'
});

// Pattern matching
result.match({
  ok: (response) => console.log('SMS sent!', response.summary),
  err: (error) => console.error('Failed:', error.message)
});

// Or check explicitly
if (result.isOk()) {
  console.log('Success:', result.value);
} else {
  console.error('Error:', result.error);
}

// Chain operations
const balanceResult = await mnotify.account.getBalanceSafe();
const balance = balanceResult
  .map(b => b.balance)
  .unwrapOr(0); // Safe default
```

### Legacy API (Throws Errors)

```typescript
// Traditional try-catch error handling
try {
  const response = await mnotify.sms.sendQuickBulkSMS({
    recipient: ['233200000000'],
    sender: 'MyApp',
    message: 'Hello!'
  });
  console.log('SMS sent!', response);
} catch (error) {
  console.error('Failed:', error);
}
```

### Why Railway-Oriented Programming?

- **Explicit error handling** - No hidden exceptions
- **Type-safe** - Errors are part of the type signature
- **Composable** - Easy to chain operations
- **Predictable** - No surprises in production
- **Functional** - Works well with modern patterns

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

## Advanced Usage

### Utility Functions

The SDK exports several utility functions for common operations:

```typescript
import { 
  normalizePhone, 
  isValidPhone, 
  chunk, 
  toArray 
} from 'mnotify-ts-sdk';

// Normalize phone numbers
const normalized = normalizePhone('0200000000'); // '233200000000'

// Validate phone numbers
if (isValidPhone('+233200000000')) {
  // Valid phone number
}

// Chunk recipients for batch sending
const recipients = [...]; // large array
const batches = chunk(recipients, 100); // Split into batches of 100

// Ensure value is an array
const numbers = toArray(singleNumber); // Always returns array
```

### Error Handling

The SDK provides detailed error information through the `MNotifyError` class:

```typescript
import { MNotifyError } from 'mnotify-ts-sdk';

try {
  await mnotify.sms.sendQuickBulkSMS({...});
} catch (error) {
  if (error instanceof MNotifyError) {
    console.error('API Error:', {
      status: error.statusCode,
      message: error.message,
      data: error.data
    });
    
    // Handle specific errors
    if (error.statusCode === 429) {
      // Rate limited - retry later
    } else if (error.statusCode === 401) {
      // Invalid API key
    }
  }
}
```

### Batch Operations

Send SMS to large recipient lists efficiently:

```typescript
import { chunk } from 'mnotify-ts-sdk';

const allRecipients = [...]; // 1000s of numbers
const batches = chunk(allRecipients, 100); // Process 100 at a time

for (const batch of batches) {
  await mnotify.sms.sendQuickBulkSMS({
    recipient: batch,
    sender: 'MyApp',
    message: 'Batch message'
  });
  
  // Optional: Add delay between batches
  await new Promise(resolve => setTimeout(resolve, 1000));
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
npm install
```

### Testing
```bash
npm test
# Watch mode
npm run test:watch
```

### Building
```bash
npm run build
```

### Building Documentation
```bash
npm run docs
```

## Features Comparison

| Feature | v1.0.x | v2.0.0 |
|---------|--------|--------|
| Runtime Dependencies | 4 | **0** |
| Bundle Size | ~1MB | **172KB**  |
| SMS Service | ✅ | ✅ |
| Contact Management | Basic | ✅ Complete |
| Group Management | ❌ | ✅ |
| Template Management | ❌ | ✅ |
| Account Operations | ❌ | ✅ |
| Functional Utilities | ❌ | ✅ |
| Railway-Oriented Programming | ❌ | ✅ **New!** |
| TypeScript Types | Partial | **Full** |
| Test Coverage | Basic | **Comprehensive** |
| CI/CD Pipeline | ❌ | ✅ **New** |

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- **Automated Testing**: Runs on every push and pull request (Node 18.x, 20.x, 22.x)
- **Security Scanning**: CodeQL security analysis on schedule and PR
- **NPM Publishing**: Automated releases when GitHub releases are created
- **Code Coverage**: Integrated with Codecov

### Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `test.yml` | Push/PR to main/develop | Runs linting, build, and tests |
| `codeql.yml` | Push/PR/Schedule | Security vulnerability scanning |
| `publish.yml` | GitHub Release | Publishes package to NPM |

## Documentation

Full API reference available at:  
[mNotify SDK Documentation](https://your-docs-url.com)

Official mNotify API documentation:  
[https://developer.mnotify.com/](https://developer.mnotify.com/)

## License

MIT © [Bernard](https://adjarnor.dev)

---

> **Need Help?**  
> Open an issue or contact adjanour@icloud.com
